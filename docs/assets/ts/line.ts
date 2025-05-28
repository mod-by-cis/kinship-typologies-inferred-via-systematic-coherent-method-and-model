// line.ts
import { Node } from "./node.ts";

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