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
    return /* @__PURE__ */ jsxs2("table", { className: tableClassName, children: [
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
          data: resultM.value,
          type: "row",
          caption: "Wyniki oblicze\u0144 (transponowane)"
        }
      )
    ] })
  ] });
}

// docs/main.tsx
import { jsx as jsx4 } from "https://esm.sh/preact@10.26.8/jsx-runtime";
render(/* @__PURE__ */ jsx4(App, {}), document.getElementById("root"));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50c3giLCAiYXBwLnRzeCIsICJ1aS9JbnB1dE51bWJlci50c3giLCAibG9naWMvY2FsY3VsYXRlRXhjZWwudHMiLCAibG9naWMvbWF0aEZ1bmMudHMiLCAidWkvUGxvdEV4Y2VsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOFwiO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwLnRzeFwiO1xuLy9hYVxucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSEpO1xuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXG5pbXBvcnQgeyBzaWduYWwsIHVzZVNpZ25hbCB9IGZyb20gXCJodHRwczovL2VzbS5zaC9AcHJlYWN0L3NpZ25hbHNAMi4yLjBcIjtcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSBcIi4vdWkvSW5wdXROdW1iZXIudHN4XCI7IC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2UgXHUwMTVCY2llXHUwMTdDa2EgamVzdCBwb3ByYXduYVxuaW1wb3J0IHtcbiAgRXhjZWwsXG4gIHR5cGUgRXhjZWxOZXN0ZWROLFxuICB0eXBlIEV4Y2VsUmVzdWx0cyxcbiAgdHlwZSBFeGNlbFNldHNHZXQsXG4gIHR5cGUgRXhjZWxTZXRzU2V0LFxuICBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0LFxuICAvL2luaXRSYW5nZUZpcnN0U3RlcFNpemUsXG59IGZyb20gXCIuL2xvZ2ljL2NhbGN1bGF0ZUV4Y2VsLnRzXCI7XG5pbXBvcnQgKiBhcyBNYXRoRiBmcm9tIFwiLi9sb2dpYy9tYXRoRnVuYy50c1wiO1xuaW1wb3J0IHsgUGxvdEV4Y2VsIH0gZnJvbSBcIi4vdWkvUGxvdEV4Y2VsLnRzeFwiO1xuXG4vL2NvbnN0IHJlc3VsdE0gPSBzaWduYWw8RXhjZWxSZXN1bHRzPihuZXcgTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROPigpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgZnJvbSA9IHVzZVNpZ25hbCgxKTtcbiAgY29uc3QgdG8gPSB1c2VTaWduYWwoMTApO1xuICBjb25zdCByZXN1bHRNID0gdXNlU2lnbmFsPEV4Y2VsUmVzdWx0cz4obmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTj4oKSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlID0gKCkgPT4ge1xuICAgIC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2Ugd2FydG9cdTAxNUJjaSBzXHUwMTA1IGxpY3piYW1pIHByemVkIHBcdTAxMTl0bFx1MDEwNVxuICAgIGlmIChpc05hTihOdW1iZXIoZnJvbS52YWx1ZSkpIHx8IGlzTmFOKE51bWJlcih0by52YWx1ZSkpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiV2FydG9cdTAxNUJjaSAnZnJvbScgbHViICd0bycgbmllIHNcdTAxMDUgbGljemJhbWkuXCIpO1xuICAgICAgcmVzdWx0TS52YWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0aEVudGVyOiBFeGNlbFNldHNTZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImlcIixcbiAgICAgICAgdmFsOiBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0KE51bWJlcihmcm9tLnZhbHVlKSwgMSwgTnVtYmVyKHRvLnZhbHVlKSksXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgbWF0aENhbGNzOiBFeGNlbFNldHNHZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoQVwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaFwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXG4gICAgICAgICAgICBcImhcIixcbiAgICAgICAgICAgIGhfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gaF9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2gnLGhfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik7IVxuXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUodmFsX2ggYXMgbnVtYmVyLCAxLCAwLCAwKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwiaFpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoXCIsXG4gICAgICAgICAgICBoX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBoX19BcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMSwgMSwgLTEpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoQVpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoXCIsXG4gICAgICAgICAgICBoX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBoX19BcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMS41LCAxLCAtMSlcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhpXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIGNvbnN0IGhBX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhBXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcbiAgICAgICAgICAgIFwiaEFcIixcbiAgICAgICAgICAgIGhBX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAtIGhBX19BcnJheVtpbmRleF1cbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIGNvbnN0IGhaX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhaXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcbiAgICAgICAgICAgIFwiaFpcIixcbiAgICAgICAgICAgIGhaX19BcnJheSxcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICBoWl9fQXJyYXlbaW5kZXhdIC0gKHZhbF9pIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG5cbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXG5cbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpLCAxLjUsIDEsIC0xKSAtXG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwia2lcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnZhbDJBZGljKHZhbF9pIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImtqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi52YWwyQWRpYyh2YWxfaiBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJraUFcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2kgYXMgbnVtYmVyLCAxLCAwLCAwKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwia2pBXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9qIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImxpXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImxqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAodmFsX2ogYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9qIGFzIG51bWJlciwgMSwgMCwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcIm1pXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAoKHZhbF9pIGFzIG51bWJlcikgL1xuICAgICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMCkpICsgMVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwid2pcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBqX19BcnJheSA9IGN1cnJlbnRNLmdldChcImpcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwialwiLCBqX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGpfX0FycmF5Lm1hcCgodmFsX2osIF9pbmRleCkgPT5cbiAgICAgICAgICAgICgodmFsX2ogYXMgbnVtYmVyKSAvXG4gICAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2ogYXMgbnVtYmVyLCAxLCAwLCAwKSkgKyAyXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICByZXN1bHRNLnZhbHVlID0gRXhjZWwobWF0aEVudGVyLCBtYXRoQ2FsY3MpO1xuICB9O1xuXG4gIC8vIEhhbmRsZXIgZGxhIG9uVmFsdWVDaGFuZ2UsIGt0XHUwMEYzcnkgb2R6d2llcmNpZWRsYSB6YWNob3dhbmllIGArKGUuY3VycmVudFRhcmdldC52YWx1ZSlgXG4gIC8vIEtpZWR5IGlucHV0IGplc3QgcHVzdHksIGBlLmN1cnJlbnRUYXJnZXQudmFsdWVgIHRvIFwiXCIsIGEgYCtcIlwiYCB0byAwLlxuICAvLyBOYXN6IGBvblZhbHVlQ2hhbmdlYCBwcnpla2F6dWplIGB1bmRlZmluZWRgLCBnZHkgYHZhbHVlQXNOdW1iZXJgIHRvIE5hTiAobnAuIGRsYSBwdXN0ZWdvIGlucHV0dSkuXG4gIGNvbnN0IGhhbmRsZUZyb21DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBmcm9tLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb20udmFsdWUgPSAwOyAvLyBMdWIgaW5uYSB3YXJ0b1x1MDE1Qlx1MDEwNyBkb215XHUwMTVCbG5hLCBucC4gMSwgamVcdTAxNUJsaSB0byBiYXJkemllaiBzZW5zb3duZVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVUb0NoYW5nZSA9IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRvLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvLnZhbHVlID0gMDsgLy8gTHViIGlubmEgd2FydG9cdTAxNUJcdTAxMDcgZG9teVx1MDE1QmxuYVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluPlxuICAgICAgPGgxPk1hdGVtYXR5a2EgdyBnZW5lYWxvZ2lpLjwvaDE+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgYWxpZ25JdGVtczogXCJzdHJldGNoXCIsXG4gICAgICAgICAgZ2FwOiBcIjQwcHhcIixcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBweFwiLFxuICAgICAgICAgIGZsZXhGbG93OiBcInJvdyBub3dyYXBcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e2NhbGN1bGF0ZX1cbiAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjAuNXJlbSAxcmVtXCIsIGZvbnRTaXplOiBcIjFyZW1cIiB9fVxuICAgICAgICA+XG4gICAgICAgICAgUG9saWN6XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZmllbGRzZXRcbiAgICAgICAgICBjbGFzcz1cImZpZWxkc2V0LWlucHV0cy1udW1iZXJcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBib3JkZXI6IFwiM3B4IHNvbGlkICM2Yzc1N2RcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMjBweFwiLFxuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjBcIixcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIwXCIsXG4gICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiZmxleC1zdGFydFwiLFxuICAgICAgICAgICAgZ2FwOiBcIjQwcHhcIixcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPGxlZ2VuZFxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICBwYWRkaW5nOiBcIjNweCA2cHhcIixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2hvb3NlIHJhbmdlIG9mIFx1MzAxMGlcdTMwMTFcbiAgICAgICAgICA8L2xlZ2VuZD5cblxuICAgICAgICAgIDxJbnB1dE51bWJlclxuICAgICAgICAgICAgbmFtZT1cImlucHV0MVwiXG4gICAgICAgICAgICB2YWx1ZT17ZnJvbS52YWx1ZX1cbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZUZyb21DaGFuZ2V9XG4gICAgICAgICAgICBkZWY9ezF9XG4gICAgICAgICAgICBtaW49ezF9IC8vIGxvZzIgamVzdCB6ZGVmaW5pb3dhbnkgZGxhIGxpY3piID4gMFxuICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT2RcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIldhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBwcnplZHppYVx1MDE0MnVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPElucHV0TnVtYmVyXG4gICAgICAgICAgICBuYW1lPVwiaW5wdXQyXCJcbiAgICAgICAgICAgIHZhbHVlPXt0by52YWx1ZX1cbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVRvQ2hhbmdlfVxuICAgICAgICAgICAgZGVmPXs3fVxuICAgICAgICAgICAgbWluPXtmcm9tLnZhbHVlID49IDEgPyBmcm9tLnZhbHVlIDogMX0gLy8gJ3RvJyBuaWUgcG93aW5ubyBieVx1MDEwNyBtbmllanN6ZSBuaVx1MDE3QyAnZnJvbSdcbiAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRvXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXYXJ0b1x1MDE1Qlx1MDEwNyBrb1x1MDE0NGNvd2EgcHJ6ZWR6aWFcdTAxNDJ1XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICA8cD5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaFx1MzAxMSA9IGZsb29yKGxvZ1x1MjA4MihpKSkgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2ldPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVx1MzAxMSA9IDIqKmggfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoWlx1MzAxMSA9IDIqKihoKzEpLTEgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVpcdTMwMTEgPTMqMioqaC0xID0gMS41KjIqKihoKzEpLTEgfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoaVx1MzAxMSA9XHUzMDEwaVx1MzAxMSAtXHUzMDEwaEFcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGhqXHUzMDExID1cdTMwMTBoWlx1MzAxMSAtXHUzMDEwaVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwalx1MzAxMSA9XHUzMDEwaEFaXHUzMDExIC1cdTMwMTBpXHUzMDExPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgXHUzMDEwa2lcdTMwMTEgPSB3YWx1YWNqYSBkd3UtYWR5Y3puYSBsaWN6YnkgbmF0dXJhbG5laiBkb2RhdG5pZWogW2ldXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICBcdTMwMTBralx1MzAxMSA9IHdhbHVhY2phIGR3dS1hZHljem5hIGxpY3pieSBuYXR1cmFsbmVqIGRvZGF0bmllaiBbal1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwa2lBXHUzMDExID0gMioqXHUzMDEwa2lcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGtqQVx1MzAxMSA9IDIqKlx1MzAxMGtqXHUzMDExPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBsaVx1MzAxMSA9XHUzMDEwaVx1MzAxMS9cdTMwMTBraUFcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGxqXHUzMDExID1cdTMwMTBqXHUzMDExL1x1MzAxMGtqQVx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwbVx1MzAxMSA9XHUzMDEwbGlcdTMwMTErMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwd1x1MzAxMSA9XHUzMDEwbGpcdTMwMTErMjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICB7cmVzdWx0TS52YWx1ZS5zaXplID4gMCAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge1xuICAgICAgICAgICAgLyo8aDM+VGFiZWxhIHN0YW5kYXJkb3dhICh0eXBlPVwiY29sXCIpOjwvaDM+XG4gICAgICAgICAgPFBsb3RFeGNlbFxuICAgICAgICAgICAgZGF0YT17cmVzdWx0TS52YWx1ZX1cbiAgICAgICAgICAgIHR5cGU9XCJjb2xcIlxuICAgICAgICAgICAgY2FwdGlvbj1cIld5bmlraSBvYmxpY3plXHUwMTQ0XCJcbiAgICAgICAgICAvPiovXG4gICAgICAgICAgfVxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxoMz5SZXp1bHRhdCBvYmxpY3plXHUwMTQ0OjwvaDM+XG4gICAgICAgICAgPFBsb3RFeGNlbFxuICAgICAgICAgICAgZGF0YT17cmVzdWx0TS52YWx1ZX1cbiAgICAgICAgICAgIHR5cGU9XCJyb3dcIlxuICAgICAgICAgICAgY2FwdGlvbj1cIld5bmlraSBvYmxpY3plXHUwMTQ0ICh0cmFuc3Bvbm93YW5lKVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiIsICIvKiogQGpzeFJ1bnRpbWUgYXV0b21hdGljICovXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xuXG5pbXBvcnQge1xuICB1c2VDYWxsYmFjayxcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG59IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOC9ob29rc1wiO1xuaW1wb3J0IHsgSlNYIH0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44XCI7XG5cbi8vIFphd2FydG9cdTAxNUJcdTAxMDcgU1ZHIGRsYSBkb215XHUwMTVCbG55Y2ggaWtvbiArLy0gKGplXHUwMTVCbGkgemRlY3lkdWplc3ogc2lcdTAxMTkgamUgbmFrXHUwMTQyYWRhXHUwMTA3KVxuLy8gTmEgcmF6aWUgbmllIHNcdTAxMDUgb25lIGF1dG9tYXR5Y3puaWUgcmVuZGVyb3dhbmUgdyB0ZWogd2Vyc2ppLFxuLy8gcG9uaWV3YVx1MDE3QyB6YWtcdTAxNDJhZGFtLCBcdTAxN0NlIFR3XHUwMEYzaiBnXHUwMTQyXHUwMEYzd255IFNWRyBkZWZpbml1amUgd3lnbFx1MDEwNWQgcHJ6eWNpc2tcdTAwRjN3LlxuLy8gSmVcdTAxNUJsaSBjaGNlc3ogamUgZG9kYVx1MDEwNywgbXVzaXN6IHByenl3clx1MDBGM2NpXHUwMTA3IGxvZ2lrXHUwMTE5IGljaCByZW5kZXJvd2FuaWEgeiB0cmFuc2Zvcm1hY2phbWkuXG5jb25zdCBEZWZhdWx0RGVjcmVtZW50SWNvblN2Z0NvbnRlbnQgPSAoXG4gIDxyZWN0IHg9XCI1XCIgeT1cIjExXCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiAvPlxuKTtcbmNvbnN0IERlZmF1bHRJbmNyZW1lbnRJY29uU3ZnQ29udGVudCA9IChcbiAgPD5cbiAgICA8cmVjdCB4PVwiMTFcIiB5PVwiNVwiIHdpZHRoPVwiMlwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgLz5cbiAgICA8cmVjdCB4PVwiNVwiIHk9XCIxMVwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgLz5cbiAgPC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIElucHV0TnVtYmVyUHJvcHMge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgZGVmYXVsdFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBkZWY/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG1pbj86IHN0cmluZyB8IG51bWJlcjtcbiAgbWF4Pzogc3RyaW5nIHwgbnVtYmVyO1xuICBzdGVwPzogc3RyaW5nIHwgbnVtYmVyO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIG9uQ2hhbmdlPzogKGV2ZW50OiBKU1guVGFyZ2V0ZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBFdmVudD4pID0+IHZvaWQ7XG4gIG9uVmFsdWVDaGFuZ2U/OiAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCwgbmFtZT86IHN0cmluZykgPT4gdm9pZDtcbiAgcmF0aW9TSVpFPzogbnVtYmVyO1xuICB3cmFwcGVyQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdmdDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGlucHV0Q2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBzZWxlY3RCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBpbmNyZW1lbnRCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBkZWNyZW1lbnRCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBpbnB1dEFyZWFTdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBzZWxlY3RCdXR0b25GaWxsPzogc3RyaW5nO1xuICBpbmNyZW1lbnRCdXR0b25GaWxsPzogc3RyaW5nO1xuICBkZWNyZW1lbnRCdXR0b25GaWxsPzogc3RyaW5nO1xuICBpbnB1dEFyZWFSZWN0RmlsbD86IHN0cmluZztcbiAgaW5wdXRBcmVhQm9yZGVyRmlsbD86IHN0cmluZztcbiAgLy8gaWNvbkZpbGw/OiBzdHJpbmc7IC8vIEplXHUwMTVCbGkgYlx1MDExOWR6aWVzeiB1XHUwMTdDeXdhXHUwMTQyIG9zb2JueWNoIGlrb24gKy8tXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuY29uc3Qgc3ZnTGF5b3V0RGF0YSA9IHtcbiAgYmFzZVZpZXdCb3hXaWR0aDogMTc0LFxuICBiYXNlVmlld0JveEhlaWdodDogNzIsXG4gIGJ1dHRvbnM6IHtcbiAgICBjaG9vc2U6IHsgLy8gWm1pZW5pb25vIHogJ3NlbGVjZWN0JyBuYSAnY2hvb3NlJyBkbGEgc3BcdTAwRjNqbm9cdTAxNUJjaSB6IFR3b2ltIEhUTUxcbiAgICAgIG5hbWU6IFwiYnRuLWNob29zZVwiLFxuICAgICAgcGF0aHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTE1Ljc1LDcxLjYyYy0xMC4wMywwLTE5LjkzLTEuNjItMjguNjMtNC42N2wtLjEyLS4wNC0uMTIuMDRjLTguNywzLjA2LTE4LjU5LDQuNjctMjguNjMsNC42Ny0xMy4wNiwwLTI1LjgxLTIuNzUtMzYuMDItNy43NWwyNi45Ni0xNS4yMWg3NS42MWwyNi45NiwxNS4yMWMtMTAuMiw1LTIyLjk2LDcuNzUtMzYuMDIsNy43NVpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjOTE5MTkxXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tYm9yZGVyLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xMjQuNzEsNDkuMDRsMjYuMjUsMTQuODFjLTEwLjA0LDQuNzgtMjIuNDgsNy40LTM1LjIxLDcuNC05Ljk5LDAtMTkuODQtMS42MS0yOC41LTQuNjVsLS4yNS0uMDktLjI1LjA5Yy04LjY2LDMuMDQtMTguNTEsNC42NS0yOC41LDQuNjUtMTIuNzMsMC0yNS4xNi0yLjYyLTM1LjIxLTcuNGwyNi4yNS0xNC44MWg3NS40MU0xMjQuOSw0OC4yOUg0OS4xbC0yNy42NiwxNS42YzEwLjAzLDUuMDYsMjIuODUsOC4xMSwzNi44Miw4LjExLDEwLjQ2LDAsMjAuMjctMS43MSwyOC43NS00LjY5LDguNDgsMi45OCwxOC4yOSw0LjY5LDI4Ljc1LDQuNjksMTMuOTcsMCwyNi43OC0zLjA0LDM2LjgyLTguMTFsLTI3LjY2LTE1LjZoMFpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDpcbiAgICAgICAgICAgIFwiIzUwNTA1MFwiLCAvKiBLb2xvciBkbGEgb2JyeXN1L2RydWdpZWogd2Fyc3R3eSwgZG9zdG9zdWogKi9cbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBpbmNyZW1lbnQ6IHtcbiAgICAgIG5hbWU6IFwiYnRuLWluY3JlbWVudFwiLFxuICAgICAgcGF0aHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTI3LjM4LDQzLjUxVjEuMWMyNi44MywzLjM3LDQ2LjI1LDE4LjAxLDQ2LjI1LDM0LjksMCw5LjE5LTUuNjgsMTcuOTEtMTYuMDEsMjQuNTdsLTMwLjI0LTE3LjA2WlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiMyMTU5N2ZcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1ib3JkZXItZmlsbFwiLFxuICAgICAgICAgIGQ6IFwiTTEyNy43NSwxLjUzYzI2LjQyLDMuNDUsNDUuNSwxNy44Niw0NS41LDM0LjQ3LDAsOS01LjU1LDE3LjU2LTE1LjY1LDI0LjEzbC0yOS44NS0xNi44NFYxLjUzTTEyNywuNjh2NDMuMDVsMzAuNjMsMTcuMjhjMTAuMTMtNi40OCwxNi4zNy0xNS4yOSwxNi4zNy0yNS4wMSwwLTE3LjUtMjAuMjEtMzIuMDgtNDctMzUuMzJoMFpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjMTA0MDYwXCIsIC8qIENpZW1uaWVqc3p5IGRsYSBvYnJ5c3U/IERvc3Rvc3VqICovXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgaWNvbkFuY2hvclg6IDE1MCwgLy8gMTUwcHggdyBwcmF3byAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcbiAgICAgIGljb25BbmNob3JZOiAzMCwgLy8gMzBweCB3IGRcdTAwRjNcdTAxNDIgKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXG4gICAgfSxcbiAgICBkZWNyZW1lbnQ6IHtcbiAgICAgIG5hbWU6IFwiYnRuLWRlY3JlbWVudFwiLFxuICAgICAgcGF0aHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTYuMzgsNjAuNTdDNi4wNiw1My45MS4zOCw0NS4xOS4zOCwzNiwuMzgsMTkuMTEsMTkuOCw0LjQ3LDQ2LjYyLDEuMXY0Mi40MWwtMzAuMjQsMTcuMDZaXCIsXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiI2IyMTAxMFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWJvcmRlci1maWxsXCIsXG4gICAgICAgICAgZDogXCJNNDYuMjUsMS41M3Y0MS43Nmgwcy0yOS44NSwxNi44NC0yOS44NSwxNi44NEM2LjMsNTMuNTYuNzUsNDUsLjc1LDM2LC43NSwxOS4zOSwxOS44Myw0Ljk3LDQ2LjI1LDEuNTNNNDcsLjY4QzIwLjIxLDMuOTIsMCwxOC41LDAsMzZjMCw5LjcyLDYuMjQsMTguNTMsMTYuMzcsMjUuMDFsMzAuNjMtMTcuMjhWLjY4aDBaXCIsXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzgwMDAwMFwiLCAvKiBDaWVtbmllanN6eSBkbGEgb2JyeXN1PyBEb3N0b3N1aiAqL1xuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGljb25BbmNob3JYOiAyNSwgLy8gMjBweCB3IHByYXdvICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxuICAgICAgaWNvbkFuY2hvclk6IDMwLCAvLyAzMHB4IHcgZFx1MDBGM1x1MDE0MiAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcbiAgICB9LFxuICB9LFxuICBpbnB1dEFyZWE6IHtcbiAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgcmVjdDoge1xuICAgICAgeDogNTIuMzgsXG4gICAgICB5OiAwLjM4LFxuICAgICAgd2lkdGg6IDY5LjI1LFxuICAgICAgaGVpZ2h0OiA0Mi41NCxcbiAgICAgIGRlZmF1bHRGaWxsOiBcIiNmZmZcIixcbiAgICB9LFxuICAgIGJvcmRlclBhdGg6IHtcbiAgICAgIGQ6IFwiTTEyMS4yNS43NXY0MS43OUg1Mi43NVYuNzVoNjguNU0xMjIsMEg1MnY0My4yOWg3MFYwaDBaXCIsXG4gICAgICBkZWZhdWx0RmlsbDogXCIjMzMzXCIsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IENPTlRBSU5FUl9DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1jb250YWluZXJcIjtcbmNvbnN0IFNWR19DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1zdmdcIjtcbmNvbnN0IFNWR19CVVRUT05fQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItc3ZnLWJ1dHRvblwiOyAvLyBVXHUwMTdDeXdhbmUgdyBUd29pbSBIVE1MXG5jb25zdCBIVE1MX0lOUFVUX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLWh0bWwtaW5wdXRcIjsgLy8gVVx1MDE3Q3l3YW5lIHcgVHdvaW0gSFRNTFxuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXROdW1iZXIocHJvcHM6IElucHV0TnVtYmVyUHJvcHMpOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IHtcbiAgICB2YWx1ZSxcbiAgICBkZWZhdWx0VmFsdWUsXG4gICAgZGVmID0gMSxcbiAgICBtaW4sXG4gICAgbWF4LFxuICAgIHN0ZXAgPSAxLFxuICAgIHBsYWNlaG9sZGVyLFxuICAgIHJlcXVpcmVkLFxuICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgbmFtZSxcbiAgICBpZCxcbiAgICByZWFkT25seSA9IGZhbHNlLFxuICAgIG9uQ2hhbmdlLFxuICAgIG9uVmFsdWVDaGFuZ2UsXG4gICAgcmF0aW9TSVpFID0gMSxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lLFxuICAgIHN2Z0NsYXNzTmFtZSxcbiAgICBpbnB1dENsYXNzTmFtZSxcbiAgICBzdHlsZSxcbiAgICBzZWxlY3RCdXR0b25TdHlsZSxcbiAgICBpbmNyZW1lbnRCdXR0b25TdHlsZSxcbiAgICBkZWNyZW1lbnRCdXR0b25TdHlsZSxcbiAgICBpbnB1dEFyZWFTdHlsZSxcbiAgICBzZWxlY3RCdXR0b25GaWxsLFxuICAgIGluY3JlbWVudEJ1dHRvbkZpbGwsXG4gICAgZGVjcmVtZW50QnV0dG9uRmlsbCxcbiAgICBpbnB1dEFyZWFSZWN0RmlsbCxcbiAgICBpbnB1dEFyZWFCb3JkZXJGaWxsLFxuICAgIC8vIGljb25GaWxsID0gXCJ3aGl0ZVwiLCAvLyBKZVx1MDE1QmxpIGJcdTAxMTlkemllc3ogcmVuZGVyb3dhXHUwMTA3IG9zb2JuZSBpa29ueSArLy1cbiAgICAuLi5yZXN0RGl2UHJvcHNcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vIEluaWNqYWxpemFjamEgd2FydG9cdTAxNUJjaSBpbnB1dGEgcHJ6eSBtb250b3dhbml1IGx1YiB6bWlhbmllIGRlZmF1bHRWYWx1ZS92YWx1ZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFN0cmluZyhkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFwiXCI7IC8vIEphd25lIHVzdGF3aWVuaWUgbmEgcHVzdHkgc3RyaW5nLCBqZVx1MDE1QmxpIGJyYWsgd2FydG9cdTAxNUJjaVxuICAgICAgfVxuICAgIH1cbiAgfSwgW3ZhbHVlLCBkZWZhdWx0VmFsdWVdKTtcblxuICBjb25zdCBoYW5kbGVTdGVwID0gdXNlQ2FsbGJhY2soKGRpcmVjdGlvbjogXCJ1cFwiIHwgXCJkb3duXCIpID0+IHtcbiAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiAhZGlzYWJsZWQgJiYgIXJlYWRPbmx5KSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInVwXCIpIGlucHV0UmVmLmN1cnJlbnQuc3RlcFVwKCk7XG4gICAgICBlbHNlIGlucHV0UmVmLmN1cnJlbnQuc3RlcERvd24oKTtcblxuICAgICAgLy8gU3ltdWxhY2phIHpkYXJ6ZW5pYSBpbnB1dCwgYWJ5IHd5d29cdTAxNDJhXHUwMTA3IGhhbmRsZUlucHV0Q2hhbmdlXG4gICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudChcImlucHV0XCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSB9KTtcbiAgICAgIGlucHV0UmVmLmN1cnJlbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9LCBbZGlzYWJsZWQsIHJlYWRPbmx5XSk7XG5cbiAgY29uc3QgaGFuZGxlRGVjcmVtZW50ID0gdXNlQ2FsbGJhY2soKCkgPT4gaGFuZGxlU3RlcChcImRvd25cIiksIFtoYW5kbGVTdGVwXSk7XG4gIGNvbnN0IGhhbmRsZUluY3JlbWVudCA9IHVzZUNhbGxiYWNrKCgpID0+IGhhbmRsZVN0ZXAoXCJ1cFwiKSwgW2hhbmRsZVN0ZXBdKTtcblxuICBjb25zdCBoYW5kbGVDaG9vc2VDbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiAhZGlzYWJsZWQgJiYgIXJlYWRPbmx5KSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IGRlZiA/PyAxOyAvLyBKYWsgdyBUd29pbSBKU1xuICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFN0cmluZyhuZXdWYWx1ZSk7XG5cbiAgICAgIC8vIFJcdTAxMTljem5lIHd5d29cdTAxNDJhbmllIGxvZ2lraSB6bWlhbnkgd2FydG9cdTAxNUJjaVxuICAgICAgaWYgKG9uVmFsdWVDaGFuZ2UpIG9uVmFsdWVDaGFuZ2UobmV3VmFsdWUsIG5hbWUpO1xuICAgICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICB9KSBhcyB1bmtub3duIGFzIEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcInRhcmdldFwiLCB7XG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiBpbnB1dFJlZi5jdXJyZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcImN1cnJlbnRUYXJnZXRcIiwge1xuICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICB2YWx1ZTogaW5wdXRSZWYuY3VycmVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiQ2hvb3NlIGJ1dHRvbiBjbGlja2VkLCB2YWx1ZSBzZXQgdG8gMVwiKTtcbiAgICB9XG4gIH0sIFtkaXNhYmxlZCwgcmVhZE9ubHksIG5hbWUsIG9uVmFsdWVDaGFuZ2UsIG9uQ2hhbmdlXSk7XG5cbiAgLy8gPT09IFBPQ1pcdTAxMDRURUsgREVGSU5JQ0pJIGhhbmRsZUlucHV0Q2hhbmdlID09PVxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlOiBKU1guVGFyZ2V0ZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBFdmVudD4pID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCByYXdWYWx1ZSA9IHRhcmdldC52YWx1ZTtcbiAgICBsZXQgbnVtZXJpY1ZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAocmF3VmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIG51bWVyaWNWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3ByXHUwMEYzYnVqIHNwYXJzb3dhXHUwMTA3IGpha28gbGljemJcdTAxMTk7IHBhcnNlRmxvYXQgamVzdCBiYXJkemllaiBlbGFzdHljem55XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUZsb2F0KHJhd1ZhbHVlKTtcbiAgICAgIG51bWVyaWNWYWx1ZSA9IGlzTmFOKHBhcnNlZCkgPyB1bmRlZmluZWQgOiBwYXJzZWQ7XG4gICAgfVxuXG4gICAgaWYgKG9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIG9uVmFsdWVDaGFuZ2UobnVtZXJpY1ZhbHVlLCBuYW1lKTtcbiAgICB9XG4gICAgLy8gSmVcdTAxNUJsaSB1XHUwMTdDeXRrb3duaWsgcHJ6ZWthemFcdTAxNDIgd1x1MDE0MmFzbnkgb25DaGFuZ2UsIHRlXHUwMTdDIGdvIHd5d29cdTAxNDJhalxuICAgIC8vIFRvIHpkYXJ6ZW5pZSBcImlucHV0XCIgeiBlbGVtZW50dSBIVE1MXG4gICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICBvbkNoYW5nZShlKTtcbiAgICB9XG4gIH07XG4gIC8vID09PSBLT05JRUMgREVGSU5JQ0pJIGhhbmRsZUlucHV0Q2hhbmdlID09PVxuXG4gIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gc3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveFdpZHRoICogcmF0aW9TSVpFO1xuICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94SGVpZ2h0ICogcmF0aW9TSVpFO1xuXG4gIC8vIFN0eWxlIGRsYSBuYVx1MDE0Mm9cdTAxN0NvbmVnbyBpbnB1dHUgSFRNTCwgc2thbG93YW5lIHByemV6IHJhdGlvU0laRVxuICBjb25zdCBodG1sSW5wdXRTdHlsZTogSlNYLkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LnggKiByYXRpb1NJWkV9cHhgLFxuICAgIHRvcDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC55ICogcmF0aW9TSVpFfXB4YCxcbiAgICB3aWR0aDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC53aWR0aCAqIHJhdGlvU0laRX1weGAsXG4gICAgaGVpZ2h0OiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmhlaWdodCAqIHJhdGlvU0laRX1weGAsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICBjb2xvcjogXCIjMzMzXCIsXG4gICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgIGZvbnRTaXplOiBgJHtNYXRoLm1heCg4LCAxOCAqIHJhdGlvU0laRSl9cHhgLCAvLyBEb3N0b3N1aiBjemNpb25rXHUwMTE5XG4gICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgcGFkZGluZzogYDAgJHtNYXRoLm1heCgxLCAyICogcmF0aW9TSVpFKX1weGAsXG4gICAgbWFyZ2luOiAwLFxuICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgTW96QXBwZWFyYW5jZTogXCJ0ZXh0ZmllbGRcIixcbiAgICBXZWJraXRBcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICB6SW5kZXg6IDIsXG4gIH07XG5cbiAgLy8gUm96bWlhciBpa29uICsvLS4gWmFcdTAxNDJcdTAwRjNcdTAxN0NteSwgXHUwMTdDZSBvcnlnaW5hbG5lIGlrb255IHNcdTAxMDUgMjR4MjQuXG4gIC8vIENoY2VteSBqZSBwcnplc2thbG93YVx1MDEwNywgYWJ5IHBhc293YVx1MDE0MnkgZG8gcHJ6eWNpc2tcdTAwRjN3LlxuICAvLyBQcnp5a1x1MDE0MmFkb3dvLCBuaWVjaCB6YWptdWpcdTAxMDUgb2tvXHUwMTQybyA1MCUgd3lzb2tvXHUwMTVCY2kgcHJ6eWNpc2t1ICh3IGplZG5vc3RrYWNoIHZpZXdCb3gpXG4gIGNvbnN0IGljb25WaWV3Qm94U2l6ZSA9IDI0OyAvLyBPcnlnaW5hbG55IHJvem1pYXIgdmlld0JveCBpa29uICsvLVxuICBjb25zdCB0YXJnZXRJY29uSGVpZ2h0SW5TdmdVbml0cyA9IHN2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hIZWlnaHQgKiAwLjI1ICpcbiAgICAocmF0aW9TSVpFID4gMC41ID8gMSA6IHJhdGlvU0laRSAqIDIpOyAvLyBucC4gMjUlIHd5c29rb1x1MDE1QmNpIGNhXHUwMTQyZWdvIGtvbXBvbmVudHVcbiAgY29uc3QgaWNvbkFjdHVhbFNjYWxlID0gMS41ICogKHRhcmdldEljb25IZWlnaHRJblN2Z1VuaXRzIC8gaWNvblZpZXdCb3hTaXplKTtcblxuICBsZXQgZGlzcGxheVZhbHVlOiBzdHJpbmcgPSBcIlwiOyAvLyBJbnB1dCB2YWx1ZSB6YXdzemUgamFrbyBzdHJpbmdcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwbGF5VmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICB9IGVsc2UgaWYgKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGlzcGxheVZhbHVlID0gU3RyaW5nKGRlZmF1bHRWYWx1ZSk7XG4gIH1cblxuICBjb25zdCBjb21tb25TdmdCdXR0b25TdHlsZTogSlNYLkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgY3Vyc29yOiBkaXNhYmxlZCB8fCByZWFkT25seSA/IFwiZGVmYXVsdFwiIDogXCJwb2ludGVyXCIsXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2Ake0NPTlRBSU5FUl9DTEFTU19OQU1FfSAke3dyYXBwZXJDbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6IGAke2NvbnRhaW5lcldpZHRofXB4YCxcbiAgICAgICAgaGVpZ2h0OiBgJHtjb250YWluZXJIZWlnaHR9cHhgLFxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcbiAgICAgICAgLi4uc3R5bGUsXG4gICAgICB9fVxuICAgICAgey4uLnJlc3REaXZQcm9wc31cbiAgICA+XG4gICAgICA8c3ZnXG4gICAgICAgIGNsYXNzTmFtZT17YCR7U1ZHX0NMQVNTX05BTUV9ICR7c3ZnQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgZGF0YS1uYW1lPVwiaW5wdXQtbnVtYmVyXCIgLy8gWiBUd29qZWdvIEhUTUxcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHZpZXdCb3g9e2AwIDAgJHtzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94V2lkdGh9ICR7c3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveEhlaWdodH1gfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB9fVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgPlxuICAgICAgICB7LyogR3J1cGEgXCJDaG9vc2UvU2VsZWN0XCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9IC8vIEtsYXNhIHogVHdvamVnbyBIVE1MXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuY2hvb3NlLm5hbWV9IC8vIGRhdGEtbmFtZSB6IFR3b2plZ28gSFRNTFxuICAgICAgICAgIG9uQ2xpY2s9eyFkaXNhYmxlZCA/IGhhbmRsZUNob29zZUNsaWNrIDogdW5kZWZpbmVkfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN2Z0J1dHRvblN0eWxlLCAuLi4oc2VsZWN0QnV0dG9uU3R5bGUgfHwge30pIH19XG4gICAgICAgICAgcG9pbnRlckV2ZW50cz17ZGlzYWJsZWQgPyBcIm5vbmVcIiA6IFwiYXV0b1wifVxuICAgICAgICA+XG4gICAgICAgICAge3N2Z0xheW91dERhdGEuYnV0dG9ucy5jaG9vc2UucGF0aHMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBrZXk9e2BjaG9vc2UtcGF0aC0ke2l9YH1cbiAgICAgICAgICAgICAgZGF0YS1uYW1lPXtwLmRhdGFOYW1lfVxuICAgICAgICAgICAgICBkPXtwLmR9XG4gICAgICAgICAgICAgIGZpbGw9e3NlbGVjdEJ1dHRvbkZpbGwgfHwgcC5kZWZhdWx0RmlsbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZz5cblxuICAgICAgICB7LyogR3J1cGEgXCJJbnB1dCBBcmVhXCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5uYW1lfVxuICAgICAgICAgIHN0eWxlPXtpbnB1dEFyZWFTdHlsZSB8fCB7fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICB4PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0Lnh9XG4gICAgICAgICAgICB5PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0Lnl9XG4gICAgICAgICAgICB3aWR0aD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC53aWR0aH1cbiAgICAgICAgICAgIGhlaWdodD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC5oZWlnaHR9XG4gICAgICAgICAgICBmaWxsPXtpbnB1dEFyZWFSZWN0RmlsbCB8fCBzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmRlZmF1bHRGaWxsfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLmJvcmRlclBhdGguZH1cbiAgICAgICAgICAgIGZpbGw9e2lucHV0QXJlYUJvcmRlckZpbGwgfHxcbiAgICAgICAgICAgICAgc3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEuYm9yZGVyUGF0aC5kZWZhdWx0RmlsbH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2c+XG5cbiAgICAgICAgey8qIEdydXBhIFwiRGVjcmVtZW50XCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9XG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lm5hbWV9XG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkICYmICFyZWFkT25seSA/IGhhbmRsZURlY3JlbWVudCA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdmdCdXR0b25TdHlsZSwgLi4uKGRlY3JlbWVudEJ1dHRvblN0eWxlIHx8IHt9KSB9fVxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9e2Rpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcImF1dG9cIn1cbiAgICAgICAgPlxuICAgICAgICAgIHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50LnBhdGhzLm1hcCgocCwgaSkgPT4gKFxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAga2V5PXtgZGVjLXBhdGgtJHtpfWB9XG4gICAgICAgICAgICAgIGRhdGEtbmFtZT17cC5kYXRhTmFtZX1cbiAgICAgICAgICAgICAgZD17cC5kfVxuICAgICAgICAgICAgICBmaWxsPXtkZWNyZW1lbnRCdXR0b25GaWxsIHx8IHAuZGVmYXVsdEZpbGx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHsvKiBKZVx1MDE1QmxpIGNoY2VzeiBkb2RhXHUwMTA3IGlrb25cdTAxMTkgU1ZHIFwiLVwiIG5hIHR5bSBrc3p0YVx1MDE0MmNpZSwgenJcdTAwRjNiIHRvIHR1dGFqLCBucC46ICovfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8qPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKFggWSkgc2NhbGUoUylcIj5cbiAgICAgICAgICAgIHtEZWZhdWx0RGVjcmVtZW50SWNvblN2Z0NvbnRlbnR9XG4gICAgICAgICAgPC9nPiovXG4gICAgICAgICAgfVxuICAgICAgICAgIHsvKiBJa29uYSBEZWNyZW1lbnQgKC0pICovfVxuICAgICAgICAgIDxnXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lmljb25BbmNob3JYfSwgJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lmljb25BbmNob3JZfSkgc2NhbGUoJHtpY29uQWN0dWFsU2NhbGV9KSB0cmFuc2xhdGUoLSR7XG4gICAgICAgICAgICAgIGljb25WaWV3Qm94U2l6ZSAvIDJcbiAgICAgICAgICAgIH0sIC0ke2ljb25WaWV3Qm94U2l6ZSAvIDJ9KWB9XG4gICAgICAgICAgICBzdHlsZT17eyBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9fSAvLyBJa29ueSBuaWUgcG93aW5ueSBwcnplY2h3eXR5d2FcdTAxMDcga2xpa25pXHUwMTE5XHUwMTA3XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICB2aWV3Qm94PXtgMCAwICR7aWNvblZpZXdCb3hTaXplfSAke2ljb25WaWV3Qm94U2l6ZX1gfVxuICAgICAgICAgICAgICB3aWR0aD17aWNvblZpZXdCb3hTaXplfVxuICAgICAgICAgICAgICBoZWlnaHQ9e2ljb25WaWV3Qm94U2l6ZX1cbiAgICAgICAgICAgICAgZmlsbD1cIndoaXRlXCJcbiAgICAgICAgICAgICAgb3ZlcmZsb3c9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge0RlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudH1cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuXG4gICAgICAgIHsvKiBHcnVwYSBcIkluY3JlbWVudFwiICovfVxuICAgICAgICA8Z1xuICAgICAgICAgIGNsYXNzTmFtZT17U1ZHX0JVVFRPTl9DTEFTU19OQU1FfVxuICAgICAgICAgIGRhdGEtbmFtZT17c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5uYW1lfVxuICAgICAgICAgIG9uQ2xpY2s9eyFkaXNhYmxlZCAmJiAhcmVhZE9ubHkgPyBoYW5kbGVJbmNyZW1lbnQgOiB1bmRlZmluZWR9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3ZnQnV0dG9uU3R5bGUsIC4uLihpbmNyZW1lbnRCdXR0b25TdHlsZSB8fCB7fSkgfX1cbiAgICAgICAgICBwb2ludGVyRXZlbnRzPXtkaXNhYmxlZCB8fCByZWFkT25seSA/IFwibm9uZVwiIDogXCJhdXRvXCJ9XG4gICAgICAgID5cbiAgICAgICAgICB7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5wYXRocy5tYXAoKHAsIGkpID0+IChcbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGtleT17YGluYy1wYXRoLSR7aX1gfVxuICAgICAgICAgICAgICBkYXRhLW5hbWU9e3AuZGF0YU5hbWV9XG4gICAgICAgICAgICAgIGQ9e3AuZH1cbiAgICAgICAgICAgICAgZmlsbD17aW5jcmVtZW50QnV0dG9uRmlsbCB8fCBwLmRlZmF1bHRGaWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgICB7LyogSmVcdTAxNUJsaSBjaGNlc3ogZG9kYVx1MDEwNyBpa29uXHUwMTE5IFNWRyBcIitcIiBuYSB0eW0ga3N6dGFcdTAxNDJjaWUsIHpyXHUwMEYzYiB0byB0dXRhaiwgbnAuOiAqL31cbiAgICAgICAgICB7XG4gICAgICAgICAgICAvKjxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZShYIFkpIHNjYWxlKFMpXCI+XG4gICAgICAgICAgICB7RGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50fVxuICAgICAgICAgIDwvZz4qL1xuICAgICAgICAgIH1cbiAgICAgICAgICB7LyogSWtvbmEgSW5jcmVtZW50ICgrKSAqL31cbiAgICAgICAgICA8Z1xuICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5pY29uQW5jaG9yWH0sICR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5pY29uQW5jaG9yWX0pIHNjYWxlKCR7aWNvbkFjdHVhbFNjYWxlfSkgdHJhbnNsYXRlKC0ke1xuICAgICAgICAgICAgICBpY29uVmlld0JveFNpemUgLyAyXG4gICAgICAgICAgICB9LCAtJHtpY29uVmlld0JveFNpemUgLyAyfSlgfVxuICAgICAgICAgICAgc3R5bGU9e3sgcG9pbnRlckV2ZW50czogXCJub25lXCIgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgIHZpZXdCb3g9e2AwIDAgJHtpY29uVmlld0JveFNpemV9ICR7aWNvblZpZXdCb3hTaXplfWB9XG4gICAgICAgICAgICAgIHdpZHRoPXtpY29uVmlld0JveFNpemV9XG4gICAgICAgICAgICAgIGhlaWdodD17aWNvblZpZXdCb3hTaXplfVxuICAgICAgICAgICAgICBmaWxsPVwid2hpdGVcIlxuICAgICAgICAgICAgICBvdmVyZmxvdz1cInZpc2libGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7RGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50fVxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cblxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgIGNsYXNzTmFtZT17YCR7SFRNTF9JTlBVVF9DTEFTU19OQU1FfSAke2lucHV0Q2xhc3NOYW1lIHx8IFwiXCJ9YH0gLy8gS2xhc2EgeiBUd29qZWdvIEhUTUxcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX0gLy8gZGlzcGxheVZhbHVlIGplc3QganVcdTAxN0Mgc3RyaW5naWVtIGx1YiBwdXN0eW0gc3RyaW5naWVtXG4gICAgICAgIG1pbj17bWlufVxuICAgICAgICBtYXg9e21heH1cbiAgICAgICAgc3RlcD17c3RlcH1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICBvbklucHV0PXtoYW5kbGVJbnB1dENoYW5nZX0gLy8gUG9kXHUwMTQyXHUwMTA1Y3pvbnkgcG9wcmF3bnkgaGFuZGxlclxuICAgICAgICBzdHlsZT17aHRtbElucHV0U3R5bGV9XG4gICAgICAgIGFyaWEtbGFiZWw9e3Byb3BzW1wiYXJpYS1sYWJlbFwiXSB8fCBcIldhcnRvXHUwMTVCXHUwMTA3IGxpY3pib3dhXCJ9XG4gICAgICAgIHsuLi5yZXN0RGl2UHJvcHN9XG4gICAgICAvPlxuICAgICAge1xuICAgICAgICAvLyBabWllbmlvbmUgeiByZXN0SW5wdXRQcm9wcywgYm8gdGUgc1x1MDEwNSBkbGEgZ1x1MDE0Mlx1MDBGM3duZWdvIGRpdmFcbiAgICAgICAgLy8gSmVcdTAxNUJsaSBjaGNlc3ogcHJ6ZWthenl3YVx1MDEwNyBkb2RhdGtvd2UgYXRyeWJ1dHkgZG8gaW5wdXRhLFxuICAgICAgICAvLyBtdXNpc3ogamUgb3NvYm5vIG9ic1x1MDE0MnVcdTAxN0N5XHUwMTA3IGx1YiBuYXp3YVx1MDEwNyBucC4gaHRtbElucHV0UHJvcHNcbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsICIvLyBEZWZpbmljamUgdHlwXHUwMEYzd1xudHlwZSBFeGNlbE5lc3RlZE51bWJlckFycmF5ID0gbnVtYmVyIHwgRXhjZWxOZXN0ZWROdW1iZXJBcnJheVtdO1xuXG5leHBvcnQgdHlwZSBFeGNlbE5lc3RlZE4gPSBFeGNlbE5lc3RlZE51bWJlckFycmF5O1xuZXhwb3J0IHR5cGUgRXhjZWxSZXN1bHRzID0gTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROdW1iZXJBcnJheT47XG5leHBvcnQgdHlwZSBFeGNlbFNldHNTZXQgPSB7XG4gIHZhcjogc3RyaW5nOyAvLyBOYXp3YSB6bWllbm5laiB3ZWpcdTAxNUJjaW93ZWpcbiAgdmFsOiBFeGNlbE5lc3RlZE51bWJlckFycmF5OyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyB6bWllbm5laiAobGljemJhIGx1YiB6YWduaWVcdTAxN0NkXHUwMTdDb25hIHRhYmxpY2EgbGljemIpXG59O1xuXG4vLyBUeXAgZGxhIGZ1bmtjamkgb2JsaWN6ZW5pb3dlajogcHJ6eWptdWplIG1hcFx1MDExOSwgendyYWNhIG9ibGljem9uXHUwMTA1IHdhcnRvXHUwMTVCXHUwMTA3XG50eXBlIENhbGN1bGF0aW9uRnVuY3Rpb24gPSAoY3VycmVudE1hcDogRXhjZWxSZXN1bHRzKSA9PiBFeGNlbE5lc3RlZE51bWJlckFycmF5O1xuXG5leHBvcnQgdHlwZSBFeGNlbFNldHNHZXQgPSB7XG4gIHZhcjogc3RyaW5nOyAvLyBOYXp3YSBub3dlaiwgb2JsaWN6b25laiB6bWllbm5lalxuICB2YWw6IENhbGN1bGF0aW9uRnVuY3Rpb247IC8vIEZ1bmtjamEgb2JsaWN6YWpcdTAxMDVjYSB3YXJ0b1x1MDE1Qlx1MDEwNyB0ZWogem1pZW5uZWpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFptaWVuaW9ubyB6IGBmdW5gIG5hIGB2YWxgIHpnb2RuaWUgeiBUd29pbSBwcnp5a1x1MDE0MmFkZW0gdVx1MDE3Q3ljaWFcbn07XG5cbi8qKlxuICogRnVua2NqYSBFeGNlbCBwcnpldHdhcnphIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd2UgaSB3eWtvbnVqZSB6ZGVmaW5pb3dhbmUgb2JsaWN6ZW5pYS5cbiAqIEBwYXJhbSBpbnB1dFZhbHVlcyBXYXJ0b1x1MDE1QmNpIHBvY3pcdTAxMDV0a293ZSBkbyB1bWllc3pjemVuaWEgdyBtYXBpZS5cbiAqIEBwYXJhbSBjYWxjc1ZhbHVlcyBEZWZpbmljamUgb2JsaWN6ZVx1MDE0NCBkbyB3eWtvbmFuaWEuXG4gKiBAcmV0dXJucyBNYXBhIHphd2llcmFqXHUwMTA1Y2Egd3N6eXN0a2llIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd2UgaSBvYmxpY3pvbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBFeGNlbChcbiAgaW5wdXRWYWx1ZXM6IEV4Y2VsU2V0c1NldCB8IEV4Y2VsU2V0c1NldFtdLFxuICBjYWxjc1ZhbHVlcz86IEV4Y2VsU2V0c0dldCB8IEV4Y2VsU2V0c0dldFtdIC8vIERydWdpIGFyZ3VtZW50IGplc3Qgb3Bjam9uYWxueVxuKTogRXhjZWxSZXN1bHRzIHsgLy8gWndyYWNhbXkgbWFwXHUwMTE5IHogYmFyZHppZWogc3pjemVnXHUwMEYzXHUwMTQyb3d5bSB0eXBlbVxuICBcbiAgLy8gSW5pY2phbGl6YWNqYSBtYXB5IHogcG9wcmF3bnltaSB0eXBhbWlcbiAgY29uc3QgTTpFeGNlbFJlc3VsdHMgPSBuZXcgTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROdW1iZXJBcnJheT4oKTtcblxuICAvLyAxLiBQcnpldHdhcnphbmllIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd3ljaCAoaW5wdXRWYWx1ZXMpXG4gIC8vIE5vcm1hbGl6YWNqYSBpbnB1dFZhbHVlcyBkbyB0YWJsaWN5LCBqZVx1MDE1QmxpIHByemVrYXphbm8gcG9qZWR5bmN6eSBvYmlla3RcbiAgY29uc3QgcmVzb2x2ZWRJbnB1dFZhbHVlcyA9ICFBcnJheS5pc0FycmF5KGlucHV0VmFsdWVzKSA/IFtpbnB1dFZhbHVlc10gOiBpbnB1dFZhbHVlcztcbiAgcmVzb2x2ZWRJbnB1dFZhbHVlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIE0uc2V0KGl0ZW0udmFyLCBpdGVtLnZhbCk7XG4gIH0pO1xuXG4gIC8vIDIuIFByemV0d2FyemFuaWUgd2FydG9cdTAxNUJjaSBvYmxpY3plbmlvd3ljaCAoY2FsY3NWYWx1ZXMpXG4gIGlmIChjYWxjc1ZhbHVlcykgeyAvLyBXeWtvbmFqIHR5bGtvLCBqZVx1MDE1QmxpIGNhbGNzVmFsdWVzIHpvc3RhXHUwMTQyeSBkb3N0YXJjem9uZVxuICAgIC8vIE5vcm1hbGl6YWNqYSBjYWxjc1ZhbHVlcyBkbyB0YWJsaWN5LCBqZVx1MDE1QmxpIHByemVrYXphbm8gcG9qZWR5bmN6eSBvYmlla3RcbiAgICBjb25zdCByZXNvbHZlZENhbGNzVmFsdWVzID0gIUFycmF5LmlzQXJyYXkoY2FsY3NWYWx1ZXMpID8gW2NhbGNzVmFsdWVzXSA6IGNhbGNzVmFsdWVzO1xuICAgIFxuICAgIHJlc29sdmVkQ2FsY3NWYWx1ZXMuZm9yRWFjaChjYWxjSXRlbSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBXeXdvXHUwMTQyYW5pZSBmdW5rY2ppIG9ibGljemVuaW93ZWogdVx1MDE3Q3l0a293bmlrYSwgcHJ6ZWthenVqXHUwMTA1YyBha3R1YWxuXHUwMTA1IG1hcFx1MDExOSBNXG4gICAgICAgIGNvbnN0IHJlc3VsdFZhbHVlID0gY2FsY0l0ZW0udmFsKE0pO1xuICAgICAgICAvLyBaYXBpc2FuaWUgd3luaWt1IG9ibGljemVcdTAxNDQgZG8gbWFweSBNXG4gICAgICAgIE0uc2V0KGNhbGNJdGVtLnZhciwgcmVzdWx0VmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgQlx1MDE0Mlx1MDEwNWQgcG9kY3phcyBvYmxpY3phbmlhIHptaWVubmVqIFwiJHtjYWxjSXRlbS52YXJ9XCI6YCwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKTtcbiAgICAgICAgLy8gTW9cdTAxN0Nlc3ogemRlY3lkb3dhXHUwMTA3LCBqYWsgb2JzXHUwMTQydVx1MDE3Q3lcdTAxMDcgYlx1MDE0Mlx1MDEwNWQ6IHBvbWluXHUwMTA1XHUwMTA3LCB6YXBpc2FcdTAxMDcgYlx1MDE0Mlx1MDEwNWQsIHByemVyd2FcdTAxMDcsIGl0cC5cbiAgICAgICAgLy8gTmEgcmF6aWUgemFwaXN1amVteSBgdW5kZWZpbmVkYCwgYWJ5IHdza2F6YVx1MDEwNyBwcm9ibGVtLlxuICAgICAgICBNLnNldChjYWxjSXRlbS52YXIsIHVuZGVmaW5lZCBhcyBhbnkpOyAvLyBVXHUwMTdDeXdhbXkgYGFzIGFueWAgYWJ5IHBvendvbGlcdTAxMDcgbmEgYHVuZGVmaW5lZGAgdyBtYXBpZSB6IHR5cGVtIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBNO1xufVxuXG4vKipcbiAqIEdlbmVydWplIHRhYmxpY1x1MDExOSBsaWN6YiAocHJ6ZWR6aWFcdTAxNDIpIG8gb2tyZVx1MDE1QmxvbmVqIGxpY3piaWUgZWxlbWVudFx1MDBGM3csIGtyb2t1IGkgd2FydG9cdTAxNUJjaSBwb2N6XHUwMTA1dGtvd2VqLlxuICpcbiAqIEBwYXJhbSBzdGFydEF0IFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBwaWVyd3N6ZWdvIGVsZW1lbnR1IHcgdGFibGljeS5cbiAqIEBwYXJhbSBzdGVwIEtyb2sgKHJcdTAwRjNcdTAxN0NuaWNhKSBtaVx1MDExOWR6eSBrb2xlam55bWkgZWxlbWVudGFtaSB3IHRhYmxpY3kuIE1vXHUwMTdDZSBieVx1MDEwNyBkb2RhdG5pLCB1amVtbnkgbHViIHplcm93eS5cbiAqIEBwYXJhbSBpdGVtcyBMaWN6YmEgZWxlbWVudFx1MDBGM3cgZG8gd3lnZW5lcm93YW5pYSB3IHRhYmxpY3kuXG4gKiBAcmV0dXJucyBUYWJsaWNhIGxpY3piIChudW1iZXJbXSkgcmVwcmV6ZW50dWpcdTAxMDVjYSB3eWdlbmVyb3dhbnkgcHJ6ZWR6aWFcdTAxNDIuXG4gKiBad3JhY2EgcHVzdFx1MDEwNSB0YWJsaWNcdTAxMTksIGplXHUwMTVCbGkgYGl0ZW1zYCBqZXN0IG1uaWVqc3plIGx1YiByXHUwMEYzd25lIDAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBTaXplKHN0YXJ0QXQ6IG51bWJlciwgc3RlcDogbnVtYmVyLCBpdGVtczogbnVtYmVyKTogbnVtYmVyW10ge1xuICBpZiAoaXRlbXMgPD0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtczsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2goc3RhcnRBdCArIChpICogc3RlcCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2VuZXJ1amUgdGFibGljXHUwMTE5IGxpY3piIChwcnplZHppYVx1MDE0MiksIHphY3p5bmFqXHUwMTA1YyBvZCBgc3RhcnRBdGAsIHBvc3RcdTAxMTlwdWpcdTAxMDVjIG8gYHN0ZXBgLFxuICogYVx1MDE3QyBkbyBvc2lcdTAxMDVnbmlcdTAxMTljaWEgKGkgcG90ZW5jamFsbmllIHdcdTAxNDJcdTAxMDVjemVuaWEpIGBlbmRBdGAuXG4gKlxuICogQHBhcmFtIHN0YXJ0QXQgV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHBpZXJ3c3plZ28gZWxlbWVudHUgdyB0YWJsaWN5LlxuICogQHBhcmFtIHN0ZXAgS3JvayAoclx1MDBGM1x1MDE3Q25pY2EpIG1pXHUwMTE5ZHp5IGtvbGVqbnltaSBlbGVtZW50YW1pIHcgdGFibGljeS4gTW9cdTAxN0NlIGJ5XHUwMTA3IGRvZGF0bmksIHVqZW1ueSBsdWIgemVyb3d5LlxuICogQHBhcmFtIGVuZEF0IFdhcnRvXHUwMTVCXHUwMTA3IGtvXHUwMTQ0Y293YSBwcnplZHppYVx1MDE0MnUuIEVsZW1lbnR5IGJcdTAxMTlkXHUwMTA1IGdlbmVyb3dhbmUgdGFrIGRcdTAxNDJ1Z28sIGpha1xuICogZFx1MDE0MnVnbyBtaWVzemN6XHUwMTA1IHNpXHUwMTE5IHcgcHJ6ZWR6aWFsZSBva3JlXHUwMTVCbG9ueW0gcHJ6ZXogYHN0YXJ0QXRgLCBgc3RlcGAgaSBgZW5kQXRgICh3XHUwMTQyXHUwMTA1Y3puaWUpLlxuICogQHJldHVybnMgVGFibGljYSBsaWN6YiAobnVtYmVyW10pIHJlcHJlemVudHVqXHUwMTA1Y2Egd3lnZW5lcm93YW55IHByemVkemlhXHUwMTQyLlxuICogWndyYWNhIHB1c3RcdTAxMDUgdGFibGljXHUwMTE5LCBqZVx1MDE1QmxpIG5pZSBtb1x1MDE3Q25hIHd5Z2VuZXJvd2FcdTAxMDcgXHUwMTdDYWRueWNoIGVsZW1lbnRcdTAwRjN3XG4gKiAobnAuIHN0YXJ0QXQgPiBlbmRBdCBwcnp5IGRvZGF0bmltIGtyb2t1LCBsdWIgamVcdTAxNUJsaSBzdGVwPTAgYSBzdGFydEF0ICE9PSBlbmRBdCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0KHN0YXJ0QXQ6IG51bWJlciwgc3RlcDogbnVtYmVyLCBlbmRBdDogbnVtYmVyKTogbnVtYmVyW10ge1xuICBjb25zdCByZXN1bHQ6IG51bWJlcltdID0gW107XG5cbiAgaWYgKHN0ZXAgPT09IDApIHtcbiAgICAvLyBKZVx1MDE1QmxpIGtyb2sgd3lub3NpIDAsIHByemVkemlhXHUwMTQyIG1vXHUwMTdDZSB6YXdpZXJhXHUwMTA3IHR5bGtvIGplZGVuIGVsZW1lbnQsXG4gICAgLy8gamVcdTAxNUJsaSBzdGFydEF0IGplc3Qgclx1MDBGM3duZSBlbmRBdC5cbiAgICBpZiAoc3RhcnRBdCA9PT0gZW5kQXQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHN0YXJ0QXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0OyAvLyBad3JhY2EgW3N0YXJ0QXRdIGx1YiBbXVxuICB9XG5cbiAgaWYgKHN0ZXAgPiAwKSB7XG4gICAgLy8gS3JvayBkb2RhdG5pOiBpZHppZW15IHcgZ1x1MDBGM3JcdTAxMTlcbiAgICBpZiAoc3RhcnRBdCA+IGVuZEF0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0OyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgamVzdCBqdVx1MDE3QyB6YSB3YXJ0b1x1MDE1QmNpXHUwMTA1IGtvXHUwMTQ0Y293XHUwMTA1XG4gICAgfVxuICAgIGZvciAobGV0IGN1cnJlbnRWYWx1ZSA9IHN0YXJ0QXQ7IGN1cnJlbnRWYWx1ZSA8PSBlbmRBdDsgY3VycmVudFZhbHVlICs9IHN0ZXApIHtcbiAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9IGVsc2UgeyAvLyBzdGVwIDwgMFxuICAgIC8vIEtyb2sgdWplbW55OiBpZHppZW15IHcgZFx1MDBGM1x1MDE0MlxuICAgIGlmIChzdGFydEF0IDwgZW5kQXQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBqZXN0IGp1XHUwMTdDIHphIHdhcnRvXHUwMTVCY2lcdTAxMDUga29cdTAxNDRjb3dcdTAxMDUgKHcgelx1MDE0Mlx1MDEwNSBzdHJvblx1MDExOSlcbiAgICB9XG4gICAgZm9yIChsZXQgY3VycmVudFZhbHVlID0gc3RhcnRBdDsgY3VycmVudFZhbHVlID49IGVuZEF0OyBjdXJyZW50VmFsdWUgKz0gc3RlcCkge1xuICAgICAgcmVzdWx0LnB1c2goY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBBbHRlcm5hdHl3bmEsIGJhcmR6aWVqIHp3aVx1MDExOXpcdTAxNDJhIGltcGxlbWVudGFjamEgdVx1MDE3Q3l3YWpcdTAxMDVjYSBBcnJheS5mcm9tIChkemlhXHUwMTQyYSB0YWsgc2Ftbyk6XG4vKlxuZnVuY3Rpb24gaW5pdFJhbmdlRmlyc3RTdGVwU2l6ZUFsdGVybmF0aXZlKGl0ZW1zOiBudW1iZXIsIHN0ZXA6IG51bWJlciwgc3RhcnRBdDogbnVtYmVyKTogbnVtYmVyW10ge1xuICBpZiAoaXRlbXMgPD0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogaXRlbXMgfSwgKF8sIGluZGV4KSA9PiBzdGFydEF0ICsgaW5kZXggKiBzdGVwKTtcbn1cblxuY29uc29sZS5sb2coXCItLS0gVGVzdCBhbHRlcm5hdHl3bmVqIGltcGxlbWVudGFjamkgLS0tXCIpO1xuY29uc3QgcmFuZ2UxX2FsdCA9IGluaXRSYW5nZUZpcnN0U3RlcFNpemVBbHRlcm5hdGl2ZSg1LCAyLCAxMCk7XG5jb25zb2xlLmxvZyhcIlJhbmdlIDEgQWx0IChpdGVtczogNSwgc3RlcDogMiwgc3RhcnRBdDogMTApOlwiLCByYW5nZTFfYWx0KTtcbiovXG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VsO1xuXG4vLyAtLS0gUHJ6eWtcdTAxNDJhZCB1XHUwMTdDeWNpYSAtLS1cbi8vLy8gRGVmaW5pY2phIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd3ljaFxuLy9jb25zdCBpbnB1dHM6IEV4Y2VsU2V0c1NldFtdID0gW1xuLy8gIHsgdmFyOiBcImlcIiwgdmFsOiBbMSwgMiwgMywgNCwgNSwgNiwgN10gfSxcbi8vICB7IHZhcjogXCJqXCIsIHZhbDogWzEsIDMsIDIsIDcsIDYsIDUsIDRdIH1cbi8vXTtcbi8vXG4vLy8vIERlZmluaWNqYSBvYmxpY3plXHUwMTQ0XG4vL2NvbnN0IGNhbGN1bGF0aW9uczogRXhjZWxTZXRzR2V0W10gPSBbXG4vLyAge1xuLy8gICAgdmFyOiBcImlqX3N1bVwiLCAvLyBOb3dhIHptaWVubmEsIGt0XHUwMEYzcmEgYlx1MDExOWR6aWUgc3VtXHUwMTA1IGlba10gKyBqW2tdXG4vLyAgICB2YWw6IChjdXJyZW50TWFwKSA9PiB7XG4vLyAgICAgIC8vIFBvYmllcmFteSB0YWJsaWNlICdpJyBvcmF6ICdqJyB6IG1hcHlcbi8vICAgICAgY29uc3QgaUFycmF5ID0gY3VycmVudE1hcC5nZXQoXCJpXCIpO1xuLy8gICAgICBjb25zdCBqQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImpcIik7XG4vL1xuLy8gICAgICAvLyBXYVx1MDE3Q25lOiBTcHJhd2R6ZW5pZSB0eXBcdTAwRjN3IGkgb2JzXHUwMTQydWdhIGJcdTAxNDJcdTAxMTlkXHUwMEYzdyB3ZXduXHUwMTA1dHJ6IGZ1bmtjamkgdVx1MDE3Q3l0a293bmlrYVxuLy8gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaUFycmF5KSB8fCAhQXJyYXkuaXNBcnJheShqQXJyYXkpKSB7XG4vLyAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWm1pZW5uZSAnaScgb3JheiAnaicgbXVzelx1MDEwNSBieVx1MDEwNyB0YWJsaWNhbWkgZGxhIHRlaiBvcGVyYWNqaSBzdW1vd2FuaWEuXCIpO1xuLy8gICAgICB9XG4vLyAgICAgIGlmIChpQXJyYXkuc29tZShpc05hTikgfHwgakFycmF5LnNvbWUoaXNOYU4pKSB7XG4vLyAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXc3p5c3RraWUgZWxlbWVudHkgdyB0YWJsaWNhY2ggJ2knIG9yYXogJ2onIG11c3pcdTAxMDUgYnlcdTAxMDcgbGljemJhbWkuXCIpO1xuLy8gICAgICB9XG4vLyAgICAgIGlmIChpQXJyYXkubGVuZ3RoICE9PSBqQXJyYXkubGVuZ3RoKSB7XG4vLyAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFibGljZSAnaScgb3JheiAnaicgbXVzelx1MDEwNSBtaWVcdTAxMDcgdGFrXHUwMTA1IHNhbVx1MDEwNSBkXHUwMTQydWdvXHUwMTVCXHUwMTA3IGRvIHN1bW93YW5pYSBlbGVtZW50IHBvIGVsZW1lbmNpZS5cIik7XG4vLyAgICAgIH1cbi8vXG4vLyAgICAgIC8vIFd5a29uYW5pZSBvcGVyYWNqaSBzdW1vd2FuaWEgZWxlbWVudCBwbyBlbGVtZW5jaWVcbi8vICAgICAgLy8gWmFrXHUwMTQyYWRhbXksIFx1MDE3Q2Ugc1x1MDEwNSB0byBwXHUwMTQyYXNraWUgdGFibGljZSBsaWN6YiwgemdvZG5pZSB6IHByenlrXHUwMTQyYWRlbS5cbi8vICAgICAgLy8gRGxhIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXkgb3BlcmFjamEgYnlcdTAxNDJhYnkgYmFyZHppZWogelx1MDE0Mm9cdTAxN0NvbmEgKHJla3VyZW5jeWpuYSkuXG4vLyAgICAgIHJldHVybiBpQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+ICh2YWxfaSBhcyBudW1iZXIpICsgKGpBcnJheVtpbmRleF0gYXMgbnVtYmVyKSk7XG4vLyAgICB9XG4vLyAgfSxcbi8vICB7XG4vLyAgICB2YXI6IFwia1wiLCAvLyBQcnp5a1x1MDE0MmFkIGlubmVqIHptaWVubmVqLCBucC4gc2thbGFyXG4vLyAgICB2YWw6ICgpID0+IDEwMCAvLyBQcm9zdGEgZnVua2NqYSB6d3JhY2FqXHUwMTA1Y2Egd2FydG9cdTAxNUJcdTAxMDdcbi8vICB9LFxuLy8gIHtcbi8vICAgIHZhcjogXCJpX3BsdXNfa1wiLCAvLyBQcnp5a1x1MDE0MmFkIG9wZXJhY2ppIHRhYmxpY2EgKyBza2FsYXIgKGJyb2FkY2FzdGluZylcbi8vICAgIHZhbDogKGN1cnJlbnRNYXApID0+IHtcbi8vICAgICAgICBjb25zdCBpQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImlcIik7XG4vLyAgICAgICAgY29uc3Qga1ZhbCA9IGN1cnJlbnRNYXAuZ2V0KFwia1wiKTtcbi8vXG4vLyAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlBcnJheSkgfHwgdHlwZW9mIGtWYWwgIT09ICdudW1iZXInKSB7XG4vLyAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidpJyBtdXNpIGJ5XHUwMTA3IHRhYmxpY1x1MDEwNSwgYSAnaycgbGljemJcdTAxMDUuXCIpO1xuLy8gICAgICAgIH1cbi8vICAgICAgICByZXR1cm4gaUFycmF5Lm1hcCh2YWxfaSA9PiAodmFsX2kgYXMgbnVtYmVyKSArIChrVmFsIGFzIG51bWJlcikpO1xuLy8gICAgfVxuLy8gIH1cbi8vXTtcbi8vXG4vLy8vIFd5d29cdTAxNDJhbmllIGZ1bmtjamkgRXhjZWxcbi8vY29uc3QgQTEgPSBFeGNlbChpbnB1dHMsIGNhbGN1bGF0aW9ucyk7XG4vL1xuLy8vLyBXeVx1MDE1QndpZXRsZW5pZSB3eW5pa1x1MDBGM3dcbi8vY29uc29sZS5sb2coXCJDYVx1MDE0MmEgbWFwYSBBMTpcIiwgQTEpO1xuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaScpOlwiLCBBMS5nZXQoXCJpXCIpKTtcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2onKTpcIiwgQTEuZ2V0KFwialwiKSk7XG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdpal9zdW0nKTpcIiwgQTEuZ2V0KFwiaWpfc3VtXCIpKTsgLy8gT2N6ZWtpd2FuZTogWzIsIDUsIDUsIDExLCAxMSwgMTEsIDExXVxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaycpOlwiLCBBMS5nZXQoXCJrXCIpKTsgICAgICAgICAvLyBPY3pla2l3YW5lOiAxMDBcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2lfcGx1c19rJyk6XCIsIEExLmdldChcImlfcGx1c19rXCIpKTsgLy8gT2N6ZWtpd2FuZTogWzEwMSwgMTAyLCAxMDMsIDEwNCwgMTA1LCAxMDYsIDEwN11cbi8vY29uc29sZS5sb2coXCJXYXJ0b1x1MDE1Qlx1MDEwNyBpWzNdIChpbmRla3MgMywgY3p5bGkgY3p3YXJ0eSBlbGVtZW50KTpcIiwgKEExLmdldChcImlcIikgYXMgbnVtYmVyW10pWzNdKTsgLy8gT2N6ZWtpd2FuZTogNFxuIiwgImV4cG9ydCBmdW5jdGlvbiBmbG9vckxvZzIoeDpudW1iZXIpOm51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgubG9nMih4KSk7XG59XG5cbi8vICB0byBrbGFzeWN6bmEgcG90XHUwMTE5Z2EgZHdcdTAwRjNqa2kuXG5leHBvcnQgZnVuY3Rpb24gcG93Mih4Om51bWJlcik6bnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgucG93KDIseCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHBvdzJBZmZpbmUoeDogbnVtYmVyLCBhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIGEgKiAyICoqICh4ICsgYikgKyBjO1xufVxuXG4vLyAgd2FsdWFjamEgZHd1LWFkeWN6bmEgbGljemJ5IG5hdHVyYWxuZWogZG9kYXRuaWVqIFxuLy8gIGN6eWxpIG5handpXHUwMTE5a3N6XHUwMTA1IHBvdFx1MDExOWdcdTAxMTkgbGljemJ5IDIsIGt0XHUwMEYzcmEgZHppZWxpIHhcbi8vICBtYXBsZSBgayA6PSB4IC0+IGlsb2cyKHggLSBCaXRzW0FuZF0oeCwgeCAtIDEpKWBcbi8vICBrKHgpPW9yZF8yKHgpXG4vLyAgQ3p5bGk6IGlsZSByYXp5IHggbW9cdTAxN0NuYSBwb2R6aWVsaVx1MDEwNyBwcnpleiAyLCB6YW5pbSBwcnplc3RhbmllIGJ5XHUwMTA3IGNhXHUwMTQya293aXRlIFxuLy8gIChsdWIsIHJcdTAwRjN3bm96bmFjem5pZSwgcG96eWNqYSBuYWptXHUwMTQyb2RzemVnbyB1c3Rhd2lvbmVnbyBiaXR1IHcgeCkuXG5leHBvcnQgZnVuY3Rpb24gdmFsMkFkaWMoeDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKHggPD0gMCB8fCAhTnVtYmVyLmlzSW50ZWdlcih4KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IG11c2kgYnlcdTAxMDcgZG9kYXRuaVx1MDEwNSBsaWN6Ylx1MDEwNSBjYVx1MDE0Mmtvd2l0XHUwMTA1LlwiKTtcbiAgfVxuICByZXR1cm4gTWF0aC5sb2cyKHggJiAteCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3cyQWZmaW5lX3ZhbDJBZGljKHg6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBhICogMiAqKiAodmFsMkFkaWMoeCkgKyBiKSArIGM7XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBmdW5jdGlvbiBpc05vdFZhbE5hdHVyYWxQb3ModmFsOnVua25vd24pOmJvb2xlYW4ge1xuICByZXR1cm4gKHR5cGVvZiB2YWwgIT09IFwibnVtYmVyXCIgfHwgaXNOYU4odmFsKSB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWwpIHx8XG4gIHZhbCA8PSAwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVybyh2YWw6dW5rbm93bik6Ym9vbGVhbiB7XG4gIHJldHVybiAodHlwZW9mIHZhbCAhPT0gXCJudW1iZXJcIiB8fCBpc05hTih2YWwpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbCkgfHxcbiAgdmFsIDwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0U29tTm90T2ZWYWxzQXJyYXkodjpzdHJpbmcsIGFycjp1bmtub3duLCB0ZXN0OlwiaXNOb3RWYWxOYXR1cmFsUG9zXCJ8XCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTp2b2lkIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgWm1pZW5uZSAke3Z9ICBtdXN6XHUwMTA1IGJ5XHUwMTA3IHRhYmxpY2FtaS5gLFxuICAgICk7XG4gIH1cbiAgc3dpdGNoICh0ZXN0KSB7XG4gICAgY2FzZSBcImlzTm90VmFsTmF0dXJhbFBvc1wiOlxuICAgICAgaWYgKGFyci5zb21lKGlzTm90VmFsTmF0dXJhbFBvcykpIHt0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFdzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY3kgJHt2fSBtdXN6XHUwMTA1IGJ5XHUwMTA3IGxpY3piYW1pIG5hdHVyYWxueW1pIGRvZGF0bmltaSAod2lcdTAxMTlrc3p5bWkgb2QgMCkuYCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiOlxuICAgICAgaWYgKGFyci5zb21lKGlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvKSkge3Rocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFdzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY3kgJHt2fSBtdXN6XHUwMTA1IGJ5XHUwMTA3IGxpY3piYW1pIG5hdHVyYWxueW1pIGRvZGF0bmltaSB6IHplcm8gKHdpXHUwMTE5a3N6eW1pIG9kIC0xKS5gLFxuICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG59XG4iLCAiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cblxuaW1wb3J0IHsgSlNYIH0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44XCI7XG5cbi8vIFphXHUwMTQyXHUwMEYzXHUwMTdDbXksIFx1MDE3Q2UgdGUgdHlweSBzXHUwMTA1IHpkZWZpbmlvd2FuZSBnbG9iYWxuaWUgbHViIGltcG9ydG93YW5lXG4vLyBKZVx1MDE1QmxpIG5pZSwgb2Rrb21lbnR1aiBqZSBsdWIgcHJ6ZW5pZVx1MDE1QiBkbyB3c3BcdTAwRjNsbmVnbyBwbGlrdSB0eXBcdTAwRjN3LlxudHlwZSBOZXN0ZWROdW1iZXJBcnJheSA9IG51bWJlciB8IE5lc3RlZE51bWJlckFycmF5W107XG50eXBlIEV4Y2VsUmVzdWx0cyA9IE1hcDxzdHJpbmcsIE5lc3RlZE51bWJlckFycmF5PjtcblxuaW50ZXJmYWNlIFBsb3RFeGNlbFByb3BzIHtcbiAgZGF0YTogRXhjZWxSZXN1bHRzO1xuICB0eXBlOiBcInJvd1wiIHwgXCJjb2xcIjsgLy8gT3JpZW50YWNqYSB0YWJlbGk6IFwicm93XCIgKGRhbmUgdyB3aWVyc3phY2gpLCBcImNvbFwiIChkYW5lIHcga29sdW1uYWNoKVxuICBjYXB0aW9uPzogc3RyaW5nOyAvLyBPcGNqb25hbG55IHBvZHBpcyB0YWJlbGlcbiAgdGFibGVDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSB0YWJlbGlcbiAgdGhDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSBrb21cdTAwRjNyZWsgdGhcbiAgdGRDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSBrb21cdTAwRjNyZWsgdGRcbn1cblxuLy8gRnVua2NqYSBwb21vY25pY3phIGRvIGZvcm1hdG93YW5pYSB3YXJ0b1x1MDE1QmNpIGtvbVx1MDBGM3JraVxuY29uc3QgZm9ybWF0Q2VsbFZhbHVlID0gKHZhbHVlOiBOZXN0ZWROdW1iZXJBcnJheSB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIERsYSB6YWduaWVcdTAxN0NkXHUwMTdDb255Y2ggdGFibGljLCBKU09OLnN0cmluZ2lmeSBtb1x1MDE3Q2UgYnlcdTAxMDcgZG9icnltIHJvendpXHUwMTA1emFuaWVtLlxuICAgIC8vIERsYSBwXHUwMTQyYXNraWNoIHRhYmxpYyBsaWN6YiwgbW9cdTAxN0NuYSB1XHUwMTdDeVx1MDEwNyB2YWx1ZS5qb2luKCcsICcpLlxuICAgIC8vIFR1dGFqIHd5YmllcmFteSBKU09OLnN0cmluZ2lmeSBkbGEgb2dcdTAwRjNsbm9cdTAxNUJjaS5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gXCJbQlx1MDE0Mlx1MDEwNWQgc2VyaWFsaXphY2ppIHRhYmxpY3ldXCI7XG4gICAgfVxuICB9XG4gIHJldHVybiBTdHJpbmcodmFsdWUpOyAvLyBGYWxsYmFja1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIFBsb3RFeGNlbChcbiAgeyBkYXRhLCB0eXBlLCBjYXB0aW9uLCB0YWJsZUNsYXNzTmFtZSwgdGhDbGFzc05hbWUsIHRkQ2xhc3NOYW1lIH06XG4gICAgUGxvdEV4Y2VsUHJvcHMsXG4pOiBKU1guRWxlbWVudCB8IG51bGwge1xuICBpZiAoIWRhdGEgfHwgZGF0YS5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuIDxwPkJyYWsgZGFueWNoIGRvIHd5XHUwMTVCd2lldGxlbmlhLjwvcD47IC8vIEx1YiBudWxsLCBqZVx1MDE1QmxpIG5pZSBjaGNlc3ogbmljIHJlbmRlcm93YVx1MDEwN1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IEFycmF5LmZyb20oZGF0YS5rZXlzKCkpO1xuXG4gIC8vIFVzdGFsZW5pZSBtYWtzeW1hbG5laiBkXHUwMTQydWdvXHUwMTVCY2kgc2VyaWkgZGFueWNoIChkbGEgd3lyXHUwMEYzd25hbmlhIHRhYmVsaSlcbiAgbGV0IG1heExlbmd0aCA9IDA7XG4gIGxldCBoYXNBbnlEYXRhID0gZmFsc2U7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGRhdGEuZ2V0KGtleSk7XG4gICAgaGFzQW55RGF0YSA9IHRydWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBtYXhMZW5ndGggPSBNYXRoLm1heChtYXhMZW5ndGgsIHZhbHVlLmxlbmd0aCk7XG4gICAgfVxuICB9XG4gIC8vIEplXHUwMTVCbGkgc1x1MDEwNSBkYW5lLCBhbGUgbmllIG1hIHRhYmxpYyAobnAuIHNhbWUgc2thbGFyeSkgbHViIHdzenlzdGtpZSB0YWJsaWNlIHNcdTAxMDUgcHVzdGUsXG4gIC8vIHRvIGthXHUwMTdDZGEgc2VyaWEgbWEgZWZla3R5d25pZSBcImRcdTAxNDJ1Z29cdTAxNUJcdTAxMDdcIiAxLlxuICBpZiAoaGFzQW55RGF0YSAmJiBtYXhMZW5ndGggPT09IDApIHtcbiAgICBtYXhMZW5ndGggPSAxO1xuICB9XG4gIGlmIChtYXhMZW5ndGggPT09IDAgJiYga2V5cy5sZW5ndGggPiAwKSB7IC8vIEplXHUwMTVCbGkgc1x1MDEwNSBrbHVjemUsIGFsZSBicmFrIGRhbnljaCAobnAuIG1hcG93YW5pZSBuYSB1bmRlZmluZWQpXG4gICAgbWF4TGVuZ3RoID0gMTsgLy8gUG9rYVx1MDE3QyBwcnp5bmFqbW5pZWogbmFnXHUwMTQyXHUwMEYzd2tpXG4gIH1cblxuICBpZiAodHlwZSA9PT0gXCJjb2xcIikge1xuICAgIC8vIFN0YW5kYXJkb3dhIHRhYmVsYToga2x1Y3plIG1hcHkgamFrbyBuYWdcdTAxNDJcdTAwRjN3a2kga29sdW1uXG4gICAgcmV0dXJuIChcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RhYmxlQ2xhc3NOYW1lfT5cbiAgICAgICAge2NhcHRpb24gJiYgPGNhcHRpb24+e2NhcHRpb259PC9jYXB0aW9uPn1cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIHtrZXlzLm1hcCgoa2V5KSA9PiAoXG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e3RoQ2xhc3NOYW1lfSBrZXk9e2tleX0+XHUzMDEwe2tleX1cdTMwMTE8L3RoPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXhMZW5ndGggfSkubWFwKChfLCByb3dJbmRleCkgPT4gKFxuICAgICAgICAgICAgPHRyIGtleT17YHJvdy0ke3Jvd0luZGV4fWB9PlxuICAgICAgICAgICAgICB7a2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlcmllcyA9IGRhdGEuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGxDb250ZW50OiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlcmllcykpIHtcbiAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllc1tyb3dJbmRleF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kZXggPT09IDApIHsgLy8gV2FydG9cdTAxNUJcdTAxMDcgc2thbGFybmEsIHd5XHUwMTVCd2lldGwgdHlsa28gdyBwaWVyd3N6eW0gd2llcnN6dVxuICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e3RkQ2xhc3NOYW1lfSBrZXk9e2Ake2tleX0tcm93LSR7cm93SW5kZXh9YH0+XG4gICAgICAgICAgICAgICAgICAgIHtjZWxsQ29udGVudH1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicm93XCIpIHtcbiAgICAvLyBUYWJlbGEgdHJhbnNwb25vd2FuYToga2x1Y3plIG1hcHkgamFrbyBuYWdcdTAxNDJcdTAwRjN3a2kgd2llcnN6eVxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzTmFtZX0+XG4gICAgICAgIHtjYXB0aW9uICYmIDxjYXB0aW9uPntjYXB0aW9ufTwvY2FwdGlvbj59XG4gICAgICAgIHsvKiBNb1x1MDE3Q25hIGRvZGFcdTAxMDcgPHRoZWFkPiB6IG5hZ1x1MDE0Mlx1MDBGM3drYW1pIGtvbHVtbiwgamVcdTAxNUJsaSBzXHUwMTA1IHBvdHJ6ZWJuZSwgbnAuIFwiUGFyYW1ldHJcIiwgXCJXYXJ0b1x1MDE1Qlx1MDEwNyAxXCIsIFwiV2FydG9cdTAxNUJcdTAxMDcgMlwiLCAuLi4gKi99XG4gICAgICAgIHsvKiBEbGEgdXByb3N6Y3plbmlhLCBwb21pamFteSA8dGhlYWQ+IHR1dGFqLCBhIHBpZXJ3c3p5IDx0aD4gdyBrYVx1MDE3Q2R5bSB3aWVyc3p1IGR6aWFcdTAxNDJhIGpha28gbmFnXHUwMTQyXHUwMEYzd2VrIHdpZXJzemEgKi99XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7a2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VyaWVzID0gZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e2BzZXJpZXMtcm93LSR7a2V5fWB9PlxuICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cInJvd1wiIGNsYXNzTmFtZT17dGhDbGFzc05hbWV9Plx1MzAxMHtrZXl9XHUzMDExPC90aD57XCIgXCJ9XG4gICAgICAgICAgICAgICAgey8qIE5hZ1x1MDE0Mlx1MDBGM3dlayB3aWVyc3phICovfVxuICAgICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXhMZW5ndGggfSkubWFwKChfLCBjb2xJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGNlbGxDb250ZW50OiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VyaWVzKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsQ29udGVudCA9IGZvcm1hdENlbGxWYWx1ZShzZXJpZXNbY29sSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sSW5kZXggPT09IDApIHsgLy8gV2FydG9cdTAxNUJcdTAxMDcgc2thbGFybmEsIHd5XHUwMTVCd2lldGwgdHlsa28gdyBwaWVyd3N6ZWoga29sdW1uaWUgZGFueWNoXG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX0ga2V5PXtgJHtrZXl9LWNvbC0ke2NvbEluZGV4fWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtjZWxsQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIDxwPk5pZXByYXdpZFx1MDE0Mm93eSB0eXAgdGFiZWxpOiB7dHlwZX08L3A+OyAvLyBGYWxsYmFja1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsY0FBYzs7O0FDQXZCLFNBQWlCLGlCQUFpQjs7O0FDQ2xDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQVFMLFNBR0EsVUFIQSxLQUdBLFlBSEE7QUFERixJQUFNLGlDQUNKLG9CQUFDLFVBQUssR0FBRSxLQUFJLEdBQUUsTUFBSyxPQUFNLE1BQUssUUFBTyxLQUFJLElBQUcsS0FBSTtBQUVsRCxJQUFNLGlDQUNKLGlDQUNFO0FBQUEsc0JBQUMsVUFBSyxHQUFFLE1BQUssR0FBRSxLQUFJLE9BQU0sS0FBSSxRQUFPLE1BQUssSUFBRyxLQUFJO0FBQUEsRUFDaEQsb0JBQUMsVUFBSyxHQUFFLEtBQUksR0FBRSxNQUFLLE9BQU0sTUFBSyxRQUFPLEtBQUksSUFBRyxLQUFJO0FBQUEsR0FDbEQ7QUFvQ0YsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixrQkFBa0I7QUFBQSxFQUNsQixtQkFBbUI7QUFBQSxFQUNuQixTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxVQUFVO0FBQUEsVUFDVixHQUFHO0FBQUEsVUFDSCxhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLEdBQUc7QUFBQSxVQUNILGFBQ0U7QUFBQTtBQUFBLFFBQ0o7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLEdBQUc7QUFBQSxVQUNILGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsVUFBVTtBQUFBLFVBQ1YsR0FBRztBQUFBLFVBQ0gsYUFBYTtBQUFBO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQTtBQUFBLE1BQ2IsYUFBYTtBQUFBO0FBQUEsSUFDZjtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLEdBQUc7QUFBQSxVQUNILGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsVUFBVTtBQUFBLFVBQ1YsR0FBRztBQUFBLFVBQ0gsYUFBYTtBQUFBO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQTtBQUFBLE1BQ2IsYUFBYTtBQUFBO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFdBQVc7QUFBQSxJQUNULE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxNQUNKLEdBQUc7QUFBQSxNQUNILEdBQUc7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxZQUFZO0FBQUEsTUFDVixHQUFHO0FBQUEsTUFDSCxhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sdUJBQXVCO0FBQzdCLElBQU0saUJBQWlCO0FBQ3ZCLElBQU0sd0JBQXdCO0FBQzlCLElBQU0sd0JBQXdCO0FBRXZCLFNBQVMsWUFBWSxPQUFzQztBQUNoRSxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOO0FBQUEsSUFDQTtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQTtBQUFBLElBRUEsR0FBRztBQUFBLEVBQ0wsSUFBSTtBQUVKLFFBQU0sV0FBVyxPQUF5QixJQUFJO0FBRzlDLFlBQVUsTUFBTTtBQUNkLFFBQUksU0FBUyxTQUFTO0FBQ3BCLFVBQUksVUFBVSxRQUFXO0FBQ3ZCLGlCQUFTLFFBQVEsUUFBUSxPQUFPLEtBQUs7QUFBQSxNQUN2QyxXQUFXLGlCQUFpQixRQUFXO0FBQ3JDLGlCQUFTLFFBQVEsUUFBUSxPQUFPLFlBQVk7QUFBQSxNQUM5QyxPQUFPO0FBQ0wsaUJBQVMsUUFBUSxRQUFRO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsRUFDRixHQUFHLENBQUMsT0FBTyxZQUFZLENBQUM7QUFFeEIsUUFBTSxhQUFhLFlBQVksQ0FBQyxjQUE2QjtBQUMzRCxRQUFJLFNBQVMsV0FBVyxDQUFDLFlBQVksQ0FBQyxVQUFVO0FBQzlDLFVBQUksY0FBYyxLQUFNLFVBQVMsUUFBUSxPQUFPO0FBQUEsVUFDM0MsVUFBUyxRQUFRLFNBQVM7QUFHL0IsWUFBTSxRQUFRLElBQUksTUFBTSxTQUFTLEVBQUUsU0FBUyxNQUFNLFlBQVksS0FBSyxDQUFDO0FBQ3BFLGVBQVMsUUFBUSxjQUFjLEtBQUs7QUFBQSxJQUN0QztBQUFBLEVBQ0YsR0FBRyxDQUFDLFVBQVUsUUFBUSxDQUFDO0FBRXZCLFFBQU0sa0JBQWtCLFlBQVksTUFBTSxXQUFXLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUMxRSxRQUFNLGtCQUFrQixZQUFZLE1BQU0sV0FBVyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFFeEUsUUFBTSxvQkFBb0IsWUFBWSxNQUFNO0FBQzFDLFFBQUksU0FBUyxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVU7QUFDOUMsWUFBTSxXQUFXLE9BQU87QUFDeEIsZUFBUyxRQUFRLFFBQVEsT0FBTyxRQUFRO0FBR3hDLFVBQUksY0FBZSxlQUFjLFVBQVUsSUFBSTtBQUMvQyxVQUFJLFVBQVU7QUFDWixjQUFNLFFBQVEsSUFBSSxNQUFNLFVBQVU7QUFBQSxVQUNoQyxTQUFTO0FBQUEsUUFDWCxDQUFDO0FBQ0QsZUFBTyxlQUFlLE9BQU8sVUFBVTtBQUFBLFVBQ3JDLFVBQVU7QUFBQSxVQUNWLE9BQU8sU0FBUztBQUFBLFFBQ2xCLENBQUM7QUFDRCxlQUFPLGVBQWUsT0FBTyxpQkFBaUI7QUFBQSxVQUM1QyxVQUFVO0FBQUEsVUFDVixPQUFPLFNBQVM7QUFBQSxRQUNsQixDQUFDO0FBQ0QsaUJBQVMsS0FBSztBQUFBLE1BQ2hCO0FBQ0EsY0FBUSxJQUFJLHVDQUF1QztBQUFBLElBQ3JEO0FBQUEsRUFDRixHQUFHLENBQUMsVUFBVSxVQUFVLE1BQU0sZUFBZSxRQUFRLENBQUM7QUFHdEQsUUFBTSxvQkFBb0IsQ0FBQyxNQUFrRDtBQUMzRSxVQUFNLFNBQVMsRUFBRTtBQUNqQixVQUFNLFdBQVcsT0FBTztBQUN4QixRQUFJO0FBRUosUUFBSSxhQUFhLElBQUk7QUFDbkIscUJBQWU7QUFBQSxJQUNqQixPQUFPO0FBRUwsWUFBTSxTQUFTLFdBQVcsUUFBUTtBQUNsQyxxQkFBZSxNQUFNLE1BQU0sSUFBSSxTQUFZO0FBQUEsSUFDN0M7QUFFQSxRQUFJLGVBQWU7QUFDakIsb0JBQWMsY0FBYyxJQUFJO0FBQUEsSUFDbEM7QUFHQSxRQUFJLFVBQVU7QUFDWixlQUFTLENBQUM7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUdBLFFBQU0saUJBQWlCLGNBQWMsbUJBQW1CO0FBQ3hELFFBQU0sa0JBQWtCLGNBQWMsb0JBQW9CO0FBRzFELFFBQU0saUJBQW9DO0FBQUEsSUFDeEMsVUFBVTtBQUFBLElBQ1YsTUFBTSxHQUFHLGNBQWMsVUFBVSxLQUFLLElBQUksU0FBUztBQUFBLElBQ25ELEtBQUssR0FBRyxjQUFjLFVBQVUsS0FBSyxJQUFJLFNBQVM7QUFBQSxJQUNsRCxPQUFPLEdBQUcsY0FBYyxVQUFVLEtBQUssUUFBUSxTQUFTO0FBQUEsSUFDeEQsUUFBUSxHQUFHLGNBQWMsVUFBVSxLQUFLLFNBQVMsU0FBUztBQUFBLElBQzFELFFBQVE7QUFBQSxJQUNSLGlCQUFpQjtBQUFBLElBQ2pCLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLFVBQVUsR0FBRyxLQUFLLElBQUksR0FBRyxLQUFLLFNBQVMsQ0FBQztBQUFBO0FBQUEsSUFDeEMsU0FBUztBQUFBLElBQ1QsU0FBUyxLQUFLLEtBQUssSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDO0FBQUEsSUFDeEMsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2Ysa0JBQWtCO0FBQUEsSUFDbEIsWUFBWTtBQUFBLElBQ1osUUFBUTtBQUFBLEVBQ1Y7QUFLQSxRQUFNLGtCQUFrQjtBQUN4QixRQUFNLDZCQUE2QixjQUFjLG9CQUFvQixRQUNsRSxZQUFZLE1BQU0sSUFBSSxZQUFZO0FBQ3JDLFFBQU0sa0JBQWtCLE9BQU8sNkJBQTZCO0FBRTVELE1BQUksZUFBdUI7QUFDM0IsTUFBSSxVQUFVLFFBQVc7QUFDdkIsbUJBQWUsT0FBTyxLQUFLO0FBQUEsRUFDN0IsV0FBVyxpQkFBaUIsUUFBVztBQUNyQyxtQkFBZSxPQUFPLFlBQVk7QUFBQSxFQUNwQztBQUVBLFFBQU0sdUJBQTBDO0FBQUEsSUFDOUMsUUFBUSxZQUFZLFdBQVcsWUFBWTtBQUFBLEVBQzdDO0FBRUEsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVyxHQUFHLG9CQUFvQixJQUFJLG9CQUFvQixFQUFFO0FBQUEsTUFDNUQsT0FBTztBQUFBLFFBQ0wsT0FBTyxHQUFHLGNBQWM7QUFBQSxRQUN4QixRQUFRLEdBQUcsZUFBZTtBQUFBLFFBQzFCLFVBQVU7QUFBQSxRQUNWLFVBQVU7QUFBQSxRQUNWLEdBQUc7QUFBQSxNQUNMO0FBQUEsTUFDQyxHQUFHO0FBQUEsTUFFSjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxXQUFXLEdBQUcsY0FBYyxJQUFJLGdCQUFnQixFQUFFO0FBQUEsWUFDbEQsYUFBVTtBQUFBLFlBQ1YsT0FBTTtBQUFBLFlBQ04sU0FBUyxPQUFPLGNBQWMsZ0JBQWdCLElBQUksY0FBYyxpQkFBaUI7QUFBQSxZQUNqRixPQUFPO0FBQUEsY0FDTCxTQUFTO0FBQUEsY0FDVCxPQUFPO0FBQUEsY0FDUCxRQUFRO0FBQUEsY0FDUixVQUFVO0FBQUEsY0FDVixLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0EsZUFBWTtBQUFBLFlBR1o7QUFBQTtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxXQUFXO0FBQUEsa0JBQ1gsYUFBVyxjQUFjLFFBQVEsT0FBTztBQUFBLGtCQUN4QyxTQUFTLENBQUMsV0FBVyxvQkFBb0I7QUFBQSxrQkFDekMsT0FBTyxFQUFFLEdBQUcsc0JBQXNCLEdBQUkscUJBQXFCLENBQUMsRUFBRztBQUFBLGtCQUMvRCxlQUFlLFdBQVcsU0FBUztBQUFBLGtCQUVsQyx3QkFBYyxRQUFRLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxNQUMxQztBQUFBLG9CQUFDO0FBQUE7QUFBQSxzQkFFQyxhQUFXLEVBQUU7QUFBQSxzQkFDYixHQUFHLEVBQUU7QUFBQSxzQkFDTCxNQUFNLG9CQUFvQixFQUFFO0FBQUE7QUFBQSxvQkFIdkIsZUFBZSxDQUFDO0FBQUEsa0JBSXZCLENBQ0Q7QUFBQTtBQUFBLGNBQ0g7QUFBQSxjQUdBO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLGFBQVcsY0FBYyxVQUFVO0FBQUEsa0JBQ25DLE9BQU8sa0JBQWtCLENBQUM7QUFBQSxrQkFFMUI7QUFBQTtBQUFBLHNCQUFDO0FBQUE7QUFBQSx3QkFDQyxHQUFHLGNBQWMsVUFBVSxLQUFLO0FBQUEsd0JBQ2hDLEdBQUcsY0FBYyxVQUFVLEtBQUs7QUFBQSx3QkFDaEMsT0FBTyxjQUFjLFVBQVUsS0FBSztBQUFBLHdCQUNwQyxRQUFRLGNBQWMsVUFBVSxLQUFLO0FBQUEsd0JBQ3JDLE1BQU0scUJBQXFCLGNBQWMsVUFBVSxLQUFLO0FBQUE7QUFBQSxvQkFDMUQ7QUFBQSxvQkFDQTtBQUFBLHNCQUFDO0FBQUE7QUFBQSx3QkFDQyxHQUFHLGNBQWMsVUFBVSxXQUFXO0FBQUEsd0JBQ3RDLE1BQU0sdUJBQ0osY0FBYyxVQUFVLFdBQVc7QUFBQTtBQUFBLG9CQUN2QztBQUFBO0FBQUE7QUFBQSxjQUNGO0FBQUEsY0FHQTtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxXQUFXO0FBQUEsa0JBQ1gsYUFBVyxjQUFjLFFBQVEsVUFBVTtBQUFBLGtCQUMzQyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsa0JBQWtCO0FBQUEsa0JBQ3BELE9BQU8sRUFBRSxHQUFHLHNCQUFzQixHQUFJLHdCQUF3QixDQUFDLEVBQUc7QUFBQSxrQkFDbEUsZUFBZSxZQUFZLFdBQVcsU0FBUztBQUFBLGtCQUU5QztBQUFBLGtDQUFjLFFBQVEsVUFBVSxNQUFNLElBQUksQ0FBQyxHQUFHLE1BQzdDO0FBQUEsc0JBQUM7QUFBQTtBQUFBLHdCQUVDLGFBQVcsRUFBRTtBQUFBLHdCQUNiLEdBQUcsRUFBRTtBQUFBLHdCQUNMLE1BQU0sdUJBQXVCLEVBQUU7QUFBQTtBQUFBLHNCQUgxQixZQUFZLENBQUM7QUFBQSxvQkFJcEIsQ0FDRDtBQUFBLG9CQVFEO0FBQUEsc0JBQUM7QUFBQTtBQUFBLHdCQUNDLFdBQVcsYUFBYSxjQUFjLFFBQVEsVUFBVSxXQUFXLEtBQUssY0FBYyxRQUFRLFVBQVUsV0FBVyxXQUFXLGVBQWUsZ0JBQzNJLGtCQUFrQixDQUNwQixNQUFNLGtCQUFrQixDQUFDO0FBQUEsd0JBQ3pCLE9BQU8sRUFBRSxlQUFlLE9BQU87QUFBQSx3QkFFL0I7QUFBQSwwQkFBQztBQUFBO0FBQUEsNEJBQ0MsU0FBUyxPQUFPLGVBQWUsSUFBSSxlQUFlO0FBQUEsNEJBQ2xELE9BQU87QUFBQSw0QkFDUCxRQUFRO0FBQUEsNEJBQ1IsTUFBSztBQUFBLDRCQUNMLFVBQVM7QUFBQSw0QkFFUjtBQUFBO0FBQUEsd0JBQ0g7QUFBQTtBQUFBLG9CQUNGO0FBQUE7QUFBQTtBQUFBLGNBQ0Y7QUFBQSxjQUdBO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLFdBQVc7QUFBQSxrQkFDWCxhQUFXLGNBQWMsUUFBUSxVQUFVO0FBQUEsa0JBQzNDLFNBQVMsQ0FBQyxZQUFZLENBQUMsV0FBVyxrQkFBa0I7QUFBQSxrQkFDcEQsT0FBTyxFQUFFLEdBQUcsc0JBQXNCLEdBQUksd0JBQXdCLENBQUMsRUFBRztBQUFBLGtCQUNsRSxlQUFlLFlBQVksV0FBVyxTQUFTO0FBQUEsa0JBRTlDO0FBQUEsa0NBQWMsUUFBUSxVQUFVLE1BQU0sSUFBSSxDQUFDLEdBQUcsTUFDN0M7QUFBQSxzQkFBQztBQUFBO0FBQUEsd0JBRUMsYUFBVyxFQUFFO0FBQUEsd0JBQ2IsR0FBRyxFQUFFO0FBQUEsd0JBQ0wsTUFBTSx1QkFBdUIsRUFBRTtBQUFBO0FBQUEsc0JBSDFCLFlBQVksQ0FBQztBQUFBLG9CQUlwQixDQUNEO0FBQUEsb0JBUUQ7QUFBQSxzQkFBQztBQUFBO0FBQUEsd0JBQ0MsV0FBVyxhQUFhLGNBQWMsUUFBUSxVQUFVLFdBQVcsS0FBSyxjQUFjLFFBQVEsVUFBVSxXQUFXLFdBQVcsZUFBZSxnQkFDM0ksa0JBQWtCLENBQ3BCLE1BQU0sa0JBQWtCLENBQUM7QUFBQSx3QkFDekIsT0FBTyxFQUFFLGVBQWUsT0FBTztBQUFBLHdCQUUvQjtBQUFBLDBCQUFDO0FBQUE7QUFBQSw0QkFDQyxTQUFTLE9BQU8sZUFBZSxJQUFJLGVBQWU7QUFBQSw0QkFDbEQsT0FBTztBQUFBLDRCQUNQLFFBQVE7QUFBQSw0QkFDUixNQUFLO0FBQUEsNEJBQ0wsVUFBUztBQUFBLDRCQUVSO0FBQUE7QUFBQSx3QkFDSDtBQUFBO0FBQUEsb0JBQ0Y7QUFBQTtBQUFBO0FBQUEsY0FDRjtBQUFBO0FBQUE7QUFBQSxRQUNGO0FBQUEsUUFFQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsV0FBVyxHQUFHLHFCQUFxQixJQUFJLGtCQUFrQixFQUFFO0FBQUEsWUFDM0QsTUFBSztBQUFBLFlBQ0w7QUFBQSxZQUNBO0FBQUEsWUFDQSxPQUFPO0FBQUEsWUFDUDtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0EsU0FBUztBQUFBLFlBQ1QsT0FBTztBQUFBLFlBQ1AsY0FBWSxNQUFNLFlBQVksS0FBSztBQUFBLFlBQ2xDLEdBQUc7QUFBQTtBQUFBLFFBQ047QUFBQTtBQUFBO0FBQUEsRUFNRjtBQUVKOzs7QUN0Yk8sU0FBUyxNQUNkLGFBQ0EsYUFDYztBQUdkLFFBQU0sSUFBaUIsb0JBQUksSUFBb0M7QUFJL0QsUUFBTSxzQkFBc0IsQ0FBQyxNQUFNLFFBQVEsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFJO0FBQzFFLHNCQUFvQixRQUFRLFVBQVE7QUFDbEMsTUFBRSxJQUFJLEtBQUssS0FBSyxLQUFLLEdBQUc7QUFBQSxFQUMxQixDQUFDO0FBR0QsTUFBSSxhQUFhO0FBRWYsVUFBTSxzQkFBc0IsQ0FBQyxNQUFNLFFBQVEsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFJO0FBRTFFLHdCQUFvQixRQUFRLGNBQVk7QUFDdEMsVUFBSTtBQUVGLGNBQU0sY0FBYyxTQUFTLElBQUksQ0FBQztBQUVsQyxVQUFFLElBQUksU0FBUyxLQUFLLFdBQVc7QUFBQSxNQUNqQyxTQUFTLE9BQU87QUFDZCxnQkFBUSxNQUFNLCtDQUFxQyxTQUFTLEdBQUcsTUFBTSxpQkFBaUIsUUFBUSxNQUFNLFVBQVUsT0FBTyxLQUFLLENBQUM7QUFHM0gsVUFBRSxJQUFJLFNBQVMsS0FBSyxNQUFnQjtBQUFBLE1BQ3RDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLFNBQU87QUFDVDtBQW1DTyxTQUFTLHVCQUF1QixTQUFpQixNQUFjLE9BQXlCO0FBQzdGLFFBQU0sU0FBbUIsQ0FBQztBQUUxQixNQUFJLFNBQVMsR0FBRztBQUdkLFFBQUksWUFBWSxPQUFPO0FBQ3JCLGFBQU8sS0FBSyxPQUFPO0FBQUEsSUFDckI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksT0FBTyxHQUFHO0FBRVosUUFBSSxVQUFVLE9BQU87QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFDQSxhQUFTLGVBQWUsU0FBUyxnQkFBZ0IsT0FBTyxnQkFBZ0IsTUFBTTtBQUM1RSxhQUFPLEtBQUssWUFBWTtBQUFBLElBQzFCO0FBQUEsRUFDRixPQUFPO0FBRUwsUUFBSSxVQUFVLE9BQU87QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFDQSxhQUFTLGVBQWUsU0FBUyxnQkFBZ0IsT0FBTyxnQkFBZ0IsTUFBTTtBQUM1RSxhQUFPLEtBQUssWUFBWTtBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDs7O0FDL0hPLFNBQVMsVUFBVSxHQUFpQjtBQUN6QyxTQUFPLEtBQUssTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDO0FBQ2hDO0FBUU8sU0FBUyxXQUFXLEdBQVcsR0FBVyxHQUFXLEdBQW1CO0FBQzdFLFNBQU8sSUFBSSxNQUFNLElBQUksS0FBSztBQUM1QjtBQVFPLFNBQVMsU0FBUyxHQUFtQjtBQUMxQyxNQUFJLEtBQUssS0FBSyxDQUFDLE9BQU8sVUFBVSxDQUFDLEdBQUc7QUFDbEMsVUFBTSxJQUFJLE1BQU0sdUVBQThDO0FBQUEsRUFDaEU7QUFDQSxTQUFPLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztBQUN6QjtBQUVPLFNBQVMsb0JBQW9CLEdBQVcsR0FBVyxHQUFXLEdBQW1CO0FBQ3RGLFNBQU8sSUFBSSxNQUFNLFNBQVMsQ0FBQyxJQUFJLEtBQUs7QUFDdEM7QUFHTyxTQUFTLG1CQUFtQixLQUFxQjtBQUN0RCxTQUFRLE9BQU8sUUFBUSxZQUFZLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxVQUFVLEdBQUcsS0FDdEUsT0FBTztBQUNUO0FBQ08sU0FBUywyQkFBMkIsS0FBcUI7QUFDOUQsU0FBUSxPQUFPLFFBQVEsWUFBWSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sVUFBVSxHQUFHLEtBQ3RFLE1BQU07QUFDUjtBQUVPLFNBQVMsc0JBQXNCLEdBQVUsS0FBYSxNQUE2RDtBQUN4SCxNQUFJLENBQUMsTUFBTSxRQUFRLEdBQUcsR0FBRztBQUN2QixVQUFNLElBQUk7QUFBQSxNQUNSLFdBQVcsQ0FBQztBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQ0EsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsVUFBSSxJQUFJLEtBQUssa0JBQWtCLEdBQUc7QUFBQyxjQUFNLElBQUk7QUFBQSxVQUN6QyxnQ0FBZ0MsQ0FBQztBQUFBLFFBQ25DO0FBQUEsTUFDRjtBQUNBO0FBQUEsSUFDRixLQUFLO0FBQ0gsVUFBSSxJQUFJLEtBQUssMEJBQTBCLEdBQUc7QUFBQyxjQUFNLElBQUk7QUFBQSxVQUNuRCxnQ0FBZ0MsQ0FBQztBQUFBLFFBQ25DO0FBQUEsTUFDQTtBQUNBO0FBQUEsRUFDSjtBQUNGOzs7QUNwQlcsZ0JBQUFBLE1BZ0NHLFFBQUFDLGFBaENIO0FBckJYLElBQU0sa0JBQWtCLENBQUMsVUFBaUQ7QUFDeEUsTUFBSSxVQUFVLFVBQWEsVUFBVSxLQUFNLFFBQU87QUFDbEQsTUFBSSxPQUFPLFVBQVUsU0FBVSxRQUFPLE9BQU8sS0FBSztBQUNsRCxNQUFJLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFJeEIsUUFBSTtBQUNGLGFBQU8sS0FBSyxVQUFVLEtBQUs7QUFBQSxJQUM3QixTQUFTLEdBQUc7QUFDVixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDQSxTQUFPLE9BQU8sS0FBSztBQUNyQjtBQUVPLFNBQVMsVUFDZCxFQUFFLE1BQU0sTUFBTSxTQUFTLGdCQUFnQixhQUFhLFlBQVksR0FFNUM7QUFDcEIsTUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEdBQUc7QUFDNUIsV0FBTyxnQkFBQUQsS0FBQyxPQUFFLCtDQUE0QjtBQUFBLEVBQ3hDO0FBRUEsUUFBTSxPQUFPLE1BQU0sS0FBSyxLQUFLLEtBQUssQ0FBQztBQUduQyxNQUFJLFlBQVk7QUFDaEIsTUFBSSxhQUFhO0FBQ2pCLGFBQVcsT0FBTyxNQUFNO0FBQ3RCLFVBQU0sUUFBUSxLQUFLLElBQUksR0FBRztBQUMxQixpQkFBYTtBQUNiLFFBQUksTUFBTSxRQUFRLEtBQUssR0FBRztBQUN4QixrQkFBWSxLQUFLLElBQUksV0FBVyxNQUFNLE1BQU07QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFHQSxNQUFJLGNBQWMsY0FBYyxHQUFHO0FBQ2pDLGdCQUFZO0FBQUEsRUFDZDtBQUNBLE1BQUksY0FBYyxLQUFLLEtBQUssU0FBUyxHQUFHO0FBQ3RDLGdCQUFZO0FBQUEsRUFDZDtBQUVBLE1BQUksU0FBUyxPQUFPO0FBRWxCLFdBQ0UsZ0JBQUFDLE1BQUMsV0FBTSxXQUFXLGdCQUNmO0FBQUEsaUJBQVcsZ0JBQUFELEtBQUMsYUFBUyxtQkFBUTtBQUFBLE1BQzlCLGdCQUFBQSxLQUFDLFdBQ0MsMEJBQUFBLEtBQUMsUUFDRSxlQUFLLElBQUksQ0FBQyxRQUNULGdCQUFBQyxNQUFDLFFBQUcsV0FBVyxhQUF1QjtBQUFBO0FBQUEsUUFBRTtBQUFBLFFBQUk7QUFBQSxXQUFYLEdBQVksQ0FDOUMsR0FDSCxHQUNGO0FBQUEsTUFDQSxnQkFBQUQsS0FBQyxXQUNFLGdCQUFNLEtBQUssRUFBRSxRQUFRLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLGFBQ3pDLGdCQUFBQSxLQUFDLFFBQ0UsZUFBSyxJQUFJLENBQUMsUUFBUTtBQUNqQixjQUFNLFNBQVMsS0FBSyxJQUFJLEdBQUc7QUFDM0IsWUFBSSxjQUFzQjtBQUMxQixZQUFJLE1BQU0sUUFBUSxNQUFNLEdBQUc7QUFDekIsd0JBQWMsZ0JBQWdCLE9BQU8sUUFBUSxDQUFDO0FBQUEsUUFDaEQsV0FBVyxhQUFhLEdBQUc7QUFDekIsd0JBQWMsZ0JBQWdCLE1BQU07QUFBQSxRQUN0QztBQUNBLGVBQ0UsZ0JBQUFBLEtBQUMsUUFBRyxXQUFXLGFBQ1oseUJBRDhCLEdBQUcsR0FBRyxRQUFRLFFBQVEsRUFFdkQ7QUFBQSxNQUVKLENBQUMsS0FkTSxPQUFPLFFBQVEsRUFleEIsQ0FDRCxHQUNIO0FBQUEsT0FDRjtBQUFBLEVBRUosV0FBVyxTQUFTLE9BQU87QUFFekIsV0FDRSxnQkFBQUMsTUFBQyxXQUFNLFdBQVcsZ0JBQ2Y7QUFBQSxpQkFBVyxnQkFBQUQsS0FBQyxhQUFTLG1CQUFRO0FBQUEsTUFHOUIsZ0JBQUFBLEtBQUMsV0FDRSxlQUFLLElBQUksQ0FBQyxRQUFRO0FBQ2pCLGNBQU0sU0FBUyxLQUFLLElBQUksR0FBRztBQUMzQixlQUNFLGdCQUFBQyxNQUFDLFFBQ0M7QUFBQSwwQkFBQUEsTUFBQyxRQUFHLE9BQU0sT0FBTSxXQUFXLGFBQWE7QUFBQTtBQUFBLFlBQUU7QUFBQSxZQUFJO0FBQUEsYUFBQztBQUFBLFVBQU07QUFBQSxVQUVwRCxNQUFNLEtBQUssRUFBRSxRQUFRLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLGFBQWE7QUFDdEQsZ0JBQUksY0FBc0I7QUFDMUIsZ0JBQUksTUFBTSxRQUFRLE1BQU0sR0FBRztBQUN6Qiw0QkFBYyxnQkFBZ0IsT0FBTyxRQUFRLENBQUM7QUFBQSxZQUNoRCxXQUFXLGFBQWEsR0FBRztBQUN6Qiw0QkFBYyxnQkFBZ0IsTUFBTTtBQUFBLFlBQ3RDO0FBQ0EsbUJBQ0UsZ0JBQUFELEtBQUMsUUFBRyxXQUFXLGFBQ1oseUJBRDhCLEdBQUcsR0FBRyxRQUFRLFFBQVEsRUFFdkQ7QUFBQSxVQUVKLENBQUM7QUFBQSxhQWZNLGNBQWMsR0FBRyxFQWdCMUI7QUFBQSxNQUVKLENBQUMsR0FDSDtBQUFBLE9BQ0Y7QUFBQSxFQUVKO0FBRUEsU0FBTyxnQkFBQUMsTUFBQyxPQUFFO0FBQUE7QUFBQSxJQUEyQjtBQUFBLEtBQUs7QUFDNUM7OztBSmlJTSxTQTBGRSxZQUFBQyxXQTFGRixPQUFBQyxNQWdCRSxRQUFBQyxhQWhCRjtBQXRQQyxTQUFTLE1BQU07QUFDcEIsUUFBTSxPQUFPLFVBQVUsQ0FBQztBQUN4QixRQUFNLEtBQUssVUFBVSxFQUFFO0FBQ3ZCLFFBQU0sVUFBVSxVQUF3QixvQkFBSSxJQUEwQixDQUFDO0FBRXZFLFFBQU0sWUFBWSxNQUFNO0FBRXRCLFFBQUksTUFBTSxPQUFPLEtBQUssS0FBSyxDQUFDLEtBQUssTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUc7QUFDeEQsY0FBUSxNQUFNLHFEQUEyQztBQUN6RCxjQUFRLFFBQVEsb0JBQUksSUFBMEI7QUFDOUM7QUFBQSxJQUNGO0FBRUEsVUFBTSxZQUE0QjtBQUFBLE1BQ2hDO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxLQUFLLHVCQUF1QixPQUFPLEtBQUssS0FBSyxHQUFHLEdBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUFBLE1BQ3JFO0FBQUEsSUFDRjtBQUNBLFVBQU0sWUFBNEI7QUFBQSxNQUNoQztBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsS0FBSyxDQUFDLGFBQWE7QUFDakIsZ0JBQU0sV0FBVyxTQUFTLElBQUksR0FBRztBQUNqQyxVQUFNLHNCQUFzQixLQUFLLFVBQVUsb0JBQW9CO0FBRS9ELGlCQUFPLFNBQVM7QUFBQSxZQUFJLENBQUMsT0FBTyxXQUNwQixVQUFVLEtBQWU7QUFBQSxVQUNqQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsS0FBSyxDQUFDLGFBQWE7QUFDakIsZ0JBQU0sV0FBVyxTQUFTLElBQUksR0FBRztBQUNqQyxVQUFNO0FBQUEsWUFDSjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUdBLGlCQUFPLFNBQVM7QUFBQSxZQUFJLENBQUMsT0FBTyxXQUNwQixXQUFXLE9BQWlCLEdBQUcsR0FBRyxDQUFDO0FBQUEsVUFDM0M7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLEtBQUssQ0FBQyxhQUFhO0FBQ2pCLGdCQUFNLFdBQVcsU0FBUyxJQUFJLEdBQUc7QUFDakMsVUFBTTtBQUFBLFlBQ0o7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFHQSxpQkFBTyxTQUFTO0FBQUEsWUFBSSxDQUFDLE9BQU8sV0FDcEIsV0FBVyxPQUFpQixHQUFHLEdBQUcsRUFBRTtBQUFBLFVBQzVDO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxLQUFLLENBQUMsYUFBYTtBQUNqQixnQkFBTSxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFVBQU07QUFBQSxZQUNKO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBR0EsaUJBQU8sU0FBUztBQUFBLFlBQUksQ0FBQyxPQUFPLFdBQ3BCLFdBQVcsT0FBaUIsS0FBSyxHQUFHLEVBQUU7QUFBQSxVQUM5QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsS0FBSyxDQUFDLGFBQWE7QUFDakIsZ0JBQU0sV0FBVyxTQUFTLElBQUksR0FBRztBQUNqQyxVQUFNLHNCQUFzQixLQUFLLFVBQVUsb0JBQW9CO0FBQy9ELGdCQUFNLFlBQVksU0FBUyxJQUFJLElBQUk7QUFDbkMsVUFBTTtBQUFBLFlBQ0o7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFHQSxpQkFBTyxTQUFTO0FBQUEsWUFBSSxDQUFDLE9BQU8sVUFDekIsUUFBbUIsVUFBVSxLQUFLO0FBQUEsVUFDckM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLEtBQUssQ0FBQyxhQUFhO0FBQ2pCLGdCQUFNLFdBQVcsU0FBUyxJQUFJLEdBQUc7QUFDakMsVUFBTSxzQkFBc0IsS0FBSyxVQUFVLG9CQUFvQjtBQUMvRCxnQkFBTSxZQUFZLFNBQVMsSUFBSSxJQUFJO0FBQ25DLFVBQU07QUFBQSxZQUNKO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBR0EsaUJBQU8sU0FBUztBQUFBLFlBQUksQ0FBQyxPQUFPLFVBQzFCLFVBQVUsS0FBSyxJQUFLO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLEtBQUssQ0FBQyxhQUFhO0FBQ2pCLGdCQUFNLFdBQVcsU0FBUyxJQUFJLEdBQUc7QUFDakMsVUFBTSxzQkFBc0IsS0FBSyxVQUFVLG9CQUFvQjtBQUkvRCxpQkFBTyxTQUFTO0FBQUEsWUFBSSxDQUFDLE9BQU8sVUFDcEIsV0FBaUIsVUFBVSxLQUFlLEdBQUcsS0FBSyxHQUFHLEVBQUUsSUFDNUQ7QUFBQSxVQUNIO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxLQUFLLENBQUMsYUFBYTtBQUNqQixnQkFBTSxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFVBQU0sc0JBQXNCLEtBQUssVUFBVSxvQkFBb0I7QUFFL0QsaUJBQU8sU0FBUztBQUFBLFlBQUksQ0FBQyxPQUFPLFdBQ3BCLFNBQVMsS0FBZTtBQUFBLFVBQ2hDO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxLQUFLLENBQUMsYUFBYTtBQUNqQixnQkFBTSxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFVBQU0sc0JBQXNCLEtBQUssVUFBVSxvQkFBb0I7QUFFL0QsaUJBQU8sU0FBUztBQUFBLFlBQUksQ0FBQyxPQUFPLFdBQ3BCLFNBQVMsS0FBZTtBQUFBLFVBQ2hDO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxLQUFLLENBQUMsYUFBYTtBQUNqQixnQkFBTSxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFVBQU0sc0JBQXNCLEtBQUssVUFBVSxvQkFBb0I7QUFFL0QsaUJBQU8sU0FBUztBQUFBLFlBQUksQ0FBQyxPQUFPLFdBQ3BCLG9CQUFvQixPQUFpQixHQUFHLEdBQUcsQ0FBQztBQUFBLFVBQ3BEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxLQUFLLENBQUMsYUFBYTtBQUNqQixnQkFBTSxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFVBQU0sc0JBQXNCLEtBQUssVUFBVSxvQkFBb0I7QUFFL0QsaUJBQU8sU0FBUztBQUFBLFlBQUksQ0FBQyxPQUFPLFdBQ3BCLG9CQUFvQixPQUFpQixHQUFHLEdBQUcsQ0FBQztBQUFBLFVBQ3BEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxLQUFLLENBQUMsYUFBYTtBQUNqQixnQkFBTSxXQUFXLFNBQVMsSUFBSSxHQUFHO0FBQ2pDLFVBQU0sc0JBQXNCLEtBQUssVUFBVSxvQkFBb0I7QUFFL0QsaUJBQU8sU0FBUztBQUFBLFlBQUksQ0FBQyxPQUFPLFdBQ3pCLFFBQ0ssb0JBQW9CLE9BQWlCLEdBQUcsR0FBRyxDQUFDO0FBQUEsVUFDcEQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLEtBQUssQ0FBQyxhQUFhO0FBQ2pCLGdCQUFNLFdBQVcsU0FBUyxJQUFJLEdBQUc7QUFDakMsVUFBTSxzQkFBc0IsS0FBSyxVQUFVLG9CQUFvQjtBQUUvRCxpQkFBTyxTQUFTO0FBQUEsWUFBSSxDQUFDLE9BQU8sV0FDekIsUUFDSyxvQkFBb0IsT0FBaUIsR0FBRyxHQUFHLENBQUM7QUFBQSxVQUNwRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsS0FBSyxDQUFDLGFBQWE7QUFDakIsZ0JBQU0sV0FBVyxTQUFTLElBQUksR0FBRztBQUNqQyxVQUFNLHNCQUFzQixLQUFLLFVBQVUsb0JBQW9CO0FBRS9ELGlCQUFPLFNBQVM7QUFBQSxZQUFJLENBQUMsT0FBTyxXQUN4QixRQUNNLG9CQUFvQixPQUFpQixHQUFHLEdBQUcsQ0FBQyxJQUFLO0FBQUEsVUFDM0Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLEtBQUssQ0FBQyxhQUFhO0FBQ2pCLGdCQUFNLFdBQVcsU0FBUyxJQUFJLEdBQUc7QUFDakMsVUFBTSxzQkFBc0IsS0FBSyxVQUFVLG9CQUFvQjtBQUUvRCxpQkFBTyxTQUFTO0FBQUEsWUFBSSxDQUFDLE9BQU8sV0FDeEIsUUFDTSxvQkFBb0IsT0FBaUIsR0FBRyxHQUFHLENBQUMsSUFBSztBQUFBLFVBQzNEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsWUFBUSxRQUFRLE1BQU0sV0FBVyxTQUFTO0FBQUEsRUFDNUM7QUFLQSxRQUFNLG1CQUFtQixDQUFDLGFBQWlDO0FBQ3pELFFBQUksYUFBYSxRQUFXO0FBQzFCLFdBQUssUUFBUTtBQUFBLElBQ2YsT0FBTztBQUNMLFdBQUssUUFBUTtBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxpQkFBaUIsQ0FBQyxhQUFpQztBQUN2RCxRQUFJLGFBQWEsUUFBVztBQUMxQixTQUFHLFFBQVE7QUFBQSxJQUNiLE9BQU87QUFDTCxTQUFHLFFBQVE7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUVBLFNBQ0UsZ0JBQUFBLE1BQUMsVUFDQztBQUFBLG9CQUFBRCxLQUFDLFFBQUcsc0NBQXdCO0FBQUEsSUFDNUIsZ0JBQUFDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsVUFDWixLQUFLO0FBQUEsVUFDTCxjQUFjO0FBQUEsVUFDZCxVQUFVO0FBQUEsUUFDWjtBQUFBLFFBRUE7QUFBQSwwQkFBQUQ7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVM7QUFBQSxjQUNULE9BQU8sRUFBRSxTQUFTLGVBQWUsVUFBVSxPQUFPO0FBQUEsY0FDbkQ7QUFBQTtBQUFBLFVBRUQ7QUFBQSxVQUNBLGdCQUFBQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGdCQUNMLFFBQVE7QUFBQSxnQkFDUixjQUFjO0FBQUEsZ0JBQ2QsU0FBUztBQUFBLGdCQUNULFdBQVc7QUFBQSxnQkFDWCxjQUFjO0FBQUEsZ0JBQ2QsU0FBUztBQUFBLGdCQUNULFlBQVk7QUFBQSxnQkFDWixLQUFLO0FBQUEsY0FDUDtBQUFBLGNBRUE7QUFBQSxnQ0FBQUQ7QUFBQSxrQkFBQztBQUFBO0FBQUEsb0JBQ0MsT0FBTztBQUFBLHNCQUNMLGlCQUFpQjtBQUFBLHNCQUNqQixPQUFPO0FBQUEsc0JBQ1AsU0FBUztBQUFBLG9CQUNYO0FBQUEsb0JBQ0Q7QUFBQTtBQUFBLGdCQUVEO0FBQUEsZ0JBRUEsZ0JBQUFBO0FBQUEsa0JBQUM7QUFBQTtBQUFBLG9CQUNDLE1BQUs7QUFBQSxvQkFDTCxPQUFPLEtBQUs7QUFBQSxvQkFDWixlQUFlO0FBQUEsb0JBQ2YsS0FBSztBQUFBLG9CQUNMLEtBQUs7QUFBQSxvQkFDTCxNQUFNO0FBQUEsb0JBQ04sYUFBWTtBQUFBLG9CQUNaLGNBQVc7QUFBQTtBQUFBLGdCQUNiO0FBQUEsZ0JBQ0EsZ0JBQUFBO0FBQUEsa0JBQUM7QUFBQTtBQUFBLG9CQUNDLE1BQUs7QUFBQSxvQkFDTCxPQUFPLEdBQUc7QUFBQSxvQkFDVixlQUFlO0FBQUEsb0JBQ2YsS0FBSztBQUFBLG9CQUNMLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxRQUFRO0FBQUEsb0JBQ3BDLE1BQU07QUFBQSxvQkFDTixhQUFZO0FBQUEsb0JBQ1osY0FBVztBQUFBO0FBQUEsZ0JBQ2I7QUFBQTtBQUFBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsZ0JBQUFBLEtBQUMsT0FDQywwQkFBQUMsTUFBQyxRQUNDO0FBQUEsNEJBQUFELEtBQUMsUUFBRywyQkFBRztBQUFBLFlBQ1AsZ0JBQUFBLEtBQUMsUUFBRyw2RUFBMkM7QUFBQSxZQUMvQyxnQkFBQUEsS0FBQyxRQUFHLCtEQUFrQztBQUFBLFlBQ3RDLGdCQUFBQSxLQUFDLFFBQUcscUVBQXdDO0FBQUEsWUFDNUMsZ0JBQUFBLEtBQUMsUUFBRyxvRkFBdUQ7QUFBQSxZQUMzRCxnQkFBQUEsS0FBQyxRQUFHLDJEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRywyREFBZTtBQUFBLFlBQ25CLGdCQUFBQSxLQUFDLFFBQUcsMkRBQWU7QUFBQSxhQUNyQixHQUNGO0FBQUEsVUFDQSxnQkFBQUEsS0FBQyxPQUNDLDBCQUFBQyxNQUFDLFFBQ0M7QUFBQSw0QkFBQUQsS0FBQyxRQUFHLG1GQUVKO0FBQUEsWUFDQSxnQkFBQUEsS0FBQyxRQUFHLG1GQUVKO0FBQUEsWUFDQSxnQkFBQUEsS0FBQyxRQUFHLGlEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRyxpREFBZTtBQUFBLFlBQ25CLGdCQUFBQSxLQUFDLFFBQUcsMkRBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLDJEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRyw2Q0FBVztBQUFBLFlBQ2YsZ0JBQUFBLEtBQUMsUUFBRyw2Q0FBVztBQUFBLGFBQ2pCLEdBQ0Y7QUFBQTtBQUFBO0FBQUEsSUFDRjtBQUFBLElBQ0MsUUFBUSxNQUFNLE9BQU8sS0FDcEIsZ0JBQUFDLE1BQUFGLFdBQUEsRUFTRTtBQUFBLHNCQUFBQyxLQUFDLFFBQUc7QUFBQSxNQUNKLGdCQUFBQSxLQUFDLFFBQUcscUNBQWtCO0FBQUEsTUFDdEIsZ0JBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFNLFFBQVE7QUFBQSxVQUNkLE1BQUs7QUFBQSxVQUNMLFNBQVE7QUFBQTtBQUFBLE1BQ1Y7QUFBQSxPQUNGO0FBQUEsS0FFSjtBQUVKOzs7QURqWE8sZ0JBQUFFLFlBQUE7QUFBUCxPQUFPLGdCQUFBQSxLQUFDLE9BQUksR0FBSSxTQUFTLGVBQWUsTUFBTSxDQUFFOyIsCiAgIm5hbWVzIjogWyJqc3giLCAianN4cyIsICJGcmFnbWVudCIsICJqc3giLCAianN4cyIsICJqc3giXQp9Cg==
