import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_Const = {
  'i32.const': 0x41,//	value : varint32	a constant value interpreted as i32
  'i64.const': 0x42,//	value : varint64	a constant value interpreted as i64
  'f32.const': 0x43,//	value : uint32	a constant value interpreted as f32
  'f64.const': 0x44,//	value : uint64	a constant value interpreted as f64
}
export const CONST = wrap(OP_Const);

export function parse_const(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, CONST, immediates => {
    switch (code) {
      case 0x41:
      case 0x42:
        immediates.push(reader.getSLEB128());
        break;
      case 0x43:
        immediates.push(reader.getF32());
        break;
      case 0x44:
        immediates.push(reader.getF64());
        break;
    }
  });
}