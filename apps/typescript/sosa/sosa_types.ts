type GenderType = "⚥" | "♂" | "♀" | "-";

interface DecBin1Type {
  Dec: number;

  Bin: string;
}

interface DecBin1NorRevType {
  Nor: DecBin1Type;
  Rev: DecBin1Type;
}

interface DecBin1MinMaxType {
  Min: DecBin1Type;
  Max: DecBin1Type;
}

interface DecBin2Type {
  Dec: [number,number];
  Bin: [string,string];
}

interface DecBin2NorRevType {
  Nor: DecBin2Type;
  Rev: DecBin2Type;
}
  
/* ======================================================================================================================== */


interface SosaIdnInterface {
  Idn: DecBin1NorRevType;
}

interface SosaSexInterface {
  Sex: GenderType;
}

interface SosaSortInterface {
  Sort:DecBin2NorRevType;
}

interface SosaSpanInterface {
  Span: DecBin1MinMaxType;
}
  
/* ======================================================================================================================== */


interface SosaType {
  Sex: GenderType;
  Idn: DecBin1NorRevType;
}

interface SortType {
  Span: DecBin1MinMaxType;
  Sort: DecBin2NorRevType;
}

/* ======================================================================================================================== */

type TierLineType = DecBin2Type;

type TierGeneType = DecBin1Type;

interface LineSortInterface {
  Sort: DecBin1Type;
}
interface LineTypeInterface {
  Tier: DecBin1Type;
}

/* ======================================================================================================================== */

interface IdRayType {
  Idn: DecBin1Type;
  Key: DecBin1Type;  
}

interface EgRayType{
  Sort:DecBin1Type;
  Tier:DecBin1Type;
}
type GeneType = DecBin1Type;

type InputSosa = 
  | number 
  | number[] 
  | { from: number; to: number };


export type {
  DecBin1Type, DecBin2Type, GenderType,
  DecBin1NorRevType, DecBin2NorRevType,
  DecBin1MinMaxType, SosaSortInterface,SosaSpanInterface,
  SosaType, SortType, IdRayType, EgRayType, GeneType, TierLineType,
  SosaIdnInterface, SosaSexInterface, TierGeneType, LineSortInterface, LineTypeInterface,
  InputSosa
};
