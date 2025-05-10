
import { AbstractHaploLine } from "./abstract-haplo-line.ts";
import { SOSA } from "./logic-sosa.ts";

class LPAT extends AbstractHaploLine {
  private constructor(sosa: SOSA) {
    super(sosa.idn.INC[1], sosa.gen[0], 1, sosa.min.INC[1][0], sosa.min.INC[0][1]);
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
    super(sosa.idn.DEC[1], sosa.gen[0], 2, sosa.max.DEC[1][0], sosa.max.DEC[0][1]);
  }
  static fromObjSosa(sosa: SOSA): LMAT {
    return new LMAT(sosa);
  }

  
  get _log(): this {
    return this._dump();
  }
}


export {LPAT,  LMAT };
