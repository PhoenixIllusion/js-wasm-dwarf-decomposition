// 7.8 - Base Type Attribute Encoding

export const DW_ATE = {
// DWARF attribute type encodings.
DW_LANG_address: 0x01,
DW_LANG_boolean: 0x02,
DW_LANG_complex_float: 0x03,
DW_LANG_float: 0x04,
DW_LANG_signed: 0x05,
DW_LANG_signed_char: 0x06,
DW_LANG_unsigned: 0x07,
DW_LANG_unsigned_char: 0x08,
// New in DWARF v3:
DW_LANG_imaginary_float: 0x09,
DW_LANG_packed_decimal: 0x0a,
DW_LANG_numeric_string: 0x0b,
DW_LANG_edited: 0x0c,
DW_LANG_signed_fixed: 0x0d,
DW_LANG_unsigned_fixed: 0x0e,
DW_LANG_decimal_float: 0x0f,
// New in DWARF v4:
DW_LANG_UTF: 0x10,
// New in DWARF v5:
DW_LANG_UCS: 0x11,
DW_LANG_ASCII: 0x12,

// The version numbers of all vendor extensions >0x80 were guessed.
// Conflicting:
// DW_LANG_ALTIUM_fract: 0x80,
// DW_LANG_ALTIUM_accum: 0x81,

DW_LANG_HP_complex_float: 0x81,
DW_LANG_HP_float128: 0x82,
DW_LANG_HP_complex_float128: 0x83,
DW_LANG_HP_floathpintel: 0x84,
DW_LANG_HP_imaginary_float90: 0x85,
DW_LANG_HP_imaginary_float128: 0x86,
// Conflicting:
// DW_LANG_SUN_imaginary_float: 0x86,
}

export type DW_ATE_KEY = keyof typeof DW_ATE;