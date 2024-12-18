import { Reader } from "../reader.js";
import { OP_Command, wasm_op_code_parse } from "./OP/index.js";
import { WASM_TYPE, WASM_TYPE_KEY } from "./type.js";

export interface WasmCodeFunction {
  body_size: number;
  local_count: number;
  locals: [number,string][];
  code: Uint8Array,
  commands?: OP_Command[]
}

export interface WasmCodeSection {
  [offset: number]: WasmCodeFunction;
}
export function wasm_parse_code(buffer: Uint8Array): WasmCodeSection {
  const reader = new Reader(buffer);

  const count = reader.getULEB128();
  const ret: WasmCodeSection = {};
  for(let i=0;i< count; i++) {
    const body_size = reader.getULEB128();
    const offset = reader.offset;
    const end_of_body = reader.offset+body_size;
    const local_count = reader.getULEB128();
    const locals: [number,string][] = [];
    for(let i=0;i<local_count;i++) {
      locals.push([reader.getULEB128(), WASM_TYPE[reader.getSLEB128() as WASM_TYPE_KEY]]);
    }
    const code = reader.getBuffer(end_of_body - reader.offset - 1);
    let commands: undefined | OP_Command[] = undefined;
    try {
      commands = wasm_op_code_parse(code);
    } catch(_ex) {

    }
    if(reader.getU8() != 0x0b) {
      throw new Error('Failed to parse Function body')
    }
    ret[offset] = {
      body_size,
      local_count,
      locals,
      code,
      commands
    }
  }
  return ret;
}