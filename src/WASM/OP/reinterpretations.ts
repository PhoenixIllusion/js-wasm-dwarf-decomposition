import { wrap } from "./index.js";

export const OP_Reinterpretations = {
  'i32.reinterpret/f32': 0xbc,//		
  'i64.reinterpret/f64': 0xbd,//		
  'f32.reinterpret/i32': 0xbe,//		
  'f64.reinterpret/i64': 0xbf,//
}

export const REINTERPRETATIONS = wrap(OP_Reinterpretations);