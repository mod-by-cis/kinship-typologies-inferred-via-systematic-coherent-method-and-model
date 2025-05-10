
import { LogicSosa } from "./logic-sosa.ts";
import { AbstractHaploLine } from "./abstract-haplo-line.ts";

class LogicLinePatY extends AbstractHaploLine {
  public constructor(s: LogicSosa) {
    super({
      sosaBinIDN: s.idn.INC[1],
      nameOFFSET: 1,
      sortedInt1: s.min.INC[1][0],
      sortedBin0: s.min.INC[0][1],
      sosaIntGEN: s.gen[0]
    });
  }
}

class LogicLineMatM extends AbstractHaploLine {
  public constructor(s: LogicSosa) {
    super({
      sosaBinIDN: s.idn.INC[1],
      nameOFFSET: 2,
      sortedInt1: s.max.DEC[1][0],
      sortedBin0: s.max.DEC[0][1],
      sosaIntGEN: s.gen[0]
    });
  }
}

export { LogicLinePatY, LogicLineMatM };
