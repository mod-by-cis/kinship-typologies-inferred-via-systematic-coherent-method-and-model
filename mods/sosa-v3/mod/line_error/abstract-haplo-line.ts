
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
    sosaGenINT
  }: {
    sosaIdnBIN: string;
    sort_0_BIN: string;
    sort_1_INT: number;
    nameOFFSET: number;
    sosaGenINT: number;
  }) {
    super();
    const code = BinTrailingZeros.erase(sosaIdnBIN);
    const name = code + nameOFFSET;
    const sort = sort_1_INT === 1 
                            ? sosaGenINT 
                            : BinTrailingZeros.count(sort_0_BIN) + 1;
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
  >(this: new (s: SOSA) => T, s: SOSA): T {
    return new this(s);
  }

  get _log(): this {
    return this._dump();
  }
}

export { AbstractHaploLine };
