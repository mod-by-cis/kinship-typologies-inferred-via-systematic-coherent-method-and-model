import { ModeOrdering} from "./types.ts";

abstract class AbstractFamily {
  protected static PAR(n:number, m:ModeOrdering):{DAD:number; MOM:number} {
    switch (m) {
      case ModeOrdering.IncrementMin: return {DAD: n*2, MOM: n*2+1 };
      case ModeOrdering.DecrementMax: return {DAD: n*2+1, MOM: n*2 };
    }
  }
}

export { AbstractFamily };
