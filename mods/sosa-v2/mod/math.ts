
/** ↔️ Dolna lub górna granica SOSA. */
function extremumSosa(input:number, mode: "MAX" | "MIN"): number { 
    const fix = (function(m){
      switch (m) {
        case "MAX": return 1; 
        case "MIN": return 0;
      }
    })(mode);
    return  Math.pow(2, Math.floor(Math.log2(input)) + fix) - fix
  }; 

/** 🔤 Oblicza kolejność */
function orderingSosa(firstIs: 1 | 0, mode: "MinIncrement" | "MaxDecrement", sosa:number, min:number, max:number): number {
    const ord = (function (sosa:number, min:number, max:number, mode: "MinIncrement" | "MaxDecrement"): number {
      switch (mode) {
        case "MinIncrement": return (sosa + 1 - min);
        case "MaxDecrement": return (max + 1 - sosa);
      }
    })(sosa,min,max,mode);
    return ord - (firstIs===0?1:0);
  };

export {extremumSosa, orderingSosa };
