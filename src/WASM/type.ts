import { Reader } from "../reader.js";

export interface WasmFuncType {
  form: string;
  param_count: number;
  param_types: string[]
  return_count: number;
  return_type?: string;
}

export const WASM_TYPE = {
  // value types
  [-0x1]: 'i32',  // 0x7f
  [-0x2]: 'i64',  // 0x7e
  [-0x3]: 'f32',  // 0x7d
  [-0x4]: 'f64',  // 0x7c
  [-0x5]: 'v128', // 0x7b
  // packed types
  [-0x8]: 'i8',  // 0x78
  [-0x9]: 'i16', // 0x77
  // reference types
  [-0xd]: 'nullfuncref',   // 0x73
  [-0xe]: 'nullexternref', // 0x72
  [-0xf]: 'nullref',       // 0x71
  [-0x14]: 'i31ref',       // 0x6c
  [-0x15]: 'structref',    // 0x6b
  [-0x16]: 'arrayref',     // 0x6a
  [-0x10]: 'funcref',      // 0x70
  [-0x11]: 'externref',    // 0x6f
  [-0x12]: 'anyref',       // 0x6e
  [-0x13]: 'eqref',        // 0x6d
  [-0x1c]: 'nonnullable',  // 0x64
  [-0x1d]: 'nullable',     // 0x63
  // exception handling
  [-0x17]: 'exnref',    // 0x69
  [-0xc]: 'nullexnref', // 0x74
  // string reference types
  [-0x19]: 'stringref',        // 0x67
  [-0x1a]: 'stringview_wtf8',  // 0x66
  [-0x1e]: 'stringview_wtf16', // 0x62
  [-0x1f]: 'stringview_iter',  // 0x61
  // type forms
  [-0x20]: 'func',     // 0x60
  [-0x21]: 'struct',   // 0x5f -- gc
  [-0x22]: 'array',    // 0x5e -- gc
  [-0x23]: 'cont',     // 0x5d -- stack-switching, typed continuation
  [-0x30]: 'sub',      // 0x50 -- gc
  [-0x31]: 'sub final', // 0x4f -- gc
  // isorecursive recursion groups
  [-0x32]: 'rec', // 0x4e
  // block_type
  [-0x40]: 'block_type', // 0x40

}
export type WASM_TYPE_KEY = keyof typeof WASM_TYPE; 

export function wasm_parse_type(buffer: Uint8Array): WasmFuncType[] {
  const reader = new Reader(buffer);

  const count = reader.getULEB128();
  const ret: WasmFuncType[] = [];
  for(let i=0;i< count; i++) {
    const form = reader.getSLEB128() as WASM_TYPE_KEY;
    const param_count = reader.getULEB128();
    const param_types: WASM_TYPE_KEY[] = [];
    for(let i=0;i<param_count;i++) {
      param_types.push(reader.getSLEB128() as WASM_TYPE_KEY)
    }
    const return_count = reader.getULEB128();
    const return_type: (WASM_TYPE_KEY|0) = (return_count > 0) ? reader.getSLEB128() as WASM_TYPE_KEY: 0;
    ret.push({
      form: WASM_TYPE[form],
      param_count,
      param_types: param_types.map(x => WASM_TYPE[x]),
      return_count,
      return_type: (return_type != 0)? WASM_TYPE[return_type] : undefined
    })
  }
  return ret;
}