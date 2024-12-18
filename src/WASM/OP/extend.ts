import { wrap } from "./index.js";

export const OP_Extend = {
  'i32.extend/s8': 0xc0,//	
  'i32.extend/s16': 0xc1,//	
  'i64.extend/s8': 0xc2,//	
  'i64.extend/s16': 0xc3,//	
  'i64.extend/s32': 0xc4,//
}

export const EXTEND = wrap(OP_Extend);