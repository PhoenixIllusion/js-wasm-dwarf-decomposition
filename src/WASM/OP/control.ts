import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_ControlFlow = {
  unreachable: 0x00,//		trap immediately
  nop: 0x01,//		no operation
  block: 0x02,//	sig : block_type	begin a sequence of expressions, yielding 0 or 1 values
  loop: 0x03,//	sig : block_type	begin a block which can also form control flow loops
  if: 0x04,//	sig : block_type	begin if expression
  else: 0x05,//		begin else expression of if
  end: 0x0b,//		end a block, loop, or if
  br: 0x0c,//	relative_depth : varuint32	break that targets an outer nested block
  br_if: 0x0d,//	relative_depth : varuint32	conditional break that targets an outer nested block
  br_table: 0x0e,//	see below	branch table control flow construct
  return: 0x0f,//		return zero or one value from this function
}

export const CONTROL_FLOW = wrap(OP_ControlFlow);

export function parse_control_flow(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, CONTROL_FLOW, immediates => {
    switch (code) {
      //control flow
      case 0x00:
      case 0x01:
        break;
      case 0x02:
      case 0x03:
      case 0x04:
        immediates.push(reader.getSLEB128())
        break;
      case 0x05:
      case 0x0b:
        break;
      case 0x0c:
      case 0x0d:
        immediates.push(reader.getULEB128());
        break;
      case 0x0e: // br_table
        const target_count = reader.getULEB128();
        immediates.push(target_count);
        for (let i = 0; i < target_count; i++) {
          immediates.push(reader.getULEB128());
        }
        immediates.push(reader.getULEB128());
        break;
      case 0x0f:
    }
  })
}