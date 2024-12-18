interface SourceMap {
  mappings: string;
  names: string[];
  sources: string[];
  version: number;
}

interface WasmMapping {
  byte: number;
  line: number;
  column: number;
}
interface WasmFileMap {
  filename: string;
  map: WasmMapping[]
}

const chars64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
export const toBase64: string[] = [];
export const fromBase64: number[] = [];
for(let i = 0; i < 65; ++i) {
	toBase64[i] = chars64.charAt(i);
	fromBase64[chars64.charCodeAt(i)] = i;
}

function decodeVLQ(
	src: string,
	dstPos = 0,
	srcPos = 0,
	srcEnd = src.length,
	dstEnd = srcEnd
) {
	let result: number[] = [];
	let shift = 0;
	let code: number;
	let sign: number;
	let num = 0;

	while(srcPos < srcEnd && dstPos < dstEnd) {
		code = fromBase64[src.charCodeAt(srcPos++)];
		num += (code & 31) << shift;

		if(code & 32) {
			shift += 5;
		} else {
			sign = num & 1;
			// Zig-zag decode unsigned to signed.
			result[dstPos++] = ((num >>> 1) ^ -sign) + sign;
	
			shift = 0;
			num = 0;
		}
	}

	return result;
}

function decodeMapping(sources: string[], mappings: string): WasmFileMap[] {
  const results: WasmFileMap[] = sources.map(filename => ({filename, map: [] as WasmMapping[]}));

  if(mappings) {
    const data =  mappings.split(',').map(str => decodeVLQ(str))
    let [byte, sourceIdx, line, column]  = data.shift()!;
    results[sourceIdx].map.push({byte, line, column});
    data.forEach(([_byte, _sourceIdx, _line, _column]) => {
      byte += _byte || 0;
      sourceIdx += _sourceIdx || 0;
      line += _line || 0;
      column += _column || 0;
      results[sourceIdx].map.push({byte, line, column});
    })
  }
  return results;
}

export function parseSourceMap(json: string|null) {
  if(json) {
    const map = JSON.parse(json) as SourceMap;
    if(map.mappings) {
      const mappings = decodeMapping(map.sources, map.mappings);
      return mappings;
    }
  }
  return null;
}