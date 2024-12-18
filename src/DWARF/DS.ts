// 7.8 - Decimal Sign Encoding

export const DW_DS = {
  DW_DS_unsigned: 0x0,
  DW_DS_leading_overpunch: 0x0,
  DW_DS_trailing_overpunch: 0x0,
  DW_DS_leading_separate: 0x0,
  DW_DS_trailing_separate: 0x05,
}

export type DW_DS_KEY = keyof typeof DW_DS;