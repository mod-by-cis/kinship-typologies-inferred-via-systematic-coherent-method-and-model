// --------------------------------------------------------------------------------
// 1) Typy pomocnicze
// --------------------------------------------------------------------------------

/** Para [dziesiętnie, dwójkowo] */
type typeIntBin = readonly [int: number, bin: string];
type typeNuOrSt = number | string;

/** Tryb liczenia porządków (inkrement od min lub dekrement od max) */
enum ModeOrdering {
  IncrementMin = "IncrementMin",
  DecrementMax = "DecrementMax",
}

/** Tryb liczenia extremów */
enum ModeExtremum {
  Min = "MIN",
  Max = "MAX",
}

enum ModeIndex {
  firstIs_0 = 1,
  firstIs_1 = 0,
}

// --------------------------------------------------------------------------------
// 2) Klasy narzędziowe
// --------------------------------------------------------------------------------

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
  /** 🪬 Odrzuca jeśli nie jest dodatnią liczbą naturalną (>= 0). */
  static assertInt(n: number): asserts n is number {
    if (!Number.isInteger(n) || n < 0) {
      throw new Error(`Oczekiwano liczby całkowitej >= 0, otrzymano ${n}`);
    }
  }

  /** 🪬 Odrzuca jeśli nie jest niepustym ciągiem '0'|'1'. */
  static assertBin(s: string): asserts s is string {
    if (!/^[01]+$/.test(s)) {
      throw new Error(`Niepoprawny łańcuch binarny: '${s}'`);
    }
  }

  /** 🔀 Zamienia liczbę base10 → base2. */
  static toBin(input:number):string {
    Util.assertInt(input);
    return input.toString(2);
  }

  /** 🔀 Zamienia liczbę base2 → base10. */
  static toInt(input:string):number {
    Util.assertBin(input);
    return parseInt(input, 2);
  }

  /** 🔄️ Zamienia [dec,bin] lub string bin → [dec,bin]. */
  static outIntBin(input: typeNuOrSt): typeIntBin {
    if (typeof input === "string") {
      Util.assertBin(input);
      return [Util.toInt(input), input] as const;
    } else {
      Util.assertInt(input);
      return [input, Util.toBin(input)] as const;
    }
  }

  /** ↔️ Dolna lub górna granica SOSA. */
  static extremumSosa(input:number, mode: ModeExtremum): number { 
    const fix = (function(m){
      switch (m) {
        case ModeExtremum.Max: return 1; 
        case ModeExtremum.Min: return 0;
      }
    })(mode);
    return  Math.pow(2, Math.floor(Math.log2(input)) + fix) - fix
  }; 

  /** 🔤 Oblicza kolejność */
  static orderingSosa(input:number, mode: ModeOrdering, indexFIX: ModeIndex ){
    return (function (m: ModeOrdering,n:number) {
      switch (m) {
        case ModeOrdering.IncrementMin: return ((n + 1) - Util.extremumSosa(n, ModeExtremum.Min));
        case ModeOrdering.DecrementMax: return ((1 - n) + Util.extremumSosa(n, ModeExtremum.Max));
      }
    })(mode,input) - indexFIX;
  }

  /** ➿ Pętla */
  static forAll(range:[number,number], callback: (i: number) => void) {
    for (let i = range[0]; i <= range[1]; i++) {
      callback(i);
    }
  }
}

// --------------------------------------------------------------------------------
// 3) Relacje rodzinne (Sosa⇒rodzice/dziecko)
// --------------------------------------------------------------------------------

class FAM {
  private static PAR(n:number, m:ModeOrdering):{DAD:number; MOM:number} {
    switch (m) {
      case ModeOrdering.IncrementMin: return {DAD: n*2, MOM: n*2+1 };
      case ModeOrdering.DecrementMax: return {DAD: n*2+1, MOM: n*2 };
    }
  }

  static EGO(sosa: typeNuOrSt): typeIntBin {
    return Util.outIntBin(sosa);
  }
  static KID(sosa: typeNuOrSt): typeIntBin {
    const [n] = Util.outIntBin(sosa);
    return Util.outIntBin(Math.floor(n / 2));
  }
  static DAD(sosa: typeNuOrSt, mode:ModeOrdering): typeIntBin {
    const [n] = Util.outIntBin(sosa);
    return Util.outIntBin(this.PAR(n,mode).DAD);
  }
  static MOM(sosa: typeNuOrSt, mode:ModeOrdering): typeIntBin {
    const [n] = Util.outIntBin(sosa);
    return Util.outIntBin(this.PAR(n,mode).MOM);
  }
}

// --------------------------------------------------------------------------------
// 4) Mechanizm wspólnego dumpowania
// --------------------------------------------------------------------------------

abstract class LogAbstract {
  /** Wspólna metoda do łańcuchowego wypisywania debugów. */
  protected _dump(label = this.constructor.name): this {
    console.log(
      `[${label}]`,
      Deno.inspect(this, { colors: true, breakLength: 800, depth: 20 }),
    );
    return this;
  }
}

// --------------------------------------------------------------------------------
// 5) Podstawowy rekord SOSA
// --------------------------------------------------------------------------------

class LogicSosa extends LogAbstract {
  readonly idn: { INC: typeIntBin; DEC: typeIntBin };
  readonly min: { RIM: typeIntBin; INC: [typeIntBin, typeIntBin] };
  readonly max: { RIM: typeIntBin; DEC: [typeIntBin, typeIntBin] };
  readonly gen: typeIntBin;

  private constructor(intINC: number, binINC: string) {

    const extremumMin = Util.extremumSosa(intINC, ModeExtremum.Min);
    const extremumMax = Util.extremumSosa(intINC, ModeExtremum.Max);

    const oIncrement0 = Util.orderingSosa(intINC,ModeOrdering.IncrementMin,ModeIndex.firstIs_0);
    const oIncrement1 = Util.orderingSosa(intINC,ModeOrdering.IncrementMin,ModeIndex.firstIs_1);
    const oDecrement0 = Util.orderingSosa(intINC,ModeOrdering.DecrementMax,ModeIndex.firstIs_0);
    const oDecrement1 = Util.orderingSosa(intINC,ModeOrdering.DecrementMax,ModeIndex.firstIs_1);

    const [intDEC, binDEC] = Util.outIntBin(extremumMax - oIncrement0);

    super();
    this.gen = Util.outIntBin(binINC.length);
    this.min = {
      RIM: Util.outIntBin(extremumMin),
      INC: [
        Util.outIntBin(oIncrement0), 
        Util.outIntBin(oIncrement1)
      ],
    };
    this.max = {
      RIM: Util.outIntBin(extremumMax),
      DEC: [
        Util.outIntBin(oDecrement0), 
        Util.outIntBin(oDecrement1)
      ],
    };
    this.idn = {
      INC: [intINC, binINC] as const, 
      DEC: [intDEC, binDEC] as const
    };
  }

  /** Fabryka — tworzy i zwraca. */
  static fromSosa(input: typeIntBin): LogicSosa {
    const [int, bin] = input;
    return new LogicSosa(int, bin);
  }

  /** API do console.log. */
  get _log(): this {
    return this._dump();
  }
}

// --------------------------------------------------------------------------------
// 6) Linia porządkowa (wspólne dla Y i M)
// --------------------------------------------------------------------------------

abstract class LogicLineAbstract extends LogAbstract {
  readonly idn: typeIntBin;
  readonly key: typeIntBin;
  readonly ord: typeIntBin;
  readonly cat: typeIntBin;

  protected constructor({
    sosaBinIDN,
    nameOFFSET,
    sortedInt1,
    sortedBin0,
    sosaIntGEN
  }: {
    sosaBinIDN: string;
    sortedBin0: string;
    sortedInt1: number;
    nameOFFSET: number;
    sosaIntGEN: number;
  }) {
    super();
    const code = BinUtil.trailingZerosErase(sosaBinIDN);
    const name = code + nameOFFSET;
    const sort = sortedInt1 === 1 ? sosaIntGEN : BinUtil.trailingZerosCount(sortedBin0) + 1;
    const type = Util.toBin(code).length;

    this.idn = Util.outIntBin(name);
    this.key = Util.outIntBin(code);
    this.ord = Util.outIntBin(sort);
    this.cat = Util.outIntBin(type);
  }

  /** 
   * Statyczna fabryka, dostępna dla każdej podklasy:
   * - `this` to konstruktor tej podklasy
   * - zwracamy instancję dokładnie tej podklasy (typ T)
   */
  static fromObjSosa<
    T extends LogicLineAbstract
  >(this: new (s: LogicSosa) => T, s: LogicSosa): T {
    return new this(s);
  }

  get _log(): this {
    return this._dump();
  }
}

class LogicPatY extends LogicLineAbstract {
  public constructor(s: LogicSosa) {
    super({
      sosaBinIDN: s.idn.INC[1],
      nameOFFSET: 1,
      sortedInt1: s.min.INC[1][0],
      sortedBin0: s.min.INC[0][1],
      sosaIntGEN: s.gen[0]
    });
  }
}

class LogicMatM extends LogicLineAbstract {
  public constructor(s: LogicSosa) {
    super({
      sosaBinIDN: s.idn.INC[1],
      nameOFFSET: 2,
      sortedInt1: s.max.DEC[1][0],
      sortedBin0: s.max.DEC[0][1],
      sosaIntGEN: s.gen[0]
    });
  }
}

// --------------------------------------------------------------------------------
// 7) Główna klasa łącząca wszystkie elementy
// --------------------------------------------------------------------------------

class PER extends LogAbstract {
  readonly sosa: LogicSosa;
  readonly rayY: LogicPatY;
  readonly rayM: LogicMatM;

  private constructor(sosa: LogicSosa, linePatY: LogicPatY, lineMatM: LogicMatM) {
    super();
    this.sosa = sosa;
    this.rayY = linePatY;
    this.rayM = lineMatM;
  }

  /** Fabryka budująca cały Person 'PER' z liczby lub binarki. */
  static fromSosa(sosa:typeIntBin): PER {
    const T    = LogicSosa.fromSosa(sosa);
    const Y    = LogicPatY.fromObjSosa(T);
    const M    = LogicMatM.fromObjSosa(T);
    return new PER(T,Y,M);
  }

  get _log(): this {
    return this._dump("PER");
  }
}

// --------------------------------------------------------------------------------
// 8) Demo
// --------------------------------------------------------------------------------
Util.forAll([1,16], i => {
  // console.log('i: ', i);
  // const T = LogicSosa.fromSosa(FAM.EGO(i))._log;
  // LogicPatY.fromObjSosa(T)._log;
  // LogicMatM.fromObjSosa(T)._log;
  PER.fromSosa(FAM.EGO(i))._log;
});
