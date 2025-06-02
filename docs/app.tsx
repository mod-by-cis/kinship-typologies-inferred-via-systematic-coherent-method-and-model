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
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return i__Array.map((val_i, _index) =>
            MathF.floorLog2(val_i as number)
          );
        },
      },
      {
        var: "hA",
        val: (currentM) => {
          const h__Array = currentM.get("h");
          MathF.testSomNotOfValsArray(
            "h",
            h__Array,
            "isNotValNaturalPosWithZero",
          );
          // h__Array - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',h__Array,"isNotValNaturalPosWithZero");!

          return h__Array.map((val_h, _index) =>
            MathF.pow2Affine(val_h as number, 1, 0, 0)
          );
        },
      },
      {
        var: "hZ",
        val: (currentM) => {
          const h__Array = currentM.get("h");
          MathF.testSomNotOfValsArray(
            "h",
            h__Array,
            "isNotValNaturalPosWithZero",
          );
          // h__Array - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',h__Array,"isNotValNaturalPosWithZero");!

          return h__Array.map((val_h, _index) =>
            MathF.pow2Affine(val_h as number, 1, 1, -1)
          );
        },
      },
      {
        var: "hAZ",
        val: (currentM) => {
          const h__Array = currentM.get("h");
          MathF.testSomNotOfValsArray(
            "h",
            h__Array,
            "isNotValNaturalPosWithZero",
          );
          // h__Array - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',h__Array,"isNotValNaturalPosWithZero");!

          return h__Array.map((val_h, _index) =>
            MathF.pow2Affine(val_h as number, 1.5, 1, -1)
          );
        },
      },
      {
        var: "hi",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          const hA__Array = currentM.get("hA");
          MathF.testSomNotOfValsArray(
            "hA",
            hA__Array,
            "isNotValNaturalPos",
          );
          // h__Array - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',h__Array,"isNotValNaturalPosWithZero");!

          return i__Array.map((val_i, index) =>
            (val_i as number) - hA__Array[index]
          );
        },
      },
      {
        var: "hj",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          const hZ__Array = currentM.get("hZ");
          MathF.testSomNotOfValsArray(
            "hZ",
            hZ__Array,
            "isNotValNaturalPos",
          );
          // h__Array - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',h__Array,"isNotValNaturalPosWithZero");!

          return i__Array.map((val_i, index) =>
            hZ__Array[index] - (val_i as number)
          );
        },
      },
      {
        var: "j",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");

          // h__Array - nie ma szans być undefined, MathF.testSomNotOfValsArray('h',h__Array,"isNotValNaturalPosWithZero");!

          return i__Array.map((val_i, index) =>
            MathF.pow2Affine(MathF.floorLog2(val_i as number), 1.5, 1, -1) -
            (val_i as number)
          );
        },
      },
      {
        var: "ki",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return i__Array.map((val_i, _index) =>
            MathF.val2Adic(val_i as number)
          );
        },
      },
      {
        var: "kj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          MathF.testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return j__Array.map((val_j, _index) =>
            MathF.val2Adic(val_j as number)
          );
        },
      },
      {
        var: "kiA",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return i__Array.map((val_i, _index) =>
            MathF.pow2Affine_val2Adic(val_i as number, 1, 0, 0)
          );
        },
      },
      {
        var: "kjA",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          MathF.testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return j__Array.map((val_j, _index) =>
            MathF.pow2Affine_val2Adic(val_j as number, 1, 0, 0)
          );
        },
      },
      {
        var: "li",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return i__Array.map((val_i, _index) =>
            (val_i as number) /
            MathF.pow2Affine_val2Adic(val_i as number, 1, 0, 0)
          );
        },
      },
      {
        var: "lj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          MathF.testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return j__Array.map((val_j, _index) =>
            (val_j as number) /
            MathF.pow2Affine_val2Adic(val_j as number, 1, 0, 0)
          );
        },
      },
      {
        var: "mi",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return i__Array.map((val_i, _index) =>
            ((val_i as number) /
              MathF.pow2Affine_val2Adic(val_i as number, 1, 0, 0)) + 1
          );
        },
      },
      {
        var: "wj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          MathF.testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
          return j__Array.map((val_j, _index) =>
            ((val_j as number) /
              MathF.pow2Affine_val2Adic(val_j as number, 1, 0, 0)) + 2
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
            class="plot-row-data1"
            data={resultM.value}
            type="row"
            caption="Wyniki obliczeń."
          />
        </>
      )}
    </main>
  );
}
