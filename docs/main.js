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
function pow2Affine(a, b, c, x, f) {
  const processedX = f ? f(x) : x;
  return a * 2 ** (processedX + b) + c;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50c3giLCAiYXBwLnRzeCIsICJ1aS9JbnB1dE51bWJlci50c3giLCAibG9naWMvY2FsY3VsYXRlRXhjZWwudHMiLCAibG9naWMvbWF0aEZ1bmMudHMiLCAidWkvUGxvdEV4Y2VsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOFwiO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwLnRzeFwiO1xuLy9hYVxucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSEpO1xuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXG5pbXBvcnQgeyBzaWduYWwsIHVzZVNpZ25hbCB9IGZyb20gXCJodHRwczovL2VzbS5zaC9AcHJlYWN0L3NpZ25hbHNAMi4yLjBcIjtcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSBcIi4vdWkvSW5wdXROdW1iZXIudHN4XCI7IC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2UgXHUwMTVCY2llXHUwMTdDa2EgamVzdCBwb3ByYXduYVxuaW1wb3J0IHtcbiAgRXhjZWwsXG4gIHR5cGUgRXhjZWxOZXN0ZWROLFxuICB0eXBlIEV4Y2VsUmVzdWx0cyxcbiAgdHlwZSBFeGNlbFNldHNHZXQsXG4gIHR5cGUgRXhjZWxTZXRzU2V0LFxuICBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0LFxuICAvL2luaXRSYW5nZUZpcnN0U3RlcFNpemUsXG59IGZyb20gXCIuL2xvZ2ljL2NhbGN1bGF0ZUV4Y2VsLnRzXCI7XG5pbXBvcnQgKiBhcyBNYXRoRiBmcm9tIFwiLi9sb2dpYy9tYXRoRnVuYy50c1wiO1xuaW1wb3J0IHsgUGxvdEV4Y2VsIH0gZnJvbSBcIi4vdWkvUGxvdEV4Y2VsLnRzeFwiO1xuXG4vL2NvbnN0IHJlc3VsdE0gPSBzaWduYWw8RXhjZWxSZXN1bHRzPihuZXcgTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROPigpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgZnJvbSA9IHVzZVNpZ25hbCgxKTtcbiAgY29uc3QgdG8gPSB1c2VTaWduYWwoMTApO1xuICBjb25zdCByZXN1bHRNID0gdXNlU2lnbmFsPEV4Y2VsUmVzdWx0cz4obmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTj4oKSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlID0gKCkgPT4ge1xuICAgIC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2Ugd2FydG9cdTAxNUJjaSBzXHUwMTA1IGxpY3piYW1pIHByemVkIHBcdTAxMTl0bFx1MDEwNVxuICAgIGlmIChpc05hTihOdW1iZXIoZnJvbS52YWx1ZSkpIHx8IGlzTmFOKE51bWJlcih0by52YWx1ZSkpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiV2FydG9cdTAxNUJjaSAnZnJvbScgbHViICd0bycgbmllIHNcdTAxMDUgbGljemJhbWkuXCIpO1xuICAgICAgcmVzdWx0TS52YWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0aEVudGVyOiBFeGNlbFNldHNTZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImlcIixcbiAgICAgICAgdmFsOiBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0KE51bWJlcihmcm9tLnZhbHVlKSwgMSwgTnVtYmVyKHRvLnZhbHVlKSksXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgbWF0aENhbGNzOiBFeGNlbFNldHNHZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoQVwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaFwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXG4gICAgICAgICAgICBcImhcIixcbiAgICAgICAgICAgIGhfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gaF9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2gnLGhfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik7IVxuXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUodmFsX2ggYXMgbnVtYmVyLCAxLCAwLCAwKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwiaFpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoXCIsXG4gICAgICAgICAgICBoX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBoX19BcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMSwgMSwgLTEpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoQVpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoXCIsXG4gICAgICAgICAgICBoX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBoX19BcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMS41LCAxLCAtMSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhpXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIGNvbnN0IGhBX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhBXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcbiAgICAgICAgICAgIFwiaEFcIixcbiAgICAgICAgICAgIGhBX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAtIGhBX19BcnJheVtpbmRleF1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIGNvbnN0IGhaX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhaXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcbiAgICAgICAgICAgIFwiaFpcIixcbiAgICAgICAgICAgIGhaX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICBoWl9fQXJyYXlbaW5kZXhdIC0gKHZhbF9pIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG5cbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpLCAxLjUsIDEsIC0xKSAtXG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwia2lcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnZhbDJBZGljKHZhbF9pIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImtqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi52YWwyQWRpYyh2YWxfaiBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJraUFcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2kgYXMgbnVtYmVyLCAxLCAwLCAwKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwia2pBXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9qIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImxpXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImxqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2ogYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9qIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcIm1pXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAoKHZhbF9pIGFzIG51bWJlcikgL1xuICAgICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMCkpICsgMVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwid2pcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBqX19BcnJheSA9IGN1cnJlbnRNLmdldChcImpcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwialwiLCBqX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGpfX0FycmF5Lm1hcCgodmFsX2osIF9pbmRleCkgPT5cbiAgICAgICAgICAgICgodmFsX2ogYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2ogYXMgbnVtYmVyLCAxLCAwLCAwKSkgKyAyXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICByZXN1bHRNLnZhbHVlID0gRXhjZWwobWF0aEVudGVyLCBtYXRoQ2FsY3MpO1xuICB9O1xuXG4gIC8vIEhhbmRsZXIgZGxhIG9uVmFsdWVDaGFuZ2UsIGt0XHUwMEYzcnkgb2R6d2llcmNpZWRsYSB6YWNob3dhbmllIGArKGUuY3VycmVudFRhcmdldC52YWx1ZSlgXG4gIC8vIEtpZWR5IGlucHV0IGplc3QgcHVzdHksIGBlLmN1cnJlbnRUYXJnZXQudmFsdWVgIHRvIFwiXCIsIGEgYCtcIlwiYCB0byAwLlxuICAvLyBOYXN6IGBvblZhbHVlQ2hhbmdlYCBwcnpla2F6dWplIGB1bmRlZmluZWRgLCBnZHkgYHZhbHVlQXNOdW1iZXJgIHRvIE5hTiAobnAuIGRsYSBwdXN0ZWdvIGlucHV0dSkuXG4gIGNvbnN0IGhhbmRsZUZyb21DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmcm9tLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20udmFsdWUgPSAwOyAvLyBMdWIgaW5uYSB3YXJ0b1x1MDE1Qlx1MDEwNyBkb215XHUwMTVCbG5hLCBucC4gMSwgamVcdTAxNUJsaSB0byBiYXJkemllaiBzZW5zb3duZVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVUb0NoYW5nZSA9IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRvLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvLnZhbHVlID0gMDsgLy8gTHViIGlubmEgd2FydG9cdTAxNUJcdTAxMDcgZG9teVx1MDE1QmxuYVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluPlxuICAgICAgPGgxPk1hdGVtYXR5a2EgdyBnZW5lYWxvZ2lpLjwvaDE+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgYWxpZ25JdGVtczogXCJzdHJldGNoXCIsXG4gICAgICAgICAgZ2FwOiBcIjQwcHhcIixcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBweFwiLFxuICAgICAgICAgIGZsZXhGbG93OiBcInJvdyBub3dyYXBcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e2NhbGN1bGF0ZX1cbiAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjAuNXJlbSAxcmVtXCIsIGZvbnRTaXplOiBcIjFyZW1cIiB9fVxuICAgICAgICA+XG4gICAgICAgICAgUG9saWN6XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZmllbGRzZXRcbiAgICAgICAgICBjbGFzcz1cImZpZWxkc2V0LWlucHV0cy1udW1iZXJcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBib3JkZXI6IFwiM3B4IHNvbGlkICM2Yzc1N2RcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMjBweFwiLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjBcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIwXCIsXG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiZmxleC1zdGFydFwiLFxuICAgICAgICAgICAgZ2FwOiBcIjQwcHhcIixcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGxlZ2VuZFxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICBwYWRkaW5nOiBcIjNweCA2cHhcIixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2hvb3NlIHJhbmdlIG9mIFx1MzAxMGlcdTMwMTFcbiAgICAgICAgICA8L2xlZ2VuZD5cblxuICAgICAgICAgIDxJbnB1dE51bWJlclxuICAgICAgICAgICAgbmFtZT1cImlucHV0MVwiXG4gICAgICAgICAgICB2YWx1ZT17ZnJvbS52YWx1ZX1cbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZUZyb21DaGFuZ2V9XG4gICAgICAgICAgICBkZWY9ezF9XG4gICAgICAgICAgICBtaW49ezF9IC8vIGxvZzIgamVzdCB6ZGVmaW5pb3dhbnkgZGxhIGxpY3piID4gMFxuICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT2RcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIldhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBwcnplZHppYVx1MDE0MnVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPElucHV0TnVtYmVyXG4gICAgICAgICAgICBuYW1lPVwiaW5wdXQyXCJcbiAgICAgICAgICAgIHZhbHVlPXt0by52YWx1ZX1cbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVRvQ2hhbmdlfVxuICAgICAgICAgICAgZGVmPXs3fVxuICAgICAgICAgICAgbWluPXtmcm9tLnZhbHVlID49IDEgPyBmcm9tLnZhbHVlIDogMX0gLy8gJ3RvJyBuaWUgcG93aW5ubyBieVx1MDEwNyBtbmllanN6ZSBuaVx1MDE3QyAnZnJvbSdcbiAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRvXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXYXJ0b1x1MDE1Qlx1MDEwNyBrb1x1MDE0NGNvd2EgcHJ6ZWR6aWFcdTAxNDJ1XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8cD5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaFx1MzAxMSA9IGZsb29yKGxvZ1x1MjA4MihpKSkgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2ldPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVx1MzAxMSA9IDIqKmggfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoWlx1MzAxMSA9IDIqKihoKzEpLTEgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVpcdTMwMTEgPTMqMioqaC0xID0gMS41KjIqKihoKzEpLTEgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoaVx1MzAxMSA9XHUzMDEwaVx1MzAxMSAtXHUzMDEwaEFcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGhqXHUzMDExID1cdTMwMTBoWlx1MzAxMSAtXHUzMDEwaVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwalx1MzAxMSA9XHUzMDEwaEFaXHUzMDExIC1cdTMwMTBpXHUzMDExPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgXHUzMDEwa2lcdTMwMTEgPSB3YWx1YWNqYSBkd3UtYWR5Y3puYSBsaWN6YnkgbmF0dXJhbG5laiBkb2RhdG5pZWogW2ldXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICBcdTMwMTBralx1MzAxMSA9IHdhbHVhY2phIGR3dS1hZHljem5hIGxpY3pieSBuYXR1cmFsbmVqIGRvZGF0bmllaiBbal1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwa2lBXHUzMDExID0gMioqXHUzMDEwa2lcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGtqQVx1MzAxMSA9IDIqKlx1MzAxMGtqXHUzMDExPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBsaVx1MzAxMSA9XHUzMDEwaVx1MzAxMS9cdTMwMTBraUFcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGxqXHUzMDExID1cdTMwMTBqXHUzMDExL1x1MzAxMGtqQVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwbVx1MzAxMSA9XHUzMDEwbGlcdTMwMTErMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwd1x1MzAxMSA9XHUzMDEwbGpcdTMwMTErMjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICB7cmVzdWx0TS52YWx1ZS5zaXplID4gMCAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge1xuICAgICAgICAgICAgLyo8aDM+VGFiZWxhIHN0YW5kYXJkb3dhICh0eXBlPVwiY29sXCIpOjwvaDM+XG4gICAgICAgICAgPFBsb3RFeGNlbFxuICAgICAgICAgICAgZGF0YT17cmVzdWx0TS52YWx1ZX1cbiAgICAgICAgICAgIHR5cGU9XCJjb2xcIlxuICAgICAgICAgICAgY2FwdGlvbj1cIld5bmlraSBvYmxpY3plXHUwMTQ0XCJcbiAgICAgICAgICAvPiovXG4gICAgICAgICAgfVxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxoMz5SZXp1bHRhdCBvYmxpY3plXHUwMTQ0OjwvaDM+XG4gICAgICAgICAgPFBsb3RFeGNlbFxuICAgICAgICAgICAgdGFibGVDbGFzc05hbWU9XCJwbG90LXJvdy1kYXRhMVwiXG4gICAgICAgICAgICBkYXRhPXtyZXN1bHRNLnZhbHVlfVxuICAgICAgICAgICAgdHlwZT1cInJvd1wiXG4gICAgICAgICAgICBjYXB0aW9uPVwiV3luaWtpIG9ibGljemVcdTAxNDQuXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgPC9tYWluPlxuICApO1xufVxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXG5cbmltcG9ydCB7XG4gIHVzZUNhbGxiYWNrLFxuICB1c2VFZmZlY3QsXG4gIHVzZVJlZixcbn0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44L2hvb2tzXCI7XG5pbXBvcnQgeyBKU1ggfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcblxuLy8gWmF3YXJ0b1x1MDE1Qlx1MDEwNyBTVkcgZGxhIGRvbXlcdTAxNUJsbnljaCBpa29uICsvLSAoamVcdTAxNUJsaSB6ZGVjeWR1amVzeiBzaVx1MDExOSBqZSBuYWtcdTAxNDJhZGFcdTAxMDcpXG4vLyBOYSByYXppZSBuaWUgc1x1MDEwNSBvbmUgYXV0b21hdHljem5pZSByZW5kZXJvd2FuZSB3IHRlaiB3ZXJzamksXG4vLyBwb25pZXdhXHUwMTdDIHpha1x1MDE0MmFkYW0sIFx1MDE3Q2UgVHdcdTAwRjNqIGdcdTAxNDJcdTAwRjN3bnkgU1ZHIGRlZmluaXVqZSB3eWdsXHUwMTA1ZCBwcnp5Y2lza1x1MDBGM3cuXG4vLyBKZVx1MDE1QmxpIGNoY2VzeiBqZSBkb2RhXHUwMTA3LCBtdXNpc3ogcHJ6eXdyXHUwMEYzY2lcdTAxMDcgbG9naWtcdTAxMTkgaWNoIHJlbmRlcm93YW5pYSB6IHRyYW5zZm9ybWFjamFtaS5cbmNvbnN0IERlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudCA9IChcbiAgPHJlY3QgeD1cIjVcIiB5PVwiMTFcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIC8+XG4pO1xuY29uc3QgRGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50ID0gKFxuICA8PlxuICAgIDxyZWN0IHg9XCIxMVwiIHk9XCI1XCIgd2lkdGg9XCIyXCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiAvPlxuICAgIDxyZWN0IHg9XCI1XCIgeT1cIjExXCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiAvPlxuICA8Lz5cbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXROdW1iZXJQcm9wcyB7XG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBkZWZhdWx0VmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XG4gIGRlZj86IHN0cmluZyB8IG51bWJlcjtcbiAgbWluPzogc3RyaW5nIHwgbnVtYmVyO1xuICBtYXg/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHN0ZXA/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgbmFtZT86IHN0cmluZztcbiAgaWQ/OiBzdHJpbmc7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgb25DaGFuZ2U/OiAoZXZlbnQ6IEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PikgPT4gdm9pZDtcbiAgb25WYWx1ZUNoYW5nZT86IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkLCBuYW1lPzogc3RyaW5nKSA9PiB2b2lkO1xuICByYXRpb1NJWkU/OiBudW1iZXI7XG4gIHdyYXBwZXJDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN2Z0NsYXNzTmFtZT86IHN0cmluZztcbiAgaW5wdXRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIHNlbGVjdEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIGluY3JlbWVudEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIGRlY3JlbWVudEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIGlucHV0QXJlYVN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XG4gIHNlbGVjdEJ1dHRvbkZpbGw/OiBzdHJpbmc7XG4gIGluY3JlbWVudEJ1dHRvbkZpbGw/OiBzdHJpbmc7XG4gIGRlY3JlbWVudEJ1dHRvbkZpbGw/OiBzdHJpbmc7XG4gIGlucHV0QXJlYVJlY3RGaWxsPzogc3RyaW5nO1xuICBpbnB1dEFyZWFCb3JkZXJGaWxsPzogc3RyaW5nO1xuICAvLyBpY29uRmlsbD86IHN0cmluZzsgLy8gSmVcdTAxNUJsaSBiXHUwMTE5ZHppZXN6IHVcdTAxN0N5d2FcdTAxNDIgb3NvYm55Y2ggaWtvbiArLy1cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5jb25zdCBzdmdMYXlvdXREYXRhID0ge1xuICBiYXNlVmlld0JveFdpZHRoOiAxNzQsXG4gIGJhc2VWaWV3Qm94SGVpZ2h0OiA3MixcbiAgYnV0dG9uczoge1xuICAgIGNob29zZTogeyAvLyBabWllbmlvbm8geiAnc2VsZWNlY3QnIG5hICdjaG9vc2UnIGRsYSBzcFx1MDBGM2pub1x1MDE1QmNpIHogVHdvaW0gSFRNTFxuICAgICAgbmFtZTogXCJidG4tY2hvb3NlXCIsXG4gICAgICBwYXRoczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xMTUuNzUsNzEuNjJjLTEwLjAzLDAtMTkuOTMtMS42Mi0yOC42My00LjY3bC0uMTItLjA0LS4xMi4wNGMtOC43LDMuMDYtMTguNTksNC42Ny0yOC42Myw0LjY3LTEzLjA2LDAtMjUuODEtMi43NS0zNi4wMi03Ljc1bDI2Ljk2LTE1LjIxaDc1LjYxbDI2Ljk2LDE1LjIxYy0xMC4yLDUtMjIuOTYsNy43NS0zNi4wMiw3Ljc1WlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiM5MTkxOTFcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1ib3JkZXItZmlsbFwiLFxuICAgICAgICAgIGQ6IFwiTTEyNC43MSw0OS4wNGwyNi4yNSwxNC44MWMtMTAuMDQsNC43OC0yMi40OCw3LjQtMzUuMjEsNy40LTkuOTksMC0xOS44NC0xLjYxLTI4LjUtNC42NWwtLjI1LS4wOS0uMjUuMDljLTguNjYsMy4wNC0xOC41MSw0LjY1LTI4LjUsNC42NS0xMi43MywwLTI1LjE2LTIuNjItMzUuMjEtNy40bDI2LjI1LTE0LjgxaDc1LjQxTTEyNC45LDQ4LjI5SDQ5LjFsLTI3LjY2LDE1LjZjMTAuMDMsNS4wNiwyMi44NSw4LjExLDM2LjgyLDguMTEsMTAuNDYsMCwyMC4yNy0xLjcxLDI4Ljc1LTQuNjksOC40OCwyLjk4LDE4LjI5LDQuNjksMjguNzUsNC42OSwxMy45NywwLDI2Ljc4LTMuMDQsMzYuODItOC4xMWwtMjcuNjYtMTUuNmgwWlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOlxuICAgICAgICAgICAgXCIjNTA1MDUwXCIsIC8qIEtvbG9yIGRsYSBvYnJ5c3UvZHJ1Z2llaiB3YXJzdHd5LCBkb3N0b3N1aiAqL1xuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIGluY3JlbWVudDoge1xuICAgICAgbmFtZTogXCJidG4taW5jcmVtZW50XCIsXG4gICAgICBwYXRoczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xMjcuMzgsNDMuNTFWMS4xYzI2LjgzLDMuMzcsNDYuMjUsMTguMDEsNDYuMjUsMzQuOSwwLDkuMTktNS42OCwxNy45MS0xNi4wMSwyNC41N2wtMzAuMjQtMTcuMDZaXCIsXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzIxNTk3ZlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWJvcmRlci1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTI3Ljc1LDEuNTNjMjYuNDIsMy40NSw0NS41LDE3Ljg2LDQ1LjUsMzQuNDcsMCw5LTUuNTUsMTcuNTYtMTUuNjUsMjQuMTNsLTI5Ljg1LTE2Ljg0VjEuNTNNMTI3LC42OHY0My4wNWwzMC42MywxNy4yOGMxMC4xMy02LjQ4LDE2LjM3LTE1LjI5LDE2LjM3LTI1LjAxLDAtMTcuNS0yMC4yMS0zMi4wOC00Ny0zNS4zMmgwWlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiMxMDQwNjBcIiwgLyogQ2llbW5pZWpzenkgZGxhIG9icnlzdT8gRG9zdG9zdWogKi9cbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBpY29uQW5jaG9yWDogMTUwLCAvLyAxNTBweCB3IHByYXdvICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxuICAgICAgaWNvbkFuY2hvclk6IDMwLCAvLyAzMHB4IHcgZFx1MDBGM1x1MDE0MiAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcbiAgICB9LFxuICAgIGRlY3JlbWVudDoge1xuICAgICAgbmFtZTogXCJidG4tZGVjcmVtZW50XCIsXG4gICAgICBwYXRoczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xNi4zOCw2MC41N0M2LjA2LDUzLjkxLjM4LDQ1LjE5LjM4LDM2LC4zOCwxOS4xMSwxOS44LDQuNDcsNDYuNjIsMS4xdjQyLjQxbC0zMC4yNCwxNy4wNlpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjYjIxMDEwXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tYm9yZGVyLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk00Ni4yNSwxLjUzdjQxLjc2aDBzLTI5Ljg1LDE2Ljg0LTI5Ljg1LDE2Ljg0QzYuMyw1My41Ni43NSw0NSwuNzUsMzYsLjc1LDE5LjM5LDE5LjgzLDQuOTcsNDYuMjUsMS41M000NywuNjhDMjAuMjEsMy45MiwwLDE4LjUsMCwzNmMwLDkuNzIsNi4yNCwxOC41MywxNi4zNywyNS4wMWwzMC42My0xNy4yOFYuNjhoMFpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjODAwMDAwXCIsIC8qIENpZW1uaWVqc3p5IGRsYSBvYnJ5c3U/IERvc3Rvc3VqICovXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgaWNvbkFuY2hvclg6IDI1LCAvLyAyMHB4IHcgcHJhd28gKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXG4gICAgICBpY29uQW5jaG9yWTogMzAsIC8vIDMwcHggdyBkXHUwMEYzXHUwMTQyICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxuICAgIH0sXG4gIH0sXG4gIGlucHV0QXJlYToge1xuICAgIG5hbWU6IFwiaW5wdXRcIixcbiAgICByZWN0OiB7XG4gICAgICB4OiA1Mi4zOCxcbiAgICAgIHk6IDAuMzgsXG4gICAgICB3aWR0aDogNjkuMjUsXG4gICAgICBoZWlnaHQ6IDQyLjU0LFxuICAgICAgZGVmYXVsdEZpbGw6IFwiI2ZmZlwiLFxuICAgIH0sXG4gICAgYm9yZGVyUGF0aDoge1xuICAgICAgZDogXCJNMTIxLjI1Ljc1djQxLjc5SDUyLjc1Vi43NWg2OC41TTEyMiwwSDUydjQzLjI5aDcwVjBoMFpcIixcbiAgICAgIGRlZmF1bHRGaWxsOiBcIiMzMzNcIixcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgQ09OVEFJTkVSX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLWNvbnRhaW5lclwiO1xuY29uc3QgU1ZHX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLXN2Z1wiO1xuY29uc3QgU1ZHX0JVVFRPTl9DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1zdmctYnV0dG9uXCI7IC8vIFVcdTAxN0N5d2FuZSB3IFR3b2ltIEhUTUxcbmNvbnN0IEhUTUxfSU5QVVRfQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItaHRtbC1pbnB1dFwiOyAvLyBVXHUwMTdDeXdhbmUgdyBUd29pbSBIVE1MXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dE51bWJlcihwcm9wczogSW5wdXROdW1iZXJQcm9wcyk6IEpTWC5FbGVtZW50IHtcbiAgY29uc3Qge1xuICAgIHZhbHVlLFxuICAgIGRlZmF1bHRWYWx1ZSxcbiAgICBkZWYgPSAxLFxuICAgIG1pbixcbiAgICBtYXgsXG4gICAgc3RlcCA9IDEsXG4gICAgcGxhY2Vob2xkZXIsXG4gICAgcmVxdWlyZWQsXG4gICAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgICBuYW1lLFxuICAgIGlkLFxuICAgIHJlYWRPbmx5ID0gZmFsc2UsXG4gICAgb25DaGFuZ2UsXG4gICAgb25WYWx1ZUNoYW5nZSxcbiAgICByYXRpb1NJWkUgPSAxLFxuICAgIHdyYXBwZXJDbGFzc05hbWUsXG4gICAgc3ZnQ2xhc3NOYW1lLFxuICAgIGlucHV0Q2xhc3NOYW1lLFxuICAgIHN0eWxlLFxuICAgIHNlbGVjdEJ1dHRvblN0eWxlLFxuICAgIGluY3JlbWVudEJ1dHRvblN0eWxlLFxuICAgIGRlY3JlbWVudEJ1dHRvblN0eWxlLFxuICAgIGlucHV0QXJlYVN0eWxlLFxuICAgIHNlbGVjdEJ1dHRvbkZpbGwsXG4gICAgaW5jcmVtZW50QnV0dG9uRmlsbCxcbiAgICBkZWNyZW1lbnRCdXR0b25GaWxsLFxuICAgIGlucHV0QXJlYVJlY3RGaWxsLFxuICAgIGlucHV0QXJlYUJvcmRlckZpbGwsXG4gICAgLy8gaWNvbkZpbGwgPSBcIndoaXRlXCIsIC8vIEplXHUwMTVCbGkgYlx1MDExOWR6aWVzeiByZW5kZXJvd2FcdTAxMDcgb3NvYm5lIGlrb255ICsvLVxuICAgIC4uLnJlc3REaXZQcm9wc1xuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XG5cbiAgLy8gSW5pY2phbGl6YWNqYSB3YXJ0b1x1MDE1QmNpIGlucHV0YSBwcnp5IG1vbnRvd2FuaXUgbHViIHptaWFuaWUgZGVmYXVsdFZhbHVlL3ZhbHVlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlucHV0UmVmLmN1cnJlbnQudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gXCJcIjsgLy8gSmF3bmUgdXN0YXdpZW5pZSBuYSBwdXN0eSBzdHJpbmcsIGplXHUwMTVCbGkgYnJhayB3YXJ0b1x1MDE1QmNpXG4gICAgICB9XG4gICAgfVxuICB9LCBbdmFsdWUsIGRlZmF1bHRWYWx1ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZVN0ZXAgPSB1c2VDYWxsYmFjaygoZGlyZWN0aW9uOiBcInVwXCIgfCBcImRvd25cIikgPT4ge1xuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50ICYmICFkaXNhYmxlZCAmJiAhcmVhZE9ubHkpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidXBcIikgaW5wdXRSZWYuY3VycmVudC5zdGVwVXAoKTtcbiAgICAgIGVsc2UgaW5wdXRSZWYuY3VycmVudC5zdGVwRG93bigpO1xuXG4gICAgICAvLyBTeW11bGFjamEgemRhcnplbmlhIGlucHV0LCBhYnkgd3l3b1x1MDE0MmFcdTAxMDcgaGFuZGxlSW5wdXRDaGFuZ2VcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KFwiaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xuICAgICAgaW5wdXRSZWYuY3VycmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gIH0sIFtkaXNhYmxlZCwgcmVhZE9ubHldKTtcblxuICBjb25zdCBoYW5kbGVEZWNyZW1lbnQgPSB1c2VDYWxsYmFjaygoKSA9PiBoYW5kbGVTdGVwKFwiZG93blwiKSwgW2hhbmRsZVN0ZXBdKTtcbiAgY29uc3QgaGFuZGxlSW5jcmVtZW50ID0gdXNlQ2FsbGJhY2soKCkgPT4gaGFuZGxlU3RlcChcInVwXCIpLCBbaGFuZGxlU3RlcF0pO1xuXG4gIGNvbnN0IGhhbmRsZUNob29zZUNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50ICYmICFkaXNhYmxlZCAmJiAhcmVhZE9ubHkpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZGVmID8/IDE7IC8vIEphayB3IFR3b2ltIEpTXG4gICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKG5ld1ZhbHVlKTtcblxuICAgICAgLy8gUlx1MDExOWN6bmUgd3l3b1x1MDE0MmFuaWUgbG9naWtpIHptaWFueSB3YXJ0b1x1MDE1QmNpXG4gICAgICBpZiAob25WYWx1ZUNoYW5nZSkgb25WYWx1ZUNoYW5nZShuZXdWYWx1ZSwgbmFtZSk7XG4gICAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIH0pIGFzIHVua25vd24gYXMgSlNYLlRhcmdldGVkRXZlbnQ8SFRNTElucHV0RWxlbWVudCwgRXZlbnQ+O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgdmFsdWU6IGlucHV0UmVmLmN1cnJlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwiY3VycmVudFRhcmdldFwiLCB7XG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiBpbnB1dFJlZi5jdXJyZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJDaG9vc2UgYnV0dG9uIGNsaWNrZWQsIHZhbHVlIHNldCB0byAxXCIpO1xuICAgIH1cbiAgfSwgW2Rpc2FibGVkLCByZWFkT25seSwgbmFtZSwgb25WYWx1ZUNoYW5nZSwgb25DaGFuZ2VdKTtcblxuICAvLyA9PT0gUE9DWlx1MDEwNFRFSyBERUZJTklDSkkgaGFuZGxlSW5wdXRDaGFuZ2UgPT09XG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGU6IEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PikgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IHJhd1ZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgIGxldCBudW1lcmljVmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGlmIChyYXdWYWx1ZSA9PT0gXCJcIikge1xuICAgICAgbnVtZXJpY1ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTcHJcdTAwRjNidWogc3BhcnNvd2FcdTAxMDcgamFrbyBsaWN6Ylx1MDExOTsgcGFyc2VGbG9hdCBqZXN0IGJhcmR6aWVqIGVsYXN0eWN6bnlcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlRmxvYXQocmF3VmFsdWUpO1xuICAgICAgbnVtZXJpY1ZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IHVuZGVmaW5lZCA6IHBhcnNlZDtcbiAgICB9XG5cbiAgICBpZiAob25WYWx1ZUNoYW5nZSkge1xuICAgICAgb25WYWx1ZUNoYW5nZShudW1lcmljVmFsdWUsIG5hbWUpO1xuICAgIH1cbiAgICAvLyBKZVx1MDE1QmxpIHVcdTAxN0N5dGtvd25payBwcnpla2F6YVx1MDE0MiB3XHUwMTQyYXNueSBvbkNoYW5nZSwgdGVcdTAxN0MgZ28gd3l3b1x1MDE0MmFqXG4gICAgLy8gVG8gemRhcnplbmllIFwiaW5wdXRcIiB6IGVsZW1lbnR1IEhUTUxcbiAgICBpZiAob25DaGFuZ2UpIHtcbiAgICAgIG9uQ2hhbmdlKGUpO1xuICAgIH1cbiAgfTtcbiAgLy8gPT09IEtPTklFQyBERUZJTklDSkkgaGFuZGxlSW5wdXRDaGFuZ2UgPT09XG5cbiAgY29uc3QgY29udGFpbmVyV2lkdGggPSBzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94V2lkdGggKiByYXRpb1NJWkU7XG4gIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHN2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hIZWlnaHQgKiByYXRpb1NJWkU7XG5cbiAgLy8gU3R5bGUgZGxhIG5hXHUwMTQyb1x1MDE3Q29uZWdvIGlucHV0dSBIVE1MLCBza2Fsb3dhbmUgcHJ6ZXogcmF0aW9TSVpFXG4gIGNvbnN0IGh0bWxJbnB1dFN0eWxlOiBKU1guQ1NTUHJvcGVydGllcyA9IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGxlZnQ6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueCAqIHJhdGlvU0laRX1weGAsXG4gICAgdG9wOiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LnkgKiByYXRpb1NJWkV9cHhgLFxuICAgIHdpZHRoOiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LndpZHRoICogcmF0aW9TSVpFfXB4YCxcbiAgICBoZWlnaHQ6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QuaGVpZ2h0ICogcmF0aW9TSVpFfXB4YCxcbiAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgIGNvbG9yOiBcIiMzMzNcIixcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXG4gICAgZm9udFNpemU6IGAke01hdGgubWF4KDgsIDE4ICogcmF0aW9TSVpFKX1weGAsIC8vIERvc3Rvc3VqIGN6Y2lvbmtcdTAxMTlcbiAgICBvdXRsaW5lOiBcIm5vbmVcIixcbiAgICBwYWRkaW5nOiBgMCAke01hdGgubWF4KDEsIDIgKiByYXRpb1NJWkUpfXB4YCxcbiAgICBtYXJnaW46IDAsXG4gICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcbiAgICBNb3pBcHBlYXJhbmNlOiBcInRleHRmaWVsZFwiLFxuICAgIFdlYmtpdEFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxuICAgIHpJbmRleDogMixcbiAgfTtcblxuICAvLyBSb3ptaWFyIGlrb24gKy8tLiBaYVx1MDE0Mlx1MDBGM1x1MDE3Q215LCBcdTAxN0NlIG9yeWdpbmFsbmUgaWtvbnkgc1x1MDEwNSAyNHgyNC5cbiAgLy8gQ2hjZW15IGplIHByemVza2Fsb3dhXHUwMTA3LCBhYnkgcGFzb3dhXHUwMTQyeSBkbyBwcnp5Y2lza1x1MDBGM3cuXG4gIC8vIFByenlrXHUwMTQyYWRvd28sIG5pZWNoIHpham11alx1MDEwNSBva29cdTAxNDJvIDUwJSB3eXNva29cdTAxNUJjaSBwcnp5Y2lza3UgKHcgamVkbm9zdGthY2ggdmlld0JveClcbiAgY29uc3QgaWNvblZpZXdCb3hTaXplID0gMjQ7IC8vIE9yeWdpbmFsbnkgcm96bWlhciB2aWV3Qm94IGlrb24gKy8tXG4gIGNvbnN0IHRhcmdldEljb25IZWlnaHRJblN2Z1VuaXRzID0gc3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveEhlaWdodCAqIDAuMjUgKlxuICAgIChyYXRpb1NJWkUgPiAwLjUgPyAxIDogcmF0aW9TSVpFICogMik7IC8vIG5wLiAyNSUgd3lzb2tvXHUwMTVCY2kgY2FcdTAxNDJlZ28ga29tcG9uZW50dVxuICBjb25zdCBpY29uQWN0dWFsU2NhbGUgPSAxLjUgKiAodGFyZ2V0SWNvbkhlaWdodEluU3ZnVW5pdHMgLyBpY29uVmlld0JveFNpemUpO1xuXG4gIGxldCBkaXNwbGF5VmFsdWU6IHN0cmluZyA9IFwiXCI7IC8vIElucHV0IHZhbHVlIHphd3N6ZSBqYWtvIHN0cmluZ1xuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGRpc3BsYXlWYWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwbGF5VmFsdWUgPSBTdHJpbmcoZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIGNvbnN0IGNvbW1vblN2Z0J1dHRvblN0eWxlOiBKU1guQ1NTUHJvcGVydGllcyA9IHtcbiAgICBjdXJzb3I6IGRpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJkZWZhdWx0XCIgOiBcInBvaW50ZXJcIixcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YCR7Q09OVEFJTkVSX0NMQVNTX05BTUV9ICR7d3JhcHBlckNsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogYCR7Y29udGFpbmVyV2lkdGh9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke2NvbnRhaW5lckhlaWdodH1weGAsXG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxuICAgICAgICAuLi5zdHlsZSxcbiAgICAgIH19XG4gICAgICB7Li4ucmVzdERpdlByb3BzfVxuICAgID5cbiAgICAgIDxzdmdcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtTVkdfQ0xBU1NfTkFNRX0gJHtzdmdDbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgICBkYXRhLW5hbWU9XCJpbnB1dC1udW1iZXJcIiAvLyBaIFR3b2plZ28gSFRNTFxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgdmlld0JveD17YDAgMCAke3N2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hXaWR0aH0gJHtzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94SGVpZ2h0fWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIH19XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICA+XG4gICAgICAgIHsvKiBHcnVwYSBcIkNob29zZS9TZWxlY3RcIiAqL31cbiAgICAgICAgPGdcbiAgICAgICAgICBjbGFzc05hbWU9e1NWR19CVVRUT05fQ0xBU1NfTkFNRX0gLy8gS2xhc2EgeiBUd29qZWdvIEhUTUxcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuYnV0dG9ucy5jaG9vc2UubmFtZX0gLy8gZGF0YS1uYW1lIHogVHdvamVnbyBIVE1MXG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkID8gaGFuZGxlQ2hvb3NlQ2xpY2sgOiB1bmRlZmluZWR9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3ZnQnV0dG9uU3R5bGUsIC4uLihzZWxlY3RCdXR0b25TdHlsZSB8fCB7fSkgfX1cbiAgICAgICAgICBwb2ludGVyRXZlbnRzPXtkaXNhYmxlZCA/IFwibm9uZVwiIDogXCJhdXRvXCJ9XG4gICAgICAgID5cbiAgICAgICAgICB7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmNob29zZS5wYXRocy5tYXAoKHAsIGkpID0+IChcbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGtleT17YGNob29zZS1wYXRoLSR7aX1gfVxuICAgICAgICAgICAgICBkYXRhLW5hbWU9e3AuZGF0YU5hbWV9XG4gICAgICAgICAgICAgIGQ9e3AuZH1cbiAgICAgICAgICAgICAgZmlsbD17c2VsZWN0QnV0dG9uRmlsbCB8fCBwLmRlZmF1bHRGaWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9nPlxuXG4gICAgICAgIHsvKiBHcnVwYSBcIklucHV0IEFyZWFcIiAqL31cbiAgICAgICAgPGdcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLm5hbWV9XG4gICAgICAgICAgc3R5bGU9e2lucHV0QXJlYVN0eWxlIHx8IHt9fVxuICAgICAgICA+XG4gICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgIHg9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueH1cbiAgICAgICAgICAgIHk9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueX1cbiAgICAgICAgICAgIHdpZHRoPXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LndpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmhlaWdodH1cbiAgICAgICAgICAgIGZpbGw9e2lucHV0QXJlYVJlY3RGaWxsIHx8IHN2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QuZGVmYXVsdEZpbGx9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEuYm9yZGVyUGF0aC5kfVxuICAgICAgICAgICAgZmlsbD17aW5wdXRBcmVhQm9yZGVyRmlsbCB8fFxuICAgICAgICAgICAgICBzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5ib3JkZXJQYXRoLmRlZmF1bHRGaWxsfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cblxuICAgICAgICB7LyogR3J1cGEgXCJEZWNyZW1lbnRcIiAqL31cbiAgICAgICAgPGdcbiAgICAgICAgICBjbGFzc05hbWU9e1NWR19CVVRUT05fQ0xBU1NfTkFNRX1cbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQubmFtZX1cbiAgICAgICAgICBvbkNsaWNrPXshZGlzYWJsZWQgJiYgIXJlYWRPbmx5ID8gaGFuZGxlRGVjcmVtZW50IDogdW5kZWZpbmVkfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN2Z0J1dHRvblN0eWxlLCAuLi4oZGVjcmVtZW50QnV0dG9uU3R5bGUgfHwge30pIH19XG4gICAgICAgICAgcG9pbnRlckV2ZW50cz17ZGlzYWJsZWQgfHwgcmVhZE9ubHkgPyBcIm5vbmVcIiA6IFwiYXV0b1wifVxuICAgICAgICA+XG4gICAgICAgICAge3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQucGF0aHMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBrZXk9e2BkZWMtcGF0aC0ke2l9YH1cbiAgICAgICAgICAgICAgZGF0YS1uYW1lPXtwLmRhdGFOYW1lfVxuICAgICAgICAgICAgICBkPXtwLmR9XG4gICAgICAgICAgICAgIGZpbGw9e2RlY3JlbWVudEJ1dHRvbkZpbGwgfHwgcC5kZWZhdWx0RmlsbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgICAgey8qIEplXHUwMTVCbGkgY2hjZXN6IGRvZGFcdTAxMDcgaWtvblx1MDExOSBTVkcgXCItXCIgbmEgdHltIGtzenRhXHUwMTQyY2llLCB6clx1MDBGM2IgdG8gdHV0YWosIG5wLjogKi99XG4gICAgICAgICAge1xuICAgICAgICAgICAgLyo8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoWCBZKSBzY2FsZShTKVwiPlxuICAgICAgICAgICAge0RlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudH1cbiAgICAgICAgICA8L2c+Ki9cbiAgICAgICAgICB9XG4gICAgICAgICAgey8qIElrb25hIERlY3JlbWVudCAoLSkgKi99XG4gICAgICAgICAgPGdcbiAgICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQuaWNvbkFuY2hvclh9LCAke3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQuaWNvbkFuY2hvcll9KSBzY2FsZSgke2ljb25BY3R1YWxTY2FsZX0pIHRyYW5zbGF0ZSgtJHtcbiAgICAgICAgICAgICAgaWNvblZpZXdCb3hTaXplIC8gMlxuICAgICAgICAgICAgfSwgLSR7aWNvblZpZXdCb3hTaXplIC8gMn0pYH1cbiAgICAgICAgICAgIHN0eWxlPXt7IHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH19IC8vIElrb255IG5pZSBwb3dpbm55IHByemVjaHd5dHl3YVx1MDEwNyBrbGlrbmlcdTAxMTlcdTAxMDdcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgIHZpZXdCb3g9e2AwIDAgJHtpY29uVmlld0JveFNpemV9ICR7aWNvblZpZXdCb3hTaXplfWB9XG4gICAgICAgICAgICAgIHdpZHRoPXtpY29uVmlld0JveFNpemV9XG4gICAgICAgICAgICAgIGhlaWdodD17aWNvblZpZXdCb3hTaXplfVxuICAgICAgICAgICAgICBmaWxsPVwid2hpdGVcIlxuICAgICAgICAgICAgICBvdmVyZmxvdz1cInZpc2libGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7RGVmYXVsdERlY3JlbWVudEljb25TdmdDb250ZW50fVxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG5cbiAgICAgICAgey8qIEdydXBhIFwiSW5jcmVtZW50XCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9XG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lm5hbWV9XG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkICYmICFyZWFkT25seSA/IGhhbmRsZUluY3JlbWVudCA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdmdCdXR0b25TdHlsZSwgLi4uKGluY3JlbWVudEJ1dHRvblN0eWxlIHx8IHt9KSB9fVxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9e2Rpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcImF1dG9cIn1cbiAgICAgICAgPlxuICAgICAgICAgIHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50LnBhdGhzLm1hcCgocCwgaSkgPT4gKFxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAga2V5PXtgaW5jLXBhdGgtJHtpfWB9XG4gICAgICAgICAgICAgIGRhdGEtbmFtZT17cC5kYXRhTmFtZX1cbiAgICAgICAgICAgICAgZD17cC5kfVxuICAgICAgICAgICAgICBmaWxsPXtpbmNyZW1lbnRCdXR0b25GaWxsIHx8IHAuZGVmYXVsdEZpbGx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHsvKiBKZVx1MDE1QmxpIGNoY2VzeiBkb2RhXHUwMTA3IGlrb25cdTAxMTkgU1ZHIFwiK1wiIG5hIHR5bSBrc3p0YVx1MDE0MmNpZSwgenJcdTAwRjNiIHRvIHR1dGFqLCBucC46ICovfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8qPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKFggWSkgc2NhbGUoUylcIj5cbiAgICAgICAgICAgIHtEZWZhdWx0SW5jcmVtZW50SWNvblN2Z0NvbnRlbnR9XG4gICAgICAgICAgPC9nPiovXG4gICAgICAgICAgfVxuICAgICAgICAgIHsvKiBJa29uYSBJbmNyZW1lbnQgKCspICovfVxuICAgICAgICAgIDxnXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lmljb25BbmNob3JYfSwgJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lmljb25BbmNob3JZfSkgc2NhbGUoJHtpY29uQWN0dWFsU2NhbGV9KSB0cmFuc2xhdGUoLSR7XG4gICAgICAgICAgICAgIGljb25WaWV3Qm94U2l6ZSAvIDJcbiAgICAgICAgICAgIH0sIC0ke2ljb25WaWV3Qm94U2l6ZSAvIDJ9KWB9XG4gICAgICAgICAgICBzdHlsZT17eyBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgdmlld0JveD17YDAgMCAke2ljb25WaWV3Qm94U2l6ZX0gJHtpY29uVmlld0JveFNpemV9YH1cbiAgICAgICAgICAgICAgd2lkdGg9e2ljb25WaWV3Qm94U2l6ZX1cbiAgICAgICAgICAgICAgaGVpZ2h0PXtpY29uVmlld0JveFNpemV9XG4gICAgICAgICAgICAgIGZpbGw9XCJ3aGl0ZVwiXG4gICAgICAgICAgICAgIG92ZXJmbG93PVwidmlzaWJsZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtEZWZhdWx0SW5jcmVtZW50SWNvblN2Z0NvbnRlbnR9XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvc3ZnPlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgY2xhc3NOYW1lPXtgJHtIVE1MX0lOUFVUX0NMQVNTX05BTUV9ICR7aW5wdXRDbGFzc05hbWUgfHwgXCJcIn1gfSAvLyBLbGFzYSB6IFR3b2plZ28gSFRNTFxuICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgaWQ9e2lkfVxuICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfSAvLyBkaXNwbGF5VmFsdWUgamVzdCBqdVx1MDE3QyBzdHJpbmdpZW0gbHViIHB1c3R5bSBzdHJpbmdpZW1cbiAgICAgICAgbWluPXttaW59XG4gICAgICAgIG1heD17bWF4fVxuICAgICAgICBzdGVwPXtzdGVwfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgIG9uSW5wdXQ9e2hhbmRsZUlucHV0Q2hhbmdlfSAvLyBQb2RcdTAxNDJcdTAxMDVjem9ueSBwb3ByYXdueSBoYW5kbGVyXG4gICAgICAgIHN0eWxlPXtodG1sSW5wdXRTdHlsZX1cbiAgICAgICAgYXJpYS1sYWJlbD17cHJvcHNbXCJhcmlhLWxhYmVsXCJdIHx8IFwiV2FydG9cdTAxNUJcdTAxMDcgbGljemJvd2FcIn1cbiAgICAgICAgey4uLnJlc3REaXZQcm9wc31cbiAgICAgIC8+XG4gICAgICB7XG4gICAgICAgIC8vIFptaWVuaW9uZSB6IHJlc3RJbnB1dFByb3BzLCBibyB0ZSBzXHUwMTA1IGRsYSBnXHUwMTQyXHUwMEYzd25lZ28gZGl2YVxuICAgICAgICAvLyBKZVx1MDE1QmxpIGNoY2VzeiBwcnpla2F6eXdhXHUwMTA3IGRvZGF0a293ZSBhdHJ5YnV0eSBkbyBpbnB1dGEsXG4gICAgICAgIC8vIG11c2lzeiBqZSBvc29ibm8gb2JzXHUwMTQydVx1MDE3Q3lcdTAxMDcgbHViIG5hendhXHUwMTA3IG5wLiBodG1sSW5wdXRQcm9wc1xuICAgICAgfVxuICAgIDwvZGl2PlxuICApO1xufVxuIiwgIi8vIERlZmluaWNqZSB0eXBcdTAwRjN3XG50eXBlIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXkgPSBudW1iZXIgfCBFeGNlbE5lc3RlZE51bWJlckFycmF5W107XG5cbmV4cG9ydCB0eXBlIEV4Y2VsTmVzdGVkTiA9IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7XG5leHBvcnQgdHlwZSBFeGNlbFJlc3VsdHMgPSBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE51bWJlckFycmF5PjtcbmV4cG9ydCB0eXBlIEV4Y2VsU2V0c1NldCA9IHtcbiAgdmFyOiBzdHJpbmc7IC8vIE5hendhIHptaWVubmVqIHdlalx1MDE1QmNpb3dlalxuICB2YWw6IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHptaWVubmVqIChsaWN6YmEgbHViIHphZ25pZVx1MDE3Q2RcdTAxN0NvbmEgdGFibGljYSBsaWN6Yilcbn07XG5cbi8vIFR5cCBkbGEgZnVua2NqaSBvYmxpY3plbmlvd2VqOiBwcnp5am11amUgbWFwXHUwMTE5LCB6d3JhY2Egb2JsaWN6b25cdTAxMDUgd2FydG9cdTAxNUJcdTAxMDdcbnR5cGUgQ2FsY3VsYXRpb25GdW5jdGlvbiA9IChjdXJyZW50TWFwOiBFeGNlbFJlc3VsdHMpID0+IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7XG5cbmV4cG9ydCB0eXBlIEV4Y2VsU2V0c0dldCA9IHtcbiAgdmFyOiBzdHJpbmc7IC8vIE5hendhIG5vd2VqLCBvYmxpY3pvbmVqIHptaWVubmVqXG4gIHZhbDogQ2FsY3VsYXRpb25GdW5jdGlvbjsgLy8gRnVua2NqYSBvYmxpY3phalx1MDEwNWNhIHdhcnRvXHUwMTVCXHUwMTA3IHRlaiB6bWllbm5lalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm1pZW5pb25vIHogYGZ1bmAgbmEgYHZhbGAgemdvZG5pZSB6IFR3b2ltIHByenlrXHUwMTQyYWRlbSB1XHUwMTdDeWNpYVxufTtcblxuLyoqXG4gKiBGdW5rY2phIEV4Y2VsIHByemV0d2FyemEgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93ZSBpIHd5a29udWplIHpkZWZpbmlvd2FuZSBvYmxpY3plbmlhLlxuICogQHBhcmFtIGlucHV0VmFsdWVzIFdhcnRvXHUwMTVCY2kgcG9jelx1MDEwNXRrb3dlIGRvIHVtaWVzemN6ZW5pYSB3IG1hcGllLlxuICogQHBhcmFtIGNhbGNzVmFsdWVzIERlZmluaWNqZSBvYmxpY3plXHUwMTQ0IGRvIHd5a29uYW5pYS5cbiAqIEByZXR1cm5zIE1hcGEgemF3aWVyYWpcdTAxMDVjYSB3c3p5c3RraWUgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93ZSBpIG9ibGljem9uZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIEV4Y2VsKFxuICBpbnB1dFZhbHVlczogRXhjZWxTZXRzU2V0IHwgRXhjZWxTZXRzU2V0W10sXG4gIGNhbGNzVmFsdWVzPzogRXhjZWxTZXRzR2V0IHwgRXhjZWxTZXRzR2V0W10gLy8gRHJ1Z2kgYXJndW1lbnQgamVzdCBvcGNqb25hbG55XG4pOiBFeGNlbFJlc3VsdHMgeyAvLyBad3JhY2FteSBtYXBcdTAxMTkgeiBiYXJkemllaiBzemN6ZWdcdTAwRjNcdTAxNDJvd3ltIHR5cGVtXG4gIFxuICAvLyBJbmljamFsaXphY2phIG1hcHkgeiBwb3ByYXdueW1pIHR5cGFtaVxuICBjb25zdCBNOkV4Y2VsUmVzdWx0cyA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE51bWJlckFycmF5PigpO1xuXG4gIC8vIDEuIFByemV0d2FyemFuaWUgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93eWNoIChpbnB1dFZhbHVlcylcbiAgLy8gTm9ybWFsaXphY2phIGlucHV0VmFsdWVzIGRvIHRhYmxpY3ksIGplXHUwMTVCbGkgcHJ6ZWthemFubyBwb2plZHluY3p5IG9iaWVrdFxuICBjb25zdCByZXNvbHZlZElucHV0VmFsdWVzID0gIUFycmF5LmlzQXJyYXkoaW5wdXRWYWx1ZXMpID8gW2lucHV0VmFsdWVzXSA6IGlucHV0VmFsdWVzO1xuICByZXNvbHZlZElucHV0VmFsdWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgTS5zZXQoaXRlbS52YXIsIGl0ZW0udmFsKTtcbiAgfSk7XG5cbiAgLy8gMi4gUHJ6ZXR3YXJ6YW5pZSB3YXJ0b1x1MDE1QmNpIG9ibGljemVuaW93eWNoIChjYWxjc1ZhbHVlcylcbiAgaWYgKGNhbGNzVmFsdWVzKSB7IC8vIFd5a29uYWogdHlsa28sIGplXHUwMTVCbGkgY2FsY3NWYWx1ZXMgem9zdGFcdTAxNDJ5IGRvc3RhcmN6b25lXG4gICAgLy8gTm9ybWFsaXphY2phIGNhbGNzVmFsdWVzIGRvIHRhYmxpY3ksIGplXHUwMTVCbGkgcHJ6ZWthemFubyBwb2plZHluY3p5IG9iaWVrdFxuICAgIGNvbnN0IHJlc29sdmVkQ2FsY3NWYWx1ZXMgPSAhQXJyYXkuaXNBcnJheShjYWxjc1ZhbHVlcykgPyBbY2FsY3NWYWx1ZXNdIDogY2FsY3NWYWx1ZXM7XG4gICAgXG4gICAgcmVzb2x2ZWRDYWxjc1ZhbHVlcy5mb3JFYWNoKGNhbGNJdGVtID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFd5d29cdTAxNDJhbmllIGZ1bmtjamkgb2JsaWN6ZW5pb3dlaiB1XHUwMTdDeXRrb3duaWthLCBwcnpla2F6dWpcdTAxMDVjIGFrdHVhbG5cdTAxMDUgbWFwXHUwMTE5IE1cbiAgICAgICAgY29uc3QgcmVzdWx0VmFsdWUgPSBjYWxjSXRlbS52YWwoTSk7XG4gICAgICAgIC8vIFphcGlzYW5pZSB3eW5pa3Ugb2JsaWN6ZVx1MDE0NCBkbyBtYXB5IE1cbiAgICAgICAgTS5zZXQoY2FsY0l0ZW0udmFyLCByZXN1bHRWYWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBCXHUwMTQyXHUwMTA1ZCBwb2RjemFzIG9ibGljemFuaWEgem1pZW5uZWogXCIke2NhbGNJdGVtLnZhcn1cIjpgLCBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpO1xuICAgICAgICAvLyBNb1x1MDE3Q2VzeiB6ZGVjeWRvd2FcdTAxMDcsIGphayBvYnNcdTAxNDJ1XHUwMTdDeVx1MDEwNyBiXHUwMTQyXHUwMTA1ZDogcG9taW5cdTAxMDVcdTAxMDcsIHphcGlzYVx1MDEwNyBiXHUwMTQyXHUwMTA1ZCwgcHJ6ZXJ3YVx1MDEwNywgaXRwLlxuICAgICAgICAvLyBOYSByYXppZSB6YXBpc3VqZW15IGB1bmRlZmluZWRgLCBhYnkgd3NrYXphXHUwMTA3IHByb2JsZW0uXG4gICAgICAgIE0uc2V0KGNhbGNJdGVtLnZhciwgdW5kZWZpbmVkIGFzIGFueSk7IC8vIFVcdTAxN0N5d2FteSBgYXMgYW55YCBhYnkgcG96d29saVx1MDEwNyBuYSBgdW5kZWZpbmVkYCB3IG1hcGllIHogdHlwZW0gRXhjZWxOZXN0ZWROdW1iZXJBcnJheVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIE07XG59XG5cbi8qKlxuICogR2VuZXJ1amUgdGFibGljXHUwMTE5IGxpY3piIChwcnplZHppYVx1MDE0MikgbyBva3JlXHUwMTVCbG9uZWogbGljemJpZSBlbGVtZW50XHUwMEYzdywga3Jva3UgaSB3YXJ0b1x1MDE1QmNpIHBvY3pcdTAxMDV0a293ZWouXG4gKlxuICogQHBhcmFtIHN0YXJ0QXQgV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHBpZXJ3c3plZ28gZWxlbWVudHUgdyB0YWJsaWN5LlxuICogQHBhcmFtIHN0ZXAgS3JvayAoclx1MDBGM1x1MDE3Q25pY2EpIG1pXHUwMTE5ZHp5IGtvbGVqbnltaSBlbGVtZW50YW1pIHcgdGFibGljeS4gTW9cdTAxN0NlIGJ5XHUwMTA3IGRvZGF0bmksIHVqZW1ueSBsdWIgemVyb3d5LlxuICogQHBhcmFtIGl0ZW1zIExpY3piYSBlbGVtZW50XHUwMEYzdyBkbyB3eWdlbmVyb3dhbmlhIHcgdGFibGljeS5cbiAqIEByZXR1cm5zIFRhYmxpY2EgbGljemIgKG51bWJlcltdKSByZXByZXplbnR1alx1MDEwNWNhIHd5Z2VuZXJvd2FueSBwcnplZHppYVx1MDE0Mi5cbiAqIFp3cmFjYSBwdXN0XHUwMTA1IHRhYmxpY1x1MDExOSwgamVcdTAxNUJsaSBgaXRlbXNgIGplc3QgbW5pZWpzemUgbHViIHJcdTAwRjN3bmUgMC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZUZpcnN0U3RlcFNpemUoc3RhcnRBdDogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGl0ZW1zOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGlmIChpdGVtcyA8PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0OiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zOyBpKyspIHtcbiAgICByZXN1bHQucHVzaChzdGFydEF0ICsgKGkgKiBzdGVwKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZW5lcnVqZSB0YWJsaWNcdTAxMTkgbGljemIgKHByemVkemlhXHUwMTQyKSwgemFjenluYWpcdTAxMDVjIG9kIGBzdGFydEF0YCwgcG9zdFx1MDExOXB1alx1MDEwNWMgbyBgc3RlcGAsXG4gKiBhXHUwMTdDIGRvIG9zaVx1MDEwNWduaVx1MDExOWNpYSAoaSBwb3RlbmNqYWxuaWUgd1x1MDE0Mlx1MDEwNWN6ZW5pYSkgYGVuZEF0YC5cbiAqXG4gKiBAcGFyYW0gc3RhcnRBdCBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgcGllcndzemVnbyBlbGVtZW50dSB3IHRhYmxpY3kuXG4gKiBAcGFyYW0gc3RlcCBLcm9rIChyXHUwMEYzXHUwMTdDbmljYSkgbWlcdTAxMTlkenkga29sZWpueW1pIGVsZW1lbnRhbWkgdyB0YWJsaWN5LiBNb1x1MDE3Q2UgYnlcdTAxMDcgZG9kYXRuaSwgdWplbW55IGx1YiB6ZXJvd3kuXG4gKiBAcGFyYW0gZW5kQXQgV2FydG9cdTAxNUJcdTAxMDcga29cdTAxNDRjb3dhIHByemVkemlhXHUwMTQydS4gRWxlbWVudHkgYlx1MDExOWRcdTAxMDUgZ2VuZXJvd2FuZSB0YWsgZFx1MDE0MnVnbywgamFrXG4gKiBkXHUwMTQydWdvIG1pZXN6Y3pcdTAxMDUgc2lcdTAxMTkgdyBwcnplZHppYWxlIG9rcmVcdTAxNUJsb255bSBwcnpleiBgc3RhcnRBdGAsIGBzdGVwYCBpIGBlbmRBdGAgKHdcdTAxNDJcdTAxMDVjem5pZSkuXG4gKiBAcmV0dXJucyBUYWJsaWNhIGxpY3piIChudW1iZXJbXSkgcmVwcmV6ZW50dWpcdTAxMDVjYSB3eWdlbmVyb3dhbnkgcHJ6ZWR6aWFcdTAxNDIuXG4gKiBad3JhY2EgcHVzdFx1MDEwNSB0YWJsaWNcdTAxMTksIGplXHUwMTVCbGkgbmllIG1vXHUwMTdDbmEgd3lnZW5lcm93YVx1MDEwNyBcdTAxN0NhZG55Y2ggZWxlbWVudFx1MDBGM3dcbiAqIChucC4gc3RhcnRBdCA+IGVuZEF0IHByenkgZG9kYXRuaW0ga3Jva3UsIGx1YiBqZVx1MDE1QmxpIHN0ZXA9MCBhIHN0YXJ0QXQgIT09IGVuZEF0KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZUZpcnN0U3RlcExhc3Qoc3RhcnRBdDogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGVuZEF0OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcblxuICBpZiAoc3RlcCA9PT0gMCkge1xuICAgIC8vIEplXHUwMTVCbGkga3JvayB3eW5vc2kgMCwgcHJ6ZWR6aWFcdTAxNDIgbW9cdTAxN0NlIHphd2llcmFcdTAxMDcgdHlsa28gamVkZW4gZWxlbWVudCxcbiAgICAvLyBqZVx1MDE1QmxpIHN0YXJ0QXQgamVzdCByXHUwMEYzd25lIGVuZEF0LlxuICAgIGlmIChzdGFydEF0ID09PSBlbmRBdCkge1xuICAgICAgcmVzdWx0LnB1c2goc3RhcnRBdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7IC8vIFp3cmFjYSBbc3RhcnRBdF0gbHViIFtdXG4gIH1cblxuICBpZiAoc3RlcCA+IDApIHtcbiAgICAvLyBLcm9rIGRvZGF0bmk6IGlkemllbXkgdyBnXHUwMEYzclx1MDExOVxuICAgIGlmIChzdGFydEF0ID4gZW5kQXQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBqZXN0IGp1XHUwMTdDIHphIHdhcnRvXHUwMTVCY2lcdTAxMDUga29cdTAxNDRjb3dcdTAxMDVcbiAgICB9XG4gICAgZm9yIChsZXQgY3VycmVudFZhbHVlID0gc3RhcnRBdDsgY3VycmVudFZhbHVlIDw9IGVuZEF0OyBjdXJyZW50VmFsdWUgKz0gc3RlcCkge1xuICAgICAgcmVzdWx0LnB1c2goY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7IC8vIHN0ZXAgPCAwXG4gICAgLy8gS3JvayB1amVtbnk6IGlkemllbXkgdyBkXHUwMEYzXHUwMTQyXG4gICAgaWYgKHN0YXJ0QXQgPCBlbmRBdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIGplc3QganVcdTAxN0MgemEgd2FydG9cdTAxNUJjaVx1MDEwNSBrb1x1MDE0NGNvd1x1MDEwNSAodyB6XHUwMTQyXHUwMTA1IHN0cm9uXHUwMTE5KVxuICAgIH1cbiAgICBmb3IgKGxldCBjdXJyZW50VmFsdWUgPSBzdGFydEF0OyBjdXJyZW50VmFsdWUgPj0gZW5kQXQ7IGN1cnJlbnRWYWx1ZSArPSBzdGVwKSB7XG4gICAgICByZXN1bHQucHVzaChjdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEFsdGVybmF0eXduYSwgYmFyZHppZWogendpXHUwMTE5elx1MDE0MmEgaW1wbGVtZW50YWNqYSB1XHUwMTdDeXdhalx1MDEwNWNhIEFycmF5LmZyb20gKGR6aWFcdTAxNDJhIHRhayBzYW1vKTpcbi8qXG5mdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBTaXplQWx0ZXJuYXRpdmUoaXRlbXM6IG51bWJlciwgc3RlcDogbnVtYmVyLCBzdGFydEF0OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGlmIChpdGVtcyA8PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBpdGVtcyB9LCAoXywgaW5kZXgpID0+IHN0YXJ0QXQgKyBpbmRleCAqIHN0ZXApO1xufVxuXG5jb25zb2xlLmxvZyhcIi0tLSBUZXN0IGFsdGVybmF0eXduZWogaW1wbGVtZW50YWNqaSAtLS1cIik7XG5jb25zdCByYW5nZTFfYWx0ID0gaW5pdFJhbmdlRmlyc3RTdGVwU2l6ZUFsdGVybmF0aXZlKDUsIDIsIDEwKTtcbmNvbnNvbGUubG9nKFwiUmFuZ2UgMSBBbHQgKGl0ZW1zOiA1LCBzdGVwOiAyLCBzdGFydEF0OiAxMCk6XCIsIHJhbmdlMV9hbHQpO1xuKi9cblxuZXhwb3J0IGRlZmF1bHQgRXhjZWw7XG5cbi8vIC0tLSBQcnp5a1x1MDE0MmFkIHVcdTAxN0N5Y2lhIC0tLVxuLy8vLyBEZWZpbmljamEgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93eWNoXG4vL2NvbnN0IGlucHV0czogRXhjZWxTZXRzU2V0W10gPSBbXG4vLyAgeyB2YXI6IFwiaVwiLCB2YWw6IFsxLCAyLCAzLCA0LCA1LCA2LCA3XSB9LFxuLy8gIHsgdmFyOiBcImpcIiwgdmFsOiBbMSwgMywgMiwgNywgNiwgNSwgNF0gfVxuLy9dO1xuLy9cbi8vLy8gRGVmaW5pY2phIG9ibGljemVcdTAxNDRcbi8vY29uc3QgY2FsY3VsYXRpb25zOiBFeGNlbFNldHNHZXRbXSA9IFtcbi8vICB7XG4vLyAgICB2YXI6IFwiaWpfc3VtXCIsIC8vIE5vd2Egem1pZW5uYSwga3RcdTAwRjNyYSBiXHUwMTE5ZHppZSBzdW1cdTAxMDUgaVtrXSArIGpba11cbi8vICAgIHZhbDogKGN1cnJlbnRNYXApID0+IHtcbi8vICAgICAgLy8gUG9iaWVyYW15IHRhYmxpY2UgJ2knIG9yYXogJ2onIHogbWFweVxuLy8gICAgICBjb25zdCBpQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImlcIik7XG4vLyAgICAgIGNvbnN0IGpBcnJheSA9IGN1cnJlbnRNYXAuZ2V0KFwialwiKTtcbi8vXG4vLyAgICAgIC8vIFdhXHUwMTdDbmU6IFNwcmF3ZHplbmllIHR5cFx1MDBGM3cgaSBvYnNcdTAxNDJ1Z2EgYlx1MDE0Mlx1MDExOWRcdTAwRjN3IHdld25cdTAxMDV0cnogZnVua2NqaSB1XHUwMTdDeXRrb3duaWthXG4vLyAgICAgIGlmICghQXJyYXkuaXNBcnJheShpQXJyYXkpIHx8ICFBcnJheS5pc0FycmF5KGpBcnJheSkpIHtcbi8vICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJabWllbm5lICdpJyBvcmF6ICdqJyBtdXN6XHUwMTA1IGJ5XHUwMTA3IHRhYmxpY2FtaSBkbGEgdGVqIG9wZXJhY2ppIHN1bW93YW5pYS5cIik7XG4vLyAgICAgIH1cbi8vICAgICAgaWYgKGlBcnJheS5zb21lKGlzTmFOKSB8fCBqQXJyYXkuc29tZShpc05hTikpIHtcbi8vICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY2FjaCAnaScgb3JheiAnaicgbXVzelx1MDEwNSBieVx1MDEwNyBsaWN6YmFtaS5cIik7XG4vLyAgICAgIH1cbi8vICAgICAgaWYgKGlBcnJheS5sZW5ndGggIT09IGpBcnJheS5sZW5ndGgpIHtcbi8vICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUYWJsaWNlICdpJyBvcmF6ICdqJyBtdXN6XHUwMTA1IG1pZVx1MDEwNyB0YWtcdTAxMDUgc2FtXHUwMTA1IGRcdTAxNDJ1Z29cdTAxNUJcdTAxMDcgZG8gc3Vtb3dhbmlhIGVsZW1lbnQgcG8gZWxlbWVuY2llLlwiKTtcbi8vICAgICAgfVxuLy9cbi8vICAgICAgLy8gV3lrb25hbmllIG9wZXJhY2ppIHN1bW93YW5pYSBlbGVtZW50IHBvIGVsZW1lbmNpZVxuLy8gICAgICAvLyBaYWtcdTAxNDJhZGFteSwgXHUwMTdDZSBzXHUwMTA1IHRvIHBcdTAxNDJhc2tpZSB0YWJsaWNlIGxpY3piLCB6Z29kbmllIHogcHJ6eWtcdTAxNDJhZGVtLlxuLy8gICAgICAvLyBEbGEgRXhjZWxOZXN0ZWROdW1iZXJBcnJheSBvcGVyYWNqYSBieVx1MDE0MmFieSBiYXJkemllaiB6XHUwMTQyb1x1MDE3Q29uYSAocmVrdXJlbmN5am5hKS5cbi8vICAgICAgcmV0dXJuIGlBcnJheS5tYXAoKHZhbF9pLCBpbmRleCkgPT4gKHZhbF9pIGFzIG51bWJlcikgKyAoakFycmF5W2luZGV4XSBhcyBudW1iZXIpKTtcbi8vICAgIH1cbi8vICB9LFxuLy8gIHtcbi8vICAgIHZhcjogXCJrXCIsIC8vIFByenlrXHUwMTQyYWQgaW5uZWogem1pZW5uZWosIG5wLiBza2FsYXJcbi8vICAgIHZhbDogKCkgPT4gMTAwIC8vIFByb3N0YSBmdW5rY2phIHp3cmFjYWpcdTAxMDVjYSB3YXJ0b1x1MDE1Qlx1MDEwN1xuLy8gIH0sXG4vLyAge1xuLy8gICAgdmFyOiBcImlfcGx1c19rXCIsIC8vIFByenlrXHUwMTQyYWQgb3BlcmFjamkgdGFibGljYSArIHNrYWxhciAoYnJvYWRjYXN0aW5nKVxuLy8gICAgdmFsOiAoY3VycmVudE1hcCkgPT4ge1xuLy8gICAgICAgIGNvbnN0IGlBcnJheSA9IGN1cnJlbnRNYXAuZ2V0KFwiaVwiKTtcbi8vICAgICAgICBjb25zdCBrVmFsID0gY3VycmVudE1hcC5nZXQoXCJrXCIpO1xuLy9cbi8vICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaUFycmF5KSB8fCB0eXBlb2Yga1ZhbCAhPT0gJ251bWJlcicpIHtcbi8vICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ2knIG11c2kgYnlcdTAxMDcgdGFibGljXHUwMTA1LCBhICdrJyBsaWN6Ylx1MDEwNS5cIik7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIHJldHVybiBpQXJyYXkubWFwKHZhbF9pID0+ICh2YWxfaSBhcyBudW1iZXIpICsgKGtWYWwgYXMgbnVtYmVyKSk7XG4vLyAgICB9XG4vLyAgfVxuLy9dO1xuLy9cbi8vLy8gV3l3b1x1MDE0MmFuaWUgZnVua2NqaSBFeGNlbFxuLy9jb25zdCBBMSA9IEV4Y2VsKGlucHV0cywgY2FsY3VsYXRpb25zKTtcbi8vXG4vLy8vIFd5XHUwMTVCd2lldGxlbmllIHd5bmlrXHUwMEYzd1xuLy9jb25zb2xlLmxvZyhcIkNhXHUwMTQyYSBtYXBhIEExOlwiLCBBMSk7XG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdpJyk6XCIsIEExLmdldChcImlcIikpO1xuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaicpOlwiLCBBMS5nZXQoXCJqXCIpKTtcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2lqX3N1bScpOlwiLCBBMS5nZXQoXCJpal9zdW1cIikpOyAvLyBPY3pla2l3YW5lOiBbMiwgNSwgNSwgMTEsIDExLCAxMSwgMTFdXG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdrJyk6XCIsIEExLmdldChcImtcIikpOyAgICAgICAgIC8vIE9jemVraXdhbmU6IDEwMFxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaV9wbHVzX2snKTpcIiwgQTEuZ2V0KFwiaV9wbHVzX2tcIikpOyAvLyBPY3pla2l3YW5lOiBbMTAxLCAxMDIsIDEwMywgMTA0LCAxMDUsIDEwNiwgMTA3XVxuLy9jb25zb2xlLmxvZyhcIldhcnRvXHUwMTVCXHUwMTA3IGlbM10gKGluZGVrcyAzLCBjenlsaSBjendhcnR5IGVsZW1lbnQpOlwiLCAoQTEuZ2V0KFwiaVwiKSBhcyBudW1iZXJbXSlbM10pOyAvLyBPY3pla2l3YW5lOiA0XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGZsb29yTG9nMih4Om51bWJlcik6bnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5sb2cyKHgpKTtcbn1cblxuLy8gIHRvIGtsYXN5Y3puYSBwb3RcdTAxMTlnYSBkd1x1MDBGM2praS5cbmV4cG9ydCBmdW5jdGlvbiBwb3cyKHg6bnVtYmVyKTpudW1iZXIge1xuICByZXR1cm4gTWF0aC5wb3coMix4KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwb3cyQWZmaW5lKFxuICBhOiBudW1iZXIsXG4gIGI6IG51bWJlcixcbiAgYzogbnVtYmVyLFxuICB4OiBudW1iZXIsXG4gIGY/OiAodmFsOiBudW1iZXIpID0+IG51bWJlciAvLyBPcGNqb25hbG55IGFyZ3VtZW50IGNhbGxiYWNrXG4pOiBudW1iZXIge1xuICBjb25zdCBwcm9jZXNzZWRYID0gZiA/IGYoeCkgOiB4OyAvLyBKZVx1MDE1QmxpIGYgaXN0bmllamUsIHphc3Rvc3VqIGplIGRvIHgsIHcgcHJ6ZWNpd255bSByYXppZSB1XHUwMTdDeWogeFxuICByZXR1cm4gYSAqIDIgKiogKHByb2Nlc3NlZFggKyBiKSArIGM7XG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gcG93MkFmZmluZSh4OiBudW1iZXIsIGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gYSAqIDIgKiogKHggKyBiKSArIGM7XG59XG4qL1xuXG4vLyAgd2FsdWFjamEgZHd1LWFkeWN6bmEgbGljemJ5IG5hdHVyYWxuZWogZG9kYXRuaWVqIFxuLy8gIGN6eWxpIG5handpXHUwMTE5a3N6XHUwMTA1IHBvdFx1MDExOWdcdTAxMTkgbGljemJ5IDIsIGt0XHUwMEYzcmEgZHppZWxpIHhcbi8vICBtYXBsZSBgayA6PSB4IC0+IGlsb2cyKHggLSBCaXRzW0FuZF0oeCwgeCAtIDEpKWBcbi8vICBrKHgpPW9yZF8yKHgpXG4vLyAgQ3p5bGk6IGlsZSByYXp5IHggbW9cdTAxN0NuYSBwb2R6aWVsaVx1MDEwNyBwcnpleiAyLCB6YW5pbSBwcnplc3RhbmllIGJ5XHUwMTA3IGNhXHUwMTQya293aXRlIFxuLy8gIChsdWIsIHJcdTAwRjN3bm96bmFjem5pZSwgcG96eWNqYSBuYWptXHUwMTQyb2RzemVnbyB1c3Rhd2lvbmVnbyBiaXR1IHcgeCkuXG5leHBvcnQgZnVuY3Rpb24gdmFsMkFkaWMoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHggPD0gMCB8fCAhTnVtYmVyLmlzSW50ZWdlcih4KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IG11c2kgYnlcdTAxMDcgZG9kYXRuaVx1MDEwNSBsaWN6Ylx1MDEwNSBjYVx1MDE0Mmtvd2l0XHUwMTA1LlwiKTtcbiAgfVxuICByZXR1cm4gTWF0aC5sb2cyKHggJiAteCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3cyQWZmaW5lX3ZhbDJBZGljKHg6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBhICogMiAqKiAodmFsMkFkaWMoeCkgKyBiKSArIGM7XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBpc05vdFZhbE5hdHVyYWxQb3ModmFsOnVua25vd24pOmJvb2xlYW4ge1xuICByZXR1cm4gKHR5cGVvZiB2YWwgIT09IFwibnVtYmVyXCIgfHwgaXNOYU4odmFsKSB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWwpIHx8XG4gIHZhbCA8PSAwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVybyh2YWw6dW5rbm93bik6Ym9vbGVhbiB7XG4gIHJldHVybiAodHlwZW9mIHZhbCAhPT0gXCJudW1iZXJcIiB8fCBpc05hTih2YWwpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbCkgfHxcbiAgdmFsIDwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0U29tTm90T2ZWYWxzQXJyYXkodjpzdHJpbmcsIGFycjp1bmtub3duLCB0ZXN0OlwiaXNOb3RWYWxOYXR1cmFsUG9zXCJ8XCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTp2b2lkIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgWm1pZW5uZSAke3Z9ICBtdXN6XHUwMTA1IGJ5XHUwMTA3IHRhYmxpY2FtaS5gLFxuICAgICk7XG4gIH1cbiAgc3dpdGNoICh0ZXN0KSB7XG4gICAgY2FzZSBcImlzTm90VmFsTmF0dXJhbFBvc1wiOlxuICAgICAgaWYgKGFyci5zb21lKGlzTm90VmFsTmF0dXJhbFBvcykpIHt0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFdzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY3kgJHt2fSBtdXN6XHUwMTA1IGJ5XHUwMTA3IGxpY3piYW1pIG5hdHVyYWxueW1pIGRvZGF0bmltaSAod2lcdTAxMTlrc3p5bWkgb2QgMCkuYCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiOlxuICAgICAgaWYgKGFyci5zb21lKGlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvKSkge3Rocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFdzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY3kgJHt2fSBtdXN6XHUwMTA1IGJ5XHUwMTA3IGxpY3piYW1pIG5hdHVyYWxueW1pIGRvZGF0bmltaSB6IHplcm8gKHdpXHUwMTE5a3N6eW1pIG9kIC0xKS5gLFxuICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59XG4iLCAiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cblxuaW1wb3J0IHsgSlNYIH0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44XCI7XG5cbi8vIFphXHUwMTQyXHUwMEYzXHUwMTdDbXksIFx1MDE3Q2UgdGUgdHlweSBzXHUwMTA1IHpkZWZpbmlvd2FuZSBnbG9iYWxuaWUgbHViIGltcG9ydG93YW5lXG4vLyBKZVx1MDE1QmxpIG5pZSwgb2Rrb21lbnR1aiBqZSBsdWIgcHJ6ZW5pZVx1MDE1QiBkbyB3c3BcdTAwRjNsbmVnbyBwbGlrdSB0eXBcdTAwRjN3LlxudHlwZSBOZXN0ZWROdW1iZXJBcnJheSA9IG51bWJlciB8IE5lc3RlZE51bWJlckFycmF5W107XG50eXBlIEV4Y2VsUmVzdWx0cyA9IE1hcDxzdHJpbmcsIE5lc3RlZE51bWJlckFycmF5PjtcblxuaW50ZXJmYWNlIFBsb3RFeGNlbFByb3BzIHtcbiAgZGF0YTogRXhjZWxSZXN1bHRzO1xuICB0eXBlOiBcInJvd1wiIHwgXCJjb2xcIjsgLy8gT3JpZW50YWNqYSB0YWJlbGk6IFwicm93XCIgKGRhbmUgdyB3aWVyc3phY2gpLCBcImNvbFwiIChkYW5lIHcga29sdW1uYWNoKVxuICBjYXB0aW9uPzogc3RyaW5nOyAvLyBPcGNqb25hbG55IHBvZHBpcyB0YWJlbGlcbiAgdGFibGVDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSB0YWJlbGlcbiAgdGhDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSBrb21cdTAwRjNyZWsgdGhcbiAgdGRDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSBrb21cdTAwRjNyZWsgdGRcbn1cblxuLy8gRnVua2NqYSBwb21vY25pY3phIGRvIGZvcm1hdG93YW5pYSB3YXJ0b1x1MDE1QmNpIGtvbVx1MDBGM3JraVxuY29uc3QgZm9ybWF0Q2VsbFZhbHVlID0gKHZhbHVlOiBOZXN0ZWROdW1iZXJBcnJheSB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIERsYSB6YWduaWVcdTAxN0NkXHUwMTdDb255Y2ggdGFibGljLCBKU09OLnN0cmluZ2lmeSBtb1x1MDE3Q2UgYnlcdTAxMDcgZG9icnltIHJvendpXHUwMTA1emFuaWVtLlxuICAgIC8vIERsYSBwXHUwMTQyYXNraWNoIHRhYmxpYyBsaWN6YiwgbW9cdTAxN0NuYSB1XHUwMTdDeVx1MDEwNyB2YWx1ZS5qb2luKCcsICcpLlxuICAgIC8vIFR1dGFqIHd5YmllcmFteSBKU09OLnN0cmluZ2lmeSBkbGEgb2dcdTAwRjNsbm9cdTAxNUJjaS5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gXCJbQlx1MDE0Mlx1MDEwNWQgc2VyaWFsaXphY2ppIHRhYmxpY3ldXCI7XG4gICAgfVxuICB9XG4gIHJldHVybiBTdHJpbmcodmFsdWUpOyAvLyBGYWxsYmFja1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFBsb3RFeGNlbChcbiAgeyBkYXRhLCB0eXBlLCBjYXB0aW9uLCB0YWJsZUNsYXNzTmFtZSwgdGhDbGFzc05hbWUsIHRkQ2xhc3NOYW1lIH06XG4gICAgUGxvdEV4Y2VsUHJvcHMsXG4pOiBKU1guRWxlbWVudCB8IG51bGwge1xuICBpZiAoIWRhdGEgfHwgZGF0YS5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuIDxwPkJyYWsgZGFueWNoIGRvIHd5XHUwMTVCd2lldGxlbmlhLjwvcD47IC8vIEx1YiBudWxsLCBqZVx1MDE1QmxpIG5pZSBjaGNlc3ogbmljIHJlbmRlcm93YVx1MDEwN1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IEFycmF5LmZyb20oZGF0YS5rZXlzKCkpO1xuXG4gIC8vIFVzdGFsZW5pZSBtYWtzeW1hbG5laiBkXHUwMTQydWdvXHUwMTVCY2kgc2VyaWkgZGFueWNoIChkbGEgd3lyXHUwMEYzd25hbmlhIHRhYmVsaSlcbiAgbGV0IG1heExlbmd0aCA9IDA7XG4gIGxldCBoYXNBbnlEYXRhID0gZmFsc2U7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGRhdGEuZ2V0KGtleSk7XG4gICAgaGFzQW55RGF0YSA9IHRydWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBtYXhMZW5ndGggPSBNYXRoLm1heChtYXhMZW5ndGgsIHZhbHVlLmxlbmd0aCk7XG4gICAgfVxuICB9XG4gIC8vIEplXHUwMTVCbGkgc1x1MDEwNSBkYW5lLCBhbGUgbmllIG1hIHRhYmxpYyAobnAuIHNhbWUgc2thbGFyeSkgbHViIHdzenlzdGtpZSB0YWJsaWNlIHNcdTAxMDUgcHVzdGUsXG4gIC8vIHRvIGthXHUwMTdDZGEgc2VyaWEgbWEgZWZla3R5d25pZSBcImRcdTAxNDJ1Z29cdTAxNUJcdTAxMDdcIiAxLlxuICBpZiAoaGFzQW55RGF0YSAmJiBtYXhMZW5ndGggPT09IDApIHtcbiAgICBtYXhMZW5ndGggPSAxO1xuICB9XG4gIGlmIChtYXhMZW5ndGggPT09IDAgJiYga2V5cy5sZW5ndGggPiAwKSB7IC8vIEplXHUwMTVCbGkgc1x1MDEwNSBrbHVjemUsIGFsZSBicmFrIGRhbnljaCAobnAuIG1hcG93YW5pZSBuYSB1bmRlZmluZWQpXG4gICAgbWF4TGVuZ3RoID0gMTsgLy8gUG9rYVx1MDE3QyBwcnp5bmFqbW5pZWogbmFnXHUwMTQyXHUwMEYzd2tpXG4gIH1cblxuICBpZiAodHlwZSA9PT0gXCJjb2xcIikge1xuICAgIC8vIFN0YW5kYXJkb3dhIHRhYmVsYToga2x1Y3plIG1hcHkgamFrbyBuYWdcdTAxNDJcdTAwRjN3a2kga29sdW1uXG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RhYmxlQ2xhc3NOYW1lfT5cbiAgICAgICAge2NhcHRpb24gJiYgPGNhcHRpb24+e2NhcHRpb259PC9jYXB0aW9uPn1cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtrZXlzLm1hcCgoa2V5KSA9PiAoXG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e3RoQ2xhc3NOYW1lfSBrZXk9e2tleX0+XHUzMDEwe2tleX1cdTMwMTE8L3RoPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXhMZW5ndGggfSkubWFwKChfLCByb3dJbmRleCkgPT4gKFxuICAgICAgICAgICAgPHRyIGtleT17YHJvdy0ke3Jvd0luZGV4fWB9PlxuICAgICAgICAgICAgICB7a2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlcmllcyA9IGRhdGEuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxDb250ZW50OiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlcmllcykpIHtcbiAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllc1tyb3dJbmRleF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kZXggPT09IDApIHsgLy8gV2FydG9cdTAxNUJcdTAxMDcgc2thbGFybmEsIHd5XHUwMTVCd2lldGwgdHlsa28gdyBwaWVyd3N6eW0gd2llcnN6dVxuICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e3RkQ2xhc3NOYW1lfSBrZXk9e2Ake2tleX0tcm93LSR7cm93SW5kZXh9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtjZWxsQ29udGVudH1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicm93XCIpIHtcbiAgICAvLyBUYWJlbGEgdHJhbnNwb25vd2FuYToga2x1Y3plIG1hcHkgamFrbyBuYWdcdTAxNDJcdTAwRjN3a2kgd2llcnN6eVxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXsncGxvdC1yb3ctZGF0YTEgJysgdGFibGVDbGFzc05hbWV9PlxuICAgICAgICB7Y2FwdGlvbiAmJiA8Y2FwdGlvbj57Y2FwdGlvbn08L2NhcHRpb24+fVxuICAgICAgICB7LyogTW9cdTAxN0NuYSBkb2RhXHUwMTA3IDx0aGVhZD4geiBuYWdcdTAxNDJcdTAwRjN3a2FtaSBrb2x1bW4sIGplXHUwMTVCbGkgc1x1MDEwNSBwb3RyemVibmUsIG5wLiBcIlBhcmFtZXRyXCIsIFwiV2FydG9cdTAxNUJcdTAxMDcgMVwiLCBcIldhcnRvXHUwMTVCXHUwMTA3IDJcIiwgLi4uICovfVxuICAgICAgICB7LyogRGxhIHVwcm9zemN6ZW5pYSwgcG9taWphbXkgPHRoZWFkPiB0dXRhaiwgYSBwaWVyd3N6eSA8dGg+IHcga2FcdTAxN0NkeW0gd2llcnN6dSBkemlhXHUwMTQyYSBqYWtvIG5hZ1x1MDE0Mlx1MDBGM3dlayB3aWVyc3phICovfVxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge2tleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlcmllcyA9IGRhdGEuZ2V0KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8dHIga2V5PXtgc2VyaWVzLXJvdy0ke2tleX1gfT5cbiAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJyb3dcIiBjbGFzc05hbWU9e3RoQ2xhc3NOYW1lfT5cdTMwMTB7a2V5fVx1MzAxMTwvdGg+e1wiIFwifVxuICAgICAgICAgICAgICAgIHsvKiBOYWdcdTAxNDJcdTAwRjN3ZWsgd2llcnN6YSAqL31cbiAgICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogbWF4TGVuZ3RoIH0pLm1hcCgoXywgY29sSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCBjZWxsQ29udGVudDogc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlcmllcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzW2NvbEluZGV4XSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbEluZGV4ID09PSAwKSB7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHNrYWxhcm5hLCB3eVx1MDE1QndpZXRsIHR5bGtvIHcgcGllcndzemVqIGtvbHVtbmllIGRhbnljaFxuICAgICAgICAgICAgICAgICAgICBjZWxsQ29udGVudCA9IGZvcm1hdENlbGxWYWx1ZShzZXJpZXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17dGRDbGFzc05hbWV9IGtleT17YCR7a2V5fS1jb2wtJHtjb2xJbmRleH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2VsbENvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8cD5OaWVwcmF3aWRcdTAxNDJvd3kgdHlwIHRhYmVsaToge3R5cGV9PC9wPjsgLy8gRmFsbGJh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Z0JBQUFBLEtBQUMsUUFBRyxpREFBZTtBQUFBLFlBQ25CLGdCQUFBQSxLQUFDLFFBQUcsMkRBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLDJEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRyw2Q0FBVztBQUFBLFlBQ2YsZ0JBQUFBLEtBQUMsUUFBRyw2Q0FBVztBQUFBLGFBQ2pCLEdBQ0Y7QUFBQTtBQUFBO0FBQUEsSUFDRjtBQUFBLElBQ0MsUUFBUSxNQUFNLE9BQU8sS0FDcEIsZ0JBQUFDLE1BQUFGLFdBQUEsRUFTRTtBQUFBLHNCQUFBQyxLQUFDLFFBQUc7QUFBQSxNQUNKLGdCQUFBQSxLQUFDLFFBQUcscUNBQWtCO0FBQUEsTUFDdEIsZ0JBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxnQkFBZTtBQUFBLFVBQ2YsTUFBTSxRQUFRO0FBQUEsVUFDZCxNQUFLO0FBQUEsVUFDTCxTQUFRO0FBQUE7QUFBQSxNQUNWO0FBQUEsT0FDRjtBQUFBLEtBRUo7QUFFSjs7O0FEbFhPLGdCQUFBRSxZQUFBO0FBQVAsT0FBTyxnQkFBQUEsS0FBQyxPQUFJLEdBQUksU0FBUyxlQUFlLE1BQU0sQ0FBRTsiLAogICJuYW1lcyI6IFsianN4IiwgImpzeHMiLCAiRnJhZ21lbnQiLCAianN4IiwgImpzeHMiLCAianN4Il0KfQo=
