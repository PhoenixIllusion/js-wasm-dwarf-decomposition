// https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/BinaryFormat/Dwarf.def
export const DW_MACRO = {
  // DWARF v5 Macro information.
  DW_MACRO_define: 0x01,
  DW_MACRO_undef: 0x02,
  DW_MACRO_start_file: 0x03,
  DW_MACRO_end_file: 0x04,
  DW_MACRO_define_strp: 0x05,
  DW_MACRO_undef_strp: 0x06,
  DW_MACRO_import: 0x07,
  DW_MACRO_define_sup: 0x08,
  DW_MACRO_undef_sup: 0x09,
  DW_MACRO_import_sup: 0x0a,
  DW_MACRO_define_strx: 0x0b,
  DW_MACRO_undef_strx: 0x0c,
  DW_MACRO_lo_user: 0xe0,
  DW_MACRO_hi_user: 0xff
}

export type DW_MACRO_KEY = keyof typeof DW_MACRO;