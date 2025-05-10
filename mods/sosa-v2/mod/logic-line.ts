
import { AbstractHaploLine } from "./abstract-haplo-line.ts";
import { LogicSosa } from "./logic-sosa.ts";

class LogicPatY extends AbstractHaploLine {
  private constructor(sosa: LogicSosa) {
    super(sosa.idn.INC[1], sosa.gen[0], 1, sosa.min.INC[1][0], sosa.min.INC[0][1]);
  }
  static fromObjSosa(sosa: LogicSosa): LogicPatY {
    return new LogicPatY(sosa);
  }

  get _log(): this {
    return this._dump();
  }
}

class LogicMatM extends AbstractHaploLine {
  private constructor(sosa: LogicSosa) {
    super(sosa.idn.DEC[1], sosa.gen[0], 2, sosa.max.DEC[1][0], sosa.max.DEC[0][1]);
  }
  static fromObjSosa(sosa: LogicSosa): LogicMatM {
    return new LogicMatM(sosa);
  }

  
  get _log(): this {
    return this._dump();
  }
}


export {LogicPatY,  LogicMatM };
