import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_Ref = {
  'ref.null': 0xd0,
  'ref.is_null': 0xd1,
  'ref.func': 0xd2,
  'ref.eq': 0xd3,
  'ref.as_non_null': 0xd4,
  'br_on_null': 0xd5,
  'br_on_non_null': 0xd6,
}
export const REF = wrap(OP_Ref);

export function parse_ref(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, REF, immediates => {
    switch (code) {
      case 0xd2:
      case 0xd5:
      case 0xd6:
        immediates.push(reader.getSLEB128());
        break;
    }
  });
}