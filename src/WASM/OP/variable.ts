import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_Variable = {
  'local.get': 0x20, //	local_index : varuint32	read a local variable or parameter
  'local.set': 0x21, //	local_index : varuint32	write a local variable or parameter
  'local.tee': 0x22, //	local_index : varuint32	write a local variable or parameter and return the same value
  'global.get': 0x23, //	global_index : varuint32	read a global variable
  'global.set': 0x24, //	global_index : varuint32	write a global variable
  'table.get': 0x25,
  'table.set': 0x26,
}
export const VARIABLE = wrap(OP_Variable);

export function parse_variable(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, VARIABLE, immediates => {
    immediates.push(reader.getULEB128());
  });
}