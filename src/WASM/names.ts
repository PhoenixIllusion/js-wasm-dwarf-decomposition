import { Reader } from "../reader.js";
import { textDecoder } from "../text_decoder.js";

export interface WasmNameModuleSubSection {
  name_type: NameType;
  name_payload_len: number;
  name_len: number;
  name_str: string;
}
interface WasmNaming {
  index: number;
  name_len: number;
  name_str: string;
}
interface WasmNameMap {
  count: number;
  names: WasmNaming[];
}
export interface WasmNameMapSubSection extends WasmNameMap {
  name_type: NameType;
  name_payload_len: number;
}
interface WasmNameIndirectMap {
  index: number;
  local_map: WasmNameMap;
}
export interface WasmNameIndirectMapSubSection {
  name_type: NameType;
  name_payload_len: number;
  count: number;
  map: WasmNameIndirectMap[]
}
export interface WasmNameSection {
  module?: WasmNameModuleSubSection;
  functions?: WasmNameMapSubSection;
  locals?: WasmNameIndirectMapSubSection;
  labels?: WasmNameIndirectMapSubSection;
  types?: WasmNameMapSubSection;
  tables?: WasmNameMapSubSection;
  memories?: WasmNameMapSubSection;
  globals?: WasmNameMapSubSection;
  element?: WasmNameMapSubSection;
  data?: WasmNameMapSubSection;
}

enum NameType {
  MODULE = 0,
  FUNCTION = 1,
  LOCAL = 2,
  LABEL = 3,
  TYPE = 4,
  TABLE = 5,
  MEMORY = 6,
  GLOBAL = 7,
  ELEMENT = 8,
  DATA = 9,

}

function wasm_name_map(reader: Reader): WasmNameMap {
  const count = reader.getULEB128();
  const names: WasmNaming[] = [];
  for(let i=0;i<count;i++) {
    const index = reader.getULEB128();
    const name_len = reader.getULEB128();
    const name_str = textDecoder.decode(reader.getBuffer(name_len));
    names.push({index, name_len, name_str});
  }
  return { count, names};
}

function wasm_indirect_name_map(reader: Reader): {count: number, map: WasmNameIndirectMap[] } {
  const count = reader.getULEB128();
  const map: WasmNameIndirectMap[] = [];
  for(let i=0;i<count;i++) {
    const index = reader.getULEB128();
    const local_map = wasm_name_map(reader);
    map.push({index, local_map})
  }
  return { count, map };
}

export function wasm_parse_name(buffer: Uint8Array): WasmNameSection {
  const reader = new Reader(buffer);
  const ret: WasmNameSection = {};
  while(reader.offset < buffer.length) {
    const name_type = reader.getULEB128() as NameType;
    const name_payload_len = reader.getULEB128();
    switch(name_type) {
      case NameType.MODULE: {
        const name_len = reader.getULEB128();
        const name_str = textDecoder.decode(reader.getBuffer(name_len));
        ret.module = {name_type, name_payload_len, name_len, name_str};
      }
      break;
      case NameType.FUNCTION: {
        ret.functions = {name_type, name_payload_len, ... wasm_name_map(reader) };
      }
      break;
      case NameType.LOCAL:{
        ret.locals = {name_type, name_payload_len, ... wasm_indirect_name_map(reader)};
      }        
      break;
      case NameType.LOCAL:{
        ret.labels = {name_type, name_payload_len, ... wasm_indirect_name_map(reader)};
      }        
      break;
      case NameType.TYPE: {
        ret.types = {name_type, name_payload_len, ... wasm_name_map(reader) };
      }
      break;
      case NameType.TABLE: {
        ret.tables = {name_type, name_payload_len, ... wasm_name_map(reader) };
      }
      break;
      case NameType.MEMORY: {
        ret.memories = {name_type, name_payload_len, ... wasm_name_map(reader) };
      }
      break;
      case NameType.GLOBAL: {
        ret.globals = {name_type, name_payload_len, ... wasm_name_map(reader) };
      }
      break;
      case NameType.ELEMENT: {
        ret.element = {name_type, name_payload_len, ... wasm_name_map(reader) };
      }
      break;
      case NameType.DATA: {
        ret.data = {name_type, name_payload_len, ... wasm_name_map(reader) };
      }
      break;
    }
  }
  return ret;
}