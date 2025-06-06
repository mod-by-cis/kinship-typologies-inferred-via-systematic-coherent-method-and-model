/** @jsxRuntime automatic */
/** @jsxImportSource https://esm.sh/preact@10.26.8 */
import { signal, useSignal } from "https://esm.sh/@preact/signals@2.2.0";
import { InputNumber } from "../ui/InputNumber.tsx"; // Upewnij się, że ścieżka jest poprawna
import { InputChipsList } from "../ui/InputChipsList.tsx";
import {
  type ExcelNestedN,
  type ExcelResults,
  ExcelResultSortingOutputAtTable,
  initRangeFirstStepLast,
  initRangeFirstStepSize,
} from "../logic/calculateExcel.ts";
import * as MathF from "../logic/mathFunc.ts";
import { PlotHtmlTable } from "../ui/PlotHtmlTable.tsx";
import generTable1 from "../data/generTable1.ts";


import { 
  defaultOrderingTable1,
  defaultPropsValsTable1
} from "../config/default.ts";


type StatePlotMap = Map<string, (number | boolean)[]>;

//const resultM = signal<ExcelResults>(new Map<string, ExcelNestedN>());

export function App() {
  const from = useSignal(1);
  const to = useSignal(10);
  const resultM = useSignal<ExcelResults>(new Map<string, ExcelNestedN>());
  const resultS = generTable1(initRangeFirstStepSize(1, 1, 15));
  console.log("RES_MAP", resultS);
  const plotRow = useSignal(true);
  const plotSplit = useSignal(true);
  const plotSet = useSignal<string[]>([]);

  /*const plotMap = useSignal<StatePlotMap>(new Map<string, (number | boolean)[]>(

  ));*/
  const calculate = () => {
    // Upewnij się, że wartości są liczbami przed pętlą
    if (isNaN(Number(from.value)) || isNaN(Number(to.value))) {
      console.error("Wartości 'from' lub 'to' nie są liczbami.");
      resultM.value = new Map<string, ExcelNestedN>();
      return;
    }

    resultM.value = generTable1(
      initRangeFirstStepLast(Number(from.value), 1, Number(to.value)),
    );
  };

  const changePos = () => {
    plotRow.value = !plotRow.value;
  };
  const changeSplit = () => {
    plotSplit.value = !plotSplit.value;
  };

  // Handler dla onValueChange, który odzwierciedla zachowanie `+(e.currentTarget.value)`
  // Kiedy input jest pusty, `e.currentTarget.value` to "", a `+""` to 0.
  // Nasz `onValueChange` przekazuje `undefined`, gdy `valueAsNumber` to NaN (np. dla pustego inputu).
  const handleFromChange = (newValue: number | undefined) => {
    if (newValue !== undefined) {
      from.value = newValue;
    } else {
      from.value = 0; // Lub inna wartość domyślna, np. 1, jeśli to bardziej sensowne
    }
  };

  const handleToChange = (newValue: number | undefined) => {
    if (newValue !== undefined) {
      to.value = newValue;
    } else {
      to.value = 0; // Lub inna wartość domyślna
    }
  };

  return (
    <main>
      <h1>Matematyka w genealogii.</h1>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: "40px",
          marginBottom: "20px",
          flexFlow: "row nowrap",
        }}
      >
        <button
          onClick={calculate}
          style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
        >
          Policz
        </button>
        <fieldset
          class="fieldset-inputs-number"
          style={{
            border: "3px solid #6c757d",
            borderRadius: "8px",
            padding: "20px",
            marginTop: "0",
            marginBottom: "0",
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",
          }}
        >
          <legend
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "3px 6px",
            }}
          >
            Choose range of 【i】
          </legend>

          <InputNumber
            name="input1"
            value={from.value}
            onValueChange={handleFromChange}
            def={1}
            min={1} // log2 jest zdefiniowany dla liczb > 0
            step={1}
            placeholder="Od"
            aria-label="Wartość początkowa przedziału"
          />
          <InputNumber
            name="input2"
            value={to.value}
            onValueChange={handleToChange}
            def={7}
            min={from.value >= 1 ? from.value : 1} // 'to' nie powinno być mniejsze niż 'from'
            step={1}
            placeholder="Do"
            aria-label="Wartość końcowa przedziału"
          />
        </fieldset>
</div>
        <InputChipsList
          availableValues={defaultPropsValsTable1}
          defaultValues={defaultOrderingTable1}
          values={plotSet.value}
          titleAvailable="Dostępne:"
          titleSelected="Wybrane:"
          onChange={(val) => {
            plotSet.value = val;
            console.log(plotSet.value);
          }}
        />
      
      <div>
        <input
          type="checkbox"
          id="PlotPosition"
          name="PlotPosition"
          checked={plotRow.value}
          onClick={changePos}
        />
        <label for="PlotPosition">{plotRow.value ? "Row" : "Col"}</label>
        <input
          type="checkbox"
          id="PlotSplitGeneration"
          name="PlotSplitGeneration"
          checked={plotSplit.value}
          onClick={changeSplit}
        />
        <label for="PlotSplitGeneration">
          {plotRow.value ? "split-h" : "nonstop"}
        </label>
      </div>
      <br />
      <br />
      <br />

      {resultM.value.size > 0 && (
        <>
          <h3>Rezultat obliczeń:</h3>
          <PlotHtmlTable
            data={ExcelResultSortingOutputAtTable(
              plotRow.value ? "ROW" : "COL",
              plotSet.value,
              resultM.value,
              plotSplit.value,
            )}
            mode={plotRow.value ? "ROW" : "COL"}
            caption="Wyniki obliczeń."
          />
        </>
      )}

      <p>
        <ul>
          <li>【i】</li>
          <li>【h】 = floor(log₂(i)) ||| dla przedziału [i]</li>
          <li>【hA】 = 2**h ||| dla przedziału [h]</li>
          <li>【hZ】 = 2**(h+1)-1 ||| dla przedziału [h]</li>
          <li>【hAZ】 =3*2**h-1 = 1.5*2**(h+1)-1 ||| dla przedziału [h]</li>
          <li>【hi】 =【i】 -【hA】</li>
          <li>【hj】 =【hZ】 -【i】</li>
          <li>【j】 =【hAZ】 -【i】</li>
        </ul>
      </p>
      <p>
        <ul>
          <li>
            【ki】 = waluacja dwu-adyczna liczby naturalnej dodatniej [i]
          </li>
          <li>
            【kj】 = waluacja dwu-adyczna liczby naturalnej dodatniej [j]
          </li>
          <li>【kiA】 = 2**【ki】</li>
          <li>【kjA】 = 2**【kj】</li>
          <li>【li】 =【i】/【kiA】</li>
          <li>【lj】 =【j】/【kjA】</li>
          <li>【m】 =【li】+1</li>
          <li>【w】 =【lj】+2</li>
        </ul>
      </p>
    </main>
  );
}
