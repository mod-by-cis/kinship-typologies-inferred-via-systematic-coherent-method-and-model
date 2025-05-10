
import { type typeIntBin, type typeNuOrSt, outIntBin, AbstractLog } from "../util.ts";

import { ModeOrdering } from "./types.ts";
import { AbstractFamily } from "./abstract-family.ts";
import { SOSA } from "./logic-sosa.ts";
import { LPAT, LMAT } from "./logic-line.ts"

class FAM extends AbstractFamily { 
  static EGO(sosa: typeNuOrSt): typeIntBin {
    return outIntBin(sosa);
  }
  static KID(sosa: typeNuOrSt): typeIntBin {
    const [n] = outIntBin(sosa);
    return outIntBin(Math.floor(n / 2));
  }
  static DAD(sosa: typeNuOrSt, mode:ModeOrdering): typeIntBin {
    const [n] = outIntBin(sosa);
    return outIntBin(this.PAR(n,mode).DAD);
  }
  static MOM(sosa: typeNuOrSt, mode:ModeOrdering): typeIntBin {
    const [n] = outIntBin(sosa);
    return outIntBin(this.PAR(n,mode).MOM);
  }
}


class PER extends AbstractLog {
  readonly sosa: SOSA;
  readonly rayY: LPAT;
  readonly rayM: LMAT;

  private constructor(sosa: SOSA, linePatY: LPAT, lineMatM: LMAT) {
    super();
    this.sosa = sosa;
    this.rayY = linePatY;
    this.rayM = lineMatM;
  }

  /** Fabryka budująca cały Person 'PER' z liczby lub binarki. */
  static fromSosa(sosa:typeIntBin): PER {
    const T    = SOSA.fromSosa(sosa);
    const Y    = LPAT.fromObjSosa(T);
    const M    = LMAT.fromObjSosa(T);
    return new PER(T,Y,M);
  }

  get _log(): this {
    return this._dump("PER");
  }
}





export { FAM, PER };
