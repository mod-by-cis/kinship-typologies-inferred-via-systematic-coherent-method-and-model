import * as A from "./mods/sosa-v3/mod.ts";

const x:[number,number] | [number] = [222];
A.loopSequence(x, i => {
  // console.log('i: ', i);
  // A.SOSA.fromSosa(A.FAM.EGO(i))._log;
  const T = A.SOSA.fromSosa(A.FAM.EGO(i));
  // T._log;
  A.LPAT.fromObjSosa(T)._log;
  // A.LMAT.fromObjSosa(T)._log; // ! ŹLE
  // A.PER.fromSosa(A.FAM.EGO(i))._log;
});
