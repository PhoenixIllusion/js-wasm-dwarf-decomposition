import * as DWARF from './DWARF/index';


function wrap<T extends { [s: string]: unknown; }>(obj: T, transform: (k: keyof T)=>number): {[code: number]: keyof T } {
  const ret: {[code: number]: keyof T } = {};
  Object.entries(obj).forEach(([_k,v])=> {
    const k = _k as keyof T;
    ret[transform(k)]=k;
  });
  return ret;
}

function wrapCode<T extends {[s: string]: {code: number}}>(obj: T): {[code: number]: keyof T } {
  return wrap(obj, x => obj[x].code);
}
function wrapSimple<T extends {[s: string]: number}>(obj: T): {[code: number]: keyof T } {
  return wrap(obj, x => obj[x]);
}

export { DWARF };

export const DW_TAG = wrapSimple(DWARF.DW_TAG);
export const DW_CHILDREN = wrapSimple(DWARF.DW_CHILDREN);
export const DW_AT = wrapSimple(DWARF.DW_AT);
export const DW_LANG = wrapSimple(DWARF.DW_LANG);
export const DW_FORM = wrapSimple(DWARF.DW_FORM);
