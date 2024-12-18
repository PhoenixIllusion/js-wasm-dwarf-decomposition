// https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/BinaryFormat/Dwarf.def
export const DW_LNS = {
  // Line Number Standard Opcode Encodings.
  DW_LNS_extended_op: 0x00,
  DW_LNS_copy: 0x01,
  DW_LNS_advance_pc: 0x02,
  DW_LNS_advance_line: 0x03,
  DW_LNS_set_file: 0x04,
  DW_LNS_set_column: 0x05,
  DW_LNS_negate_stmt: 0x06,
  DW_LNS_set_basic_block: 0x07,
  DW_LNS_const_add_pc: 0x08,
  DW_LNS_fixed_advance_pc: 0x09,
  // New in DWARF v3:
  DW_LNS_set_prologue_end: 0x0a,
  DW_LNS_set_epilogue_begin: 0x0b,
  DW_LNS_set_isa: 0x0c,
}

export type DW_LNS_KEY = keyof typeof DW_LNS;