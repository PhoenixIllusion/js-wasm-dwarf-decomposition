// https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/BinaryFormat/Dwarf.def
export const DW_LANG = {
  // DWARF languages.
  DW_LANG_C89: 0x0001,
  DW_LANG_C: 0x0002,
  DW_LANG_Ada83: 0x0003,
  DW_LANG_C_plus_plus: 0x0004,
  DW_LANG_Cobol74: 0x0005,
  DW_LANG_Cobol85: 0x0006,
  DW_LANG_Fortran77: 0x0007,
  DW_LANG_Fortran90: 0x0008,
  DW_LANG_Pascal83: 0x0009,
  DW_LANG_Modula2: 0x000a,
  // New in DWARF v3:
  DW_LANG_Java: 0x000b,
  DW_LANG_C99: 0x000c,
  DW_LANG_Ada95: 0x000d,
  DW_LANG_Fortran95: 0x000e,
  DW_LANG_PLI: 0x000f,
  DW_LANG_ObjC: 0x0010,
  DW_LANG_ObjC_plus_plus: 0x0011,
  DW_LANG_UPC: 0x0012,
  DW_LANG_D: 0x0013,
  // New in DWARF v4:
  DW_LANG_Python: 0x0014,
  // New in DWARF v5:
  DW_LANG_OpenCL: 0x0015,
  DW_LANG_Go: 0x0016,
  DW_LANG_Modula3: 0x0017,
  DW_LANG_Haskell: 0x0018,
  DW_LANG_C_plus_plus_03: 0x0019,
  DW_LANG_C_plus_plus_11: 0x001a,
  DW_LANG_OCaml: 0x001b,
  DW_LANG_Rust: 0x001c,
  DW_LANG_C11: 0x001d,
  DW_LANG_Swift: 0x001e,
  DW_LANG_Julia: 0x001f,
  DW_LANG_Dylan: 0x0020,
  DW_LANG_C_plus_plus_14: 0x0021,
  DW_LANG_Fortran03: 0x0022,
  DW_LANG_Fortran08: 0x0023,
  DW_LANG_RenderScript: 0x0024,
  DW_LANG_BLISS: 0x0025,
  // New since DWARF v5:
  DW_LANG_Kotlin: 0x0026,
  DW_LANG_Zig: 0x0027,
  DW_LANG_Crystal: 0x0028,
  DW_LANG_C_plus_plus_17: 0x002a,
  DW_LANG_C_plus_plus_20: 0x002b,
  DW_LANG_C17: 0x002c,
  DW_LANG_Fortran18: 0x002d,
  DW_LANG_Ada2005: 0x002e,
  DW_LANG_Ada2012: 0x002f,
  DW_LANG_Mojo: 0x0033,
  // Vendor extensions:
  DW_LANG_Mips_Assembler: 0x8001,
  DW_LANG_GOOGLE_RenderScript: 0x8e57,
  DW_LANG_BORLAND_Delphi: 0xb000,
  DW_LANG_lo_user: 0x8000,
  DW_LANG_hi_user: 0xffff
}

export type DW_LANG_KEY = keyof typeof DW_LANG;