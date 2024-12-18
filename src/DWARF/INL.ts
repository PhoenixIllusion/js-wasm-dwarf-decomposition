export const DW_INL = {
  // Inline codes
  DW_INL_not_inlined: 0x00,
  DW_INL_inlined: 0x01,
  DW_INL_declared_not_inlined: 0x02,
  DW_INL_declared_inlined: 0x03
}

export type DW_INL_KEY = keyof typeof DW_INL;
