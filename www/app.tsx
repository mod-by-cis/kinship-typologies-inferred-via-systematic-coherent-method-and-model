/** @jsxRuntime automatic */
/** @jsxImportSource https://esm.sh/preact@10.26.8 */
import { signal, useSignal } from "https://esm.sh/@preact/signals@2.2.0";
import { InputNumber } from "./ui/InputNumber.tsx"; // Upewnij się, że ścieżka jest poprawna
import {
  Excel,
  type ExcelNestedN,
  type ExcelResults,
  type ExcelSetsGet,
  type ExcelSetsSet,
  initRangeFirstStepLast,
  //initRangeFirstStepSize,
} from "./logic/calculateExcel.ts";
import * as MathF from "./logic/mathFunc.ts";
import { PlotExcel } from "./ui/PlotExcel.tsx";

//const resultM = signal<ExcelResults>(new Map<string, ExcelNestedN>());

export function App() {
  const from = useSignal(1);
  const to = useSignal(10);
  const resultM = useSignal<ExcelResults>(new Map<string, ExcelNestedN>());

  const calculate = () => {
    // Upewnij się, że wartości są liczbami przed pętlą
    if (isNaN(Number(from.value)) || isNaN(Number(to.value))) {
      console.error("Wartości 'from' lub 'to' nie są liczbami.");
      resultM.value = new Map<string, ExcelNestedN>();
      return;
    }

    const mathEnter: ExcelSetsSet[] = [
      {
        var: "i",
        val: initRangeFirstStepLast(Number(from.value), 1, Number(to.value)),
      },
    ];
    const mathCalcs: ExcelSetsGet[] = [
      {
        var: "h",
        val: (currentM) => {
          const iArray = currentM.get("i");
          MathF.testSomNotOfValsArray("i", iArray, "isNotValNaturalPos");
          // iArray - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',iArray,"isNotValNaturalPos");!
          return iArray.map((val_i, _index) =>
            MathF.floorLog2(val_i as number)
          );
        },
      },
      {
        var: "hA",
        val: (currentM) => {
          const hArray = currentM.get("h");
          MathF.testSomNotOfValsArray(
            "h",
            hArray,
            "isNotValNaturalPosWithZero",
          );
          // hArray - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',hArray,"isNotValNaturalPosWithZero");!

          return hArray.map((val_h, _index) => MathF.pow2(val_h as number));
        },
      },
      {
        var: "hZ",
        val: (currentM) => {
          const hArray = currentM.get("h");
          MathF.testSomNotOfValsArray(
            "h",
            hArray,
            "isNotValNaturalPosWithZero",
          );
          // hArray - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',hArray,"isNotValNaturalPosWithZero");!

          return hArray.map((val_h, _index) =>
            MathF.pow2_lastBeforeNext(val_h as number)
          );
        },
      },
    ];
    resultM.value = Excel(mathEnter, mathCalcs);
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
          style={{
            border: "3px solid #6c757d",
            borderRadius: "8px",
            padding: "20px",
            marginTop: "0",
            marginBottom: "0",
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",
            flexFlow: "row nowrap",
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
        <p>
          <ul>
            <li>h = floor(log₂(i)) ||| dla przedziału [i]</li>
            <li>hA = pow(2,h) ||| dla przedziału [h]</li>
            <li>hZ = pow(2,h+1)-1 ||| dla przedziału [h]</li>
          </ul>
        </p>
      </div>
      {resultM.value.size > 0 && (
        <>
          {
            /*<h3>Tabela standardowa (type="col"):</h3>
          <PlotExcel
            data={resultM.value}
            type="col"
            caption="Wyniki obliczeń"
          />*/
          }
          <br />
          <h3>Rezultat obliczeń:</h3>
          <PlotExcel
            data={resultM.value}
            type="row"
            caption="Wyniki obliczeń (transponowane)"
          />
        </>
      )}
    </main>
  );
}
