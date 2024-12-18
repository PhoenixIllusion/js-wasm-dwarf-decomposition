import { wrap } from "./index.js";

export const OP_Conversion = {
  'i32.wrap/i64': 0xa7,//		
  'i32.trunc_s/f32': 0xa8,//		
  'i32.trunc_u/f32': 0xa9,//		
  'i32.trunc_s/f64': 0xaa,//		
  'i32.trunc_u/f64': 0xab,//		
  'i64.extend_s/i32': 0xac,//		
  'i64.extend_u/i32': 0xad,//		
  'i64.trunc_s/f32': 0xae,//		
  'i64.trunc_u/f32': 0xaf,//		
  'i64.trunc_s/f64': 0xb0,//		
  'i64.trunc_u/f64': 0xb1,//		
  'f32.convert_s/i32': 0xb2,//		
  'f32.convert_u/i32': 0xb3,//		
  'f32.convert_s/i64': 0xb4,//		
  'f32.convert_u/i64': 0xb5,//		
  'f32.demote/f64': 0xb6,//		
  'f64.convert_s/i32': 0xb7,//		
  'f64.convert_u/i32': 0xb8,//		
  'f64.convert_s/i64': 0xb9,//		
  'f64.convert_u/i64': 0xba,//		
  'f64.promote/f32': 0xbb,//		
}
export const CONVERSION = wrap(OP_Conversion);