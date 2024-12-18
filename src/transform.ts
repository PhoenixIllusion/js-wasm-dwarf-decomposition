import { Module } from "assemblyscript"
import { Transform } from "assemblyscript/transform"
import binaryen from 'assemblyscript/binaryen';
import { wasm_decomp } from "./wasm.js";
import { wasm_parse } from "./WASM/file.js";
import { buildFunctionData } from "./wasm-dwarf-convert.js";

const encoder = new TextEncoder();

class MyTransform extends Transform {
  constructor() {
    super();
  }
  afterCompile(_module: Module): void {
    const module = binaryen.wrapModule((_module as any).ptr);
    //this.log('After Compile');
    const file = './ext.debug.wasm';
    const bytes = encoder.encode(file)
    module.addCustomSection('external_debug_info', new Uint8Array([file.length, ... bytes]));
    binaryen.setDebugInfo(true);
    const wasm = module.emitBinary('x');
    const wasmFile = wasm_parse(wasm.binary);
    const decomp = wasm_decomp(wasmFile);
    if(decomp?.code) {
      buildFunctionData(module, this.program, decomp.code);
    }
  }
}
export default MyTransform
