
import { AbstractHaploLine } from "../line/abstract-haplo-line.ts";
import { SOSA } from "../sosa/logic-sosa.ts";

class LPAT extends AbstractHaploLine {
  private constructor(sosa: SOSA) {
    super({
      sosaIdnBIN: sosa.idn.INC[1],
      nameOFFSET: 1,
      sort_1_INT: sosa.min.INC[1][0],
      sort_0_BIN: sosa.min.INC[0][1],
      sosaGenDEC: sosa.gen[0]
    });
  }
  static fromObjSosa(sosa: SOSA): LPAT {
    return new LPAT(sosa);
  }

  get _log(): this {
    return this._dump();
  }
}

class LMAT extends AbstractHaploLine {
  private constructor(sosa: SOSA) {
    super({
      sosaIdnBIN: sosa.idn.DEC[1],
      nameOFFSET: 2,
      sort_1_INT: sosa.max.DEC[1][0],
      sort_0_BIN: sosa.max.DEC[0][1],
      sosaGenDEC:  sosa.gen[0]
    });
  }
  static fromObjSosa(sosa: SOSA): LMAT {
    return new LMAT(sosa);
  }

  
  get _log(): this {
    return this._dump();
  }
}


export {LPAT,  LMAT };
