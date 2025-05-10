

type numberBase10Base2 = [number, string];

class BinUtil {
  // prywatna metoda zwracająca string bez trailing zeros
  private static trimTrailingZeros(bin: string): string {
    return bin.replace(/0+$/, "");
  }
  
  /** Zwraca wartość dziesiętną po obcięciu trailing zeros */
  static trailingZerosErase(bin: string): number {
    const trimmed = this.trimTrailingZeros(bin);
    return trimmed !== "" ? parseInt(trimmed, 2) : 0;
  }

  /** Zlicza, ilość trailing zeros */
  static trailingZerosCount(bin: string): number {
    const trimmed = this.trimTrailingZeros(bin);
    return bin.length - trimmed.length;
  }
}

class Util {

  // * RETURN: numberBase10Base2
  static numberDecBin(num: number | string):numberBase10Base2 {
    if(typeof num === "string") {
      Util.isBin(num);
      return [Util.toDec(num), num];
    } else {
      Util.isDec(num);
      return [num, Util.toBin(num)];
    }
  }

  // * RETURN: number
  
  static extremumSosa(input:number, mode: "MAX" | "MIN"): number { 
    const fix = (function(m){
      switch (m) {
        case "MAX": return 1; 
        case "MIN": return 0;
      }
    })(mode);
    return  Math.pow(2, Math.floor(Math.log2(input)) + fix) - fix
  }; 
  static calcOrders(firstIs: 1 | 0, mode: "MinIncrement" | "MaxDecrement", sosa:number, min:number, max:number): number {
    const ord = (function (sosa:number, min:number, max:number, mode: "MinIncrement" | "MaxDecrement"): number {
      switch (mode) {
        case "MinIncrement": return (sosa + 1 - min);
        case "MaxDecrement": return (max + 1 - sosa);
      }
    })(sosa,min,max,mode);
    return ord - (firstIs===0?1:0);
  };
  static toDec(bin:string):number {
    Util.isBin(bin);
    return parseInt(bin, 2)
  }

  // * RETURN: string
  static toBin(dec:number):string {
    Util.isDec(dec);
    return dec.toString(2);
  }

  // * RETURN: void
  static isDec(dec:number):void   {
    if (!Number.isInteger(dec) || dec < 0) {
      throw new Error(`Niepoprawna wartość: oczekiwano liczby całkowitej > 0, otrzymano: ${dec} `);
    }
  }
  static isBin(bin:string):void   {
    if (!/^[01]+$/.test(bin)) {
      throw new Error(`Niepoprawny łańcuch binarny: '${bin}'`);
    }
  }

 
}

class FAM {
  static KID(sosa:number | string):numberBase10Base2{
    const sDec = Util.numberDecBin(sosa)[0];
    return Util.numberDecBin(Math.floor(sDec / 2));
  }
  static EGO(sosa:number | string):numberBase10Base2{
    return Util.numberDecBin(sosa);
  }
  static DAD(sosa:number | string, decrement:boolean = false):numberBase10Base2{
    const sDec = Util.numberDecBin(sosa)[0];
    return Util.numberDecBin(decrement ? sDec * 2 + 1 : sDec * 2);
  }
  static MOM(sosa:number | string, decrement:boolean = false):numberBase10Base2{
    const sDec = Util.numberDecBin(sosa)[0];
    return Util.numberDecBin(decrement ? sDec * 2 : sDec * 2 + 1);
  }
}

abstract class LogAbstract {
  protected _dump(): this {
    console.log(Deno.inspect(this, {
      colors: true,
      breakLength: 800,
      depth: 10,
    }));
    return this;
  }
}

class SOSA extends LogAbstract {
  readonly idn:{INC:numberBase10Base2;DEC:numberBase10Base2;};
  readonly min:{RIM:numberBase10Base2; INC: [numberBase10Base2,numberBase10Base2];};
  readonly max:{RIM:numberBase10Base2; DEC: [numberBase10Base2,numberBase10Base2];};
  readonly gen:numberBase10Base2;
  private constructor(sosaDec:number, sosaBin:string) {
    super();
    this.gen       = Util.numberDecBin(sosaBin.length);
    const min      = Util.extremumSosa(sosaDec,"MIN");
    const max      = Util.extremumSosa(sosaDec,"MAX");
    const min0incr = Util.calcOrders(0,"MinIncrement",sosaDec,min,max);
    const min1incr = Util.calcOrders(1,"MinIncrement",sosaDec,min,max);
    const max0decr = Util.calcOrders(0,"MaxDecrement",sosaDec,min,max);
    const max1decr = Util.calcOrders(1,"MaxDecrement",sosaDec,min,max);
    this.min = {RIM: Util.numberDecBin(min), 
                INC: [Util.numberDecBin(min0incr), Util.numberDecBin(min1incr)]};
    this.max = {RIM: Util.numberDecBin(max), 
                DEC: [Util.numberDecBin(max0decr), Util.numberDecBin(max1decr)]};
    const sosaDecREV = max - min0incr;
    const sosaBinREV = Util.toBin(sosaDecREV);    
    this.idn = {INC: [sosaDec,sosaBin], DEC:[sosaDecREV, sosaBinREV]};
  }

  /** Fabryka — tworzy i zwraca instancję ABC. */
  static fromSosa(sosa:numberBase10Base2): SOSA {
    const [sDec,sBin] = sosa;
    return new SOSA(sDec,sBin);
  }

  get _log(): this {
    return this._dump();
  }
}

abstract class LogicLineAbstract extends LogAbstract {
  readonly idn: numberBase10Base2;
  readonly ord: numberBase10Base2;
  readonly cat: numberBase10Base2;
  readonly key: numberBase10Base2;  

  protected constructor(
    sosaIdnBIN: string, 
    sosaGenDEC:number, 
    nameOFFSET: number, 
    sort_1_INT: number, 
    sort_0_BIN: string
  ) {
    super();
    const code = BinUtil.trailingZerosErase(sosaIdnBIN);
    const name = code + nameOFFSET;
    const sort = sort_1_INT === 1 ? sosaGenDEC : BinUtil.trailingZerosCount(sort_0_BIN) + 1;
    const type = Util.toBin(code).length;

    this.idn = Util.numberDecBin(name);
    this.key = Util.numberDecBin(code);
    this.ord = Util.numberDecBin(sort);
    this.cat = Util.numberDecBin(type);
  }
}

class LPAT extends LogicLineAbstract {
  private constructor(sosa: SOSA) {
    super(sosa.idn.INC[1], sosa.gen[0], 1, sosa.min.INC[1][0], sosa.min.INC[0][1]);
  }
  static fromObjSosa(sosa: SOSA): LPAT {
    return new LPAT(sosa);
  }

  get _log(): this {
    return this._dump();
  }
}

class LMAT extends LogicLineAbstract {
  private constructor(sosa: SOSA) {
    super(sosa.idn.DEC[1], sosa.gen[0], 2, sosa.max.DEC[1][0], sosa.max.DEC[0][1]);
  }
  static fromObjSosa(sosa: SOSA): LMAT {
    return new LMAT(sosa);
  }

  
  get _log(): this {
    return this._dump();
  }
}

class PER extends LogAbstract {
  readonly sosa: SOSA;
  readonly rayY: LPAT;
  readonly rayM: LMAT;
  
  private constructor(sosa: SOSA, linePatY: LPAT, lineMatM: LMAT) {
    super();
    this.sosa = sosa;
    this.rayY = linePatY;
    this.rayM = lineMatM;
  }
  static fromSosa(sosa:numberBase10Base2): PER {
    const T = SOSA.fromSosa(sosa);
    const Y = LPAT.fromObjSosa(T);
    const M = LMAT.fromObjSosa(T);
    return new PER(T,Y,M);
  }

  
  get _log(): this {
    return this._dump();
  }
}


for (let i = 1, j=16; i <= j; i++) {
  PER.fromSosa(FAM.EGO(i))._log;
}
