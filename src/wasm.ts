import { wasm_parse_code } from "./WASM/code.js";
import { WasmFile } from "./WASM/file.js";
import { wasm_parse_function } from "./WASM/function.js";
import { wasm_parse_name } from "./WASM/names.js";
import { wasm_parse_type } from "./WASM/type.js";

export function wasm_decomp(wasm: WasmFile) {
  const typeSec = wasm.sections.find(x => x.type == 'type')?.buffer;
  const functionSec = wasm.sections.find(x => x.type == 'function')?.buffer;
  const codeSec = wasm.sections.find(x => x.type == 'code')?.buffer;
  const nameSec = wasm.sections.find(x => x.name == 'name')?.buffer;
  if(codeSec && typeSec && functionSec) {
    const types = wasm_parse_type(typeSec);
    const functions = wasm_parse_function(functionSec);
    const code = wasm_parse_code(codeSec);
    const names = nameSec && wasm_parse_name(nameSec);
    return {wasm, types, functions, code, names}
  }
  return null;
}
