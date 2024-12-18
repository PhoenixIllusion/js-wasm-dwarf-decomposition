import asc from "assemblyscript/asc";
import fs from 'fs';
import transform from './transform.js';

const { error, stdout, stderr } = await asc.main(
[
  "assembly/index.ts",
  '--sourceMap',
  '--target','debug'
], {
  // Additional API options
  stdout: {write: console.log },
  stderr: {write: console.error },
  readFile: (file: string, baseDir: string) => {
    console.log("Read File: ", file, baseDir);
    return fs.readFileSync(baseDir + '/' + file).toString('utf8');
  },
  writeFile: (file: string, contents: string | Uint8Array) => {
    console.log("Write File: ", file);
    fs.writeFileSync(file, contents);
  },
  transforms: [transform] as any
  //writeFile: ...,
  //listFiles?: ...,
  //reportDiagnostic: ...,
});
if (error) {
  console.log("Compilation failed: " + error.message);
  console.log(stderr.toString());
} else {
  console.log(stdout.toString());
}