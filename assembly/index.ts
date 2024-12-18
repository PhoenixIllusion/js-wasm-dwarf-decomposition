@unmanaged
class HOLDER {
  a: i32;
  b: i32;
  next: HOLDER;
  foo(): f32 {
    return f32(this.a)
  }
}

let n: u32 = 0;

function foo(i: u32): void {
  for(let a=0;a<10;a++) {
    let j = i + 2;
    {
      let j = i + 3;
      n += j;
    }

  }
}

function add(a: i32): i32 {
  const c = 5;
  foo(a / 2 + c);
  return a + 1;
}

export function create(out: HOLDER, a: i32, b: i32): u32 {
  out.a = a;
  out.b = b + i32(out.foo());
  out.next.a = a + add(b);
  return a + b;
}

export function create2(out: HOLDER , a: i32, b: i32): u32 {
  out.a = a;
  out.b = b;
  out.next.a = a + b + n;
  return a + b;
}