import type { 
  InputSosa
} from "./sosa_types.ts";
import { Data } from "./sosa-data.ts";
import { fromSosa } from "./sosa-from-sosa.ts";
import { 
  rowPlotGroupStart, rowPlotGroupEnd, rowPlotHeader,
  rowPlotTierGene, rowPlotTierLine, 
  rowPlotLineClass, rowPlotLineOrder, 
  rowPlotSosaRange, rowPlotSosaOrder, rowPlotDataSosa
} from "./sosa-data-plot-color.ts";

class DataDB {
  #IdDb: Map<number, Data> = new Map();
  
  constructor() {}

  #isSosaNorDec(sosa: number):boolean {
    return Number.isInteger(sosa) && sosa > 0;
  }

  #addFromSosaNorDec(sosa: number):void {
    if (this.#isSosaNorDec(sosa)) {
      this.#IdDb.set(sosa, new Data({
        SosaMom: fromSosa.SosaMom(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        SosaDad: fromSosa.SosaDad(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        SosaEgo: fromSosa.SosaEgo(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        SosaKid: fromSosa.SosaKid(sosa),                   /* TYPE: SosaIdnInterface & SosaSexInterface */ 
        GenSosa: fromSosa.GenSosa(fromSosa.SosaEgo(sosa)), /* TYPE: SosaSortInterface & SosaSpanInterface */ 
        GenTier: fromSosa.GenTier(fromSosa.SosaEgo(sosa)), /* TYPE: TierGeneType */ 
        LineIdY: fromSosa.VecIdnY(fromSosa.SosaEgo(sosa)), /* TYPE: TierLineType */ 
        LineIdM: fromSosa.VecIdnM(fromSosa.SosaEgo(sosa)), /* TYPE: TierLineType */ 
        LineEgY: fromSosa.VecOrdY(fromSosa.SosaEgo(sosa)), /* TYPE: LineSortInterface & LineTypeInterface */ 
        LineEgM: fromSosa.VecOrdM(fromSosa.SosaEgo(sosa))  /* TYPE: LineSortInterface & LineTypeInterface */ 
    }));
    }
  }

  setFromSosaNorDec(input:InputSosa):void {
    if (typeof input === 'number') {
      this.#addFromSosaNorDec(input);
    } else if (Array.isArray(input)) {
      for (const s of input) this.#addFromSosaNorDec(s);
    } else {
      for (let s = input.from; s <= input.to; s++) {
        this.#addFromSosaNorDec(s);
      }
    }
  }
  

  #LOG(XXX:any, YYY?:Deno.InspectOptions):void {
    console.log(Deno.inspect(XXX, YYY ?? {
      colors:true,
      depth: 80
    }));
  }

  get getData(): Map<number, Data> {
    return this.#IdDb;
  }
  get logData(): Map<number, Data> {
    this.#LOG(this.getData);
    return this.getData;
  }

  get getDataSortByTierGene(): Map<number, Map<number, Data>> {
    const ordDEC = (a: [number, any], b: [number, any]) => a[0] - b[0];
    
    let G = new Map<number, Map<number, Data>>();

    DataDB.forEachMap1(this.#IdDb,(id,data) => {     
      const tier = data.TierGene.Dec;
      // pobierz istniejącą grupę lub stwórz nową
      const group = G.get(tier) ?? new Map<number, Data>();
      group.set(id, data);
      G.set(tier, group);
    });
    
    G = new Map<number, Map<number, Data>>(
      [...G.entries()]
        .sort(ordDEC)
        .map(([tier, group]) => [
          tier,
          new Map<number, Data>([...group.entries()].sort(ordDEC)),
        ])
    );

    return G;
  }

  get logDataSortByTierGene(): Map<number, Map<number, Data>> {
    this.#LOG(this.getDataSortByTierGene);
    return this.getDataSortByTierGene;
  }

  get getPlot(): string {
    let text = '';
    text += rowPlotHeader(this.#IdDb.size) +'\n';    
    DataDB.forEachMap1(this.#IdDb,(K,V) => {     
      text += '\t\n';      
      text += '\t' + rowPlotGroupStart(K) +'\n';
      text += '\t\t' + rowPlotTierGene(V.TierGene) +'\n';
      text += '\t\t' + rowPlotTierLine(V.TierLine) +'\n';
      text += '\t\t' + rowPlotLineClass(V.OrdLineCat) +'\n';
      text += '\t\t' + rowPlotLineOrder(V.OrdLine) +'\n';      
      text += '\t\t' + rowPlotSosaRange(V.OrdSosaMin,V.OrdSosaMax) +'\n';
      text += '\t\t' + rowPlotSosaOrder(V.OrdSosa) +'\n';
      text += '\t\t' + rowPlotDataSosa(V.SosaEgo, V.SosaEgoSex, "Ego") +'\n';
      text += '\t\t' + rowPlotDataSosa(V.SosaDad, V.SosaDadSex, "Dad") +'\n';
      text += '\t\t' + rowPlotDataSosa(V.SosaMom, V.SosaMomSex, "Mom") +'\n';
      text += '\t\t' + rowPlotDataSosa(V.SosaKid, V.SosaKidSex, "Kid") +'\n';
      text += '\t' + rowPlotGroupEnd +'\n';
    });
    return text;
  }
  get logPlot(): string {
    this.#LOG(this.getPlot);
    return this.getPlot;
  }

  
  get getPlotTabShort(): string {
    let text = '';
    DataDB.forEachMap2(this.getDataSortByTierGene,(_nrGene, _nrSosa, data) => {
      const A = `[DEC] [Gene: ${data.TierGene.Dec}], [Sosa: ${data.SosaEgoSex} ${data.SosaEgo.Nor.Dec}], `;
      const B = `[LineY: ${data.TierLine.PatY.Dec[1]} - ${data.OrdLine.PatY.Dec}], [LineM: ${data.TierLine.MatM.Dec[1]} - ${data.OrdLine.MatM.Dec}], `;
      const C = `[Sort: (${data.OrdSosa.Nor.Dec[1]} | ${data.OrdSosa.Rev.Dec[1]})]`
      text += A+B+C +'\n';
    });
    return text;
  }

  get logPlotTabShort(): string {
    //this.#LOG(this.getPlotTabShort);
    console.log(this.getPlotTabShort);
    return this.getPlotTabShort;
  }

  static forEachMap2(
    nestedMap: Map<number, Map<number, Data>>,
    callback: (outerKey: number, innerKey: number, data: Data) => void
  ): void {
    for (const [outerKey, innerMap] of nestedMap) {
      this.forEachMap1(innerMap, (innerKey, data) => {
        callback(outerKey, innerKey, data);
      });
    }
  }

  static forEachMap1(
    map: Map<number, Data>,
    callback: (key: number, data: Data) => void
  ): void {
      for (const [key, data] of map) {
        callback(key, data);
      }
    
  }


}

export { DataDB };
