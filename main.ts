import * as A from "./mods/sosa-v3/mod.ts";
import * as B from "./mods/sosa-v2/mod.ts";

A.loopSequence([1,16], i => {
  // console.log('i: ', i);
  // A.SOSA.fromSosa(A.FAM.EGO(i))._log;
    const T = A.SOSA.fromSosa(A.FAM.EGO(i));
  // A.LPAT.fromObjSosa(T)._log;
     A.LMAT.fromObjSosa(T)._log;
  // A.PER.fromSosa(A.FAM.EGO(i))._log;
});

B.loopSequence([1,16], i => {
  // console.log('i: ', i);
  // B.SOSA.fromSosa(B.FAM.EGO(i))._log;
  // const T = B.SOSA.fromSosa(B.FAM.EGO(i));
  // B.LPAT.fromObjSosa(T)._log;
  // B.LMAT.fromObjSosa(T)._log;
  // B.PER.fromSosa(B.FAM.EGO(i))._log;
});
