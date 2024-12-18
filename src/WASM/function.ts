import { Reader } from "../reader.js";

export function wasm_parse_function(buffer: Uint8Array): number[] {
  const reader = new Reader(buffer);
  const count = reader.getULEB128();
  const ret: number[] = [];
  for(let i=0;i<count;i++) {
    ret.push(reader.getULEB128())
  }
  return ret;
}