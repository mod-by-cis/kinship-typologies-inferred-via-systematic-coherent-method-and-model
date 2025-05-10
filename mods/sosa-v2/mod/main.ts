import {type typeIntBin, outIntBin, AbstractLog } from "../util.ts";
import { LogicSosa } from "./logic-sosa.ts";
import { LogicPatY,  LogicMatM } from "./logic-line.ts";


class FAM {
  static KID(sosa:number | string):typeIntBin{
    const sDec = outIntBin(sosa)[0];
    return outIntBin(Math.floor(sDec / 2));
  }
  static EGO(sosa:number | string):typeIntBin{
    return outIntBin(sosa);
  }
  static DAD(sosa:number | string, decrement:boolean = false):typeIntBin{
    const sDec = outIntBin(sosa)[0];
    return outIntBin(decrement ? sDec * 2 + 1 : sDec * 2);
  }
  static MOM(sosa:number | string, decrement:boolean = false):typeIntBin{
    const sDec = outIntBin(sosa)[0];
    return outIntBin(decrement ? sDec * 2 : sDec * 2 + 1);
  }
}

class PER extends AbstractLog {
  readonly sosa: LogicSosa;
  readonly rayY: LogicPatY;
  readonly rayM: LogicMatM;
  
  private constructor(sosa: LogicSosa, linePatY: LogicPatY, lineMatM: LogicMatM) {
    super();
    this.sosa = sosa;
    this.rayY = linePatY;
    this.rayM = lineMatM;
  }
  static fromSosa(sosa:typeIntBin): PER {
    const T = LogicSosa.fromSosa(sosa);
    const Y = LogicPatY.fromObjSosa(T);
    const M = LogicMatM.fromObjSosa(T);
    return new PER(T,Y,M);
  }

  
  get _log(): this {
    return this._dump();
  }
}

export { FAM, PER };
