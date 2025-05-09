import { DataDB } from "./sosa-db-data.ts";
import { PlotDB } from "./sosa-db-plot.ts";




// ======example usage - data enter =====

const AAA = new DataDB();

//AAA.setFromSosaNorDec(44);
//AAA.setFromSosaNorDec([153, 1324, 9848]);
//AAA.setFromSosaNorDec([153, 1324, 15432]);
//AAA.setFromSosaNorDec({from: 1, to:32});
AAA.setFromSosaNorDec({from: 1, to:9});


// ======example usage - data views =====

//PlotDB.logData(AAA);
PlotDB.logColor(AAA);


// ======example usage =====
