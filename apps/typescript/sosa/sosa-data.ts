import type { 
  SosaIdnInterface,  SosaSexInterface, 
  SosaSortInterface, SosaSpanInterface, 
  TierLineType,      TierGeneType, 
  LineSortInterface, LineTypeInterface
} from "./sosa_types.ts";

class Data {
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
    this.SosaMom = SosaMom;
    this.SosaDad = SosaDad;
    this.SosaEgo = SosaEgo;
    this.SosaKid = SosaKid;
    this.GenSosa = GenSosa;
    this.GenTier = GenTier;
    this.LineIdY = LineIdY;
    this.LineIdM = LineIdM;
    this.LineEgY = LineEgY;
    this.LineEgM = LineEgM;    
  }
}

export { Data };
