import { DWARF, DW_AT, DW_FORM, DW_TAG } from "../DWARF";
import { Reader } from "../reader";

export interface DwarfAbbrevComponent {
  entry_tag: string;
  has_children: number;
  attributes: DwarfAbbrevAttribute[];
}

export interface DwarfAbbrevAttribute {
  attribute_name: DWARF.DW_AT_KEY;
  attribute_at_id: number;
  attribute_form: DWARF.DW_FORM_KEY;
  attribute_form_id: number;
}

export interface DwarfAbbrev {
  [offset: number]: {
    [code: number]: DwarfAbbrevComponent
  }
}

export function dwarf_debug_abbrev(section: Uint8Array) {
  const dataView = new Reader(section);

  let offset = 0;
  const ret: DwarfAbbrev = { [offset]: {} };
  function read_attributes(): DwarfAbbrevAttribute[] {
    const attributes: DwarfAbbrevAttribute[] = [];
    while (true) {
      const name = dataView.getULEB128();
      const attribute_name = DW_AT[name];
      const form = dataView.getULEB128();
      const attribute_form = DW_FORM[form];
      if (name == 0 && form == 0) {
        return attributes;
      }
      attributes.push({ attribute_name, attribute_at_id: name, attribute_form, attribute_form_id: form });
    }
  }
  while (dataView.offset < section.length) {
    const abbreviation_code = dataView.getULEB128();
    if (abbreviation_code == 0) {
      offset = dataView.offset;
      ret[offset] = {};
    } else {
      const entry_tag = DW_TAG[dataView.getULEB128()];
      const has_children = dataView.getU8();
      const entry: DwarfAbbrevComponent = {
        entry_tag,
        has_children,
        attributes: []
      };
      ret[offset][abbreviation_code] = entry;
      entry.attributes = read_attributes();
    }
  }
  return ret;
}