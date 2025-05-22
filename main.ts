import * as A from "./mods/sosa-v3/mod.ts";

const LOG = (label: string, data:any, mode?:Deno.InspectOptions):void => {
  const DEF:Deno.InspectOptions = { 
    colors: true, 
    breakLength: 280, 
    depth: 20,
    maxArrayLength: Infinity
  }; 
  console.log(
    `[${label}]`,
    Deno.inspect(data, mode ?? DEF),
  );
}

const x:[number,number] | [number] = [222];

const listINT:number[] = [];
const listBIN:string[] = [];


A.loopSequence([1,128], i => {

  /*
  [INT] [INCREMENT] sosaEGO => A000027  |> nrA.sosaEGO[0]
  [INT] [INCREMENT] sosaKID => A110654  |> nrA.sosaKID[0]
  [INT] [INCREMENT] sosaDAD => A119432  |> nrA.sosaDAD_INC[0]
  [INT] [INCREMENT] sosaMOM => A144396  |> nrA.sosaMOM_INC[0]
  [INT] [DECREMENT] sosaDAD => A144396  |> nrA.sosaDAD_DEC[0]
  [INT] [DECREMENT] sosaMOM => A119432  |> nrA.sosaMOM_DEC[0]
  */
  const nrA = A.fromSOSA(i);

  
  /*
  [EGO] [INT] [INCREMENT] sosaEGO => A000027  |> nrB.idn.INC[0]
  [EGO] [INT] [DECREMENT] sosaEGO => A054429  |> nrB.idn.DEC[0]
  */
  const nrB = A.SOSA.fromSosa(A.fromSOSA(i).sosaEGO);

  
  /*
  [KID] [INT] [INCREMENT] sosaEGO => A000027  |> nrC.idn.INC[0]
  [KID] [INT] [DECREMENT] sosaEGO => A054429  |> nrC.idn.DEC[0]
  */
  const nrC = A.SOSA.fromSosa(A.fromSOSA(i).sosaKID);

  listINT.push(nrC.idn.INC[0]);
  // console.log('i: ', i);
  // console.log(A.fromSOSA(i));
  // A.SOSA.fromSosa(A.FAM.EGO(i))._log;
  // const T = A.SOSA.fromSosa(A.fromSOSA(i).sosaEGO);
  // T._log;
  // A.LPAT.fromObjSosa(T)._log;
  // A.LMAT.fromObjSosa(T)._log; //
  // A.PER.fromSosa(A.FAM.EGO(i))._log;
});

A.loopSequence(x, i => {
  // console.log('i: ', i);
  console.log(A.fromSOSA(i));
  A.SOSA.fromSosa(A.fromSOSA(i).sosaEGO)._log;
  // const T = A.SOSA.fromSosa(A.fromSOSA(i).sosaEGO);
  // T._log;
  // A.LPAT.fromObjSosa(T)._log;
  // A.LMAT.fromObjSosa(T)._log; //
  // A.PER.fromSosa(A.FAM.EGO(i))._log;
});


LOG('listINT', listINT);
LOG('listBIN', listBIN);
