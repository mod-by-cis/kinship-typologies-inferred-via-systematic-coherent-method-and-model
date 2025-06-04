import {
  Excel,
  //type ExcelNestedN,
  type ExcelResults,
  type ExcelSetsGet,
  type ExcelSetsSet,
  //initRangeFirstStepLast,
  //initRangeFirstStepSize,
} from "../logic/calculateExcel.ts";
import * as MathF from "../logic/mathFunc.ts";

export default function generTable1(iData: number[]):ExcelResults {
  const mathEnter: ExcelSetsSet[] = [
    {
      var: "i",
      val: iData,
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
          MathF.pow2Affine(1, 0, 0, val_h as number)
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
          MathF.pow2Affine(1, 1, -1, val_h as number)
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
          MathF.pow2Affine(1.5, 1, -1, val_h as number)
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
          MathF.pow2Affine(1.5, 1, -1, MathF.floorLog2(val_i as number)) -
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
        return i__Array.map((val_i, _index) => MathF.val2Adic(val_i as number));
      },
    },
    {
      var: "kj",
      val: (currentM) => {
        const j__Array = currentM.get("j");
        MathF.testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
        // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
        return j__Array.map((val_j, _index) => MathF.val2Adic(val_j as number));
      },
    },
    {
      var: "kiA",
      val: (currentM) => {
        const i__Array = currentM.get("i");
        MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
        // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
        return i__Array.map((val_i, _index) =>
          MathF.pow2Affine(1, 0, 0, val_i as number, MathF.val2Adic)
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
          MathF.pow2Affine(1, 0, 0, val_j as number, MathF.val2Adic)
        );
      },
    },

    {
      var: "kiZ",
      val: (currentM) => {
        const i__Array = currentM.get("i");
        MathF.testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
        // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
        return i__Array.map((val_i, _index) =>
          MathF.pow2Affine(1, 1, -1, val_i as number, MathF.val2Adic)
        );
      },
    },
    {
      var: "kjZ",
      val: (currentM) => {
        const j__Array = currentM.get("j");
        MathF.testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
        // i__Array - nie ma szans być undefined, bo kontrola jest w MathF.testSomNotOfValsArray('i',i__Array,"isNotValNaturalPos");!
        return j__Array.map((val_j, _index) =>
          MathF.pow2Affine(1, 1, -1, val_j as number, MathF.val2Adic)
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
          MathF.pow2Affine(1, 0, 0, val_i as number, MathF.val2Adic)
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
          MathF.pow2Affine(1, 0, 0, val_j as number, MathF.val2Adic)
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
            MathF.pow2Affine(1, 0, 0, val_i as number, MathF.val2Adic)) + 1
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
            MathF.pow2Affine(1, 0, 0, val_j as number, MathF.val2Adic)) + 2
        );
      },
    },
  ];

  return Excel(mathEnter, mathCalcs);
}
