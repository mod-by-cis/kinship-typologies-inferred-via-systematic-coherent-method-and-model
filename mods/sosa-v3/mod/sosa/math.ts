

import { ModeOrdering, ModeExtremum, ModeIndex } from "../types.ts";

/** ↔️ Dolna lub górna granica SOSA. */
function extremumSosa(input:number, mode: ModeExtremum): number { 
  const fix = (function(m){
    switch (m) {
      case ModeExtremum.Max: return 1; 
      case ModeExtremum.Min: return 0;
    }
  })(mode);
  return  Math.pow(2, Math.floor(Math.log2(input)) + fix) - fix
}; 

/** 🔤 Oblicza kolejność */
function orderingSosa(input:number, mode: ModeOrdering, indexFIX: ModeIndex ):number{
  return (function (m: ModeOrdering,n:number) {
    switch (m) {
      case ModeOrdering.IncrementMin: return ((n + 1) - extremumSosa(n, ModeExtremum.Min));
      case ModeOrdering.DecrementMax: return ((1 - n) + extremumSosa(n, ModeExtremum.Max));
    }
  })(mode,input) - indexFIX;
}

export {extremumSosa, orderingSosa };
