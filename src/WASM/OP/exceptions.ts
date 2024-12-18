import { Reader } from "../../reader.js";
import { OP_Command, wrap, wrap_op } from "./index.js";

export const OP_Exceptions = {
  throw: 0x8,
  rethrow: 0x09,
  try_table: 0x1f,
  throw_ref:	0x0a
}

enum Catch {
  catch = 0x00,
  catch_ref = 0x01,
  catch_all = 0x02,
  catch_all_ref = 0x03
}


export const EXCEPTIONS = wrap(OP_Exceptions);

export function parse_exceptions(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, EXCEPTIONS, immediates => {
    switch (code) {
      case 0x08:
      case 0x09:
        immediates.push(reader.getULEB128())
        break;
      case 0x1f: {
        const numCatches = reader.getULEB128();
        immediates.push(numCatches);
        for(let i=0;i<numCatches;i++) {
          const code = reader.getS8();
          immediates.push(code);
          switch(code) {
            case Catch.catch:
            case Catch.catch_ref:
              immediates.push(reader.getULEB128());
              break;
            case Catch.catch_all:
            case Catch.catch_all_ref:
              immediates.push(reader.getULEB128());
              immediates.push(reader.getULEB128())
          }
        }
      }

        break;
    }
  });
}