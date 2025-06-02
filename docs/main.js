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
            (val_h, _index) => pow2Affine(1, 0, 0, val_h)
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
            (val_h, _index) => pow2Affine(1, 1, -1, val_h)
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
            (val_h, _index) => pow2Affine(1.5, 1, -1, val_h)
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
            (val_i, index) => pow2Affine(1.5, 1, -1, floorLog2(val_i)) - val_i
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
            (val_i, _index) => pow2Affine(1, 0, 0, val_i, val2Adic)
          );
        }
      },
      {
        var: "kjA",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          return j__Array.map(
            (val_j, _index) => pow2Affine(1, 0, 0, val_j, val2Adic)
          );
        }
      },
      {
        var: "li",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, _index) => val_i / pow2Affine(1, 0, 0, val_i, val2Adic)
          );
        }
      },
      {
        var: "lj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          return j__Array.map(
            (val_j, _index) => val_j / pow2Affine(1, 0, 0, val_j, val2Adic)
          );
        }
      },
      {
        var: "mi",
        val: (currentM) => {
          const i__Array = currentM.get("i");
          testSomNotOfValsArray("i", i__Array, "isNotValNaturalPos");
          return i__Array.map(
            (val_i, _index) => val_i / pow2Affine(1, 0, 0, val_i, val2Adic) + 1
          );
        }
      },
      {
        var: "wj",
        val: (currentM) => {
          const j__Array = currentM.get("j");
          testSomNotOfValsArray("j", j__Array, "isNotValNaturalPos");
          return j__Array.map(
            (val_j, _index) => val_j / pow2Affine(1, 0, 0, val_j, val2Adic) + 2
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50c3giLCAiYXBwLnRzeCIsICJ1aS9JbnB1dE51bWJlci50c3giLCAibG9naWMvY2FsY3VsYXRlRXhjZWwudHMiLCAibG9naWMvbWF0aEZ1bmMudHMiLCAidWkvUGxvdEV4Y2VsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cbmltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOFwiO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwLnRzeFwiO1xuLy9hYVxucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSEpO1xuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXG5pbXBvcnQgeyBzaWduYWwsIHVzZVNpZ25hbCB9IGZyb20gXCJodHRwczovL2VzbS5zaC9AcHJlYWN0L3NpZ25hbHNAMi4yLjBcIjtcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSBcIi4vdWkvSW5wdXROdW1iZXIudHN4XCI7IC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2UgXHUwMTVCY2llXHUwMTdDa2EgamVzdCBwb3ByYXduYVxuaW1wb3J0IHtcbiAgRXhjZWwsXG4gIHR5cGUgRXhjZWxOZXN0ZWROLFxuICB0eXBlIEV4Y2VsUmVzdWx0cyxcbiAgdHlwZSBFeGNlbFNldHNHZXQsXG4gIHR5cGUgRXhjZWxTZXRzU2V0LFxuICBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0LFxuICAvL2luaXRSYW5nZUZpcnN0U3RlcFNpemUsXG59IGZyb20gXCIuL2xvZ2ljL2NhbGN1bGF0ZUV4Y2VsLnRzXCI7XG5pbXBvcnQgKiBhcyBNYXRoRiBmcm9tIFwiLi9sb2dpYy9tYXRoRnVuYy50c1wiO1xuaW1wb3J0IHsgUGxvdEV4Y2VsIH0gZnJvbSBcIi4vdWkvUGxvdEV4Y2VsLnRzeFwiO1xuXG4vL2NvbnN0IHJlc3VsdE0gPSBzaWduYWw8RXhjZWxSZXN1bHRzPihuZXcgTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROPigpKTtcblxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgZnJvbSA9IHVzZVNpZ25hbCgxKTtcbiAgY29uc3QgdG8gPSB1c2VTaWduYWwoMTApO1xuICBjb25zdCByZXN1bHRNID0gdXNlU2lnbmFsPEV4Y2VsUmVzdWx0cz4obmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTj4oKSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlID0gKCkgPT4ge1xuICAgIC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2Ugd2FydG9cdTAxNUJjaSBzXHUwMTA1IGxpY3piYW1pIHByemVkIHBcdTAxMTl0bFx1MDEwNVxuICAgIGlmIChpc05hTihOdW1iZXIoZnJvbS52YWx1ZSkpIHx8IGlzTmFOKE51bWJlcih0by52YWx1ZSkpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiV2FydG9cdTAxNUJjaSAnZnJvbScgbHViICd0bycgbmllIHNcdTAxMDUgbGljemJhbWkuXCIpO1xuICAgICAgcmVzdWx0TS52YWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWF0aEVudGVyOiBFeGNlbFNldHNTZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImlcIixcbiAgICAgICAgdmFsOiBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0KE51bWJlcihmcm9tLnZhbHVlKSwgMSwgTnVtYmVyKHRvLnZhbHVlKSksXG4gICAgICB9LFxuICAgIF07XG4gICAgY29uc3QgbWF0aENhbGNzOiBFeGNlbFNldHNHZXRbXSA9IFtcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoQVwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaFwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXG4gICAgICAgICAgICBcImhcIixcbiAgICAgICAgICAgIGhfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gaF9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2gnLGhfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik7IVxuXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUoMSwgMCwgMCx2YWxfaCBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJoWlwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaFwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXG4gICAgICAgICAgICBcImhcIixcbiAgICAgICAgICAgIGhfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gaF9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2gnLGhfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik7IVxuXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUoIDEsIDEsIC0xLHZhbF9oIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImhBWlwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGhfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaFwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXG4gICAgICAgICAgICBcImhcIixcbiAgICAgICAgICAgIGhfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gaF9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2gnLGhfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik7IVxuXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUoMS41LCAxLCAtMSwgdmFsX2ggYXMgbnVtYmVyKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwiaGlcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgY29uc3QgaEFfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaEFcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoQVwiLFxuICAgICAgICAgICAgaEFfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NcIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBpbmRleCkgPT5cbiAgICAgICAgICAgICh2YWxfaSBhcyBudW1iZXIpIC0gaEFfX0FycmF5W2luZGV4XVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwiaGpcIixcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XG4gICAgICAgICAgY29uc3QgaFpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaFpcIik7XG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxuICAgICAgICAgICAgXCJoWlwiLFxuICAgICAgICAgICAgaFpfX0FycmF5LFxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NcIixcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBpbmRleCkgPT5cbiAgICAgICAgICAgIGhaX19BcnJheVtpbmRleF0gLSAodmFsX2kgYXMgbnVtYmVyKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwialwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcblxuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcblxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBpbmRleCkgPT5cbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUoMS41LCAxLCAtMSxNYXRoRi5mbG9vckxvZzIodmFsX2kgYXMgbnVtYmVyKSkgLVxuICAgICAgICAgICAgKHZhbF9pIGFzIG51bWJlcilcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImtpXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi52YWwyQWRpYyh2YWxfaSBhcyBudW1iZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJralwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwialwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJqXCIsIGpfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcbiAgICAgICAgICByZXR1cm4gal9fQXJyYXkubWFwKCh2YWxfaiwgX2luZGV4KSA9PlxuICAgICAgICAgICAgTWF0aEYudmFsMkFkaWModmFsX2ogYXMgbnVtYmVyKVxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB2YXI6IFwia2lBXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKDEsIDAsIDAsIHZhbF9pIGFzIG51bWJlcixNYXRoRi52YWwyQWRpYylcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcImtqQVwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwialwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJqXCIsIGpfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcbiAgICAgICAgICByZXR1cm4gal9fQXJyYXkubWFwKCh2YWxfaiwgX2luZGV4KSA9PlxuICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSgxLCAwLCAwLCB2YWxfaiBhcyBudW1iZXIsTWF0aEYudmFsMkFkaWMpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJsaVwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxuICAgICAgICAgICAgKHZhbF9pIGFzIG51bWJlcikgL1xuICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSgxLCAwLCAwLCB2YWxfaSBhcyBudW1iZXIsTWF0aEYudmFsMkFkaWMpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJsalwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwialwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJqXCIsIGpfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcbiAgICAgICAgICByZXR1cm4gal9fQXJyYXkubWFwKCh2YWxfaiwgX2luZGV4KSA9PlxuICAgICAgICAgICAgKHZhbF9qIGFzIG51bWJlcikgL1xuICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSgxLCAwLCAwLCB2YWxfaiBhcyBudW1iZXIsTWF0aEYudmFsMkFkaWMpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHZhcjogXCJtaVwiLFxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxuICAgICAgICAgICAgKCh2YWxfaSBhcyBudW1iZXIpIC9cbiAgICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSgxLCAwLCAwLHZhbF9pIGFzIG51bWJlciwgTWF0aEYudmFsMkFkaWMpKSArIDFcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdmFyOiBcIndqXCIsXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XG4gICAgICAgICAgICAoKHZhbF9qIGFzIG51bWJlcikgL1xuICAgICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKDEsIDAsIDAsdmFsX2ogYXMgbnVtYmVyLCBNYXRoRi52YWwyQWRpYykpICsgMlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF07XG4gICAgcmVzdWx0TS52YWx1ZSA9IEV4Y2VsKG1hdGhFbnRlciwgbWF0aENhbGNzKTtcbiAgfTtcblxuICAvLyBIYW5kbGVyIGRsYSBvblZhbHVlQ2hhbmdlLCBrdFx1MDBGM3J5IG9kendpZXJjaWVkbGEgemFjaG93YW5pZSBgKyhlLmN1cnJlbnRUYXJnZXQudmFsdWUpYFxuICAvLyBLaWVkeSBpbnB1dCBqZXN0IHB1c3R5LCBgZS5jdXJyZW50VGFyZ2V0LnZhbHVlYCB0byBcIlwiLCBhIGArXCJcImAgdG8gMC5cbiAgLy8gTmFzeiBgb25WYWx1ZUNoYW5nZWAgcHJ6ZWthenVqZSBgdW5kZWZpbmVkYCwgZ2R5IGB2YWx1ZUFzTnVtYmVyYCB0byBOYU4gKG5wLiBkbGEgcHVzdGVnbyBpbnB1dHUpLlxuICBjb25zdCBoYW5kbGVGcm9tQ2hhbmdlID0gKG5ld1ZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQpID0+IHtcbiAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZnJvbS52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tLnZhbHVlID0gMDsgLy8gTHViIGlubmEgd2FydG9cdTAxNUJcdTAxMDcgZG9teVx1MDE1QmxuYSwgbnAuIDEsIGplXHUwMTVCbGkgdG8gYmFyZHppZWogc2Vuc293bmVcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0by52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0by52YWx1ZSA9IDA7IC8vIEx1YiBpbm5hIHdhcnRvXHUwMTVCXHUwMTA3IGRvbXlcdTAxNUJsbmFcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbj5cbiAgICAgIDxoMT5NYXRlbWF0eWthIHcgZ2VuZWFsb2dpaS48L2gxPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgIGFsaWduSXRlbXM6IFwic3RyZXRjaFwiLFxuICAgICAgICAgIGdhcDogXCI0MHB4XCIsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjIwcHhcIixcbiAgICAgICAgICBmbGV4RmxvdzogXCJyb3cgbm93cmFwXCIsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtjYWxjdWxhdGV9XG4gICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogXCIwLjVyZW0gMXJlbVwiLCBmb250U2l6ZTogXCIxcmVtXCIgfX1cbiAgICAgICAgPlxuICAgICAgICAgIFBvbGljelxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGZpZWxkc2V0XG4gICAgICAgICAgY2xhc3M9XCJmaWVsZHNldC1pbnB1dHMtbnVtYmVyXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYm9yZGVyOiBcIjNweCBzb2xpZCAjNmM3NTdkXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXG4gICAgICAgICAgICBwYWRkaW5nOiBcIjIwcHhcIixcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCIwXCIsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMFwiLFxuICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImZsZXgtc3RhcnRcIixcbiAgICAgICAgICAgIGdhcDogXCI0MHB4XCIsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxsZWdlbmRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIsXG4gICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgcGFkZGluZzogXCIzcHggNnB4XCIsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIENob29zZSByYW5nZSBvZiBcdTMwMTBpXHUzMDExXG4gICAgICAgICAgPC9sZWdlbmQ+XG5cbiAgICAgICAgICA8SW5wdXROdW1iZXJcbiAgICAgICAgICAgIG5hbWU9XCJpbnB1dDFcIlxuICAgICAgICAgICAgdmFsdWU9e2Zyb20udmFsdWV9XG4gICAgICAgICAgICBvblZhbHVlQ2hhbmdlPXtoYW5kbGVGcm9tQ2hhbmdlfVxuICAgICAgICAgICAgZGVmPXsxfVxuICAgICAgICAgICAgbWluPXsxfSAvLyBsb2cyIGplc3QgemRlZmluaW93YW55IGRsYSBsaWN6YiA+IDBcbiAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk9kXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgcHJ6ZWR6aWFcdTAxNDJ1XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbnB1dE51bWJlclxuICAgICAgICAgICAgbmFtZT1cImlucHV0MlwiXG4gICAgICAgICAgICB2YWx1ZT17dG8udmFsdWV9XG4gICAgICAgICAgICBvblZhbHVlQ2hhbmdlPXtoYW5kbGVUb0NoYW5nZX1cbiAgICAgICAgICAgIGRlZj17N31cbiAgICAgICAgICAgIG1pbj17ZnJvbS52YWx1ZSA+PSAxID8gZnJvbS52YWx1ZSA6IDF9IC8vICd0bycgbmllIHBvd2lubm8gYnlcdTAxMDcgbW5pZWpzemUgbmlcdTAxN0MgJ2Zyb20nXG4gICAgICAgICAgICBzdGVwPXsxfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJEb1wiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiV2FydG9cdTAxNUJcdTAxMDcga29cdTAxNDRjb3dhIHByemVkemlhXHUwMTQydVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgPHA+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGlcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGhcdTMwMTEgPSBmbG9vcihsb2dcdTIwODIoaSkpIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtpXTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaEFcdTMwMTEgPSAyKipoIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtoXTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaFpcdTMwMTEgPSAyKiooaCsxKS0xIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtoXTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaEFaXHUzMDExID0zKjIqKmgtMSA9IDEuNSoyKiooaCsxKS0xIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtoXTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwaGlcdTMwMTEgPVx1MzAxMGlcdTMwMTEgLVx1MzAxMGhBXHUzMDExPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBoalx1MzAxMSA9XHUzMDEwaFpcdTMwMTEgLVx1MzAxMGlcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGpcdTMwMTEgPVx1MzAxMGhBWlx1MzAxMSAtXHUzMDEwaVx1MzAxMTwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9wPlxuICAgICAgICA8cD5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIFx1MzAxMGtpXHUzMDExID0gd2FsdWFjamEgZHd1LWFkeWN6bmEgbGljemJ5IG5hdHVyYWxuZWogZG9kYXRuaWVqIFtpXVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgXHUzMDEwa2pcdTMwMTEgPSB3YWx1YWNqYSBkd3UtYWR5Y3puYSBsaWN6YnkgbmF0dXJhbG5laiBkb2RhdG5pZWogW2pdXG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMGtpQVx1MzAxMSA9IDIqKlx1MzAxMGtpXHUzMDExPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBrakFcdTMwMTEgPSAyKipcdTMwMTBralx1MzAxMTwvbGk+XG4gICAgICAgICAgICA8bGk+XHUzMDEwbGlcdTMwMTEgPVx1MzAxMGlcdTMwMTEvXHUzMDEwa2lBXHUzMDExPC9saT5cbiAgICAgICAgICAgIDxsaT5cdTMwMTBsalx1MzAxMSA9XHUzMDEwalx1MzAxMS9cdTMwMTBrakFcdTMwMTE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMG1cdTMwMTEgPVx1MzAxMGxpXHUzMDExKzE8L2xpPlxuICAgICAgICAgICAgPGxpPlx1MzAxMHdcdTMwMTEgPVx1MzAxMGxqXHUzMDExKzI8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAge3Jlc3VsdE0udmFsdWUuc2l6ZSA+IDAgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8qPGgzPlRhYmVsYSBzdGFuZGFyZG93YSAodHlwZT1cImNvbFwiKTo8L2gzPlxuICAgICAgICAgIDxQbG90RXhjZWxcbiAgICAgICAgICAgIGRhdGE9e3Jlc3VsdE0udmFsdWV9XG4gICAgICAgICAgICB0eXBlPVwiY29sXCJcbiAgICAgICAgICAgIGNhcHRpb249XCJXeW5pa2kgb2JsaWN6ZVx1MDE0NFwiXG4gICAgICAgICAgLz4qL1xuICAgICAgICAgIH1cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8aDM+UmV6dWx0YXQgb2JsaWN6ZVx1MDE0NDo8L2gzPlxuICAgICAgICAgIDxQbG90RXhjZWxcbiAgICAgICAgICAgIHRhYmxlQ2xhc3NOYW1lPVwicGxvdC1yb3ctZGF0YTFcIlxuICAgICAgICAgICAgZGF0YT17cmVzdWx0TS52YWx1ZX1cbiAgICAgICAgICAgIHR5cGU9XCJyb3dcIlxuICAgICAgICAgICAgY2FwdGlvbj1cIld5bmlraSBvYmxpY3plXHUwMTQ0LlwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiIsICIvKiogQGpzeFJ1bnRpbWUgYXV0b21hdGljICovXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xuXG5pbXBvcnQge1xuICB1c2VDYWxsYmFjayxcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG59IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOC9ob29rc1wiO1xuaW1wb3J0IHsgSlNYIH0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44XCI7XG5cbi8vIFphd2FydG9cdTAxNUJcdTAxMDcgU1ZHIGRsYSBkb215XHUwMTVCbG55Y2ggaWtvbiArLy0gKGplXHUwMTVCbGkgemRlY3lkdWplc3ogc2lcdTAxMTkgamUgbmFrXHUwMTQyYWRhXHUwMTA3KVxuLy8gTmEgcmF6aWUgbmllIHNcdTAxMDUgb25lIGF1dG9tYXR5Y3puaWUgcmVuZGVyb3dhbmUgdyB0ZWogd2Vyc2ppLFxuLy8gcG9uaWV3YVx1MDE3QyB6YWtcdTAxNDJhZGFtLCBcdTAxN0NlIFR3XHUwMEYzaiBnXHUwMTQyXHUwMEYzd255IFNWRyBkZWZpbml1amUgd3lnbFx1MDEwNWQgcHJ6eWNpc2tcdTAwRjN3LlxuLy8gSmVcdTAxNUJsaSBjaGNlc3ogamUgZG9kYVx1MDEwNywgbXVzaXN6IHByenl3clx1MDBGM2NpXHUwMTA3IGxvZ2lrXHUwMTE5IGljaCByZW5kZXJvd2FuaWEgeiB0cmFuc2Zvcm1hY2phbWkuXG5jb25zdCBEZWZhdWx0RGVjcmVtZW50SWNvblN2Z0NvbnRlbnQgPSAoXG4gIDxyZWN0IHg9XCI1XCIgeT1cIjExXCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiAvPlxuKTtcbmNvbnN0IERlZmF1bHRJbmNyZW1lbnRJY29uU3ZnQ29udGVudCA9IChcbiAgPD5cbiAgICA8cmVjdCB4PVwiMTFcIiB5PVwiNVwiIHdpZHRoPVwiMlwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgLz5cbiAgICA8cmVjdCB4PVwiNVwiIHk9XCIxMVwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgLz5cbiAgPC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIElucHV0TnVtYmVyUHJvcHMge1xuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcbiAgZGVmYXVsdFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xuICBkZWY/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG1pbj86IHN0cmluZyB8IG51bWJlcjtcbiAgbWF4Pzogc3RyaW5nIHwgbnVtYmVyO1xuICBzdGVwPzogc3RyaW5nIHwgbnVtYmVyO1xuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGlkPzogc3RyaW5nO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIG9uQ2hhbmdlPzogKGV2ZW50OiBKU1guVGFyZ2V0ZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBFdmVudD4pID0+IHZvaWQ7XG4gIG9uVmFsdWVDaGFuZ2U/OiAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCwgbmFtZT86IHN0cmluZykgPT4gdm9pZDtcbiAgcmF0aW9TSVpFPzogbnVtYmVyO1xuICB3cmFwcGVyQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdmdDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGlucHV0Q2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBzZWxlY3RCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBpbmNyZW1lbnRCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBkZWNyZW1lbnRCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBpbnB1dEFyZWFTdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xuICBzZWxlY3RCdXR0b25GaWxsPzogc3RyaW5nO1xuICBpbmNyZW1lbnRCdXR0b25GaWxsPzogc3RyaW5nO1xuICBkZWNyZW1lbnRCdXR0b25GaWxsPzogc3RyaW5nO1xuICBpbnB1dEFyZWFSZWN0RmlsbD86IHN0cmluZztcbiAgaW5wdXRBcmVhQm9yZGVyRmlsbD86IHN0cmluZztcbiAgLy8gaWNvbkZpbGw/OiBzdHJpbmc7IC8vIEplXHUwMTVCbGkgYlx1MDExOWR6aWVzeiB1XHUwMTdDeXdhXHUwMTQyIG9zb2JueWNoIGlrb24gKy8tXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuY29uc3Qgc3ZnTGF5b3V0RGF0YSA9IHtcbiAgYmFzZVZpZXdCb3hXaWR0aDogMTc0LFxuICBiYXNlVmlld0JveEhlaWdodDogNzIsXG4gIGJ1dHRvbnM6IHtcbiAgICBjaG9vc2U6IHsgLy8gWm1pZW5pb25vIHogJ3NlbGVjZWN0JyBuYSAnY2hvb3NlJyBkbGEgc3BcdTAwRjNqbm9cdTAxNUJjaSB6IFR3b2ltIEhUTUxcbiAgICAgIG5hbWU6IFwiYnRuLWNob29zZVwiLFxuICAgICAgcGF0aHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTE1Ljc1LDcxLjYyYy0xMC4wMywwLTE5LjkzLTEuNjItMjguNjMtNC42N2wtLjEyLS4wNC0uMTIuMDRjLTguNywzLjA2LTE4LjU5LDQuNjctMjguNjMsNC42Ny0xMy4wNiwwLTI1LjgxLTIuNzUtMzYuMDItNy43NWwyNi45Ni0xNS4yMWg3NS42MWwyNi45NiwxNS4yMWMtMTAuMiw1LTIyLjk2LDcuNzUtMzYuMDIsNy43NVpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjOTE5MTkxXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tYm9yZGVyLWZpbGxcIixcbiAgICAgICAgICBkOiBcIk0xMjQuNzEsNDkuMDRsMjYuMjUsMTQuODFjLTEwLjA0LDQuNzgtMjIuNDgsNy40LTM1LjIxLDcuNC05Ljk5LDAtMTkuODQtMS42MS0yOC41LTQuNjVsLS4yNS0uMDktLjI1LjA5Yy04LjY2LDMuMDQtMTguNTEsNC42NS0yOC41LDQuNjUtMTIuNzMsMC0yNS4xNi0yLjYyLTM1LjIxLTcuNGwyNi4yNS0xNC44MWg3NS40MU0xMjQuOSw0OC4yOUg0OS4xbC0yNy42NiwxNS42YzEwLjAzLDUuMDYsMjIuODUsOC4xMSwzNi44Miw4LjExLDEwLjQ2LDAsMjAuMjctMS43MSwyOC43NS00LjY5LDguNDgsMi45OCwxOC4yOSw0LjY5LDI4Ljc1LDQuNjksMTMuOTcsMCwyNi43OC0zLjA0LDM2LjgyLTguMTFsLTI3LjY2LTE1LjZoMFpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDpcbiAgICAgICAgICAgIFwiIzUwNTA1MFwiLCAvKiBLb2xvciBkbGEgb2JyeXN1L2RydWdpZWogd2Fyc3R3eSwgZG9zdG9zdWogKi9cbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBpbmNyZW1lbnQ6IHtcbiAgICAgIG5hbWU6IFwiYnRuLWluY3JlbWVudFwiLFxuICAgICAgcGF0aHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTI3LjM4LDQzLjUxVjEuMWMyNi44MywzLjM3LDQ2LjI1LDE4LjAxLDQ2LjI1LDM0LjksMCw5LjE5LTUuNjgsMTcuOTEtMTYuMDEsMjQuNTdsLTMwLjI0LTE3LjA2WlwiLFxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiMyMTU5N2ZcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1ib3JkZXItZmlsbFwiLFxuICAgICAgICAgIGQ6IFwiTTEyNy43NSwxLjUzYzI2LjQyLDMuNDUsNDUuNSwxNy44Niw0NS41LDM0LjQ3LDAsOS01LjU1LDE3LjU2LTE1LjY1LDI0LjEzbC0yOS44NS0xNi44NFYxLjUzTTEyNywuNjh2NDMuMDVsMzAuNjMsMTcuMjhjMTAuMTMtNi40OCwxNi4zNy0xNS4yOSwxNi4zNy0yNS4wMSwwLTE3LjUtMjAuMjEtMzIuMDgtNDctMzUuMzJoMFpcIixcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjMTA0MDYwXCIsIC8qIENpZW1uaWVqc3p5IGRsYSBvYnJ5c3U/IERvc3Rvc3VqICovXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgaWNvbkFuY2hvclg6IDE1MCwgLy8gMTUwcHggdyBwcmF3byAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcbiAgICAgIGljb25BbmNob3JZOiAzMCwgLy8gMzBweCB3IGRcdTAwRjNcdTAxNDIgKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXG4gICAgfSxcbiAgICBkZWNyZW1lbnQ6IHtcbiAgICAgIG5hbWU6IFwiYnRuLWRlY3JlbWVudFwiLFxuICAgICAgcGF0aHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXG4gICAgICAgICAgZDogXCJNMTYuMzgsNjAuNTdDNi4wNiw1My45MS4zOCw0NS4xOS4zOCwzNiwuMzgsMTkuMTEsMTkuOCw0LjQ3LDQ2LjYyLDEuMXY0Mi40MWwtMzAuMjQsMTcuMDZaXCIsXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiI2IyMTAxMFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWJvcmRlci1maWxsXCIsXG4gICAgICAgICAgZDogXCJNNDYuMjUsMS41M3Y0MS43Nmgwcy0yOS44NSwxNi44NC0yOS44NSwxNi44NEM2LjMsNTMuNTYuNzUsNDUsLjc1LDM2LC43NSwxOS4zOSwxOS44Myw0Ljk3LDQ2LjI1LDEuNTNNNDcsLjY4QzIwLjIxLDMuOTIsMCwxOC41LDAsMzZjMCw5LjcyLDYuMjQsMTguNTMsMTYuMzcsMjUuMDFsMzAuNjMtMTcuMjhWLjY4aDBaXCIsXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzgwMDAwMFwiLCAvKiBDaWVtbmllanN6eSBkbGEgb2JyeXN1PyBEb3N0b3N1aiAqL1xuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGljb25BbmNob3JYOiAyNSwgLy8gMjBweCB3IHByYXdvICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxuICAgICAgaWNvbkFuY2hvclk6IDMwLCAvLyAzMHB4IHcgZFx1MDBGM1x1MDE0MiAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcbiAgICB9LFxuICB9LFxuICBpbnB1dEFyZWE6IHtcbiAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgcmVjdDoge1xuICAgICAgeDogNTIuMzgsXG4gICAgICB5OiAwLjM4LFxuICAgICAgd2lkdGg6IDY5LjI1LFxuICAgICAgaGVpZ2h0OiA0Mi41NCxcbiAgICAgIGRlZmF1bHRGaWxsOiBcIiNmZmZcIixcbiAgICB9LFxuICAgIGJvcmRlclBhdGg6IHtcbiAgICAgIGQ6IFwiTTEyMS4yNS43NXY0MS43OUg1Mi43NVYuNzVoNjguNU0xMjIsMEg1MnY0My4yOWg3MFYwaDBaXCIsXG4gICAgICBkZWZhdWx0RmlsbDogXCIjMzMzXCIsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IENPTlRBSU5FUl9DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1jb250YWluZXJcIjtcbmNvbnN0IFNWR19DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1zdmdcIjtcbmNvbnN0IFNWR19CVVRUT05fQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItc3ZnLWJ1dHRvblwiOyAvLyBVXHUwMTdDeXdhbmUgdyBUd29pbSBIVE1MXG5jb25zdCBIVE1MX0lOUFVUX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLWh0bWwtaW5wdXRcIjsgLy8gVVx1MDE3Q3l3YW5lIHcgVHdvaW0gSFRNTFxuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXROdW1iZXIocHJvcHM6IElucHV0TnVtYmVyUHJvcHMpOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IHtcbiAgICB2YWx1ZSxcbiAgICBkZWZhdWx0VmFsdWUsXG4gICAgZGVmID0gMSxcbiAgICBtaW4sXG4gICAgbWF4LFxuICAgIHN0ZXAgPSAxLFxuICAgIHBsYWNlaG9sZGVyLFxuICAgIHJlcXVpcmVkLFxuICAgIGRpc2FibGVkID0gZmFsc2UsXG4gICAgbmFtZSxcbiAgICBpZCxcbiAgICByZWFkT25seSA9IGZhbHNlLFxuICAgIG9uQ2hhbmdlLFxuICAgIG9uVmFsdWVDaGFuZ2UsXG4gICAgcmF0aW9TSVpFID0gMSxcbiAgICB3cmFwcGVyQ2xhc3NOYW1lLFxuICAgIHN2Z0NsYXNzTmFtZSxcbiAgICBpbnB1dENsYXNzTmFtZSxcbiAgICBzdHlsZSxcbiAgICBzZWxlY3RCdXR0b25TdHlsZSxcbiAgICBpbmNyZW1lbnRCdXR0b25TdHlsZSxcbiAgICBkZWNyZW1lbnRCdXR0b25TdHlsZSxcbiAgICBpbnB1dEFyZWFTdHlsZSxcbiAgICBzZWxlY3RCdXR0b25GaWxsLFxuICAgIGluY3JlbWVudEJ1dHRvbkZpbGwsXG4gICAgZGVjcmVtZW50QnV0dG9uRmlsbCxcbiAgICBpbnB1dEFyZWFSZWN0RmlsbCxcbiAgICBpbnB1dEFyZWFCb3JkZXJGaWxsLFxuICAgIC8vIGljb25GaWxsID0gXCJ3aGl0ZVwiLCAvLyBKZVx1MDE1QmxpIGJcdTAxMTlkemllc3ogcmVuZGVyb3dhXHUwMTA3IG9zb2JuZSBpa29ueSArLy1cbiAgICAuLi5yZXN0RGl2UHJvcHNcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vIEluaWNqYWxpemFjamEgd2FydG9cdTAxNUJjaSBpbnB1dGEgcHJ6eSBtb250b3dhbml1IGx1YiB6bWlhbmllIGRlZmF1bHRWYWx1ZS92YWx1ZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50KSB7XG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFN0cmluZyhkZWZhdWx0VmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFwiXCI7IC8vIEphd25lIHVzdGF3aWVuaWUgbmEgcHVzdHkgc3RyaW5nLCBqZVx1MDE1QmxpIGJyYWsgd2FydG9cdTAxNUJjaVxuICAgICAgfVxuICAgIH1cbiAgfSwgW3ZhbHVlLCBkZWZhdWx0VmFsdWVdKTtcblxuICBjb25zdCBoYW5kbGVTdGVwID0gdXNlQ2FsbGJhY2soKGRpcmVjdGlvbjogXCJ1cFwiIHwgXCJkb3duXCIpID0+IHtcbiAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiAhZGlzYWJsZWQgJiYgIXJlYWRPbmx5KSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInVwXCIpIGlucHV0UmVmLmN1cnJlbnQuc3RlcFVwKCk7XG4gICAgICBlbHNlIGlucHV0UmVmLmN1cnJlbnQuc3RlcERvd24oKTtcblxuICAgICAgLy8gU3ltdWxhY2phIHpkYXJ6ZW5pYSBpbnB1dCwgYWJ5IHd5d29cdTAxNDJhXHUwMTA3IGhhbmRsZUlucHV0Q2hhbmdlXG4gICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudChcImlucHV0XCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSB9KTtcbiAgICAgIGlucHV0UmVmLmN1cnJlbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICB9LCBbZGlzYWJsZWQsIHJlYWRPbmx5XSk7XG5cbiAgY29uc3QgaGFuZGxlRGVjcmVtZW50ID0gdXNlQ2FsbGJhY2soKCkgPT4gaGFuZGxlU3RlcChcImRvd25cIiksIFtoYW5kbGVTdGVwXSk7XG4gIGNvbnN0IGhhbmRsZUluY3JlbWVudCA9IHVzZUNhbGxiYWNrKCgpID0+IGhhbmRsZVN0ZXAoXCJ1cFwiKSwgW2hhbmRsZVN0ZXBdKTtcblxuICBjb25zdCBoYW5kbGVDaG9vc2VDbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiAhZGlzYWJsZWQgJiYgIXJlYWRPbmx5KSB7XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IGRlZiA/PyAxOyAvLyBKYWsgdyBUd29pbSBKU1xuICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFN0cmluZyhuZXdWYWx1ZSk7XG5cbiAgICAgIC8vIFJcdTAxMTljem5lIHd5d29cdTAxNDJhbmllIGxvZ2lraSB6bWlhbnkgd2FydG9cdTAxNUJjaVxuICAgICAgaWYgKG9uVmFsdWVDaGFuZ2UpIG9uVmFsdWVDaGFuZ2UobmV3VmFsdWUsIG5hbWUpO1xuICAgICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KFwiY2hhbmdlXCIsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICB9KSBhcyB1bmtub3duIGFzIEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PjtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcInRhcmdldFwiLCB7XG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIHZhbHVlOiBpbnB1dFJlZi5jdXJyZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcImN1cnJlbnRUYXJnZXRcIiwge1xuICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICB2YWx1ZTogaW5wdXRSZWYuY3VycmVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiQ2hvb3NlIGJ1dHRvbiBjbGlja2VkLCB2YWx1ZSBzZXQgdG8gMVwiKTtcbiAgICB9XG4gIH0sIFtkaXNhYmxlZCwgcmVhZE9ubHksIG5hbWUsIG9uVmFsdWVDaGFuZ2UsIG9uQ2hhbmdlXSk7XG5cbiAgLy8gPT09IFBPQ1pcdTAxMDRURUsgREVGSU5JQ0pJIGhhbmRsZUlucHV0Q2hhbmdlID09PVxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlOiBKU1guVGFyZ2V0ZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBFdmVudD4pID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCByYXdWYWx1ZSA9IHRhcmdldC52YWx1ZTtcbiAgICBsZXQgbnVtZXJpY1ZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAocmF3VmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIG51bWVyaWNWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3ByXHUwMEYzYnVqIHNwYXJzb3dhXHUwMTA3IGpha28gbGljemJcdTAxMTk7IHBhcnNlRmxvYXQgamVzdCBiYXJkemllaiBlbGFzdHljem55XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUZsb2F0KHJhd1ZhbHVlKTtcbiAgICAgIG51bWVyaWNWYWx1ZSA9IGlzTmFOKHBhcnNlZCkgPyB1bmRlZmluZWQgOiBwYXJzZWQ7XG4gICAgfVxuXG4gICAgaWYgKG9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIG9uVmFsdWVDaGFuZ2UobnVtZXJpY1ZhbHVlLCBuYW1lKTtcbiAgICB9XG4gICAgLy8gSmVcdTAxNUJsaSB1XHUwMTdDeXRrb3duaWsgcHJ6ZWthemFcdTAxNDIgd1x1MDE0MmFzbnkgb25DaGFuZ2UsIHRlXHUwMTdDIGdvIHd5d29cdTAxNDJhalxuICAgIC8vIFRvIHpkYXJ6ZW5pZSBcImlucHV0XCIgeiBlbGVtZW50dSBIVE1MXG4gICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICBvbkNoYW5nZShlKTtcbiAgICB9XG4gIH07XG4gIC8vID09PSBLT05JRUMgREVGSU5JQ0pJIGhhbmRsZUlucHV0Q2hhbmdlID09PVxuXG4gIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gc3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveFdpZHRoICogcmF0aW9TSVpFO1xuICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94SGVpZ2h0ICogcmF0aW9TSVpFO1xuXG4gIC8vIFN0eWxlIGRsYSBuYVx1MDE0Mm9cdTAxN0NvbmVnbyBpbnB1dHUgSFRNTCwgc2thbG93YW5lIHByemV6IHJhdGlvU0laRVxuICBjb25zdCBodG1sSW5wdXRTdHlsZTogSlNYLkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBsZWZ0OiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LnggKiByYXRpb1NJWkV9cHhgLFxuICAgIHRvcDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC55ICogcmF0aW9TSVpFfXB4YCxcbiAgICB3aWR0aDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC53aWR0aCAqIHJhdGlvU0laRX1weGAsXG4gICAgaGVpZ2h0OiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmhlaWdodCAqIHJhdGlvU0laRX1weGAsXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICBjb2xvcjogXCIjMzMzXCIsXG4gICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgIGZvbnRTaXplOiBgJHtNYXRoLm1heCg4LCAxOCAqIHJhdGlvU0laRSl9cHhgLCAvLyBEb3N0b3N1aiBjemNpb25rXHUwMTE5XG4gICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgcGFkZGluZzogYDAgJHtNYXRoLm1heCgxLCAyICogcmF0aW9TSVpFKX1weGAsXG4gICAgbWFyZ2luOiAwLFxuICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgTW96QXBwZWFyYW5jZTogXCJ0ZXh0ZmllbGRcIixcbiAgICBXZWJraXRBcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcbiAgICB6SW5kZXg6IDIsXG4gIH07XG5cbiAgLy8gUm96bWlhciBpa29uICsvLS4gWmFcdTAxNDJcdTAwRjNcdTAxN0NteSwgXHUwMTdDZSBvcnlnaW5hbG5lIGlrb255IHNcdTAxMDUgMjR4MjQuXG4gIC8vIENoY2VteSBqZSBwcnplc2thbG93YVx1MDEwNywgYWJ5IHBhc293YVx1MDE0MnkgZG8gcHJ6eWNpc2tcdTAwRjN3LlxuICAvLyBQcnp5a1x1MDE0MmFkb3dvLCBuaWVjaCB6YWptdWpcdTAxMDUgb2tvXHUwMTQybyA1MCUgd3lzb2tvXHUwMTVCY2kgcHJ6eWNpc2t1ICh3IGplZG5vc3RrYWNoIHZpZXdCb3gpXG4gIGNvbnN0IGljb25WaWV3Qm94U2l6ZSA9IDI0OyAvLyBPcnlnaW5hbG55IHJvem1pYXIgdmlld0JveCBpa29uICsvLVxuICBjb25zdCB0YXJnZXRJY29uSGVpZ2h0SW5TdmdVbml0cyA9IHN2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hIZWlnaHQgKiAwLjI1ICpcbiAgICAocmF0aW9TSVpFID4gMC41ID8gMSA6IHJhdGlvU0laRSAqIDIpOyAvLyBucC4gMjUlIHd5c29rb1x1MDE1QmNpIGNhXHUwMTQyZWdvIGtvbXBvbmVudHVcbiAgY29uc3QgaWNvbkFjdHVhbFNjYWxlID0gMS41ICogKHRhcmdldEljb25IZWlnaHRJblN2Z1VuaXRzIC8gaWNvblZpZXdCb3hTaXplKTtcblxuICBsZXQgZGlzcGxheVZhbHVlOiBzdHJpbmcgPSBcIlwiOyAvLyBJbnB1dCB2YWx1ZSB6YXdzemUgamFrbyBzdHJpbmdcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwbGF5VmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICB9IGVsc2UgaWYgKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZGlzcGxheVZhbHVlID0gU3RyaW5nKGRlZmF1bHRWYWx1ZSk7XG4gIH1cblxuICBjb25zdCBjb21tb25TdmdCdXR0b25TdHlsZTogSlNYLkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgY3Vyc29yOiBkaXNhYmxlZCB8fCByZWFkT25seSA/IFwiZGVmYXVsdFwiIDogXCJwb2ludGVyXCIsXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2Ake0NPTlRBSU5FUl9DTEFTU19OQU1FfSAke3dyYXBwZXJDbGFzc05hbWUgfHwgXCJcIn1gfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6IGAke2NvbnRhaW5lcldpZHRofXB4YCxcbiAgICAgICAgaGVpZ2h0OiBgJHtjb250YWluZXJIZWlnaHR9cHhgLFxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcbiAgICAgICAgLi4uc3R5bGUsXG4gICAgICB9fVxuICAgICAgey4uLnJlc3REaXZQcm9wc31cbiAgICA+XG4gICAgICA8c3ZnXG4gICAgICAgIGNsYXNzTmFtZT17YCR7U1ZHX0NMQVNTX05BTUV9ICR7c3ZnQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgZGF0YS1uYW1lPVwiaW5wdXQtbnVtYmVyXCIgLy8gWiBUd29qZWdvIEhUTUxcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHZpZXdCb3g9e2AwIDAgJHtzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94V2lkdGh9ICR7c3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveEhlaWdodH1gfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB9fVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgPlxuICAgICAgICB7LyogR3J1cGEgXCJDaG9vc2UvU2VsZWN0XCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9IC8vIEtsYXNhIHogVHdvamVnbyBIVE1MXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuY2hvb3NlLm5hbWV9IC8vIGRhdGEtbmFtZSB6IFR3b2plZ28gSFRNTFxuICAgICAgICAgIG9uQ2xpY2s9eyFkaXNhYmxlZCA/IGhhbmRsZUNob29zZUNsaWNrIDogdW5kZWZpbmVkfVxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN2Z0J1dHRvblN0eWxlLCAuLi4oc2VsZWN0QnV0dG9uU3R5bGUgfHwge30pIH19XG4gICAgICAgICAgcG9pbnRlckV2ZW50cz17ZGlzYWJsZWQgPyBcIm5vbmVcIiA6IFwiYXV0b1wifVxuICAgICAgICA+XG4gICAgICAgICAge3N2Z0xheW91dERhdGEuYnV0dG9ucy5jaG9vc2UucGF0aHMubWFwKChwLCBpKSA9PiAoXG4gICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICBrZXk9e2BjaG9vc2UtcGF0aC0ke2l9YH1cbiAgICAgICAgICAgICAgZGF0YS1uYW1lPXtwLmRhdGFOYW1lfVxuICAgICAgICAgICAgICBkPXtwLmR9XG4gICAgICAgICAgICAgIGZpbGw9e3NlbGVjdEJ1dHRvbkZpbGwgfHwgcC5kZWZhdWx0RmlsbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZz5cblxuICAgICAgICB7LyogR3J1cGEgXCJJbnB1dCBBcmVhXCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5uYW1lfVxuICAgICAgICAgIHN0eWxlPXtpbnB1dEFyZWFTdHlsZSB8fCB7fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICB4PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0Lnh9XG4gICAgICAgICAgICB5PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0Lnl9XG4gICAgICAgICAgICB3aWR0aD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC53aWR0aH1cbiAgICAgICAgICAgIGhlaWdodD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC5oZWlnaHR9XG4gICAgICAgICAgICBmaWxsPXtpbnB1dEFyZWFSZWN0RmlsbCB8fCBzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmRlZmF1bHRGaWxsfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgIGQ9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLmJvcmRlclBhdGguZH1cbiAgICAgICAgICAgIGZpbGw9e2lucHV0QXJlYUJvcmRlckZpbGwgfHxcbiAgICAgICAgICAgICAgc3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEuYm9yZGVyUGF0aC5kZWZhdWx0RmlsbH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2c+XG5cbiAgICAgICAgey8qIEdydXBhIFwiRGVjcmVtZW50XCIgKi99XG4gICAgICAgIDxnXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9XG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lm5hbWV9XG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkICYmICFyZWFkT25seSA/IGhhbmRsZURlY3JlbWVudCA6IHVuZGVmaW5lZH1cbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdmdCdXR0b25TdHlsZSwgLi4uKGRlY3JlbWVudEJ1dHRvblN0eWxlIHx8IHt9KSB9fVxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9e2Rpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcImF1dG9cIn1cbiAgICAgICAgPlxuICAgICAgICAgIHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50LnBhdGhzLm1hcCgocCwgaSkgPT4gKFxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAga2V5PXtgZGVjLXBhdGgtJHtpfWB9XG4gICAgICAgICAgICAgIGRhdGEtbmFtZT17cC5kYXRhTmFtZX1cbiAgICAgICAgICAgICAgZD17cC5kfVxuICAgICAgICAgICAgICBmaWxsPXtkZWNyZW1lbnRCdXR0b25GaWxsIHx8IHAuZGVmYXVsdEZpbGx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICAgIHsvKiBKZVx1MDE1QmxpIGNoY2VzeiBkb2RhXHUwMTA3IGlrb25cdTAxMTkgU1ZHIFwiLVwiIG5hIHR5bSBrc3p0YVx1MDE0MmNpZSwgenJcdTAwRjNiIHRvIHR1dGFqLCBucC46ICovfVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8qPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKFggWSkgc2NhbGUoUylcIj5cbiAgICAgICAgICAgIHtEZWZhdWx0RGVjcmVtZW50SWNvblN2Z0NvbnRlbnR9XG4gICAgICAgICAgPC9nPiovXG4gICAgICAgICAgfVxuICAgICAgICAgIHsvKiBJa29uYSBEZWNyZW1lbnQgKC0pICovfVxuICAgICAgICAgIDxnXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lmljb25BbmNob3JYfSwgJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lmljb25BbmNob3JZfSkgc2NhbGUoJHtpY29uQWN0dWFsU2NhbGV9KSB0cmFuc2xhdGUoLSR7XG4gICAgICAgICAgICAgIGljb25WaWV3Qm94U2l6ZSAvIDJcbiAgICAgICAgICAgIH0sIC0ke2ljb25WaWV3Qm94U2l6ZSAvIDJ9KWB9XG4gICAgICAgICAgICBzdHlsZT17eyBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9fSAvLyBJa29ueSBuaWUgcG93aW5ueSBwcnplY2h3eXR5d2FcdTAxMDcga2xpa25pXHUwMTE5XHUwMTA3XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICB2aWV3Qm94PXtgMCAwICR7aWNvblZpZXdCb3hTaXplfSAke2ljb25WaWV3Qm94U2l6ZX1gfVxuICAgICAgICAgICAgICB3aWR0aD17aWNvblZpZXdCb3hTaXplfVxuICAgICAgICAgICAgICBoZWlnaHQ9e2ljb25WaWV3Qm94U2l6ZX1cbiAgICAgICAgICAgICAgZmlsbD1cIndoaXRlXCJcbiAgICAgICAgICAgICAgb3ZlcmZsb3c9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge0RlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudH1cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuXG4gICAgICAgIHsvKiBHcnVwYSBcIkluY3JlbWVudFwiICovfVxuICAgICAgICA8Z1xuICAgICAgICAgIGNsYXNzTmFtZT17U1ZHX0JVVFRPTl9DTEFTU19OQU1FfVxuICAgICAgICAgIGRhdGEtbmFtZT17c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5uYW1lfVxuICAgICAgICAgIG9uQ2xpY2s9eyFkaXNhYmxlZCAmJiAhcmVhZE9ubHkgPyBoYW5kbGVJbmNyZW1lbnQgOiB1bmRlZmluZWR9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3ZnQnV0dG9uU3R5bGUsIC4uLihpbmNyZW1lbnRCdXR0b25TdHlsZSB8fCB7fSkgfX1cbiAgICAgICAgICBwb2ludGVyRXZlbnRzPXtkaXNhYmxlZCB8fCByZWFkT25seSA/IFwibm9uZVwiIDogXCJhdXRvXCJ9XG4gICAgICAgID5cbiAgICAgICAgICB7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5wYXRocy5tYXAoKHAsIGkpID0+IChcbiAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgIGtleT17YGluYy1wYXRoLSR7aX1gfVxuICAgICAgICAgICAgICBkYXRhLW5hbWU9e3AuZGF0YU5hbWV9XG4gICAgICAgICAgICAgIGQ9e3AuZH1cbiAgICAgICAgICAgICAgZmlsbD17aW5jcmVtZW50QnV0dG9uRmlsbCB8fCBwLmRlZmF1bHRGaWxsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgICB7LyogSmVcdTAxNUJsaSBjaGNlc3ogZG9kYVx1MDEwNyBpa29uXHUwMTE5IFNWRyBcIitcIiBuYSB0eW0ga3N6dGFcdTAxNDJjaWUsIHpyXHUwMEYzYiB0byB0dXRhaiwgbnAuOiAqL31cbiAgICAgICAgICB7XG4gICAgICAgICAgICAvKjxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZShYIFkpIHNjYWxlKFMpXCI+XG4gICAgICAgICAgICB7RGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50fVxuICAgICAgICAgIDwvZz4qL1xuICAgICAgICAgIH1cbiAgICAgICAgICB7LyogSWtvbmEgSW5jcmVtZW50ICgrKSAqL31cbiAgICAgICAgICA8Z1xuICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5pY29uQW5jaG9yWH0sICR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5pY29uQW5jaG9yWX0pIHNjYWxlKCR7aWNvbkFjdHVhbFNjYWxlfSkgdHJhbnNsYXRlKC0ke1xuICAgICAgICAgICAgICBpY29uVmlld0JveFNpemUgLyAyXG4gICAgICAgICAgICB9LCAtJHtpY29uVmlld0JveFNpemUgLyAyfSlgfVxuICAgICAgICAgICAgc3R5bGU9e3sgcG9pbnRlckV2ZW50czogXCJub25lXCIgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgIHZpZXdCb3g9e2AwIDAgJHtpY29uVmlld0JveFNpemV9ICR7aWNvblZpZXdCb3hTaXplfWB9XG4gICAgICAgICAgICAgIHdpZHRoPXtpY29uVmlld0JveFNpemV9XG4gICAgICAgICAgICAgIGhlaWdodD17aWNvblZpZXdCb3hTaXplfVxuICAgICAgICAgICAgICBmaWxsPVwid2hpdGVcIlxuICAgICAgICAgICAgICBvdmVyZmxvdz1cInZpc2libGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7RGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50fVxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cblxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgIGNsYXNzTmFtZT17YCR7SFRNTF9JTlBVVF9DTEFTU19OQU1FfSAke2lucHV0Q2xhc3NOYW1lIHx8IFwiXCJ9YH0gLy8gS2xhc2EgeiBUd29qZWdvIEhUTUxcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX0gLy8gZGlzcGxheVZhbHVlIGplc3QganVcdTAxN0Mgc3RyaW5naWVtIGx1YiBwdXN0eW0gc3RyaW5naWVtXG4gICAgICAgIG1pbj17bWlufVxuICAgICAgICBtYXg9e21heH1cbiAgICAgICAgc3RlcD17c3RlcH1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICBvbklucHV0PXtoYW5kbGVJbnB1dENoYW5nZX0gLy8gUG9kXHUwMTQyXHUwMTA1Y3pvbnkgcG9wcmF3bnkgaGFuZGxlclxuICAgICAgICBzdHlsZT17aHRtbElucHV0U3R5bGV9XG4gICAgICAgIGFyaWEtbGFiZWw9e3Byb3BzW1wiYXJpYS1sYWJlbFwiXSB8fCBcIldhcnRvXHUwMTVCXHUwMTA3IGxpY3pib3dhXCJ9XG4gICAgICAgIHsuLi5yZXN0RGl2UHJvcHN9XG4gICAgICAvPlxuICAgICAge1xuICAgICAgICAvLyBabWllbmlvbmUgeiByZXN0SW5wdXRQcm9wcywgYm8gdGUgc1x1MDEwNSBkbGEgZ1x1MDE0Mlx1MDBGM3duZWdvIGRpdmFcbiAgICAgICAgLy8gSmVcdTAxNUJsaSBjaGNlc3ogcHJ6ZWthenl3YVx1MDEwNyBkb2RhdGtvd2UgYXRyeWJ1dHkgZG8gaW5wdXRhLFxuICAgICAgICAvLyBtdXNpc3ogamUgb3NvYm5vIG9ic1x1MDE0MnVcdTAxN0N5XHUwMTA3IGx1YiBuYXp3YVx1MDEwNyBucC4gaHRtbElucHV0UHJvcHNcbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiIsICIvLyBEZWZpbmljamUgdHlwXHUwMEYzd1xudHlwZSBFeGNlbE5lc3RlZE51bWJlckFycmF5ID0gbnVtYmVyIHwgRXhjZWxOZXN0ZWROdW1iZXJBcnJheVtdO1xuXG5leHBvcnQgdHlwZSBFeGNlbE5lc3RlZE4gPSBFeGNlbE5lc3RlZE51bWJlckFycmF5O1xuZXhwb3J0IHR5cGUgRXhjZWxSZXN1bHRzID0gTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROdW1iZXJBcnJheT47XG5leHBvcnQgdHlwZSBFeGNlbFNldHNTZXQgPSB7XG4gIHZhcjogc3RyaW5nOyAvLyBOYXp3YSB6bWllbm5laiB3ZWpcdTAxNUJjaW93ZWpcbiAgdmFsOiBFeGNlbE5lc3RlZE51bWJlckFycmF5OyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyB6bWllbm5laiAobGljemJhIGx1YiB6YWduaWVcdTAxN0NkXHUwMTdDb25hIHRhYmxpY2EgbGljemIpXG59O1xuXG4vLyBUeXAgZGxhIGZ1bmtjamkgb2JsaWN6ZW5pb3dlajogcHJ6eWptdWplIG1hcFx1MDExOSwgendyYWNhIG9ibGljem9uXHUwMTA1IHdhcnRvXHUwMTVCXHUwMTA3XG50eXBlIENhbGN1bGF0aW9uRnVuY3Rpb24gPSAoY3VycmVudE1hcDogRXhjZWxSZXN1bHRzKSA9PiBFeGNlbE5lc3RlZE51bWJlckFycmF5O1xuXG5leHBvcnQgdHlwZSBFeGNlbFNldHNHZXQgPSB7XG4gIHZhcjogc3RyaW5nOyAvLyBOYXp3YSBub3dlaiwgb2JsaWN6b25laiB6bWllbm5lalxuICB2YWw6IENhbGN1bGF0aW9uRnVuY3Rpb247IC8vIEZ1bmtjamEgb2JsaWN6YWpcdTAxMDVjYSB3YXJ0b1x1MDE1Qlx1MDEwNyB0ZWogem1pZW5uZWpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFptaWVuaW9ubyB6IGBmdW5gIG5hIGB2YWxgIHpnb2RuaWUgeiBUd29pbSBwcnp5a1x1MDE0MmFkZW0gdVx1MDE3Q3ljaWFcbn07XG5cbi8qKlxuICogRnVua2NqYSBFeGNlbCBwcnpldHdhcnphIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd2UgaSB3eWtvbnVqZSB6ZGVmaW5pb3dhbmUgb2JsaWN6ZW5pYS5cbiAqIEBwYXJhbSBpbnB1dFZhbHVlcyBXYXJ0b1x1MDE1QmNpIHBvY3pcdTAxMDV0a293ZSBkbyB1bWllc3pjemVuaWEgdyBtYXBpZS5cbiAqIEBwYXJhbSBjYWxjc1ZhbHVlcyBEZWZpbmljamUgb2JsaWN6ZVx1MDE0NCBkbyB3eWtvbmFuaWEuXG4gKiBAcmV0dXJucyBNYXBhIHphd2llcmFqXHUwMTA1Y2Egd3N6eXN0a2llIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd2UgaSBvYmxpY3pvbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBFeGNlbChcbiAgaW5wdXRWYWx1ZXM6IEV4Y2VsU2V0c1NldCB8IEV4Y2VsU2V0c1NldFtdLFxuICBjYWxjc1ZhbHVlcz86IEV4Y2VsU2V0c0dldCB8IEV4Y2VsU2V0c0dldFtdIC8vIERydWdpIGFyZ3VtZW50IGplc3Qgb3Bjam9uYWxueVxuKTogRXhjZWxSZXN1bHRzIHsgLy8gWndyYWNhbXkgbWFwXHUwMTE5IHogYmFyZHppZWogc3pjemVnXHUwMEYzXHUwMTQyb3d5bSB0eXBlbVxuICBcbiAgLy8gSW5pY2phbGl6YWNqYSBtYXB5IHogcG9wcmF3bnltaSB0eXBhbWlcbiAgY29uc3QgTTpFeGNlbFJlc3VsdHMgPSBuZXcgTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROdW1iZXJBcnJheT4oKTtcblxuICAvLyAxLiBQcnpldHdhcnphbmllIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd3ljaCAoaW5wdXRWYWx1ZXMpXG4gIC8vIE5vcm1hbGl6YWNqYSBpbnB1dFZhbHVlcyBkbyB0YWJsaWN5LCBqZVx1MDE1QmxpIHByemVrYXphbm8gcG9qZWR5bmN6eSBvYmlla3RcbiAgY29uc3QgcmVzb2x2ZWRJbnB1dFZhbHVlcyA9ICFBcnJheS5pc0FycmF5KGlucHV0VmFsdWVzKSA/IFtpbnB1dFZhbHVlc10gOiBpbnB1dFZhbHVlcztcbiAgcmVzb2x2ZWRJbnB1dFZhbHVlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIE0uc2V0KGl0ZW0udmFyLCBpdGVtLnZhbCk7XG4gIH0pO1xuXG4gIC8vIDIuIFByemV0d2FyemFuaWUgd2FydG9cdTAxNUJjaSBvYmxpY3plbmlvd3ljaCAoY2FsY3NWYWx1ZXMpXG4gIGlmIChjYWxjc1ZhbHVlcykgeyAvLyBXeWtvbmFqIHR5bGtvLCBqZVx1MDE1QmxpIGNhbGNzVmFsdWVzIHpvc3RhXHUwMTQyeSBkb3N0YXJjem9uZVxuICAgIC8vIE5vcm1hbGl6YWNqYSBjYWxjc1ZhbHVlcyBkbyB0YWJsaWN5LCBqZVx1MDE1QmxpIHByemVrYXphbm8gcG9qZWR5bmN6eSBvYmlla3RcbiAgICBjb25zdCByZXNvbHZlZENhbGNzVmFsdWVzID0gIUFycmF5LmlzQXJyYXkoY2FsY3NWYWx1ZXMpID8gW2NhbGNzVmFsdWVzXSA6IGNhbGNzVmFsdWVzO1xuICAgIFxuICAgIHJlc29sdmVkQ2FsY3NWYWx1ZXMuZm9yRWFjaChjYWxjSXRlbSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBXeXdvXHUwMTQyYW5pZSBmdW5rY2ppIG9ibGljemVuaW93ZWogdVx1MDE3Q3l0a293bmlrYSwgcHJ6ZWthenVqXHUwMTA1YyBha3R1YWxuXHUwMTA1IG1hcFx1MDExOSBNXG4gICAgICAgIGNvbnN0IHJlc3VsdFZhbHVlID0gY2FsY0l0ZW0udmFsKE0pO1xuICAgICAgICAvLyBaYXBpc2FuaWUgd3luaWt1IG9ibGljemVcdTAxNDQgZG8gbWFweSBNXG4gICAgICAgIE0uc2V0KGNhbGNJdGVtLnZhciwgcmVzdWx0VmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgQlx1MDE0Mlx1MDEwNWQgcG9kY3phcyBvYmxpY3phbmlhIHptaWVubmVqIFwiJHtjYWxjSXRlbS52YXJ9XCI6YCwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKTtcbiAgICAgICAgLy8gTW9cdTAxN0Nlc3ogemRlY3lkb3dhXHUwMTA3LCBqYWsgb2JzXHUwMTQydVx1MDE3Q3lcdTAxMDcgYlx1MDE0Mlx1MDEwNWQ6IHBvbWluXHUwMTA1XHUwMTA3LCB6YXBpc2FcdTAxMDcgYlx1MDE0Mlx1MDEwNWQsIHByemVyd2FcdTAxMDcsIGl0cC5cbiAgICAgICAgLy8gTmEgcmF6aWUgemFwaXN1amVteSBgdW5kZWZpbmVkYCwgYWJ5IHdza2F6YVx1MDEwNyBwcm9ibGVtLlxuICAgICAgICBNLnNldChjYWxjSXRlbS52YXIsIHVuZGVmaW5lZCBhcyBhbnkpOyAvLyBVXHUwMTdDeXdhbXkgYGFzIGFueWAgYWJ5IHBvendvbGlcdTAxMDcgbmEgYHVuZGVmaW5lZGAgdyBtYXBpZSB6IHR5cGVtIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXlcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBNO1xufVxuXG4vKipcbiAqIEdlbmVydWplIHRhYmxpY1x1MDExOSBsaWN6YiAocHJ6ZWR6aWFcdTAxNDIpIG8gb2tyZVx1MDE1QmxvbmVqIGxpY3piaWUgZWxlbWVudFx1MDBGM3csIGtyb2t1IGkgd2FydG9cdTAxNUJjaSBwb2N6XHUwMTA1dGtvd2VqLlxuICpcbiAqIEBwYXJhbSBzdGFydEF0IFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBwaWVyd3N6ZWdvIGVsZW1lbnR1IHcgdGFibGljeS5cbiAqIEBwYXJhbSBzdGVwIEtyb2sgKHJcdTAwRjNcdTAxN0NuaWNhKSBtaVx1MDExOWR6eSBrb2xlam55bWkgZWxlbWVudGFtaSB3IHRhYmxpY3kuIE1vXHUwMTdDZSBieVx1MDEwNyBkb2RhdG5pLCB1amVtbnkgbHViIHplcm93eS5cbiAqIEBwYXJhbSBpdGVtcyBMaWN6YmEgZWxlbWVudFx1MDBGM3cgZG8gd3lnZW5lcm93YW5pYSB3IHRhYmxpY3kuXG4gKiBAcmV0dXJucyBUYWJsaWNhIGxpY3piIChudW1iZXJbXSkgcmVwcmV6ZW50dWpcdTAxMDVjYSB3eWdlbmVyb3dhbnkgcHJ6ZWR6aWFcdTAxNDIuXG4gKiBad3JhY2EgcHVzdFx1MDEwNSB0YWJsaWNcdTAxMTksIGplXHUwMTVCbGkgYGl0ZW1zYCBqZXN0IG1uaWVqc3plIGx1YiByXHUwMEYzd25lIDAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBTaXplKHN0YXJ0QXQ6IG51bWJlciwgc3RlcDogbnVtYmVyLCBpdGVtczogbnVtYmVyKTogbnVtYmVyW10ge1xuICBpZiAoaXRlbXMgPD0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtczsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2goc3RhcnRBdCArIChpICogc3RlcCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2VuZXJ1amUgdGFibGljXHUwMTE5IGxpY3piIChwcnplZHppYVx1MDE0MiksIHphY3p5bmFqXHUwMTA1YyBvZCBgc3RhcnRBdGAsIHBvc3RcdTAxMTlwdWpcdTAxMDVjIG8gYHN0ZXBgLFxuICogYVx1MDE3QyBkbyBvc2lcdTAxMDVnbmlcdTAxMTljaWEgKGkgcG90ZW5jamFsbmllIHdcdTAxNDJcdTAxMDVjemVuaWEpIGBlbmRBdGAuXG4gKlxuICogQHBhcmFtIHN0YXJ0QXQgV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHBpZXJ3c3plZ28gZWxlbWVudHUgdyB0YWJsaWN5LlxuICogQHBhcmFtIHN0ZXAgS3JvayAoclx1MDBGM1x1MDE3Q25pY2EpIG1pXHUwMTE5ZHp5IGtvbGVqbnltaSBlbGVtZW50YW1pIHcgdGFibGljeS4gTW9cdTAxN0NlIGJ5XHUwMTA3IGRvZGF0bmksIHVqZW1ueSBsdWIgemVyb3d5LlxuICogQHBhcmFtIGVuZEF0IFdhcnRvXHUwMTVCXHUwMTA3IGtvXHUwMTQ0Y293YSBwcnplZHppYVx1MDE0MnUuIEVsZW1lbnR5IGJcdTAxMTlkXHUwMTA1IGdlbmVyb3dhbmUgdGFrIGRcdTAxNDJ1Z28sIGpha1xuICogZFx1MDE0MnVnbyBtaWVzemN6XHUwMTA1IHNpXHUwMTE5IHcgcHJ6ZWR6aWFsZSBva3JlXHUwMTVCbG9ueW0gcHJ6ZXogYHN0YXJ0QXRgLCBgc3RlcGAgaSBgZW5kQXRgICh3XHUwMTQyXHUwMTA1Y3puaWUpLlxuICogQHJldHVybnMgVGFibGljYSBsaWN6YiAobnVtYmVyW10pIHJlcHJlemVudHVqXHUwMTA1Y2Egd3lnZW5lcm93YW55IHByemVkemlhXHUwMTQyLlxuICogWndyYWNhIHB1c3RcdTAxMDUgdGFibGljXHUwMTE5LCBqZVx1MDE1QmxpIG5pZSBtb1x1MDE3Q25hIHd5Z2VuZXJvd2FcdTAxMDcgXHUwMTdDYWRueWNoIGVsZW1lbnRcdTAwRjN3XG4gKiAobnAuIHN0YXJ0QXQgPiBlbmRBdCBwcnp5IGRvZGF0bmltIGtyb2t1LCBsdWIgamVcdTAxNUJsaSBzdGVwPTAgYSBzdGFydEF0ICE9PSBlbmRBdCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0KHN0YXJ0QXQ6IG51bWJlciwgc3RlcDogbnVtYmVyLCBlbmRBdDogbnVtYmVyKTogbnVtYmVyW10ge1xuICBjb25zdCByZXN1bHQ6IG51bWJlcltdID0gW107XG5cbiAgaWYgKHN0ZXAgPT09IDApIHtcbiAgICAvLyBKZVx1MDE1QmxpIGtyb2sgd3lub3NpIDAsIHByemVkemlhXHUwMTQyIG1vXHUwMTdDZSB6YXdpZXJhXHUwMTA3IHR5bGtvIGplZGVuIGVsZW1lbnQsXG4gICAgLy8gamVcdTAxNUJsaSBzdGFydEF0IGplc3Qgclx1MDBGM3duZSBlbmRBdC5cbiAgICBpZiAoc3RhcnRBdCA9PT0gZW5kQXQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHN0YXJ0QXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0OyAvLyBad3JhY2EgW3N0YXJ0QXRdIGx1YiBbXVxuICB9XG5cbiAgaWYgKHN0ZXAgPiAwKSB7XG4gICAgLy8gS3JvayBkb2RhdG5pOiBpZHppZW15IHcgZ1x1MDBGM3JcdTAxMTlcbiAgICBpZiAoc3RhcnRBdCA+IGVuZEF0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0OyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgamVzdCBqdVx1MDE3QyB6YSB3YXJ0b1x1MDE1QmNpXHUwMTA1IGtvXHUwMTQ0Y293XHUwMTA1XG4gICAgfVxuICAgIGZvciAobGV0IGN1cnJlbnRWYWx1ZSA9IHN0YXJ0QXQ7IGN1cnJlbnRWYWx1ZSA8PSBlbmRBdDsgY3VycmVudFZhbHVlICs9IHN0ZXApIHtcbiAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICB9IGVsc2UgeyAvLyBzdGVwIDwgMFxuICAgIC8vIEtyb2sgdWplbW55OiBpZHppZW15IHcgZFx1MDBGM1x1MDE0MlxuICAgIGlmIChzdGFydEF0IDwgZW5kQXQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBqZXN0IGp1XHUwMTdDIHphIHdhcnRvXHUwMTVCY2lcdTAxMDUga29cdTAxNDRjb3dcdTAxMDUgKHcgelx1MDE0Mlx1MDEwNSBzdHJvblx1MDExOSlcbiAgICB9XG4gICAgZm9yIChsZXQgY3VycmVudFZhbHVlID0gc3RhcnRBdDsgY3VycmVudFZhbHVlID49IGVuZEF0OyBjdXJyZW50VmFsdWUgKz0gc3RlcCkge1xuICAgICAgcmVzdWx0LnB1c2goY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBBbHRlcm5hdHl3bmEsIGJhcmR6aWVqIHp3aVx1MDExOXpcdTAxNDJhIGltcGxlbWVudGFjamEgdVx1MDE3Q3l3YWpcdTAxMDVjYSBBcnJheS5mcm9tIChkemlhXHUwMTQyYSB0YWsgc2Ftbyk6XG4vKlxuZnVuY3Rpb24gaW5pdFJhbmdlRmlyc3RTdGVwU2l6ZUFsdGVybmF0aXZlKGl0ZW1zOiBudW1iZXIsIHN0ZXA6IG51bWJlciwgc3RhcnRBdDogbnVtYmVyKTogbnVtYmVyW10ge1xuICBpZiAoaXRlbXMgPD0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogaXRlbXMgfSwgKF8sIGluZGV4KSA9PiBzdGFydEF0ICsgaW5kZXggKiBzdGVwKTtcbn1cblxuY29uc29sZS5sb2coXCItLS0gVGVzdCBhbHRlcm5hdHl3bmVqIGltcGxlbWVudGFjamkgLS0tXCIpO1xuY29uc3QgcmFuZ2UxX2FsdCA9IGluaXRSYW5nZUZpcnN0U3RlcFNpemVBbHRlcm5hdGl2ZSg1LCAyLCAxMCk7XG5jb25zb2xlLmxvZyhcIlJhbmdlIDEgQWx0IChpdGVtczogNSwgc3RlcDogMiwgc3RhcnRBdDogMTApOlwiLCByYW5nZTFfYWx0KTtcbiovXG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VsO1xuXG4vLyAtLS0gUHJ6eWtcdTAxNDJhZCB1XHUwMTdDeWNpYSAtLS1cbi8vLy8gRGVmaW5pY2phIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd3ljaFxuLy9jb25zdCBpbnB1dHM6IEV4Y2VsU2V0c1NldFtdID0gW1xuLy8gIHsgdmFyOiBcImlcIiwgdmFsOiBbMSwgMiwgMywgNCwgNSwgNiwgN10gfSxcbi8vICB7IHZhcjogXCJqXCIsIHZhbDogWzEsIDMsIDIsIDcsIDYsIDUsIDRdIH1cbi8vXTtcbi8vXG4vLy8vIERlZmluaWNqYSBvYmxpY3plXHUwMTQ0XG4vL2NvbnN0IGNhbGN1bGF0aW9uczogRXhjZWxTZXRzR2V0W10gPSBbXG4vLyAge1xuLy8gICAgdmFyOiBcImlqX3N1bVwiLCAvLyBOb3dhIHptaWVubmEsIGt0XHUwMEYzcmEgYlx1MDExOWR6aWUgc3VtXHUwMTA1IGlba10gKyBqW2tdXG4vLyAgICB2YWw6IChjdXJyZW50TWFwKSA9PiB7XG4vLyAgICAgIC8vIFBvYmllcmFteSB0YWJsaWNlICdpJyBvcmF6ICdqJyB6IG1hcHlcbi8vICAgICAgY29uc3QgaUFycmF5ID0gY3VycmVudE1hcC5nZXQoXCJpXCIpO1xuLy8gICAgICBjb25zdCBqQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImpcIik7XG4vL1xuLy8gICAgICAvLyBXYVx1MDE3Q25lOiBTcHJhd2R6ZW5pZSB0eXBcdTAwRjN3IGkgb2JzXHUwMTQydWdhIGJcdTAxNDJcdTAxMTlkXHUwMEYzdyB3ZXduXHUwMTA1dHJ6IGZ1bmtjamkgdVx1MDE3Q3l0a293bmlrYVxuLy8gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaUFycmF5KSB8fCAhQXJyYXkuaXNBcnJheShqQXJyYXkpKSB7XG4vLyAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWm1pZW5uZSAnaScgb3JheiAnaicgbXVzelx1MDEwNSBieVx1MDEwNyB0YWJsaWNhbWkgZGxhIHRlaiBvcGVyYWNqaSBzdW1vd2FuaWEuXCIpO1xuLy8gICAgICB9XG4vLyAgICAgIGlmIChpQXJyYXkuc29tZShpc05hTikgfHwgakFycmF5LnNvbWUoaXNOYU4pKSB7XG4vLyAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXc3p5c3RraWUgZWxlbWVudHkgdyB0YWJsaWNhY2ggJ2knIG9yYXogJ2onIG11c3pcdTAxMDUgYnlcdTAxMDcgbGljemJhbWkuXCIpO1xuLy8gICAgICB9XG4vLyAgICAgIGlmIChpQXJyYXkubGVuZ3RoICE9PSBqQXJyYXkubGVuZ3RoKSB7XG4vLyAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFibGljZSAnaScgb3JheiAnaicgbXVzelx1MDEwNSBtaWVcdTAxMDcgdGFrXHUwMTA1IHNhbVx1MDEwNSBkXHUwMTQydWdvXHUwMTVCXHUwMTA3IGRvIHN1bW93YW5pYSBlbGVtZW50IHBvIGVsZW1lbmNpZS5cIik7XG4vLyAgICAgIH1cbi8vXG4vLyAgICAgIC8vIFd5a29uYW5pZSBvcGVyYWNqaSBzdW1vd2FuaWEgZWxlbWVudCBwbyBlbGVtZW5jaWVcbi8vICAgICAgLy8gWmFrXHUwMTQyYWRhbXksIFx1MDE3Q2Ugc1x1MDEwNSB0byBwXHUwMTQyYXNraWUgdGFibGljZSBsaWN6YiwgemdvZG5pZSB6IHByenlrXHUwMTQyYWRlbS5cbi8vICAgICAgLy8gRGxhIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXkgb3BlcmFjamEgYnlcdTAxNDJhYnkgYmFyZHppZWogelx1MDE0Mm9cdTAxN0NvbmEgKHJla3VyZW5jeWpuYSkuXG4vLyAgICAgIHJldHVybiBpQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+ICh2YWxfaSBhcyBudW1iZXIpICsgKGpBcnJheVtpbmRleF0gYXMgbnVtYmVyKSk7XG4vLyAgICB9XG4vLyAgfSxcbi8vICB7XG4vLyAgICB2YXI6IFwia1wiLCAvLyBQcnp5a1x1MDE0MmFkIGlubmVqIHptaWVubmVqLCBucC4gc2thbGFyXG4vLyAgICB2YWw6ICgpID0+IDEwMCAvLyBQcm9zdGEgZnVua2NqYSB6d3JhY2FqXHUwMTA1Y2Egd2FydG9cdTAxNUJcdTAxMDdcbi8vICB9LFxuLy8gIHtcbi8vICAgIHZhcjogXCJpX3BsdXNfa1wiLCAvLyBQcnp5a1x1MDE0MmFkIG9wZXJhY2ppIHRhYmxpY2EgKyBza2FsYXIgKGJyb2FkY2FzdGluZylcbi8vICAgIHZhbDogKGN1cnJlbnRNYXApID0+IHtcbi8vICAgICAgICBjb25zdCBpQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImlcIik7XG4vLyAgICAgICAgY29uc3Qga1ZhbCA9IGN1cnJlbnRNYXAuZ2V0KFwia1wiKTtcbi8vXG4vLyAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlBcnJheSkgfHwgdHlwZW9mIGtWYWwgIT09ICdudW1iZXInKSB7XG4vLyAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidpJyBtdXNpIGJ5XHUwMTA3IHRhYmxpY1x1MDEwNSwgYSAnaycgbGljemJcdTAxMDUuXCIpO1xuLy8gICAgICAgIH1cbi8vICAgICAgICByZXR1cm4gaUFycmF5Lm1hcCh2YWxfaSA9PiAodmFsX2kgYXMgbnVtYmVyKSArIChrVmFsIGFzIG51bWJlcikpO1xuLy8gICAgfVxuLy8gIH1cbi8vXTtcbi8vXG4vLy8vIFd5d29cdTAxNDJhbmllIGZ1bmtjamkgRXhjZWxcbi8vY29uc3QgQTEgPSBFeGNlbChpbnB1dHMsIGNhbGN1bGF0aW9ucyk7XG4vL1xuLy8vLyBXeVx1MDE1QndpZXRsZW5pZSB3eW5pa1x1MDBGM3dcbi8vY29uc29sZS5sb2coXCJDYVx1MDE0MmEgbWFwYSBBMTpcIiwgQTEpO1xuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaScpOlwiLCBBMS5nZXQoXCJpXCIpKTtcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2onKTpcIiwgQTEuZ2V0KFwialwiKSk7XG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdpal9zdW0nKTpcIiwgQTEuZ2V0KFwiaWpfc3VtXCIpKTsgLy8gT2N6ZWtpd2FuZTogWzIsIDUsIDUsIDExLCAxMSwgMTEsIDExXVxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaycpOlwiLCBBMS5nZXQoXCJrXCIpKTsgICAgICAgICAvLyBPY3pla2l3YW5lOiAxMDBcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2lfcGx1c19rJyk6XCIsIEExLmdldChcImlfcGx1c19rXCIpKTsgLy8gT2N6ZWtpd2FuZTogWzEwMSwgMTAyLCAxMDMsIDEwNCwgMTA1LCAxMDYsIDEwN11cbi8vY29uc29sZS5sb2coXCJXYXJ0b1x1MDE1Qlx1MDEwNyBpWzNdIChpbmRla3MgMywgY3p5bGkgY3p3YXJ0eSBlbGVtZW50KTpcIiwgKEExLmdldChcImlcIikgYXMgbnVtYmVyW10pWzNdKTsgLy8gT2N6ZWtpd2FuZTogNFxuIiwgImV4cG9ydCBmdW5jdGlvbiBmbG9vckxvZzIoeDpudW1iZXIpOm51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgubG9nMih4KSk7XG59XG5cbi8vICB0byBrbGFzeWN6bmEgcG90XHUwMTE5Z2EgZHdcdTAwRjNqa2kuXG5leHBvcnQgZnVuY3Rpb24gcG93Mih4Om51bWJlcik6bnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgucG93KDIseCk7XG59XG5leHBvcnQgZnVuY3Rpb24gcG93MkFmZmluZShcbiAgYTogbnVtYmVyLFxuICBiOiBudW1iZXIsXG4gIGM6IG51bWJlcixcbiAgeDogbnVtYmVyLFxuICBmPzogKHZhbDogbnVtYmVyKSA9PiBudW1iZXIgLy8gT3Bjam9uYWxueSBhcmd1bWVudCBjYWxsYmFja1xuKTogbnVtYmVyIHtcbiAgY29uc3QgcHJvY2Vzc2VkWCA9IGYgPyBmKHgpIDogeDsgLy8gSmVcdTAxNUJsaSBmIGlzdG5pZWplLCB6YXN0b3N1aiBqZSBkbyB4LCB3IHByemVjaXdueW0gcmF6aWUgdVx1MDE3Q3lqIHhcbiAgcmV0dXJuIGEgKiAyICoqIChwcm9jZXNzZWRYICsgYikgKyBjO1xufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIHBvdzJBZmZpbmUoeDogbnVtYmVyLCBhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIGEgKiAyICoqICh4ICsgYikgKyBjO1xufVxuKi9cblxuLy8gIHdhbHVhY2phIGR3dS1hZHljem5hIGxpY3pieSBuYXR1cmFsbmVqIGRvZGF0bmllaiBcbi8vICBjenlsaSBuYWp3aVx1MDExOWtzelx1MDEwNSBwb3RcdTAxMTlnXHUwMTE5IGxpY3pieSAyLCBrdFx1MDBGM3JhIGR6aWVsaSB4XG4vLyAgbWFwbGUgYGsgOj0geCAtPiBpbG9nMih4IC0gQml0c1tBbmRdKHgsIHggLSAxKSlgXG4vLyAgayh4KT1vcmRfMih4KVxuLy8gIEN6eWxpOiBpbGUgcmF6eSB4IG1vXHUwMTdDbmEgcG9kemllbGlcdTAxMDcgcHJ6ZXogMiwgemFuaW0gcHJ6ZXN0YW5pZSBieVx1MDEwNyBjYVx1MDE0Mmtvd2l0ZSBcbi8vICAobHViLCByXHUwMEYzd25vem5hY3puaWUsIHBvenljamEgbmFqbVx1MDE0Mm9kc3plZ28gdXN0YXdpb25lZ28gYml0dSB3IHgpLlxuZXhwb3J0IGZ1bmN0aW9uIHZhbDJBZGljKHg6IG51bWJlcik6IG51bWJlciB7XG4gIGlmICh4IDw9IDAgfHwgIU51bWJlci5pc0ludGVnZXIoeCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBtdXNpIGJ5XHUwMTA3IGRvZGF0bmlcdTAxMDUgbGljemJcdTAxMDUgY2FcdTAxNDJrb3dpdFx1MDEwNS5cIik7XG4gIH1cbiAgcmV0dXJuIE1hdGgubG9nMih4ICYgLXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG93MkFmZmluZV92YWwyQWRpYyh4OiBudW1iZXIsIGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gYSAqIDIgKiogKHZhbDJBZGljKHgpICsgYikgKyBjO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RWYWxOYXR1cmFsUG9zKHZhbDp1bmtub3duKTpib29sZWFuIHtcbiAgcmV0dXJuICh0eXBlb2YgdmFsICE9PSBcIm51bWJlclwiIHx8IGlzTmFOKHZhbCkgfHwgIU51bWJlci5pc0ludGVnZXIodmFsKSB8fFxuICB2YWwgPD0gMCk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm8odmFsOnVua25vd24pOmJvb2xlYW4ge1xuICByZXR1cm4gKHR5cGVvZiB2YWwgIT09IFwibnVtYmVyXCIgfHwgaXNOYU4odmFsKSB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWwpIHx8XG4gIHZhbCA8IDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVzdFNvbU5vdE9mVmFsc0FycmF5KHY6c3RyaW5nLCBhcnI6dW5rbm93biwgdGVzdDpcImlzTm90VmFsTmF0dXJhbFBvc1wifFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik6dm9pZCB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFptaWVubmUgJHt2fSAgbXVzelx1MDEwNSBieVx1MDEwNyB0YWJsaWNhbWkuYCxcbiAgICApO1xuICB9XG4gIHN3aXRjaCAodGVzdCkge1xuICAgIGNhc2UgXCJpc05vdFZhbE5hdHVyYWxQb3NcIjpcbiAgICAgIGlmIChhcnIuc29tZShpc05vdFZhbE5hdHVyYWxQb3MpKSB7dGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBXc3p5c3RraWUgZWxlbWVudHkgdyB0YWJsaWN5ICR7dn0gbXVzelx1MDEwNSBieVx1MDEwNyBsaWN6YmFtaSBuYXR1cmFsbnltaSBkb2RhdG5pbWkgKHdpXHUwMTE5a3N6eW1pIG9kIDApLmAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIjpcbiAgICAgIGlmIChhcnIuc29tZShpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVybykpIHt0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBXc3p5c3RraWUgZWxlbWVudHkgdyB0YWJsaWN5ICR7dn0gbXVzelx1MDEwNSBieVx1MDEwNyBsaWN6YmFtaSBuYXR1cmFsbnltaSBkb2RhdG5pbWkgeiB6ZXJvICh3aVx1MDExOWtzenltaSBvZCAtMSkuYCxcbiAgICAgICk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxufVxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXG5cbmltcG9ydCB7IEpTWCB9IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOFwiO1xuXG4vLyBaYVx1MDE0Mlx1MDBGM1x1MDE3Q215LCBcdTAxN0NlIHRlIHR5cHkgc1x1MDEwNSB6ZGVmaW5pb3dhbmUgZ2xvYmFsbmllIGx1YiBpbXBvcnRvd2FuZVxuLy8gSmVcdTAxNUJsaSBuaWUsIG9ka29tZW50dWogamUgbHViIHByemVuaWVcdTAxNUIgZG8gd3NwXHUwMEYzbG5lZ28gcGxpa3UgdHlwXHUwMEYzdy5cbnR5cGUgTmVzdGVkTnVtYmVyQXJyYXkgPSBudW1iZXIgfCBOZXN0ZWROdW1iZXJBcnJheVtdO1xudHlwZSBFeGNlbFJlc3VsdHMgPSBNYXA8c3RyaW5nLCBOZXN0ZWROdW1iZXJBcnJheT47XG5cbmludGVyZmFjZSBQbG90RXhjZWxQcm9wcyB7XG4gIGRhdGE6IEV4Y2VsUmVzdWx0cztcbiAgdHlwZTogXCJyb3dcIiB8IFwiY29sXCI7IC8vIE9yaWVudGFjamEgdGFiZWxpOiBcInJvd1wiIChkYW5lIHcgd2llcnN6YWNoKSwgXCJjb2xcIiAoZGFuZSB3IGtvbHVtbmFjaClcbiAgY2FwdGlvbj86IHN0cmluZzsgLy8gT3Bjam9uYWxueSBwb2RwaXMgdGFiZWxpXG4gIHRhYmxlQ2xhc3NOYW1lPzogc3RyaW5nOyAvLyBPcGNqb25hbG5hIGtsYXNhIENTUyBkbGEgdGFiZWxpXG4gIHRoQ2xhc3NOYW1lPzogc3RyaW5nOyAvLyBPcGNqb25hbG5hIGtsYXNhIENTUyBkbGEga29tXHUwMEYzcmVrIHRoXG4gIHRkQ2xhc3NOYW1lPzogc3RyaW5nOyAvLyBPcGNqb25hbG5hIGtsYXNhIENTUyBkbGEga29tXHUwMEYzcmVrIHRkXG59XG5cbi8vIEZ1bmtjamEgcG9tb2NuaWN6YSBkbyBmb3JtYXRvd2FuaWEgd2FydG9cdTAxNUJjaSBrb21cdTAwRjNya2lcbmNvbnN0IGZvcm1hdENlbGxWYWx1ZSA9ICh2YWx1ZTogTmVzdGVkTnVtYmVyQXJyYXkgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBEbGEgemFnbmllXHUwMTdDZFx1MDE3Q29ueWNoIHRhYmxpYywgSlNPTi5zdHJpbmdpZnkgbW9cdTAxN0NlIGJ5XHUwMTA3IGRvYnJ5bSByb3p3aVx1MDEwNXphbmllbS5cbiAgICAvLyBEbGEgcFx1MDE0MmFza2ljaCB0YWJsaWMgbGljemIsIG1vXHUwMTdDbmEgdVx1MDE3Q3lcdTAxMDcgdmFsdWUuam9pbignLCAnKS5cbiAgICAvLyBUdXRhaiB3eWJpZXJhbXkgSlNPTi5zdHJpbmdpZnkgZGxhIG9nXHUwMEYzbG5vXHUwMTVCY2kuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIFwiW0JcdTAxNDJcdTAxMDVkIHNlcmlhbGl6YWNqaSB0YWJsaWN5XVwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gU3RyaW5nKHZhbHVlKTsgLy8gRmFsbGJhY2tcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBQbG90RXhjZWwoXG4gIHsgZGF0YSwgdHlwZSwgY2FwdGlvbiwgdGFibGVDbGFzc05hbWUsIHRoQ2xhc3NOYW1lLCB0ZENsYXNzTmFtZSB9OlxuICAgIFBsb3RFeGNlbFByb3BzLFxuKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgaWYgKCFkYXRhIHx8IGRhdGEuc2l6ZSA9PT0gMCkge1xuICAgIHJldHVybiA8cD5CcmFrIGRhbnljaCBkbyB3eVx1MDE1QndpZXRsZW5pYS48L3A+OyAvLyBMdWIgbnVsbCwgamVcdTAxNUJsaSBuaWUgY2hjZXN6IG5pYyByZW5kZXJvd2FcdTAxMDdcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKGRhdGEua2V5cygpKTtcblxuICAvLyBVc3RhbGVuaWUgbWFrc3ltYWxuZWogZFx1MDE0MnVnb1x1MDE1QmNpIHNlcmlpIGRhbnljaCAoZGxhIHd5clx1MDBGM3duYW5pYSB0YWJlbGkpXG4gIGxldCBtYXhMZW5ndGggPSAwO1xuICBsZXQgaGFzQW55RGF0YSA9IGZhbHNlO1xuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgY29uc3QgdmFsdWUgPSBkYXRhLmdldChrZXkpO1xuICAgIGhhc0FueURhdGEgPSB0cnVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgbWF4TGVuZ3RoID0gTWF0aC5tYXgobWF4TGVuZ3RoLCB2YWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgfVxuICAvLyBKZVx1MDE1QmxpIHNcdTAxMDUgZGFuZSwgYWxlIG5pZSBtYSB0YWJsaWMgKG5wLiBzYW1lIHNrYWxhcnkpIGx1YiB3c3p5c3RraWUgdGFibGljZSBzXHUwMTA1IHB1c3RlLFxuICAvLyB0byBrYVx1MDE3Q2RhIHNlcmlhIG1hIGVmZWt0eXduaWUgXCJkXHUwMTQydWdvXHUwMTVCXHUwMTA3XCIgMS5cbiAgaWYgKGhhc0FueURhdGEgJiYgbWF4TGVuZ3RoID09PSAwKSB7XG4gICAgbWF4TGVuZ3RoID0gMTtcbiAgfVxuICBpZiAobWF4TGVuZ3RoID09PSAwICYmIGtleXMubGVuZ3RoID4gMCkgeyAvLyBKZVx1MDE1QmxpIHNcdTAxMDUga2x1Y3plLCBhbGUgYnJhayBkYW55Y2ggKG5wLiBtYXBvd2FuaWUgbmEgdW5kZWZpbmVkKVxuICAgIG1heExlbmd0aCA9IDE7IC8vIFBva2FcdTAxN0MgcHJ6eW5ham1uaWVqIG5hZ1x1MDE0Mlx1MDBGM3draVxuICB9XG5cbiAgaWYgKHR5cGUgPT09IFwiY29sXCIpIHtcbiAgICAvLyBTdGFuZGFyZG93YSB0YWJlbGE6IGtsdWN6ZSBtYXB5IGpha28gbmFnXHUwMTQyXHUwMEYzd2tpIGtvbHVtblxuICAgIHJldHVybiAoXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzTmFtZX0+XG4gICAgICAgIHtjYXB0aW9uICYmIDxjYXB0aW9uPntjYXB0aW9ufTwvY2FwdGlvbj59XG4gICAgICAgIDx0aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICB7a2V5cy5tYXAoKGtleSkgPT4gKFxuICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPXt0aENsYXNzTmFtZX0ga2V5PXtrZXl9Plx1MzAxMHtrZXl9XHUzMDExPC90aD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogbWF4TGVuZ3RoIH0pLm1hcCgoXywgcm93SW5kZXgpID0+IChcbiAgICAgICAgICAgIDx0ciBrZXk9e2Byb3ctJHtyb3dJbmRleH1gfT5cbiAgICAgICAgICAgICAge2tleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJpZXMgPSBkYXRhLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIGxldCBjZWxsQ29udGVudDogc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZXJpZXMpKSB7XG4gICAgICAgICAgICAgICAgICBjZWxsQ29udGVudCA9IGZvcm1hdENlbGxWYWx1ZShzZXJpZXNbcm93SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJvd0luZGV4ID09PSAwKSB7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHNrYWxhcm5hLCB3eVx1MDE1QndpZXRsIHR5bGtvIHcgcGllcndzenltIHdpZXJzenVcbiAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX0ga2V5PXtgJHtrZXl9LXJvdy0ke3Jvd0luZGV4fWB9PlxuICAgICAgICAgICAgICAgICAgICB7Y2VsbENvbnRlbnR9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInJvd1wiKSB7XG4gICAgLy8gVGFiZWxhIHRyYW5zcG9ub3dhbmE6IGtsdWN6ZSBtYXB5IGpha28gbmFnXHUwMTQyXHUwMEYzd2tpIHdpZXJzenlcbiAgICByZXR1cm4gKFxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT17J3Bsb3Qtcm93LWRhdGExICcrIHRhYmxlQ2xhc3NOYW1lfT5cbiAgICAgICAge2NhcHRpb24gJiYgPGNhcHRpb24+e2NhcHRpb259PC9jYXB0aW9uPn1cbiAgICAgICAgey8qIE1vXHUwMTdDbmEgZG9kYVx1MDEwNyA8dGhlYWQ+IHogbmFnXHUwMTQyXHUwMEYzd2thbWkga29sdW1uLCBqZVx1MDE1QmxpIHNcdTAxMDUgcG90cnplYm5lLCBucC4gXCJQYXJhbWV0clwiLCBcIldhcnRvXHUwMTVCXHUwMTA3IDFcIiwgXCJXYXJ0b1x1MDE1Qlx1MDEwNyAyXCIsIC4uLiAqL31cbiAgICAgICAgey8qIERsYSB1cHJvc3pjemVuaWEsIHBvbWlqYW15IDx0aGVhZD4gdHV0YWosIGEgcGllcndzenkgPHRoPiB3IGthXHUwMTdDZHltIHdpZXJzenUgZHppYVx1MDE0MmEgamFrbyBuYWdcdTAxNDJcdTAwRjN3ZWsgd2llcnN6YSAqL31cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHtrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXJpZXMgPSBkYXRhLmdldChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPHRyIGtleT17YHNlcmllcy1yb3ctJHtrZXl9YH0+XG4gICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwicm93XCIgY2xhc3NOYW1lPXt0aENsYXNzTmFtZX0+XHUzMDEwe2tleX1cdTMwMTE8L3RoPntcIiBcIn1cbiAgICAgICAgICAgICAgICB7LyogTmFnXHUwMTQyXHUwMEYzd2VrIHdpZXJzemEgKi99XG4gICAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IG1heExlbmd0aCB9KS5tYXAoKF8sIGNvbEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQ6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZXJpZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllc1tjb2xJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb2xJbmRleCA9PT0gMCkgeyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBza2FsYXJuYSwgd3lcdTAxNUJ3aWV0bCB0eWxrbyB3IHBpZXJ3c3plaiBrb2x1bW5pZSBkYW55Y2hcbiAgICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e3RkQ2xhc3NOYW1lfSBrZXk9e2Ake2tleX0tY29sLSR7Y29sSW5kZXh9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2NlbGxDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gPHA+TmllcHJhd2lkXHUwMTQyb3d5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QUFBLEtBQUMsUUFBRywyREFBZTtBQUFBLFlBQ25CLGdCQUFBQSxLQUFDLFFBQUcsMkRBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLDZDQUFXO0FBQUEsWUFDZixnQkFBQUEsS0FBQyxRQUFHLDZDQUFXO0FBQUEsYUFDakIsR0FDRjtBQUFBO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFDQyxRQUFRLE1BQU0sT0FBTyxLQUNwQixnQkFBQUMsTUFBQUYsV0FBQSxFQVNFO0FBQUEsc0JBQUFDLEtBQUMsUUFBRztBQUFBLE1BQ0osZ0JBQUFBLEtBQUMsUUFBRyxxQ0FBa0I7QUFBQSxNQUN0QixnQkFBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLGdCQUFlO0FBQUEsVUFDZixNQUFNLFFBQVE7QUFBQSxVQUNkLE1BQUs7QUFBQSxVQUNMLFNBQVE7QUFBQTtBQUFBLE1BQ1Y7QUFBQSxPQUNGO0FBQUEsS0FFSjtBQUVKOzs7QURsWE8sZ0JBQUFFLFlBQUE7QUFBUCxPQUFPLGdCQUFBQSxLQUFDLE9BQUksR0FBSSxTQUFTLGVBQWUsTUFBTSxDQUFFOyIsCiAgIm5hbWVzIjogWyJqc3giLCAianN4cyIsICJGcmFnbWVudCIsICJqc3giLCAianN4cyIsICJqc3giXQp9Cg==
