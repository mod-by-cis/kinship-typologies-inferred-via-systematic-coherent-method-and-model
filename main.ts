import * as A from "./mods/sosa-v3/mod.ts";
import * as B from "./mods/sosa-v2/mod.ts";

//A.loopSequence([1,16], i => {
//  // console.log('i: ', i);
//  // const T = LogicSosa.fromSosa(FAM.EGO(i))._log;
//  // LogicPatY.fromObjSosa(T)._log;
//  // LogicMatM.fromObjSosa(T)._log;
//  A.PER.fromSosa(A.FAM.EGO(i))._log;
//});

B.loopSequence([1,16], i => {
  // console.log('i: ', i);
  // const T = LogicSosa.fromSosa(FAM.EGO(i))._log;
  // LogicPatY.fromObjSosa(T)._log;
  // LogicMatM.fromObjSosa(T)._log;
  B.PER.fromSosa(B.FAM.EGO(i))._log;
});
