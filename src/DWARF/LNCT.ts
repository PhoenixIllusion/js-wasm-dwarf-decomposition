// Dwarf5 7.12 - Source languages
export const DW_LNCT = {
  // DWARF v5 Line number header entry format.
  DW_LNCT_path: 0x01,
  DW_LNCT_directory_index: 0x02,
  DW_LNCT_timestamp: 0x03,
  DW_LNCT_size: 0x04,
  DW_LNCT_MD5: 0x05,
  // A vendor extension until http://dwarfstd.org/ShowIssue.php?issue=180201.1 is
  // accepted and incorporated into the next DWARF standard.
  DW_LNCT_LLVM_source: 0x2001,
  DW_LNCT_lo_user: 0x2000,
  DW_LNCT_hi_user: 0x3fff,
}
export type DW_LNCTKEY = keyof typeof DW_LNCT;