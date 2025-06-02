export function floorLog2(x:number):number {
  return Math.floor(Math.log2(x));
}

export function pow2(x:number):number {
  return Math.pow(2,x);
}
export function pow2_lastBeforeNext(x:number):number {
  return Math.pow(2,x+1)-1;
}

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
