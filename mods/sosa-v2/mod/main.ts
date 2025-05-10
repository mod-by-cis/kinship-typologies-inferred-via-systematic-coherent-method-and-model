import {type typeIntBin, outIntBin, AbstractLog } from "../util.ts";
import { SOSA } from "./sosa/logic-sosa.ts";
import { LPAT,  LMAT } from "./line/logic-line.ts";


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
  readonly sosa: SOSA;
  readonly rayY: LPAT;
  readonly rayM: LMAT;
  
  private constructor(sosa: SOSA, linePatY: LPAT, lineMatM: LMAT) {
    super();
    this.sosa = sosa;
    this.rayY = linePatY;
    this.rayM = lineMatM;
  }
  static fromSosa(sosa:typeIntBin): PER {
    const T = SOSA.fromSosa(sosa);
    const Y = LPAT.fromObjSosa(T);
    const M = LMAT.fromObjSosa(T);
    return new PER(T,Y,M);
  }

  
  get _log(): this {
    return this._dump();
  }
}

export { FAM, PER };
