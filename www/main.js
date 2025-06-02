// www/main.tsx
import { render } from "https://esm.sh/preact@10.26.8";

// www/app.tsx
import { useSignal } from "https://esm.sh/@preact/signals@2.2.0";

// www/ui/InputNumber.tsx
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

// www/logic/calculateExcel.ts
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

// www/logic/mathFunc.ts
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

// www/ui/PlotExcel.tsx
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

// www/app.tsx
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
              style: {
                border: "3px solid #6c757d",
                borderRadius: "8px",
                padding: "20px",
                marginTop: "0",
                marginBottom: "0",
                display: "flex",
                alignItems: "flex-start",
                gap: "40px",
                flexFlow: "row nowrap"
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

// www/main.tsx
import { jsx as jsx4 } from "https://esm.sh/preact@10.26.8/jsx-runtime";
render(/* @__PURE__ */ jsx4(App, {}), document.getElementById("root"));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50c3giLCAiYXBwLnRzeCIsICJ1aS9JbnB1dE51bWJlci50c3giLCAibG9naWMvY2FsY3VsYXRlRXhjZWwudHMiLCAibG9naWMvbWF0aEZ1bmMudHMiLCAidWkvUGxvdEV4Y2VsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xyXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwLnRzeFwiO1xyXG4vL2FhXHJcbnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikhKTtcclxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cclxuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cclxuaW1wb3J0IHsgc2lnbmFsLCB1c2VTaWduYWwgfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvQHByZWFjdC9zaWduYWxzQDIuMi4wXCI7XHJcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSBcIi4vdWkvSW5wdXROdW1iZXIudHN4XCI7IC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2UgXHUwMTVCY2llXHUwMTdDa2EgamVzdCBwb3ByYXduYVxyXG5pbXBvcnQge1xyXG4gIEV4Y2VsLFxyXG4gIHR5cGUgRXhjZWxOZXN0ZWROLFxyXG4gIHR5cGUgRXhjZWxSZXN1bHRzLFxyXG4gIHR5cGUgRXhjZWxTZXRzR2V0LFxyXG4gIHR5cGUgRXhjZWxTZXRzU2V0LFxyXG4gIGluaXRSYW5nZUZpcnN0U3RlcExhc3QsXHJcbiAgLy9pbml0UmFuZ2VGaXJzdFN0ZXBTaXplLFxyXG59IGZyb20gXCIuL2xvZ2ljL2NhbGN1bGF0ZUV4Y2VsLnRzXCI7XHJcbmltcG9ydCAqIGFzIE1hdGhGIGZyb20gXCIuL2xvZ2ljL21hdGhGdW5jLnRzXCI7XHJcbmltcG9ydCB7IFBsb3RFeGNlbCB9IGZyb20gXCIuL3VpL1Bsb3RFeGNlbC50c3hcIjtcclxuXHJcbi8vY29uc3QgcmVzdWx0TSA9IHNpZ25hbDxFeGNlbFJlc3VsdHM+KG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCkpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcclxuICBjb25zdCBmcm9tID0gdXNlU2lnbmFsKDEpO1xyXG4gIGNvbnN0IHRvID0gdXNlU2lnbmFsKDEwKTtcclxuICBjb25zdCByZXN1bHRNID0gdXNlU2lnbmFsPEV4Y2VsUmVzdWx0cz4obmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTj4oKSk7XHJcblxyXG4gIGNvbnN0IGNhbGN1bGF0ZSA9ICgpID0+IHtcclxuICAgIC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2Ugd2FydG9cdTAxNUJjaSBzXHUwMTA1IGxpY3piYW1pIHByemVkIHBcdTAxMTl0bFx1MDEwNVxyXG4gICAgaWYgKGlzTmFOKE51bWJlcihmcm9tLnZhbHVlKSkgfHwgaXNOYU4oTnVtYmVyKHRvLnZhbHVlKSkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIldhcnRvXHUwMTVCY2kgJ2Zyb20nIGx1YiAndG8nIG5pZSBzXHUwMTA1IGxpY3piYW1pLlwiKTtcclxuICAgICAgcmVzdWx0TS52YWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXRoRW50ZXI6IEV4Y2VsU2V0c1NldFtdID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImlcIixcclxuICAgICAgICB2YWw6IGluaXRSYW5nZUZpcnN0U3RlcExhc3QoTnVtYmVyKGZyb20udmFsdWUpLCAxLCBOdW1iZXIodG8udmFsdWUpKSxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBjb25zdCBtYXRoQ2FsY3M6IEV4Y2VsU2V0c0dldFtdID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImhcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XHJcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcclxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XHJcbiAgICAgICAgICAgIE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwiaEFcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaF9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJoXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhcIixcclxuICAgICAgICAgICAgaF9fQXJyYXksXHJcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cclxuICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSh2YWxfaCBhcyBudW1iZXIsIDEsIDAsIDApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwiaFpcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaF9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJoXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhcIixcclxuICAgICAgICAgICAgaF9fQXJyYXksXHJcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cclxuICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSh2YWxfaCBhcyBudW1iZXIsIDEsIDEsIC0xKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImhBWlwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXHJcbiAgICAgICAgICAgIFwiaFwiLFxyXG4gICAgICAgICAgICBoX19BcnJheSxcclxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcclxuXHJcbiAgICAgICAgICByZXR1cm4gaF9fQXJyYXkubWFwKCh2YWxfaCwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMS41LCAxLCAtMSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJoaVwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcclxuICAgICAgICAgIGNvbnN0IGhBX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhBXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhBXCIsXHJcbiAgICAgICAgICAgIGhBX19BcnJheSxcclxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NcIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIGluZGV4KSA9PlxyXG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAtIGhBX19BcnJheVtpbmRleF1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJoalwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcclxuICAgICAgICAgIGNvbnN0IGhaX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhaXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhaXCIsXHJcbiAgICAgICAgICAgIGhaX19BcnJheSxcclxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NcIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIGluZGV4KSA9PlxyXG4gICAgICAgICAgICBoWl9fQXJyYXlbaW5kZXhdIC0gKHZhbF9pIGFzIG51bWJlcilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJqXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG5cclxuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcclxuXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUoTWF0aEYuZmxvb3JMb2cyKHZhbF9pIGFzIG51bWJlciksIDEuNSwgMSwgLTEpIC1cclxuICAgICAgICAgICAgKHZhbF9pIGFzIG51bWJlcilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJraVwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcclxuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxyXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cclxuICAgICAgICAgICAgTWF0aEYudmFsMkFkaWModmFsX2kgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImtqXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwialwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gal9fQXJyYXkubWFwKCh2YWxfaiwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICBNYXRoRi52YWwyQWRpYyh2YWxfaiBhcyBudW1iZXIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwia2lBXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJrakFcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwialwiLCBqX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XHJcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcclxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2ogYXMgbnVtYmVyLCAxLCAwLCAwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImxpXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAvXHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2kgYXMgbnVtYmVyLCAxLCAwLCAwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImxqXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwialwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gal9fQXJyYXkubWFwKCh2YWxfaiwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICAodmFsX2ogYXMgbnVtYmVyKSAvXHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2ogYXMgbnVtYmVyLCAxLCAwLCAwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcIm1pXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICAoKHZhbF9pIGFzIG51bWJlcikgL1xyXG4gICAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2kgYXMgbnVtYmVyLCAxLCAwLCAwKSkgKyAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwid2pcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwialwiLCBqX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XHJcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcclxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XHJcbiAgICAgICAgICAgICgodmFsX2ogYXMgbnVtYmVyKSAvXHJcbiAgICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZV92YWwyQWRpYyh2YWxfaiBhcyBudW1iZXIsIDEsIDAsIDApKSArIDJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICByZXN1bHRNLnZhbHVlID0gRXhjZWwobWF0aEVudGVyLCBtYXRoQ2FsY3MpO1xyXG4gIH07XHJcblxyXG4gIC8vIEhhbmRsZXIgZGxhIG9uVmFsdWVDaGFuZ2UsIGt0XHUwMEYzcnkgb2R6d2llcmNpZWRsYSB6YWNob3dhbmllIGArKGUuY3VycmVudFRhcmdldC52YWx1ZSlgXHJcbiAgLy8gS2llZHkgaW5wdXQgamVzdCBwdXN0eSwgYGUuY3VycmVudFRhcmdldC52YWx1ZWAgdG8gXCJcIiwgYSBgK1wiXCJgIHRvIDAuXHJcbiAgLy8gTmFzeiBgb25WYWx1ZUNoYW5nZWAgcHJ6ZWthenVqZSBgdW5kZWZpbmVkYCwgZ2R5IGB2YWx1ZUFzTnVtYmVyYCB0byBOYU4gKG5wLiBkbGEgcHVzdGVnbyBpbnB1dHUpLlxyXG4gIGNvbnN0IGhhbmRsZUZyb21DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZnJvbS52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZnJvbS52YWx1ZSA9IDA7IC8vIEx1YiBpbm5hIHdhcnRvXHUwMTVCXHUwMTA3IGRvbXlcdTAxNUJsbmEsIG5wLiAxLCBqZVx1MDE1QmxpIHRvIGJhcmR6aWVqIHNlbnNvd25lXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdG8udmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvLnZhbHVlID0gMDsgLy8gTHViIGlubmEgd2FydG9cdTAxNUJcdTAxMDcgZG9teVx1MDE1QmxuYVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8bWFpbj5cclxuICAgICAgPGgxPk1hdGVtYXR5a2EgdyBnZW5lYWxvZ2lpLjwvaDE+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcclxuICAgICAgICAgIGdhcDogXCI0MHB4XCIsXHJcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBweFwiLFxyXG4gICAgICAgICAgZmxleEZsb3c6IFwicm93IG5vd3JhcFwiLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXtjYWxjdWxhdGV9XHJcbiAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjAuNXJlbSAxcmVtXCIsIGZvbnRTaXplOiBcIjFyZW1cIiB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIFBvbGljelxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxmaWVsZHNldFxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYm9yZGVyOiBcIjNweCBzb2xpZCAjNmM3NTdkXCIsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcclxuICAgICAgICAgICAgcGFkZGluZzogXCIyMHB4XCIsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCIwXCIsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIwXCIsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICAgICAgZ2FwOiBcIjQwcHhcIixcclxuICAgICAgICAgICAgZmxleEZsb3c6IFwicm93IG5vd3JhcFwiLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bGVnZW5kXHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgICAgICAgcGFkZGluZzogXCIzcHggNnB4XCIsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIENob29zZSByYW5nZSBvZiBcdTMwMTBpXHUzMDExXHJcbiAgICAgICAgICA8L2xlZ2VuZD5cclxuXHJcbiAgICAgICAgICA8SW5wdXROdW1iZXJcclxuICAgICAgICAgICAgbmFtZT1cImlucHV0MVwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtmcm9tLnZhbHVlfVxyXG4gICAgICAgICAgICBvblZhbHVlQ2hhbmdlPXtoYW5kbGVGcm9tQ2hhbmdlfVxyXG4gICAgICAgICAgICBkZWY9ezF9XHJcbiAgICAgICAgICAgIG1pbj17MX0gLy8gbG9nMiBqZXN0IHpkZWZpbmlvd2FueSBkbGEgbGljemIgPiAwXHJcbiAgICAgICAgICAgIHN0ZXA9ezF9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT2RcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHByemVkemlhXHUwMTQydVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPElucHV0TnVtYmVyXHJcbiAgICAgICAgICAgIG5hbWU9XCJpbnB1dDJcIlxyXG4gICAgICAgICAgICB2YWx1ZT17dG8udmFsdWV9XHJcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVRvQ2hhbmdlfVxyXG4gICAgICAgICAgICBkZWY9ezd9XHJcbiAgICAgICAgICAgIG1pbj17ZnJvbS52YWx1ZSA+PSAxID8gZnJvbS52YWx1ZSA6IDF9IC8vICd0bycgbmllIHBvd2lubm8gYnlcdTAxMDcgbW5pZWpzemUgbmlcdTAxN0MgJ2Zyb20nXHJcbiAgICAgICAgICAgIHN0ZXA9ezF9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRG9cIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiV2FydG9cdTAxNUJcdTAxMDcga29cdTAxNDRjb3dhIHByemVkemlhXHUwMTQydVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBpXHUzMDExPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMGhcdTMwMTEgPSBmbG9vcihsb2dcdTIwODIoaSkpIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtpXTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVx1MzAxMSA9IDIqKmggfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMGhaXHUzMDExID0gMioqKGgrMSktMSB8fHwgZGxhIHByemVkemlhXHUwMTQydSBbaF08L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwaEFaXHUzMDExID0zKjIqKmgtMSA9IDEuNSoyKiooaCsxKS0xIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtoXTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBoaVx1MzAxMSA9XHUzMDEwaVx1MzAxMSAtXHUzMDEwaEFcdTMwMTE8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwaGpcdTMwMTEgPVx1MzAxMGhaXHUzMDExIC1cdTMwMTBpXHUzMDExPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMGpcdTMwMTEgPVx1MzAxMGhBWlx1MzAxMSAtXHUzMDEwaVx1MzAxMTwvbGk+XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgIFx1MzAxMGtpXHUzMDExID0gd2FsdWFjamEgZHd1LWFkeWN6bmEgbGljemJ5IG5hdHVyYWxuZWogZG9kYXRuaWVqIFtpXVxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgXHUzMDEwa2pcdTMwMTEgPSB3YWx1YWNqYSBkd3UtYWR5Y3puYSBsaWN6YnkgbmF0dXJhbG5laiBkb2RhdG5pZWogW2pdXHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBraUFcdTMwMTEgPSAyKipcdTMwMTBraVx1MzAxMTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBrakFcdTMwMTEgPSAyKipcdTMwMTBralx1MzAxMTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBsaVx1MzAxMSA9XHUzMDEwaVx1MzAxMS9cdTMwMTBraUFcdTMwMTE8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwbGpcdTMwMTEgPVx1MzAxMGpcdTMwMTEvXHUzMDEwa2pBXHUzMDExPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMG1cdTMwMTEgPVx1MzAxMGxpXHUzMDExKzE8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwd1x1MzAxMSA9XHUzMDEwbGpcdTMwMTErMjwvbGk+XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIHtyZXN1bHRNLnZhbHVlLnNpemUgPiAwICYmIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvKjxoMz5UYWJlbGEgc3RhbmRhcmRvd2EgKHR5cGU9XCJjb2xcIik6PC9oMz5cclxuICAgICAgICAgIDxQbG90RXhjZWxcclxuICAgICAgICAgICAgZGF0YT17cmVzdWx0TS52YWx1ZX1cclxuICAgICAgICAgICAgdHlwZT1cImNvbFwiXHJcbiAgICAgICAgICAgIGNhcHRpb249XCJXeW5pa2kgb2JsaWN6ZVx1MDE0NFwiXHJcbiAgICAgICAgICAvPiovXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgIDxoMz5SZXp1bHRhdCBvYmxpY3plXHUwMTQ0OjwvaDM+XHJcbiAgICAgICAgICA8UGxvdEV4Y2VsXHJcbiAgICAgICAgICAgIGRhdGE9e3Jlc3VsdE0udmFsdWV9XHJcbiAgICAgICAgICAgIHR5cGU9XCJyb3dcIlxyXG4gICAgICAgICAgICBjYXB0aW9uPVwiV3luaWtpIG9ibGljemVcdTAxNDQgKHRyYW5zcG9ub3dhbmUpXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICA8L21haW4+XHJcbiAgKTtcclxufVxyXG4iLCAiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xyXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xyXG5cclxuaW1wb3J0IHtcclxuICB1c2VDYWxsYmFjayxcclxuICB1c2VFZmZlY3QsXHJcbiAgdXNlUmVmLFxyXG59IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOC9ob29rc1wiO1xyXG5pbXBvcnQgeyBKU1ggfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcclxuXHJcbi8vIFphd2FydG9cdTAxNUJcdTAxMDcgU1ZHIGRsYSBkb215XHUwMTVCbG55Y2ggaWtvbiArLy0gKGplXHUwMTVCbGkgemRlY3lkdWplc3ogc2lcdTAxMTkgamUgbmFrXHUwMTQyYWRhXHUwMTA3KVxyXG4vLyBOYSByYXppZSBuaWUgc1x1MDEwNSBvbmUgYXV0b21hdHljem5pZSByZW5kZXJvd2FuZSB3IHRlaiB3ZXJzamksXHJcbi8vIHBvbmlld2FcdTAxN0MgemFrXHUwMTQyYWRhbSwgXHUwMTdDZSBUd1x1MDBGM2ogZ1x1MDE0Mlx1MDBGM3dueSBTVkcgZGVmaW5pdWplIHd5Z2xcdTAxMDVkIHByenljaXNrXHUwMEYzdy5cclxuLy8gSmVcdTAxNUJsaSBjaGNlc3ogamUgZG9kYVx1MDEwNywgbXVzaXN6IHByenl3clx1MDBGM2NpXHUwMTA3IGxvZ2lrXHUwMTE5IGljaCByZW5kZXJvd2FuaWEgeiB0cmFuc2Zvcm1hY2phbWkuXHJcbmNvbnN0IERlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudCA9IChcclxuICA8cmVjdCB4PVwiNVwiIHk9XCIxMVwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgLz5cclxuKTtcclxuY29uc3QgRGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50ID0gKFxyXG4gIDw+XHJcbiAgICA8cmVjdCB4PVwiMTFcIiB5PVwiNVwiIHdpZHRoPVwiMlwiIGhlaWdodD1cIjE0XCIgcng9XCIxXCIgLz5cclxuICAgIDxyZWN0IHg9XCI1XCIgeT1cIjExXCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiAvPlxyXG4gIDwvPlxyXG4pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbnB1dE51bWJlclByb3BzIHtcclxuICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBkZWZhdWx0VmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgZGVmPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIG1pbj86IHN0cmluZyB8IG51bWJlcjtcclxuICBtYXg/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgc3RlcD86IHN0cmluZyB8IG51bWJlcjtcclxuICBwbGFjZWhvbGRlcj86IHN0cmluZztcclxuICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgaWQ/OiBzdHJpbmc7XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIG9uQ2hhbmdlPzogKGV2ZW50OiBKU1guVGFyZ2V0ZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBFdmVudD4pID0+IHZvaWQ7XHJcbiAgb25WYWx1ZUNoYW5nZT86IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkLCBuYW1lPzogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHJhdGlvU0laRT86IG51bWJlcjtcclxuICB3cmFwcGVyQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN2Z0NsYXNzTmFtZT86IHN0cmluZztcclxuICBpbnB1dENsYXNzTmFtZT86IHN0cmluZztcclxuICBzdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xyXG4gIHNlbGVjdEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XHJcbiAgaW5jcmVtZW50QnV0dG9uU3R5bGU/OiBKU1guQ1NTUHJvcGVydGllcztcclxuICBkZWNyZW1lbnRCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xyXG4gIGlucHV0QXJlYVN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XHJcbiAgc2VsZWN0QnV0dG9uRmlsbD86IHN0cmluZztcclxuICBpbmNyZW1lbnRCdXR0b25GaWxsPzogc3RyaW5nO1xyXG4gIGRlY3JlbWVudEJ1dHRvbkZpbGw/OiBzdHJpbmc7XHJcbiAgaW5wdXRBcmVhUmVjdEZpbGw/OiBzdHJpbmc7XHJcbiAgaW5wdXRBcmVhQm9yZGVyRmlsbD86IHN0cmluZztcclxuICAvLyBpY29uRmlsbD86IHN0cmluZzsgLy8gSmVcdTAxNUJsaSBiXHUwMTE5ZHppZXN6IHVcdTAxN0N5d2FcdTAxNDIgb3NvYm55Y2ggaWtvbiArLy1cclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbmNvbnN0IHN2Z0xheW91dERhdGEgPSB7XHJcbiAgYmFzZVZpZXdCb3hXaWR0aDogMTc0LFxyXG4gIGJhc2VWaWV3Qm94SGVpZ2h0OiA3MixcclxuICBidXR0b25zOiB7XHJcbiAgICBjaG9vc2U6IHsgLy8gWm1pZW5pb25vIHogJ3NlbGVjZWN0JyBuYSAnY2hvb3NlJyBkbGEgc3BcdTAwRjNqbm9cdTAxNUJjaSB6IFR3b2ltIEhUTUxcclxuICAgICAgbmFtZTogXCJidG4tY2hvb3NlXCIsXHJcbiAgICAgIHBhdGhzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcclxuICAgICAgICAgIGQ6IFwiTTExNS43NSw3MS42MmMtMTAuMDMsMC0xOS45My0xLjYyLTI4LjYzLTQuNjdsLS4xMi0uMDQtLjEyLjA0Yy04LjcsMy4wNi0xOC41OSw0LjY3LTI4LjYzLDQuNjctMTMuMDYsMC0yNS44MS0yLjc1LTM2LjAyLTcuNzVsMjYuOTYtMTUuMjFoNzUuNjFsMjYuOTYsMTUuMjFjLTEwLjIsNS0yMi45Niw3Ljc1LTM2LjAyLDcuNzVaXCIsXHJcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjOTE5MTkxXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tYm9yZGVyLWZpbGxcIixcclxuICAgICAgICAgIGQ6IFwiTTEyNC43MSw0OS4wNGwyNi4yNSwxNC44MWMtMTAuMDQsNC43OC0yMi40OCw3LjQtMzUuMjEsNy40LTkuOTksMC0xOS44NC0xLjYxLTI4LjUtNC42NWwtLjI1LS4wOS0uMjUuMDljLTguNjYsMy4wNC0xOC41MSw0LjY1LTI4LjUsNC42NS0xMi43MywwLTI1LjE2LTIuNjItMzUuMjEtNy40bDI2LjI1LTE0LjgxaDc1LjQxTTEyNC45LDQ4LjI5SDQ5LjFsLTI3LjY2LDE1LjZjMTAuMDMsNS4wNiwyMi44NSw4LjExLDM2LjgyLDguMTEsMTAuNDYsMCwyMC4yNy0xLjcxLDI4Ljc1LTQuNjksOC40OCwyLjk4LDE4LjI5LDQuNjksMjguNzUsNC42OSwxMy45NywwLDI2Ljc4LTMuMDQsMzYuODItOC4xMWwtMjcuNjYtMTUuNmgwWlwiLFxyXG4gICAgICAgICAgZGVmYXVsdEZpbGw6XHJcbiAgICAgICAgICAgIFwiIzUwNTA1MFwiLCAvKiBLb2xvciBkbGEgb2JyeXN1L2RydWdpZWogd2Fyc3R3eSwgZG9zdG9zdWogKi9cclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICAgIGluY3JlbWVudDoge1xyXG4gICAgICBuYW1lOiBcImJ0bi1pbmNyZW1lbnRcIixcclxuICAgICAgcGF0aHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tZmlsbFwiLFxyXG4gICAgICAgICAgZDogXCJNMTI3LjM4LDQzLjUxVjEuMWMyNi44MywzLjM3LDQ2LjI1LDE4LjAxLDQ2LjI1LDM0LjksMCw5LjE5LTUuNjgsMTcuOTEtMTYuMDEsMjQuNTdsLTMwLjI0LTE3LjA2WlwiLFxyXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzIxNTk3ZlwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWJvcmRlci1maWxsXCIsXHJcbiAgICAgICAgICBkOiBcIk0xMjcuNzUsMS41M2MyNi40MiwzLjQ1LDQ1LjUsMTcuODYsNDUuNSwzNC40NywwLDktNS41NSwxNy41Ni0xNS42NSwyNC4xM2wtMjkuODUtMTYuODRWMS41M00xMjcsLjY4djQzLjA1bDMwLjYzLDE3LjI4YzEwLjEzLTYuNDgsMTYuMzctMTUuMjksMTYuMzctMjUuMDEsMC0xNy41LTIwLjIxLTMyLjA4LTQ3LTM1LjMyaDBaXCIsXHJcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjMTA0MDYwXCIsIC8qIENpZW1uaWVqc3p5IGRsYSBvYnJ5c3U/IERvc3Rvc3VqICovXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgaWNvbkFuY2hvclg6IDE1MCwgLy8gMTUwcHggdyBwcmF3byAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcclxuICAgICAgaWNvbkFuY2hvclk6IDMwLCAvLyAzMHB4IHcgZFx1MDBGM1x1MDE0MiAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcclxuICAgIH0sXHJcbiAgICBkZWNyZW1lbnQ6IHtcclxuICAgICAgbmFtZTogXCJidG4tZGVjcmVtZW50XCIsXHJcbiAgICAgIHBhdGhzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcclxuICAgICAgICAgIGQ6IFwiTTE2LjM4LDYwLjU3QzYuMDYsNTMuOTEuMzgsNDUuMTkuMzgsMzYsLjM4LDE5LjExLDE5LjgsNC40Nyw0Ni42MiwxLjF2NDIuNDFsLTMwLjI0LDE3LjA2WlwiLFxyXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiI2IyMTAxMFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWJvcmRlci1maWxsXCIsXHJcbiAgICAgICAgICBkOiBcIk00Ni4yNSwxLjUzdjQxLjc2aDBzLTI5Ljg1LDE2Ljg0LTI5Ljg1LDE2Ljg0QzYuMyw1My41Ni43NSw0NSwuNzUsMzYsLjc1LDE5LjM5LDE5LjgzLDQuOTcsNDYuMjUsMS41M000NywuNjhDMjAuMjEsMy45MiwwLDE4LjUsMCwzNmMwLDkuNzIsNi4yNCwxOC41MywxNi4zNywyNS4wMWwzMC42My0xNy4yOFYuNjhoMFpcIixcclxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiM4MDAwMDBcIiwgLyogQ2llbW5pZWpzenkgZGxhIG9icnlzdT8gRG9zdG9zdWogKi9cclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBpY29uQW5jaG9yWDogMjUsIC8vIDIwcHggdyBwcmF3byAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcclxuICAgICAgaWNvbkFuY2hvclk6IDMwLCAvLyAzMHB4IHcgZFx1MDBGM1x1MDE0MiAodyBzeXN0ZW1pZSB2aWV3Qm94IDE3NHg3MilcclxuICAgIH0sXHJcbiAgfSxcclxuICBpbnB1dEFyZWE6IHtcclxuICAgIG5hbWU6IFwiaW5wdXRcIixcclxuICAgIHJlY3Q6IHtcclxuICAgICAgeDogNTIuMzgsXHJcbiAgICAgIHk6IDAuMzgsXHJcbiAgICAgIHdpZHRoOiA2OS4yNSxcclxuICAgICAgaGVpZ2h0OiA0Mi41NCxcclxuICAgICAgZGVmYXVsdEZpbGw6IFwiI2ZmZlwiLFxyXG4gICAgfSxcclxuICAgIGJvcmRlclBhdGg6IHtcclxuICAgICAgZDogXCJNMTIxLjI1Ljc1djQxLjc5SDUyLjc1Vi43NWg2OC41TTEyMiwwSDUydjQzLjI5aDcwVjBoMFpcIixcclxuICAgICAgZGVmYXVsdEZpbGw6IFwiIzMzM1wiLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuY29uc3QgQ09OVEFJTkVSX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLWNvbnRhaW5lclwiO1xyXG5jb25zdCBTVkdfQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItc3ZnXCI7XHJcbmNvbnN0IFNWR19CVVRUT05fQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItc3ZnLWJ1dHRvblwiOyAvLyBVXHUwMTdDeXdhbmUgdyBUd29pbSBIVE1MXHJcbmNvbnN0IEhUTUxfSU5QVVRfQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItaHRtbC1pbnB1dFwiOyAvLyBVXHUwMTdDeXdhbmUgdyBUd29pbSBIVE1MXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSW5wdXROdW1iZXIocHJvcHM6IElucHV0TnVtYmVyUHJvcHMpOiBKU1guRWxlbWVudCB7XHJcbiAgY29uc3Qge1xyXG4gICAgdmFsdWUsXHJcbiAgICBkZWZhdWx0VmFsdWUsXHJcbiAgICBkZWYgPSAxLFxyXG4gICAgbWluLFxyXG4gICAgbWF4LFxyXG4gICAgc3RlcCA9IDEsXHJcbiAgICBwbGFjZWhvbGRlcixcclxuICAgIHJlcXVpcmVkLFxyXG4gICAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICAgIG5hbWUsXHJcbiAgICBpZCxcclxuICAgIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgICBvbkNoYW5nZSxcclxuICAgIG9uVmFsdWVDaGFuZ2UsXHJcbiAgICByYXRpb1NJWkUgPSAxLFxyXG4gICAgd3JhcHBlckNsYXNzTmFtZSxcclxuICAgIHN2Z0NsYXNzTmFtZSxcclxuICAgIGlucHV0Q2xhc3NOYW1lLFxyXG4gICAgc3R5bGUsXHJcbiAgICBzZWxlY3RCdXR0b25TdHlsZSxcclxuICAgIGluY3JlbWVudEJ1dHRvblN0eWxlLFxyXG4gICAgZGVjcmVtZW50QnV0dG9uU3R5bGUsXHJcbiAgICBpbnB1dEFyZWFTdHlsZSxcclxuICAgIHNlbGVjdEJ1dHRvbkZpbGwsXHJcbiAgICBpbmNyZW1lbnRCdXR0b25GaWxsLFxyXG4gICAgZGVjcmVtZW50QnV0dG9uRmlsbCxcclxuICAgIGlucHV0QXJlYVJlY3RGaWxsLFxyXG4gICAgaW5wdXRBcmVhQm9yZGVyRmlsbCxcclxuICAgIC8vIGljb25GaWxsID0gXCJ3aGl0ZVwiLCAvLyBKZVx1MDE1QmxpIGJcdTAxMTlkemllc3ogcmVuZGVyb3dhXHUwMTA3IG9zb2JuZSBpa29ueSArLy1cclxuICAgIC4uLnJlc3REaXZQcm9wc1xyXG4gIH0gPSBwcm9wcztcclxuXHJcbiAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbCk7XHJcblxyXG4gIC8vIEluaWNqYWxpemFjamEgd2FydG9cdTAxNUJjaSBpbnB1dGEgcHJ6eSBtb250b3dhbml1IGx1YiB6bWlhbmllIGRlZmF1bHRWYWx1ZS92YWx1ZVxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoaW5wdXRSZWYuY3VycmVudCkge1xyXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlucHV0UmVmLmN1cnJlbnQudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFN0cmluZyhkZWZhdWx0VmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0UmVmLmN1cnJlbnQudmFsdWUgPSBcIlwiOyAvLyBKYXduZSB1c3Rhd2llbmllIG5hIHB1c3R5IHN0cmluZywgamVcdTAxNUJsaSBicmFrIHdhcnRvXHUwMTVCY2lcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sIFt2YWx1ZSwgZGVmYXVsdFZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN0ZXAgPSB1c2VDYWxsYmFjaygoZGlyZWN0aW9uOiBcInVwXCIgfCBcImRvd25cIikgPT4ge1xyXG4gICAgaWYgKGlucHV0UmVmLmN1cnJlbnQgJiYgIWRpc2FibGVkICYmICFyZWFkT25seSkge1xyXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInVwXCIpIGlucHV0UmVmLmN1cnJlbnQuc3RlcFVwKCk7XHJcbiAgICAgIGVsc2UgaW5wdXRSZWYuY3VycmVudC5zdGVwRG93bigpO1xyXG5cclxuICAgICAgLy8gU3ltdWxhY2phIHpkYXJ6ZW5pYSBpbnB1dCwgYWJ5IHd5d29cdTAxNDJhXHUwMTA3IGhhbmRsZUlucHV0Q2hhbmdlXHJcbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KFwiaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlIH0pO1xyXG4gICAgICBpbnB1dFJlZi5jdXJyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH0sIFtkaXNhYmxlZCwgcmVhZE9ubHldKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVjcmVtZW50ID0gdXNlQ2FsbGJhY2soKCkgPT4gaGFuZGxlU3RlcChcImRvd25cIiksIFtoYW5kbGVTdGVwXSk7XHJcbiAgY29uc3QgaGFuZGxlSW5jcmVtZW50ID0gdXNlQ2FsbGJhY2soKCkgPT4gaGFuZGxlU3RlcChcInVwXCIpLCBbaGFuZGxlU3RlcF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaG9vc2VDbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50ICYmICFkaXNhYmxlZCAmJiAhcmVhZE9ubHkpIHtcclxuICAgICAgY29uc3QgbmV3VmFsdWUgPSBkZWYgPz8gMTsgLy8gSmFrIHcgVHdvaW0gSlNcclxuICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFN0cmluZyhuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAvLyBSXHUwMTE5Y3puZSB3eXdvXHUwMTQyYW5pZSBsb2dpa2kgem1pYW55IHdhcnRvXHUwMTVCY2lcclxuICAgICAgaWYgKG9uVmFsdWVDaGFuZ2UpIG9uVmFsdWVDaGFuZ2UobmV3VmFsdWUsIG5hbWUpO1xyXG4gICAgICBpZiAob25DaGFuZ2UpIHtcclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudChcImNoYW5nZVwiLCB7XHJcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxyXG4gICAgICAgIH0pIGFzIHVua25vd24gYXMgSlNYLlRhcmdldGVkRXZlbnQ8SFRNTElucHV0RWxlbWVudCwgRXZlbnQ+O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgXCJ0YXJnZXRcIiwge1xyXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgdmFsdWU6IGlucHV0UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcImN1cnJlbnRUYXJnZXRcIiwge1xyXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgdmFsdWU6IGlucHV0UmVmLmN1cnJlbnQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb25DaGFuZ2UoZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQ2hvb3NlIGJ1dHRvbiBjbGlja2VkLCB2YWx1ZSBzZXQgdG8gMVwiKTtcclxuICAgIH1cclxuICB9LCBbZGlzYWJsZWQsIHJlYWRPbmx5LCBuYW1lLCBvblZhbHVlQ2hhbmdlLCBvbkNoYW5nZV0pO1xyXG5cclxuICAvLyA9PT0gUE9DWlx1MDEwNFRFSyBERUZJTklDSkkgaGFuZGxlSW5wdXRDaGFuZ2UgPT09XHJcbiAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoZTogSlNYLlRhcmdldGVkRXZlbnQ8SFRNTElucHV0RWxlbWVudCwgRXZlbnQ+KSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGNvbnN0IHJhd1ZhbHVlID0gdGFyZ2V0LnZhbHVlO1xyXG4gICAgbGV0IG51bWVyaWNWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIGlmIChyYXdWYWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICBudW1lcmljVmFsdWUgPSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTcHJcdTAwRjNidWogc3BhcnNvd2FcdTAxMDcgamFrbyBsaWN6Ylx1MDExOTsgcGFyc2VGbG9hdCBqZXN0IGJhcmR6aWVqIGVsYXN0eWN6bnlcclxuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VGbG9hdChyYXdWYWx1ZSk7XHJcbiAgICAgIG51bWVyaWNWYWx1ZSA9IGlzTmFOKHBhcnNlZCkgPyB1bmRlZmluZWQgOiBwYXJzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9uVmFsdWVDaGFuZ2UpIHtcclxuICAgICAgb25WYWx1ZUNoYW5nZShudW1lcmljVmFsdWUsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgLy8gSmVcdTAxNUJsaSB1XHUwMTdDeXRrb3duaWsgcHJ6ZWthemFcdTAxNDIgd1x1MDE0MmFzbnkgb25DaGFuZ2UsIHRlXHUwMTdDIGdvIHd5d29cdTAxNDJhalxyXG4gICAgLy8gVG8gemRhcnplbmllIFwiaW5wdXRcIiB6IGVsZW1lbnR1IEhUTUxcclxuICAgIGlmIChvbkNoYW5nZSkge1xyXG4gICAgICBvbkNoYW5nZShlKTtcclxuICAgIH1cclxuICB9O1xyXG4gIC8vID09PSBLT05JRUMgREVGSU5JQ0pJIGhhbmRsZUlucHV0Q2hhbmdlID09PVxyXG5cclxuICBjb25zdCBjb250YWluZXJXaWR0aCA9IHN2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hXaWR0aCAqIHJhdGlvU0laRTtcclxuICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94SGVpZ2h0ICogcmF0aW9TSVpFO1xyXG5cclxuICAvLyBTdHlsZSBkbGEgbmFcdTAxNDJvXHUwMTdDb25lZ28gaW5wdXR1IEhUTUwsIHNrYWxvd2FuZSBwcnpleiByYXRpb1NJWkVcclxuICBjb25zdCBodG1sSW5wdXRTdHlsZTogSlNYLkNTU1Byb3BlcnRpZXMgPSB7XHJcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgbGVmdDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC54ICogcmF0aW9TSVpFfXB4YCxcclxuICAgIHRvcDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC55ICogcmF0aW9TSVpFfXB4YCxcclxuICAgIHdpZHRoOiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LndpZHRoICogcmF0aW9TSVpFfXB4YCxcclxuICAgIGhlaWdodDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC5oZWlnaHQgKiByYXRpb1NJWkV9cHhgLFxyXG4gICAgYm9yZGVyOiBcIm5vbmVcIixcclxuICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgY29sb3I6IFwiIzMzM1wiLFxyXG4gICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgZm9udFNpemU6IGAke01hdGgubWF4KDgsIDE4ICogcmF0aW9TSVpFKX1weGAsIC8vIERvc3Rvc3VqIGN6Y2lvbmtcdTAxMTlcclxuICAgIG91dGxpbmU6IFwibm9uZVwiLFxyXG4gICAgcGFkZGluZzogYDAgJHtNYXRoLm1heCgxLCAyICogcmF0aW9TSVpFKX1weGAsXHJcbiAgICBtYXJnaW46IDAsXHJcbiAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxyXG4gICAgTW96QXBwZWFyYW5jZTogXCJ0ZXh0ZmllbGRcIixcclxuICAgIFdlYmtpdEFwcGVhcmFuY2U6IFwibm9uZVwiLFxyXG4gICAgYXBwZWFyYW5jZTogXCJub25lXCIsXHJcbiAgICB6SW5kZXg6IDIsXHJcbiAgfTtcclxuXHJcbiAgLy8gUm96bWlhciBpa29uICsvLS4gWmFcdTAxNDJcdTAwRjNcdTAxN0NteSwgXHUwMTdDZSBvcnlnaW5hbG5lIGlrb255IHNcdTAxMDUgMjR4MjQuXHJcbiAgLy8gQ2hjZW15IGplIHByemVza2Fsb3dhXHUwMTA3LCBhYnkgcGFzb3dhXHUwMTQyeSBkbyBwcnp5Y2lza1x1MDBGM3cuXHJcbiAgLy8gUHJ6eWtcdTAxNDJhZG93bywgbmllY2ggemFqbXVqXHUwMTA1IG9rb1x1MDE0Mm8gNTAlIHd5c29rb1x1MDE1QmNpIHByenljaXNrdSAodyBqZWRub3N0a2FjaCB2aWV3Qm94KVxyXG4gIGNvbnN0IGljb25WaWV3Qm94U2l6ZSA9IDI0OyAvLyBPcnlnaW5hbG55IHJvem1pYXIgdmlld0JveCBpa29uICsvLVxyXG4gIGNvbnN0IHRhcmdldEljb25IZWlnaHRJblN2Z1VuaXRzID0gc3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveEhlaWdodCAqIDAuMjUgKlxyXG4gICAgKHJhdGlvU0laRSA+IDAuNSA/IDEgOiByYXRpb1NJWkUgKiAyKTsgLy8gbnAuIDI1JSB3eXNva29cdTAxNUJjaSBjYVx1MDE0MmVnbyBrb21wb25lbnR1XHJcbiAgY29uc3QgaWNvbkFjdHVhbFNjYWxlID0gMS41ICogKHRhcmdldEljb25IZWlnaHRJblN2Z1VuaXRzIC8gaWNvblZpZXdCb3hTaXplKTtcclxuXHJcbiAgbGV0IGRpc3BsYXlWYWx1ZTogc3RyaW5nID0gXCJcIjsgLy8gSW5wdXQgdmFsdWUgemF3c3plIGpha28gc3RyaW5nXHJcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGRpc3BsYXlWYWx1ZSA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgfSBlbHNlIGlmIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgZGlzcGxheVZhbHVlID0gU3RyaW5nKGRlZmF1bHRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb21tb25TdmdCdXR0b25TdHlsZTogSlNYLkNTU1Byb3BlcnRpZXMgPSB7XHJcbiAgICBjdXJzb3I6IGRpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJkZWZhdWx0XCIgOiBcInBvaW50ZXJcIixcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzc05hbWU9e2Ake0NPTlRBSU5FUl9DTEFTU19OQU1FfSAke3dyYXBwZXJDbGFzc05hbWUgfHwgXCJcIn1gfVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHdpZHRoOiBgJHtjb250YWluZXJXaWR0aH1weGAsXHJcbiAgICAgICAgaGVpZ2h0OiBgJHtjb250YWluZXJIZWlnaHR9cHhgLFxyXG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXHJcbiAgICAgICAgb3ZlcmZsb3c6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgLi4uc3R5bGUsXHJcbiAgICAgIH19XHJcbiAgICAgIHsuLi5yZXN0RGl2UHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIDxzdmdcclxuICAgICAgICBjbGFzc05hbWU9e2Ake1NWR19DTEFTU19OQU1FfSAke3N2Z0NsYXNzTmFtZSB8fCBcIlwifWB9XHJcbiAgICAgICAgZGF0YS1uYW1lPVwiaW5wdXQtbnVtYmVyXCIgLy8gWiBUd29qZWdvIEhUTUxcclxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICB2aWV3Qm94PXtgMCAwICR7c3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveFdpZHRofSAke3N2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hIZWlnaHR9YH1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxyXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcclxuICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIH19XHJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgPlxyXG4gICAgICAgIHsvKiBHcnVwYSBcIkNob29zZS9TZWxlY3RcIiAqL31cclxuICAgICAgICA8Z1xyXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9IC8vIEtsYXNhIHogVHdvamVnbyBIVE1MXHJcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuYnV0dG9ucy5jaG9vc2UubmFtZX0gLy8gZGF0YS1uYW1lIHogVHdvamVnbyBIVE1MXHJcbiAgICAgICAgICBvbkNsaWNrPXshZGlzYWJsZWQgPyBoYW5kbGVDaG9vc2VDbGljayA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN2Z0J1dHRvblN0eWxlLCAuLi4oc2VsZWN0QnV0dG9uU3R5bGUgfHwge30pIH19XHJcbiAgICAgICAgICBwb2ludGVyRXZlbnRzPXtkaXNhYmxlZCA/IFwibm9uZVwiIDogXCJhdXRvXCJ9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3N2Z0xheW91dERhdGEuYnV0dG9ucy5jaG9vc2UucGF0aHMubWFwKChwLCBpKSA9PiAoXHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAga2V5PXtgY2hvb3NlLXBhdGgtJHtpfWB9XHJcbiAgICAgICAgICAgICAgZGF0YS1uYW1lPXtwLmRhdGFOYW1lfVxyXG4gICAgICAgICAgICAgIGQ9e3AuZH1cclxuICAgICAgICAgICAgICBmaWxsPXtzZWxlY3RCdXR0b25GaWxsIHx8IHAuZGVmYXVsdEZpbGx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L2c+XHJcblxyXG4gICAgICAgIHsvKiBHcnVwYSBcIklucHV0IEFyZWFcIiAqL31cclxuICAgICAgICA8Z1xyXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5uYW1lfVxyXG4gICAgICAgICAgc3R5bGU9e2lucHV0QXJlYVN0eWxlIHx8IHt9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxyZWN0XHJcbiAgICAgICAgICAgIHg9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueH1cclxuICAgICAgICAgICAgeT17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC55fVxyXG4gICAgICAgICAgICB3aWR0aD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC53aWR0aH1cclxuICAgICAgICAgICAgaGVpZ2h0PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmhlaWdodH1cclxuICAgICAgICAgICAgZmlsbD17aW5wdXRBcmVhUmVjdEZpbGwgfHwgc3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC5kZWZhdWx0RmlsbH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICBkPXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5ib3JkZXJQYXRoLmR9XHJcbiAgICAgICAgICAgIGZpbGw9e2lucHV0QXJlYUJvcmRlckZpbGwgfHxcclxuICAgICAgICAgICAgICBzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5ib3JkZXJQYXRoLmRlZmF1bHRGaWxsfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2c+XHJcblxyXG4gICAgICAgIHsvKiBHcnVwYSBcIkRlY3JlbWVudFwiICovfVxyXG4gICAgICAgIDxnXHJcbiAgICAgICAgICBjbGFzc05hbWU9e1NWR19CVVRUT05fQ0xBU1NfTkFNRX1cclxuICAgICAgICAgIGRhdGEtbmFtZT17c3ZnTGF5b3V0RGF0YS5idXR0b25zLmRlY3JlbWVudC5uYW1lfVxyXG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkICYmICFyZWFkT25seSA/IGhhbmRsZURlY3JlbWVudCA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN2Z0J1dHRvblN0eWxlLCAuLi4oZGVjcmVtZW50QnV0dG9uU3R5bGUgfHwge30pIH19XHJcbiAgICAgICAgICBwb2ludGVyRXZlbnRzPXtkaXNhYmxlZCB8fCByZWFkT25seSA/IFwibm9uZVwiIDogXCJhdXRvXCJ9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQucGF0aHMubWFwKChwLCBpKSA9PiAoXHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAga2V5PXtgZGVjLXBhdGgtJHtpfWB9XHJcbiAgICAgICAgICAgICAgZGF0YS1uYW1lPXtwLmRhdGFOYW1lfVxyXG4gICAgICAgICAgICAgIGQ9e3AuZH1cclxuICAgICAgICAgICAgICBmaWxsPXtkZWNyZW1lbnRCdXR0b25GaWxsIHx8IHAuZGVmYXVsdEZpbGx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICAgIHsvKiBKZVx1MDE1QmxpIGNoY2VzeiBkb2RhXHUwMTA3IGlrb25cdTAxMTkgU1ZHIFwiLVwiIG5hIHR5bSBrc3p0YVx1MDE0MmNpZSwgenJcdTAwRjNiIHRvIHR1dGFqLCBucC46ICovfVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvKjxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZShYIFkpIHNjYWxlKFMpXCI+XHJcbiAgICAgICAgICAgIHtEZWZhdWx0RGVjcmVtZW50SWNvblN2Z0NvbnRlbnR9XHJcbiAgICAgICAgICA8L2c+Ki9cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHsvKiBJa29uYSBEZWNyZW1lbnQgKC0pICovfVxyXG4gICAgICAgICAgPGdcclxuICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmRlY3JlbWVudC5pY29uQW5jaG9yWH0sICR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmRlY3JlbWVudC5pY29uQW5jaG9yWX0pIHNjYWxlKCR7aWNvbkFjdHVhbFNjYWxlfSkgdHJhbnNsYXRlKC0ke1xyXG4gICAgICAgICAgICAgIGljb25WaWV3Qm94U2l6ZSAvIDJcclxuICAgICAgICAgICAgfSwgLSR7aWNvblZpZXdCb3hTaXplIC8gMn0pYH1cclxuICAgICAgICAgICAgc3R5bGU9e3sgcG9pbnRlckV2ZW50czogXCJub25lXCIgfX0gLy8gSWtvbnkgbmllIHBvd2lubnkgcHJ6ZWNod3l0eXdhXHUwMTA3IGtsaWtuaVx1MDExOVx1MDEwN1xyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3ZnXHJcbiAgICAgICAgICAgICAgdmlld0JveD17YDAgMCAke2ljb25WaWV3Qm94U2l6ZX0gJHtpY29uVmlld0JveFNpemV9YH1cclxuICAgICAgICAgICAgICB3aWR0aD17aWNvblZpZXdCb3hTaXplfVxyXG4gICAgICAgICAgICAgIGhlaWdodD17aWNvblZpZXdCb3hTaXplfVxyXG4gICAgICAgICAgICAgIGZpbGw9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgICAgb3ZlcmZsb3c9XCJ2aXNpYmxlXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtEZWZhdWx0RGVjcmVtZW50SWNvblN2Z0NvbnRlbnR9XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9nPlxyXG4gICAgICAgIDwvZz5cclxuXHJcbiAgICAgICAgey8qIEdydXBhIFwiSW5jcmVtZW50XCIgKi99XHJcbiAgICAgICAgPGdcclxuICAgICAgICAgIGNsYXNzTmFtZT17U1ZHX0JVVFRPTl9DTEFTU19OQU1FfVxyXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lm5hbWV9XHJcbiAgICAgICAgICBvbkNsaWNrPXshZGlzYWJsZWQgJiYgIXJlYWRPbmx5ID8gaGFuZGxlSW5jcmVtZW50IDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3ZnQnV0dG9uU3R5bGUsIC4uLihpbmNyZW1lbnRCdXR0b25TdHlsZSB8fCB7fSkgfX1cclxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9e2Rpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcImF1dG9cIn1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5wYXRocy5tYXAoKHAsIGkpID0+IChcclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBrZXk9e2BpbmMtcGF0aC0ke2l9YH1cclxuICAgICAgICAgICAgICBkYXRhLW5hbWU9e3AuZGF0YU5hbWV9XHJcbiAgICAgICAgICAgICAgZD17cC5kfVxyXG4gICAgICAgICAgICAgIGZpbGw9e2luY3JlbWVudEJ1dHRvbkZpbGwgfHwgcC5kZWZhdWx0RmlsbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgICAgey8qIEplXHUwMTVCbGkgY2hjZXN6IGRvZGFcdTAxMDcgaWtvblx1MDExOSBTVkcgXCIrXCIgbmEgdHltIGtzenRhXHUwMTQyY2llLCB6clx1MDBGM2IgdG8gdHV0YWosIG5wLjogKi99XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKFggWSkgc2NhbGUoUylcIj5cclxuICAgICAgICAgICAge0RlZmF1bHRJbmNyZW1lbnRJY29uU3ZnQ29udGVudH1cclxuICAgICAgICAgIDwvZz4qL1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgey8qIElrb25hIEluY3JlbWVudCAoKykgKi99XHJcbiAgICAgICAgICA8Z1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lmljb25BbmNob3JYfSwgJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50Lmljb25BbmNob3JZfSkgc2NhbGUoJHtpY29uQWN0dWFsU2NhbGV9KSB0cmFuc2xhdGUoLSR7XHJcbiAgICAgICAgICAgICAgaWNvblZpZXdCb3hTaXplIC8gMlxyXG4gICAgICAgICAgICB9LCAtJHtpY29uVmlld0JveFNpemUgLyAyfSlgfVxyXG4gICAgICAgICAgICBzdHlsZT17eyBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3ZnXHJcbiAgICAgICAgICAgICAgdmlld0JveD17YDAgMCAke2ljb25WaWV3Qm94U2l6ZX0gJHtpY29uVmlld0JveFNpemV9YH1cclxuICAgICAgICAgICAgICB3aWR0aD17aWNvblZpZXdCb3hTaXplfVxyXG4gICAgICAgICAgICAgIGhlaWdodD17aWNvblZpZXdCb3hTaXplfVxyXG4gICAgICAgICAgICAgIGZpbGw9XCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgICAgb3ZlcmZsb3c9XCJ2aXNpYmxlXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtEZWZhdWx0SW5jcmVtZW50SWNvblN2Z0NvbnRlbnR9XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgPC9nPlxyXG4gICAgICAgIDwvZz5cclxuICAgICAgPC9zdmc+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2lucHV0UmVmfVxyXG4gICAgICAgIGNsYXNzTmFtZT17YCR7SFRNTF9JTlBVVF9DTEFTU19OQU1FfSAke2lucHV0Q2xhc3NOYW1lIHx8IFwiXCJ9YH0gLy8gS2xhc2EgeiBUd29qZWdvIEhUTUxcclxuICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICBuYW1lPXtuYW1lfVxyXG4gICAgICAgIGlkPXtpZH1cclxuICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfSAvLyBkaXNwbGF5VmFsdWUgamVzdCBqdVx1MDE3QyBzdHJpbmdpZW0gbHViIHB1c3R5bSBzdHJpbmdpZW1cclxuICAgICAgICBtaW49e21pbn1cclxuICAgICAgICBtYXg9e21heH1cclxuICAgICAgICBzdGVwPXtzdGVwfVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICByZXF1aXJlZD17cmVxdWlyZWR9XHJcbiAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgICBvbklucHV0PXtoYW5kbGVJbnB1dENoYW5nZX0gLy8gUG9kXHUwMTQyXHUwMTA1Y3pvbnkgcG9wcmF3bnkgaGFuZGxlclxyXG4gICAgICAgIHN0eWxlPXtodG1sSW5wdXRTdHlsZX1cclxuICAgICAgICBhcmlhLWxhYmVsPXtwcm9wc1tcImFyaWEtbGFiZWxcIl0gfHwgXCJXYXJ0b1x1MDE1Qlx1MDEwNyBsaWN6Ym93YVwifVxyXG4gICAgICAgIHsuLi5yZXN0RGl2UHJvcHN9XHJcbiAgICAgIC8+XHJcbiAgICAgIHtcclxuICAgICAgICAvLyBabWllbmlvbmUgeiByZXN0SW5wdXRQcm9wcywgYm8gdGUgc1x1MDEwNSBkbGEgZ1x1MDE0Mlx1MDBGM3duZWdvIGRpdmFcclxuICAgICAgICAvLyBKZVx1MDE1QmxpIGNoY2VzeiBwcnpla2F6eXdhXHUwMTA3IGRvZGF0a293ZSBhdHJ5YnV0eSBkbyBpbnB1dGEsXHJcbiAgICAgICAgLy8gbXVzaXN6IGplIG9zb2JubyBvYnNcdTAxNDJ1XHUwMTdDeVx1MDEwNyBsdWIgbmF6d2FcdTAxMDcgbnAuIGh0bWxJbnB1dFByb3BzXHJcbiAgICAgIH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIiwgIi8vIERlZmluaWNqZSB0eXBcdTAwRjN3XHJcbnR5cGUgRXhjZWxOZXN0ZWROdW1iZXJBcnJheSA9IG51bWJlciB8IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXlbXTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4Y2VsTmVzdGVkTiA9IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7XHJcbmV4cG9ydCB0eXBlIEV4Y2VsUmVzdWx0cyA9IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk+O1xyXG5leHBvcnQgdHlwZSBFeGNlbFNldHNTZXQgPSB7XHJcbiAgdmFyOiBzdHJpbmc7IC8vIE5hendhIHptaWVubmVqIHdlalx1MDE1QmNpb3dlalxyXG4gIHZhbDogRXhjZWxOZXN0ZWROdW1iZXJBcnJheTsgLy8gV2FydG9cdTAxNUJcdTAxMDcgem1pZW5uZWogKGxpY3piYSBsdWIgemFnbmllXHUwMTdDZFx1MDE3Q29uYSB0YWJsaWNhIGxpY3piKVxyXG59O1xyXG5cclxuLy8gVHlwIGRsYSBmdW5rY2ppIG9ibGljemVuaW93ZWo6IHByenlqbXVqZSBtYXBcdTAxMTksIHp3cmFjYSBvYmxpY3pvblx1MDEwNSB3YXJ0b1x1MDE1Qlx1MDEwN1xyXG50eXBlIENhbGN1bGF0aW9uRnVuY3Rpb24gPSAoY3VycmVudE1hcDogRXhjZWxSZXN1bHRzKSA9PiBFeGNlbE5lc3RlZE51bWJlckFycmF5O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhjZWxTZXRzR2V0ID0ge1xyXG4gIHZhcjogc3RyaW5nOyAvLyBOYXp3YSBub3dlaiwgb2JsaWN6b25laiB6bWllbm5lalxyXG4gIHZhbDogQ2FsY3VsYXRpb25GdW5jdGlvbjsgLy8gRnVua2NqYSBvYmxpY3phalx1MDEwNWNhIHdhcnRvXHUwMTVCXHUwMTA3IHRlaiB6bWllbm5lalxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBabWllbmlvbm8geiBgZnVuYCBuYSBgdmFsYCB6Z29kbmllIHogVHdvaW0gcHJ6eWtcdTAxNDJhZGVtIHVcdTAxN0N5Y2lhXHJcbn07XHJcblxyXG4vKipcclxuICogRnVua2NqYSBFeGNlbCBwcnpldHdhcnphIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd2UgaSB3eWtvbnVqZSB6ZGVmaW5pb3dhbmUgb2JsaWN6ZW5pYS5cclxuICogQHBhcmFtIGlucHV0VmFsdWVzIFdhcnRvXHUwMTVCY2kgcG9jelx1MDEwNXRrb3dlIGRvIHVtaWVzemN6ZW5pYSB3IG1hcGllLlxyXG4gKiBAcGFyYW0gY2FsY3NWYWx1ZXMgRGVmaW5pY2plIG9ibGljemVcdTAxNDQgZG8gd3lrb25hbmlhLlxyXG4gKiBAcmV0dXJucyBNYXBhIHphd2llcmFqXHUwMTA1Y2Egd3N6eXN0a2llIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd2UgaSBvYmxpY3pvbmUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRXhjZWwoXHJcbiAgaW5wdXRWYWx1ZXM6IEV4Y2VsU2V0c1NldCB8IEV4Y2VsU2V0c1NldFtdLFxyXG4gIGNhbGNzVmFsdWVzPzogRXhjZWxTZXRzR2V0IHwgRXhjZWxTZXRzR2V0W10gLy8gRHJ1Z2kgYXJndW1lbnQgamVzdCBvcGNqb25hbG55XHJcbik6IEV4Y2VsUmVzdWx0cyB7IC8vIFp3cmFjYW15IG1hcFx1MDExOSB6IGJhcmR6aWVqIHN6Y3plZ1x1MDBGM1x1MDE0Mm93eW0gdHlwZW1cclxuICBcclxuICAvLyBJbmljamFsaXphY2phIG1hcHkgeiBwb3ByYXdueW1pIHR5cGFtaVxyXG4gIGNvbnN0IE06RXhjZWxSZXN1bHRzID0gbmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk+KCk7XHJcblxyXG4gIC8vIDEuIFByemV0d2FyemFuaWUgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93eWNoIChpbnB1dFZhbHVlcylcclxuICAvLyBOb3JtYWxpemFjamEgaW5wdXRWYWx1ZXMgZG8gdGFibGljeSwgamVcdTAxNUJsaSBwcnpla2F6YW5vIHBvamVkeW5jenkgb2JpZWt0XHJcbiAgY29uc3QgcmVzb2x2ZWRJbnB1dFZhbHVlcyA9ICFBcnJheS5pc0FycmF5KGlucHV0VmFsdWVzKSA/IFtpbnB1dFZhbHVlc10gOiBpbnB1dFZhbHVlcztcclxuICByZXNvbHZlZElucHV0VmFsdWVzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICBNLnNldChpdGVtLnZhciwgaXRlbS52YWwpO1xyXG4gIH0pO1xyXG5cclxuICAvLyAyLiBQcnpldHdhcnphbmllIHdhcnRvXHUwMTVCY2kgb2JsaWN6ZW5pb3d5Y2ggKGNhbGNzVmFsdWVzKVxyXG4gIGlmIChjYWxjc1ZhbHVlcykgeyAvLyBXeWtvbmFqIHR5bGtvLCBqZVx1MDE1QmxpIGNhbGNzVmFsdWVzIHpvc3RhXHUwMTQyeSBkb3N0YXJjem9uZVxyXG4gICAgLy8gTm9ybWFsaXphY2phIGNhbGNzVmFsdWVzIGRvIHRhYmxpY3ksIGplXHUwMTVCbGkgcHJ6ZWthemFubyBwb2plZHluY3p5IG9iaWVrdFxyXG4gICAgY29uc3QgcmVzb2x2ZWRDYWxjc1ZhbHVlcyA9ICFBcnJheS5pc0FycmF5KGNhbGNzVmFsdWVzKSA/IFtjYWxjc1ZhbHVlc10gOiBjYWxjc1ZhbHVlcztcclxuICAgIFxyXG4gICAgcmVzb2x2ZWRDYWxjc1ZhbHVlcy5mb3JFYWNoKGNhbGNJdGVtID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBXeXdvXHUwMTQyYW5pZSBmdW5rY2ppIG9ibGljemVuaW93ZWogdVx1MDE3Q3l0a293bmlrYSwgcHJ6ZWthenVqXHUwMTA1YyBha3R1YWxuXHUwMTA1IG1hcFx1MDExOSBNXHJcbiAgICAgICAgY29uc3QgcmVzdWx0VmFsdWUgPSBjYWxjSXRlbS52YWwoTSk7XHJcbiAgICAgICAgLy8gWmFwaXNhbmllIHd5bmlrdSBvYmxpY3plXHUwMTQ0IGRvIG1hcHkgTVxyXG4gICAgICAgIE0uc2V0KGNhbGNJdGVtLnZhciwgcmVzdWx0VmFsdWUpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEJcdTAxNDJcdTAxMDVkIHBvZGN6YXMgb2JsaWN6YW5pYSB6bWllbm5laiBcIiR7Y2FsY0l0ZW0udmFyfVwiOmAsIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKSk7XHJcbiAgICAgICAgLy8gTW9cdTAxN0Nlc3ogemRlY3lkb3dhXHUwMTA3LCBqYWsgb2JzXHUwMTQydVx1MDE3Q3lcdTAxMDcgYlx1MDE0Mlx1MDEwNWQ6IHBvbWluXHUwMTA1XHUwMTA3LCB6YXBpc2FcdTAxMDcgYlx1MDE0Mlx1MDEwNWQsIHByemVyd2FcdTAxMDcsIGl0cC5cclxuICAgICAgICAvLyBOYSByYXppZSB6YXBpc3VqZW15IGB1bmRlZmluZWRgLCBhYnkgd3NrYXphXHUwMTA3IHByb2JsZW0uXHJcbiAgICAgICAgTS5zZXQoY2FsY0l0ZW0udmFyLCB1bmRlZmluZWQgYXMgYW55KTsgLy8gVVx1MDE3Q3l3YW15IGBhcyBhbnlgIGFieSBwb3p3b2xpXHUwMTA3IG5hIGB1bmRlZmluZWRgIHcgbWFwaWUgeiB0eXBlbSBFeGNlbE5lc3RlZE51bWJlckFycmF5XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcnVqZSB0YWJsaWNcdTAxMTkgbGljemIgKHByemVkemlhXHUwMTQyKSBvIG9rcmVcdTAxNUJsb25laiBsaWN6YmllIGVsZW1lbnRcdTAwRjN3LCBrcm9rdSBpIHdhcnRvXHUwMTVCY2kgcG9jelx1MDEwNXRrb3dlai5cclxuICpcclxuICogQHBhcmFtIHN0YXJ0QXQgV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHBpZXJ3c3plZ28gZWxlbWVudHUgdyB0YWJsaWN5LlxyXG4gKiBAcGFyYW0gc3RlcCBLcm9rIChyXHUwMEYzXHUwMTdDbmljYSkgbWlcdTAxMTlkenkga29sZWpueW1pIGVsZW1lbnRhbWkgdyB0YWJsaWN5LiBNb1x1MDE3Q2UgYnlcdTAxMDcgZG9kYXRuaSwgdWplbW55IGx1YiB6ZXJvd3kuXHJcbiAqIEBwYXJhbSBpdGVtcyBMaWN6YmEgZWxlbWVudFx1MDBGM3cgZG8gd3lnZW5lcm93YW5pYSB3IHRhYmxpY3kuXHJcbiAqIEByZXR1cm5zIFRhYmxpY2EgbGljemIgKG51bWJlcltdKSByZXByZXplbnR1alx1MDEwNWNhIHd5Z2VuZXJvd2FueSBwcnplZHppYVx1MDE0Mi5cclxuICogWndyYWNhIHB1c3RcdTAxMDUgdGFibGljXHUwMTE5LCBqZVx1MDE1QmxpIGBpdGVtc2AgamVzdCBtbmllanN6ZSBsdWIgclx1MDBGM3duZSAwLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZUZpcnN0U3RlcFNpemUoc3RhcnRBdDogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGl0ZW1zOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgaWYgKGl0ZW1zIDw9IDApIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zOyBpKyspIHtcclxuICAgIHJlc3VsdC5wdXNoKHN0YXJ0QXQgKyAoaSAqIHN0ZXApKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVydWplIHRhYmxpY1x1MDExOSBsaWN6YiAocHJ6ZWR6aWFcdTAxNDIpLCB6YWN6eW5halx1MDEwNWMgb2QgYHN0YXJ0QXRgLCBwb3N0XHUwMTE5cHVqXHUwMTA1YyBvIGBzdGVwYCxcclxuICogYVx1MDE3QyBkbyBvc2lcdTAxMDVnbmlcdTAxMTljaWEgKGkgcG90ZW5jamFsbmllIHdcdTAxNDJcdTAxMDVjemVuaWEpIGBlbmRBdGAuXHJcbiAqXHJcbiAqIEBwYXJhbSBzdGFydEF0IFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBwaWVyd3N6ZWdvIGVsZW1lbnR1IHcgdGFibGljeS5cclxuICogQHBhcmFtIHN0ZXAgS3JvayAoclx1MDBGM1x1MDE3Q25pY2EpIG1pXHUwMTE5ZHp5IGtvbGVqbnltaSBlbGVtZW50YW1pIHcgdGFibGljeS4gTW9cdTAxN0NlIGJ5XHUwMTA3IGRvZGF0bmksIHVqZW1ueSBsdWIgemVyb3d5LlxyXG4gKiBAcGFyYW0gZW5kQXQgV2FydG9cdTAxNUJcdTAxMDcga29cdTAxNDRjb3dhIHByemVkemlhXHUwMTQydS4gRWxlbWVudHkgYlx1MDExOWRcdTAxMDUgZ2VuZXJvd2FuZSB0YWsgZFx1MDE0MnVnbywgamFrXHJcbiAqIGRcdTAxNDJ1Z28gbWllc3pjelx1MDEwNSBzaVx1MDExOSB3IHByemVkemlhbGUgb2tyZVx1MDE1QmxvbnltIHByemV6IGBzdGFydEF0YCwgYHN0ZXBgIGkgYGVuZEF0YCAod1x1MDE0Mlx1MDEwNWN6bmllKS5cclxuICogQHJldHVybnMgVGFibGljYSBsaWN6YiAobnVtYmVyW10pIHJlcHJlemVudHVqXHUwMTA1Y2Egd3lnZW5lcm93YW55IHByemVkemlhXHUwMTQyLlxyXG4gKiBad3JhY2EgcHVzdFx1MDEwNSB0YWJsaWNcdTAxMTksIGplXHUwMTVCbGkgbmllIG1vXHUwMTdDbmEgd3lnZW5lcm93YVx1MDEwNyBcdTAxN0NhZG55Y2ggZWxlbWVudFx1MDBGM3dcclxuICogKG5wLiBzdGFydEF0ID4gZW5kQXQgcHJ6eSBkb2RhdG5pbSBrcm9rdSwgbHViIGplXHUwMTVCbGkgc3RlcD0wIGEgc3RhcnRBdCAhPT0gZW5kQXQpLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZUZpcnN0U3RlcExhc3Qoc3RhcnRBdDogbnVtYmVyLCBzdGVwOiBudW1iZXIsIGVuZEF0OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgY29uc3QgcmVzdWx0OiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBpZiAoc3RlcCA9PT0gMCkge1xyXG4gICAgLy8gSmVcdTAxNUJsaSBrcm9rIHd5bm9zaSAwLCBwcnplZHppYVx1MDE0MiBtb1x1MDE3Q2UgemF3aWVyYVx1MDEwNyB0eWxrbyBqZWRlbiBlbGVtZW50LFxyXG4gICAgLy8gamVcdTAxNUJsaSBzdGFydEF0IGplc3Qgclx1MDBGM3duZSBlbmRBdC5cclxuICAgIGlmIChzdGFydEF0ID09PSBlbmRBdCkge1xyXG4gICAgICByZXN1bHQucHVzaChzdGFydEF0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7IC8vIFp3cmFjYSBbc3RhcnRBdF0gbHViIFtdXHJcbiAgfVxyXG5cclxuICBpZiAoc3RlcCA+IDApIHtcclxuICAgIC8vIEtyb2sgZG9kYXRuaTogaWR6aWVteSB3IGdcdTAwRjNyXHUwMTE5XHJcbiAgICBpZiAoc3RhcnRBdCA+IGVuZEF0KSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBqZXN0IGp1XHUwMTdDIHphIHdhcnRvXHUwMTVCY2lcdTAxMDUga29cdTAxNDRjb3dcdTAxMDVcclxuICAgIH1cclxuICAgIGZvciAobGV0IGN1cnJlbnRWYWx1ZSA9IHN0YXJ0QXQ7IGN1cnJlbnRWYWx1ZSA8PSBlbmRBdDsgY3VycmVudFZhbHVlICs9IHN0ZXApIHtcclxuICAgICAgcmVzdWx0LnB1c2goY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICB9IGVsc2UgeyAvLyBzdGVwIDwgMFxyXG4gICAgLy8gS3JvayB1amVtbnk6IGlkemllbXkgdyBkXHUwMEYzXHUwMTQyXHJcbiAgICBpZiAoc3RhcnRBdCA8IGVuZEF0KSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBqZXN0IGp1XHUwMTdDIHphIHdhcnRvXHUwMTVCY2lcdTAxMDUga29cdTAxNDRjb3dcdTAxMDUgKHcgelx1MDE0Mlx1MDEwNSBzdHJvblx1MDExOSlcclxuICAgIH1cclxuICAgIGZvciAobGV0IGN1cnJlbnRWYWx1ZSA9IHN0YXJ0QXQ7IGN1cnJlbnRWYWx1ZSA+PSBlbmRBdDsgY3VycmVudFZhbHVlICs9IHN0ZXApIHtcclxuICAgICAgcmVzdWx0LnB1c2goY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8vIEFsdGVybmF0eXduYSwgYmFyZHppZWogendpXHUwMTE5elx1MDE0MmEgaW1wbGVtZW50YWNqYSB1XHUwMTdDeXdhalx1MDEwNWNhIEFycmF5LmZyb20gKGR6aWFcdTAxNDJhIHRhayBzYW1vKTpcclxuLypcclxuZnVuY3Rpb24gaW5pdFJhbmdlRmlyc3RTdGVwU2l6ZUFsdGVybmF0aXZlKGl0ZW1zOiBudW1iZXIsIHN0ZXA6IG51bWJlciwgc3RhcnRBdDogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gIGlmIChpdGVtcyA8PSAwKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG4gIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBpdGVtcyB9LCAoXywgaW5kZXgpID0+IHN0YXJ0QXQgKyBpbmRleCAqIHN0ZXApO1xyXG59XHJcblxyXG5jb25zb2xlLmxvZyhcIi0tLSBUZXN0IGFsdGVybmF0eXduZWogaW1wbGVtZW50YWNqaSAtLS1cIik7XHJcbmNvbnN0IHJhbmdlMV9hbHQgPSBpbml0UmFuZ2VGaXJzdFN0ZXBTaXplQWx0ZXJuYXRpdmUoNSwgMiwgMTApO1xyXG5jb25zb2xlLmxvZyhcIlJhbmdlIDEgQWx0IChpdGVtczogNSwgc3RlcDogMiwgc3RhcnRBdDogMTApOlwiLCByYW5nZTFfYWx0KTtcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4Y2VsO1xyXG5cclxuLy8gLS0tIFByenlrXHUwMTQyYWQgdVx1MDE3Q3ljaWEgLS0tXHJcbi8vLy8gRGVmaW5pY2phIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd3ljaFxyXG4vL2NvbnN0IGlucHV0czogRXhjZWxTZXRzU2V0W10gPSBbXHJcbi8vICB7IHZhcjogXCJpXCIsIHZhbDogWzEsIDIsIDMsIDQsIDUsIDYsIDddIH0sXHJcbi8vICB7IHZhcjogXCJqXCIsIHZhbDogWzEsIDMsIDIsIDcsIDYsIDUsIDRdIH1cclxuLy9dO1xyXG4vL1xyXG4vLy8vIERlZmluaWNqYSBvYmxpY3plXHUwMTQ0XHJcbi8vY29uc3QgY2FsY3VsYXRpb25zOiBFeGNlbFNldHNHZXRbXSA9IFtcclxuLy8gIHtcclxuLy8gICAgdmFyOiBcImlqX3N1bVwiLCAvLyBOb3dhIHptaWVubmEsIGt0XHUwMEYzcmEgYlx1MDExOWR6aWUgc3VtXHUwMTA1IGlba10gKyBqW2tdXHJcbi8vICAgIHZhbDogKGN1cnJlbnRNYXApID0+IHtcclxuLy8gICAgICAvLyBQb2JpZXJhbXkgdGFibGljZSAnaScgb3JheiAnaicgeiBtYXB5XHJcbi8vICAgICAgY29uc3QgaUFycmF5ID0gY3VycmVudE1hcC5nZXQoXCJpXCIpO1xyXG4vLyAgICAgIGNvbnN0IGpBcnJheSA9IGN1cnJlbnRNYXAuZ2V0KFwialwiKTtcclxuLy9cclxuLy8gICAgICAvLyBXYVx1MDE3Q25lOiBTcHJhd2R6ZW5pZSB0eXBcdTAwRjN3IGkgb2JzXHUwMTQydWdhIGJcdTAxNDJcdTAxMTlkXHUwMEYzdyB3ZXduXHUwMTA1dHJ6IGZ1bmtjamkgdVx1MDE3Q3l0a293bmlrYVxyXG4vLyAgICAgIGlmICghQXJyYXkuaXNBcnJheShpQXJyYXkpIHx8ICFBcnJheS5pc0FycmF5KGpBcnJheSkpIHtcclxuLy8gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlptaWVubmUgJ2knIG9yYXogJ2onIG11c3pcdTAxMDUgYnlcdTAxMDcgdGFibGljYW1pIGRsYSB0ZWogb3BlcmFjamkgc3Vtb3dhbmlhLlwiKTtcclxuLy8gICAgICB9XHJcbi8vICAgICAgaWYgKGlBcnJheS5zb21lKGlzTmFOKSB8fCBqQXJyYXkuc29tZShpc05hTikpIHtcclxuLy8gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV3N6eXN0a2llIGVsZW1lbnR5IHcgdGFibGljYWNoICdpJyBvcmF6ICdqJyBtdXN6XHUwMTA1IGJ5XHUwMTA3IGxpY3piYW1pLlwiKTtcclxuLy8gICAgICB9XHJcbi8vICAgICAgaWYgKGlBcnJheS5sZW5ndGggIT09IGpBcnJheS5sZW5ndGgpIHtcclxuLy8gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRhYmxpY2UgJ2knIG9yYXogJ2onIG11c3pcdTAxMDUgbWllXHUwMTA3IHRha1x1MDEwNSBzYW1cdTAxMDUgZFx1MDE0MnVnb1x1MDE1Qlx1MDEwNyBkbyBzdW1vd2FuaWEgZWxlbWVudCBwbyBlbGVtZW5jaWUuXCIpO1xyXG4vLyAgICAgIH1cclxuLy9cclxuLy8gICAgICAvLyBXeWtvbmFuaWUgb3BlcmFjamkgc3Vtb3dhbmlhIGVsZW1lbnQgcG8gZWxlbWVuY2llXHJcbi8vICAgICAgLy8gWmFrXHUwMTQyYWRhbXksIFx1MDE3Q2Ugc1x1MDEwNSB0byBwXHUwMTQyYXNraWUgdGFibGljZSBsaWN6YiwgemdvZG5pZSB6IHByenlrXHUwMTQyYWRlbS5cclxuLy8gICAgICAvLyBEbGEgRXhjZWxOZXN0ZWROdW1iZXJBcnJheSBvcGVyYWNqYSBieVx1MDE0MmFieSBiYXJkemllaiB6XHUwMTQyb1x1MDE3Q29uYSAocmVrdXJlbmN5am5hKS5cclxuLy8gICAgICByZXR1cm4gaUFycmF5Lm1hcCgodmFsX2ksIGluZGV4KSA9PiAodmFsX2kgYXMgbnVtYmVyKSArIChqQXJyYXlbaW5kZXhdIGFzIG51bWJlcikpO1xyXG4vLyAgICB9XHJcbi8vICB9LFxyXG4vLyAge1xyXG4vLyAgICB2YXI6IFwia1wiLCAvLyBQcnp5a1x1MDE0MmFkIGlubmVqIHptaWVubmVqLCBucC4gc2thbGFyXHJcbi8vICAgIHZhbDogKCkgPT4gMTAwIC8vIFByb3N0YSBmdW5rY2phIHp3cmFjYWpcdTAxMDVjYSB3YXJ0b1x1MDE1Qlx1MDEwN1xyXG4vLyAgfSxcclxuLy8gIHtcclxuLy8gICAgdmFyOiBcImlfcGx1c19rXCIsIC8vIFByenlrXHUwMTQyYWQgb3BlcmFjamkgdGFibGljYSArIHNrYWxhciAoYnJvYWRjYXN0aW5nKVxyXG4vLyAgICB2YWw6IChjdXJyZW50TWFwKSA9PiB7XHJcbi8vICAgICAgICBjb25zdCBpQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImlcIik7XHJcbi8vICAgICAgICBjb25zdCBrVmFsID0gY3VycmVudE1hcC5nZXQoXCJrXCIpO1xyXG4vL1xyXG4vLyAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlBcnJheSkgfHwgdHlwZW9mIGtWYWwgIT09ICdudW1iZXInKSB7XHJcbi8vICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiJ2knIG11c2kgYnlcdTAxMDcgdGFibGljXHUwMTA1LCBhICdrJyBsaWN6Ylx1MDEwNS5cIik7XHJcbi8vICAgICAgICB9XHJcbi8vICAgICAgICByZXR1cm4gaUFycmF5Lm1hcCh2YWxfaSA9PiAodmFsX2kgYXMgbnVtYmVyKSArIChrVmFsIGFzIG51bWJlcikpO1xyXG4vLyAgICB9XHJcbi8vICB9XHJcbi8vXTtcclxuLy9cclxuLy8vLyBXeXdvXHUwMTQyYW5pZSBmdW5rY2ppIEV4Y2VsXHJcbi8vY29uc3QgQTEgPSBFeGNlbChpbnB1dHMsIGNhbGN1bGF0aW9ucyk7XHJcbi8vXHJcbi8vLy8gV3lcdTAxNUJ3aWV0bGVuaWUgd3luaWtcdTAwRjN3XHJcbi8vY29uc29sZS5sb2coXCJDYVx1MDE0MmEgbWFwYSBBMTpcIiwgQTEpO1xyXG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdpJyk6XCIsIEExLmdldChcImlcIikpO1xyXG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdqJyk6XCIsIEExLmdldChcImpcIikpO1xyXG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdpal9zdW0nKTpcIiwgQTEuZ2V0KFwiaWpfc3VtXCIpKTsgLy8gT2N6ZWtpd2FuZTogWzIsIDUsIDUsIDExLCAxMSwgMTEsIDExXVxyXG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdrJyk6XCIsIEExLmdldChcImtcIikpOyAgICAgICAgIC8vIE9jemVraXdhbmU6IDEwMFxyXG4vL2NvbnNvbGUubG9nKFwiQTEuZ2V0KCdpX3BsdXNfaycpOlwiLCBBMS5nZXQoXCJpX3BsdXNfa1wiKSk7IC8vIE9jemVraXdhbmU6IFsxMDEsIDEwMiwgMTAzLCAxMDQsIDEwNSwgMTA2LCAxMDddXHJcbi8vY29uc29sZS5sb2coXCJXYXJ0b1x1MDE1Qlx1MDEwNyBpWzNdIChpbmRla3MgMywgY3p5bGkgY3p3YXJ0eSBlbGVtZW50KTpcIiwgKEExLmdldChcImlcIikgYXMgbnVtYmVyW10pWzNdKTsgLy8gT2N6ZWtpd2FuZTogNFxyXG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGZsb29yTG9nMih4Om51bWJlcik6bnVtYmVyIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLmxvZzIoeCkpO1xyXG59XHJcblxyXG4vLyAgdG8ga2xhc3ljem5hIHBvdFx1MDExOWdhIGR3XHUwMEYzamtpLlxyXG5leHBvcnQgZnVuY3Rpb24gcG93Mih4Om51bWJlcik6bnVtYmVyIHtcclxuICByZXR1cm4gTWF0aC5wb3coMix4KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3cyQWZmaW5lKHg6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIGEgKiAyICoqICh4ICsgYikgKyBjO1xyXG59XHJcblxyXG4vLyAgd2FsdWFjamEgZHd1LWFkeWN6bmEgbGljemJ5IG5hdHVyYWxuZWogZG9kYXRuaWVqIFxyXG4vLyAgY3p5bGkgbmFqd2lcdTAxMTlrc3pcdTAxMDUgcG90XHUwMTE5Z1x1MDExOSBsaWN6YnkgMiwga3RcdTAwRjNyYSBkemllbGkgeFxyXG4vLyAgbWFwbGUgYGsgOj0geCAtPiBpbG9nMih4IC0gQml0c1tBbmRdKHgsIHggLSAxKSlgXHJcbi8vICBrKHgpPW9yZF8yKHgpXHJcbi8vICBDenlsaTogaWxlIHJhenkgeCBtb1x1MDE3Q25hIHBvZHppZWxpXHUwMTA3IHByemV6IDIsIHphbmltIHByemVzdGFuaWUgYnlcdTAxMDcgY2FcdTAxNDJrb3dpdGUgXHJcbi8vICAobHViLCByXHUwMEYzd25vem5hY3puaWUsIHBvenljamEgbmFqbVx1MDE0Mm9kc3plZ28gdXN0YXdpb25lZ28gYml0dSB3IHgpLlxyXG5leHBvcnQgZnVuY3Rpb24gdmFsMkFkaWMoeDogbnVtYmVyKTogbnVtYmVyIHtcclxuICBpZiAoeCA8PSAwIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHgpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBtdXNpIGJ5XHUwMTA3IGRvZGF0bmlcdTAxMDUgbGljemJcdTAxMDUgY2FcdTAxNDJrb3dpdFx1MDEwNS5cIik7XHJcbiAgfVxyXG4gIHJldHVybiBNYXRoLmxvZzIoeCAmIC14KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvdzJBZmZpbmVfdmFsMkFkaWMoeDogbnVtYmVyLCBhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyKTogbnVtYmVyIHtcclxuICByZXR1cm4gYSAqIDIgKiogKHZhbDJBZGljKHgpICsgYikgKyBjO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05vdFZhbE5hdHVyYWxQb3ModmFsOnVua25vd24pOmJvb2xlYW4ge1xyXG4gIHJldHVybiAodHlwZW9mIHZhbCAhPT0gXCJudW1iZXJcIiB8fCBpc05hTih2YWwpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbCkgfHxcclxuICB2YWwgPD0gMCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvKHZhbDp1bmtub3duKTpib29sZWFuIHtcclxuICByZXR1cm4gKHR5cGVvZiB2YWwgIT09IFwibnVtYmVyXCIgfHwgaXNOYU4odmFsKSB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWwpIHx8XHJcbiAgdmFsIDwgMCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0U29tTm90T2ZWYWxzQXJyYXkodjpzdHJpbmcsIGFycjp1bmtub3duLCB0ZXN0OlwiaXNOb3RWYWxOYXR1cmFsUG9zXCJ8XCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTp2b2lkIHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgWm1pZW5uZSAke3Z9ICBtdXN6XHUwMTA1IGJ5XHUwMTA3IHRhYmxpY2FtaS5gLFxyXG4gICAgKTtcclxuICB9XHJcbiAgc3dpdGNoICh0ZXN0KSB7XHJcbiAgICBjYXNlIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCI6XHJcbiAgICAgIGlmIChhcnIuc29tZShpc05vdFZhbE5hdHVyYWxQb3MpKSB7dGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgYFdzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY3kgJHt2fSBtdXN6XHUwMTA1IGJ5XHUwMTA3IGxpY3piYW1pIG5hdHVyYWxueW1pIGRvZGF0bmltaSAod2lcdTAxMTlrc3p5bWkgb2QgMCkuYCxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCI6XHJcbiAgICAgIGlmIChhcnIuc29tZShpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVybykpIHt0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYFdzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY3kgJHt2fSBtdXN6XHUwMTA1IGJ5XHUwMTA3IGxpY3piYW1pIG5hdHVyYWxueW1pIGRvZGF0bmltaSB6IHplcm8gKHdpXHUwMTE5a3N6eW1pIG9kIC0xKS5gLFxyXG4gICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufVxyXG4iLCAiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xyXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xyXG5cclxuaW1wb3J0IHsgSlNYIH0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44XCI7XHJcblxyXG4vLyBaYVx1MDE0Mlx1MDBGM1x1MDE3Q215LCBcdTAxN0NlIHRlIHR5cHkgc1x1MDEwNSB6ZGVmaW5pb3dhbmUgZ2xvYmFsbmllIGx1YiBpbXBvcnRvd2FuZVxyXG4vLyBKZVx1MDE1QmxpIG5pZSwgb2Rrb21lbnR1aiBqZSBsdWIgcHJ6ZW5pZVx1MDE1QiBkbyB3c3BcdTAwRjNsbmVnbyBwbGlrdSB0eXBcdTAwRjN3LlxyXG50eXBlIE5lc3RlZE51bWJlckFycmF5ID0gbnVtYmVyIHwgTmVzdGVkTnVtYmVyQXJyYXlbXTtcclxudHlwZSBFeGNlbFJlc3VsdHMgPSBNYXA8c3RyaW5nLCBOZXN0ZWROdW1iZXJBcnJheT47XHJcblxyXG5pbnRlcmZhY2UgUGxvdEV4Y2VsUHJvcHMge1xyXG4gIGRhdGE6IEV4Y2VsUmVzdWx0cztcclxuICB0eXBlOiBcInJvd1wiIHwgXCJjb2xcIjsgLy8gT3JpZW50YWNqYSB0YWJlbGk6IFwicm93XCIgKGRhbmUgdyB3aWVyc3phY2gpLCBcImNvbFwiIChkYW5lIHcga29sdW1uYWNoKVxyXG4gIGNhcHRpb24/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbnkgcG9kcGlzIHRhYmVsaVxyXG4gIHRhYmxlQ2xhc3NOYW1lPzogc3RyaW5nOyAvLyBPcGNqb25hbG5hIGtsYXNhIENTUyBkbGEgdGFiZWxpXHJcbiAgdGhDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSBrb21cdTAwRjNyZWsgdGhcclxuICB0ZENsYXNzTmFtZT86IHN0cmluZzsgLy8gT3Bjam9uYWxuYSBrbGFzYSBDU1MgZGxhIGtvbVx1MDBGM3JlayB0ZFxyXG59XHJcblxyXG4vLyBGdW5rY2phIHBvbW9jbmljemEgZG8gZm9ybWF0b3dhbmlhIHdhcnRvXHUwMTVCY2kga29tXHUwMEYzcmtpXHJcbmNvbnN0IGZvcm1hdENlbGxWYWx1ZSA9ICh2YWx1ZTogTmVzdGVkTnVtYmVyQXJyYXkgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSByZXR1cm4gU3RyaW5nKHZhbHVlKTtcclxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgIC8vIERsYSB6YWduaWVcdTAxN0NkXHUwMTdDb255Y2ggdGFibGljLCBKU09OLnN0cmluZ2lmeSBtb1x1MDE3Q2UgYnlcdTAxMDcgZG9icnltIHJvendpXHUwMTA1emFuaWVtLlxyXG4gICAgLy8gRGxhIHBcdTAxNDJhc2tpY2ggdGFibGljIGxpY3piLCBtb1x1MDE3Q25hIHVcdTAxN0N5XHUwMTA3IHZhbHVlLmpvaW4oJywgJykuXHJcbiAgICAvLyBUdXRhaiB3eWJpZXJhbXkgSlNPTi5zdHJpbmdpZnkgZGxhIG9nXHUwMEYzbG5vXHUwMTVCY2kuXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gXCJbQlx1MDE0Mlx1MDEwNWQgc2VyaWFsaXphY2ppIHRhYmxpY3ldXCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBTdHJpbmcodmFsdWUpOyAvLyBGYWxsYmFja1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBsb3RFeGNlbChcclxuICB7IGRhdGEsIHR5cGUsIGNhcHRpb24sIHRhYmxlQ2xhc3NOYW1lLCB0aENsYXNzTmFtZSwgdGRDbGFzc05hbWUgfTpcclxuICAgIFBsb3RFeGNlbFByb3BzLFxyXG4pOiBKU1guRWxlbWVudCB8IG51bGwge1xyXG4gIGlmICghZGF0YSB8fCBkYXRhLnNpemUgPT09IDApIHtcclxuICAgIHJldHVybiA8cD5CcmFrIGRhbnljaCBkbyB3eVx1MDE1QndpZXRsZW5pYS48L3A+OyAvLyBMdWIgbnVsbCwgamVcdTAxNUJsaSBuaWUgY2hjZXN6IG5pYyByZW5kZXJvd2FcdTAxMDdcclxuICB9XHJcblxyXG4gIGNvbnN0IGtleXMgPSBBcnJheS5mcm9tKGRhdGEua2V5cygpKTtcclxuXHJcbiAgLy8gVXN0YWxlbmllIG1ha3N5bWFsbmVqIGRcdTAxNDJ1Z29cdTAxNUJjaSBzZXJpaSBkYW55Y2ggKGRsYSB3eXJcdTAwRjN3bmFuaWEgdGFiZWxpKVxyXG4gIGxldCBtYXhMZW5ndGggPSAwO1xyXG4gIGxldCBoYXNBbnlEYXRhID0gZmFsc2U7XHJcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xyXG4gICAgY29uc3QgdmFsdWUgPSBkYXRhLmdldChrZXkpO1xyXG4gICAgaGFzQW55RGF0YSA9IHRydWU7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgbWF4TGVuZ3RoID0gTWF0aC5tYXgobWF4TGVuZ3RoLCB2YWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBKZVx1MDE1QmxpIHNcdTAxMDUgZGFuZSwgYWxlIG5pZSBtYSB0YWJsaWMgKG5wLiBzYW1lIHNrYWxhcnkpIGx1YiB3c3p5c3RraWUgdGFibGljZSBzXHUwMTA1IHB1c3RlLFxyXG4gIC8vIHRvIGthXHUwMTdDZGEgc2VyaWEgbWEgZWZla3R5d25pZSBcImRcdTAxNDJ1Z29cdTAxNUJcdTAxMDdcIiAxLlxyXG4gIGlmIChoYXNBbnlEYXRhICYmIG1heExlbmd0aCA9PT0gMCkge1xyXG4gICAgbWF4TGVuZ3RoID0gMTtcclxuICB9XHJcbiAgaWYgKG1heExlbmd0aCA9PT0gMCAmJiBrZXlzLmxlbmd0aCA+IDApIHsgLy8gSmVcdTAxNUJsaSBzXHUwMTA1IGtsdWN6ZSwgYWxlIGJyYWsgZGFueWNoIChucC4gbWFwb3dhbmllIG5hIHVuZGVmaW5lZClcclxuICAgIG1heExlbmd0aCA9IDE7IC8vIFBva2FcdTAxN0MgcHJ6eW5ham1uaWVqIG5hZ1x1MDE0Mlx1MDBGM3draVxyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGUgPT09IFwiY29sXCIpIHtcclxuICAgIC8vIFN0YW5kYXJkb3dhIHRhYmVsYToga2x1Y3plIG1hcHkgamFrbyBuYWdcdTAxNDJcdTAwRjN3a2kga29sdW1uXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzTmFtZX0+XHJcbiAgICAgICAge2NhcHRpb24gJiYgPGNhcHRpb24+e2NhcHRpb259PC9jYXB0aW9uPn1cclxuICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIHtrZXlzLm1hcCgoa2V5KSA9PiAoXHJcbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17dGhDbGFzc05hbWV9IGtleT17a2V5fT5cdTMwMTB7a2V5fVx1MzAxMTwvdGg+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXhMZW5ndGggfSkubWFwKChfLCByb3dJbmRleCkgPT4gKFxyXG4gICAgICAgICAgICA8dHIga2V5PXtgcm93LSR7cm93SW5kZXh9YH0+XHJcbiAgICAgICAgICAgICAge2tleXMubWFwKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlcmllcyA9IGRhdGEuZ2V0KGtleSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZXJpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllc1tyb3dJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmRleCA9PT0gMCkgeyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBza2FsYXJuYSwgd3lcdTAxNUJ3aWV0bCB0eWxrbyB3IHBpZXJ3c3p5bSB3aWVyc3p1XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX0ga2V5PXtgJHtrZXl9LXJvdy0ke3Jvd0luZGV4fWB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtjZWxsQ29udGVudH1cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicm93XCIpIHtcclxuICAgIC8vIFRhYmVsYSB0cmFuc3Bvbm93YW5hOiBrbHVjemUgbWFweSBqYWtvIG5hZ1x1MDE0Mlx1MDBGM3draSB3aWVyc3p5XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzTmFtZX0+XHJcbiAgICAgICAge2NhcHRpb24gJiYgPGNhcHRpb24+e2NhcHRpb259PC9jYXB0aW9uPn1cclxuICAgICAgICB7LyogTW9cdTAxN0NuYSBkb2RhXHUwMTA3IDx0aGVhZD4geiBuYWdcdTAxNDJcdTAwRjN3a2FtaSBrb2x1bW4sIGplXHUwMTVCbGkgc1x1MDEwNSBwb3RyemVibmUsIG5wLiBcIlBhcmFtZXRyXCIsIFwiV2FydG9cdTAxNUJcdTAxMDcgMVwiLCBcIldhcnRvXHUwMTVCXHUwMTA3IDJcIiwgLi4uICovfVxyXG4gICAgICAgIHsvKiBEbGEgdXByb3N6Y3plbmlhLCBwb21pamFteSA8dGhlYWQ+IHR1dGFqLCBhIHBpZXJ3c3p5IDx0aD4gdyBrYVx1MDE3Q2R5bSB3aWVyc3p1IGR6aWFcdTAxNDJhIGpha28gbmFnXHUwMTQyXHUwMEYzd2VrIHdpZXJzemEgKi99XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAge2tleXMubWFwKChrZXkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VyaWVzID0gZGF0YS5nZXQoa2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8dHIga2V5PXtgc2VyaWVzLXJvdy0ke2tleX1gfT5cclxuICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cInJvd1wiIGNsYXNzTmFtZT17dGhDbGFzc05hbWV9Plx1MzAxMHtrZXl9XHUzMDExPC90aD57XCIgXCJ9XHJcbiAgICAgICAgICAgICAgICB7LyogTmFnXHUwMTQyXHUwMEYzd2VrIHdpZXJzemEgKi99XHJcbiAgICAgICAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogbWF4TGVuZ3RoIH0pLm1hcCgoXywgY29sSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgbGV0IGNlbGxDb250ZW50OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZXJpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzW2NvbEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sSW5kZXggPT09IDApIHsgLy8gV2FydG9cdTAxNUJcdTAxMDcgc2thbGFybmEsIHd5XHUwMTVCd2lldGwgdHlsa28gdyBwaWVyd3N6ZWoga29sdW1uaWUgZGFueWNoXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9e3RkQ2xhc3NOYW1lfSBrZXk9e2Ake2tleX0tY29sLSR7Y29sSW5kZXh9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7Y2VsbENvbnRlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiA8cD5OaWVwcmF3aWRcdTAxNDJvd3kgdHlwIHRhYmVsaToge3R5cGV9PC9wPjsgLy8gRmFsbGJhY2tcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxjQUFjOzs7QUNBdkIsU0FBaUIsaUJBQWlCOzs7QUNDbEM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBUUwsU0FHQSxVQUhBLEtBR0EsWUFIQTtBQURGLElBQU0saUNBQ0osb0JBQUMsVUFBSyxHQUFFLEtBQUksR0FBRSxNQUFLLE9BQU0sTUFBSyxRQUFPLEtBQUksSUFBRyxLQUFJO0FBRWxELElBQU0saUNBQ0osaUNBQ0U7QUFBQSxzQkFBQyxVQUFLLEdBQUUsTUFBSyxHQUFFLEtBQUksT0FBTSxLQUFJLFFBQU8sTUFBSyxJQUFHLEtBQUk7QUFBQSxFQUNoRCxvQkFBQyxVQUFLLEdBQUUsS0FBSSxHQUFFLE1BQUssT0FBTSxNQUFLLFFBQU8sS0FBSSxJQUFHLEtBQUk7QUFBQSxHQUNsRDtBQW9DRixJQUFNLGdCQUFnQjtBQUFBLEVBQ3BCLGtCQUFrQjtBQUFBLEVBQ2xCLG1CQUFtQjtBQUFBLEVBQ25CLFNBQVM7QUFBQSxJQUNQLFFBQVE7QUFBQTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLEdBQUc7QUFBQSxVQUNILGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFD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
