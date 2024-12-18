import { Reader } from "../../reader.js";
import { CALL, parse_call } from "./call.js";
import { COMPARISON } from "./comparison.js";
import { CONST, parse_const } from "./const.js";
import { CONTROL_FLOW, parse_control_flow } from "./control.js";
import { CONVERSION } from "./conversion.js";
import { EXCEPTIONS, parse_exceptions } from "./exceptions.js";
import { EXTEND } from "./extend.js";
import { MEMORY, parse_memory } from "./memory.js";
import { NUMERIC } from "./numeric.js";
import { PARAMETRIC, parse_parametric } from "./parametric.js";
import { PREFIX, parse_prefix } from "./prefix/index.js";
import { REF, parse_ref } from "./ref.js";
import { REINTERPRETATIONS } from "./reinterpretations.js";
import { VARIABLE, parse_variable } from "./variable.js";

export function wrap<T extends { [s: string]: number; }>(obj: T): { [code: number]: keyof T } {
  const ret: { [code: number]: keyof T } = {};
  Object.entries(obj).forEach(([_k, v]) => {
    const k = _k as keyof T;
    ret[v] = k;
  });
  return ret;
}

export function wrap_all(objs: Record<string,number>[]): { [code: number]: string } {
  const ret: { [code: number]: string } = {};
  objs.forEach(obj => {
    Object.entries(obj).forEach(([k, v]) => {
      ret[v] = k;
    })
  });
  return ret;
}


export interface OP_Command {
  op: string,
  offset: number,
  immediates?: number[]
}

export function wrap_op(code: number, reader: Reader, lookup: { [o: number]: string }, cb: (immediates: number[]) => void|OP_Command): OP_Command {
  let command: OP_Command = { op: lookup[code] as string, offset: reader.offset - 1 };
  const immediates: number[] = [];
  command = cb(immediates) || command;

  if (immediates.length > 0) command.immediates = immediates;
  return command;
}

type OpParser = (code: number, reader: Reader)=>OP_Command;
function simple_parser(lookup:{[key: number]:string}): OpParser {
  return function(code: number, reader: Reader) {
    return wrap_op(code, reader, lookup, _immediates => {});
  }
}
const CODES: [{[key: number]:string}, OpParser][] = [
  [CALL, parse_call],
  [COMPARISON, simple_parser(COMPARISON)],
  [CONST, parse_const],
  [CONTROL_FLOW, parse_control_flow],
  [CONVERSION, simple_parser(CONVERSION)],
  [EXCEPTIONS, parse_exceptions],
  [EXTEND, simple_parser(EXTEND)],
  [MEMORY, parse_memory],
  [NUMERIC, simple_parser(NUMERIC)],
  [PARAMETRIC, parse_parametric],
  [REF, parse_ref],
  [REINTERPRETATIONS, simple_parser(REINTERPRETATIONS)],
  [VARIABLE, parse_variable],
  [PREFIX, parse_prefix]
]

export function wasm_op_code_parse(buffer: Uint8Array) {
  const reader = new Reader(buffer);
  const commands: OP_Command[] = [];
  while(reader.offset < buffer.length) {
    const code = reader.getU8();
    CODES.forEach(([POSSIBLE, parser]) => {
      if(POSSIBLE[code]) {
        commands.push(parser(code, reader));
      }
    });
  }
  return commands;
}