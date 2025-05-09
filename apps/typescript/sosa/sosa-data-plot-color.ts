import { bold, italic,
  blue,yellow, green,  gray, white, 
  bgBlue, bgYellow, bgGreen, bgCyan, bgMagenta, bgRed,
  bgBrightBlue, bgBrightYellow,  bgBrightBlack,
} from "@std/fmt/colors";

import type { GenderType, DecBin1Type, DecBin1NorRevType, DecBin2Type, DecBin2NorRevType } from "./sosa_types.ts";

const o = {
  bracket: {
    r: [gray("("), gray(")")],
    c: [gray("{"), gray("}")],
    s: [gray("["), gray("]")]
  },
  arrow: gray("->"),
  comma: gray(","),
  colon: gray(":"),
  quot2: gray("\""),
  quot1: gray("\'"),
} as const;

const f = {
  ital_fgWhite: (s:string|number) => italic(white(''+s)),
  bold_bgCyan_fgYellow:  (s:string|number) => bold(bgCyan(yellow(''+s))),
  bold_bgBlueDark: (s:string|number) => bold(bgBlue(''+s)),
  bold_bgBlueLite: (s:string|number) => bold(bgBrightBlue(''+s)),
  bold_bgMagenta: (s:string|number) => bold(bgMagenta(''+s)),
  bold_bgRed: (s:string|number) => bold(bgRed(''+s)),
} as const;

const x = {
  lData: f.ital_fgWhite('Data'),
  lMap: f.ital_fgWhite('Map'),
  lDec: f.ital_fgWhite('Dec'),
  lBin: f.ital_fgWhite('Bin'),
  lTierGen: f.bold_bgCyan_fgYellow(' Tier  Gene '),
  lTierRay: f.bold_bgCyan_fgYellow(' Tier  Line '),
  lMax:f.bold_bgBlueDark(' Max  '),
  lMin:f.bold_bgBlueDark(' Min  '),
  lNor:f.bold_bgBlueLite(' Nor  '),
  lRev:f.bold_bgBlueLite(' Rev  '),
  lPat:f.bold_bgMagenta(' PatY '),
  lMat:f.bold_bgRed(' MatM ')
} as const;

const u = {
  lSosa: white(bold(bgYellow(' Sosa '))),
  lLine: bgGreen(' Line '),
  lOrder: bold(bgBrightBlue(' Ord ')),
  lClass: bold(bgBrightBlack(' Cat ')),
} as const;

const w = {
    lSosaEgo: blue(bold(bgBrightYellow(' Ego '))),
    lSosaKid: white(bold(bgYellow(' Kid '))),
    lSosaDad: white(bold(bgYellow(' Dad '))),
    lSosaMom: white(bold(bgYellow(' Mom ')))
} as const;

const dMapSize = (n:number) => yellow(` ${n} `.padStart(5,' '));
const dMapItem = (n:number) =>  yellow(`${n}`.padEnd(7,'·'));
const lGender =  (sex: GenderType ) => `${bgBrightBlack(bold(white(` ${sex} `)))}`;
const lDecBin1 = (d_b: DecBin1Type) => `${o.bracket.c[0]} ${
                  x.lDec
                }${o.colon}  ${yellow(''+d_b.Dec)}${o.comma}  ${
                  x.lBin
                }${o.colon}  ${o.quot2}${green(d_b.Bin)}${o.quot2} ${o.bracket.c[1]}`;

const lDecBin2 = (d_b: DecBin2Type) => `${o.bracket.c[0]} ${
                  x.lDec
                }${o.colon} ${o.bracket.s[0]} ${yellow(''+d_b.Dec[0])}${o.comma} ${yellow(''+d_b.Dec[1])} ${o.bracket.s[1]}${o.comma}  ${
                  x.lBin
                }${o.colon} ${o.bracket.s[0]} ${o.quot2}${green(d_b.Bin[0])}${o.quot2}${o.comma} ${o.quot2}${green(d_b.Bin[1])}${o.quot2} ${o.bracket.s[1]} ${o.bracket.c[1]}`;

const rowPlotGroupStart = (A: number) => `${dMapItem(A)} ${o.arrow} ${x.lDec} ${o.bracket.c[0]}`;
const rowPlotTierGene =  (A: DecBin1Type) => `${x.lTierGen} ${lDecBin1(A)}`;
const rowPlotTierLine =  (A: { PatY: DecBin2Type; MatM: DecBin2Type; }) => `${x.lTierRay} ${x.lPat} ${lDecBin2(A.PatY)}   ${x.lMat} ${lDecBin2(A.MatM)}`;
const rowPlotLineClass = (A: { PatY: DecBin1Type; MatM: DecBin1Type; }) => `${u.lLine} ${u.lClass } ${x.lPat} ${lDecBin1(A.PatY)}  ${x.lMat} ${lDecBin1(A.MatM)}`;
const rowPlotLineOrder = (A: { PatY: DecBin1Type; MatM: DecBin1Type; }) => `${u.lLine} ${u.lOrder} ${x.lPat} ${lDecBin1(A.PatY)}  ${x.lMat} ${lDecBin1(A.MatM)}`;
const rowPlotSosaRange = (A: DecBin1Type, B: DecBin1Type) => `${u.lSosa} ${u.lOrder} ${x.lMin} ${lDecBin1(A)}  ${ x.lMax} ${lDecBin1(B)}`;
const rowPlotSosaOrder = (A: DecBin2NorRevType ) => `${u.lSosa} ${u.lOrder} ${x.lNor} ${lDecBin2(A.Nor)}  ${x.lRev} ${lDecBin2(A.Rev)}`;
const lSosaSelect = (A:"Ego"|"Kid"|"Dad"|"Mom") => {
  switch (A) {
    case"Ego": return w.lSosaEgo;
    case"Kid": return w.lSosaKid;
    case"Dad": return w.lSosaDad;
    case"Mom": return w.lSosaMom;
  }
}
const rowPlotDataSosa  = (A: DecBin1NorRevType, B: GenderType, C: "Ego"|"Kid"|"Dad"|"Mom" ) => `${u.lSosa} ${lSosaSelect(C)} ${lGender(B)} ${x.lNor} ${lDecBin1(A.Nor)}  ${x.lRev} ${lDecBin1(A.Rev)}`;
const rowPlotGroupEnd = `${o.bracket.c[1]}`;
const rowPlotHeader =  (A:number) => `${o.arrow} ${x.lMap} ${o.bracket.r[0]} ${dMapSize(A)} ${o.bracket.r[1]} ${o.bracket.c[0]}`;

export {
  rowPlotGroupStart,rowPlotGroupEnd, rowPlotHeader,
  rowPlotTierGene, rowPlotTierLine, 
  rowPlotLineClass, rowPlotLineOrder, 
  rowPlotSosaRange, rowPlotSosaOrder,rowPlotDataSosa
};
