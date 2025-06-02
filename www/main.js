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
            /* @__PURE__ */ jsx3("li", { children: "\u3010j\u3011 =\u3010hAZ\u3011 -\u3010i\u3011" }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50c3giLCAiYXBwLnRzeCIsICJ1aS9JbnB1dE51bWJlci50c3giLCAibG9naWMvY2FsY3VsYXRlRXhjZWwudHMiLCAibG9naWMvbWF0aEZ1bmMudHMiLCAidWkvUGxvdEV4Y2VsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xyXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwLnRzeFwiO1xyXG4vL2FhXHJcbnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikhKTtcclxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cclxuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cclxuaW1wb3J0IHsgc2lnbmFsLCB1c2VTaWduYWwgfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvQHByZWFjdC9zaWduYWxzQDIuMi4wXCI7XHJcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSBcIi4vdWkvSW5wdXROdW1iZXIudHN4XCI7IC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2UgXHUwMTVCY2llXHUwMTdDa2EgamVzdCBwb3ByYXduYVxyXG5pbXBvcnQge1xyXG4gIEV4Y2VsLFxyXG4gIHR5cGUgRXhjZWxOZXN0ZWROLFxyXG4gIHR5cGUgRXhjZWxSZXN1bHRzLFxyXG4gIHR5cGUgRXhjZWxTZXRzR2V0LFxyXG4gIHR5cGUgRXhjZWxTZXRzU2V0LFxyXG4gIGluaXRSYW5nZUZpcnN0U3RlcExhc3QsXHJcbiAgLy9pbml0UmFuZ2VGaXJzdFN0ZXBTaXplLFxyXG59IGZyb20gXCIuL2xvZ2ljL2NhbGN1bGF0ZUV4Y2VsLnRzXCI7XHJcbmltcG9ydCAqIGFzIE1hdGhGIGZyb20gXCIuL2xvZ2ljL21hdGhGdW5jLnRzXCI7XHJcbmltcG9ydCB7IFBsb3RFeGNlbCB9IGZyb20gXCIuL3VpL1Bsb3RFeGNlbC50c3hcIjtcclxuXHJcbi8vY29uc3QgcmVzdWx0TSA9IHNpZ25hbDxFeGNlbFJlc3VsdHM+KG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCkpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcclxuICBjb25zdCBmcm9tID0gdXNlU2lnbmFsKDEpO1xyXG4gIGNvbnN0IHRvID0gdXNlU2lnbmFsKDEwKTtcclxuICBjb25zdCByZXN1bHRNID0gdXNlU2lnbmFsPEV4Y2VsUmVzdWx0cz4obmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTj4oKSk7XHJcblxyXG4gIGNvbnN0IGNhbGN1bGF0ZSA9ICgpID0+IHtcclxuICAgIC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2Ugd2FydG9cdTAxNUJjaSBzXHUwMTA1IGxpY3piYW1pIHByemVkIHBcdTAxMTl0bFx1MDEwNVxyXG4gICAgaWYgKGlzTmFOKE51bWJlcihmcm9tLnZhbHVlKSkgfHwgaXNOYU4oTnVtYmVyKHRvLnZhbHVlKSkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIldhcnRvXHUwMTVCY2kgJ2Zyb20nIGx1YiAndG8nIG5pZSBzXHUwMTA1IGxpY3piYW1pLlwiKTtcclxuICAgICAgcmVzdWx0TS52YWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXRoRW50ZXI6IEV4Y2VsU2V0c1NldFtdID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImlcIixcclxuICAgICAgICB2YWw6IGluaXRSYW5nZUZpcnN0U3RlcExhc3QoTnVtYmVyKGZyb20udmFsdWUpLCAxLCBOdW1iZXIodG8udmFsdWUpKSxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBjb25zdCBtYXRoQ2FsY3M6IEV4Y2VsU2V0c0dldFtdID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImhcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaV9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJpXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwiaVwiLCBpX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XHJcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcclxuICAgICAgICAgIHJldHVybiBpX19BcnJheS5tYXAoKHZhbF9pLCBfaW5kZXgpID0+XHJcbiAgICAgICAgICAgIE1hdGhGLmZsb29yTG9nMih2YWxfaSBhcyBudW1iZXIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwiaEFcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaF9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJoXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhcIixcclxuICAgICAgICAgICAgaF9fQXJyYXksXHJcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cclxuICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSh2YWxfaCBhcyBudW1iZXIsIDEsIDAsIDApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwiaFpcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaF9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJoXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhcIixcclxuICAgICAgICAgICAgaF9fQXJyYXksXHJcbiAgICAgICAgICAgIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGhfX0FycmF5Lm1hcCgodmFsX2gsIF9pbmRleCkgPT5cclxuICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZSh2YWxfaCBhcyBudW1iZXIsIDEsIDEsIC0xKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImhBWlwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBoX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXHJcbiAgICAgICAgICAgIFwiaFwiLFxyXG4gICAgICAgICAgICBoX19BcnJheSxcclxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcclxuXHJcbiAgICAgICAgICByZXR1cm4gaF9fQXJyYXkubWFwKCh2YWxfaCwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lKHZhbF9oIGFzIG51bWJlciwgMS41LCAxLCAtMSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJoaVwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcclxuICAgICAgICAgIGNvbnN0IGhBX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhBXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhBXCIsXHJcbiAgICAgICAgICAgIGhBX19BcnJheSxcclxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NcIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIGluZGV4KSA9PlxyXG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAtIGhBX19BcnJheVtpbmRleF1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJoalwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcclxuICAgICAgICAgIGNvbnN0IGhaX19BcnJheSA9IGN1cnJlbnRNLmdldChcImhaXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhaXCIsXHJcbiAgICAgICAgICAgIGhaX19BcnJheSxcclxuICAgICAgICAgICAgXCJpc05vdFZhbE5hdHVyYWxQb3NcIixcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICAvLyBoX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaCcsaF9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIGluZGV4KSA9PlxyXG4gICAgICAgICAgICBoWl9fQXJyYXlbaW5kZXhdIC0gKHZhbF9pIGFzIG51bWJlcilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJqXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG5cclxuICAgICAgICAgIC8vIGhfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOyFcclxuXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+XHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmUoTWF0aEYuZmxvb3JMb2cyKHZhbF9pIGFzIG51bWJlciksIDEuNSwgMSwgLTEpIC1cclxuICAgICAgICAgICAgKHZhbF9pIGFzIG51bWJlcilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJraVwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpX19BcnJheSA9IGN1cnJlbnRNLmdldChcImlcIik7XHJcbiAgICAgICAgICBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoXCJpXCIsIGlfX0FycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcclxuICAgICAgICAgIC8vIGlfX0FycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgYm8ga29udHJvbGEgamVzdCB3IE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheSgnaScsaV9fQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7IVxyXG4gICAgICAgICAgcmV0dXJuIGlfX0FycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cclxuICAgICAgICAgICAgTWF0aEYudmFsMkFkaWModmFsX2kgYXMgbnVtYmVyKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImtqXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwialwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gal9fQXJyYXkubWFwKCh2YWxfaiwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICBNYXRoRi52YWwyQWRpYyh2YWxfaiBhcyBudW1iZXIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwia2lBXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICBNYXRoRi5wb3cyQWZmaW5lX3ZhbDJBZGljKHZhbF9pIGFzIG51bWJlciwgMSwgMCwgMClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJrakFcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwialwiLCBqX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XHJcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcclxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2ogYXMgbnVtYmVyLCAxLCAwLCAwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImxpXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICAodmFsX2kgYXMgbnVtYmVyKSAvXHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2kgYXMgbnVtYmVyLCAxLCAwLCAwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImxqXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGpfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwialwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImpcIiwgal9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gal9fQXJyYXkubWFwKCh2YWxfaiwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICAodmFsX2ogYXMgbnVtYmVyKSAvXHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2ogYXMgbnVtYmVyLCAxLCAwLCAwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcIm1pXCIsXHJcbiAgICAgICAgdmFsOiAoY3VycmVudE0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGlfX0FycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaV9fQXJyYXksIFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpO1xyXG4gICAgICAgICAgLy8gaV9fQXJyYXkgLSBuaWUgbWEgc3phbnMgYnlcdTAxMDcgdW5kZWZpbmVkLCBibyBrb250cm9sYSBqZXN0IHcgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdpJyxpX19BcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gaV9fQXJyYXkubWFwKCh2YWxfaSwgX2luZGV4KSA9PlxyXG4gICAgICAgICAgICAoKHZhbF9pIGFzIG51bWJlcikgL1xyXG4gICAgICAgICAgICAgIE1hdGhGLnBvdzJBZmZpbmVfdmFsMkFkaWModmFsX2kgYXMgbnVtYmVyLCAxLCAwLCAwKSkgKyAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB2YXI6IFwid2pcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgal9fQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJqXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFwialwiLCBqX19BcnJheSwgXCJpc05vdFZhbE5hdHVyYWxQb3NcIik7XHJcbiAgICAgICAgICAvLyBpX19BcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlfX0FycmF5LFwiaXNOb3RWYWxOYXR1cmFsUG9zXCIpOyFcclxuICAgICAgICAgIHJldHVybiBqX19BcnJheS5tYXAoKHZhbF9qLCBfaW5kZXgpID0+XHJcbiAgICAgICAgICAgICgodmFsX2ogYXMgbnVtYmVyKSAvXHJcbiAgICAgICAgICAgICAgTWF0aEYucG93MkFmZmluZV92YWwyQWRpYyh2YWxfaiBhcyBudW1iZXIsIDEsIDAsIDApKSArIDJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICByZXN1bHRNLnZhbHVlID0gRXhjZWwobWF0aEVudGVyLCBtYXRoQ2FsY3MpO1xyXG4gIH07XHJcblxyXG4gIC8vIEhhbmRsZXIgZGxhIG9uVmFsdWVDaGFuZ2UsIGt0XHUwMEYzcnkgb2R6d2llcmNpZWRsYSB6YWNob3dhbmllIGArKGUuY3VycmVudFRhcmdldC52YWx1ZSlgXHJcbiAgLy8gS2llZHkgaW5wdXQgamVzdCBwdXN0eSwgYGUuY3VycmVudFRhcmdldC52YWx1ZWAgdG8gXCJcIiwgYSBgK1wiXCJgIHRvIDAuXHJcbiAgLy8gTmFzeiBgb25WYWx1ZUNoYW5nZWAgcHJ6ZWthenVqZSBgdW5kZWZpbmVkYCwgZ2R5IGB2YWx1ZUFzTnVtYmVyYCB0byBOYU4gKG5wLiBkbGEgcHVzdGVnbyBpbnB1dHUpLlxyXG4gIGNvbnN0IGhhbmRsZUZyb21DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZnJvbS52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZnJvbS52YWx1ZSA9IDA7IC8vIEx1YiBpbm5hIHdhcnRvXHUwMTVCXHUwMTA3IGRvbXlcdTAxNUJsbmEsIG5wLiAxLCBqZVx1MDE1QmxpIHRvIGJhcmR6aWVqIHNlbnNvd25lXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVG9DaGFuZ2UgPSAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCkgPT4ge1xyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdG8udmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvLnZhbHVlID0gMDsgLy8gTHViIGlubmEgd2FydG9cdTAxNUJcdTAxMDcgZG9teVx1MDE1QmxuYVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8bWFpbj5cclxuICAgICAgPGgxPk1hdGVtYXR5a2EgdyBnZW5lYWxvZ2lpLjwvaDE+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcclxuICAgICAgICAgIGdhcDogXCI0MHB4XCIsXHJcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMjBweFwiLFxyXG4gICAgICAgICAgZmxleEZsb3c6IFwicm93IG5vd3JhcFwiLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXtjYWxjdWxhdGV9XHJcbiAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjAuNXJlbSAxcmVtXCIsIGZvbnRTaXplOiBcIjFyZW1cIiB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIFBvbGljelxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxmaWVsZHNldFxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYm9yZGVyOiBcIjNweCBzb2xpZCAjNmM3NTdkXCIsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI4cHhcIixcclxuICAgICAgICAgICAgcGFkZGluZzogXCIyMHB4XCIsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogXCIwXCIsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIwXCIsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImZsZXgtc3RhcnRcIixcclxuICAgICAgICAgICAgZ2FwOiBcIjQwcHhcIixcclxuICAgICAgICAgICAgZmxleEZsb3c6IFwicm93IG5vd3JhcFwiLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bGVnZW5kXHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgICAgICAgcGFkZGluZzogXCIzcHggNnB4XCIsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIENob29zZSByYW5nZSBvZiBcdTMwMTBpXHUzMDExXHJcbiAgICAgICAgICA8L2xlZ2VuZD5cclxuXHJcbiAgICAgICAgICA8SW5wdXROdW1iZXJcclxuICAgICAgICAgICAgbmFtZT1cImlucHV0MVwiXHJcbiAgICAgICAgICAgIHZhbHVlPXtmcm9tLnZhbHVlfVxyXG4gICAgICAgICAgICBvblZhbHVlQ2hhbmdlPXtoYW5kbGVGcm9tQ2hhbmdlfVxyXG4gICAgICAgICAgICBkZWY9ezF9XHJcbiAgICAgICAgICAgIG1pbj17MX0gLy8gbG9nMiBqZXN0IHpkZWZpbmlvd2FueSBkbGEgbGljemIgPiAwXHJcbiAgICAgICAgICAgIHN0ZXA9ezF9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT2RcIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHByemVkemlhXHUwMTQydVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPElucHV0TnVtYmVyXHJcbiAgICAgICAgICAgIG5hbWU9XCJpbnB1dDJcIlxyXG4gICAgICAgICAgICB2YWx1ZT17dG8udmFsdWV9XHJcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZVRvQ2hhbmdlfVxyXG4gICAgICAgICAgICBkZWY9ezd9XHJcbiAgICAgICAgICAgIG1pbj17ZnJvbS52YWx1ZSA+PSAxID8gZnJvbS52YWx1ZSA6IDF9IC8vICd0bycgbmllIHBvd2lubm8gYnlcdTAxMDcgbW5pZWpzemUgbmlcdTAxN0MgJ2Zyb20nXHJcbiAgICAgICAgICAgIHN0ZXA9ezF9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRG9cIlxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiV2FydG9cdTAxNUJcdTAxMDcga29cdTAxNDRjb3dhIHByemVkemlhXHUwMTQydVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBpXHUzMDExPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMGhcdTMwMTEgPSBmbG9vcihsb2dcdTIwODIoaSkpIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtpXTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBoQVx1MzAxMSA9IDIqKmggfHx8IGRsYSBwcnplZHppYVx1MDE0MnUgW2hdPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMGhaXHUzMDExID0gMioqKGgrMSktMSB8fHwgZGxhIHByemVkemlhXHUwMTQydSBbaF08L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwaEFaXHUzMDExID0zKjIqKmgtMSA9IDEuNSoyKiooaCsxKS0xIHx8fCBkbGEgcHJ6ZWR6aWFcdTAxNDJ1IFtoXTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBoaVx1MzAxMSA9XHUzMDEwaVx1MzAxMSAtXHUzMDEwaEFcdTMwMTE8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwaGpcdTMwMTEgPVx1MzAxMGhaXHUzMDExIC1cdTMwMTBpXHUzMDExPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMGpcdTMwMTEgPVx1MzAxMGhBWlx1MzAxMSAtXHUzMDEwaVx1MzAxMTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICBcdTMwMTBraVx1MzAxMSA9IHdhbHVhY2phIGR3dS1hZHljem5hIGxpY3pieSBuYXR1cmFsbmVqIGRvZGF0bmllaiBbaV1cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgIFx1MzAxMGtqXHUzMDExID0gd2FsdWFjamEgZHd1LWFkeWN6bmEgbGljemJ5IG5hdHVyYWxuZWogZG9kYXRuaWVqIFtqXVxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwa2lBXHUzMDExID0gMioqXHUzMDEwa2lcdTMwMTE8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwa2pBXHUzMDExID0gMioqXHUzMDEwa2pcdTMwMTE8L2xpPlxyXG4gICAgICAgICAgICA8bGk+XHUzMDEwbGlcdTMwMTEgPVx1MzAxMGlcdTMwMTEvXHUzMDEwa2lBXHUzMDExPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMGxqXHUzMDExID1cdTMwMTBqXHUzMDExL1x1MzAxMGtqQVx1MzAxMTwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cdTMwMTBtXHUzMDExID1cdTMwMTBsaVx1MzAxMSsxPC9saT5cclxuICAgICAgICAgICAgPGxpPlx1MzAxMHdcdTMwMTEgPVx1MzAxMGxqXHUzMDExKzI8L2xpPlxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7cmVzdWx0TS52YWx1ZS5zaXplID4gMCAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLyo8aDM+VGFiZWxhIHN0YW5kYXJkb3dhICh0eXBlPVwiY29sXCIpOjwvaDM+XHJcbiAgICAgICAgICA8UGxvdEV4Y2VsXHJcbiAgICAgICAgICAgIGRhdGE9e3Jlc3VsdE0udmFsdWV9XHJcbiAgICAgICAgICAgIHR5cGU9XCJjb2xcIlxyXG4gICAgICAgICAgICBjYXB0aW9uPVwiV3luaWtpIG9ibGljemVcdTAxNDRcIlxyXG4gICAgICAgICAgLz4qL1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICA8aDM+UmV6dWx0YXQgb2JsaWN6ZVx1MDE0NDo8L2gzPlxyXG4gICAgICAgICAgPFBsb3RFeGNlbFxyXG4gICAgICAgICAgICBkYXRhPXtyZXN1bHRNLnZhbHVlfVxyXG4gICAgICAgICAgICB0eXBlPVwicm93XCJcclxuICAgICAgICAgICAgY2FwdGlvbj1cIld5bmlraSBvYmxpY3plXHUwMTQ0ICh0cmFuc3Bvbm93YW5lKVwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApfVxyXG4gICAgPC9tYWluPlxyXG4gICk7XHJcbn1cclxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cclxuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgdXNlQ2FsbGJhY2ssXHJcbiAgdXNlRWZmZWN0LFxyXG4gIHVzZVJlZixcclxufSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjgvaG9va3NcIjtcclxuaW1wb3J0IHsgSlNYIH0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44XCI7XHJcblxyXG4vLyBaYXdhcnRvXHUwMTVCXHUwMTA3IFNWRyBkbGEgZG9teVx1MDE1QmxueWNoIGlrb24gKy8tIChqZVx1MDE1QmxpIHpkZWN5ZHVqZXN6IHNpXHUwMTE5IGplIG5ha1x1MDE0MmFkYVx1MDEwNylcclxuLy8gTmEgcmF6aWUgbmllIHNcdTAxMDUgb25lIGF1dG9tYXR5Y3puaWUgcmVuZGVyb3dhbmUgdyB0ZWogd2Vyc2ppLFxyXG4vLyBwb25pZXdhXHUwMTdDIHpha1x1MDE0MmFkYW0sIFx1MDE3Q2UgVHdcdTAwRjNqIGdcdTAxNDJcdTAwRjN3bnkgU1ZHIGRlZmluaXVqZSB3eWdsXHUwMTA1ZCBwcnp5Y2lza1x1MDBGM3cuXHJcbi8vIEplXHUwMTVCbGkgY2hjZXN6IGplIGRvZGFcdTAxMDcsIG11c2lzeiBwcnp5d3JcdTAwRjNjaVx1MDEwNyBsb2dpa1x1MDExOSBpY2ggcmVuZGVyb3dhbmlhIHogdHJhbnNmb3JtYWNqYW1pLlxyXG5jb25zdCBEZWZhdWx0RGVjcmVtZW50SWNvblN2Z0NvbnRlbnQgPSAoXHJcbiAgPHJlY3QgeD1cIjVcIiB5PVwiMTFcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIC8+XHJcbik7XHJcbmNvbnN0IERlZmF1bHRJbmNyZW1lbnRJY29uU3ZnQ29udGVudCA9IChcclxuICA8PlxyXG4gICAgPHJlY3QgeD1cIjExXCIgeT1cIjVcIiB3aWR0aD1cIjJcIiBoZWlnaHQ9XCIxNFwiIHJ4PVwiMVwiIC8+XHJcbiAgICA8cmVjdCB4PVwiNVwiIHk9XCIxMVwiIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIyXCIgcng9XCIxXCIgLz5cclxuICA8Lz5cclxuKTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5wdXROdW1iZXJQcm9wcyB7XHJcbiAgdmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgZGVmYXVsdFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIGRlZj86IHN0cmluZyB8IG51bWJlcjtcclxuICBtaW4/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgbWF4Pzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHN0ZXA/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XHJcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBuYW1lPzogc3RyaW5nO1xyXG4gIGlkPzogc3RyaW5nO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBvbkNoYW5nZT86IChldmVudDogSlNYLlRhcmdldGVkRXZlbnQ8SFRNTElucHV0RWxlbWVudCwgRXZlbnQ+KSA9PiB2b2lkO1xyXG4gIG9uVmFsdWVDaGFuZ2U/OiAobmV3VmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCwgbmFtZT86IHN0cmluZykgPT4gdm9pZDtcclxuICByYXRpb1NJWkU/OiBudW1iZXI7XHJcbiAgd3JhcHBlckNsYXNzTmFtZT86IHN0cmluZztcclxuICBzdmdDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgaW5wdXRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc3R5bGU/OiBKU1guQ1NTUHJvcGVydGllcztcclxuICBzZWxlY3RCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xyXG4gIGluY3JlbWVudEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XHJcbiAgZGVjcmVtZW50QnV0dG9uU3R5bGU/OiBKU1guQ1NTUHJvcGVydGllcztcclxuICBpbnB1dEFyZWFTdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xyXG4gIHNlbGVjdEJ1dHRvbkZpbGw/OiBzdHJpbmc7XHJcbiAgaW5jcmVtZW50QnV0dG9uRmlsbD86IHN0cmluZztcclxuICBkZWNyZW1lbnRCdXR0b25GaWxsPzogc3RyaW5nO1xyXG4gIGlucHV0QXJlYVJlY3RGaWxsPzogc3RyaW5nO1xyXG4gIGlucHV0QXJlYUJvcmRlckZpbGw/OiBzdHJpbmc7XHJcbiAgLy8gaWNvbkZpbGw/OiBzdHJpbmc7IC8vIEplXHUwMTVCbGkgYlx1MDExOWR6aWVzeiB1XHUwMTdDeXdhXHUwMTQyIG9zb2JueWNoIGlrb24gKy8tXHJcbiAgW2tleTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5jb25zdCBzdmdMYXlvdXREYXRhID0ge1xyXG4gIGJhc2VWaWV3Qm94V2lkdGg6IDE3NCxcclxuICBiYXNlVmlld0JveEhlaWdodDogNzIsXHJcbiAgYnV0dG9uczoge1xyXG4gICAgY2hvb3NlOiB7IC8vIFptaWVuaW9ubyB6ICdzZWxlY2VjdCcgbmEgJ2Nob29zZScgZGxhIHNwXHUwMEYzam5vXHUwMTVCY2kgeiBUd29pbSBIVE1MXHJcbiAgICAgIG5hbWU6IFwiYnRuLWNob29zZVwiLFxyXG4gICAgICBwYXRoczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXHJcbiAgICAgICAgICBkOiBcIk0xMTUuNzUsNzEuNjJjLTEwLjAzLDAtMTkuOTMtMS42Mi0yOC42My00LjY3bC0uMTItLjA0LS4xMi4wNGMtOC43LDMuMDYtMTguNTksNC42Ny0yOC42Myw0LjY3LTEzLjA2LDAtMjUuODEtMi43NS0zNi4wMi03Ljc1bDI2Ljk2LTE1LjIxaDc1LjYxbDI2Ljk2LDE1LjIxYy0xMC4yLDUtMjIuOTYsNy43NS0zNi4wMiw3Ljc1WlwiLFxyXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzkxOTE5MVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWJvcmRlci1maWxsXCIsXHJcbiAgICAgICAgICBkOiBcIk0xMjQuNzEsNDkuMDRsMjYuMjUsMTQuODFjLTEwLjA0LDQuNzgtMjIuNDgsNy40LTM1LjIxLDcuNC05Ljk5LDAtMTkuODQtMS42MS0yOC41LTQuNjVsLS4yNS0uMDktLjI1LjA5Yy04LjY2LDMuMDQtMTguNTEsNC42NS0yOC41LDQuNjUtMTIuNzMsMC0yNS4xNi0yLjYyLTM1LjIxLTcuNGwyNi4yNS0xNC44MWg3NS40MU0xMjQuOSw0OC4yOUg0OS4xbC0yNy42NiwxNS42YzEwLjAzLDUuMDYsMjIuODUsOC4xMSwzNi44Miw4LjExLDEwLjQ2LDAsMjAuMjctMS43MSwyOC43NS00LjY5LDguNDgsMi45OCwxOC4yOSw0LjY5LDI4Ljc1LDQuNjksMTMuOTcsMCwyNi43OC0zLjA0LDM2LjgyLTguMTFsLTI3LjY2LTE1LjZoMFpcIixcclxuICAgICAgICAgIGRlZmF1bHRGaWxsOlxyXG4gICAgICAgICAgICBcIiM1MDUwNTBcIiwgLyogS29sb3IgZGxhIG9icnlzdS9kcnVnaWVqIHdhcnN0d3ksIGRvc3Rvc3VqICovXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBpbmNyZW1lbnQ6IHtcclxuICAgICAgbmFtZTogXCJidG4taW5jcmVtZW50XCIsXHJcbiAgICAgIHBhdGhzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZGF0YU5hbWU6IFwiYnRuLWZpbGxcIixcclxuICAgICAgICAgIGQ6IFwiTTEyNy4zOCw0My41MVYxLjFjMjYuODMsMy4zNyw0Ni4yNSwxOC4wMSw0Ni4yNSwzNC45LDAsOS4xOS01LjY4LDE3LjkxLTE2LjAxLDI0LjU3bC0zMC4yNC0xNy4wNlpcIixcclxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiMyMTU5N2ZcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1ib3JkZXItZmlsbFwiLFxyXG4gICAgICAgICAgZDogXCJNMTI3Ljc1LDEuNTNjMjYuNDIsMy40NSw0NS41LDE3Ljg2LDQ1LjUsMzQuNDcsMCw5LTUuNTUsMTcuNTYtMTUuNjUsMjQuMTNsLTI5Ljg1LTE2Ljg0VjEuNTNNMTI3LC42OHY0My4wNWwzMC42MywxNy4yOGMxMC4xMy02LjQ4LDE2LjM3LTE1LjI5LDE2LjM3LTI1LjAxLDAtMTcuNS0yMC4yMS0zMi4wOC00Ny0zNS4zMmgwWlwiLFxyXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzEwNDA2MFwiLCAvKiBDaWVtbmllanN6eSBkbGEgb2JyeXN1PyBEb3N0b3N1aiAqL1xyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGljb25BbmNob3JYOiAxNTAsIC8vIDE1MHB4IHcgcHJhd28gKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXHJcbiAgICAgIGljb25BbmNob3JZOiAzMCwgLy8gMzBweCB3IGRcdTAwRjNcdTAxNDIgKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXHJcbiAgICB9LFxyXG4gICAgZGVjcmVtZW50OiB7XHJcbiAgICAgIG5hbWU6IFwiYnRuLWRlY3JlbWVudFwiLFxyXG4gICAgICBwYXRoczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXHJcbiAgICAgICAgICBkOiBcIk0xNi4zOCw2MC41N0M2LjA2LDUzLjkxLjM4LDQ1LjE5LjM4LDM2LC4zOCwxOS4xMSwxOS44LDQuNDcsNDYuNjIsMS4xdjQyLjQxbC0zMC4yNCwxNy4wNlpcIixcclxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiNiMjEwMTBcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1ib3JkZXItZmlsbFwiLFxyXG4gICAgICAgICAgZDogXCJNNDYuMjUsMS41M3Y0MS43Nmgwcy0yOS44NSwxNi44NC0yOS44NSwxNi44NEM2LjMsNTMuNTYuNzUsNDUsLjc1LDM2LC43NSwxOS4zOSwxOS44Myw0Ljk3LDQ2LjI1LDEuNTNNNDcsLjY4QzIwLjIxLDMuOTIsMCwxOC41LDAsMzZjMCw5LjcyLDYuMjQsMTguNTMsMTYuMzcsMjUuMDFsMzAuNjMtMTcuMjhWLjY4aDBaXCIsXHJcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjODAwMDAwXCIsIC8qIENpZW1uaWVqc3p5IGRsYSBvYnJ5c3U/IERvc3Rvc3VqICovXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgaWNvbkFuY2hvclg6IDI1LCAvLyAyMHB4IHcgcHJhd28gKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXHJcbiAgICAgIGljb25BbmNob3JZOiAzMCwgLy8gMzBweCB3IGRcdTAwRjNcdTAxNDIgKHcgc3lzdGVtaWUgdmlld0JveCAxNzR4NzIpXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgaW5wdXRBcmVhOiB7XHJcbiAgICBuYW1lOiBcImlucHV0XCIsXHJcbiAgICByZWN0OiB7XHJcbiAgICAgIHg6IDUyLjM4LFxyXG4gICAgICB5OiAwLjM4LFxyXG4gICAgICB3aWR0aDogNjkuMjUsXHJcbiAgICAgIGhlaWdodDogNDIuNTQsXHJcbiAgICAgIGRlZmF1bHRGaWxsOiBcIiNmZmZcIixcclxuICAgIH0sXHJcbiAgICBib3JkZXJQYXRoOiB7XHJcbiAgICAgIGQ6IFwiTTEyMS4yNS43NXY0MS43OUg1Mi43NVYuNzVoNjguNU0xMjIsMEg1MnY0My4yOWg3MFYwaDBaXCIsXHJcbiAgICAgIGRlZmF1bHRGaWxsOiBcIiMzMzNcIixcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmNvbnN0IENPTlRBSU5FUl9DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1jb250YWluZXJcIjtcclxuY29uc3QgU1ZHX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLXN2Z1wiO1xyXG5jb25zdCBTVkdfQlVUVE9OX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLXN2Zy1idXR0b25cIjsgLy8gVVx1MDE3Q3l3YW5lIHcgVHdvaW0gSFRNTFxyXG5jb25zdCBIVE1MX0lOUFVUX0NMQVNTX05BTUUgPSBcImlucHV0bnVtYmVyLWh0bWwtaW5wdXRcIjsgLy8gVVx1MDE3Q3l3YW5lIHcgVHdvaW0gSFRNTFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElucHV0TnVtYmVyKHByb3BzOiBJbnB1dE51bWJlclByb3BzKTogSlNYLkVsZW1lbnQge1xyXG4gIGNvbnN0IHtcclxuICAgIHZhbHVlLFxyXG4gICAgZGVmYXVsdFZhbHVlLFxyXG4gICAgZGVmID0gMSxcclxuICAgIG1pbixcclxuICAgIG1heCxcclxuICAgIHN0ZXAgPSAxLFxyXG4gICAgcGxhY2Vob2xkZXIsXHJcbiAgICByZXF1aXJlZCxcclxuICAgIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgICBuYW1lLFxyXG4gICAgaWQsXHJcbiAgICByZWFkT25seSA9IGZhbHNlLFxyXG4gICAgb25DaGFuZ2UsXHJcbiAgICBvblZhbHVlQ2hhbmdlLFxyXG4gICAgcmF0aW9TSVpFID0gMSxcclxuICAgIHdyYXBwZXJDbGFzc05hbWUsXHJcbiAgICBzdmdDbGFzc05hbWUsXHJcbiAgICBpbnB1dENsYXNzTmFtZSxcclxuICAgIHN0eWxlLFxyXG4gICAgc2VsZWN0QnV0dG9uU3R5bGUsXHJcbiAgICBpbmNyZW1lbnRCdXR0b25TdHlsZSxcclxuICAgIGRlY3JlbWVudEJ1dHRvblN0eWxlLFxyXG4gICAgaW5wdXRBcmVhU3R5bGUsXHJcbiAgICBzZWxlY3RCdXR0b25GaWxsLFxyXG4gICAgaW5jcmVtZW50QnV0dG9uRmlsbCxcclxuICAgIGRlY3JlbWVudEJ1dHRvbkZpbGwsXHJcbiAgICBpbnB1dEFyZWFSZWN0RmlsbCxcclxuICAgIGlucHV0QXJlYUJvcmRlckZpbGwsXHJcbiAgICAvLyBpY29uRmlsbCA9IFwid2hpdGVcIiwgLy8gSmVcdTAxNUJsaSBiXHUwMTE5ZHppZXN6IHJlbmRlcm93YVx1MDEwNyBvc29ibmUgaWtvbnkgKy8tXHJcbiAgICAuLi5yZXN0RGl2UHJvcHNcclxuICB9ID0gcHJvcHM7XHJcblxyXG4gIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xyXG5cclxuICAvLyBJbmljamFsaXphY2phIHdhcnRvXHUwMTVCY2kgaW5wdXRhIHByenkgbW9udG93YW5pdSBsdWIgem1pYW5pZSBkZWZhdWx0VmFsdWUvdmFsdWVcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlucHV0UmVmLmN1cnJlbnQpIHtcclxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKHZhbHVlKTtcclxuICAgICAgfSBlbHNlIGlmIChkZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlucHV0UmVmLmN1cnJlbnQudmFsdWUgPSBTdHJpbmcoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gXCJcIjsgLy8gSmF3bmUgdXN0YXdpZW5pZSBuYSBwdXN0eSBzdHJpbmcsIGplXHUwMTVCbGkgYnJhayB3YXJ0b1x1MDE1QmNpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LCBbdmFsdWUsIGRlZmF1bHRWYWx1ZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdGVwID0gdXNlQ2FsbGJhY2soKGRpcmVjdGlvbjogXCJ1cFwiIHwgXCJkb3duXCIpID0+IHtcclxuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50ICYmICFkaXNhYmxlZCAmJiAhcmVhZE9ubHkpIHtcclxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ1cFwiKSBpbnB1dFJlZi5jdXJyZW50LnN0ZXBVcCgpO1xyXG4gICAgICBlbHNlIGlucHV0UmVmLmN1cnJlbnQuc3RlcERvd24oKTtcclxuXHJcbiAgICAgIC8vIFN5bXVsYWNqYSB6ZGFyemVuaWEgaW5wdXQsIGFieSB3eXdvXHUwMTQyYVx1MDEwNyBoYW5kbGVJbnB1dENoYW5nZVxyXG4gICAgICBjb25zdCBldmVudCA9IG5ldyBFdmVudChcImlucHV0XCIsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSB9KTtcclxuICAgICAgaW5wdXRSZWYuY3VycmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIH1cclxuICB9LCBbZGlzYWJsZWQsIHJlYWRPbmx5XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlY3JlbWVudCA9IHVzZUNhbGxiYWNrKCgpID0+IGhhbmRsZVN0ZXAoXCJkb3duXCIpLCBbaGFuZGxlU3RlcF0pO1xyXG4gIGNvbnN0IGhhbmRsZUluY3JlbWVudCA9IHVzZUNhbGxiYWNrKCgpID0+IGhhbmRsZVN0ZXAoXCJ1cFwiKSwgW2hhbmRsZVN0ZXBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2hvb3NlQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiAhZGlzYWJsZWQgJiYgIXJlYWRPbmx5KSB7XHJcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZGVmID8/IDE7IC8vIEphayB3IFR3b2ltIEpTXHJcbiAgICAgIGlucHV0UmVmLmN1cnJlbnQudmFsdWUgPSBTdHJpbmcobmV3VmFsdWUpO1xyXG5cclxuICAgICAgLy8gUlx1MDExOWN6bmUgd3l3b1x1MDE0MmFuaWUgbG9naWtpIHptaWFueSB3YXJ0b1x1MDE1QmNpXHJcbiAgICAgIGlmIChvblZhbHVlQ2hhbmdlKSBvblZhbHVlQ2hhbmdlKG5ld1ZhbHVlLCBuYW1lKTtcclxuICAgICAgaWYgKG9uQ2hhbmdlKSB7XHJcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoXCJjaGFuZ2VcIiwge1xyXG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICB9KSBhcyB1bmtub3duIGFzIEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PjtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwidGFyZ2V0XCIsIHtcclxuICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgIHZhbHVlOiBpbnB1dFJlZi5jdXJyZW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgXCJjdXJyZW50VGFyZ2V0XCIsIHtcclxuICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgIHZhbHVlOiBpbnB1dFJlZi5jdXJyZW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9uQ2hhbmdlKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zb2xlLmxvZyhcIkNob29zZSBidXR0b24gY2xpY2tlZCwgdmFsdWUgc2V0IHRvIDFcIik7XHJcbiAgICB9XHJcbiAgfSwgW2Rpc2FibGVkLCByZWFkT25seSwgbmFtZSwgb25WYWx1ZUNoYW5nZSwgb25DaGFuZ2VdKTtcclxuXHJcbiAgLy8gPT09IFBPQ1pcdTAxMDRURUsgREVGSU5JQ0pJIGhhbmRsZUlucHV0Q2hhbmdlID09PVxyXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGU6IEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PikgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjb25zdCByYXdWYWx1ZSA9IHRhcmdldC52YWx1ZTtcclxuICAgIGxldCBudW1lcmljVmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBpZiAocmF3VmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgbnVtZXJpY1ZhbHVlID0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU3ByXHUwMEYzYnVqIHNwYXJzb3dhXHUwMTA3IGpha28gbGljemJcdTAxMTk7IHBhcnNlRmxvYXQgamVzdCBiYXJkemllaiBlbGFzdHljem55XHJcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlRmxvYXQocmF3VmFsdWUpO1xyXG4gICAgICBudW1lcmljVmFsdWUgPSBpc05hTihwYXJzZWQpID8gdW5kZWZpbmVkIDogcGFyc2VkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvblZhbHVlQ2hhbmdlKSB7XHJcbiAgICAgIG9uVmFsdWVDaGFuZ2UobnVtZXJpY1ZhbHVlLCBuYW1lKTtcclxuICAgIH1cclxuICAgIC8vIEplXHUwMTVCbGkgdVx1MDE3Q3l0a293bmlrIHByemVrYXphXHUwMTQyIHdcdTAxNDJhc255IG9uQ2hhbmdlLCB0ZVx1MDE3QyBnbyB3eXdvXHUwMTQyYWpcclxuICAgIC8vIFRvIHpkYXJ6ZW5pZSBcImlucHV0XCIgeiBlbGVtZW50dSBIVE1MXHJcbiAgICBpZiAob25DaGFuZ2UpIHtcclxuICAgICAgb25DaGFuZ2UoZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICAvLyA9PT0gS09OSUVDIERFRklOSUNKSSBoYW5kbGVJbnB1dENoYW5nZSA9PT1cclxuXHJcbiAgY29uc3QgY29udGFpbmVyV2lkdGggPSBzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94V2lkdGggKiByYXRpb1NJWkU7XHJcbiAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gc3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveEhlaWdodCAqIHJhdGlvU0laRTtcclxuXHJcbiAgLy8gU3R5bGUgZGxhIG5hXHUwMTQyb1x1MDE3Q29uZWdvIGlucHV0dSBIVE1MLCBza2Fsb3dhbmUgcHJ6ZXogcmF0aW9TSVpFXHJcbiAgY29uc3QgaHRtbElucHV0U3R5bGU6IEpTWC5DU1NQcm9wZXJ0aWVzID0ge1xyXG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgIGxlZnQ6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueCAqIHJhdGlvU0laRX1weGAsXHJcbiAgICB0b3A6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueSAqIHJhdGlvU0laRX1weGAsXHJcbiAgICB3aWR0aDogYCR7c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC53aWR0aCAqIHJhdGlvU0laRX1weGAsXHJcbiAgICBoZWlnaHQ6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QuaGVpZ2h0ICogcmF0aW9TSVpFfXB4YCxcclxuICAgIGJvcmRlcjogXCJub25lXCIsXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcclxuICAgIGNvbG9yOiBcIiMzMzNcIixcclxuICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcclxuICAgIGZvbnRTaXplOiBgJHtNYXRoLm1heCg4LCAxOCAqIHJhdGlvU0laRSl9cHhgLCAvLyBEb3N0b3N1aiBjemNpb25rXHUwMTE5XHJcbiAgICBvdXRsaW5lOiBcIm5vbmVcIixcclxuICAgIHBhZGRpbmc6IGAwICR7TWF0aC5tYXgoMSwgMiAqIHJhdGlvU0laRSl9cHhgLFxyXG4gICAgbWFyZ2luOiAwLFxyXG4gICAgYm94U2l6aW5nOiBcImJvcmRlci1ib3hcIixcclxuICAgIE1vekFwcGVhcmFuY2U6IFwidGV4dGZpZWxkXCIsXHJcbiAgICBXZWJraXRBcHBlYXJhbmNlOiBcIm5vbmVcIixcclxuICAgIGFwcGVhcmFuY2U6IFwibm9uZVwiLFxyXG4gICAgekluZGV4OiAyLFxyXG4gIH07XHJcblxyXG4gIC8vIFJvem1pYXIgaWtvbiArLy0uIFphXHUwMTQyXHUwMEYzXHUwMTdDbXksIFx1MDE3Q2Ugb3J5Z2luYWxuZSBpa29ueSBzXHUwMTA1IDI0eDI0LlxyXG4gIC8vIENoY2VteSBqZSBwcnplc2thbG93YVx1MDEwNywgYWJ5IHBhc293YVx1MDE0MnkgZG8gcHJ6eWNpc2tcdTAwRjN3LlxyXG4gIC8vIFByenlrXHUwMTQyYWRvd28sIG5pZWNoIHpham11alx1MDEwNSBva29cdTAxNDJvIDUwJSB3eXNva29cdTAxNUJjaSBwcnp5Y2lza3UgKHcgamVkbm9zdGthY2ggdmlld0JveClcclxuICBjb25zdCBpY29uVmlld0JveFNpemUgPSAyNDsgLy8gT3J5Z2luYWxueSByb3ptaWFyIHZpZXdCb3ggaWtvbiArLy1cclxuICBjb25zdCB0YXJnZXRJY29uSGVpZ2h0SW5TdmdVbml0cyA9IHN2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hIZWlnaHQgKiAwLjI1ICpcclxuICAgIChyYXRpb1NJWkUgPiAwLjUgPyAxIDogcmF0aW9TSVpFICogMik7IC8vIG5wLiAyNSUgd3lzb2tvXHUwMTVCY2kgY2FcdTAxNDJlZ28ga29tcG9uZW50dVxyXG4gIGNvbnN0IGljb25BY3R1YWxTY2FsZSA9IDEuNSAqICh0YXJnZXRJY29uSGVpZ2h0SW5TdmdVbml0cyAvIGljb25WaWV3Qm94U2l6ZSk7XHJcblxyXG4gIGxldCBkaXNwbGF5VmFsdWU6IHN0cmluZyA9IFwiXCI7IC8vIElucHV0IHZhbHVlIHphd3N6ZSBqYWtvIHN0cmluZ1xyXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkaXNwbGF5VmFsdWUgPSBTdHJpbmcodmFsdWUpO1xyXG4gIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGRpc3BsYXlWYWx1ZSA9IFN0cmluZyhkZWZhdWx0VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tbW9uU3ZnQnV0dG9uU3R5bGU6IEpTWC5DU1NQcm9wZXJ0aWVzID0ge1xyXG4gICAgY3Vyc29yOiBkaXNhYmxlZCB8fCByZWFkT25seSA/IFwiZGVmYXVsdFwiIDogXCJwb2ludGVyXCIsXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtgJHtDT05UQUlORVJfQ0xBU1NfTkFNRX0gJHt3cmFwcGVyQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICB3aWR0aDogYCR7Y29udGFpbmVyV2lkdGh9cHhgLFxyXG4gICAgICAgIGhlaWdodDogYCR7Y29udGFpbmVySGVpZ2h0fXB4YCxcclxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxyXG4gICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxyXG4gICAgICAgIC4uLnN0eWxlLFxyXG4gICAgICB9fVxyXG4gICAgICB7Li4ucmVzdERpdlByb3BzfVxyXG4gICAgPlxyXG4gICAgICA8c3ZnXHJcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtTVkdfQ0xBU1NfTkFNRX0gJHtzdmdDbGFzc05hbWUgfHwgXCJcIn1gfVxyXG4gICAgICAgIGRhdGEtbmFtZT1cImlucHV0LW51bWJlclwiIC8vIFogVHdvamVnbyBIVE1MXHJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgdmlld0JveD17YDAgMCAke3N2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hXaWR0aH0gJHtzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94SGVpZ2h0fWB9XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcclxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXHJcbiAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICB9fVxyXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICAgID5cclxuICAgICAgICB7LyogR3J1cGEgXCJDaG9vc2UvU2VsZWN0XCIgKi99XHJcbiAgICAgICAgPGdcclxuICAgICAgICAgIGNsYXNzTmFtZT17U1ZHX0JVVFRPTl9DTEFTU19OQU1FfSAvLyBLbGFzYSB6IFR3b2plZ28gSFRNTFxyXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuY2hvb3NlLm5hbWV9IC8vIGRhdGEtbmFtZSB6IFR3b2plZ28gSFRNTFxyXG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkID8gaGFuZGxlQ2hvb3NlQ2xpY2sgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdmdCdXR0b25TdHlsZSwgLi4uKHNlbGVjdEJ1dHRvblN0eWxlIHx8IHt9KSB9fVxyXG4gICAgICAgICAgcG9pbnRlckV2ZW50cz17ZGlzYWJsZWQgPyBcIm5vbmVcIiA6IFwiYXV0b1wifVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuY2hvb3NlLnBhdGhzLm1hcCgocCwgaSkgPT4gKFxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGtleT17YGNob29zZS1wYXRoLSR7aX1gfVxyXG4gICAgICAgICAgICAgIGRhdGEtbmFtZT17cC5kYXRhTmFtZX1cclxuICAgICAgICAgICAgICBkPXtwLmR9XHJcbiAgICAgICAgICAgICAgZmlsbD17c2VsZWN0QnV0dG9uRmlsbCB8fCBwLmRlZmF1bHRGaWxsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9nPlxyXG5cclxuICAgICAgICB7LyogR3J1cGEgXCJJbnB1dCBBcmVhXCIgKi99XHJcbiAgICAgICAgPGdcclxuICAgICAgICAgIGRhdGEtbmFtZT17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEubmFtZX1cclxuICAgICAgICAgIHN0eWxlPXtpbnB1dEFyZWFTdHlsZSB8fCB7fX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8cmVjdFxyXG4gICAgICAgICAgICB4PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0Lnh9XHJcbiAgICAgICAgICAgIHk9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QueX1cclxuICAgICAgICAgICAgd2lkdGg9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3Qud2lkdGh9XHJcbiAgICAgICAgICAgIGhlaWdodD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC5oZWlnaHR9XHJcbiAgICAgICAgICAgIGZpbGw9e2lucHV0QXJlYVJlY3RGaWxsIHx8IHN2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QuZGVmYXVsdEZpbGx9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgZD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEuYm9yZGVyUGF0aC5kfVxyXG4gICAgICAgICAgICBmaWxsPXtpbnB1dEFyZWFCb3JkZXJGaWxsIHx8XHJcbiAgICAgICAgICAgICAgc3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEuYm9yZGVyUGF0aC5kZWZhdWx0RmlsbH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9nPlxyXG5cclxuICAgICAgICB7LyogR3J1cGEgXCJEZWNyZW1lbnRcIiAqL31cclxuICAgICAgICA8Z1xyXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9XHJcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQubmFtZX1cclxuICAgICAgICAgIG9uQ2xpY2s9eyFkaXNhYmxlZCAmJiAhcmVhZE9ubHkgPyBoYW5kbGVEZWNyZW1lbnQgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdmdCdXR0b25TdHlsZSwgLi4uKGRlY3JlbWVudEJ1dHRvblN0eWxlIHx8IHt9KSB9fVxyXG4gICAgICAgICAgcG9pbnRlckV2ZW50cz17ZGlzYWJsZWQgfHwgcmVhZE9ubHkgPyBcIm5vbmVcIiA6IFwiYXV0b1wifVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50LnBhdGhzLm1hcCgocCwgaSkgPT4gKFxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGtleT17YGRlYy1wYXRoLSR7aX1gfVxyXG4gICAgICAgICAgICAgIGRhdGEtbmFtZT17cC5kYXRhTmFtZX1cclxuICAgICAgICAgICAgICBkPXtwLmR9XHJcbiAgICAgICAgICAgICAgZmlsbD17ZGVjcmVtZW50QnV0dG9uRmlsbCB8fCBwLmRlZmF1bHRGaWxsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgICB7LyogSmVcdTAxNUJsaSBjaGNlc3ogZG9kYVx1MDEwNyBpa29uXHUwMTE5IFNWRyBcIi1cIiBuYSB0eW0ga3N6dGFcdTAxNDJjaWUsIHpyXHUwMEYzYiB0byB0dXRhaiwgbnAuOiAqL31cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLyo8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoWCBZKSBzY2FsZShTKVwiPlxyXG4gICAgICAgICAgICB7RGVmYXVsdERlY3JlbWVudEljb25TdmdDb250ZW50fVxyXG4gICAgICAgICAgPC9nPiovXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB7LyogSWtvbmEgRGVjcmVtZW50ICgtKSAqL31cclxuICAgICAgICAgIDxnXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQuaWNvbkFuY2hvclh9LCAke3N2Z0xheW91dERhdGEuYnV0dG9ucy5kZWNyZW1lbnQuaWNvbkFuY2hvcll9KSBzY2FsZSgke2ljb25BY3R1YWxTY2FsZX0pIHRyYW5zbGF0ZSgtJHtcclxuICAgICAgICAgICAgICBpY29uVmlld0JveFNpemUgLyAyXHJcbiAgICAgICAgICAgIH0sIC0ke2ljb25WaWV3Qm94U2l6ZSAvIDJ9KWB9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH19IC8vIElrb255IG5pZSBwb3dpbm55IHByemVjaHd5dHl3YVx1MDEwNyBrbGlrbmlcdTAxMTlcdTAxMDdcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgIHZpZXdCb3g9e2AwIDAgJHtpY29uVmlld0JveFNpemV9ICR7aWNvblZpZXdCb3hTaXplfWB9XHJcbiAgICAgICAgICAgICAgd2lkdGg9e2ljb25WaWV3Qm94U2l6ZX1cclxuICAgICAgICAgICAgICBoZWlnaHQ9e2ljb25WaWV3Qm94U2l6ZX1cclxuICAgICAgICAgICAgICBmaWxsPVwid2hpdGVcIlxyXG4gICAgICAgICAgICAgIG92ZXJmbG93PVwidmlzaWJsZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7RGVmYXVsdERlY3JlbWVudEljb25TdmdDb250ZW50fVxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgIDwvZz5cclxuICAgICAgICA8L2c+XHJcblxyXG4gICAgICAgIHsvKiBHcnVwYSBcIkluY3JlbWVudFwiICovfVxyXG4gICAgICAgIDxnXHJcbiAgICAgICAgICBjbGFzc05hbWU9e1NWR19CVVRUT05fQ0xBU1NfTkFNRX1cclxuICAgICAgICAgIGRhdGEtbmFtZT17c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5uYW1lfVxyXG4gICAgICAgICAgb25DbGljaz17IWRpc2FibGVkICYmICFyZWFkT25seSA/IGhhbmRsZUluY3JlbWVudCA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgIHN0eWxlPXt7IC4uLmNvbW1vblN2Z0J1dHRvblN0eWxlLCAuLi4oaW5jcmVtZW50QnV0dG9uU3R5bGUgfHwge30pIH19XHJcbiAgICAgICAgICBwb2ludGVyRXZlbnRzPXtkaXNhYmxlZCB8fCByZWFkT25seSA/IFwibm9uZVwiIDogXCJhdXRvXCJ9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge3N2Z0xheW91dERhdGEuYnV0dG9ucy5pbmNyZW1lbnQucGF0aHMubWFwKChwLCBpKSA9PiAoXHJcbiAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAga2V5PXtgaW5jLXBhdGgtJHtpfWB9XHJcbiAgICAgICAgICAgICAgZGF0YS1uYW1lPXtwLmRhdGFOYW1lfVxyXG4gICAgICAgICAgICAgIGQ9e3AuZH1cclxuICAgICAgICAgICAgICBmaWxsPXtpbmNyZW1lbnRCdXR0b25GaWxsIHx8IHAuZGVmYXVsdEZpbGx9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICAgIHsvKiBKZVx1MDE1QmxpIGNoY2VzeiBkb2RhXHUwMTA3IGlrb25cdTAxMTkgU1ZHIFwiK1wiIG5hIHR5bSBrc3p0YVx1MDE0MmNpZSwgenJcdTAwRjNiIHRvIHR1dGFqLCBucC46ICovfVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAvKjxnIHRyYW5zZm9ybT1cInRyYW5zbGF0ZShYIFkpIHNjYWxlKFMpXCI+XHJcbiAgICAgICAgICAgIHtEZWZhdWx0SW5jcmVtZW50SWNvblN2Z0NvbnRlbnR9XHJcbiAgICAgICAgICA8L2c+Ki9cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHsvKiBJa29uYSBJbmNyZW1lbnQgKCspICovfVxyXG4gICAgICAgICAgPGdcclxuICAgICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5pY29uQW5jaG9yWH0sICR7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmluY3JlbWVudC5pY29uQW5jaG9yWX0pIHNjYWxlKCR7aWNvbkFjdHVhbFNjYWxlfSkgdHJhbnNsYXRlKC0ke1xyXG4gICAgICAgICAgICAgIGljb25WaWV3Qm94U2l6ZSAvIDJcclxuICAgICAgICAgICAgfSwgLSR7aWNvblZpZXdCb3hTaXplIC8gMn0pYH1cclxuICAgICAgICAgICAgc3R5bGU9e3sgcG9pbnRlckV2ZW50czogXCJub25lXCIgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgIHZpZXdCb3g9e2AwIDAgJHtpY29uVmlld0JveFNpemV9ICR7aWNvblZpZXdCb3hTaXplfWB9XHJcbiAgICAgICAgICAgICAgd2lkdGg9e2ljb25WaWV3Qm94U2l6ZX1cclxuICAgICAgICAgICAgICBoZWlnaHQ9e2ljb25WaWV3Qm94U2l6ZX1cclxuICAgICAgICAgICAgICBmaWxsPVwid2hpdGVcIlxyXG4gICAgICAgICAgICAgIG92ZXJmbG93PVwidmlzaWJsZVwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7RGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50fVxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgIDwvZz5cclxuICAgICAgICA8L2c+XHJcbiAgICAgIDwvc3ZnPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtpbnB1dFJlZn1cclxuICAgICAgICBjbGFzc05hbWU9e2Ake0hUTUxfSU5QVVRfQ0xBU1NfTkFNRX0gJHtpbnB1dENsYXNzTmFtZSB8fCBcIlwifWB9IC8vIEtsYXNhIHogVHdvamVnbyBIVE1MXHJcbiAgICAgICAgdHlwZT1cIm51bWJlclwiXHJcbiAgICAgICAgbmFtZT17bmFtZX1cclxuICAgICAgICBpZD17aWR9XHJcbiAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX0gLy8gZGlzcGxheVZhbHVlIGplc3QganVcdTAxN0Mgc3RyaW5naWVtIGx1YiBwdXN0eW0gc3RyaW5naWVtXHJcbiAgICAgICAgbWluPXttaW59XHJcbiAgICAgICAgbWF4PXttYXh9XHJcbiAgICAgICAgc3RlcD17c3RlcH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxyXG4gICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgICAgb25JbnB1dD17aGFuZGxlSW5wdXRDaGFuZ2V9IC8vIFBvZFx1MDE0Mlx1MDEwNWN6b255IHBvcHJhd255IGhhbmRsZXJcclxuICAgICAgICBzdHlsZT17aHRtbElucHV0U3R5bGV9XHJcbiAgICAgICAgYXJpYS1sYWJlbD17cHJvcHNbXCJhcmlhLWxhYmVsXCJdIHx8IFwiV2FydG9cdTAxNUJcdTAxMDcgbGljemJvd2FcIn1cclxuICAgICAgICB7Li4ucmVzdERpdlByb3BzfVxyXG4gICAgICAvPlxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gWm1pZW5pb25lIHogcmVzdElucHV0UHJvcHMsIGJvIHRlIHNcdTAxMDUgZGxhIGdcdTAxNDJcdTAwRjN3bmVnbyBkaXZhXHJcbiAgICAgICAgLy8gSmVcdTAxNUJsaSBjaGNlc3ogcHJ6ZWthenl3YVx1MDEwNyBkb2RhdGtvd2UgYXRyeWJ1dHkgZG8gaW5wdXRhLFxyXG4gICAgICAgIC8vIG11c2lzeiBqZSBvc29ibm8gb2JzXHUwMTQydVx1MDE3Q3lcdTAxMDcgbHViIG5hendhXHUwMTA3IG5wLiBodG1sSW5wdXRQcm9wc1xyXG4gICAgICB9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiIsICIvLyBEZWZpbmljamUgdHlwXHUwMEYzd1xyXG50eXBlIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXkgPSBudW1iZXIgfCBFeGNlbE5lc3RlZE51bWJlckFycmF5W107XHJcblxyXG5leHBvcnQgdHlwZSBFeGNlbE5lc3RlZE4gPSBFeGNlbE5lc3RlZE51bWJlckFycmF5O1xyXG5leHBvcnQgdHlwZSBFeGNlbFJlc3VsdHMgPSBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE51bWJlckFycmF5PjtcclxuZXhwb3J0IHR5cGUgRXhjZWxTZXRzU2V0ID0ge1xyXG4gIHZhcjogc3RyaW5nOyAvLyBOYXp3YSB6bWllbm5laiB3ZWpcdTAxNUJjaW93ZWpcclxuICB2YWw6IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHptaWVubmVqIChsaWN6YmEgbHViIHphZ25pZVx1MDE3Q2RcdTAxN0NvbmEgdGFibGljYSBsaWN6YilcclxufTtcclxuXHJcbi8vIFR5cCBkbGEgZnVua2NqaSBvYmxpY3plbmlvd2VqOiBwcnp5am11amUgbWFwXHUwMTE5LCB6d3JhY2Egb2JsaWN6b25cdTAxMDUgd2FydG9cdTAxNUJcdTAxMDdcclxudHlwZSBDYWxjdWxhdGlvbkZ1bmN0aW9uID0gKGN1cnJlbnRNYXA6IEV4Y2VsUmVzdWx0cykgPT4gRXhjZWxOZXN0ZWROdW1iZXJBcnJheTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4Y2VsU2V0c0dldCA9IHtcclxuICB2YXI6IHN0cmluZzsgLy8gTmF6d2Egbm93ZWosIG9ibGljem9uZWogem1pZW5uZWpcclxuICB2YWw6IENhbGN1bGF0aW9uRnVuY3Rpb247IC8vIEZ1bmtjamEgb2JsaWN6YWpcdTAxMDVjYSB3YXJ0b1x1MDE1Qlx1MDEwNyB0ZWogem1pZW5uZWpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm1pZW5pb25vIHogYGZ1bmAgbmEgYHZhbGAgemdvZG5pZSB6IFR3b2ltIHByenlrXHUwMTQyYWRlbSB1XHUwMTdDeWNpYVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZ1bmtjamEgRXhjZWwgcHJ6ZXR3YXJ6YSB3YXJ0b1x1MDE1QmNpIHdlalx1MDE1QmNpb3dlIGkgd3lrb251amUgemRlZmluaW93YW5lIG9ibGljemVuaWEuXHJcbiAqIEBwYXJhbSBpbnB1dFZhbHVlcyBXYXJ0b1x1MDE1QmNpIHBvY3pcdTAxMDV0a293ZSBkbyB1bWllc3pjemVuaWEgdyBtYXBpZS5cclxuICogQHBhcmFtIGNhbGNzVmFsdWVzIERlZmluaWNqZSBvYmxpY3plXHUwMTQ0IGRvIHd5a29uYW5pYS5cclxuICogQHJldHVybnMgTWFwYSB6YXdpZXJhalx1MDEwNWNhIHdzenlzdGtpZSB3YXJ0b1x1MDE1QmNpIHdlalx1MDE1QmNpb3dlIGkgb2JsaWN6b25lLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEV4Y2VsKFxyXG4gIGlucHV0VmFsdWVzOiBFeGNlbFNldHNTZXQgfCBFeGNlbFNldHNTZXRbXSxcclxuICBjYWxjc1ZhbHVlcz86IEV4Y2VsU2V0c0dldCB8IEV4Y2VsU2V0c0dldFtdIC8vIERydWdpIGFyZ3VtZW50IGplc3Qgb3Bjam9uYWxueVxyXG4pOiBFeGNlbFJlc3VsdHMgeyAvLyBad3JhY2FteSBtYXBcdTAxMTkgeiBiYXJkemllaiBzemN6ZWdcdTAwRjNcdTAxNDJvd3ltIHR5cGVtXHJcbiAgXHJcbiAgLy8gSW5pY2phbGl6YWNqYSBtYXB5IHogcG9wcmF3bnltaSB0eXBhbWlcclxuICBjb25zdCBNOkV4Y2VsUmVzdWx0cyA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE51bWJlckFycmF5PigpO1xyXG5cclxuICAvLyAxLiBQcnpldHdhcnphbmllIHdhcnRvXHUwMTVCY2kgd2VqXHUwMTVCY2lvd3ljaCAoaW5wdXRWYWx1ZXMpXHJcbiAgLy8gTm9ybWFsaXphY2phIGlucHV0VmFsdWVzIGRvIHRhYmxpY3ksIGplXHUwMTVCbGkgcHJ6ZWthemFubyBwb2plZHluY3p5IG9iaWVrdFxyXG4gIGNvbnN0IHJlc29sdmVkSW5wdXRWYWx1ZXMgPSAhQXJyYXkuaXNBcnJheShpbnB1dFZhbHVlcykgPyBbaW5wdXRWYWx1ZXNdIDogaW5wdXRWYWx1ZXM7XHJcbiAgcmVzb2x2ZWRJbnB1dFZhbHVlcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgTS5zZXQoaXRlbS52YXIsIGl0ZW0udmFsKTtcclxuICB9KTtcclxuXHJcbiAgLy8gMi4gUHJ6ZXR3YXJ6YW5pZSB3YXJ0b1x1MDE1QmNpIG9ibGljemVuaW93eWNoIChjYWxjc1ZhbHVlcylcclxuICBpZiAoY2FsY3NWYWx1ZXMpIHsgLy8gV3lrb25haiB0eWxrbywgamVcdTAxNUJsaSBjYWxjc1ZhbHVlcyB6b3N0YVx1MDE0MnkgZG9zdGFyY3pvbmVcclxuICAgIC8vIE5vcm1hbGl6YWNqYSBjYWxjc1ZhbHVlcyBkbyB0YWJsaWN5LCBqZVx1MDE1QmxpIHByemVrYXphbm8gcG9qZWR5bmN6eSBvYmlla3RcclxuICAgIGNvbnN0IHJlc29sdmVkQ2FsY3NWYWx1ZXMgPSAhQXJyYXkuaXNBcnJheShjYWxjc1ZhbHVlcykgPyBbY2FsY3NWYWx1ZXNdIDogY2FsY3NWYWx1ZXM7XHJcbiAgICBcclxuICAgIHJlc29sdmVkQ2FsY3NWYWx1ZXMuZm9yRWFjaChjYWxjSXRlbSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gV3l3b1x1MDE0MmFuaWUgZnVua2NqaSBvYmxpY3plbmlvd2VqIHVcdTAxN0N5dGtvd25pa2EsIHByemVrYXp1alx1MDEwNWMgYWt0dWFsblx1MDEwNSBtYXBcdTAxMTkgTVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdFZhbHVlID0gY2FsY0l0ZW0udmFsKE0pO1xyXG4gICAgICAgIC8vIFphcGlzYW5pZSB3eW5pa3Ugb2JsaWN6ZVx1MDE0NCBkbyBtYXB5IE1cclxuICAgICAgICBNLnNldChjYWxjSXRlbS52YXIsIHJlc3VsdFZhbHVlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBCXHUwMTQyXHUwMTA1ZCBwb2RjemFzIG9ibGljemFuaWEgem1pZW5uZWogXCIke2NhbGNJdGVtLnZhcn1cIjpgLCBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpO1xyXG4gICAgICAgIC8vIE1vXHUwMTdDZXN6IHpkZWN5ZG93YVx1MDEwNywgamFrIG9ic1x1MDE0MnVcdTAxN0N5XHUwMTA3IGJcdTAxNDJcdTAxMDVkOiBwb21pblx1MDEwNVx1MDEwNywgemFwaXNhXHUwMTA3IGJcdTAxNDJcdTAxMDVkLCBwcnplcndhXHUwMTA3LCBpdHAuXHJcbiAgICAgICAgLy8gTmEgcmF6aWUgemFwaXN1amVteSBgdW5kZWZpbmVkYCwgYWJ5IHdza2F6YVx1MDEwNyBwcm9ibGVtLlxyXG4gICAgICAgIE0uc2V0KGNhbGNJdGVtLnZhciwgdW5kZWZpbmVkIGFzIGFueSk7IC8vIFVcdTAxN0N5d2FteSBgYXMgYW55YCBhYnkgcG96d29saVx1MDEwNyBuYSBgdW5kZWZpbmVkYCB3IG1hcGllIHogdHlwZW0gRXhjZWxOZXN0ZWROdW1iZXJBcnJheVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBNO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJ1amUgdGFibGljXHUwMTE5IGxpY3piIChwcnplZHppYVx1MDE0MikgbyBva3JlXHUwMTVCbG9uZWogbGljemJpZSBlbGVtZW50XHUwMEYzdywga3Jva3UgaSB3YXJ0b1x1MDE1QmNpIHBvY3pcdTAxMDV0a293ZWouXHJcbiAqXHJcbiAqIEBwYXJhbSBzdGFydEF0IFdhcnRvXHUwMTVCXHUwMTA3IHBvY3pcdTAxMDV0a293YSBwaWVyd3N6ZWdvIGVsZW1lbnR1IHcgdGFibGljeS5cclxuICogQHBhcmFtIHN0ZXAgS3JvayAoclx1MDBGM1x1MDE3Q25pY2EpIG1pXHUwMTE5ZHp5IGtvbGVqbnltaSBlbGVtZW50YW1pIHcgdGFibGljeS4gTW9cdTAxN0NlIGJ5XHUwMTA3IGRvZGF0bmksIHVqZW1ueSBsdWIgemVyb3d5LlxyXG4gKiBAcGFyYW0gaXRlbXMgTGljemJhIGVsZW1lbnRcdTAwRjN3IGRvIHd5Z2VuZXJvd2FuaWEgdyB0YWJsaWN5LlxyXG4gKiBAcmV0dXJucyBUYWJsaWNhIGxpY3piIChudW1iZXJbXSkgcmVwcmV6ZW50dWpcdTAxMDVjYSB3eWdlbmVyb3dhbnkgcHJ6ZWR6aWFcdTAxNDIuXHJcbiAqIFp3cmFjYSBwdXN0XHUwMTA1IHRhYmxpY1x1MDExOSwgamVcdTAxNUJsaSBgaXRlbXNgIGplc3QgbW5pZWpzemUgbHViIHJcdTAwRjN3bmUgMC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBTaXplKHN0YXJ0QXQ6IG51bWJlciwgc3RlcDogbnVtYmVyLCBpdGVtczogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gIGlmIChpdGVtcyA8PSAwKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXN1bHQ6IG51bWJlcltdID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtczsgaSsrKSB7XHJcbiAgICByZXN1bHQucHVzaChzdGFydEF0ICsgKGkgKiBzdGVwKSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcnVqZSB0YWJsaWNcdTAxMTkgbGljemIgKHByemVkemlhXHUwMTQyKSwgemFjenluYWpcdTAxMDVjIG9kIGBzdGFydEF0YCwgcG9zdFx1MDExOXB1alx1MDEwNWMgbyBgc3RlcGAsXHJcbiAqIGFcdTAxN0MgZG8gb3NpXHUwMTA1Z25pXHUwMTE5Y2lhIChpIHBvdGVuY2phbG5pZSB3XHUwMTQyXHUwMTA1Y3plbmlhKSBgZW5kQXRgLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RhcnRBdCBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgcGllcndzemVnbyBlbGVtZW50dSB3IHRhYmxpY3kuXHJcbiAqIEBwYXJhbSBzdGVwIEtyb2sgKHJcdTAwRjNcdTAxN0NuaWNhKSBtaVx1MDExOWR6eSBrb2xlam55bWkgZWxlbWVudGFtaSB3IHRhYmxpY3kuIE1vXHUwMTdDZSBieVx1MDEwNyBkb2RhdG5pLCB1amVtbnkgbHViIHplcm93eS5cclxuICogQHBhcmFtIGVuZEF0IFdhcnRvXHUwMTVCXHUwMTA3IGtvXHUwMTQ0Y293YSBwcnplZHppYVx1MDE0MnUuIEVsZW1lbnR5IGJcdTAxMTlkXHUwMTA1IGdlbmVyb3dhbmUgdGFrIGRcdTAxNDJ1Z28sIGpha1xyXG4gKiBkXHUwMTQydWdvIG1pZXN6Y3pcdTAxMDUgc2lcdTAxMTkgdyBwcnplZHppYWxlIG9rcmVcdTAxNUJsb255bSBwcnpleiBgc3RhcnRBdGAsIGBzdGVwYCBpIGBlbmRBdGAgKHdcdTAxNDJcdTAxMDVjem5pZSkuXHJcbiAqIEByZXR1cm5zIFRhYmxpY2EgbGljemIgKG51bWJlcltdKSByZXByZXplbnR1alx1MDEwNWNhIHd5Z2VuZXJvd2FueSBwcnplZHppYVx1MDE0Mi5cclxuICogWndyYWNhIHB1c3RcdTAxMDUgdGFibGljXHUwMTE5LCBqZVx1MDE1QmxpIG5pZSBtb1x1MDE3Q25hIHd5Z2VuZXJvd2FcdTAxMDcgXHUwMTdDYWRueWNoIGVsZW1lbnRcdTAwRjN3XHJcbiAqIChucC4gc3RhcnRBdCA+IGVuZEF0IHByenkgZG9kYXRuaW0ga3Jva3UsIGx1YiBqZVx1MDE1QmxpIHN0ZXA9MCBhIHN0YXJ0QXQgIT09IGVuZEF0KS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBMYXN0KHN0YXJ0QXQ6IG51bWJlciwgc3RlcDogbnVtYmVyLCBlbmRBdDogbnVtYmVyKTogbnVtYmVyW10ge1xyXG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgaWYgKHN0ZXAgPT09IDApIHtcclxuICAgIC8vIEplXHUwMTVCbGkga3JvayB3eW5vc2kgMCwgcHJ6ZWR6aWFcdTAxNDIgbW9cdTAxN0NlIHphd2llcmFcdTAxMDcgdHlsa28gamVkZW4gZWxlbWVudCxcclxuICAgIC8vIGplXHUwMTVCbGkgc3RhcnRBdCBqZXN0IHJcdTAwRjN3bmUgZW5kQXQuXHJcbiAgICBpZiAoc3RhcnRBdCA9PT0gZW5kQXQpIHtcclxuICAgICAgcmVzdWx0LnB1c2goc3RhcnRBdCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0OyAvLyBad3JhY2EgW3N0YXJ0QXRdIGx1YiBbXVxyXG4gIH1cclxuXHJcbiAgaWYgKHN0ZXAgPiAwKSB7XHJcbiAgICAvLyBLcm9rIGRvZGF0bmk6IGlkemllbXkgdyBnXHUwMEYzclx1MDExOVxyXG4gICAgaWYgKHN0YXJ0QXQgPiBlbmRBdCkge1xyXG4gICAgICByZXR1cm4gcmVzdWx0OyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgamVzdCBqdVx1MDE3QyB6YSB3YXJ0b1x1MDE1QmNpXHUwMTA1IGtvXHUwMTQ0Y293XHUwMTA1XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBjdXJyZW50VmFsdWUgPSBzdGFydEF0OyBjdXJyZW50VmFsdWUgPD0gZW5kQXQ7IGN1cnJlbnRWYWx1ZSArPSBzdGVwKSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHsgLy8gc3RlcCA8IDBcclxuICAgIC8vIEtyb2sgdWplbW55OiBpZHppZW15IHcgZFx1MDBGM1x1MDE0MlxyXG4gICAgaWYgKHN0YXJ0QXQgPCBlbmRBdCkge1xyXG4gICAgICByZXR1cm4gcmVzdWx0OyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgamVzdCBqdVx1MDE3QyB6YSB3YXJ0b1x1MDE1QmNpXHUwMTA1IGtvXHUwMTQ0Y293XHUwMTA1ICh3IHpcdTAxNDJcdTAxMDUgc3Ryb25cdTAxMTkpXHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBjdXJyZW50VmFsdWUgPSBzdGFydEF0OyBjdXJyZW50VmFsdWUgPj0gZW5kQXQ7IGN1cnJlbnRWYWx1ZSArPSBzdGVwKSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vLyBBbHRlcm5hdHl3bmEsIGJhcmR6aWVqIHp3aVx1MDExOXpcdTAxNDJhIGltcGxlbWVudGFjamEgdVx1MDE3Q3l3YWpcdTAxMDVjYSBBcnJheS5mcm9tIChkemlhXHUwMTQyYSB0YWsgc2Ftbyk6XHJcbi8qXHJcbmZ1bmN0aW9uIGluaXRSYW5nZUZpcnN0U3RlcFNpemVBbHRlcm5hdGl2ZShpdGVtczogbnVtYmVyLCBzdGVwOiBudW1iZXIsIHN0YXJ0QXQ6IG51bWJlcik6IG51bWJlcltdIHtcclxuICBpZiAoaXRlbXMgPD0gMCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogaXRlbXMgfSwgKF8sIGluZGV4KSA9PiBzdGFydEF0ICsgaW5kZXggKiBzdGVwKTtcclxufVxyXG5cclxuY29uc29sZS5sb2coXCItLS0gVGVzdCBhbHRlcm5hdHl3bmVqIGltcGxlbWVudGFjamkgLS0tXCIpO1xyXG5jb25zdCByYW5nZTFfYWx0ID0gaW5pdFJhbmdlRmlyc3RTdGVwU2l6ZUFsdGVybmF0aXZlKDUsIDIsIDEwKTtcclxuY29uc29sZS5sb2coXCJSYW5nZSAxIEFsdCAoaXRlbXM6IDUsIHN0ZXA6IDIsIHN0YXJ0QXQ6IDEwKTpcIiwgcmFuZ2UxX2FsdCk7XHJcbiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeGNlbDtcclxuXHJcbi8vIC0tLSBQcnp5a1x1MDE0MmFkIHVcdTAxN0N5Y2lhIC0tLVxyXG4vLy8vIERlZmluaWNqYSB3YXJ0b1x1MDE1QmNpIHdlalx1MDE1QmNpb3d5Y2hcclxuLy9jb25zdCBpbnB1dHM6IEV4Y2VsU2V0c1NldFtdID0gW1xyXG4vLyAgeyB2YXI6IFwiaVwiLCB2YWw6IFsxLCAyLCAzLCA0LCA1LCA2LCA3XSB9LFxyXG4vLyAgeyB2YXI6IFwialwiLCB2YWw6IFsxLCAzLCAyLCA3LCA2LCA1LCA0XSB9XHJcbi8vXTtcclxuLy9cclxuLy8vLyBEZWZpbmljamEgb2JsaWN6ZVx1MDE0NFxyXG4vL2NvbnN0IGNhbGN1bGF0aW9uczogRXhjZWxTZXRzR2V0W10gPSBbXHJcbi8vICB7XHJcbi8vICAgIHZhcjogXCJpal9zdW1cIiwgLy8gTm93YSB6bWllbm5hLCBrdFx1MDBGM3JhIGJcdTAxMTlkemllIHN1bVx1MDEwNSBpW2tdICsgaltrXVxyXG4vLyAgICB2YWw6IChjdXJyZW50TWFwKSA9PiB7XHJcbi8vICAgICAgLy8gUG9iaWVyYW15IHRhYmxpY2UgJ2knIG9yYXogJ2onIHogbWFweVxyXG4vLyAgICAgIGNvbnN0IGlBcnJheSA9IGN1cnJlbnRNYXAuZ2V0KFwiaVwiKTtcclxuLy8gICAgICBjb25zdCBqQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImpcIik7XHJcbi8vXHJcbi8vICAgICAgLy8gV2FcdTAxN0NuZTogU3ByYXdkemVuaWUgdHlwXHUwMEYzdyBpIG9ic1x1MDE0MnVnYSBiXHUwMTQyXHUwMTE5ZFx1MDBGM3cgd2V3blx1MDEwNXRyeiBmdW5rY2ppIHVcdTAxN0N5dGtvd25pa2FcclxuLy8gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaUFycmF5KSB8fCAhQXJyYXkuaXNBcnJheShqQXJyYXkpKSB7XHJcbi8vICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJabWllbm5lICdpJyBvcmF6ICdqJyBtdXN6XHUwMTA1IGJ5XHUwMTA3IHRhYmxpY2FtaSBkbGEgdGVqIG9wZXJhY2ppIHN1bW93YW5pYS5cIik7XHJcbi8vICAgICAgfVxyXG4vLyAgICAgIGlmIChpQXJyYXkuc29tZShpc05hTikgfHwgakFycmF5LnNvbWUoaXNOYU4pKSB7XHJcbi8vICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldzenlzdGtpZSBlbGVtZW50eSB3IHRhYmxpY2FjaCAnaScgb3JheiAnaicgbXVzelx1MDEwNSBieVx1MDEwNyBsaWN6YmFtaS5cIik7XHJcbi8vICAgICAgfVxyXG4vLyAgICAgIGlmIChpQXJyYXkubGVuZ3RoICE9PSBqQXJyYXkubGVuZ3RoKSB7XHJcbi8vICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUYWJsaWNlICdpJyBvcmF6ICdqJyBtdXN6XHUwMTA1IG1pZVx1MDEwNyB0YWtcdTAxMDUgc2FtXHUwMTA1IGRcdTAxNDJ1Z29cdTAxNUJcdTAxMDcgZG8gc3Vtb3dhbmlhIGVsZW1lbnQgcG8gZWxlbWVuY2llLlwiKTtcclxuLy8gICAgICB9XHJcbi8vXHJcbi8vICAgICAgLy8gV3lrb25hbmllIG9wZXJhY2ppIHN1bW93YW5pYSBlbGVtZW50IHBvIGVsZW1lbmNpZVxyXG4vLyAgICAgIC8vIFpha1x1MDE0MmFkYW15LCBcdTAxN0NlIHNcdTAxMDUgdG8gcFx1MDE0MmFza2llIHRhYmxpY2UgbGljemIsIHpnb2RuaWUgeiBwcnp5a1x1MDE0MmFkZW0uXHJcbi8vICAgICAgLy8gRGxhIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXkgb3BlcmFjamEgYnlcdTAxNDJhYnkgYmFyZHppZWogelx1MDE0Mm9cdTAxN0NvbmEgKHJla3VyZW5jeWpuYSkuXHJcbi8vICAgICAgcmV0dXJuIGlBcnJheS5tYXAoKHZhbF9pLCBpbmRleCkgPT4gKHZhbF9pIGFzIG51bWJlcikgKyAoakFycmF5W2luZGV4XSBhcyBudW1iZXIpKTtcclxuLy8gICAgfVxyXG4vLyAgfSxcclxuLy8gIHtcclxuLy8gICAgdmFyOiBcImtcIiwgLy8gUHJ6eWtcdTAxNDJhZCBpbm5laiB6bWllbm5laiwgbnAuIHNrYWxhclxyXG4vLyAgICB2YWw6ICgpID0+IDEwMCAvLyBQcm9zdGEgZnVua2NqYSB6d3JhY2FqXHUwMTA1Y2Egd2FydG9cdTAxNUJcdTAxMDdcclxuLy8gIH0sXHJcbi8vICB7XHJcbi8vICAgIHZhcjogXCJpX3BsdXNfa1wiLCAvLyBQcnp5a1x1MDE0MmFkIG9wZXJhY2ppIHRhYmxpY2EgKyBza2FsYXIgKGJyb2FkY2FzdGluZylcclxuLy8gICAgdmFsOiAoY3VycmVudE1hcCkgPT4ge1xyXG4vLyAgICAgICAgY29uc3QgaUFycmF5ID0gY3VycmVudE1hcC5nZXQoXCJpXCIpO1xyXG4vLyAgICAgICAgY29uc3Qga1ZhbCA9IGN1cnJlbnRNYXAuZ2V0KFwia1wiKTtcclxuLy9cclxuLy8gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpQXJyYXkpIHx8IHR5cGVvZiBrVmFsICE9PSAnbnVtYmVyJykge1xyXG4vLyAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIidpJyBtdXNpIGJ5XHUwMTA3IHRhYmxpY1x1MDEwNSwgYSAnaycgbGljemJcdTAxMDUuXCIpO1xyXG4vLyAgICAgICAgfVxyXG4vLyAgICAgICAgcmV0dXJuIGlBcnJheS5tYXAodmFsX2kgPT4gKHZhbF9pIGFzIG51bWJlcikgKyAoa1ZhbCBhcyBudW1iZXIpKTtcclxuLy8gICAgfVxyXG4vLyAgfVxyXG4vL107XHJcbi8vXHJcbi8vLy8gV3l3b1x1MDE0MmFuaWUgZnVua2NqaSBFeGNlbFxyXG4vL2NvbnN0IEExID0gRXhjZWwoaW5wdXRzLCBjYWxjdWxhdGlvbnMpO1xyXG4vL1xyXG4vLy8vIFd5XHUwMTVCd2lldGxlbmllIHd5bmlrXHUwMEYzd1xyXG4vL2NvbnNvbGUubG9nKFwiQ2FcdTAxNDJhIG1hcGEgQTE6XCIsIEExKTtcclxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaScpOlwiLCBBMS5nZXQoXCJpXCIpKTtcclxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaicpOlwiLCBBMS5nZXQoXCJqXCIpKTtcclxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaWpfc3VtJyk6XCIsIEExLmdldChcImlqX3N1bVwiKSk7IC8vIE9jemVraXdhbmU6IFsyLCA1LCA1LCAxMSwgMTEsIDExLCAxMV1cclxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaycpOlwiLCBBMS5nZXQoXCJrXCIpKTsgICAgICAgICAvLyBPY3pla2l3YW5lOiAxMDBcclxuLy9jb25zb2xlLmxvZyhcIkExLmdldCgnaV9wbHVzX2snKTpcIiwgQTEuZ2V0KFwiaV9wbHVzX2tcIikpOyAvLyBPY3pla2l3YW5lOiBbMTAxLCAxMDIsIDEwMywgMTA0LCAxMDUsIDEwNiwgMTA3XVxyXG4vL2NvbnNvbGUubG9nKFwiV2FydG9cdTAxNUJcdTAxMDcgaVszXSAoaW5kZWtzIDMsIGN6eWxpIGN6d2FydHkgZWxlbWVudCk6XCIsIChBMS5nZXQoXCJpXCIpIGFzIG51bWJlcltdKVszXSk7IC8vIE9jemVraXdhbmU6IDRcclxuIiwgImV4cG9ydCBmdW5jdGlvbiBmbG9vckxvZzIoeDpudW1iZXIpOm51bWJlciB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5sb2cyKHgpKTtcclxufVxyXG5cclxuLy8gIHRvIGtsYXN5Y3puYSBwb3RcdTAxMTlnYSBkd1x1MDBGM2praS5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvdzIoeDpudW1iZXIpOm51bWJlciB7XHJcbiAgcmV0dXJuIE1hdGgucG93KDIseCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG93MkFmZmluZSh4OiBudW1iZXIsIGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHJldHVybiBhICogMiAqKiAoeCArIGIpICsgYztcclxufVxyXG5cclxuLy8gIHdhbHVhY2phIGR3dS1hZHljem5hIGxpY3pieSBuYXR1cmFsbmVqIGRvZGF0bmllaiBcclxuLy8gIGN6eWxpIG5handpXHUwMTE5a3N6XHUwMTA1IHBvdFx1MDExOWdcdTAxMTkgbGljemJ5IDIsIGt0XHUwMEYzcmEgZHppZWxpIHhcclxuLy8gIG1hcGxlIGBrIDo9IHggLT4gaWxvZzIoeCAtIEJpdHNbQW5kXSh4LCB4IC0gMSkpYFxyXG4vLyAgayh4KT1vcmRfMih4KVxyXG4vLyAgQ3p5bGk6IGlsZSByYXp5IHggbW9cdTAxN0NuYSBwb2R6aWVsaVx1MDEwNyBwcnpleiAyLCB6YW5pbSBwcnplc3RhbmllIGJ5XHUwMTA3IGNhXHUwMTQya293aXRlIFxyXG4vLyAgKGx1Yiwgclx1MDBGM3dub3puYWN6bmllLCBwb3p5Y2phIG5ham1cdTAxNDJvZHN6ZWdvIHVzdGF3aW9uZWdvIGJpdHUgdyB4KS5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbDJBZGljKHg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgaWYgKHggPD0gMCB8fCAhTnVtYmVyLmlzSW50ZWdlcih4KSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgbXVzaSBieVx1MDEwNyBkb2RhdG5pXHUwMTA1IGxpY3piXHUwMTA1IGNhXHUwMTQya293aXRcdTAxMDUuXCIpO1xyXG4gIH1cclxuICByZXR1cm4gTWF0aC5sb2cyKHggJiAteCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3cyQWZmaW5lX3ZhbDJBZGljKHg6IG51bWJlciwgYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlcik6IG51bWJlciB7XHJcbiAgcmV0dXJuIGEgKiAyICoqICh2YWwyQWRpYyh4KSArIGIpICsgYztcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RWYWxOYXR1cmFsUG9zKHZhbDp1bmtub3duKTpib29sZWFuIHtcclxuICByZXR1cm4gKHR5cGVvZiB2YWwgIT09IFwibnVtYmVyXCIgfHwgaXNOYU4odmFsKSB8fCAhTnVtYmVyLmlzSW50ZWdlcih2YWwpIHx8XHJcbiAgdmFsIDw9IDApO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVybyh2YWw6dW5rbm93bik6Ym9vbGVhbiB7XHJcbiAgcmV0dXJuICh0eXBlb2YgdmFsICE9PSBcIm51bWJlclwiIHx8IGlzTmFOKHZhbCkgfHwgIU51bWJlci5pc0ludGVnZXIodmFsKSB8fFxyXG4gIHZhbCA8IDApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdFNvbU5vdE9mVmFsc0FycmF5KHY6c3RyaW5nLCBhcnI6dW5rbm93biwgdGVzdDpcImlzTm90VmFsTmF0dXJhbFBvc1wifFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIik6dm9pZCB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYFptaWVubmUgJHt2fSAgbXVzelx1MDEwNSBieVx1MDEwNyB0YWJsaWNhbWkuYCxcclxuICAgICk7XHJcbiAgfVxyXG4gIHN3aXRjaCAodGVzdCkge1xyXG4gICAgY2FzZSBcImlzTm90VmFsTmF0dXJhbFBvc1wiOlxyXG4gICAgICBpZiAoYXJyLnNvbWUoaXNOb3RWYWxOYXR1cmFsUG9zKSkge3Rocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgIGBXc3p5c3RraWUgZWxlbWVudHkgdyB0YWJsaWN5ICR7dn0gbXVzelx1MDEwNSBieVx1MDEwNyBsaWN6YmFtaSBuYXR1cmFsbnltaSBkb2RhdG5pbWkgKHdpXHUwMTE5a3N6eW1pIG9kIDApLmAsXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiOlxyXG4gICAgICBpZiAoYXJyLnNvbWUoaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm8pKSB7dGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIGBXc3p5c3RraWUgZWxlbWVudHkgdyB0YWJsaWN5ICR7dn0gbXVzelx1MDEwNSBieVx1MDEwNyBsaWN6YmFtaSBuYXR1cmFsbnltaSBkb2RhdG5pbWkgeiB6ZXJvICh3aVx1MDExOWtzenltaSBvZCAtMSkuYCxcclxuICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn1cclxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cclxuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cclxuXHJcbmltcG9ydCB7IEpTWCB9IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOFwiO1xyXG5cclxuLy8gWmFcdTAxNDJcdTAwRjNcdTAxN0NteSwgXHUwMTdDZSB0ZSB0eXB5IHNcdTAxMDUgemRlZmluaW93YW5lIGdsb2JhbG5pZSBsdWIgaW1wb3J0b3dhbmVcclxuLy8gSmVcdTAxNUJsaSBuaWUsIG9ka29tZW50dWogamUgbHViIHByemVuaWVcdTAxNUIgZG8gd3NwXHUwMEYzbG5lZ28gcGxpa3UgdHlwXHUwMEYzdy5cclxudHlwZSBOZXN0ZWROdW1iZXJBcnJheSA9IG51bWJlciB8IE5lc3RlZE51bWJlckFycmF5W107XHJcbnR5cGUgRXhjZWxSZXN1bHRzID0gTWFwPHN0cmluZywgTmVzdGVkTnVtYmVyQXJyYXk+O1xyXG5cclxuaW50ZXJmYWNlIFBsb3RFeGNlbFByb3BzIHtcclxuICBkYXRhOiBFeGNlbFJlc3VsdHM7XHJcbiAgdHlwZTogXCJyb3dcIiB8IFwiY29sXCI7IC8vIE9yaWVudGFjamEgdGFiZWxpOiBcInJvd1wiIChkYW5lIHcgd2llcnN6YWNoKSwgXCJjb2xcIiAoZGFuZSB3IGtvbHVtbmFjaClcclxuICBjYXB0aW9uPzogc3RyaW5nOyAvLyBPcGNqb25hbG55IHBvZHBpcyB0YWJlbGlcclxuICB0YWJsZUNsYXNzTmFtZT86IHN0cmluZzsgLy8gT3Bjam9uYWxuYSBrbGFzYSBDU1MgZGxhIHRhYmVsaVxyXG4gIHRoQ2xhc3NOYW1lPzogc3RyaW5nOyAvLyBPcGNqb25hbG5hIGtsYXNhIENTUyBkbGEga29tXHUwMEYzcmVrIHRoXHJcbiAgdGRDbGFzc05hbWU/OiBzdHJpbmc7IC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSBrb21cdTAwRjNyZWsgdGRcclxufVxyXG5cclxuLy8gRnVua2NqYSBwb21vY25pY3phIGRvIGZvcm1hdG93YW5pYSB3YXJ0b1x1MDE1QmNpIGtvbVx1MDBGM3JraVxyXG5jb25zdCBmb3JtYXRDZWxsVmFsdWUgPSAodmFsdWU6IE5lc3RlZE51bWJlckFycmF5IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAvLyBEbGEgemFnbmllXHUwMTdDZFx1MDE3Q29ueWNoIHRhYmxpYywgSlNPTi5zdHJpbmdpZnkgbW9cdTAxN0NlIGJ5XHUwMTA3IGRvYnJ5bSByb3p3aVx1MDEwNXphbmllbS5cclxuICAgIC8vIERsYSBwXHUwMTQyYXNraWNoIHRhYmxpYyBsaWN6YiwgbW9cdTAxN0NuYSB1XHUwMTdDeVx1MDEwNyB2YWx1ZS5qb2luKCcsICcpLlxyXG4gICAgLy8gVHV0YWogd3liaWVyYW15IEpTT04uc3RyaW5naWZ5IGRsYSBvZ1x1MDBGM2xub1x1MDE1QmNpLlxyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgcmV0dXJuIFwiW0JcdTAxNDJcdTAxMDVkIHNlcmlhbGl6YWNqaSB0YWJsaWN5XVwiO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gU3RyaW5nKHZhbHVlKTsgLy8gRmFsbGJhY2tcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQbG90RXhjZWwoXHJcbiAgeyBkYXRhLCB0eXBlLCBjYXB0aW9uLCB0YWJsZUNsYXNzTmFtZSwgdGhDbGFzc05hbWUsIHRkQ2xhc3NOYW1lIH06XHJcbiAgICBQbG90RXhjZWxQcm9wcyxcclxuKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcclxuICBpZiAoIWRhdGEgfHwgZGF0YS5zaXplID09PSAwKSB7XHJcbiAgICByZXR1cm4gPHA+QnJhayBkYW55Y2ggZG8gd3lcdTAxNUJ3aWV0bGVuaWEuPC9wPjsgLy8gTHViIG51bGwsIGplXHUwMTVCbGkgbmllIGNoY2VzeiBuaWMgcmVuZGVyb3dhXHUwMTA3XHJcbiAgfVxyXG5cclxuICBjb25zdCBrZXlzID0gQXJyYXkuZnJvbShkYXRhLmtleXMoKSk7XHJcblxyXG4gIC8vIFVzdGFsZW5pZSBtYWtzeW1hbG5laiBkXHUwMTQydWdvXHUwMTVCY2kgc2VyaWkgZGFueWNoIChkbGEgd3lyXHUwMEYzd25hbmlhIHRhYmVsaSlcclxuICBsZXQgbWF4TGVuZ3RoID0gMDtcclxuICBsZXQgaGFzQW55RGF0YSA9IGZhbHNlO1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gZGF0YS5nZXQoa2V5KTtcclxuICAgIGhhc0FueURhdGEgPSB0cnVlO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgIG1heExlbmd0aCA9IE1hdGgubWF4KG1heExlbmd0aCwgdmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gSmVcdTAxNUJsaSBzXHUwMTA1IGRhbmUsIGFsZSBuaWUgbWEgdGFibGljIChucC4gc2FtZSBza2FsYXJ5KSBsdWIgd3N6eXN0a2llIHRhYmxpY2Ugc1x1MDEwNSBwdXN0ZSxcclxuICAvLyB0byBrYVx1MDE3Q2RhIHNlcmlhIG1hIGVmZWt0eXduaWUgXCJkXHUwMTQydWdvXHUwMTVCXHUwMTA3XCIgMS5cclxuICBpZiAoaGFzQW55RGF0YSAmJiBtYXhMZW5ndGggPT09IDApIHtcclxuICAgIG1heExlbmd0aCA9IDE7XHJcbiAgfVxyXG4gIGlmIChtYXhMZW5ndGggPT09IDAgJiYga2V5cy5sZW5ndGggPiAwKSB7IC8vIEplXHUwMTVCbGkgc1x1MDEwNSBrbHVjemUsIGFsZSBicmFrIGRhbnljaCAobnAuIG1hcG93YW5pZSBuYSB1bmRlZmluZWQpXHJcbiAgICBtYXhMZW5ndGggPSAxOyAvLyBQb2thXHUwMTdDIHByenluYWptbmllaiBuYWdcdTAxNDJcdTAwRjN3a2lcclxuICB9XHJcblxyXG4gIGlmICh0eXBlID09PSBcImNvbFwiKSB7XHJcbiAgICAvLyBTdGFuZGFyZG93YSB0YWJlbGE6IGtsdWN6ZSBtYXB5IGpha28gbmFnXHUwMTQyXHUwMEYzd2tpIGtvbHVtblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT17dGFibGVDbGFzc05hbWV9PlxyXG4gICAgICAgIHtjYXB0aW9uICYmIDxjYXB0aW9uPntjYXB0aW9ufTwvY2FwdGlvbj59XHJcbiAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICB7a2V5cy5tYXAoKGtleSkgPT4gKFxyXG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9e3RoQ2xhc3NOYW1lfSBrZXk9e2tleX0+XHUzMDEwe2tleX1cdTMwMTE8L3RoPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90aGVhZD5cclxuICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogbWF4TGVuZ3RoIH0pLm1hcCgoXywgcm93SW5kZXgpID0+IChcclxuICAgICAgICAgICAgPHRyIGtleT17YHJvdy0ke3Jvd0luZGV4fWB9PlxyXG4gICAgICAgICAgICAgIHtrZXlzLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXJpZXMgPSBkYXRhLmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbGxDb250ZW50OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VyaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICBjZWxsQ29udGVudCA9IGZvcm1hdENlbGxWYWx1ZShzZXJpZXNbcm93SW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocm93SW5kZXggPT09IDApIHsgLy8gV2FydG9cdTAxNUJcdTAxMDcgc2thbGFybmEsIHd5XHUwMTVCd2lldGwgdHlsa28gdyBwaWVyd3N6eW0gd2llcnN6dVxyXG4gICAgICAgICAgICAgICAgICBjZWxsQ29udGVudCA9IGZvcm1hdENlbGxWYWx1ZShzZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT17dGRDbGFzc05hbWV9IGtleT17YCR7a2V5fS1yb3ctJHtyb3dJbmRleH1gfT5cclxuICAgICAgICAgICAgICAgICAgICB7Y2VsbENvbnRlbnR9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgICk7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSBcInJvd1wiKSB7XHJcbiAgICAvLyBUYWJlbGEgdHJhbnNwb25vd2FuYToga2x1Y3plIG1hcHkgamFrbyBuYWdcdTAxNDJcdTAwRjN3a2kgd2llcnN6eVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT17dGFibGVDbGFzc05hbWV9PlxyXG4gICAgICAgIHtjYXB0aW9uICYmIDxjYXB0aW9uPntjYXB0aW9ufTwvY2FwdGlvbj59XHJcbiAgICAgICAgey8qIE1vXHUwMTdDbmEgZG9kYVx1MDEwNyA8dGhlYWQ+IHogbmFnXHUwMTQyXHUwMEYzd2thbWkga29sdW1uLCBqZVx1MDE1QmxpIHNcdTAxMDUgcG90cnplYm5lLCBucC4gXCJQYXJhbWV0clwiLCBcIldhcnRvXHUwMTVCXHUwMTA3IDFcIiwgXCJXYXJ0b1x1MDE1Qlx1MDEwNyAyXCIsIC4uLiAqL31cclxuICAgICAgICB7LyogRGxhIHVwcm9zemN6ZW5pYSwgcG9taWphbXkgPHRoZWFkPiB0dXRhaiwgYSBwaWVyd3N6eSA8dGg+IHcga2FcdTAxN0NkeW0gd2llcnN6dSBkemlhXHUwMTQyYSBqYWtvIG5hZ1x1MDE0Mlx1MDBGM3dlayB3aWVyc3phICovfVxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIHtrZXlzLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcmllcyA9IGRhdGEuZ2V0KGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPHRyIGtleT17YHNlcmllcy1yb3ctJHtrZXl9YH0+XHJcbiAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJyb3dcIiBjbGFzc05hbWU9e3RoQ2xhc3NOYW1lfT5cdTMwMTB7a2V5fVx1MzAxMTwvdGg+e1wiIFwifVxyXG4gICAgICAgICAgICAgICAgey8qIE5hZ1x1MDE0Mlx1MDBGM3dlayB3aWVyc3phICovfVxyXG4gICAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IG1heExlbmd0aCB9KS5tYXAoKF8sIGNvbEluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBjZWxsQ29udGVudDogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VyaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllc1tjb2xJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbEluZGV4ID09PSAwKSB7IC8vIFdhcnRvXHUwMTVCXHUwMTA3IHNrYWxhcm5hLCB3eVx1MDE1QndpZXRsIHR5bGtvIHcgcGllcndzemVqIGtvbHVtbmllIGRhbnljaFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPXt0ZENsYXNzTmFtZX0ga2V5PXtgJHtrZXl9LWNvbC0ke2NvbEluZGV4fWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAge2NlbGxDb250ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gPHA+TmllcHJhd2lkXHUwMTQyb3d5IHR5cCB0YWJlbGk6IHt0eXBlfTwvcD47IC8vIEZhbGxiYWNrXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsY0FBYzs7O0FDQXZCLFNBQWlCLGlCQUFpQjs7O0FDQ2xDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQVFMLFNBR0EsVUFIQSxLQUdBLFlBSEE7QUFERixJQUFNLGlDQUNKLG9CQUFDLFVBQUssR0FBRSxLQUFJLEdBQUUsTUFBSyxPQUFNLE1BQUssUUFBTyxLQUFJLElBQUcsS0FBSTtBQUVsRCxJQUFNLGlDQUNKLGlDQUNFO0FBQUEsc0JBQUMsVUFBSyxHQUFFLE1BQUssR0FBRSxLQUFJLE9BQU0sS0FBSSxRQUFPLE1BQUssSUFBRyxLQUFJO0FBQUEsRUFDaEQsb0JBQUMsVUFBSyxHQUFFLEtBQUksR0FBRSxNQUFLLE9BQU0sTUFBSyxRQUFPLEtBQUksSUFBRyxLQUFJO0FBQUEsR0FDbEQ7QUFvQ0YsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixrQkFBa0I7QUFBQSxFQUNsQixtQkFBbUI7QUFBQSxFQUNuQixTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxVQUFVO0FBQUEsVUFDVixHQUFHO0FBQUEsVUFDSCxhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLEdBQUc7QUFBQSxVQUNILGFBQ0U7QUFBQTtBQUFBLFFBQ0o7QUFBQSxN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QUcsMkRBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLDJEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRyxtRkFFSjtBQUFBLFlBQ0EsZ0JBQUFBLEtBQUMsUUFBRyxtRkFFSjtBQUFBLFlBQ0EsZ0JBQUFBLEtBQUMsUUFBRyxpREFBZTtBQUFBLFlBQ25CLGdCQUFBQSxLQUFDLFFBQUcsaURBQWU7QUFBQSxZQUNuQixnQkFBQUEsS0FBQyxRQUFHLDJEQUFlO0FBQUEsWUFDbkIsZ0JBQUFBLEtBQUMsUUFBRywyREFBZTtBQUFBLFlBQ25CLGdCQUFBQSxLQUFDLFFBQUcsNkNBQVc7QUFBQSxZQUNmLGdCQUFBQSxLQUFDLFFBQUcsNkNBQVc7QUFBQSxhQUNqQixHQUNGO0FBQUE7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUNDLFFBQVEsTUFBTSxPQUFPLEtBQ3BCLGdCQUFBQyxNQUFBRixXQUFBLEVBU0U7QUFBQSxzQkFBQUMsS0FBQyxRQUFHO0FBQUEsTUFDSixnQkFBQUEsS0FBQyxRQUFHLHFDQUFrQjtBQUFBLE1BQ3RCLGdCQUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBTSxRQUFRO0FBQUEsVUFDZCxNQUFLO0FBQUEsVUFDTCxTQUFRO0FBQUE7QUFBQSxNQUNWO0FBQUEsT0FDRjtBQUFBLEtBRUo7QUFFSjs7O0FEN1dPLGdCQUFBRSxZQUFBO0FBQVAsT0FBTyxnQkFBQUEsS0FBQyxPQUFJLEdBQUksU0FBUyxlQUFlLE1BQU0sQ0FBRTsiLAogICJuYW1lcyI6IFsianN4IiwgImpzeHMiLCAiRnJhZ21lbnQiLCAianN4IiwgImpzeHMiLCAianN4Il0KfQo=
