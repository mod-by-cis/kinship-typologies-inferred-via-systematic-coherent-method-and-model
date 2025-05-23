type NodeConstructor<T> = new (node: number, X?: "XM" | "XW") => T;

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
    if (typeof node !== "number" || !Number.isInteger(node) || node <= 0) {
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

  static ofRange<T extends Node>(
    this: NodeConstructor<T>,
    A: number,
    Z: number,
    X: "XM" | "XW" = "XM",
  ): T[] {
    const OUT: T[] = [];
    for (let i = A; i <= Z; i++) {
      OUT.push(new this(i, X));
    }
    return OUT;
  }

  static ofMulti<T extends Node>(
    this: NodeConstructor<T>,
    R: string,
    X: "XM" | "XW" = "XM",
  ): T[] {
    const RANGE = ((input: string): number[] => {
      const result = new Set<number>();

      for (const token of input.trim().split(" ")) {
        if (!token) continue;

        if (token.includes("..")) {
          const [start, end] = token.split("..").map(Number);
          if (Number.isInteger(start) && Number.isInteger(end)) {
            const step = start <= end ? 1 : -1;
            for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
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

      return [...result].sort((a, b) => a - b);
    })(R);

    const OUT: T[] = [];
    for (const i of RANGE) {
      OUT.push(new this(i, X));
    }
    return OUT;
  }
}

class NodeLine extends Node {
  jhSortLL: number;   //iM: number;    
  jhLL   : number; //lvLM: number;   
  jLL    : number;   //LM: number;    
  jSortLL : number;  //LM_: number;      

  jhSortRR: number;   //iW: number;    
  jhRR   : number; //lvLW: number;   
  jRR    : number;   //LW: number;    
  jSortRR : number;  //LW_: number;   
  
  constructor(node: number, X: "XM" | "XW" = "XM"){
    super(node, X);
    function v2adic(x: number): number {
      if (typeof x !== "number" || !Number.isInteger(x) || x <= 0) {
        throw new Error("Parametr x musi być dodatnią liczbą całkowitą.");
      }

      // x & -x to 2^k, więc log2 tego da dokładnie k
      return Math.log2(x & -x);
    }

    function v2adic_precision(x: number): number {
      if (typeof x !== "number" || !Number.isInteger(x) || x <= 0) {
        throw new Error("Parametr x musi być dodatnią liczbą całkowitą.");
      }
      let r = 0;
      let t = true;
      const e = Array.from(x.toString(2));
      let l = e.length;
      while (l > 0 && t) {
        if (e[l - 1] == "0") {
          r++;
        } else {
          t = false;
        }
        l--;
      }
      return r;
    }

    this.jhLL = (this.iLR == 0 ? this.ih + 1 : v2adic(this.iLR) + 1) - 1;
    this.jhRR = (this.iRL == 0 ? this.ih + 1 : v2adic(this.iRL) + 1) - 1;

    this.jSortLL = this.iLR / Math.pow(2, v2adic(this.iLR));
    this.jSortRR = this.iRL / Math.pow(2, v2adic(this.iRL));

    this.jLL = this.jSortLL + 1;
    this.jRR = this.jSortRR + 2;

    this.jhSortLL = Math.floor(Math.log2(this.jSortLL));
    this.jhSortRR = Math.floor(Math.log2(this.jSortRR));
  }
}

export { Node, NodeLine };

// example
// console.table(NodeLine.ofMulti('1..16'));
