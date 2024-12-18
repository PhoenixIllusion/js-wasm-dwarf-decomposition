import { DW_FORM_NON_FIXED } from "../DWARF/FORM";
import { DWARF, DW_LANG } from "../DWARF";
import { Reader, lift_string } from "../reader";
import { DwarfAbbrevComponent, DwarfAbbrev } from "./abbrev";
import { DwarfRanges } from "./ranges";

export interface DwarfInfo {
  unit_length: number;
  version: number;
  debug_abbrev_offset: number;
  address_size: number;
  compilation_unit: DwarfInfoEntry
}
export interface DwarfInfoEntry {
  offset: number,
  name: string,
  attributes: { [key: string]: string | Uint8Array | number | ([number,number][]) | DwarfInfoEntry | bigint },
  children?: DwarfInfoEntry[],
  template: DwarfAbbrevComponent
}

function link_compilation_unit(cu: DwarfInfoEntry, ranges: DwarfRanges, str: Uint8Array, unit_lookup: {[offset: number]: DwarfInfoEntry}) {
  cu.template.attributes.forEach(attribute => {
    switch(attribute.attribute_form) {
      case 'DW_FORM_strp': {
          const offset = cu.attributes[attribute.attribute_name] as number;
          cu.attributes[attribute.attribute_name] = lift_string(str, offset)!;
        }
        break;
    }
    switch(attribute.attribute_name) {
      case 'DW_AT_type': {
          const offset = cu.attributes[attribute.attribute_name] as number;
          cu.attributes[attribute.attribute_name] = unit_lookup[offset];
        }
        break;
      case 'DW_AT_ranges': {
        const offset = cu.attributes[attribute.attribute_name] as number;
        cu.attributes[attribute.attribute_name] = ranges[offset];
      }
      break;
      case 'DW_AT_language': {
          const lang = cu.attributes[attribute.attribute_name] as number;
          let val = DW_LANG[lang] || 'unknown';
          cu.attributes[attribute.attribute_name] = val;
        }
        break;
    }
  })
  if(cu.children) {
    cu.children.forEach(entry => link_compilation_unit(entry, ranges, str, unit_lookup));
  }
}

function read_attribute(reader: Reader, form: DWARF.DW_FORM_KEY): number | bigint | Uint8Array | string {
  const size = DWARF.llvm_dwarf_getFixedFormByteSize(form);

  switch (size) {
    case 0:
      return 1; //implicit present
    case 1:
      return reader.getU8()
    case 2:
      return reader.getU16();
    case 4:
      return reader.getU32();
    case 8:
      return reader.getU64();
    case DW_FORM_NON_FIXED.ULEB128: 
      return reader.getULEB128();
    case DW_FORM_NON_FIXED.SLEB128: 
      return reader.getSLEB128();
    case DW_FORM_NON_FIXED.C_STR:
      return reader.getNullTermString();

    case DW_FORM_NON_FIXED.L_1: {
      const len = reader.getU8();
      return reader.getBuffer(len);
    }
    case DW_FORM_NON_FIXED.L_2: {
      const len = reader.getU16();
      return reader.getBuffer(len);
    }
    case DW_FORM_NON_FIXED.L_4: {
      const len = reader.getU32();
      return reader.getBuffer(len);
    }
    case DW_FORM_NON_FIXED.L_ULEB128: {
      const len = reader.getULEB128();
      return reader.getBuffer(len);
    }
  }
  return -1;
}


export function dwarf_debug_info(section: Uint8Array, abbrev: DwarfAbbrev, ranges: DwarfRanges, str: Uint8Array) {
  const dataView = new Reader(section);

  function read_die(next_unit_at: number, debug_abbrev_offset: number, binary_offset: number): DwarfInfoEntry {
    const result: DwarfInfoEntry[] = [];
    let childStack = [result];
    const compilation_unit_offset_lookup: {[offset: number]: DwarfInfoEntry} = {}
    while (dataView.offset < next_unit_at) {
      const offset = dataView.offset - binary_offset;
      const abbrev_code = dataView.getULEB128();
      if (abbrev_code != 0) {
        const template = abbrev[debug_abbrev_offset][abbrev_code];
        const attributes: { [key: string]: string | Uint8Array | number | bigint } = {};
        template.attributes.forEach(attrib => {
          attributes[attrib.attribute_name] = read_attribute(dataView, attrib.attribute_form);
        });
        const entry: DwarfInfoEntry = { offset, name: template.entry_tag, attributes: attributes, template };
        childStack[0].push(entry);
        compilation_unit_offset_lookup[offset] = entry;
        if(template.has_children) {
          childStack.unshift(entry.children = []);
        }
      } else {
        childStack.shift();
      }
    }
    link_compilation_unit(result[0], ranges, str, compilation_unit_offset_lookup);
    return result[0];
  }

  const ret: DwarfInfo[] = []
  while (dataView.offset < section.length) {
    const binary_offset = dataView.offset;
    const unit_length = dataView.getU32();
    const next_unit_at = dataView.offset + unit_length;
    const version = dataView.getU16();
    const debug_abbrev_offset = dataView.getU32();
    const address_size = dataView.getU8();
    const CU: DwarfInfo = {
      unit_length, version, debug_abbrev_offset, address_size,
      compilation_unit: read_die(next_unit_at, debug_abbrev_offset, binary_offset)
    }
    ret.push(CU);
  }

  return ret;
}