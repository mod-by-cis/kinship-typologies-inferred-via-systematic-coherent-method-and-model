import { type typeIntBin, outIntBin, AbstractLog, toBin } from "../util.ts";
import { extremumSosa, orderingSosa } from "./math.ts";

class LogicSosa extends AbstractLog {
  readonly idn:{INC:typeIntBin;DEC:typeIntBin;};
  readonly min:{RIM:typeIntBin; INC: [typeIntBin,typeIntBin];};
  readonly max:{RIM:typeIntBin; DEC: [typeIntBin,typeIntBin];};
  readonly gen:typeIntBin;
  private constructor(sosaDec:number, sosaBin:string) {
    super();
    this.gen       = outIntBin(sosaBin.length);
    const min      = extremumSosa(sosaDec,"MIN");
    const max      = extremumSosa(sosaDec,"MAX");
    const min0incr = orderingSosa(0,"MinIncrement",sosaDec,min,max);
    const min1incr = orderingSosa(1,"MinIncrement",sosaDec,min,max);
    const max0decr = orderingSosa(0,"MaxDecrement",sosaDec,min,max);
    const max1decr = orderingSosa(1,"MaxDecrement",sosaDec,min,max);
    this.min = {RIM: outIntBin(min), 
                INC: [outIntBin(min0incr), outIntBin(min1incr)]};
    this.max = {RIM: outIntBin(max), 
                DEC: [outIntBin(max0decr), outIntBin(max1decr)]};
    const sosaDecREV = max - min0incr;
    const sosaBinREV = toBin(sosaDecREV);    
    this.idn = {INC: [sosaDec,sosaBin], DEC:[sosaDecREV, sosaBinREV]};
  }

  /** Fabryka — tworzy i zwraca instancję ABC. */
  static fromSosa(sosa:typeIntBin): LogicSosa {
    const [sDec,sBin] = sosa;
    return new LogicSosa(sDec,sBin);
  }

  get _log(): this {
    return this._dump();
  }
}


export {LogicSosa};
