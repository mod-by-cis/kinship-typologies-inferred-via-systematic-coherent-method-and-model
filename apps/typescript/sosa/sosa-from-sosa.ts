// ./sosa-from-sosa.ts
import type { 
  DecBin1NorRevType, DecBin1Type,
  TierLineType, TierGeneType, LineSortInterface, LineTypeInterface,
  SosaIdnInterface, SosaSexInterface, SosaSortInterface, SosaSpanInterface
} from "./sosa_types.ts";

import { Format } from "./sosa-format.ts";

class fromSosa {
  
  static SosaEgo(sosaDec:number):SosaIdnInterface & SosaSexInterface {
    const gene = fromSosa.GenSosa(Format.DecBin1(sosaDec));
    return {
      Idn: Format.DecBin1NorRev(sosaDec, gene.Span.Max.Dec - gene.Sort.Nor.Dec[0]),
      Sex: Format.Gender("ego", sosaDec)
    };
  }
  static SosaDad(sosaDec:number):SosaIdnInterface & SosaSexInterface {
    return {
      Idn: Format.DecBin1NorRev(sosaDec * 2, sosaDec * 2 + 1),
      Sex: Format.Gender("dad",sosaDec)
    };
  }
  static SosaMom(sosaDec:number):SosaIdnInterface & SosaSexInterface {
    return {
      Idn: Format.DecBin1NorRev(sosaDec * 2 + 1, sosaDec * 2),
      Sex: Format.Gender("mom",sosaDec)
    };
  }
  static SosaKid(sosaDec:number):SosaIdnInterface & SosaSexInterface {
    const {Nor, Rev} = fromSosa.SosaEgo(sosaDec).Idn;
    return {
      Idn: Format.DecBin1NorRev(Math.floor(Nor.Dec / 2), Math.floor(Rev.Dec / 2)),      
      Sex: Format.Gender("kid",sosaDec)
    };
  }
  
  /* ======================================================================================================================== */
  
  static GenSosaSpan(sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType ): SosaSpanInterface {
    const { Dec } = Format.SosaTrim('Nor', sosa);

    const DecMIN = Math.pow(2, Math.floor(Math.log2(Dec)));
    const DecMAX = Math.pow(2, Math.floor(Math.log2(Dec)) + 1) - 1;    

    return {
      Span: Format.DecBin1MinMax(DecMIN,DecMAX)
    };
  }
  static GenSosaSort(sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType ): SosaSortInterface {
    const { Dec } = Format.SosaTrim('Nor', sosa);

    const DecMIN = Math.pow(2, Math.floor(Math.log2(Dec)));
    const DecMAX = Math.pow(2, Math.floor(Math.log2(Dec)) + 1) - 1;    

    return {
      Sort: Format.DecBin2NorRev([
        (Dec + 1 - DecMIN) - 1,
        (Dec + 1 - DecMIN)
      ],[
        (DecMAX + 1 - Dec) - 1,
        (DecMAX + 1 - Dec)
      ])
    };
  }

  static GenSosa(sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType | DecBin1Type): SosaSortInterface & SosaSpanInterface {
    const { Dec } = Format.SosaTrim('Nor', sosa);

    const DecMIN = Math.pow(2, Math.floor(Math.log2(Dec)));
    const DecMAX = Math.pow(2, Math.floor(Math.log2(Dec)) + 1) - 1;    

    return {
      Span: Format.DecBin1MinMax(DecMIN,DecMAX),
      Sort: Format.DecBin2NorRev([
        (Dec + 1 - DecMIN) - 1,
        (Dec + 1 - DecMIN)
      ],[
        (DecMAX + 1 - Dec) - 1,
        (DecMAX + 1 - Dec)
      ])
    };
  }

  static GenTier(sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType ): TierGeneType {
    const { Dec } = Format.SosaTrim('Nor', sosa);
    const DecGEN = Math.floor(Math.log2(Dec)) + 1;
    return Format.DecBin1(DecGEN);
  }

  /* ======================================================================================================================== */
  
  static VecIdnY (sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType): TierLineType {
    const { Bin } = Format.SosaTrim('Nor', sosa);
    const A = Format.ZerosErase(Bin);
    // [Key, Idn]
    return Format.DecBin2([A, A + 1]);
  }

  static VecIdnM (sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType): TierLineType {
    const { Bin } = Format.SosaTrim('Rev', sosa);
    const A = Format.ZerosErase(Bin);
    // [Key, Idn]
    return Format.DecBin2([A, A + 2]);
  }

  /* ======================================================================================================================== */
  
  
  static VecOrdY (sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType): LineSortInterface & LineTypeInterface {
    const tierLine = fromSosa.VecIdnY(sosa);
    const tierGene = fromSosa.GenTier(sosa);
    const sosaSort = fromSosa.GenSosaSort(sosa).Sort;
    return {
      Sort: Format.DecBin1(sosaSort.Nor.Dec[1] == 1
              ? tierGene.Dec
              : Format.ZerosCount(sosaSort.Nor.Bin[0]) + 1),
      Tier: Format.DecBin1(tierLine.Bin[0].length)
    };
  }  
  static VecOrdM (sosa:SosaIdnInterface & SosaSexInterface | SosaIdnInterface | DecBin1NorRevType): LineSortInterface & LineTypeInterface {    
    const tierLine = fromSosa.VecIdnM(sosa);
    const tierGene = fromSosa.GenTier(sosa);
    const sosaSort = fromSosa.GenSosaSort(sosa).Sort;
    return {
      Sort: Format.DecBin1(sosaSort.Rev.Dec[1] == 1
              ? tierGene.Dec
              : Format.ZerosCount(sosaSort.Rev.Bin[0]) + 1),
      Tier: Format.DecBin1(tierLine.Bin[0].length)
    };
  }  
}

export { fromSosa };
