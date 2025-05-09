import type { 
  InputSosa
} from "./sosa_types.ts";
import { Data } from "./sosa-data.ts";
import { fromSosa } from "./sosa-from-sosa.ts";

class DataDB {
  IdDb: Map<number, Data> = new Map();
  
  constructor() {}

  #isSosaNorDec(sosa: number):boolean {
    return Number.isInteger(sosa) && sosa > 0;
  }

  #addFromSosaNorDec(sosa: number):void {
    if (this.#isSosaNorDec(sosa)) {
      this.IdDb.set(sosa, new Data({
        SosaMom: fromSosa.SosaMom(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        SosaDad: fromSosa.SosaDad(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        SosaEgo: fromSosa.SosaEgo(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        SosaKid: fromSosa.SosaKid(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        GenSosa: fromSosa.GenSosa(fromSosa.SosaEgo(sosa)), /* TYPE: SosaSortInterface & SosaSpanInterface */ 
        GenTier: fromSosa.GenTier(fromSosa.SosaEgo(sosa)), /* TYPE: TierGeneType */ 
        LineIdY: fromSosa.VecIdnY(fromSosa.SosaEgo(sosa)), /* TYPE: TierLineType */ 
        LineIdM: fromSosa.VecIdnM(fromSosa.SosaEgo(sosa)), /* TYPE: TierLineType */ 
        LineEgY: fromSosa.VecOrdY(fromSosa.SosaEgo(sosa)), /* TYPE: LineSortInterface & LineTypeInterface */ 
        LineEgM: fromSosa.VecOrdM(fromSosa.SosaEgo(sosa))  /* TYPE: LineSortInterface & LineTypeInterface */ 
    }));
    }
  }

  setFromSosaNorDec(input:InputSosa):void {
    if (typeof input === 'number') {
      this.#addFromSosaNorDec(input);
    } else if (Array.isArray(input)) {
      for (const s of input) this.#addFromSosaNorDec(s);
    } else {
      for (let s = input.from; s <= input.to; s++) {
        this.#addFromSosaNorDec(s);
      }
    }
  }
}

export { DataDB };
