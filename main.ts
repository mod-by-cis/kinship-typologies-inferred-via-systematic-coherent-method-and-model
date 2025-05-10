import * as A from "./mods/sosa-v3/mod.ts";
import * as B from "./mods/sosa-v2/mod.ts";

const x:[number,number] | [number] = [2];
A.loopSequence(x, i => {
  // console.log('i: ', i);
  // A.SOSA.fromSosa(A.FAM.EGO(i))._log;
  const T = A.SOSA.fromSosa(A.FAM.EGO(i));
  // T._log;
  // A.LPAT.fromObjSosa(T)._log;
  A.LMAT.fromObjSosa(T)._log; // ! ŹLE
  // A.PER.fromSosa(A.FAM.EGO(i))._log;
});

B.loopSequence(x, i => {
  // console.log('i: ', i);
  // B.SOSA.fromSosa(B.FAM.EGO(i))._log;
  const T = B.SOSA.fromSosa(B.FAM.EGO(i));
  // T._log;
  // B.LPAT.fromObjSosa(T)._log;
  B.LMAT.fromObjSosa(T)._log; // * OK
  // B.PER.fromSosa(B.FAM.EGO(i))._log;
});
