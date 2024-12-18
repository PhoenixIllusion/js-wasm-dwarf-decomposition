import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_Call = {
  call: 0x10, //function_index : varuint32	call a function by its index
  call_indirect: 0x11, //type_index : varuint32, reserved : varuint1	call a function indirect with an expected signature
  return_call: 0x12,
  return_call_indirect: 0x13,
  call_ref: 0x14,
  return_call_ref: 0x15,
}
export const CALL = wrap(OP_Call);

export function parse_call(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, CALL, immediates => {
    switch (code) {
      case 0x10:
      case 0x12:
      case 0x14:
      case 0x15:
        immediates.push(reader.getULEB128())
        break;
      case 0x11:
      case 0x13:
        immediates.push(reader.getULEB128(), reader.getULEB128())
        break;
    }
  });
}