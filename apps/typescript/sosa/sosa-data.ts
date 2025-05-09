// ./sosa-data.ts
import type { 
  DecBin1Type, DecBin1NorRevType, 
  DecBin2Type, DecBin2NorRevType,
  GenderType,
  SosaIdnInterface,  SosaSexInterface, 
  SosaSortInterface, SosaSpanInterface, 
  TierLineType,      TierGeneType, 
  LineSortInterface, LineTypeInterface
} from "./sosa_types.ts";

class Data {

  
  SosaMom:    DecBin1NorRevType;
  SosaMomSex: GenderType;
  SosaDad:    DecBin1NorRevType;
  SosaDadSex: GenderType;
  SosaEgo:    DecBin1NorRevType;
  SosaEgoSex: GenderType;
  SosaKid:    DecBin1NorRevType;
  SosaKidSex: GenderType;

  OrdSosa: DecBin2NorRevType;
  OrdSosaMin: DecBin1Type;
  OrdSosaMax: DecBin1Type;

  TierGene: DecBin1Type;
  TierLine: {
    PatY: DecBin2Type;
    MatM: DecBin2Type;
  };
  OrdLine: {
    PatY: DecBin1Type;
    MatM: DecBin1Type;
  };
  OrdLineCat: {
    PatY: DecBin1Type;
    MatM: DecBin1Type;
  };

  constructor({SosaMom, SosaDad, SosaEgo, SosaKid, GenSosa, GenTier, LineIdY, LineIdM, LineEgY, LineEgM }: {  
    SosaMom: SosaIdnInterface & SosaSexInterface;
    SosaDad: SosaIdnInterface & SosaSexInterface;
    SosaEgo: SosaIdnInterface & SosaSexInterface;
    SosaKid: SosaIdnInterface & SosaSexInterface;
    GenSosa: SosaSortInterface & SosaSpanInterface;
    GenTier: TierGeneType;
    LineIdY: TierLineType;
    LineIdM: TierLineType;
    LineEgY: LineSortInterface & LineTypeInterface;
    LineEgM: LineSortInterface & LineTypeInterface;
  }) {
    this.SosaMom    = SosaMom.Idn;
    this.SosaMomSex = SosaMom.Sex;
    this.SosaDad    = SosaDad.Idn;
    this.SosaDadSex = SosaDad.Sex;
    this.SosaEgo    = SosaEgo.Idn;
    this.SosaEgoSex = SosaEgo.Sex;
    this.SosaKid    = SosaKid.Idn;
    this.SosaKidSex = SosaKid.Sex;

    this.OrdSosa    = GenSosa.Sort;
    this.OrdSosaMin = GenSosa.Span.Min;
    this.OrdSosaMax = GenSosa.Span.Max;

    this.TierGene = GenTier;
    this.TierLine = {
      PatY: LineIdY,
      MatM: LineIdM
    };
    
    this.OrdLine = {
      PatY: LineEgY.Sort,
      MatM: LineEgM.Sort
    };
    this.OrdLineCat = {
      PatY: LineEgY.Tier,
      MatM: LineEgM.Tier
    }; 
  }
}

export { Data };
