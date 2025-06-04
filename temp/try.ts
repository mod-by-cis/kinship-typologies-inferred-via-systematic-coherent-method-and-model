import {
  type ExcelResults,
  initRangeFirstStepSize,
} from "../docs/logic/calculateExcel.ts";
import generTable1 from "../docs/data/generTable1.ts";

const data: ExcelResults = generTable1(initRangeFirstStepSize(1, 1, 3));
const sort: string[] = [
  "ki",
  "mi",
  "li",
  "i",
  "hi",
  "kiA",
  "kiZ",
  "=||",
  "h",
  "hA",
  "hZ",
  "hAZ",
  "=||",
  "kjZ",
  "kjA",
  "hj",
  "j",
  "lj",
  "wj",
  "kj",
];

const tabl = generateTABLE("COL", sort, data);

console.log(data);
//console.log(sort);
console.log(tabl);
console.log(transposeTABLE(tabl));
