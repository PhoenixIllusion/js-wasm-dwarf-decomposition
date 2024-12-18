import { Reader } from "../reader";

export interface DwarfLineFile {
  path_name: string;
  directory_index: number;
  last_modified_date: number;
  file_length: number;
}

export interface DwarfLine {
  unit_length: number;
  version: number;
  header_length: number;
  minimum_instruction_length: number;
  maximum_operations_per_instruction: number;
  default_is_stmt: number;
  line_base: number;
  line_range: number;
  opcode_base: number;
  standard_opcode_lengths: number[];
  include_directories: string[];
  file_names: DwarfLineFile[];
  line_number_program: Uint8Array;
}


export function dwarf_debug_line(section: Uint8Array): DwarfLine[] {
  const dataView = new Reader(section);

  const ret: DwarfLine[] = [];
  while (dataView.offset < section.length) {
    const unit_length = dataView.getU32();
    const next_unit = dataView.offset + unit_length;
    const version = dataView.getU16();
    const header_length = dataView.getU32();
    const line_number_program_start = header_length + dataView.offset;
    const minimum_instruction_length = dataView.getU8();
    const maximum_operations_per_instruction = dataView.getU8();
    const default_is_stmt = dataView.getU8();
    const line_base = dataView.getS8();
    const line_range = dataView.getU8();
    const opcode_base = dataView.getU8();
    const standard_opcode_lengths: number[] = [];
    for(let i=0;i<opcode_base-1;i++){
      standard_opcode_lengths[i] = dataView.getU8();
    }
    const include_directories: string[] = [''];
    {
      let str = '';
      do {
        str = dataView.getNullTermString();
        if(str.length > 0) {
          include_directories.push(str);
        }
      }
      while(str.length > 0);
    }
    
    const file_names: DwarfLineFile[] = [];
    {
      let path_name = '';
      do {
        path_name = dataView.getNullTermString();
        if(path_name.length > 0) {
          const directory_index = dataView.getULEB128();
          const last_modified_date = dataView.getULEB128();
          const file_length = dataView.getULEB128();

          file_names.push({
            path_name,
            directory_index,
            last_modified_date,
            file_length
          });
        }
      }
      while(dataView.offset < line_number_program_start);
    }
    const line_number_program = section.slice(line_number_program_start, next_unit);
    dataView.offset = next_unit;
    ret.push({
      unit_length,
      version,
      header_length,
      minimum_instruction_length,
      maximum_operations_per_instruction,
      default_is_stmt,
      line_base,
      line_range,
      opcode_base,
      standard_opcode_lengths,
      include_directories,
      file_names,
      line_number_program
    })
  }
  return ret;
}