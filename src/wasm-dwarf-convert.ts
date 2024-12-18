import { Function, Element, File, Program, Type, Global } from "assemblyscript";
import binaryen from 'binaryen';
import { WasmCodeFunction, WasmCodeSection } from "./WASM/code.js";

import { DWARF } from './DWARF';

const CU_Template = [
  [DWARF.DW_AT.DW_AT_producer, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_language, DWARF.DW_FORM.DW_FORM_data2],
  [DWARF.DW_AT.DW_AT_name, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_comp_dir, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_low_pc, DWARF.DW_FORM.DW_FORM_addr],
  [DWARF.DW_AT.DW_AT_ranges, DWARF.DW_FORM.DW_FORM_sec_offset]
]

const SubProgram_Template = [
  [DWARF.DW_AT.DW_AT_low_pc, DWARF.DW_FORM.DW_FORM_addr],
  [DWARF.DW_AT.DW_AT_high_pc, DWARF.DW_FORM.DW_FORM_data4],
  [DWARF.DW_AT.DW_AT_frame_base, DWARF.DW_FORM.DW_FORM_exprloc],
  [DWARF.DW_AT.DW_AT_name, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_type, DWARF.DW_FORM.DW_FORM_ref4],
  [DWARF.DW_AT.DW_AT_external, DWARF.DW_FORM.DW_FORM_flag]
]

const SuProgramVar_Template = [
  [DWARF.DW_AT.DW_AT_location, DWARF.DW_FORM.DW_FORM_exprloc],
  [DWARF.DW_AT.DW_AT_name, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_type, DWARF.DW_FORM.DW_FORM_ref4]
]

const Base_Type_Template = [
  [DWARF.DW_AT.DW_AT_name, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_encoding, DWARF.DW_FORM.DW_FORM_data1],
  [DWARF.DW_AT.DW_AT_byte_size, DWARF.DW_FORM.DW_FORM_data1]
]

const Struct_Template = [
  [DWARF.DW_AT.DW_AT_calling_convention, DWARF.DW_FORM.DW_FORM_data1],
  [DWARF.DW_AT.DW_AT_name, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_byte_size, DWARF.DW_FORM.DW_FORM_data1],
]

const Struct_Member_Template = [
  [DWARF.DW_AT.DW_AT_name, DWARF.DW_FORM.DW_FORM_strp],
  [DWARF.DW_AT.DW_AT_type, DWARF.DW_FORM.DW_FORM_ref4],
  [DWARF.DW_AT.DW_AT_data_member_location, DWARF.DW_FORM.DW_FORM_data1]
]

interface CompilationUnitData {
  name: string;
  functions: FunctionData[];
  typeData: TypeData[];
}

interface TypeData {
  name: string;
  properties: ArgData[];
  methods: FunctionData[];
}

interface ArgData {
  name: string;
  type: Type;
}

interface FunctionData {
  name: string;
  index: number;
  internalName: string;
  low: number;
  high: number;
  param: ArgData[];
  vars: ArgData[];
  return: Type;
}

function parseFunctionEle(info: Function, index: number, functionOffsets: [number, WasmCodeFunction][]): FunctionData {
  const funcData: FunctionData = {
    name: info.name,
    index,
    internalName: info.internalName,
    low: functionOffsets[index][0],
    high: functionOffsets[index][1].body_size,
    param: [],
    vars: [],
    return: info.signature.returnType
  }
  const numParams = info.signature.parameterTypes.length;
  info.localsByIndex.map((loc,i) => {
    const name = loc.name;
    const type = loc.type;
    const arg = { name, type}
    if(i<numParams) {
      funcData.param.push(arg);
    } else {
      funcData.vars.push(arg);
    }
  })
  return funcData;
}

function extractAllElements(module: binaryen.Module, program: Program) {
  const globalCount = module.getNumGlobals();
  const functionCount = module.getNumFunctions();
  const files: Set<File> = new Set<File>();
  const functions: Map<File, Function[]> = new Map<File, Function[]>();
  const globals: Map<File, Global[]> = new Map<File, Global[]>();
  const globalList: binaryen.GlobalInfo[] = [];
  const functionList: binaryen.FunctionInfo[] = [];
  for(let i=0;i<globalCount;i++) {
    const funcRef = module.getGlobalByIndex(i);
    const info = binaryen.getGlobalInfo(funcRef);
    const ele = program.elementsByName.get(info.name)!;
    if(ele instanceof Global) {
      globalList.push(info);
      const arr = globals.get(ele.file)|| [];
      arr.push(ele);
      globals.set(ele.file, arr);
      files.add(ele.file);
    }
  }

  for(let i=0;i<functionCount;i++) {
    const funcRef = module.getFunctionByIndex(i);
    const info = binaryen.getFunctionInfo(funcRef);
    const ele = program.elementsByName.get(info.name)!;
    if(ele instanceof Function) {
      functionList.push(info);
      const arr = functions.get(ele.file)|| [];
      arr.push(ele);
      functions.set(ele.file, arr);
      files.add(ele.file);
    }
  }
  return { files, functions, globals, globalList, functionList }
}

export function buildFunctionData(module: binaryen.Module, program: Program, codeSection: WasmCodeSection) {

  const files = extractAllElements(module, program);

  const functionOffsets: [number, WasmCodeFunction][] = Object.entries(codeSection) as any as [number, WasmCodeFunction][];

  const units: CompilationUnitData[] = [];

  [...files.files.keys()].forEach((file) => {
    const functions = files.functions.get(file)||[];
    const globals = files.globals.get(file)||[];
    if(functions.length > 0) {
      const cu: CompilationUnitData = {
        name: file.name,
        functions: [],
        typeData: []
      };
      ele.forEach(func => {
        cu.functions.push(func);
      });
      units.push(cu);
    }
    debugger;
  })
  console.log(units);
}