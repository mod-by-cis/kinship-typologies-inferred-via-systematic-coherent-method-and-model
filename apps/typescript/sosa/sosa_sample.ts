import { DataDB } from "./sosa-data-db.ts";
import { Data } from "./sosa-data.ts";




// ======example usage - data enter =====

const AAA = new DataDB();

//AAA.setFromSosaNorDec(44);
//AAA.setFromSosaNorDec([153, 1324, 9848]);
//AAA.setFromSosaNorDec([153, 1324, 15432]);
//AAA.setFromSosaNorDec({from: 1, to:32});
AAA.setFromSosaNorDec({from: 1, to:9});


// ======example usage - data views =====

//PlotDB.logData(AAA);
//console.log(AAA.getPlot);
//console.log(AAA.getData);
AAA.logDataSortByTierGene;

// ======example usage ===
