import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_Parametric = {
  'drop': 0x1a,
  'select': 0x1b,
  'select.with.type': 0x1c
}
export const PARAMETRIC = wrap(OP_Parametric);

export function parse_parametric(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, PARAMETRIC, immediates => {
    if(code == 0x1c)
      immediates.push(reader.getULEB128());
  });
}