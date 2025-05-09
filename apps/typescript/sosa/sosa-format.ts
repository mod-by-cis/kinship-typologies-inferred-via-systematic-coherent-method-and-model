import type { 
  DecBin1Type, DecBin1NorRevType, DecBin1MinMaxType,
  DecBin2Type, DecBin2NorRevType, 
  GenderType,
  SosaIdnInterface, SosaSexInterface
} from "./sosa_types.ts";

class Format {
  static DecBin1(numBaseDec:number): DecBin1Type {
    return { Dec: numBaseDec, Bin: numBaseDec.toString(2) };
  }
  
  static DecBin1NorRev(numBaseDecNOR:number,numBaseDecREV:number): DecBin1NorRevType {
    return {
        Nor: Format.DecBin1(numBaseDecNOR), 
        Rev: Format.DecBin1(numBaseDecREV)
      };
  }

  static DecBin1MinMax(numBaseDecMIN:number,numBaseDecMAX:number): DecBin1MinMaxType {
    return {
        Min: Format.DecBin1(numBaseDecMIN), 
        Max: Format.DecBin1(numBaseDecMAX)
      };
  }

  static DecBin2(numBaseDec:[number,number]): DecBin2Type {
    return { 
      Dec: [
        numBaseDec[0],
        numBaseDec[1]
      ], 
      Bin: [
        numBaseDec[0].toString(2),
        numBaseDec[1].toString(2)
      ] 
    };
  }

  static DecBin2NorRev(numBaseDecNOR:[number,number],numBaseDecREV:[number,number]): DecBin2NorRevType {
    return {
      Nor: Format.DecBin2(numBaseDecNOR), 
      Rev: Format.DecBin2(numBaseDecREV)
    };
  }

  /* ======================================================================================================================== */
  

  static SosaTrim(mode: "Nor" | "Rev", sosa: SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType | DecBin1Type): DecBin1Type {
    if(Format.HasProperty(sosa,'Idn')){
      sosa = sosa.Idn as DecBin1NorRevType;
    }
    if(Format.HasProperty(sosa,mode)){
      sosa = sosa[mode] as DecBin1Type;
    }
    return sosa as DecBin1Type;
  }

  static Gender(
    of:"ego"|"dad"|"mom"|"kid",
    sosaDec: number
  ): GenderType {
    function s(sDec: number): GenderType {
        if (sDec < 2) return "⚥";
        return sDec % 2 === 0 ? "♂" : "♀";
    }    
    switch(of) {
      case "dad": return "♂";
      case "mom": return "♀";
      case "ego": return s(sosaDec);
      case "kid": return s(Math.floor(sosaDec/2));
      default:    return "-";
    }
  }

  /* ======================================================================================================================== */
  
  static ZerosErase(numBaseBin: string): number {
    const c = numBaseBin.replace(/[0]+$/, "");

    const r = parseInt(c, 2);

    return r;
  }

  static ZerosCount(numBaseBin: string): number {
    let r = 0;

    let t = true;

    const e = Array.from(numBaseBin);

    let l = e.length;

    while (l > 0 && t) {
      if (e[l - 1] == "0") {
        r++;
      } else {
        t = false;
      }

      l--;
    }

    return r;
  }
  
  /* ======================================================================================================================== */
  
  static HasProperty<T extends object, K extends PropertyKey>(obj: T, key: K): obj is T & Record<K, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
}

export { Format };
