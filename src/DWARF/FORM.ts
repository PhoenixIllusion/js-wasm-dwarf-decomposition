// https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/BinaryFormat/Dwarf.def

export const DW_FORM = {
  DW_FORM_addr: 0x01,
  DW_FORM_block2: 0x03,
  DW_FORM_block4: 0x04,
  DW_FORM_data2: 0x05,
  DW_FORM_data4: 0x06,
  DW_FORM_data8: 0x07,
  DW_FORM_string: 0x08,
  DW_FORM_block: 0x09,
  DW_FORM_block1: 0x0a,
  DW_FORM_data1: 0x0b,
  DW_FORM_flag: 0x0c,
  DW_FORM_sdata: 0x0d,
  DW_FORM_strp: 0x0e,
  DW_FORM_udata: 0x0f,
  DW_FORM_ref_addr: 0x10,
  DW_FORM_ref1: 0x11,
  DW_FORM_ref2: 0x12,
  DW_FORM_ref4: 0x13,
  DW_FORM_ref8: 0x14,
  DW_FORM_ref_udata: 0x15,
  DW_FORM_indirect: 0x16,
  // New in DWARF v4:
  DW_FORM_sec_offset: 0x17,
  DW_FORM_exprloc: 0x18,
  DW_FORM_flag_present: 0x19,
  // This was defined out of sequence.
  DW_FORM_ref_sig8: 0x20,
  // New in DWARF v5:
  DW_FORM_strx: 0x1a,
  DW_FORM_addrx: 0x1b,
  DW_FORM_ref_sup4: 0x1c,
  DW_FORM_strp_sup: 0x1d,
  DW_FORM_data16: 0x1e,
  DW_FORM_line_strp: 0x1f,
  DW_FORM_implicit_const: 0x21,
  DW_FORM_loclistx: 0x22,
  DW_FORM_rnglistx: 0x23,
  DW_FORM_ref_sup8: 0x24,
  DW_FORM_strx1: 0x25,
  DW_FORM_strx2: 0x26,
  DW_FORM_strx3: 0x27,
  DW_FORM_strx4: 0x28,
  DW_FORM_addrx1: 0x29,
  DW_FORM_addrx2: 0x2a,
  DW_FORM_addrx3: 0x2b,
  DW_FORM_addrx4: 0x2c,
  // Extensions for Fission proposal
  DW_FORM_GNU_addr_index: 0x1f01,
  DW_FORM_GNU_str_index: 0x1f02,
  // Alternate debug sections proposal (output of "dwz" tool).
  DW_FORM_GNU_ref_alt: 0x1f20,
  DW_FORM_GNU_strp_alt: 0x1f21,
  // LLVM addr+offset extension
  DW_FORM_LLVM_addrx_offset: 0x2001,
}

export type DW_FORM_KEY = keyof typeof DW_FORM;

const ADDR_SIZE = 4; // just handling 32-bit so far
const IS_DWARF32 = true;

const Params = {
  AddrSize: () => {
    return ADDR_SIZE;
  },
  getDwarfOffsetByteSize: () => {
    //case DwarfFormat::DWARF32:
    if (IS_DWARF32)
      return 4;
    //case DwarfFormat::DWARF64:
    return 8;
  },
  getRefAddrByteSize: () => {
    return Params.getDwarfOffsetByteSize();
  }
}

export const DW_FORM_NON_FIXED = {
  L_1: -1,
  L_2: -2,
  L_4: -4,
  L_ULEB128: -5,
  ULEB128: -6,
  SLEB128: -7,
  C_STR: -8,
  ERR: -255
}

export function llvm_dwarf_getFixedFormByteSize(form: DW_FORM_KEY): number {
  switch (form) {
    case 'DW_FORM_addr':
      return Params.AddrSize();

    case 'DW_FORM_block':          // ULEB128 length L followed by L bytes.
      return DW_FORM_NON_FIXED.L_ULEB128;
    case 'DW_FORM_block1':         // 1 byte length L followed by L bytes.
    return DW_FORM_NON_FIXED.L_1;
    case 'DW_FORM_block2':         // 2 byte length L followed by L bytes.
    return DW_FORM_NON_FIXED.L_2;
    case 'DW_FORM_block4':         // 4 byte length L followed by L bytes.
    return DW_FORM_NON_FIXED.L_4;
    case 'DW_FORM_string':         // C-string with null terminator.
    return DW_FORM_NON_FIXED.C_STR;
    case 'DW_FORM_sdata':          // SLEB128.
    return DW_FORM_NON_FIXED.SLEB128;
    case 'DW_FORM_udata':          // ULEB128.
    case 'DW_FORM_ref_udata':      // ULEB128.
    case 'DW_FORM_indirect':       // ULEB128.
    return DW_FORM_NON_FIXED.ULEB128;
    case 'DW_FORM_exprloc':        // ULEB128 length L followed by L bytes.
    return DW_FORM_NON_FIXED.L_ULEB128;
    case 'DW_FORM_strx':           // ULEB128.
    case 'DW_FORM_addrx':          // ULEB128.
    case 'DW_FORM_loclistx':       // ULEB128.
    case 'DW_FORM_rnglistx':       // ULEB128.
    case 'DW_FORM_GNU_addr_index': // ULEB128.
    case 'DW_FORM_GNU_str_index':  // ULEB128.
    return DW_FORM_NON_FIXED.ULEB128;

    case 'DW_FORM_ref_addr':
      return Params.getRefAddrByteSize();

    case 'DW_FORM_flag':
    case 'DW_FORM_data1':
    case 'DW_FORM_ref1':
    case 'DW_FORM_strx1':
    case 'DW_FORM_addrx1':
      return 1;

    case 'DW_FORM_data2':
    case 'DW_FORM_ref2':
    case 'DW_FORM_strx2':
    case 'DW_FORM_addrx2':
      return 2;

    case 'DW_FORM_strx3':
    case 'DW_FORM_addrx3':
      return 3;

    case 'DW_FORM_data4':
    case 'DW_FORM_ref4':
    case 'DW_FORM_ref_sup4':
    case 'DW_FORM_strx4':
    case 'DW_FORM_addrx4':
      return 4;

    case 'DW_FORM_strp':
    case 'DW_FORM_GNU_ref_alt':
    case 'DW_FORM_GNU_strp_alt':
    case 'DW_FORM_line_strp':
    case 'DW_FORM_sec_offset':
    case 'DW_FORM_strp_sup':
      return Params.getDwarfOffsetByteSize();

    case 'DW_FORM_data8':
    case 'DW_FORM_ref8':
    case 'DW_FORM_ref_sig8':
    case 'DW_FORM_ref_sup8':
      return 8;

    case 'DW_FORM_flag_present':
      return 0;

    case 'DW_FORM_data16':
      return 16;

    case 'DW_FORM_implicit_const':
      // The implicit value is stored in the abbreviation as a SLEB128, and
      // there no data in debug info.
      return 0;

    default:
      break;
  }
  return -3;
}