import { Reader } from "../../../reader.js";
import { OP_Command, wrap, wrap_op } from "../index.js";

export const OP_GarbageCollection = {
  'struct.new': 0x00,
  'struct.new_default': 0x01,
  'struct.get': 0x02,
  'struct.get_s': 0x03,
  'struct.get_u': 0x04,
  'struct.set': 0x05,
  'array.new': 0x06,
  'array.new_default': 0x07,
  'array.new_fixed': 0x08,
  'array.new_data': 0x09,
  'array.new_elem': 0x0a,
  'array.get': 0x0b,
  'array.get_s': 0x0c,
  'array.get_u': 0x0d,
  'array.set': 0x0e,
  'array.len': 0x0f,
  'array.fill': 0x10,
  'array.copy': 0x11,
  'array.init_data': 0x12,
  'array.init_elem': 0x13,
  'ref.test': 0x14,
  'ref.test_null': 0x15,
  'ref.cast': 0x16,
  'ref.cast_null': 0x17,
  'br_on_cast': 0x18,
  'br_on_cast_fail': 0x19,
  'any.convert_extern': 0x1a,
  'extern.convert_any': 0x1b,
  'ref.i31': 0x1c,
  'i31.get_s': 0x1d,
  'i31.get_u': 0x1e,

  //string section, 0x80 to 0xb7
}
export const GARBAGE_COLLECTION = wrap(OP_GarbageCollection);

export function parse_gc(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, GARBAGE_COLLECTION, immediates => {
    switch (code) {
      case 0x00: // struct new
      case 0x01: // struct new default
      case 0x06: // array new
      case 0x07: // array new default
      case 0x0B: // array get
      case 0x0C: // array get_s
      case 0x0D: // array get_u
      case 0x0E: // array set
      case 0x10: // array fill
      case 0x14: // ref test
      case 0x15: // ref test null
      case 0x16: // ref cast
      case 0x17: // ref cast null
        immediates.push(reader.getULEB128()); // heap type index
        break;
      case 0x02: // struct get
      case 0x03: // struct get_u
      case 0x04: // struct get_s
      case 0x05: // struct set
      case 0x08: // array fill
      case 0x09: // array.new_data
      case 0x0a: // array.new_elem
      case 0x11: // array.copy
      case 0x12: // array.init_data
      case 0x13: // array.init_elem
        immediates.push(reader.getULEB128(),reader.getULEB128()); // heap type index
        break;
      case 0x18: // branch on cast
      case 0x19: // branch on cast fail
        immediates.push(
          reader.getULEB128(),
          reader.getULEB128(),
          reader.getULEB128(),
          reader.getULEB128()); // heap type index
        break;

    }
  });
}