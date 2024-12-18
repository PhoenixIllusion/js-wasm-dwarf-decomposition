import { Reader } from "../reader";

export interface DwarfRanges {
  [offset: number]: [number,number][]
}

export function dwarf_debug_ranges(section: Uint8Array): DwarfRanges {
  const dataView = new Reader(section);
  let offset = 0;
  const ret: DwarfRanges = {[offset]:[]}
  while (dataView.offset < section.length) {
    const low = dataView.getU32();
    const high = dataView.getU32();
    if(low == 0 && high == 0) {
      offset = dataView.offset;
      ret[offset] = [];
    } else {
      ret[offset].push([low, high]);
    }
  }
  return ret;
}