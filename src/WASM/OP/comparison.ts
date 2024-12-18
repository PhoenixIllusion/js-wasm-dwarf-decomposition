import { wrap } from "./index.js";

export const OP_Comparison = {
  'i32.eqz': 0x45,//		
  'i32.eq': 0x46,//		
  'i32.ne': 0x47,//		
  'i32.lt_s': 0x48,//		
  'i32.lt_u': 0x49,//		
  'i32.gt_s': 0x4a,//		
  'i32.gt_u': 0x4b,//		
  'i32.le_s': 0x4c,//		
  'i32.le_u': 0x4d,//		
  'i32.ge_s': 0x4e,//		
  'i32.ge_u': 0x4f,//		
  'i64.eqz': 0x50,//		
  'i64.eq': 0x51,//		
  'i64.ne': 0x52,//		
  'i64.lt_s': 0x53,//		
  'i64.lt_u': 0x54,//		
  'i64.gt_s': 0x55,//		
  'i64.gt_u': 0x56,//		
  'i64.le_s': 0x57,//		
  'i64.le_u': 0x58,//		
  'i64.ge_s': 0x59,//		
  'i64.ge_u': 0x5a,//		
  'f32.eq': 0x5b,//		
  'f32.ne': 0x5c,//		
  'f32.lt': 0x5d,//		
  'f32.gt': 0x5e,//		
  'f32.le': 0x5f,//		
  'f32.ge': 0x60,//		
  'f64.eq': 0x61,//		
  'f64.ne': 0x62,//		
  'f64.lt': 0x63,//		
  'f64.gt': 0x64,//		
  'f64.le': 0x65,//		
  'f64.ge': 0x66,//
}
export const COMPARISON = wrap(OP_Comparison);