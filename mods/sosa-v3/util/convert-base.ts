import { AssertType, type typeNuOrSt, type typeIntBin} from "../util.ts";

/** 🔀 Zamienia liczbę base10 → base2. */
function toBin(input:number):string {
  AssertType.Int(input);
  return input.toString(2);
}

/** 🔀 Zamienia liczbę base2 → base10. */
function toInt(input:string):number {
  AssertType.Bin(input);
  return parseInt(input, 2);
}

 /** 🔄️ Zamienia . */
function outIntBin(input: typeNuOrSt): typeIntBin {
    if (typeof input === "string") {
      AssertType.Bin(input);
      return [toInt(input), input] as const;
    } else {
      AssertType.Int(input);
      return [input, toBin(input)] as const;
    }
  }

export {toInt, toBin, outIntBin };
