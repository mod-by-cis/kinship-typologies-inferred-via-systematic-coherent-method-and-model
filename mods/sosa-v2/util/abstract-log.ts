abstract class AbstractLog {
  /** Wspólna metoda do łańcuchowego wypisywania debugów. */
  protected _dump(label = this.constructor.name): this {
    console.log(
      `[${label}]`,
      Deno.inspect(this, { colors: true, breakLength: 800, depth: 20 }),
    );
    return this;
  }
}

export { AbstractLog };
