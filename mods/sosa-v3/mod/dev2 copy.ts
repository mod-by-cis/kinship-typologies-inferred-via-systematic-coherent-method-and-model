

import { loopSequence } from "../util.ts";


// --------------------------------------------------------------------------------
// 3) Relacje rodzinne (Sosa⇒rodzice/dziecko)
// --------------------------------------------------------------------------------

import { FAM, PER } from "./main.ts";



// --------------------------------------------------------------------------------
// 8) Demo
// --------------------------------------------------------------------------------
loopSequence([1,16], i => {
  // console.log('i: ', i);
  // const T = LogicSosa.fromSosa(FAM.EGO(i))._log;
  // LogicPatY.fromObjSosa(T)._log;
  // LogicMatM.fromObjSosa(T)._log;
  PER.fromSosa(FAM.EGO(i))._log;
});
