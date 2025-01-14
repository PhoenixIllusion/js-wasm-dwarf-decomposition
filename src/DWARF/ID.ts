export const DW_ID = {
  // Identifier case codes
  DW_ID_case_sensitive: 0x00,
  DW_ID_up_case: 0x01,
  DW_ID_down_case: 0x02,
  DW_ID_case_insensitive: 0x03
}

export type DW_ID_KEY = keyof typeof DW_ID;