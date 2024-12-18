import { Reader } from "../../../reader.js";
import { OP_Command, wrap, wrap_all, wrap_op } from "../index.js";

export const OP_Conversion_sat = {
  'i32.trunc_sat_f32_s': 0x00,//		🎳 saturating form of i32.trunc_f32_s
  'i32.trunc_sat_f32_u': 0x01,//		🎳 saturating form of i32.trunc_f32_u
  'i32.trunc_sat_f64_s': 0x02,//		🎳 saturating form of i32.trunc_f64_s
  'i32.trunc_sat_f64_u': 0x03,//		🎳 saturating form of i32.trunc_f64_u
  'i64.trunc_sat_f32_s': 0x04,//		🎳 saturating form of i64.trunc_f32_s
  'i64.trunc_sat_f32_u': 0x05,//		🎳 saturating form of i64.trunc_f32_u
  'i64.trunc_sat_f64_s': 0x06,//		🎳 saturating form of i64.trunc_f64_s
  'i64.trunc_sat_f64_u': 0x07,//		🎳 saturating form of i64.trunc_f64_u
}
export const CONVERSION_SAT = wrap(OP_Conversion_sat);

export const OP_Bulk_Memory = {
  'memory.init': 0x08,
  'data.drop': 0x09,
  'memory.copy': 0x0a,
  'memory.fill': 0x0b,
  'table.init': 0x0c,
  'elem.drop': 0x0d,
  'table.copy': 0x0e,
  'table.grow': 0x0f,
  'table.size': 0x10,
  'table.fill': 0x11,
}

const MISC = wrap_all([OP_Conversion_sat, OP_Bulk_Memory])

export function parse_misc(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, MISC, immediates => {
    switch (code) {
      case 0x08: // memory.init
      case 0x0a: // memory.copy
      case 0x0c: // table.init
      case 0x0e: // table.copy
        immediates.push(reader.getULEB128(),reader.getULEB128());
        break;
      case 0x09: // data.drop
      case 0x0b: // memory.fill
      case 0x0d: // elem.drop
      case 0x0f: // table.grow
      case 0x10: // table.size
      case 0x11: // table.fill
        immediates.push(reader.getULEB128());
        break;
    }
  });
}