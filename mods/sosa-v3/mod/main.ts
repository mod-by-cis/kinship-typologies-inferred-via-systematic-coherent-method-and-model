
import { type typeIntBin, type typeNuOrSt, outIntBin, AbstractLog } from "../util.ts";

import { ModeOrdering } from "./types.ts";
import { AbstractFamily } from "./abstract-family.ts";
import { LogicSosa } from "./logic-sosa.ts";
import { LogicLinePatY, LogicLineMatM } from "./logic-line.ts"

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
  readonly sosa: LogicSosa;
  readonly rayY: LogicLinePatY;
  readonly rayM: LogicLineMatM;

  private constructor(sosa: LogicSosa, linePatY: LogicLinePatY, lineMatM: LogicLineMatM) {
    super();
    this.sosa = sosa;
    this.rayY = linePatY;
    this.rayM = lineMatM;
  }

  /** Fabryka budująca cały Person 'PER' z liczby lub binarki. */
  static fromSosa(sosa:typeIntBin): PER {
    const T    = LogicSosa.fromSosa(sosa);
    const Y    = LogicLinePatY.fromObjSosa(T);
    const M    = LogicLineMatM.fromObjSosa(T);
    return new PER(T,Y,M);
  }

  get _log(): this {
    return this._dump("PER");
  }
}





export { FAM, PER };
