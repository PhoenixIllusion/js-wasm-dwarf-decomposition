// https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/BinaryFormat/Dwarf.def
export const DW_LNE = {
// Line Number Extended Opcode Encodings
DW_LNE_end_sequence: 0x01,
DW_LNE_set_address: 0x02,
DW_LNE_define_file: 0x03,
// New in DWARF v4:
DW_LNE_set_discriminator: 0x04,
DW_LNE_lo_user: 0x80,
DW_LNE_hi_user: 0xff
}

export type DW_LNE_KEY = keyof typeof DW_LNE;