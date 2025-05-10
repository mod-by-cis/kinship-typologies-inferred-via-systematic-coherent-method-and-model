
import { BinTrailingZeros, outIntBin, AbstractLog, toBin } from "../util.ts";

import { type typeIntBin } from "./types.ts";
import { LogicSosa } from "./logic-sosa.ts";


abstract class AbstractHaploLine extends AbstractLog {
  readonly idn: typeIntBin;
  readonly key: typeIntBin;
  readonly ord: typeIntBin;
  readonly cat: typeIntBin;

  protected constructor({
    sosaBinIDN,
    nameOFFSET,
    sortedInt1,
    sortedBin0,
    sosaIntGEN
  }: {
    sosaBinIDN: string;
    sortedBin0: string;
    sortedInt1: number;
    nameOFFSET: number;
    sosaIntGEN: number;
  }) {
    super();
    const code = BinTrailingZeros.erase(sosaBinIDN);
    const name = code + nameOFFSET;
    const sort = sortedInt1 === 1 ? sosaIntGEN : BinTrailingZeros.count(sortedBin0) + 1;
    const type = toBin(code).length;

    this.idn = outIntBin(name);
    this.key = outIntBin(code);
    this.ord = outIntBin(sort);
    this.cat = outIntBin(type);
  }

  /** 
   * Statyczna fabryka, dostępna dla każdej podklasy:
   * - `this` to konstruktor tej podklasy
   * - zwracamy instancję dokładnie tej podklasy (typ T)
   */
  static fromObjSosa<
    T extends AbstractHaploLine
  >(this: new (s: LogicSosa) => T, s: LogicSosa): T {
    return new this(s);
  }

  get _log(): this {
    return this._dump();
  }
}

export { AbstractHaploLine };
