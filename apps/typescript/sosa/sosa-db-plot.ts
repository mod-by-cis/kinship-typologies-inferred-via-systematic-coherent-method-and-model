import { DataDB } from "./sosa-db-data.ts";
import { bold, 
  blue,yellow, green,  gray, white, 
  bgBlue, bgYellow, bgGreen, bgCyan, bgMagenta, bgRed,
  bgBrightBlue, bgBrightYellow,  bgBrightBlack
} from "@std/fmt/colors";
import type { DecBin1Type,DecBin2Type, GenderType } from "./sosa_types.ts";

class PlotDB {
  static logBlack(data:DataDB): void {
    console.log(data.IdDb);
  }

  
  static logColor(data:DataDB): void {
    const lMap  = white('Map');
    const lData = white('Data');
    const lDec  = white('Dec');
    const lBin  = white('Bin');

    const arrow = gray('->');
    const d  =  gray(': ');
    const c  =  gray(', ');
    const i  =  gray('"');
    const brL  =  gray('(');
    const brR  =  gray(')');
    const boL  =  gray('{');
    const boR  =  gray('}');
    const baL  =  gray('[');
    const baR  =  gray(']');

    const dMapSize = yellow(` ${data.IdDb.size} `.padStart(5,' '));

    const lTierGen = bgCyan(yellow(bold(' Gen  ')));
    const lSortGen = bgBrightBlue(' Ord  ');
    const lMax = bgBlue(' Max ');
    const lMin = bgBlue(' Min ');
    const lNor = bgBrightBlue(' Nor ');
    const lRev = bgBrightBlue(' Rev ');
    const lLine = bgGreen(' Line ');
    const lPat = bgMagenta(' Y Pat ');
    const lMat = bgRed(' M Mat ');
    const lOrder = bold(bgBrightBlue(' Ord '));
    const lOther = bold(bgCyan(' Gen '));
    const lSosaEgo = blue(bold(bgBrightYellow(' Sosa  Ego  ')));
    const lSosaKid = white(bold(bgYellow(' Sosa  Kid  ')));
    const lSosaDad = white(bold(bgYellow(' Sosa  Dad  ')));
    const lSosaMom = white(bold(bgYellow(' Sosa  Mom  ')));
    
    console.group(`${arrow} ${lMap} ${brL} ${dMapSize} ${brR} ${boL}`);
    for (const [K, V] of data.IdDb) {
      console.log();
      const dMapItem = yellow(`${K}`.padEnd(7,'·'));
      const lGender = (g:GenderType) => `${bgBrightBlack(bold(white(` ${g} `)))}`;
      const lDecBin1 = (d_b: DecBin1Type) => `${boL} ${lDec}${d} ${yellow(''+d_b.Dec)}${c} ${lBin}${d} ${i}${green(d_b.Bin)}${i} ${boR}`;
      const lDecBin2 = (d_b: DecBin2Type) => `${boL} ${lDec}${d}${baL} ${yellow(''+d_b.Dec[0])}${c}${yellow(''+d_b.Dec[1])} ${baR}${c} ${lBin}${d}${baL} ${i}${green(d_b.Bin[0])}${i}${c}${i}${green(d_b.Bin[1])}${i} ${baR} ${boR}`;
      console.group(`${dMapItem} ${arrow} ${lData } ${boL}`);
      console.log(`${lTierGen} ${lDecBin1(V.GenTier)}`);
      console.log(`${lLine} ${lPat} ${lDecBin2(V.LineIdY)}`);
      console.log(`${lLine} ${lMat} ${lDecBin2(V.LineIdM)}`);
      console.log(`${lLine} ${lPat} ${lOrder} ${lDecBin1(V.LineEgY.Sort)}  ${lOther} ${lDecBin1(V.LineEgY.Tier)}`);
      console.log(`${lLine} ${lMat} ${lOrder} ${lDecBin1(V.LineEgM.Sort)}  ${lOther} ${lDecBin1(V.LineEgM.Tier)}`); 
      console.log(`${lSortGen} ${lMin} ${lDecBin1(V.GenSosa.Span.Min)}  ${lMax} ${lDecBin1(V.GenSosa.Span.Max)}`);
      console.log(`${lSortGen} ${lNor} ${lDecBin2(V.GenSosa.Sort.Nor)}  ${lRev} ${lDecBin2(V.GenSosa.Sort.Rev)}`);
      console.log(`${lSosaEgo} ${lGender(V.SosaEgo.Sex)} ${lNor} ${lDecBin1(V.SosaEgo.Idn.Nor)}  ${lRev} ${lDecBin1(V.SosaEgo.Idn.Rev)}`);
      console.log(`${lSosaDad} ${lGender(V.SosaDad.Sex)} ${lNor} ${lDecBin1(V.SosaDad.Idn.Nor)}  ${lRev} ${lDecBin1(V.SosaDad.Idn.Rev)}`);
      console.log(`${lSosaMom} ${lGender(V.SosaMom.Sex)} ${lNor} ${lDecBin1(V.SosaMom.Idn.Nor)}  ${lRev} ${lDecBin1(V.SosaMom.Idn.Rev)}`);
      console.log(`${lSosaKid} ${lGender(V.SosaKid.Sex)} ${lNor} ${lDecBin1(V.SosaKid.Idn.Nor)}  ${lRev} ${lDecBin1(V.SosaKid.Idn.Rev)}`);
      console.groupEnd();
      console.log(`${boR}`);
    }
    console.groupEnd();
  }
}

export { PlotDB };
