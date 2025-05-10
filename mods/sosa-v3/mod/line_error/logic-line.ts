
import { AbstractHaploLine } from "./abstract-haplo-line.ts";
import { SOSA }  from "../sosa/logic-sosa.ts";

class LPAT extends AbstractHaploLine {
  public constructor(sosa: SOSA) {
    super({
      sosaIdnBIN: sosa.idn.INC[1],
      nameOFFSET: 1,
      sort_1_INT: sosa.min.INC[1][0],
      sort_0_BIN: sosa.min.INC[0][1],
      sosaGenINT: sosa.gen[0]
    });
  }
}

class LMAT extends AbstractHaploLine {
  public constructor(sosa: SOSA) {
    super({
      sosaIdnBIN: sosa.idn.INC[1],
      nameOFFSET: 2,
      sort_1_INT: sosa.max.DEC[1][0],
      sort_0_BIN: sosa.max.DEC[0][1],
      sosaGenINT: sosa.gen[0]
    });
  }
}

export { LPAT, LMAT };

