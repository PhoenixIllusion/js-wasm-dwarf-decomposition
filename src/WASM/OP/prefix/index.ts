import { Reader } from "../../../reader.js";
import { OP_Command, wrap, wrap_op } from "../index.js";
import { parse_atomics } from "./atomic.js";
import { parse_gc } from "./gc.js";
import { parse_misc } from "./misc.js";
import { parse_simd } from "./simd.js";

export const OP_Prefix = {
  gc_prefix: 0xfb,
  misc_prefix: 0xfc,
  simd_prefix: 0xfd,
  atomic_prefix: 0xfe
}
export const PREFIX = wrap(OP_Prefix);

const prefix_parsers = {
  0xfb: parse_gc,
  0xfc: parse_misc,
  0xfd: parse_simd,
  0xfe: parse_atomics
}

export function parse_prefix(code: number, reader: Reader): OP_Command {
  return wrap_op(code, reader, PREFIX, _immediates => {
    const offset = reader.offset -1;
    const parser = (prefix_parsers as any)[code] as ((code: number, reader: Reader) => OP_Command)|undefined;
    if(parser) {
      const inst = parser(reader.getULEB128(), reader);
      inst.offset = offset
      return inst;
    }
  });
}