import { AssertType } from "../util.ts";
class BinTrailingZeros {
  // prywatna metoda zwracająca string bez trailing zeros
  private static prior(bin: string): string {
    return bin.replace(/0+$/, "");
  }
  
  /** Zwraca wartość dziesiętną po obcięciu trailing zeros */
  static erase(bin: string): number {
    AssertType.Bin(bin);
    const trimmed = this.prior(bin);
    return trimmed !== "" ? parseInt(trimmed, 2) : 0;
  }

  /** Zlicza, ilość trailing zeros */
  static count(bin: string): number {
    AssertType.Bin(bin);
    const trimmed = this.prior(bin);
    return bin.length - trimmed.length;
  }
}

export {BinTrailingZeros};
