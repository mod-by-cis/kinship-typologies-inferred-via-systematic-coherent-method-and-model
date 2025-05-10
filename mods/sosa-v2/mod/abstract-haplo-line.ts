
import { type typeIntBin, BinTrailingZeros, outIntBin, AbstractLog, toBin } from "../util.ts";

import { LogicSosa } from "./logic-sosa.ts";


abstract class AbstractHaploLine extends AbstractLog {
  readonly idn: typeIntBin;
  readonly ord: typeIntBin;
  readonly cat: typeIntBin;
  readonly key: typeIntBin;  

  protected constructor(
    sosaIdnBIN: string, 
    sosaGenDEC:number, 
    nameOFFSET: number, 
    sort1DEC: number, 
    sort0BIN: string
  ) {
    super();
    const code = BinTrailingZeros.erase(sosaIdnBIN);
    const name = code + nameOFFSET;
    const sort = sort1DEC === 1 ? sosaGenDEC : BinTrailingZeros.count(sort0BIN) + 1;
    const type = toBin(code).length;

    this.idn = outIntBin(name);
    this.key = outIntBin(code);
    this.ord = outIntBin(sort);
    this.cat = outIntBin(type);
  }
}

export { AbstractHaploLine };
