// 7.8 - Endianity Encoding

export const DW_END = {
  DW_END_default: 0x00,
  DW_END_big: 0x01,
  DW_END_little: 0x02,
  DW_END_lo_user: 0x40,
  DW_END_hi_user: 0xff,
}
export type DW_END_KEY = keyof typeof DW_END;