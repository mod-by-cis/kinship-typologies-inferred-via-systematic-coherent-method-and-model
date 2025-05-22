type NodeConstructor&lt;T&gt; = new (node: number, X?: "XM" | "XW") =&gt; T;

class Node {
  ihINC: number; // iLR: number;
  ihDEC: number; // iRL: number;
  ih: number; // lvX: number;
  MAX: number; // MAX: number;
  MIN: number; // MIN: number;
  MIX: number; // MIX: number;
  iRL: number; // XM: number;
  iLR: number; // XW: number;

  constructor(node: number, X: "XM" | "XW" = "XM") {
    if (typeof node !== "number" || !Number.isInteger(node) || node &lt;= 0) {
      throw new Error("Parametr node musi być dodatnią liczbą całkowitą.");
    }
    const height = Math.floor(Math.log2(node));
    const nodeMAX = 1 * Math.pow(2, height + 1) - 1;
    const nodeMIN = 1 * Math.pow(2, height + 0) - 0;
    const nodeMIX = 3 * Math.pow(2, height + 0) - 1;

    const nodeXM = X == "XM" ? node : /* X=="XW" */ nodeMIX - node;
    const nodeXW = X == "XM" ? nodeMIX - node : /* X=="XW" */ node;
    const sortXM_LR = nodeXM - nodeMIN;
    const sortXW_RL = nodeXW - nodeMIN;

    this.ihINC = sortXM_LR;
    this.ihDEC = sortXW_RL;
    this.ih = height;
    this.MAX = nodeMAX;
    this.MIN = nodeMIN;
    this.MIX = nodeMIX;
    this.iLR = nodeXM;
    this.iRL = nodeXW;
  }

  static ofRange&lt;T extends Node&gt;(
    this: NodeConstructor&lt;T&gt;,
    A: number,
    Z: number,
    X: "XM" | "XW" = "XM",
  ): T[] {
    const OUT: T[] = [];
    for (let i = A; i &lt;= Z; i++) {
      OUT.push(new this(i, X));
    }
    return OUT;
  }

  static ofMulti&lt;T extends Node&gt;(
    this: NodeConstructor&lt;T&gt;,
    R: string,
    X: "XM" | "XW" = "XM",
  ): T[] {
    const RANGE = ((input: string): number[] =&gt; {
      const result = new Set&lt;number&gt;();

      for (const token of input.trim().split(" ")) {
        if (!token) continue;

        if (token.includes("..")) {
          const [start, end] = token.split("..").map(Number);
          if (Number.isInteger(start) && Number.isInteger(end)) {
            const step = start &lt;= end ? 1 : -1;
            for (let i = start; step &gt; 0 ? i &lt;= end : i &gt;= end; i += step) {
              result.add(i);
            }
          }
        } else {
          const num = Number(token);
          if (Number.isInteger(num)) {
            result.add(num);
          }
        }
      }

      return [...result].sort((a, b) =&gt; a - b);
    })(R);

    const OUT: T[] = [];
    for (const i of RANGE) {
      OUT.push(new this(i, X));
    }
    return OUT;
  }
}