export function floorLog2(x:number):number {
  return Math.floor(Math.log2(x));
}

//  to klasyczna potęga dwójki.
export function pow2(x:number):number {
  return Math.pow(2,x);
}


export function pow2Affine(x: number, a: number, b: number, c: number): number {
  return a * 2 ** (x + b) + c;
}

//  waluacja dwu-adyczna liczby naturalnej dodatniej 
//  czyli największą potęgę liczby 2, która dzieli x
//  maple `k := x -> ilog2(x - Bits[And](x, x - 1))`
//  k(x)=ord_2(x)
//  Czyli: ile razy x można podzielić przez 2, zanim przestanie być całkowite 
//  (lub, równoznacznie, pozycja najmłodszego ustawionego bitu w x).
export function val2Adic(x: number): number {
  if (x <= 0 || !Number.isInteger(x)) {
    throw new Error("Argument musi być dodatnią liczbą całkowitą.");
  }
  return Math.log2(x & -x);
}

export function pow2Affine_val2Adic(x: number, a: number, b: number, c: number): number {
  return a * 2 ** (val2Adic(x) + b) + c;
}

//--------------------------------------------------------------
export function isNotValNaturalPos(val:unknown):boolean {
  return (typeof val !== "number" || isNaN(val) || !Number.isInteger(val) ||
  val <= 0);
}
export function isNotValNaturalPosWithZero(val:unknown):boolean {
  return (typeof val !== "number" || isNaN(val) || !Number.isInteger(val) ||
  val < 0);
}

export function testSomNotOfValsArray(v:string, arr:unknown, test:"isNotValNaturalPos"|"isNotValNaturalPosWithZero"):void {
  if (!Array.isArray(arr)) {
    throw new Error(
      `Zmienne ${v}  muszą być tablicami.`,
    );
  }
  switch (test) {
    case "isNotValNaturalPos":
      if (arr.some(isNotValNaturalPos)) {throw new Error(
          `Wszystkie elementy w tablicy ${v} muszą być liczbami naturalnymi dodatnimi (większymi od 0).`,
        );
      }
      break;
    case "isNotValNaturalPosWithZero":
      if (arr.some(isNotValNaturalPosWithZero)) {throw new Error(
        `Wszystkie elementy w tablicy ${v} muszą być liczbami naturalnymi dodatnimi z zero (większymi od -1).`,
      );
      }
      break;
  }
}
