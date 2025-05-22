
import { type typeNuOrSt, outIntBin } from "../util.ts";

import { ModeOrdering } from "./types.ts";


function fromSOSA(sosa: typeNuOrSt) {
  const [n] = outIntBin(sosa);
  const PAR = (n:number, m:ModeOrdering):{DAD:number; MOM:number} => {
    switch (m) {
      case ModeOrdering.IncrementMin: return {DAD: n*2, MOM: n*2+1 };
      case ModeOrdering.DecrementMax: return {DAD: n*2+1, MOM: n*2 };
    }
  };
  return {
    sosaEGO: outIntBin(sosa),
    sosaKID: outIntBin(Math.floor(n / 2)),
    sosaDAD_INC: outIntBin(PAR(n, ModeOrdering.IncrementMin).DAD),
    sosaMOM_INC: outIntBin(PAR(n, ModeOrdering.IncrementMin).MOM),
    sosaDAD_DEC: outIntBin(PAR(n, ModeOrdering.DecrementMax).DAD),
    sosaMOM_DEC: outIntBin(PAR(n, ModeOrdering.DecrementMax).MOM)
  }
}


export { fromSOSA };
