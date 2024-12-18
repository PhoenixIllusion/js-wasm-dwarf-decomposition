import { DwarfAbbrev, dwarf_debug_abbrev } from "./DwarfParser/abbrev";
import { DwarfInfo, dwarf_debug_info } from "./DwarfParser/info";
import { DwarfLine, dwarf_debug_line } from "./DwarfParser/line";
import { DwarfRanges, dwarf_debug_ranges } from "./DwarfParser/ranges";
import { WasmSection, wasm_parse } from "./WASM/file";
import { textDecoder } from "./text_decoder";
import { wasm_decomp } from "./wasm";

// usage: node dump_wasm_sections.js myexecutable.wasm



async function getSourceBuffer(wasmFile: string) {
  const response = await fetch(wasmFile);
  const sourceBuffer = await response.arrayBuffer();
  return sourceBuffer;
}

function parse_dwarf(sections: WasmSection[]): DwarfInfo[] {
  function getSection<T>(name: string, cb: (buffer: Uint8Array) => T): T | undefined {
    const buffer = sections.find(x => x.name && x.name == '.debug_' + name)?.buffer;
    if (buffer) {
      return cb(buffer);
    }
  }
  const string_buffer = sections.find(x => x.name && x.name == '.debug_str')?.buffer || new Uint8Array(0);
  const abbrev: DwarfAbbrev = getSection('abbrev', dwarf_debug_abbrev) || {};
  const ranges: DwarfRanges = getSection('ranges', dwarf_debug_ranges) || {};
  const line: DwarfLine[] = getSection('line', dwarf_debug_line) || [];
  const info: DwarfInfo[] = getSection('info', (buf) => dwarf_debug_info(buf, abbrev, ranges, string_buffer)) || [];

  return info;
}


async function main() {
  // Wasm code
  const source = window.process ? process.argv[2] : 'a.out.wasm';
  const sourceBuffer = await getSourceBuffer(source);
  const wasm = wasm_parse(sourceBuffer);

  const hasExt = wasm.sections.find(x => x.name == 'external_debug_info');
  if (hasExt) {
    const extUrl = textDecoder.decode(hasExt.buffer.slice(1));
    const extBuffer = await getSourceBuffer(extUrl);
    const dec_file = wasm_parse(extBuffer);
    const decomp = wasm_decomp(dec_file)!;
    parse_dwarf(decomp.wasm.sections);
  }

  // Memory for the wasm process
  const memory = new WebAssembly.Memory({ initial: 2 });
  function __liftString(pointer: number) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  await WebAssembly.instantiateStreaming(fetch(source), {
    env: {
      memory,
      __stack_pointer: new WebAssembly.Global({ value: "i32", mutable: true }, 0),
      __memory_base: new WebAssembly.Global({ value: "i32", mutable: false }, 0),
      __table_base: new WebAssembly.Global({ value: "i32", mutable: false }, 0),
      __indirect_function_table: new WebAssembly.Table({ initial: 2, element: "anyfunc" }),
      log: (offset: number, size: number) => {
        console.log(textDecoder.decode(new Uint8Array(memory.buffer, offset, size)));
      },
      abort(messageP: number, fileNameP: number, lineNumber: number, columnNumber: number) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        const message = __liftString(messageP >>> 0);
        const fileName = __liftString(fileNameP >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      }
    },
  });
}

main();