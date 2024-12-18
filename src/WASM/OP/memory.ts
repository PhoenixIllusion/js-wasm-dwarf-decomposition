import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_Memory = {
  'i32.load': 0x28,//	memory_immediate	load from memory
  'i64.load': 0x29,//	memory_immediate	load from memory
  'f32.load': 0x2a,//	memory_immediate	load from memory
  'f64.load': 0x2b,//	memory_immediate	load from memory
  'i32.load8_s': 0x2c,//	memory_immediate	load from memory
  'i32.load8_u': 0x2d,//	memory_immediate	load from memory
  'i32.load16_s': 0x2e,//	memory_immediate	load from memory
  'i32.load16_u': 0x2f,//	memory_immediate	load from memory
  'i64.load8_s': 0x30,//	memory_immediate	load from memory
  'i64.load8_u': 0x31,//	memory_immediate	load from memory
  'i64.load16_s': 0x32,//	memory_immediate	load from memory
  'i64.load16_u': 0x33,//	memory_immediate	load from memory
  'i64.load32_s': 0x34,//	memory_immediate	load from memory
  'i64.load32_u': 0x35,//	memory_immediate	load from memory
  'i32.store': 0x36,//	memory_immediate	store to memory
  'i64.store': 0x37,//	memory_immediate	store to memory
  'f32.store': 0x38,//	memory_immediate	store to memory
  'f64.store': 0x39,//	memory_immediate	store to memory
  'i32.store8': 0x3a,//	memory_immediate	store to memory
  'i32.store16': 0x3b,//	memory_immediate	store to memory
  'i64.store8': 0x3c,//	memory_immediate	store to memory
  'i64.store16': 0x3d,//	memory_immediate	store to memory
  'i64.store32': 0x3e,//	memory_immediate	store to memory
  'memory.size': 0x3f,//	reserved : varuint1	query the size of memory
  'memory.grow': 0x40,//	reserved : varuint1	grow the size of memory
}
export const MEMORY = wrap(OP_Memory);

export function parse_memory(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, MEMORY, immediates => {
    immediates.push(reader.getULEB128());
    if (code != 0x3f && code != 0x40) {
      immediates.push(reader.getULEB128());
    }
  });
}