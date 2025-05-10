
class AssertType {
  /** 🪬 Odrzuca jeśli nie jest dodatnią liczbą naturalną (>= 0). */
  static Int(n: number): asserts n is number {
    if (!Number.isInteger(n) || n < 0) {
      throw new Error(`Oczekiwano liczby całkowitej >= 0, otrzymano ${n}`);
    }
  }

  /** 🪬 Odrzuca jeśli nie jest niepustym ciągiem '0'|'1'. */
  static Bin(s: string): asserts s is string {
    if (!/^[01]+$/.test(s)) {
      throw new Error(`Niepoprawny łańcuch binarny: '${s}'`);
    }
  }
}

export {AssertType};
