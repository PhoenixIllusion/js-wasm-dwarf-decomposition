import { Reader } from "../reader.js";
import { textDecoder } from "../text_decoder.js";

export interface WasmSection {
  id: number;
  type: string;
  name?: string;
  start: number;
  size: number;
  // Only for custom section, 0 otherwise
  customSectionStart?: number;
  buffer: Uint8Array;

}

export interface WasmFile {
  version: number,
  sections: WasmSection[]
}

export function wasm_parse(sourceBuffer: ArrayBuffer): WasmFile {
  const sectionType = [
    'custom',   // 0
    'type',     // 1
    'import',   // 2
    'function', // 3
    'table',    // 4
    'memory',   // 5
    'global',   // 6
    'export',   // 7
    'start',    // 8
    'element',  // 9
    'code',     // 10
    'data',     // 11
    'data-count',     // 12,
    'tag',      // 13
    'strings'   // 14
  ];

  const buffer = new Uint8Array(sourceBuffer);
  // 4 byte magic number: \0asm (0x0,: 0x61,: 0x73,: 0x6d),
  if (!(buffer[0] === 0x0 && buffer[1] === 0x61 && buffer[2] === 0x73 && buffer[3] === 0x6d)) {
    throw new Error('Invalid wasm file, incorrect magic word, got ' + [...buffer.slice(0, 4)].map(x => x.toString(16)));
  }
  const reader = new Reader(buffer);
  // Version on 4 bytes
  reader.offset = 4;
  const version = reader.getU32();
  // Parse sections
  const sections: WasmSection[] = [];
  while (reader.offset < buffer.length) {
    const id = reader.getU8();
    const sectionSize = reader.getULEB128();
    // The section start at this position (right after the section length field)...
    const sectionStart = reader.offset;
    // Only custom sections get names: https://webassembly.github.io/spec/core/binary/modules.html#custom-section
    let name;
    let customSectionStart;
    const type = sectionType[id];
    if (id === 0) {
      const nameSize = reader.getULEB128();
      name = textDecoder.decode(buffer.slice(reader.offset, reader.offset+nameSize));
      // ...except for custom section which will start after their name
      customSectionStart = reader.offset + nameSize;
    }
    // Move to the end of the section
    reader.offset = sectionStart + sectionSize;
    // Create section
    const section: WasmSection = {
      id,
      name,
      type,
      start: sectionStart,
      size: sectionSize,
      // Only for custom section, 0 otherwise
      customSectionStart,
      buffer: customSectionStart ? buffer.slice(customSectionStart, sectionStart + sectionSize) : buffer.slice(sectionStart, sectionStart + sectionSize)
    };
    console.log(`${sectionType[id].padStart(10, ' ')} starts=0x${section.start.toString(16).padStart(8, '0')} size=0x${section.size.toString(16)} ${section.name ?? ""}`);
    sections.push(section);
  }
  return { version, sections};
}