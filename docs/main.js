// docs/main.tsx
import { render } from "https://esm.sh/preact@10.26.8";

// docs/app.tsx
import { useSignal } from "https://esm.sh/@preact/signals@2.2.0";

// docs/ui/InputNumber.tsx
import {
  useCallback,
  useEffect,
  useRef
} from "https://esm.sh/preact@10.26.8/hooks";
import { Fragment, jsx, jsxs } from "https://esm.sh/preact@10.26.8/jsx-runtime";
var DefaultDecrementIconSvgContent = /* @__PURE__ */ jsx("rect", { x: "5", y: "11", width: "14", height: "2", rx: "1" });
var DefaultIncrementIconSvgContent = /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("rect", { x: "11", y: "5", width: "2", height: "14", rx: "1" }),
  /* @__PURE__ */ jsx("rect", { x: "5", y: "11", width: "14", height: "2", rx: "1" })
] });
var svgLayoutData = {
  baseViewBoxWidth: 174,
  baseViewBoxHeight: 72,
  buttons: {
    choose: {
      // Zmieniono z 'selecect' na 'choose' dla spójności z Twoim HTML
      name: "btn-choose",
      paths: [
        {
          dataName: "btn-fill",
          d: "M115.75,71.62c-10.03,0-19.93-1.62-28.63-4.67l-.12-.04-.12.04c-8.7,3.06-18.59,4.67-28.63,4.67-13.06,0-25.81-2.75-36.02-7.75l26.96-15.21h75.61l26.96,15.21c-10.2,5-22.96,7.75-36.02,7.75Z",
          defaultFill: "#919191"
        },
        {
          dataName: "btn-border-fill",
          d: "M124.71,49.04l26.25,14.81c-10.04,4.78-22.48,7.4-35.21,7.4-9.99,0-19.84-1.61-28.5-4.65l-.25-.09-.25.09c-8.66,3.04-18.51,4.65-28.5,4.65-12.73,0-25.16-2.62-35.21-7.4l26.25-14.81h75.41M124.9,48.29H49.1l-27.66,15.6c10.03,5.06,22.85,8.11,36.82,8.11,10.46,0,20.27-1.71,28.75-4.69,8.48,2.98,18.29,4.69,28.75,4.69,13.97,0,26.78-3.04,36.82-8.11l-27.66-15.6h0Z",
          defaultFill: "#505050"
          /* Kolor dla obrysu/drugiej warstwy, dostosuj */
        }
      ]
    },
    increment: {
      name: "btn-increment",
      paths: [
        {
          dataName: "btn-fill",
          d: "M127.38,43.51V1.1c26.83,3.37,46.25,18.01,46.25,34.9,0,9.19-5.68,17.91-16.01,24.57l-30.24-17.06Z",
          defaultFill: "#21597f"
        },
        {
          dataName: "btn-border-fill",
          d: "M127.75,1.53c26.42,3.45,45.5,17.86,45.5,34.47,0,9-5.55,17.56-15.65,24.13l-29.85-16.84V1.53M127,.68v43.05l30.63,17.28c10.13-6.48,16.37-15.29,16.37-25.01,0-17.5-20.21-32.08-47-35.32h0Z",
          defaultFill: "#104060"
          /* Ciemniejszy dla obrysu? Dostosuj */
        }
      ],
      iconAnchorX: 150,
      // 150px w prawo (w systemie viewBox 174x72)
      iconAnchorY: 30
      // 30px w dół (w systemie viewBox 174x72)
    },
    decrement: {
      name: "btn-decrement",
      paths: [
        {
          dataName: "btn-fill",
          d: "M16.38,60.57C6.06,53.91.38,45.19.38,36,.38,19.11,19.8,4.47,46.62,1.1v42.41l-30.24,17.06Z",
          defaultFill: "#b21010"
        },
        {
          dataName: "btn-border-fill",
          d: "M46.25,1.53v41.76h0s-29.85,16.84-29.85,16.84C6.3,53.56.75,45,.75,36,.75,19.39,19.83,4.97,46.25,1.53M47,.68C20.21,3.92,0,18.5,0,36c0,9.72,6.24,18.53,16.37,25.01l30.63-17.28V.68h0Z",
          defaultFill: "#800000"
          /* Ciemniejszy dla obrysu? Dostosuj */
        }
      ],
      iconAnchorX: 25,
      // 20px w prawo (w systemie viewBox 174x72)
      iconAnchorY: 30
      // 30px w dół (w systemie viewBox 174x72)
    }
  },
  inputArea: {
    name: "input",
    rect: {
      x: 52.38,
      y: 0.38,
      width: 69.25,
      height: 42.54,
      defaultFill: "#fff"
    },
    borderPath: {
      d: "M121.25.75v41.79H52.75V.75h68.5M122,0H52v43.29h70V0h0Z",
      defaultFill: "#333"
    }
  }
};
var CONTAINER_CLASS_NAME = "inputnumber-container";
var SVG_CLASS_NAME = "inputnumber-svg";
var SVG_BUTTON_CLASS_NAME = "inputnumber-svg-button";
var HTML_INPUT_CLASS_NAME = "inputnumber-html-input";
function InputNumber(props) {
  const {
    value,
    defaultValue,
    def = 1,
    min,
    max,
    step = 1,
    placeholder,
    required,
    disabled = false,
    name,
    id,
    readOnly = false,
    onChange,
    onValueChange,
    ratioSIZE = 1,
    wrapperClassName,
    svgClassName,
    inputClassName,
    style,
    selectButtonStyle,
    incrementButtonStyle,
    decrementButtonStyle,
    inputAreaStyle,
    selectButtonFill,
    incrementButtonFill,
    decrementButtonFill,
    inputAreaRectFill,
    inputAreaBorderFill,
    // iconFill = "white", // Jeśli będziesz renderować osobne ikony +/-
    ...restDivProps
  } = props;
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      if (value !== void 0) {
        inputRef.current.value = String(value);
      } else if (defaultValue !== void 0) {
        inputRef.current.value = String(defaultValue);
      } else {
        inputRef.current.value = "";
      }
    }
  }, [value, defaultValue]);
  const handleStep = useCallback((direction) => {
    if (inputRef.current && !disabled && !readOnly) {
      if (direction === "up") inputRef.current.stepUp();
      else inputRef.current.stepDown();
      const event = new Event("input", { bubbles: true, cancelable: true });
      inputRef.current.dispatchEvent(event);
    }
  }, [disabled, readOnly]);
  const handleDecrement = useCallback(() => handleStep("down"), [handleStep]);
  const handleIncrement = useCallback(() => handleStep("up"), [handleStep]);
  const handleChooseClick = useCallback(() => {
    if (inputRef.current && !disabled && !readOnly) {
      const newValue = def ?? 1;
      inputRef.current.value = String(newValue);
      if (onValueChange) onValueChange(newValue, name);
      if (onChange) {
        const event = new Event("change", {
          bubbles: true
        });
        Object.defineProperty(event, "target", {
          writable: false,
          value: inputRef.current
        });
        Object.defineProperty(event, "currentTarget", {
          writable: false,
          value: inputRef.current
        });
        onChange(event);
      }
      console.log("Choose button clicked, value set to 1");
    }
  }, [disabled, readOnly, name, onValueChange, onChange]);
  const handleInputChange = (e) => {
    const target = e.currentTarget;
    const rawValue = target.value;
    let numericValue;
    if (rawValue === "") {
      numericValue = void 0;
    } else {
      const parsed = parseFloat(rawValue);
      numericValue = isNaN(parsed) ? void 0 : parsed;
    }
    if (onValueChange) {
      onValueChange(numericValue, name);
    }
    if (onChange) {
      onChange(e);
    }
  };
  const containerWidth = svgLayoutData.baseViewBoxWidth * ratioSIZE;
  const containerHeight = svgLayoutData.baseViewBoxHeight * ratioSIZE;
  const htmlInputStyle = {
    position: "absolute",
    left: `${svgLayoutData.inputArea.rect.x * ratioSIZE}px`,
    top: `${svgLayoutData.inputArea.rect.y * ratioSIZE}px`,
    width: `${svgLayoutData.inputArea.rect.width * ratioSIZE}px`,
    height: `${svgLayoutData.inputArea.rect.height * ratioSIZE}px`,
    border: "none",
    backgroundColor: "transparent",
    color: "#333",
    textAlign: "center",
    fontSize: `${Math.max(8, 18 * ratioSIZE)}px`,
    // Dostosuj czcionkę
    outline: "none",
    padding: `0 ${Math.max(1, 2 * ratioSIZE)}px`,
    margin: 0,
    boxSizing: "border-box",
    MozAppearance: "textfield",
    WebkitAppearance: "none",
    appearance: "none",
    zIndex: 2
  };
  const iconViewBoxSize = 24;
  const targetIconHeightInSvgUnits = svgLayoutData.baseViewBoxHeight * 0.25 * (ratioSIZE > 0.5 ? 1 : ratioSIZE * 2);
  const iconActualScale = 1.5 * (targetIconHeightInSvgUnits / iconViewBoxSize);
  let displayValue = "";
  if (value !== void 0) {
    displayValue = String(value);
  } else if (defaultValue !== void 0) {
    displayValue = String(defaultValue);
  }
  const commonSvgButtonStyle = {
    cursor: disabled || readOnly ? "default" : "pointer"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `${CONTAINER_CLASS_NAME} ${wrapperClassName || ""}`,
      style: {
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        position: "relative",
        overflow: "hidden",
        ...style
      },
      ...restDivProps,
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            className: `${SVG_CLASS_NAME} ${svgClassName || ""}`,
            "data-name": "input-number",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: `0 0 ${svgLayoutData.baseViewBoxWidth} ${svgLayoutData.baseViewBoxHeight}`,
            style: {
              display: "block",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx(
                "g",
                {
                  className: SVG_BUTTON_CLASS_NAME,
                  "data-name": svgLayoutData.buttons.choose.name,
                  onClick: !disabled ? handleChooseClick : void 0,
                  style: { ...commonSvgButtonStyle, ...selectButtonStyle || {} },
                  pointerEvents: disabled ? "none" : "auto",
                  children: svgLayoutData.buttons.choose.paths.map((p, i) => /* @__PURE__ */ jsx(
                    "path",
                    {
                      "data-name": p.dataName,
                      d: p.d,
                      fill: selectButtonFill || p.defaultFill
                    },
                    `choose-path-${i}`
                  ))
                }
              ),
              /* @__PURE__ */ jsxs(
                "g",
                {
                  "data-name": svgLayoutData.inputArea.name,
                  style: inputAreaStyle || {},
                  children: [
                    /* @__PURE__ */ jsx(
                      "rect",
                      {
                        x: svgLayoutData.inputArea.rect.x,
                        y: svgLayoutData.inputArea.rect.y,
                        width: svgLayoutData.inputArea.rect.width,
                        height: svgLayoutData.inputArea.rect.height,
                        fill: inputAreaRectFill || svgLayoutData.inputArea.rect.defaultFill
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: svgLayoutData.inputArea.borderPath.d,
                        fill: inputAreaBorderFill || svgLayoutData.inputArea.borderPath.defaultFill
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "g",
                {
                  className: SVG_BUTTON_CLASS_NAME,
                  "data-name": svgLayoutData.buttons.decrement.name,
                  onClick: !disabled && !readOnly ? handleDecrement : void 0,
                  style: { ...commonSvgButtonStyle, ...decrementButtonStyle || {} },
                  pointerEvents: disabled || readOnly ? "none" : "auto",
                  children: [
                    svgLayoutData.buttons.decrement.paths.map((p, i) => /* @__PURE__ */ jsx(
                      "path",
                      {
                        "data-name": p.dataName,
                        d: p.d,
                        fill: decrementButtonFill || p.defaultFill
                      },
                      `dec-path-${i}`
                    )),
                    /* @__PURE__ */ jsx(
                      "g",
                      {
                        transform: `translate(${svgLayoutData.buttons.decrement.iconAnchorX}, ${svgLayoutData.buttons.decrement.iconAnchorY}) scale(${iconActualScale}) translate(-${iconViewBoxSize / 2}, -${iconViewBoxSize / 2})`,
                        style: { pointerEvents: "none" },
                        children: /* @__PURE__ */ jsx(
                          "svg",
                          {
                            viewBox: `0 0 ${iconViewBoxSize} ${iconViewBoxSize}`,
                            width: iconViewBoxSize,
                            height: iconViewBoxSize,
                            fill: "white",
                            overflow: "visible",
                            children: DefaultDecrementIconSvgContent
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "g",
                {
                  className: SVG_BUTTON_CLASS_NAME,
                  "data-name": svgLayoutData.buttons.increment.name,
                  onClick: !disabled && !readOnly ? handleIncrement : void 0,
                  style: { ...commonSvgButtonStyle, ...incrementButtonStyle || {} },
                  pointerEvents: disabled || readOnly ? "none" : "auto",
                  children: [
                    svgLayoutData.buttons.increment.paths.map((p, i) => /* @__PURE__ */ jsx(
                      "path",
                      {
                        "data-name": p.dataName,
                        d: p.d,
                        fill: incrementButtonFill || p.defaultFill
                      },
                      `inc-path-${i}`
                    )),
                    /* @__PURE__ */ jsx(
                      "g",
                      {
                        transform: `translate(${svgLayoutData.buttons.increment.iconAnchorX}, ${svgLayoutData.buttons.increment.iconAnchorY}) scale(${iconActualScale}) translate(-${iconViewBoxSize / 2}, -${iconViewBoxSize / 2})`,
                        style: { pointerEvents: "none" },
                        children: /* @__PURE__ */ jsx(
                          "svg",
                          {
                            viewBox: `0 0 ${iconViewBoxSize} ${iconViewBoxSize}`,
                            width: iconViewBoxSize,
                            height: iconViewBoxSize,
                            fill: "white",
                            overflow: "visible",
                            children: DefaultIncrementIconSvgContent
                          }
                        )
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            className: `${HTML_INPUT_CLASS_NAME} ${inputClassName || ""}`,
            type: "number",
            name,
            id,
            value: displayValue,
            min,
            max,
            step,
            placeholder,
            required,
            disabled,
            readOnly,
            onInput: handleInputChange,
            style: htmlInputStyle,
            "aria-label": props["aria-label"] || "Warto\u015B\u0107 liczbowa",
            ...restDivProps
          }
        )
      ]
    }
  );
}

// docs/logic/calculateExcel.ts
function Excel(inputValues, calcsValues) {
  const M = /* @__PURE__ */ new Map();
  const resolvedInputValues = !Array.isArray(inputValues) ? [inputValues] : inputValues;
  resolvedInputValues.forEach((item) => {
    M.set(item.var, item.val);
  });
  if (calcsValues) {
    const resolvedCalcsValues = !Array.isArray(calcsValues) ? [calcsValues] : calcsValues;
    resolvedCalcsValues.forEach((calcItem) => {
      try {
        const resultValue = calcItem.val(M);
        M.set(calcItem.var, resultValue);
      } catch (error) {
        console.error(`B\u0142\u0105d podczas obliczania zmiennej "${calcItem.var}":`, error instanceof Error ? error.message : String(error));
        M.set(calcItem.var, void 0);
      }
    });
  }
  return M;
}
function initRangeFirstStepLast(startAt, step, endAt) {
  const result = [];
  if (step === 0) {
    if (startAt === endAt) {
      result.push(startAt);
    }
    return result;
  }
  if (step > 0) {
    if (startAt > endAt) {
      return result;
    }
    for (let currentValue = startAt; currentValue <= endAt; currentValue += step) {
      result.push(currentValue);
    }
  } else {
    if (startAt < endAt) {
      return result;
    }
    for (let currentValue = startAt; currentValue >= endAt; currentValue += step) {
      result.push(currentValue);
    }
  }
  return result;
}

// docs/logic/mathFunc.ts
function floorLog2(x) {
  return Math.floor(Math.log2(x));
}
function pow2Affine(x, a, b, c) {
  return a * 2 ** (x + b) + c;
}
function val2Adic(x) {
  if (x <= 0 || !Number.isInteger(x)) {
    throw new Error("Argument musi by\u0107 dodatni\u0105 liczb\u0105 ca\u0142kowit\u0105.");
  }
  return Math.log2(x & -x);
}
function pow2Affine_val2Adic(x, a, b, c) {
  return a * 2 ** (val2Adic(x) + b) + c;
}
function isNotValNaturalPos(val) {
  return typeof val !== "number" || isNaN(val) || !Number.isInteger(val) || val <= 0;
}
function isNotValNaturalPosWithZero(val) {
  return typeof val !== "number" || isNaN(val) || !Number.isInteger(val) || val < 0;
}
function testSomNotOfValsArray(v, arr, test) {
  if (!Array.isArray(arr)) {
    throw new Error(
      `Zmienne ${v}  musz\u0105 by\u0107 tablicami.`
    );
  }
  switch (test) {
    case "isNotValNaturalPos":
      if (arr.some(isNotValNaturalPos)) {
        throw new Error(
          `Wszystkie elementy w tablicy ${v} musz\u0105 by\u0107 liczbami naturalnymi dodatnimi (wi\u0119kszymi od 0).`
        );
      }
      break;
    case "isNotValNaturalPosWithZero":
      if (arr.some(isNotValNaturalPosWithZero)) {
        throw new Error(
          `Wszystkie elementy w tablicy ${v} musz\u0105 by\u0107 liczbami naturalnymi dodatnimi z zero (wi\u0119kszymi od -1).`
        );
      }
      break;
  }
}

// docs/ui/PlotExcel.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "https://esm.sh/preact@10.26.8/jsx-runtime";
var formatCellValue = (value) => {
  if (value === void 0 || value === null) return "";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return "[B\u0142\u0105d serializacji tablicy]";
    }
  }
  return String(value);
};
function PlotExcel({ data, type, caption, tableClassName, thClassName, tdClassName }) {
  if (!data || data.size === 0) {
    return /* @__PURE__ */ jsx2("p", { children: "Brak danych do wy\u015Bwietlenia." });
  }
  const keys = Array.from(data.keys());
  let maxLength = 0;
  let hasAnyData = false;
  for (const key of keys) {
    const value = data.get(key);
    hasAnyData = true;
    if (Array.isArray(value)) {
      maxLength = Math.max(maxLength, value.length);
    }
  }
  if (hasAnyData && maxLength === 0) {
    maxLength = 1;
  }
  if (maxLength === 0 && keys.length > 0) {
    maxLength = 1;
  }
  if (type === "col") {
    return /* @__PURE__ */ jsxs2("table", { className: tableClassName, children: [
      caption && /* @__PURE__ */ jsx2("caption", { children: caption }),
      /* @__PURE__ */ jsx2("thead", { children: /* @__PURE__ */ jsx2("tr", { children: keys.map((key) => /* @__PURE__ */ jsxs2("th", { className: thClassName, children: [
        "\u3010",
        key,
        "\u3011"
      ] }, key)) }) }),
      /* @__PURE__ */ jsx2("tbody", { children: Array.from({ length: maxLength }).map((_, rowIndex) => /* @__PURE__ */ jsx2("tr", { children: keys.map((key) => {
        const series = data.get(key);
        let cellContent = "";
        if (Array.isArray(series)) {
          cellContent = formatCellValue(series[rowIndex]);
        } else if (rowIndex === 0) {
          cellContent = formatCellValue(series);
        }
        return /* @__PURE__ */ jsx2("td", { className: tdClassName, children: cellContent }, `${key}-row-${rowIndex}`);
      }) }, `row-${rowIndex}`)) })
    ] });
  } else if (type === "row") {
    return /* @__PURE__ */ jsxs2("table", { className: "plot-row-data1 " + tableClassName, children: [
      caption && /* @__PURE__ */ jsx2("caption", { children: caption }),
      /* @__PURE__ */ jsx2("tbody", { children: keys.map((key) => {
        const series = data.get(key);
        return /* @__PURE__ */ jsxs2("tr", { children: [
          /* @__PURE__ */ jsxs2("th", { scope: "row", className: thClassName, children: [
            "\u3010",
            key,
            "\u3011"
          ] }),
          " ",
          Array.from({ length: maxLength }).map((_, colIndex) => {
            let cellContent = "";
            if (Array.isArray(series)) {
              cellContent = formatCellValue(series[colIndex]);
            } else if (colIndex === 0) {
              cellContent = formatCellValue(series);
            }
            return /* @__PURE__ */ jsx2("td", { className: tdClassName, children: cellContent }, `${key}-col-${colIndex}`);
          })
        ] }, `series-row-${key}`);
      }) })
    ] });
  }
  return /* @__PURE__ */ jsxs2("p", { children: [
    "Nieprawid\u0142owy typ tabeli: ",
    type
  ] });
}

// docs/app.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "https://esm.sh/preact@10.26.8/jsx-runtime";
function App() {
  const from = useSignal(1);
  const to = useSignal(10);
  const resultM = useSignal(/* @__PURE__ */ new Map());
  const calculate = () => {
    if (isNaN(Number(from.value)) || isNaN(Number(to.value))) {
      console.error("Warto\u015Bci 'from' lub 'to' nie s\u0105 liczbami.");
      resultM.value = /* @__PURE__ */ new Map();
      return;
    }
    const mathEnter = [
      {
        var: "i",
        val: initRangeFirstStepLast(Number(from.value), 1, Number(to.value))
      }
    ];
    const mathCalcs = [
      {
        var: "h",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, _index) => floorLog2(val_i)
          );
        }
      },
      {
        var: "hA",
        val: (currentM) => {
          const h__Array = currentM.get("h");
          testSomNotOfValsArray(
            "h",
            h__Array,
            "isNotValNaturalPosWithZero"
          );
          return h__Array.map(
            (val_h, _index) => pow2Affine(val_h, 1, 0, 0)
          );
        }
      },
      {
        var: "hZ",
        val: (currentM) => {
          const h__Array = currentM.get("h");
          testSomNotOfValsArray(
            "h",
            h__Array,
            "isNotValNaturalPosWithZero"
          );
          return h__Array.map(
            (val_h, _index) => pow2Affine(val_h, 1, 1, -1)
          );
        }
      },
      {
        var: "hAZ",
        val: (currentM) => {
          const h__Array = currentM.get("h");
          testSomNotOfValsArray(
            "h",
            h__Array,
            "isNotValNaturalPosWithZero"
          );
          return h__Array.map(
            (val_h, _index) => pow2Affine(val_h, 1.5, 1, -1)
          );
        }
      },
      {
        var: "hi",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          const hA__Array = currentM.get("hA");
          testSomNotOfValsArray(
            "hA",
            hA__Array,
            "isNotValNaturalPos"
          );
          return i__Array.map(
            (val_i, index) => val_i - hA__Array[index]
          );
        }
      },
      {
        var: "hj",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          const hZ__Array = currentM.get("hZ");
          testSomNotOfValsArray(
            "hZ",
            hZ__Array,
            "isNotValNaturalPos"
          );
          return i__Array.map(
            (val_i, index) => hZ__Array[index] - val_i
          );
        }
      },
      {
        var: "j",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, index) => pow2Affine(floorLog2(val_i), 1.5, 1, -1) - val_i
          );
        }
      },
      {
        var: "ki",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, _index) => val2Adic(val_i)
          );
        }
      },
      {
        var: "kj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          return j__Array.map(
            (val_j, _index) => val2Adic(val_j)
          );
        }
      },
      {
        var: "kiA",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, _index) => pow2Affine_val2Adic(val_i, 1, 0, 0)
          );
        }
      },
      {
        var: "kjA",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          return j__Array.map(
            (val_j, _index) => pow2Affine_val2Adic(val_j, 1, 0, 0)
          );
        }
      },
      {
        var: "li",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, _index) => val_i / pow2Affine_val2Adic(val_i, 1, 0, 0)
          );
        }
      },
      {
        var: "lj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          return j__Array.map(
            (val_j, _index) => val_j / pow2Affine_val2Adic(val_j, 1, 0, 0)
          );
        }
      },
      {
        var: "mi",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, _index) => val_i / pow2Affine_val2Adic(val_i, 1, 0, 0) + 1
          );
        }
      },
      {
        var: "wj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          return j__Array.map(
            (val_j, _index) => val_j / pow2Affine_val2Adic(val_j, 1, 0, 0) + 2
          );
        }
      }
    ];
    resultM.value = Excel(mathEnter, mathCalcs);
  };
  const handleFromChange = (newValue) => {
    if (newValue !== void 0) {
      from.value = newValue;
    } else {
      from.value = 0;
    }
  };
  const handleToChange = (newValue) => {
    if (newValue !== void 0) {
      to.value = newValue;
    } else {
      to.value = 0;
    }
  };
  return /* @__PURE__ */ jsxs3("main", { children: [
    /* @__PURE__ */ jsx3("h1", { children: "Matematyka w genealogii." }),
    /* @__PURE__ */ jsxs3(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "stretch",
          gap: "40px",
          marginBottom: "20px",
          flexFlow: "row nowrap"
        },
        children: [
          /* @__PURE__ */ jsx3(
            "button",
            {
              onClick: calculate,
              style: { padding: "0.5rem 1rem", fontSize: "1rem" },
              children: "Policz"
            }
          ),
          /* @__PURE__ */ jsxs3(
            "fieldset",
            {
              class: "fieldset-inputs-number",
              style: {
                border: "3px solid #6c757d",
                borderRadius: "8px",
                padding: "20px",
                marginTop: "0",
                marginBottom: "0",
                display: "flex",
                alignItems: "flex-start",
                gap: "40px"
              },
              children: [
                /* @__PURE__ */ jsx3(
                  "legend",
                  {
                    style: {
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "3px 6px"
                    },
                    children: "Choose range of \u3010i\u3011"
                  }
                ),
                /* @__PURE__ */ jsx3(
                  InputNumber,
                  {
                    name: "input1",
                    value: from.value,
                    onValueChange: handleFromChange,
                    def: 1,
                    min: 1,
                    step: 1,
                    placeholder: "Od",
                    "aria-label": "Warto\u015B\u0107 pocz\u0105tkowa przedzia\u0142u"
                  }
                ),
                /* @__PURE__ */ jsx3(
                  InputNumber,
                  {
                    name: "input2",
                    value: to.value,
                    onValueChange: handleToChange,
                    def: 7,
                    min: from.value >= 1 ? from.value : 1,
                    step: 1,
                    placeholder: "Do",
                    "aria-label": "Warto\u015B\u0107 ko\u0144cowa przedzia\u0142u"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsx3("li", { children: "\u3010i\u3011" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010h\u3011 = floor(log\u2082(i)) ||| dla przedzia\u0142u [i]" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010hA\u3011 = 2**h ||| dla przedzia\u0142u [h]" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010hZ\u3011 = 2**(h+1)-1 ||| dla przedzia\u0142u [h]" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010hAZ\u3011 =3*2**h-1 = 1.5*2**(h+1)-1 ||| dla przedzia\u0142u [h]" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010hi\u3011 =\u3010i\u3011 -\u3010hA\u3011" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010hj\u3011 =\u3010hZ\u3011 -\u3010i\u3011" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010j\u3011 =\u3010hAZ\u3011 -\u3010i\u3011" })
          ] }) }),
          /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsxs3("ul", { children: [
            /* @__PURE__ */ jsx3("li", { children: "\u3010ki\u3011 = waluacja dwu-adyczna liczby naturalnej dodatniej [i]" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010kj\u3011 = waluacja dwu-adyczna liczby naturalnej dodatniej [j]" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010kiA\u3011 = 2**\u3010ki\u3011" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010kjA\u3011 = 2**\u3010kj\u3011" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010li\u3011 =\u3010i\u3011/\u3010kiA\u3011" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010lj\u3011 =\u3010j\u3011/\u3010kjA\u3011" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010m\u3011 =\u3010li\u3011+1" }),
            /* @__PURE__ */ jsx3("li", { children: "\u3010w\u3011 =\u3010lj\u3011+2" })
          ] }) })
        ]
      }
    ),
    resultM.value.size > 0 && /* @__PURE__ */ jsxs3(Fragment2, { children: [
      /* @__PURE__ */ jsx3("br", {}),
      /* @__PURE__ */ jsx3("h3", { children: "Rezultat oblicze\u0144:" }),
      /* @__PURE__ */ jsx3(
        PlotExcel,
        {
          tableClassName: "plot-row-data1",
          data: resultM.value,
          type: "row",
          caption: "Wyniki oblicze\u0144."
        }
      )
    ] })
  ] });
}

// docs/main.tsx
import { jsx as jsx4 } from "https://esm.sh/preact@10.26.8/jsx-runtime";
render(/* @__PURE__ */ jsx4(App, {}), document.getElementById("root"));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50c3giLCAiYXBwLnRzeCIsICJ1aS9JbnB1dE51bWJlci50c3giLCAibG9naWMvY2FsY3VsYXRlRXhjZWwudHMiLCAibG9naWMvbWF0aEZ1bmMudHMiLCAidWkvUGxvdEV4Y2VsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOFwiO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwLnRzeFwiO1xuLy9hYVxucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSEpO1xuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXG5pbXBvcnQgeyBzaWduYWwsIHVzZVNpZ25hbCB9IGZyb20gXCJodHRwczovL2VzbS5zaC9AcHJlYWN0L3NpZ25hbHNAMi4yLjBcIjtcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSBcIi4vdWkvSW5wdXROdW1iZXIudHN4XCI7IC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2UgXHUwMTVCY2llXHUwMTdDa2EgamVzdCBwb3ByYXduYVxuaW1wb3J0IHtcbiAgRXhjZWwsXG4gIHR5cGUgRXhjZWxOZXN0ZWROLFxuICB0eXBlIEV4Y2VsUmVzdWx0cyxcbiAgdHlwZSBFeGNlbFNldHNHZXQsXG4gIHR5cGUgRXhjZWxTZXRzU2V0LFxuICBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0LFxuICAvL2luaXRSYW5nZUZpcnN0U3RlcFNpemUsXG59IGZyb20gXCIuL2xvZ2ljL2NhbGN1bGF0ZUV4Y2VsLnRzXCI7XG5pbXBvcnQgKiBhcyBNYXRoRiBmcm9tIFwiLi9sb2dpYy9tYXRoRnVuYy50c1wiO1xuaW1wb3J0IHsgUGxvdEV4Y2VsIH0gZnJvbSBcIi4vdWkvUGxvdEV4Y2VsLnRzeFwiO1xuXG4vL2NvbnN0IHJlc3VsdE0gPSBzaWduYWw8RXhjZWxSZXN1bHRzPihuZXcgTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROPigpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgZnJvbSA9IHVzZVNpZ25hbCgxKTtcbiAgY29uc3QgdG8gPSB1c2VTaWduYWwoMTApO1xuICBjb25zdCByZXN1bHRNID0gdXNlU2lnbmFsPEV4Y2VsUmVzdWx0cz4obmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTj4oKSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlID0gKCkgPT4ge1xuICAgIC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2Ugd2FydG9cdTAxNUJjaSBzXHUwMTA1IGxpY3piYW1pIHByemVkIHBcdTAxMTl0bFx1MDEwNVxuICAgIGlmIChpc05hTihOdW1iZXIoZnJvbS52YWx1ZSkpIHx8IGlzTmFOKE51bWJlcih0by52YWx1ZSkpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiV2FydG9cdTAxNUJjaSAnZnJvbScgbHViICd0bycgbmllIHNcdTAxMDUgbGljemJhbWkuXCIpO1xuICAgICAgcmVzdWx0TS52YWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0aEVudGVyOiBFeGNlbFNldHNTZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImlcIixcbiAgICAgICAgdmFsOiBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0KE51bWJlcihmcm9tLnZhbHVlKSwgMSwgTnVtYmVyKHRvLnZhbHVlKSksXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgbWF0aENhbGNzOiBFeGNlbFNldHNHZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoQVwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaFwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXG4gICAgICAgICAgICBcImhcIixcbiAgICAgICAgICAgIGhfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gaF9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2gnLGhfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik7IVxuXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUodmFsX2ggYXMgbnVtYmVyLCAxLCAwLCAwKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwiaFpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoXCIsXG4gICAgICAgICAgICBoX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBoX19BcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMSwgMSwgLTEpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoQVpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoXCIsXG4gICAgICAgICAgICBoX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBoX19BcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMS41LCAxLCAtMSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhpXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIGNvbnN0IGhBX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhBXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcbiAgICAgICAgICAgIFwiaEFcIixcbiAgICAgICAgICAgIGhBX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAtIGhBX19BcnJheVtpbmRleF1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIGNvbnN0IGhaX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhaXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcbiAgICAgICAgICAgIFwiaFpcIixcbiAgICAgICAgICAgIGhaX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICBoWl9fQXJyYXlbaW5kZXhdIC0gKHZhbF9pIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG5cbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpLCAxLjUsIDEsIC0xKSAtXG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwia2lcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnZhbDJBZGljKHZhbF9pIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImtqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi52YWwyQWRpYyh2YWxfaiBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJraUFcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2kgYXMgbnVtYmVyLCAxLCAwLCAwKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwia2pBXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9qIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImxpXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImxqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2ogYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9qIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcIm1pXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAoKHZhbF9pIGFzIG51bWJlcikgL1xuICAgICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMCkpICsgMVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwid2pcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBqX19BcnJheSA9IGN1cnJlbnRNLmdldChcImpcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwialwiLCBqX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGpfX0FycmF5Lm1hcCgodmFsX2osIF9pbmRleCkgPT5cbiAgICAgICAgICAgICgodmFsX2ogYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2ogYXMgbnVtYmVyLCAxLCAwLCAwKSkgKyAyXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICByZXN1bHRNLnZhbHVlID0gRXhjZWwobWF0aEVudGVyLCBtYXRoQ2FsY3MpO1xuICB9O1xuXG4gIC8vIEhhbmRsZXIgZGxhIG9uVmFsdWVDaGFuZ2UsIGt0XHUwMEYzcnkgb2R6d2llcmNpZWRsYSB6YWNob3dhbmllIGArKGUuY3VycmVudFRhcmdldC52YWx1ZSlgXG4gIC8vIEtpZWR5IGlucHV0IGplc3QgcHVzdHksIGBlLmN1cnJlbnRUYXJnZXQudmFsdWVgIHRvIFwiXCIsIGEgYCtcIlwiYCB0byAwLlxuICAvLyBOYXN6IGBvblZhbHVlQ2hhbmdlYCBwcnpla2F6dWplIGB1bmRlZmluZWRgLCBnZHkgYHZhbHVlQXNOdW1iZXJgIHRvIE5hTiAobnAuIGRsYSBwdXN0ZWdvIGlucHV0dSkuXG4gIGNvbnN0IGhhbmRsZUZyb21DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmcm9tLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20udmFsdWUgPSAwOyAvLyBMdWIgaW5uYSB3YXJ0b1x1MDE1Qlx1MDEwNyBkb215XHUwMTVCbG5hLCBucC4gMSwgamVcdTAxNUJsaSB0byBiYXJkemllaiBzZW5zb3duZVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVUb0NoYW5nZSA9IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRvLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvLnZhbHVlID0gMDsgLy8gTHViIGlubmEgd2FydG9cdTAxNUJcdTAxMDcgZG9teVx1MDE1QmxuYVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluPlxuICAgICAgPGgxPk1hdGVtYXR5a2EgdyBnZW5lYWxvZ2lpLjwvaDE+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgYWxpZ25JdGVtczogXCJzdHJldGNoXCIsXG4gICAgICAgICAgZ2FwOiBcIjQwcHhcIixcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBweFwiLFxuICAgICAgICAgIGZsZXhGbG93OiBcInJvdyBub3dyYXBcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e2NhbGN1bGF0ZX1cbiAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjAuNXJlbSAxcmVtXCIsIGZvbnRTaXplOiBcIjFyZW1cIiB9fVxuICAgICAgICA+XG4gICAgICAgICAgUG9saWN6XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZmllbGRzZXRcbiAgICAgICAgICBjbGFzcz1cImZpZWxkc2V0LWlucHV0cy1udW1iZXJcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBib3JkZXI6IFwiM3B4IHNvbGlkICM2Yzc1N2RcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMjBweFwiLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjBcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIwXCIsXG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiZmxleC1zdGFydFwiLFxuICAgICAgICAgICAgZ2FwOiBcIjQwcHhcIixcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGxlZ2VuZFxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICBwYWRkaW5nOiBcIjNweCA2cHhcIixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2hvb3NlIHJhbmdlIG9mIFx1MzAxMGlcdTMwMTFcbiAgICAgICAgICA8L2xlZ2VuZD5cblxuICAgICAgICAgIDxJbnB1dE51bWJlclxuICAgICAgICAgICAgbmFtZT1cImlucHV0MVwiXG4gICAgICAgICAgICB2YWx1ZT17ZnJvbS52YWx1ZX1cbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZUZyb21DaGFuZ2V9XG4gICAgICAgICAgICBkZWY9ezF9XG4gICAgICAgICAgICBtaW49ezF9IC8vIGxvZzIgamVzdCB6ZGVmaW5pb3dhbnkgZGxhIGxpY3piID4gMFxuICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT2RcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIldhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBwcnplZHppYVx1MDE0MnVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPElucHV0TnVtYmVyXG4gICAgICAgICAgICBuYW1lPVwiaW5wdXQyXCJcbiAgICAgICAgICAgIHZhbHVlPXt0by52YWx1ZX1cbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVRvQ2hhbmdlfVxuICAgICAgICAgICAgZGVmPXs3fVxuICAgICAgICAgICAgbWluPXtmcm9tLnZhbHVlID49IDEgPyBmcm9tLnZhbHVlIDogMX0gLy8gJ3RvJyBuaWUgcG93aW5ubyBieVx1MDEwNyBtbmllanN6ZSBuaVx1MDE3QyAnZnJvbSdcbiAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRvXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXYXJ0b1x1MDE1Qlx1MDEwNyBrb1x1MDE0NGNvd2EgcHJ6ZWR6aWFcdTAxNDJ1XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8cD5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaFx1MzAxMSA9IGZsb29yKGxvZ1x1MjA4MihpKSkgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2ldPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVx1MzAxMSA9IDIqKmggfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoWlx1MzAxMSA9IDIqKihoKzEpLTEgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVpcdTMwMTEgPTMqMioqaC0xID0gMS41KjIqKihoKzEpLTEgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoaVx1MzAxMSA9XHUzMDEwaVx1MzAxMSAtXHUzMDEwaEFcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGhqXHUzMDExID1cdTMwMTBoWlx1MzAxMSAtXHUzMDEwaVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwalx1MzAxMSA9XHUzMDEwaEFaXHUzMDExIC1cdTMwMTBpXHUzMDExPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgXHUzMDEwa2lcdTMwMTEgPSB3YWx1YWNqYSBkd3UtYWR5Y3puYSBsaWN6YnkgbmF0dXJhbG5laiBkb2RhdG5pZWogW2ldXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICBcdTMwMTBralx1MzAxMSA9IHdhbHVhY2phIGR3dS1hZHljem5hIGxpY3pieSBuYXR1cmFsbmVqIGRvZGF0bmllaiBbal1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwa2lBXHUzMDExID0gMioqXHUzMDEwa2lcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGtqQVx1MzAxMSA9IDIqKlx1MzAxMGtqXHUzMDExPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBsaVx1MzAxMSA9XHUzMDEwaVx1MzAxMS9cdTMwMTBraUFcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGxqXHUzMDExID1cdTMwMTBqXHUzMDExL1x1MzAxMGtqQVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwbVx1MzAxMSA9XHUzMDEwbGlcdTMwMTErMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwd1x1MzAxMSA9XHUzMDEwbGpcdTMwMTErMjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICB7cmVzdWx0TS52YWx1ZS5zaXplID4gMCAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge1xuICAgICAgICAgICAgLyo8aDM+VGFiZWxhIHN0YW5kYXJkb3dhICh0eXBlPVwiY29sXCIpOjwvaDM+XG4gICAgICAgICAgPFBsb3RFeGNlbFxuICAgICAgICAgICAgZGF0YT17cmVzdWx0TS52YWx1ZX1cbiAgICAgICAgICAgIHR5cGU9XCJjb2xcIlxuICAgICAgICAgICAgY2FwdGlvbj1cIld5bmlraSBvYmxpY3plXHUwMTQ0XCJcbiAgICAgICAgICAvPiovXG4gICAgICAgICAgfVxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxoMz5SZXp1bHRhdCBvYmxpY3plXHUwMTQ0OjwvaDM+XG4gICAgICAgICAgPFBsb3RFeGNlbFxuICAgICAgICAgICAgdGFibGVDbGFzc05hbWU9XCJwbG90LXJvdy1kYXRhMVwiXG4gICAgICAgICAgICBkYXRhPXtyZXN1bHRNLnZhbHVlfVxuICAgICAgICAgICAgdHlwZT1cInJvd1wiXG4gICAgICAgICAgICBjYXB0aW9uPVwiV3luaWtpIG9ibGljemVcdTAxNDQuXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC9tYWluPlxuICApO1xufVxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXG5cbmltcG9ydCB7XG4gIHVzZUNhbGxiYWNrLFxuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbn0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44L2hvb2tzXCI7XG5pbXBvcnQgeyBKU1ggfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcblxuLy8gWmF3YXJ0b1x1MDE1Qlx1MDEwNyBTVkcgZGxhIGRvbXlcdTAxNUJsbnljaCBpa29uICsvLSAoamVcdTAxNUJsaSB6ZGVjeWR1amVzeiBzaVx1MDExOSBqZSBuYWtcdTAxNDJhZGFcdTAxMDcpXG4vLyBOYSByYXppZSBuaWUgc1x1MDEwNSBvbmUgYXV0b21hdHljem5pZSByZW5kZXJvd2FuZSB3IHRlaiB3ZXJzamksXG4vLyBwb25pZXdhXHUwMTdDIHpha1x1MDE0MmFkYW0sIFx1MDE3Q2UgVHdcdTAwRjNqIGdcdTAxNDJcdTAwRjN3bnkgU1ZHIGRlZmluaXVqZSB3eWdsXHUwMTA1ZCBwcnp5Y2lza1x1MDBGM3cuXG4vLyBKZVx1MDE1QmxpIGNoY2VzeiBqZSBkb2RhXHUwMTA3LCBtdXNpc3ogcHJ6eXdyXHUwMEYzY2lcdTAxMDcgbG9naWtcdTAxMTkgaWNoIHJlbmRlcm93YW5pYSB6IHRyYW5zZm9ybWFjamFtaS5cbmNvbnN0IERlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudCA9IChcbiAgPHJlY3QgeD1cIjVcIiB5PVwiMTFcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIC8+XG4pO1xuY29uc3QgRGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50ID0gKFxuICA8PlxuICAgIDxyZWN0IHg9XCIxMVwiIHk9XCI1XCIgd2lkdGg9XCIyXCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiAvPlxuICAgIDxyZWN0IHg9XCI1XCIgeT1cIjExXCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiAvPlxuICA8Lz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXROdW1iZXJQcm9wcyB7XG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBkZWZhdWx0VmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGRlZj86IHN0cmluZyB8IG51bWJlcjtcbiAgbWluPzogc3RyaW5nIHwgbnVtYmVyO1xuICBtYXg/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHN0ZXA/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgbmFtZT86IHN0cmluZztcbiAgaWQ/OiBzdHJpbmc7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgb25DaGFuZ2U/OiAoZXZlbnQ6IEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PikgPT4gdm9pZDtcbiAgb25WYWx1ZUNoYW5nZT86IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkLCBuYW1lPzogc3RyaW5nKSA9PiB2b2lkO1xuICByYXRpb1NJWkU/OiBudW1iZXI7XG4gIHdyYXBwZXJDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN2Z0NsYXNzTmFtZT86IHN0cmluZztcbiAgaW5wdXRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIHNlbGVjdEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIGluY3JlbWVudEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIGRlY3JlbWVudEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIGlucHV0QXJlYVN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIHNlbGVjdEJ1dHRvbkZpbGw/OiBzdHJpbmc7XG4gIGluY3JlbWVudEJ1dHRvbkZpbGw/OiBzdHJpbmc7XG4gIGRlY3JlbWVudEJ1dHRvbkZpbGw/OiBzdHJpbmc7XG4gIGlucHV0QXJlYVJlY3RGaWxsPzogc3RyaW5nO1xuICBpbnB1dEFyZWFCb3JkZXJGaWxsPzogc3RyaW5nO1xuICAvLyBpY29uRmlsbD86IHN0cmluZzsgLy8gSmVcdTAxNUJsaSBiXHUwMTE5ZHppZXN6IHVcdTAxN0N5d2FcdTAxNDIgb3NvYm55Y2ggaWtvbiArLy1cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5jb25zdCBzdmdMYXlvdXREYXRhID0ge1xuICBiYXNlVmlld0JveFdpZHRoOiAxNzQsXG4gIGJhc2VWaWV3Qm94SGVpZ2h0OiA3MixcbiAgYnV0dG9uczoge1xuICAgIGNob29zZTogeyAvLyBabWllbmlvbm8geiAnc2VsZWNlY3QnIG5hICdjaG9vc2UnIGRsYSBzcFx1MDBGM2pub1x1MDE1QmNpIHogVHdvaW0gSFRNTFxuICAgICAgbmFtZTogXCJidG4tY2hvb3NlXCIsXG4gICAgICBwYXRoczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xMTUuNzUsNzEuNjJjLTEwLjAzLDAtMTkuOTMtMS42Mi0yOC42My00LjY3bC0uMTItLjA0LS4xMi4wNGMtOC43LDMuMDYtMTguNTksNC42Ny0yOC42Myw0LjY3LTEzLjA2LDAtMjUuODEtMi43NS0zNi4wMi03Ljc1bDI2Ljk2LTE1LjIxaDc1LjYxbDI2Ljk2LDE1LjIxYy0xMC4yLDUtMjIuOTYsNy43NS0zNi4wMiw3Ljc1WlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiM5MTkxOTFcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1ib3JkZXItZmlsbFwiLFxuICAgICAgICAgIGQ6IFwiTTEyNC43MSw0OS4wNGwyNi4yNSwxNC44MWMtMTAuMDQsNC43OC0yMi40OCw3LjQtMzUuMjEsNy40LTkuOTksMC0xOS44NC0xLjYxLTI4LjUtNC42NWwtLjI1LS4wOS0uMjUuMDljLTguNjYsMy4wNC0xOC41MSw0LjY1LTI4LjUsNC42NS0xMi43MywwLTI1LjE2LTIuNjItMzUuMjEtNy40bDI2LjI1LTE0LjgxaDc1LjQxTTEyNC45LDQ4LjI5SDQ5LjFsLTI3LjY2LDE1LjZjMTAuMDMsNS4wNiwyMi44NSw4LjExLDM2LjgyLDguMTEsMTAuNDYsMCwyMC4yNy0xLjcxLDI4Ljc1LTQuNjksOC40OCwyLjk4LDE4LjI5LDQuNjksMjguNzUsNC42OSwxMy45NywwLDI2Ljc4LTMuMDQsMzYuODItOC4xMWwtMjcuNjYtMTUuNmgwWlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOlxuICAgICAgICAgICAgXCIjNTA1MDUwXCIsIC8qIEtvbG9yIGRsYSBvYnJ5c3UvZHJ1Z2llaiB3YXJzdHd5LCBkb3N0b3N1aiAqL1xuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIGluY3JlbWVudDoge1xuICAgICAgbmFtZTogXCJidG4taW5jcmVtZW50XCIsXG4gICAgICBwYXRoczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xMjcuMzgsNDMuNTFWMS4xYzI2LjgzLDMuMzcsNDYuMjUsMTguMDEsNDYuMjUsMzQuOSwwLDkuMTktNS42OCwxNy45MS0xNi4wMSwyNC41N2wtMzAuMjQtMTcuMDZaXCIsXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzIxNTk3ZlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWJvcmRlci1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTI3Ljc1LDEuNTNjMjYuNDIsMy40NSw0NS41LDE3Ljg2LDQ1LjUsMzQuNDcsMCw5LTUuNTUsMTcuNTYtMTUuNjUsMjQuMTNsLTI5Ljg1LTE2Ljg0VjEuNTNNMTI3LC42OHY0My4wNWwzMC42MywxNy4yOGMxMC4xMy02LjQ4LDE2LjM3LTE1LjI5LDE2LjM3LTI1LjAxLDAtMTcuNS0yMC4yMS0zMi4wOC00Ny0zNS4zMmgwWlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiMxMDQwNjBcIiwgLyogQ2llbW5pZWpzenkgZGxhIG9icnlzdT8gRG9zdG9zdWogKi9cbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBpY29uQW5jaG9yWDogMTUwLCAvLyAxNTBweCB3IHByYXdvICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxuICAgICAgaWNvbkFuY2hvclk6IDMwLCAvLyAzMHB4IHcgZFx1MDBGM1x1MDE0MiAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcbiAgICB9LFxuICAgIGRlY3JlbWVudDoge1xuICAgICAgbmFtZTogXCJidG4tZGVjcmVtZW50XCIsXG4gICAgICBwYXRoczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xNi4zOCw2MC41N0M2LjA2LDUzLjkxLjM4LDQ1LjE5LjM4LDM2LC4zOCwxOS4xMSwxOS44LDQuNDcsNDYuNjIsMS4xdjQyLjQxbC0zMC4yNCwxNy4wNlpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjYjIxMDEwXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tYm9yZGVyLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk00Ni4yNSwxLjUzdjQxLjc2aDBzLTI5Ljg1LDE2Ljg0LTI5Ljg1LDE2Ljg0QzYuMyw1My41Ni43NSw0NSwuNzUsMzYsLjc1LDE5LjM5LDE5LjgzLDQuOTcsNDYuMjUsMS41M000NywuNjhDMjAuMjEsMy45MiwwLDE4LjUsMCwzNmMwLDkuNzIsNi4yNCwxOC41MywxNi4zNywyNS4wMWwzMC42My0xNy4yOFYuNjhoMFpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjODAwMDAwXCIsIC8qIENpZW1uaWVqc3p5IGRsYSBvYnJ5c3U/IERvc3Rvc3VqICovXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgaWNvbkFuY2hvclg6IDI1LCAvLyAyMHB4IHcgcHJhd28gKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXG4gICAgICBpY29uQW5jaG9yWTogMzAsIC8vIDMwcHggdyBkXHUwMEYzXHUwMTQyICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxuICAgIH0sXG4gIH0sXG4gIGlucHV0QXJlYToge1xuICAgIG5hbWU6IFwiaW5wdXRcIixcbiAgICByZWN0OiB7XG4gICAgICB4OiA1Mi4zOCxcbiAgICAgIHk6IDAuMzgsXG4gICAgICB3aWR0aDogNjkuMjUsXG4gICAgICBoZWlnaHQ6IDQyLjU0LFxuICAgICAgZGVmYXVsdEZpbGw6IFwiI2ZmZlwiLFxuICAgIH0sXG4gICAgYm9yZGVyUGF0aDoge1xuICAgICAgZDogXCJNMTIxLjI1Ljc1djQxLjc5SDUyLjc1Vi43NWg2OC41TTEyMiwwSDUydjQzLjI5aDcwVjBoMFpcIixcbiAgICAgIGRlZmF1bHRGaWxsOiBcIiMzMzNcIixcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgQ09OVEFJTkVSX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLWNvbnRhaW5lclwiO1xuY29uc3QgU1ZHX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLXN2Z1wiO1xuY29uc3QgU1ZHX0JVVFRPTl9DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1zdmctYnV0dG9uXCI7IC8vIFVcdTAxN0N5d2FuZSB3IFR3b2ltIEhUTUxcbmNvbnN0IEhUTUxfSU5QVVRfQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItaHRtbC1pbnB1dFwiOyAvLyBVXHUwMTdDeXdhbmUgdyBUd29pbSBIVE1MXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dE51bWJlcihwcm9wczogSW5wdXROdW1iZXJQcm9wcyk6IEpTWC5FbGVtZW50IHtcbiAgY29uc3Qge1xuICAgIHZhbHVlLFxuICAgIGRlZmF1bHRWYWx1ZSxcbiAgICBkZWYgPSAxLFxuICAgIG1pbixcbiAgICBtYXgsXG4gICAgc3RlcCA9IDEsXG4gICAgcGxhY2Vob2xkZXIsXG4gICAgcmVxdWlyZWQsXG4gICAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgICBuYW1lLFxuICAgIGlkLFxuICAgIHJlYWRPbmx5ID0gZmFsc2UsXG4gICAgb25DaGFuZ2UsXG4gICAgb25WYWx1ZUNoYW5nZSxcbiAgICByYXRpb1NJWkUgPSAxLFxuICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgc3ZnQ2xhc3NOYW1lLFxuICAgIGlucHV0Q2xhc3NOYW1lLFxuICAgIHN0eWxlLFxuICAgIHNlbGVjdEJ1dHRvblN0eWxlLFxuICAgIGluY3JlbWVudEJ1dHRvblN0eWxlLFxuICAgIGRlY3JlbWVudEJ1dHRvblN0eWxlLFxuICAgIGlucHV0QXJlYVN0eWxlLFxuICAgIHNlbGVjdEJ1dHRvbkZpbGwsXG4gICAgaW5jcmVtZW50QnV0dG9uRmlsbCxcbiAgICBkZWNyZW1lbnRCdXR0b25GaWxsLFxuICAgIGlucHV0QXJlYVJlY3RGaWxsLFxuICAgIGlucHV0QXJlYUJvcmRlckZpbGwsXG4gICAgLy8gaWNvbkZpbGwgPSBcIndoaXRlXCIsIC8vIEplXHUwMTVCbGkgYlx1MDExOWR6aWVzeiByZW5kZXJvd2FcdTAxMDcgb3NvYm5lIGlrb255ICsvLVxuICAgIC4uLnJlc3REaXZQcm9wc1xuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG5cbiAgLy8gSW5pY2phbGl6YWNqYSB3YXJ0b1x1MDE1QmNpIGlucHV0YSBwcnp5IG1vbnRvd2FuaXUgbHViIHptaWFuaWUgZGVmYXVsdFZhbHVlL3ZhbHVlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlucHV0UmVmLmN1cnJlbnQudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gXCJcIjsgLy8gSmF3bmUgdXN0YXdpZW5pZSBuYSBwdXN0eSBzdHJpbmcsIGplXHUwMTVCbGkgYnJhayB3YXJ0b1x1MDE1QmNpXG4gICAgICB9XG4gICAgfVxuICB9LCBbdmFsdWUsIGRlZmF1bHRWYWx1ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVN0ZXAgPSB1c2VDYWxsYmFjaygoZGlyZWN0aW9uOiBcInVwXCIgfCBcImRvd25cIikgPT4ge1xuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50ICYmICFkaXNhYmxlZCAmJiAhcmVhZE9ubHkpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidXBcIikgaW5wdXRSZWYuY3VycmVudC5zdGVwVXAoKTtcbiAgICAgIGVsc2UgaW5wdXRSZWYuY3VycmVudC5zdGVwRG93bigpO1xuXG4gICAgICAvLyBTeW11bGFjamEgemRhcnplbmlhIGlucHV0LCBhYnkgd3l3b1x1MDE0MmFcdTAxMDcgaGFuZGxlSW5wdXRDaGFuZ2VcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KFwiaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xuICAgICAgaW5wdXRSZWYuY3VycmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH0sIFtkaXNhYmxlZCwgcmVhZE9ubHldKTtcblxuICBjb25zdCBoYW5kbGVEZWNyZW1lbnQgPSB1c2VDYWxsYmFjaygoKSA9PiBoYW5kbGVTdGVwKFwiZG93blwiKSwgW2hhbmRsZVN0ZXBdKTtcbiAgY29uc3QgaGFuZGxlSW5jcmVtZW50ID0gdXNlQ2FsbGJhY2soKCkgPT4gaGFuZGxlU3RlcChcInVwXCIpLCBbaGFuZGxlU3RlcF0pO1xuXG4gIGNvbnN0IGhhbmRsZUNob29zZUNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50ICYmICFkaXNhYmxlZCAmJiAhcmVhZE9ubHkpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZGVmID8/IDE7IC8vIEphayB3IFR3b2ltIEpTXG4gICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKG5ld1ZhbHVlKTtcblxuICAgICAgLy8gUlx1MDExOWN6bmUgd3l3b1x1MDE0MmFuaWUgbG9naWtpIHptaWFueSB3YXJ0b1x1MDE1QmNpXG4gICAgICBpZiAob25WYWx1ZUNoYW5nZSkgb25WYWx1ZUNoYW5nZShuZXdWYWx1ZSwgbmFtZSk7XG4gICAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIH0pIGFzIHVua25vd24gYXMgSlNYLlRhcmdldGVkRXZlbnQ8SFRNTElucHV0RWxlbWVudCwgRXZlbnQ+O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgdmFsdWU6IGlucHV0UmVmLmN1cnJlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwiY3VycmVudFRhcmdldFwiLCB7XG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiBpbnB1dFJlZi5jdXJyZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJDaG9vc2UgYnV0dG9uIGNsaWNrZWQsIHZhbHVlIHNldCB0byAxXCIpO1xuICAgIH1cbiAgfSwgW2Rpc2FibGVkLCByZWFkT25seSwgbmFtZSwgb25WYWx1ZUNoYW5nZSwgb25DaGFuZ2VdKTtcblxuICAvLyA9PT0gUE9DWlx1MDEwNFRFSyBERUZJTklDSkkgaGFuZGxlSW5wdXRDaGFuZ2UgPT09XG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGU6IEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PikgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IHJhd1ZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgIGxldCBudW1lcmljVmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChyYXdWYWx1ZSA9PT0gXCJcIikge1xuICAgICAgbnVtZXJpY1ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTcHJcdTAwRjNidWogc3BhcnNvd2FcdTAxMDcgamFrbyBsaWN6Ylx1MDExOTsgcGFyc2VGbG9hdCBqZXN0IGJhcmR6aWVqIGVsYXN0eWN6bnlcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlRmxvYXQocmF3VmFsdWUpO1xuICAgICAgbnVtZXJpY1ZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IHVuZGVmaW5lZCA6IHBhcnNlZDtcbiAgICB9XG5cbiAgICBpZiAob25WYWx1ZUNoYW5nZSkge1xuICAgICAgb25WYWx1ZUNoYW5nZShudW1lcmljVmFsdWUsIG5hbWUpO1xuICAgIH1cbiAgICAvLyBKZVx1MDE1QmxpIHVcdTAxN0N5dGtvd25payBwcnpla2F6YVx1MDE0MiB3XHUwMTQyYXNueSBvbkNoYW5nZSwgdGVcdTAxN0MgZ28gd3l3b1x1MDE0MmFqXG4gICAgLy8gVG8gemRhcnplbmllIFwiaW5wdXRcIiB6IGVsZW1lbnR1IEhUTUxcbiAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKGUpO1xuICAgIH1cbiAgfTtcbiAgLy8gPT09IEtPTklFQyBERUZJTklDSkkgaGFuZGxlSW5wdXRDaGFuZ2UgPT09XG5cbiAgY29uc3QgY29udGFpbmVyV2lkdGggPSBzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94V2lkdGggKiByYXRpb1NJWkU7XG4gIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHN2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hIZWlnaHQgKiByYXRpb1NJWkU7XG5cbiAgLy8gU3R5bGUgZGxhIG5hXHUwMTQyb1x1MDE3Q29uZWdvIGlucHV0dSBIVE1MLCBza2Fsb3dhbmUgcHJ6ZXogcmF0aW9TSVpFXG4gIGNvbnN0IGh0bWxJbnB1dFN0eWxlOiBKU1guQ1NTUHJvcGVydGllcyA9IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueCAqIHJhdGlvU0laRX1weGAsXG4gICAgdG9wOiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LnkgKiByYXRpb1NJWkV9cHhgLFxuICAgIHdpZHRoOiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LndpZHRoICogcmF0aW9TSVpFfXB4YCxcbiAgICBoZWlnaHQ6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QuaGVpZ2h0ICogcmF0aW9TSVpFfXB4YCxcbiAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgIGNvbG9yOiBcIiMzMzNcIixcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXG4gICAgZm9udFNpemU6IGAke01hdGgubWF4KDgsIDE4ICogcmF0aW9TSVpFKX1weGAsIC8vIERvc3Rvc3VqIGN6Y2lvbmtcdTAxMTlcbiAgICBvdXRsaW5lOiBcIm5vbmVcIixcbiAgICBwYWRkaW5nOiBgMCAke01hdGgubWF4KDEsIDIgKiByYXRpb1NJWkUpfXB4YCxcbiAgICBtYXJnaW46IDAsXG4gICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICBNb3pBcHBlYXJhbmNlOiBcInRleHRmaWVsZFwiLFxuICAgIFdlYmtpdEFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgIHpJbmRleDogMixcbiAgfTtcblxuICAvLyBSb3ptaWFyIGlrb24gKy8tLiBaYVx1MDE0Mlx1MDBGM1x1MDE3Q215LCBcdTAxN0NlIG9yeWdpbmFsbmUgaWtvbnkgc1x1MDEwNSAyNHgyNC5cbiAgLy8gQ2hjZW15IGplIHByemVza2Fsb3dhXHUwMTA3LCBhYnkgcGFzb3dhXHUwMTQyeSBkbyBwcnp5Y2lza1x1MDBGM3cuXG4gIC8vIFByenlrXHUwMTQyYWRvd28sIG5pZWNoIHpham11alx1MDEwNSBva29cdTAxNDJvIDUwJSB3eXNva29cdTAxNUJjaSBwcnp5Y2lza3UgKHcgamVkbm9zdGthY2ggdmlld0JveClcbiAgY29uc3QgaWNvblZpZXdCb3hTaXplID0gMjQ7IC8vIE9yeWdpbmFsbnkgcm96bWlhciB2aWV3Qm94IGlrb24gKy8tXG4gIGNvbnN0IHRhcmdldEljb25IZWlnaHRJblN2Z1VuaXRzID0gc3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveEhlaWdodCAqIDAuMjUgKlxuICAgIChyYXRpb1NJWkUgPiAwLjUgPyAxIDogcmF0aW9TSVpFICogMik7IC8vIG5wLiAyNSUgd3lzb2tvXHUwMTVCY2kgY2FcdTAxNDJlZ28ga29tcG9uZW50dVxuICBjb25zdCBpY29uQWN0dWFsU2NhbGUgPSAxLjUgKiAodGFyZ2V0SWNvbkhlaWdodEluU3ZnVW5pdHMgLyBpY29uVmlld0JveFNpemUpO1xuXG4gIGxldCBkaXNwbGF5VmFsdWU6IHN0cmluZyA9IFwiXCI7IC8vIElucHV0IHZhbHVlIHphd3N6ZSBqYWtvIHN0cmluZ1xuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRpc3BsYXlWYWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwbGF5VmFsdWUgPSBTdHJpbmcoZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIGNvbnN0IGNvbW1vblN2Z0J1dHRvblN0eWxlOiBKU1guQ1NTUHJvcGVydGllcyA9IHtcbiAgICBjdXJzb3I6IGRpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJkZWZhdWx0XCIgOiBcInBvaW50ZXJcIixcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YCR7Q09OVEFJTkVSX0NMQVNTX05BTUV9ICR7d3JhcHBlckNsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogYCR7Y29udGFpbmVyV2lkdGh9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke2NvbnRhaW5lckhlaWdodH1weGAsXG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxuICAgICAgICAuLi5zdHlsZSxcbiAgICAgIH19XG4gICAgICB7Li4ucmVzdERpdlByb3BzfVxuICAgID5cbiAgICAgIDxzdmdcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtTVkdfQ0xBU1NfTkFNRX0gJHtzdmdDbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICBkYXRhLW5hbWU9XCJpbnB1dC1udW1iZXJcIiAvLyBaIFR3b2plZ28gSFRNTFxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgdmlld0JveD17YDAgMCAke3N2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hXaWR0aH0gJHtzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94SGVpZ2h0fWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIH19XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICA+XG4gICAgICAgIHsvKiBHcnVwYSBcIkNob29zZS9TZWxlY3RcIiAqL31cbiAgICAgICAgPGdcbiAgICAgICAgICBjbGFzc05hbWU9e1NWR19CVVRUT05fQ0xBU1NfTkFNRX0gLy8gS2xhc2EgeiBUd29qZWdvIEhUTUxcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuYnV0dG9ucy5jaG9vc2UubmFtZX0gLy8gZGF0YS1uYW1lIHogVHdvamVnbyBIVE1MXG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkID8gaGFuZGxlQ2hvb3NlQ2xpY2sgOiB1bmRlZmluZWR9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3ZnQnV0dG9uU3R5bGUsIC4uLihzZWxlY3RCdXR0b25TdHlsZSB8fCB7fSkgfX1cbiAgICAgICAgICBwb2ludGVyRXZlbnRzPXtkaXNhYmxlZCA/IFwibm9uZVwiIDogXCJhdXRvXCJ9XG4gICAgICAgID5cbiAgICAgICAgICB7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmNob29zZS5wYXRocy5tYXAoKHAsIGkpID0+IChcbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGtleT17YGNob29zZS1wYXRoLSR7aX1gfVxuICAgICAgICAgICAgICBkYXRhLW5hbWU9e3AuZGF0YU5hbWV9XG4gICAgICAgICAgICAgIGQ9e3AuZH1cbiAgICAgICAgICAgICAgZmlsbD17c2VsZWN0QnV0dG9uRmlsbCB8fCBwLmRlZmF1bHRGaWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9nPlxuXG4gICAgICAgIHsvKiBHcnVwYSBcIklucHV0IEFyZWFcIiAqL31cbiAgICAgICAgPGdcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLm5hbWV9XG4gICAgICAgICAgc3R5bGU9e2lucHV0QXJlYVN0eWxlIHx8IHt9fVxuICAgICAgICA+XG4gICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgIHg9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueH1cbiAgICAgICAgICAgIHk9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueX1cbiAgICAgICAgICAgIHdpZHRoPXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LndpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmhlaWdodH1cbiAgICAgICAgICAgIGZpbGw9e2lucHV0QXJlYVJlY3RGaWxsIHx8IHN2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QuZGVmYXVsdEZpbGx9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEuYm9yZGVyUGF0aC5kfVxuICAgICAgICAgICAgZmlsbD17aW5wdXRBcmVhQm9yZGVyRmlsbCB8fFxuICAgICAgICAgICAgICBzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5ib3JkZXJQYXRoLmRlZmF1bHRGaWxsfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cblxuICAgICAgICB7LyogR3J1cGEgXCJEZWNyZW1lbnRcIiAqL31cbiAgICAgICAgPGdcbiAgICAgICAgICBjbGFzc05hbWU9e1NWR19CVVRUT05fQ0xBU1NfTkFNRX1cbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQubmFtZX1cbiAgICAgICAgICBvbkNsaWNrPXshZGlzYWJsZWQgJiYgIXJlYWRPbmx5ID8gaGFuZGxlRGVjcmVtZW50IDogdW5kZWZpbmVkfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN2Z0J1dHRvblN0eWxlLCAuLi4oZGVjcmVtZW50QnV0dG9uU3R5bGUgfHwge30pIH19XG4gICAgICAgICAgcG9pbnRlckV2ZW50cz17ZGlzYWJsZWQgfHwgcmVhZE9ubHkgPyBcIm5vbmVcIiA6IFwiYXV0b1wifVxuICAgICAgICA+XG4gICAgICAgICAge3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQucGF0aHMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBrZXk9e2BkZWMtcGF0aC0ke2l9YH1cbiAgICAgICAgICAgICAgZGF0YS1uYW1lPXtwLmRhdGFOYW1lfVxuICAgICAgICAgICAgICBkPXtwLmR9XG4gICAgICAgICAgICAgIGZpbGw9e2RlY3JlbWVudEJ1dHRvbkZpbGwgfHwgcC5kZWZhdWx0RmlsbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgey8qIEplXHUwMTVCbGkgY2hjZXN6IGRvZGFcdTAxMDcgaWtvblx1MDExOSBTVkcgXCItXCIgbmEgdHltIGtzenRhXHUwMTQyY2llLCB6clx1MDBGM2IgdG8gdHV0YWosIG5wLjogKi99XG4gICAgICAgICAge1xuICAgICAgICAgICAgLyo8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoWCBZKSBzY2FsZShTKVwiPlxuICAgICAgICAgICAge0RlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudH1cbiAgICAgICAgICA8L2c+Ki9cbiAgICAgICAgICB9XG4gICAgICAgICAgey8qIElrb25hIERlY3JlbWVudCAoLSkgKi99XG4gICAgICAgICAgPGdcbiAgICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQuaWNvbkFuY2hvclh9LCAke3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQuaWNvbkFuY2hvcll9KSBzY2FsZSgke2ljb25BY3R1YWxTY2FsZX0pIHRyYW5zbGF0ZSgtJHtcbiAgICAgICAgICAgICAgaWNvblZpZXdCb3hTaXplIC8gMlxuICAgICAgICAgICAgfSwgLSR7aWNvblZpZXdCb3hTaXplIC8gMn0pYH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH19IC8vIElrb255IG5pZSBwb3dpbm55IHByemVjaHd5dHl3YVx1MDEwNyBrbGlrbmlcdTAxMTlcdTAxMDdcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgIHZpZXdCb3g9e2AwIDAgJHtpY29uVmlld0JveFNpemV9ICR7aWNvblZpZXdCb3hTaXplfWB9XG4gICAgICAgICAgICAgIHdpZHRoPXtpY29uVmlld0JveFNpemV9XG4gICAgICAgICAgICAgIGhlaWdodD17aWNvblZpZXdCb3hTaXplfVxuICAgICAgICAgICAgICBmaWxsPVwid2hpdGVcIlxuICAgICAgICAgICAgICBvdmVyZmxvdz1cInZpc2libGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7RGVmYXVsdERlY3JlbWVudEljb25TdmdDb250ZW50fVxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG5cbiAgICAgICAgey8qIEdydXBhIFwiSW5jcmVtZW50XCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9XG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lm5hbWV9XG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkICYmICFyZWFkT25seSA/IGhhbmRsZUluY3JlbWVudCA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdmdCdXR0b25TdHlsZSwgLi4uKGluY3JlbWVudEJ1dHRvblN0eWxlIHx8IHt9KSB9fVxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9e2Rpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcImF1dG9cIn1cbiAgICAgICAgPlxuICAgICAgICAgIHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50LnBhdGhzLm1hcCgocCwgaSkgPT4gKFxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAga2V5PXtgaW5jLXBhdGgtJHtpfWB9XG4gICAgICAgICAgICAgIGRhdGEtbmFtZT17cC5kYXRhTmFtZX1cbiAgICAgICAgICAgICAgZD17cC5kfVxuICAgICAgICAgICAgICBmaWxsPXtpbmNyZW1lbnRCdXR0b25GaWxsIHx8IHAuZGVmYXVsdEZpbGx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHsvKiBKZVx1MDE1QmxpIGNoY2VzeiBkb2RhXHUwMTA3IGlrb25cdTAxMTkgU1ZHIFwiK1wiIG5hIHR5bSBrc3p0YVx1MDE0MmNpZSwgenJcdTAwRjNiIHRvIHR1dGFqLCBucC46ICovfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8qPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKFggWSkgc2NhbGUoUylcIj5cbiAgICAgICAgICAgIHtEZWZhdWx0SW5jcmVtZW50SWNvblN2Z0NvbnRlbnR9XG4gICAgICAgICAgPC9nPiovXG4gICAgICAgICAgfVxuICAgICAgICAgIHsvKiBJa29uYSBJbmNyZW1lbnQgKCspICovfVxuICAgICAgICAgIDxnXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lmljb25BbmNob3JYfSwgJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lmljb25BbmNob3JZfSkgc2NhbGUoJHtpY29uQWN0dWFsU2NhbGV9KSB0cmFuc2xhdGUoLSR7XG4gICAgICAgICAgICAgIGljb25WaWV3Qm94U2l6ZSAvIDJcbiAgICAgICAgICAgIH0sIC0ke2ljb25WaWV3Qm94U2l6ZSAvIDJ9KWB9XG4gICAgICAgICAgICBzdHlsZT17eyBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgdmlld0JveD17YDAgMCAke2ljb25WaWV3Qm94U2l6ZX0gJHtpY29uVmlld0JveFNpemV9YH1cbiAgICAgICAgICAgICAgd2lkdGg9e2ljb25WaWV3Qm94U2l6ZX1cbiAgICAgICAgICAgICAgaGVpZ2h0PXtpY29uVmlld0JveFNpemV9XG4gICAgICAgICAgICAgIGZpbGw9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgIG92ZXJmbG93PVwidmlzaWJsZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtEZWZhdWx0SW5jcmVtZW50SWNvblN2Z0NvbnRlbnR9XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvc3ZnPlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgY2xhc3NOYW1lPXtgJHtIVE1MX0lOUFVUX0NMQVNTX05BTUV9ICR7aW5wdXRDbGFzc05hbWUgfHwgXCJcIn1gfSAvLyBLbGFzYSB6IFR3b2plZ28gSFRNTFxuICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgaWQ9e2lkfVxuICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfSAvLyBkaXNwbGF5VmFsdWUgamVzdCBqdVx1MDE3QyBzdHJpbmdpZW0gbHViIHB1c3R5bSBzdHJpbmdpZW1cbiAgICAgICAgbWluPXttaW59XG4gICAgICAgIG1heD17bWF4fVxuICAgICAgICBzdGVwPXtzdGVwfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgIG9uSW5wdXQ9e2hhbmRsZUlucHV0Q2hhbmdlfSAvLyBQb2RcdTAxNDJcdTAxMDVjem9ueSBwb3ByYXdueSBoYW5kbGVyXG4gICAgICAgIHN0eWxlPXtodG1sSW5wdXRTdHlsZX1cbiAgICAgICAgYXJpYS1sYWJlbD17cHJvcHNbXCJhcmlhLWxhYmVsXCJdIHx8IFwiV2FydG9cdTAxNUJcdTAxMDcgbGljemJvd2FcIn1cbiAgICAgICAgey4uLnJlc3REaXZQcm9wc31cbiAgICAgIC8+XG4gICAgICB7XG4gICAgICAgIC8vIFptaWVuaW9uZSB6IHJlc3RJbnB1dFByb3BzLCBibyB0ZSBzXHUwMTA1IGRsYSBnXHUwMTQyXHUwMEYzd25lZ28gZGl2YVxuICAgICAgICAvLyBKZVx1MDE1QmxpIGNoY2VzeiBwcnpla2F6eXdhXHUwMTA3IGRvZGF0a293ZSBhdHJ5YnV0eSBkbyBpbnB1dGEsXG4gICAgICAgIC8vIG11c2lzeiBqZSBvc29ibm8gb2JzXHUwMTQydVx1MDE3Q3lcdTAxMDcgbHViIG5hendhXHUwMTA3IG5wLiBodG1sSW5wdXRQcm9wc1xuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwgIi8vIERlZmluaWNqZSB0eXBcdTAwRjN3XG50eXBlIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXkgPSBudW1iZXIgfCBFeGNlbE5lc3RlZE51bWJlckFycmF5W107XG5cbmV4cG9ydCB0eXBlIEV4Y2VsTmVzdGVkTiA9IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7XG5leHBvcnQgdHlwZSBFeGNlbFJlc3VsdHMgPSBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE51bWJlckFycmF5PjtcbmV4cG9ydCB0eXBlIEV4Y2VsU2V0c1NldCA9IHtcbiAgdmFyOiBzdHJpbmc7IC8vIE5hendhIHptaWVubmVqIHdlalx1MDE1QmNpb3dlalxuICB2YWw6IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHptaWVubmVqIChsaWN6YmEgbHViIHphZ25pZVx1MDE3Q2RcdTAxN0NvbmEgdGFibGljYSBsaWN6Yilcbn07XG5cbi8vIFR5cCBkbGEgZnVua2NqaSBvYmxpY3plbmlvd2VqOiBwcnp5am11amUgbWFwXHUwMTE5LCB6d3JhY2Egb2JsaWN6b25cdTAxMDUgd2FydG9cdTAxNUJcdTAxMDdcbnR5cGUgQ2FsY3VsYXRpb25GdW5jdGlvbiA9IChjdXJyZW50TWFwOiBFeGNlbFJlc3VsdHMpID0+IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7XG5cbmV4cG9ydCB0eXBlIEV4Y2VsU2V0c0dldCA9IHtcbiAgdmFyOiBzdHJpbmc7IC8vIE5hendhIG5vd2VqLCBvYmxpY3pvbmVqIHptaWVubmVqXG4gIHZhbDogQ2FsY3VsYXRpb25GdW5jdGlvbjsgLy8gRnVua2NqYSBvYmxpY3phalx1MDEwNWNhIHdhcnRvXHUwMTVCXHUwMTA3IHRlaiB6bWllbm5lalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm1pZW5pb25vIHogYGZ1bmAgbmEgYHZhbGAgemdvZG5pZSB6IFR3b2ltIHByenlrXHUwMTQyYWRlbSB1XHUwMTdDeWNpYVxufTtcblxuLyoqXG4gKiBGdW5rY2phIEV4Y2VsIHByemV0d2FyemEgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93ZSBpIHd5a29udWplIHpkZWZpbmlvd2FuZSBvYmxpY3plbmlhLlxuICogQHBhcmFtIGlucHV0VmFsdWVzIFdhcnRvXHUwMTVCY2kgcG9jelx1MDEwNXRrb3dlIGRvIHVtaWVzemN6ZW5pYSB3IG1hcGllLlxuICogQHBhcmFtIGNhbGNzVmFsdWVzIERlZmluaWNqZSBvYmxpY3plXHUwMTQ0IGRvIHd5a29uYW5pYS5cbiAqIEByZXR1cm5zIE1hcGEgemF3aWVyYWpcdTAxMDVjYSB3c3p5c3RraWUgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93ZSBpIG9ibGljem9uZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEV4Y2VsKFxuICBpbnB1dFZhbHVlczogRXhjZWxTZXRzU2V0IHwgRXhjZWxTZXRzU2V0W10sXG4gIGNhbGNzVmFsdWVzPzogRXhjZWxTZXRzR2V0IHwgRXhjZWxTZXRzR2V0W10gLy8gRHJ1Z2kgYXJndW1lbnQgamVzdCBvcGNqb25hbG55XG4pOiBFeGNlbFJlc3VsdHMgeyAvLyBad3JhY2FteSBtYXBcdTAxMTkgeiBiYXJkemllaiBzemN6ZWdcdTAwRjNcdTAxNDJvd3ltIHR5cGVtXG4gIFxuICAvLyBJbmljamFsaXphY2phIG1hcHkgeiBwb3ByYXdueW1pIHR5cGFtaVxuICBjb25zdCBNOkV4Y2VsUmVzdWx0cyA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE51bWJlckFycmF5PigpO1xuXG4gIC8vIDEuIFByemV0d2FyemFuaWUgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93eWNoIChpbnB1dFZhbHVlcylcbiAgLy8gTm9ybWFsaXphY2phIGlucHV0VmFsdWVzIGRvIHRhYmxpY3ksIGplXHUwMTVCbGkgcHJ6ZWthemFubyBwb2plZHluY3p5IG9iaWVrdFxuICBjb25zdCByZXNvbHZlZElucHV0VmFsdWVzID0gIUFycmF5LmlzQXJyYXkoaW5wdXRWYWx1ZXMpID8gW2lucHV0VmFsdWVzXSA6IGlucHV0VmFsdWVzO1xuICByZXNvbHZlZElucHV0VmFsdWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgTS5zZXQoaXRlbS52YXIsIGl0ZW0udmFsKTtcbiAgfSk7XG5cbiAgLy8gMi4gUHJ6ZXR3YXJ6YW5pZSB3YXJ0b1x1MDE1QmNpIG9ibGljemVuaW93eWNoIChjYWxjc1ZhbHVlcylcbiAgaWYgKGNhbGNzVmFsdWVzKSB7IC8vIFd5a29uYWogdHlsa28sIGplXHUwMTVCbGkgY2FsY3NWYWx1ZXMgem9zdGFcdTAxNDJ5IGRvc3RhcmN6b25lXG4gICAgLy8gTm9ybWFsaXphY2phIGNhbGNzVmFsdWVzIGRvIHRhYmxpY3ksIGplXHUwMTVCbGkgcHJ6ZWthemFubyBwb2plZHluY3p5IG9iaWVrdFxuICAgIGNvbnN0IHJlc29sdmVkQ2FsY3NWYWx1ZXMgPSAhQXJyYXkuaXNBcnJheShjYWxjc1ZhbHVlcykgPyBbY2FsY3NWYWx1ZXNdIDogY2FsY3NWYWx1ZXM7XG4gICAgXG4gICAgcmVzb2x2ZWRDYWxjc1ZhbHVlcy5mb3JFYWNoKGNhbGNJdGVtID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFd5d29cdTAxNDJhbmllIGZ1bmtjamkgb2JsaWN6ZW5pb3dlaiB1XHUwMTdDeXRrb3duaWthLCBwcnpla2F6dWpcdTAxMDVjIGFrdHVhbG5cdTAxMDUgbWFwXHUwMTE5IE1cbiAgICAgICAgY29uc3QgcmVzdWx0VmFsdWUgPSBjYWxjSXRlbS52YWwoTSk7XG4gICAgICAgIC8vIFphcGlzYW5pZSB3eW5pa3Ugb2JsaWN6ZVx1MDE0NCBkbyBtYXB5IE1cbiAgICAgICAgTS5zZXQoY2FsY0l0ZW0udmFyLCByZXN1bHRWYWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBCXHUwMTQyXHUwMTA1ZCBwb2RjemFzIG9ibGljemFuaWEgem1pZW5uZWogXCIke2NhbGNJdGVtLnZhcn1cIjpgLCBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpO1xuICAgICAgICAvLyBNb1x1MDE3Q2VzeiB6ZGVjeWRvd2FcdTAxMDcsIGphayBvYnNcdTAxNDJ1XHUwMTdDeVx1MDEwNyBiXHUwMTQyXHUwMTA1ZDogcG9taW5cdTAxMDVcdTAxMDcsIHphcGlzYVx1MDEwNyBiXHUwMTQyXHUwMTA1ZCwgcHJ6ZXJ3YVx1MDEwNywgaXRwLlxuICAgICAgICAvLyBOYSByYXppZSB6YXBpc3VqZW15IGB1bmRlZmluZWRgLCBhYnkgd3NrYXphXHUwMTA3IHByb2JsZW0uXG4gICAgICAgIE0uc2V0KGNhbGNJdGVtLnZhciwgdW5kZWZpbmVkIGFzIGFueSk7IC8vIFVcdTAxN0N5d2FteSBgYXMgYW55YCBhYnkgcG96d29saVx1MDEwNyBuYSBgdW5kZWZpbmVkYCB3IG1hcGllIHogdHlwZW0gRXhjZWxOZXN0ZWROdW1iZXJBcnJheVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIE07XG59XG5cbi8qKlxuICogR2VuZXJ1amUgdGFibGljXHUwMTE5IGxpY3piIChwcnplZHppYVx1MDE0MikgbyBva3JlXHUwMTVCbG9uZWogbGljemJpZSBlbGVtZW50XHUwMEYzdywga3Jva3UgaSB3YXJ0b1x1MDE1QmNpIHBvY3pcdTAxMDV0a293ZWouXG4gKlxuICogQHBhcmFtIHN0YXJ0QXQgV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHBpZXJ3c3plZ28gZWxlbWVudHUgdyB0YWJsaWN5LlxuICogQHBhcmFtIHN0ZXAgS3JvayAoclx1MDBGM1x1MDE3Q25pY2EpIG1pXHUwMTE5ZHp5IGtvbGVqbnltaSBlbGVtZW50YW1pIHcgdGFibGljeS4gTW9cdTAxN0NlIGJ5XHUwMTA3IGRvZGF0bmksIHVqZW1ueSBsdWIgemVyb3d5LlxuICogQHBhcmFtIGl0ZW1zIExpY3piYSBlbGVtZW50XHUwMEYzdyBkbyB3eWdlbmVyb3dhbmlhIHcgdGFibGljeS5cbiAqIEByZXR1cm5zIFRhYmxpY2EgbGljemIgKG51bWJlcltdKSByZXByZXplbnR1alx1MDEwNWNhIHd5Z2VuZXJvd2FueSBwcnplZHppYVx1MDE0Mi5cbiAqIFp3cmFjYSBwdXN0XHUwMTA1IHRhYmxpY1x1MDExOSwgamVcdTAxNUJsaSBgaXRlbXNgIGplc3QgbW5pZWpzemUgbHViIHJcdTAwRjN3bmUgMC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZUZpcnN0U3RlcFNpemUoc3RhcnRBdDogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGl0ZW1zOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGlmIChpdGVtcyA8PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0OiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zOyBpKyspIHtcbiAgICByZXN1bHQucHVzaChzdGFydEF0ICsgKGkgKiBzdGVwKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZW5lcnVqZSB0YWJsaWNcdTAxMTkgbGljemIgKHByemVkemlhXHUwMTQyKSwgemFjenluYWpcdTAxMDVjIG9kIGBzdGFydEF0YCwgcG9zdFx1MDExOXB1alx1MDEwNWMgbyBgc3RlcGAsXG4gKiBhXHUwMTdDIGRvIG9zaVx1MDEwNWduaVx1MDExOWNpYSAoaSBwb3RlbmNqYWxuaWUgd1x1MDE0Mlx1MDEwNWN6ZW5pYSkgYGVuZEF0YC5cbiAqXG4gKiBAcGFyYW0gc3RhcnRBdCBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgcGllcndzemVnbyBlbGVtZW50dSB3IHRhYmxpY3kuXG4gKiBAcGFyYW0gc3RlcCBLcm9rIChyXHUwMEYzXHUwMTdDbmljYSkgbWlcdTAxMTlkenkga29sZWpueW1pIGVsZW1lbnRhbWkgdyB0YWJsaWN5LiBNb1x1MDE3Q2UgYnlcdTAxMDcgZG9kYXRuaSwgdWplbW55IGx1YiB6ZXJvd3kuXG4gKiBAcGFyYW0gZW5kQXQgV2FydG9cdTAxNUJcdTAxMDcga29cdTAxNDRjb3dhIHByemVkemlhXHUwMTQydS4gRWxlbWVudHkgYlx1MDExOWRcdTAxMDUgZ2VuZXJvd2FuZSB0YWsgZFx1MDE0MnVnbywgamFrXG4gKiBkXHUwMTQydWdvIG1pZXN6Y3pcdTAxMDUgc2lcdTAxMTkgdyBwcnplZHppYWxlIG9rcmVcdTAxNUJsb255bSBwcnpleiBgc3RhcnRBdGAsIGBzdGVwYCBpIGBlbmRBdGAgKHdcdTAxNDJcdTAxMDVjem5pZSkuXG4gKiBAcmV0dXJucyBUYWJsaWNhIGxpY3piIChudW1iZXJbXSkgcmVwcmV6ZW50dWpcdTAxMDVjYSB3eWdlbmVyb3dhbnkgcHJ6ZWR6aWFcdTAxNDIuXG4gKiBad3JhY2EgcHVzdFx1MDEwNSB0YWJsaWNcdTAxMTksIGplXHUwMTVCbGkgbmllIG1vXHUwMTdDbmEgd3lnZW5lcm93YVx1MDEwNyBcdTAxN0NhZG55Y2ggZWxlbWVudFx1MDBGM3dcbiAqIChucC4gc3RhcnRBdCA+IGVuZEF0IHByenkgZG9kYXRuaW0ga3Jva3UsIGx1YiBqZVx1MDE1QmxpIHN0ZXA9MCBhIHN0YXJ0QXQgIT09IGVuZEF0KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZUZpcnN0U3RlcExhc3Qoc3RhcnRBdDogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGVuZEF0OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcblxuICBpZiAoc3RlcCA9PT0gMCkge1xuICAgIC8vIEplXHUwMTVCbGkga3JvayB3eW5vc2kgMCwgcHJ6ZWR6aWFcdTAxNDIgbW9cdTAxN0NlIHphd2llcmFcdTAxMDcgdHlsa28gamVkZW4gZWxlbWVudCxcbiAgICAvLyBqZVx1MDE1QmxpIHN0YXJ0QXQgamVzdCByXHUwMEYzd25lIGVuZEF0LlxuICAgIGlmIChzdGFydEF0ID09PSBlbmRBdCkge1xuICAgICAgcmVzdWx0LnB1c2goc3RhcnRBdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7IC8vIFp3cmFjYSBbc3RhcnRBdF0gbHViIFtdXG4gIH1cblxuICBpZiAoc3RlcCA+IDApIHtcbiAgICAvLyBLcm9rIGRvZGF0bmk6IGlkemllbXkgdyBnXHUwMEYzclx1MDExOVxuICAgIGlmIChzdGFydEF0ID4gZW5kQXQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBqZXN0IGp1XHUwMTdDIHphIHdhcnRvXHUwMTVCY2lcdTAxMDUga29cdTAxNDRjb3dcdTAxMDVcbiAgICB9XG4gICAgZm9yIChsZXQgY3VycmVudFZhbHVlID0gc3RhcnRBdDsgY3VycmVudFZhbHVlIDw9IGVuZEF0OyBjdXJyZW50VmFsdWUgKz0gc3RlcCkge1xuICAgICAgcmVzdWx0LnB1c2goY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7IC8vIHN0ZXAgPCAwXG4gICAgLy8gS3JvayB1amVtbnk6IGlkemllbXkgdyBkXHUwMEYzXHUwMTQyXG4gICAgaWYgKHN0YXJ0QXQgPCBlbmRBdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIGplc3QganVcdTAxN0MgemEgd2FydG9cdTAxNUJjaVx1MDEwNSBrb1x1MDE0NGNvd1x1MDEwNSAodyB6XHUwMTQyXHUwMTA1IHN0cm9uXHUwMTE5KVxuICAgIH1cbiAgICBmb3IgKGxldCBjdXJyZW50VmFsdWUgPSBzdGFydEF0OyBjdXJyZW50VmFsdWUgPj0gZW5kQXQ7IGN1cnJlbnRWYWx1ZSArPSBzdGVwKSB7XG4gICAgICByZXN1bHQucHVzaChjdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEFsdGVybmF0eXduYSwgYmFyZHppZWogendpXHUwMTE5elx1MDE0MmEgaW1wbGVtZW50YWNqYSB1XHUwMTdDeXdhalx1MDEwNWNhIEFycmF5LmZyb20gKGR6aWFcdTAxNDJhIHRhayBzYW1vKTpcbi8qXG5mdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBTaXplQWx0ZXJuYXRpdmUoaXRlbXM6IG51bWJlciwgc3RlcDogbnVtYmVyLCBzdGFydEF0OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGlmIChpdGVtcyA8PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBpdGVtcyB9LCAoXywgaW5kZXgpID0+IHN0YXJ0QXQgKyBpbmRleCAqIHN0ZXApO1xufVxuXG5jb25zb2xlLmxvZyhcIi0tLSBUZXN0IGFsdGVybmF0eXduZWogaW1wbGVtZW50YWNqaSAtLS1cIik7XG5jb25zdCByYW5nZTFfYWx0ID0gaW5pdFJhbmdlRmlyc3RTdGVwU2l6ZUFsdGVybmF0aXZlKDUsIDIsIDEwKTtcbmNvbnNvbGUubG9nKFwiUmFuZ2UgMSBBbHQgKGl0ZW1zOiA1LCBzdGVwOiAyLCBzdGFydEF0OiAxMCk6XCIsIHJhbmdlMV9hbHQpO1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgRXhjZWw7XG5cbi8vIC0tLSBQcnp5a1x1MDE0MmFkIHVcdTAxN0N5Y2lhIC0tLVxuLy8vLyBEZWZpbmljamEgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93eWNoXG4vL2NvbnN0IGlucHV0czogRXhjZWxTZXRzU2V0W10gPSBbXG4vLyAgeyB2YXI6IFwiaVwiLCB2YWw6IFsxLCAyLCAzLCA0LCA1LCA2LCA3XSB9LFxuLy8gIHsgdmFyOiBcImpcIiwgdmFsOiBbMSwgMywgMiwgNywgNiwgNSwgNF0gfVxuLy9dO1xuLy9cbi8vLy8gRGVmaW5pY2phIG9ibGljemVcdTAxNDRcbi8vY29uc3QgY2FsY3VsYXRpb25zOiBFeGNlbFNldHNHZXRbXSA9IFtcbi8vICB7XG4vLyAgICB2YXI6IFwiaWpfc3VtXCIsIC8vIE5vd2Egem1pZW5uYSwga3RcdTAwRjNyYSBiXHUwMTE5ZHppZSBzdW1cdTAxMDUgaVtrXSArIGpba11cbi8vICAgIHZhbDogKGN1cnJlbnRNYXApID0+IHtcbi8vICAgICAgLy8gUG9iaWVyYW15IHRhYmxpY2UgJ2knIG9yYXogJ2onIHogbWFweVxuLy8gICAgICBjb25zdCBpQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImlcIik7XG4vLyAgICAgIGNvbnN0IGpBcnJheSA9IGN1cnJlbnRNYXAuZ2V0KFwialwiKTtcbi8vXG4vLyAgICAgIC8vIFdhXHUwMTdDbmU6IFNwcmF3ZHplbmllIHR5cFx1MDBGM3cgaSBvYnNcdTAxNDJ1Z2EgYlx1MDE0Mlx1MDExOWRcdTAwRjN3IHdld25cdTAxMDV0cnogZnVua2NqaSB1XHUwMTdDeXRrb3duaWthXG4vLyAgICAgIGlmICghQXJyYXkuaXNBcnJheShpQXJyYXkpIHx8ICFBcnJheS5pc0FycmF5KGpBcnJheSkpIHtcbi8vICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJabWllbm5lICdpJyBvcmF6ICdqJyBtdXN6XHUwMTA1IGJ5XHUwMTA3IHRhYmxpY2FtaSBkbGEgdGVqIG9wZXJhY2ppIHN1bW93YW5pYS5cIik7XG4vLyAgICAgIH1cbi8vICAgICAgaWYgKGlBcnJheS5zb21lKGlzTmFOKSB8fCBqQXJyYXkuc29tZShpc05hTikpIHtcbi8vICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY2FjaCAnaScgb3JheiAnaicgbXVzelx1MDEwNSBieVx1MDEwNyBsaWN6YmFtaS5cIik7XG4vLyAgICAgIH1cbi8vICAgICAgaWYgKGlBcnJheS5sZW5ndGggIT09IGpBcnJheS5sZW5ndGgpIHtcbi8vICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUYWJsaWNlICdpJyBvcmF6ICdqJyBtdXN6XHUwMTA1IG1pZVx1MDEwNyB0YWtcdTAxMDUgc2FtXHUwMTA1IGRcdTAxNDJ1Z29cdTAxNUJcdTAxMDcgZG8gc3Vtb3dhbmlhIGVsZW1lbnQgcG8gZWxlbWVuY2llLlwiKTtcbi8vICAgICAgfVxuLy9cbi8vICAgICAgLy8gV3lrb25hbmllIG9wZXJhY2ppIHN1bW93YW5pYSBlbGVtZW50IHBvIGVsZW1lbmNpZVxuLy8gICAgICAvLyBaYWtcdTAxNDJhZGFteSwgXHUwMTdDZSBzXHUwMTA1IHRvIHBcdTAxNDJhc2tpZSB0YWJsaWNlIGxpY3piLCB6Z29kbmllIHogcHJ6eWtcdTAxNDJhZGVtLlxuLy8gICAgICAvLyBEbGEgRXhjZWxOZXN0ZWROdW1iZXJBcnJheSBvcGVyYWNqYSBieVx1MDE0MmFieSBiYXJkemllaiB6XHUwMTQyb1x1MDE3Q29uYSAocmVrdXJlbmN5am5hKS5cbi8vICAgICAgcmV0dXJuIGlBcnJheS5tYXAoKHZhbF9pLCBpbmRleCkgPT4gKHZhbF9pIGFzIG51bWJlcikgKyAoakFycmF5W2luZGV4XSBhcyBudW1iZXIpKTtcbi8vICAgIH1cbi8vICB9LFxuLy8gIHtcbi8vICAgIHZhcjogXCJrXCIsIC8vIFByenlrXHUwMTQyYWQgaW5uZWogem1pZW5uZWosIG5wLiBza2FsYXJcbi8vICAgIHZhbDogKCkgPT4gMTAwIC8vIFByb3N0YSBmdW5rY2phIHp3cmFjYWpcdTAxMDVjYSB3YXJ0b1x1MDE1Qlx1MDEwN1xuLy8gIH0sXG4vLyAge1xuLy8gICAgdmFyOiBcImlfcGx1c19rXCIsIC8vIFByenlrXHUwMTQyYWQgb3BlcmFjamkgdGFibGljYSArIHNrYWxhciAoYnJvYWRjYXN0aW5nKVxuLy8gICAgdmFsOiAoY3VycmVudE1hcCkgPT4ge1xuLy8gICAgICAgIGNvbnN0IGlBcnJheSA9IGN1cnJlbnRNYXAuZ2V0KFwiaVwiKTtcbi8vICAgICAgICBjb25zdCBrVmFsID0gY3VycmVudE1hcC5nZXQoXCJrXCIpO1xuLy9cbi8vICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaUFycmF5KSB8fCB0eXBlb2Yga1ZhbCAhPT0gJ251bWJlcicpIHtcbi8vICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ2knIG11c2kgYnlcdTAxMDcgdGFibGljXHUwMTA1LCBhICdrJyBsaWN6Ylx1MDEwNS5cIik7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIHJldHVybiBpQXJyYXkubWFwKHZhbF9pID0+ICh2YWxfaSBhcyBudW1iZXIpICsgKGtWYWwgYXMgbnVtYmVyKSk7XG4vLyAgICB9XG4vLyAgfVxuLy9dO1xuLy9cbi8vLy8gV3l3b1x1MDE0MmFuaWUgZnVua2NqaSBFeGNlbFxuLy9jb25zdCBBMSA9IEV4Y2VsKGlucHV0cywgY2FsY3VsYXRpb25zKTtcbi8vXG4vLy8vIFd5XHUwMTVCd2lldGxlbmllIHd5bmlrXHUwMEYzd1xuLy9jb25zb2xlLmxvZyhcIkNhXHUwMTQyYSBtYXBhIEExOlwiLCBBMSk7XG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdpJyk6XCIsIEExLmdldChcImlcIikpO1xuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaicpOlwiLCBBMS5nZXQoXCJqXCIpKTtcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2lqX3N1bScpOlwiLCBBMS5nZXQoXCJpal9zdW1cIikpOyAvLyBPY3pla2l3YW5lOiBbMiwgNSwgNSwgMTEsIDExLCAxMSwgMTFdXG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdrJyk6XCIsIEExLmdldChcImtcIikpOyAgICAgICAgIC8vIE9jemVraXdhbmU6IDEwMFxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaV9wbHVzX2snKTpcIiwgQTEuZ2V0KFwiaV9wbHVzX2tcIikpOyAvLyBPY3pla2l3YW5lOiBbMTAxLCAxMDIsIDEwMywgMTA0LCAxMDUsIDEwNiwgMTA3XVxuLy9jb25zb2xlLmxvZyhcIldhcnRvXHUwMTVCXHUwMTA3IGlbM10gKGluZGVrcyAzLCBjenlsaSBjendhcnR5IGVsZW1lbnQpOlwiLCAoQTEuZ2V0KFwiaVwiKSBhcyBudW1iZXJbXSlbM10pOyAvLyBPY3pla2l3YW5lOiA0XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGZsb29yTG9nMih4Om51bWJlcik6bnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5sb2cyKHgpKTtcbn1cblxuLy8gIHRvIGtsYXN5Y3puYSBwb3RcdTAxMTlnYSBkd1x1MDBGM2praS5cbmV4cG9ydCBmdW5jdGlvbiBwb3cyKHg6bnVtYmVyKTpudW1iZXIge1xuICByZXR1cm4gTWF0aC5wb3coMix4KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gcG93MkFmZmluZSh4OiBudW1iZXIsIGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gYSAqIDIgKiogKHggKyBiKSArIGM7XG59XG5cbi8vICB3YWx1YWNqYSBkd3UtYWR5Y3puYSBsaWN6YnkgbmF0dXJhbG5laiBkb2RhdG5pZWogXG4vLyAgY3p5bGkgbmFqd2lcdTAxMTlrc3pcdTAxMDUgcG90XHUwMTE5Z1x1MDExOSBsaWN6YnkgMiwga3RcdTAwRjNyYSBkemllbGkgeFxuLy8gIG1hcGxlIGBrIDo9IHggLT4gaWxvZzIoeCAtIEJpdHNbQW5kXSh4LCB4IC0gMSkpYFxuLy8gIGsoeCk9b3JkXzIoeClcbi8vICBDenlsaTogaWxlIHJhenkgeCBtb1x1MDE3Q25hIHBvZHppZWxpXHUwMTA3IHByemV6IDIsIHphbmltIHByemVzdGFuaWUgYnlcdTAxMDcgY2FcdTAxNDJrb3dpdGUgXG4vLyAgKGx1Yiwgclx1MDBGM3dub3puYWN6bmllLCBwb3p5Y2phIG5ham1cdTAxNDJvZHN6ZWdvIHVzdGF3aW9uZWdvIGJpdHUgdyB4KS5cbmV4cG9ydCBmdW5jdGlvbiB2YWwyQWRpYyh4OiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoeCA8PSAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgbXVzaSBieVx1MDEwNyBkb2RhdG5pXHUwMTA1IGxpY3piXHUwMTA1IGNhXHUwMTQya293aXRcdTAxMDUuXCIpO1xuICB9XG4gIHJldHVybiBNYXRoLmxvZzIoeCAmIC14KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvdzJBZmZpbmVfdmFsMkFkaWMoeDogbnVtYmVyLCBhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIGEgKiAyICoqICh2YWwyQWRpYyh4KSArIGIpICsgYztcbn1cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGZ1bmN0aW9uIGlzTm90VmFsTmF0dXJhbFBvcyh2YWw6dW5rbm93bik6Ym9vbGVhbiB7XG4gIHJldHVybiAodHlwZW9mIHZhbCAhPT0gXCJudW1iZXJcIiB8fCBpc05hTih2YWwpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbCkgfHxcbiAgdmFsIDw9IDApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvKHZhbDp1bmtub3duKTpib29sZWFuIHtcbiAgcmV0dXJuICh0eXBlb2YgdmFsICE9PSBcIm51bWJlclwiIHx8IGlzTmFOKHZhbCkgfHwgIU51bWJlci5pc0ludGVnZXIodmFsKSB8fFxuICB2YWwgPCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RTb21Ob3RPZlZhbHNBcnJheSh2OnN0cmluZywgYXJyOnVua25vd24sIHRlc3Q6XCJpc05vdFZhbE5hdHVyYWxQb3NcInxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOnZvaWQge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBabWllbm5lICR7dn0gIG11c3pcdTAxMDUgYnlcdTAxMDcgdGFibGljYW1pLmAsXG4gICAgKTtcbiAgfVxuICBzd2l0Y2ggKHRlc3QpIHtcbiAgICBjYXNlIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCI6XG4gICAgICBpZiAoYXJyLnNvbWUoaXNOb3RWYWxOYXR1cmFsUG9zKSkge3Rocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgV3N6eXN0a2llIGVsZW1lbnR5IHcgdGFibGljeSAke3Z9IG11c3pcdTAxMDUgYnlcdTAxMDcgbGljemJhbWkgbmF0dXJhbG55bWkgZG9kYXRuaW1pICh3aVx1MDExOWtzenltaSBvZCAwKS5gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCI6XG4gICAgICBpZiAoYXJyLnNvbWUoaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm8pKSB7dGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgV3N6eXN0a2llIGVsZW1lbnR5IHcgdGFibGljeSAke3Z9IG11c3pcdTAxMDUgYnlcdTAxMDcgbGljemJhbWkgbmF0dXJhbG55bWkgZG9kYXRuaW1pIHogemVybyAod2lcdTAxMTlrc3p5bWkgb2QgLTEpLmAsXG4gICAgICApO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbn1cbiIsICIvKiogQGpzeFJ1bnRpbWUgYXV0b21hdGljICovXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xuXG5pbXBvcnQgeyBKU1ggfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcblxuLy8gWmFcdTAxNDJcdTAwRjNcdTAxN0NteSwgXHUwMTdDZSB0ZSB0eXB5IHNcdTAxMDUgemRlZmluaW93YW5lIGdsb2JhbG5pZSBsdWIgaW1wb3J0b3dhbmVcbi8vIEplXHUwMTVCbGkgbmllLCBvZGtvbWVudHVqIGplIGx1YiBwcnplbmllXHUwMTVCIGRvIHdzcFx1MDBGM2xuZWdvIHBsaWt1IHR5cFx1MDBGM3cuXG50eXBlIE5lc3RlZE51bWJlckFycmF5ID0gbnVtYmVyIHwgTmVzdGVkTnVtYmVyQXJyYXlbXTtcbnR5cGUgRXhjZWxSZXN1bHRzID0gTWFwPHN0cmluZywgTmVzdGVkTnVtYmVyQXJyYXk+O1xuXG5pbnRlcmZhY2UgUGxvdEV4Y2VsUHJvcHMge1xuICBkYXRhOiBFeGNlbFJlc3VsdHM7XG4gIHR5cGU6IFwicm93XCIgfCBcImNvbFwiOyAvLyBPcmllbnRhY2phIHRhYmVsaTogXCJyb3dcIiAoZGFuZSB3IHdpZXJzemFjaCksIFwiY29sXCIgKGRhbmUgdyBrb2x1bW5hY2gpXG4gIGNhcHRpb24/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbnkgcG9kcGlzIHRhYmVsaVxuICB0YWJsZUNsYXNzTmFtZT86IHN0cmluZzsgLy8gT3Bjam9uYWxuYSBrbGFzYSBDU1MgZGxhIHRhYmVsaVxuICB0aENsYXNzTmFtZT86IHN0cmluZzsgLy8gT3Bjam9uYWxuYSBrbGFzYSBDU1MgZGxhIGtvbVx1MDBGM3JlayB0aFxuICB0ZENsYXNzTmFtZT86IHN0cmluZzsgLy8gT3Bjam9uYWxuYSBrbGFzYSBDU1MgZGxhIGtvbVx1MDBGM3JlayB0ZFxufVxuXG4vLyBGdW5rY2phIHBvbW9jbmljemEgZG8gZm9ybWF0b3dhbmlhIHdhcnRvXHUwMTVCY2kga29tXHUwMEYzcmtpXG5jb25zdCBmb3JtYXRDZWxsVmFsdWUgPSAodmFsdWU6IE5lc3RlZE51bWJlckFycmF5IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHJldHVybiBcIlwiO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gRGxhIHphZ25pZVx1MDE3Q2RcdTAxN0NvbnljaCB0YWJsaWMsIEpTT04uc3RyaW5naWZ5IG1vXHUwMTdDZSBieVx1MDEwNyBkb2JyeW0gcm96d2lcdTAxMDV6YW5pZW0uXG4gICAgLy8gRGxhIHBcdTAxNDJhc2tpY2ggdGFibGljIGxpY3piLCBtb1x1MDE3Q25hIHVcdTAxN0N5XHUwMTA3IHZhbHVlLmpvaW4oJywgJykuXG4gICAgLy8gVHV0YWogd3liaWVyYW15IEpTT04uc3RyaW5naWZ5IGRsYSBvZ1x1MDBGM2xub1x1MDE1QmNpLlxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBcIltCXHUwMTQyXHUwMTA1ZCBzZXJpYWxpemFjamkgdGFibGljeV1cIjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7IC8vIEZhbGxiYWNrXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gUGxvdEV4Y2VsKFxuICB7IGRhdGEsIHR5cGUsIGNhcHRpb24sIHRhYmxlQ2xhc3NOYW1lLCB0aENsYXNzTmFtZSwgdGRDbGFzc05hbWUgfTpcbiAgICBQbG90RXhjZWxQcm9wcyxcbik6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gIGlmICghZGF0YSB8fCBkYXRhLnNpemUgPT09IDApIHtcbiAgICByZXR1cm4gPHA+QnJhayBkYW55Y2ggZG8gd3lcdTAxNUJ3aWV0bGVuaWEuPC9wPjsgLy8gTHViIG51bGwsIGplXHUwMTVCbGkgbmllIGNoY2VzeiBuaWMgcmVuZGVyb3dhXHUwMTA3XG4gIH1cblxuICBjb25zdCBrZXlzID0gQXJyYXkuZnJvbShkYXRhLmtleXMoKSk7XG5cbiAgLy8gVXN0YWxlbmllIG1ha3N5bWFsbmVqIGRcdTAxNDJ1Z29cdTAxNUJjaSBzZXJpaSBkYW55Y2ggKGRsYSB3eXJcdTAwRjN3bmFuaWEgdGFiZWxpKVxuICBsZXQgbWF4TGVuZ3RoID0gMDtcbiAgbGV0IGhhc0FueURhdGEgPSBmYWxzZTtcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGNvbnN0IHZhbHVlID0gZGF0YS5nZXQoa2V5KTtcbiAgICBoYXNBbnlEYXRhID0gdHJ1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIG1heExlbmd0aCA9IE1hdGgubWF4KG1heExlbmd0aCwgdmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gIH1cbiAgLy8gSmVcdTAxNUJsaSBzXHUwMTA1IGRhbmUsIGFsZSBuaWUgbWEgdGFibGljIChucC4gc2FtZSBza2FsYXJ5KSBsdWIgd3N6eXN0a2llIHRhYmxpY2Ugc1x1MDEwNSBwdXN0ZSxcbiAgLy8gdG8ga2FcdTAxN0NkYSBzZXJpYSBtYSBlZmVrdHl3bmllIFwiZFx1MDE0MnVnb1x1MDE1Qlx1MDEwN1wiIDEuXG4gIGlmIChoYXNBbnlEYXRhICYmIG1heExlbmd0aCA9PT0gMCkge1xuICAgIG1heExlbmd0aCA9IDE7XG4gIH1cbiAgaWYgKG1heExlbmd0aCA9PT0gMCAmJiBrZXlzLmxlbmd0aCA+IDApIHsgLy8gSmVcdTAxNUJsaSBzXHUwMTA1IGtsdWN6ZSwgYWxlIGJyYWsgZGFueWNoIChucC4gbWFwb3dhbmllIG5hIHVuZGVmaW5lZClcbiAgICBtYXhMZW5ndGggPSAxOyAvLyBQb2thXHUwMTdDIHByenluYWptbmllaiBuYWdcdTAxNDJcdTAwRjN3a2lcbiAgfVxuXG4gIGlmICh0eXBlID09PSBcImNvbFwiKSB7XG4gICAgLy8gU3RhbmRhcmRvd2EgdGFiZWxhOiBrbHVjemUgbWFweSBqYWtvIG5hZ1x1MDE0Mlx1MDBGM3draSBrb2x1bW5cbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT17dGFibGVDbGFzc05hbWV9PlxuICAgICAgICB7Y2FwdGlvbiAmJiA8Y2FwdGlvbj57Y2FwdGlvbn08L2NhcHRpb24+fVxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAge2tleXMubWFwKChrZXkpID0+IChcbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17dGhDbGFzc05hbWV9IGtleT17a2V5fT5cdTMwMTB7a2V5fVx1MzAxMTwvdGg+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3RyPlxuICAgICAgICA8L3RoZWFkPlxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IG1heExlbmd0aCB9KS5tYXAoKF8sIHJvd0luZGV4KSA9PiAoXG4gICAgICAgICAgICA8dHIga2V5PXtgcm93LSR7cm93SW5kZXh9YH0+XG4gICAgICAgICAgICAgIHtrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VyaWVzID0gZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQ6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VyaWVzKSkge1xuICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzW3Jvd0luZGV4XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmRleCA9PT0gMCkgeyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBza2FsYXJuYSwgd3lcdTAxNUJ3aWV0bCB0eWxrbyB3IHBpZXJ3c3p5bSB3aWVyc3p1XG4gICAgICAgICAgICAgICAgICBjZWxsQ29udGVudCA9IGZvcm1hdENlbGxWYWx1ZShzZXJpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17dGRDbGFzc05hbWV9IGtleT17YCR7a2V5fS1yb3ctJHtyb3dJbmRleH1gfT5cbiAgICAgICAgICAgICAgICAgICAge2NlbGxDb250ZW50fVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJyb3dcIikge1xuICAgIC8vIFRhYmVsYSB0cmFuc3Bvbm93YW5hOiBrbHVjemUgbWFweSBqYWtvIG5hZ1x1MDE0Mlx1MDBGM3draSB3aWVyc3p5XG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9eydwbG90LXJvdy1kYXRhMSAnKyB0YWJsZUNsYXNzTmFtZX0+XG4gICAgICAgIHtjYXB0aW9uICYmIDxjYXB0aW9uPntjYXB0aW9ufTwvY2FwdGlvbj59XG4gICAgICAgIHsvKiBNb1x1MDE3Q25hIGRvZGFcdTAxMDcgPHRoZWFkPiB6IG5hZ1x1MDE0Mlx1MDBGM3drYW1pIGtvbHVtbiwgamVcdTAxNUJsaSBzXHUwMTA1IHBvdHJ6ZWJuZSwgbnAuIFwiUGFyYW1ldHJcIiwgXCJXYXJ0b1x1MDE1Qlx1MDEwNyAxXCIsIFwiV2FydG9cdTAxNUJcdTAxMDcgMlwiLCAuLi4gKi99XG4gICAgICAgIHsvKiBEbGEgdXByb3N6Y3plbmlhLCBwb21pamFteSA8dGhlYWQ+IHR1dGFqLCBhIHBpZXJ3c3p5IDx0aD4gdyBrYVx1MDE3Q2R5bSB3aWVyc3p1IGR6aWFcdTAxNDJhIGpha28gbmFnXHUwMTQyXHUwMEYzd2VrIHdpZXJzemEgKi99XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7a2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VyaWVzID0gZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e2BzZXJpZXMtcm93LSR7a2V5fWB9PlxuICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cInJvd1wiIGNsYXNzTmFtZT17dGhDbGFzc05hbWV9Plx1MzAxMHtrZXl9XHUzMDExPC90aD57XCIgXCJ9XG4gICAgICAgICAgICAgICAgey8qIE5hZ1x1MDE0Mlx1MDBGM3dlayB3aWVyc3phICovfVxuICAgICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXhMZW5ndGggfSkubWFwKChfLCBjb2xJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGNlbGxDb250ZW50OiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VyaWVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsQ29udGVudCA9IGZvcm1hdENlbGxWYWx1ZShzZXJpZXNbY29sSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sSW5kZXggPT09IDApIHsgLy8gV2FydG9cdTAxNUJcdTAxMDcgc2thbGFybmEsIHd5XHUwMTVCd2lldGwgdHlsa28gdyBwaWVyd3N6ZWoga29sdW1uaWUgZGFueWNoXG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX0ga2V5PXtgJHtrZXl9LWNvbC0ke2NvbEluZGV4fWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtjZWxsQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIDxwPk5pZXByYXdpZFx1MDE0Mm93eSB0eXAgdGFiZWxpOiB7dHlwZX08L3A+OyAvLyBGYWxsYmFja1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsY0FBYzs7O0FDQXZCLFNBQWlCLGlCQUFpQjs7O0FDQ2xDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQVFMLFNBR0EsVUFIQSxLQUdBLFlBSEE7QUFERixJQUFNLGlDQUNKLG9CQUFDLFVBQUssR0FBRSxLQUFJLEdBQUUsTUFBSyxPQUFNLE1BQUssUUFBTyxLQUFJLElBQUcsS0FBSTtBQUVsRCxJQUFNLGlDQUNKLGlDQUNFO0FBQUEsc0JBQUMsVUFBSyxHQUFFLE1BQUssR0FBRSxLQUFJLE9BQU0sS0FBSSxRQUFPLE1BQUssSUFBRyxLQUFJO0FBQUEsRUFDaEQsb0JBQUMsVUFB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QUNOLGFBQVk7QUFBQSxvQkFDWixjQUFXO0FBQUE7QUFBQSxnQkFDYjtBQUFBO0FBQUE7QUFBQSxVQUNGO0FBQUEsVUFDQSxnQkFBQUEsS0FBQyxPQUNDLDBCQUFBQyxNQUFDLFFBQ0M7QUFBQSw0QkFBQUQsS0FBQyxRQUFHLDJCQUFHO0FBQUEsWUFDUCxnQkFBQUEsS0FBQyxRQUFHLDZFQUEyQztBQUFBLFlBQy9DLGdCQUFBQSxLQUFDLFFBQUcsK0RBQWtDO0FBQUEsWUFDdEMsZ0JBQUFBLEtBQUMsUUFBRyxxRUFBd0M7QUFBQSxZQUM1QyxnQkFBQUEsS0FBQyxRQUFHLG9GQUF1RDtBQUFBLFlBQzNELGdCQUFBQSxLQUFDLFFBQUcsMkRBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLDJEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRywyREFBZTtBQUFBLGFBQ3JCLEdBQ0Y7QUFBQSxVQUNBLGdCQUFBQSxLQUFDLE9BQ0MsMEJBQUFDLE1BQUMsUUFDQztBQUFBLDRCQUFBRCxLQUFDLFFBQUcsbUZBRUo7QUFBQSxZQUNBLGdCQUFBQSxLQUFDLFFBQUcsbUZBRUo7QUFBQSxZQUNBLGdCQUFBQSxLQUFDLFFBQUcsaURBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLGlEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRywyREFBZTtBQUFBLFlBQ25CLGdCQUFBQSxLQUFDLFFBQUcsMkRBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLDZDQUFXO0FBQUEsWUFDZixnQkFBQUEsS0FBQyxRQUFHLDZDQUFXO0FBQUEsYUFDakIsR0FDRjtBQUFBO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFDQyxRQUFRLE1BQU0sT0FBTyxLQUNwQixnQkFBQUMsTUFBQUYsV0FBQSxFQVNFO0FBQUEsc0JBQUFDLEtBQUMsUUFBRztBQUFBLE1BQ0osZ0JBQUFBLEtBQUMsUUFBRyxxQ0FBa0I7QUFBQSxNQUN0QixnQkFBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLGdCQUFlO0FBQUEsVUFDZixNQUFNLFFBQVE7QUFBQSxVQUNkLE1BQUs7QUFBQSxVQUNMLFNBQVE7QUFBQTtBQUFBLE1BQ1Y7QUFBQSxPQUNGO0FBQUEsS0FFSjtBQUVKOzs7QURsWE8sZ0JBQUFFLFlBQUE7QUFBUCxPQUFPLGdCQUFBQSxLQUFDLE9BQUksR0FBSSxTQUFTLGVBQWUsTUFBTSxDQUFFOyIsCiAgIm5hbWVzIjogWyJqc3giLCAianN4cyIsICJGcmFnbWVudCIsICJqc3giLCAianN4cyIsICJqc3giXQp9Cg==
