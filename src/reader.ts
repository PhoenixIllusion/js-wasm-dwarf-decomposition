import { textDecoder } from "./text_decoder.js";


export class Reader {
  public offset = 0;
  dataView: DataView;
  constructor(private _uint8: Uint8Array) {
    this.dataView = new DataView(_uint8.buffer);
  }
  getU8(): number {
    const v = this.dataView.getUint8(this.offset);
    this.offset += 1;
    return v;
  }
  getS8(): number {
    const v = this.dataView.getInt8(this.offset);
    this.offset += 1;
    return v;
  }
  getU16() {
    let v = this.dataView.getUint16(this.offset, true);
    this.offset += 2;
    return v
  }
  getU32() {
    let v = this.dataView.getUint32(this.offset, true);
    this.offset += 4;
    return v
  }
  getS32() {
    let v = this.dataView.getInt32(this.offset, true);
    this.offset += 4;
    return v
  }
  getF32() {
    let v = this.dataView.getFloat32(this.offset, true);
    this.offset += 4;
    return v
  }
  getU64() {
    let v = this.dataView.getBigUint64(this.offset, true);
    this.offset += 8;
    return v
  }
  getS64() {
    let v = this.dataView.getBigInt64(this.offset, true);
    this.offset += 8;
    return v
  }
  getF64() {
    let v = this.dataView.getFloat64(this.offset, true);
    this.offset += 8;
    return v
  }
  getULEB128() {
    let Value = 0;
    let Byte = 0;
    let Shift = 0;
    do {
      Byte = this.getU8();
      let Slice = Byte & 0x7F;
      Value |= Slice << Shift;
      Shift += 7;
    } while (Byte >= 0x80);
    return Value;
  }
  getSLEB128() {
    let Value = 0;
    let Byte = 0;
    let Shift = 0;
    do {
      Byte = this.getU8();
      let Slice = Byte & 0x7F;
      Value |= Slice << Shift;
      Shift += 7;
    } while (Byte >= 0x80);
    if (Shift < 64 && (Byte & 0x40))
      Value |= Number.MAX_SAFE_INTEGER << Shift;
    return Value;
  }
  getNullTermString(): string {
    const i = this._uint8.indexOf(0, this.offset);
    const s = textDecoder.decode(this._uint8.slice(this.offset, i));
    this.offset = i+1;
    return s;
  }
  getBuffer(len: number): Uint8Array {
    const buffer = this._uint8.slice(this.offset, this.offset + len);
    this.offset += len;
    return buffer;
  }
}
export function lift_string(section: Uint8Array, offset: number): string | null {
  const i = section.indexOf(0, offset);
  if (i >= 0) {
    return textDecoder.decode(section.slice(offset, i));
  }
  return null;
}