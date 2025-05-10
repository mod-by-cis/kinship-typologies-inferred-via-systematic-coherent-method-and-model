import { outIntBin, AbstractLog, type typeIntBin } from "../../util.ts";

import { ModeOrdering, ModeExtremum, ModeIndex } from "../types.ts";
import { extremumSosa, orderingSosa } from "./math.ts";

class SOSA extends AbstractLog {
  readonly idn: { INC: typeIntBin; DEC: typeIntBin };
  readonly min: { RIM: typeIntBin; INC: [typeIntBin, typeIntBin] };
  readonly max: { RIM: typeIntBin; DEC: [typeIntBin, typeIntBin] };
  readonly gen: typeIntBin;

  private constructor(intINC: number, binINC: string) {

    const extremumMin = extremumSosa(intINC, ModeExtremum.Min);
    const extremumMax = extremumSosa(intINC, ModeExtremum.Max);

    const oIncrement0 = orderingSosa(intINC,ModeOrdering.IncrementMin,ModeIndex.firstIs_0);
    const oIncrement1 = orderingSosa(intINC,ModeOrdering.IncrementMin,ModeIndex.firstIs_1);
    const oDecrement0 = orderingSosa(intINC,ModeOrdering.DecrementMax,ModeIndex.firstIs_0);
    const oDecrement1 = orderingSosa(intINC,ModeOrdering.DecrementMax,ModeIndex.firstIs_1);

    const [intDEC, binDEC] = outIntBin(extremumMax - oIncrement0);

    super();
    this.gen = outIntBin(binINC.length);
    this.min = {
      RIM: outIntBin(extremumMin),
      INC: [
        outIntBin(oIncrement0), 
        outIntBin(oIncrement1)
      ],
    };
    this.max = {
      RIM: outIntBin(extremumMax),
      DEC: [
        outIntBin(oDecrement0), 
        outIntBin(oDecrement1)
      ],
    };
    this.idn = {
      INC: [intINC, binINC] as const, 
      DEC: [intDEC, binDEC] as const
    };
  }

  /** Fabryka — tworzy i zwraca. */
  static fromSosa(input: typeIntBin): SOSA {
    const [int, bin] = input;
    return new SOSA(int, bin);
  }

  /** API do console.log. */
  get _log(): this {
    return this._dump();
  }
}

export { SOSA };
