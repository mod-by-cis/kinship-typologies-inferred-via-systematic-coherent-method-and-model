
import { type typeIntBin, BinTrailingZeros, outIntBin, AbstractLog, toBin } from "../../util.ts";
import { SOSA } from "../sosa/logic-sosa.ts";


abstract class AbstractHaploLine extends AbstractLog {
  readonly idn: typeIntBin;
  readonly ord: typeIntBin;
  readonly cat: typeIntBin;
  readonly key: typeIntBin;  

  protected constructor({
    sosaIdnBIN,
    nameOFFSET,
    sort_1_INT,
    sort_0_BIN,
    sosaGenDEC
  }: { 
    sosaIdnBIN: string; 
    sort_0_BIN: string;
    sort_1_INT: number; 
    nameOFFSET: number; 
    sosaGenDEC:number; 
  }) {
    super();
    const code = BinTrailingZeros.erase(sosaIdnBIN);
    const name = code + nameOFFSET;
    const sort = sort_1_INT === 1 
                          ? sosaGenDEC 
                          : BinTrailingZeros.count(sort_0_BIN) + 1;
    const type = toBin(code).length;

    this.idn = outIntBin(name);
    this.key = outIntBin(code);
    this.ord = outIntBin(sort);
    this.cat = outIntBin(type);
  }
}

export { AbstractHaploLine };
