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
function pow2(x) {
  return Math.pow(2, x);
}
function pow2_lastBeforeNext(x) {
  return Math.pow(2, x + 1) - 1;
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
      /* @__PURE__ */ jsx2("thead", { children: /* @__PURE__ */ jsx2("tr", { children: keys.map((key) => /* @__PURE__ */ jsx2("th", { className: thClassName, children: key }, key)) }) }),
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
          /* @__PURE__ */ jsx2("th", { scope: "row", className: thClassName, children: key }),
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
          const iArray = currentM.get("i");
          testSomNotOfValsArray("i", iArray, "isNotValNaturalPos");
          return iArray.map(
            (val_i, _index) => floorLog2(val_i)
          );
        }
      },
      {
        var: "hA",
        val: (currentM) => {
          const hArray = currentM.get("h");
          testSomNotOfValsArray(
            "h",
            hArray,
            "isNotValNaturalPosWithZero"
          );
          return hArray.map((val_h, _index) => pow2(val_h));
        }
      },
      {
        var: "hZ",
        val: (currentM) => {
          const hArray = currentM.get("h");
          testSomNotOfValsArray(
            "h",
            hArray,
            "isNotValNaturalPosWithZero"
          );
          return hArray.map(
            (val_h, _index) => pow2_lastBeforeNext(val_h)
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
          /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsx3("ul", { children: /* @__PURE__ */ jsx3("li", { children: "h = floor(log\u2082(i)) dla przedzia\u0142u [i]" }) }) })
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50c3giLCAiYXBwLnRzeCIsICJ1aS9JbnB1dE51bWJlci50c3giLCAibG9naWMvY2FsY3VsYXRlRXhjZWwudHMiLCAibG9naWMvbWF0aEZ1bmMudHMiLCAidWkvUGxvdEV4Y2VsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3hSdW50aW1lIGF1dG9tYXRpYyAqL1xyXG4vKiogQGpzeEltcG9ydFNvdXJjZSBodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOCAqL1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcclxuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vYXBwLnRzeFwiO1xyXG4vL2FhXHJcbnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikhKTtcclxuIiwgIi8qKiBAanN4UnVudGltZSBhdXRvbWF0aWMgKi9cclxuLyoqIEBqc3hJbXBvcnRTb3VyY2UgaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjggKi9cclxuaW1wb3J0IHsgc2lnbmFsLCB1c2VTaWduYWwgfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvQHByZWFjdC9zaWduYWxzQDIuMi4wXCI7XHJcbmltcG9ydCB7IElucHV0TnVtYmVyIH0gZnJvbSBcIi4vdWkvSW5wdXROdW1iZXIudHN4XCI7IC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2UgXHUwMTVCY2llXHUwMTdDa2EgamVzdCBwb3ByYXduYVxyXG5pbXBvcnQge1xyXG4gIEV4Y2VsLFxyXG4gIHR5cGUgRXhjZWxOZXN0ZWROLFxyXG4gIHR5cGUgRXhjZWxSZXN1bHRzLFxyXG4gIHR5cGUgRXhjZWxTZXRzR2V0LFxyXG4gIHR5cGUgRXhjZWxTZXRzU2V0LFxyXG4gIGluaXRSYW5nZUZpcnN0U3RlcExhc3QsXHJcbiAgLy9pbml0UmFuZ2VGaXJzdFN0ZXBTaXplLFxyXG59IGZyb20gXCIuL2xvZ2ljL2NhbGN1bGF0ZUV4Y2VsLnRzXCI7XHJcbmltcG9ydCAqIGFzIE1hdGhGIGZyb20gXCIuL2xvZ2ljL21hdGhGdW5jLnRzXCI7XHJcbmltcG9ydCB7IFBsb3RFeGNlbCB9IGZyb20gXCIuL3VpL1Bsb3RFeGNlbC50c3hcIjtcclxuXHJcbi8vY29uc3QgcmVzdWx0TSA9IHNpZ25hbDxFeGNlbFJlc3VsdHM+KG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCkpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFwcCgpIHtcclxuICBjb25zdCBmcm9tID0gdXNlU2lnbmFsKDEpO1xyXG4gIGNvbnN0IHRvID0gdXNlU2lnbmFsKDEwKTtcclxuICBjb25zdCByZXN1bHRNID0gdXNlU2lnbmFsPEV4Y2VsUmVzdWx0cz4obmV3IE1hcDxzdHJpbmcsIEV4Y2VsTmVzdGVkTj4oKSk7XHJcblxyXG4gIGNvbnN0IGNhbGN1bGF0ZSA9ICgpID0+IHtcclxuICAgIC8vIFVwZXduaWogc2lcdTAxMTksIFx1MDE3Q2Ugd2FydG9cdTAxNUJjaSBzXHUwMTA1IGxpY3piYW1pIHByemVkIHBcdTAxMTl0bFx1MDEwNVxyXG4gICAgaWYgKGlzTmFOKE51bWJlcihmcm9tLnZhbHVlKSkgfHwgaXNOYU4oTnVtYmVyKHRvLnZhbHVlKSkpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIldhcnRvXHUwMTVCY2kgJ2Zyb20nIGx1YiAndG8nIG5pZSBzXHUwMTA1IGxpY3piYW1pLlwiKTtcclxuICAgICAgcmVzdWx0TS52YWx1ZSA9IG5ldyBNYXA8c3RyaW5nLCBFeGNlbE5lc3RlZE4+KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXRoRW50ZXI6IEV4Y2VsU2V0c1NldFtdID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImlcIixcclxuICAgICAgICB2YWw6IGluaXRSYW5nZUZpcnN0U3RlcExhc3QoTnVtYmVyKGZyb20udmFsdWUpLCAxLCBOdW1iZXIodG8udmFsdWUpKSxcclxuICAgICAgfSxcclxuICAgIF07XHJcbiAgICBjb25zdCBtYXRoQ2FsY3M6IEV4Y2VsU2V0c0dldFtdID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFyOiBcImhcIixcclxuICAgICAgICB2YWw6IChjdXJyZW50TSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaUFycmF5ID0gY3VycmVudE0uZ2V0KFwiaVwiKTtcclxuICAgICAgICAgIE1hdGhGLnRlc3RTb21Ob3RPZlZhbHNBcnJheShcImlcIiwgaUFycmF5LCBcImlzTm90VmFsTmF0dXJhbFBvc1wiKTtcclxuICAgICAgICAgIC8vIGlBcnJheSAtIG5pZSBtYSBzemFucyBieVx1MDEwNyB1bmRlZmluZWQsIGJvIGtvbnRyb2xhIGplc3QgdyBNYXRoRi50ZXN0U29tTm90T2ZWYWxzQXJyYXkoJ2knLGlBcnJheSxcImlzTm90VmFsTmF0dXJhbFBvc1wiKTshXHJcbiAgICAgICAgICByZXR1cm4gaUFycmF5Lm1hcCgodmFsX2ksIF9pbmRleCkgPT5cclxuICAgICAgICAgICAgTWF0aEYuZmxvb3JMb2cyKHZhbF9pIGFzIG51bWJlcilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJoQVwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBoQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJoXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhcIixcclxuICAgICAgICAgICAgaEFycmF5LFxyXG4gICAgICAgICAgICBcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgLy8gaEFycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGhBcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+IE1hdGhGLnBvdzIodmFsX2ggYXMgbnVtYmVyKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHZhcjogXCJoWlwiLFxyXG4gICAgICAgIHZhbDogKGN1cnJlbnRNKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBoQXJyYXkgPSBjdXJyZW50TS5nZXQoXCJoXCIpO1xyXG4gICAgICAgICAgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KFxyXG4gICAgICAgICAgICBcImhcIixcclxuICAgICAgICAgICAgaEFycmF5LFxyXG4gICAgICAgICAgICBcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgLy8gaEFycmF5IC0gbmllIG1hIHN6YW5zIGJ5XHUwMTA3IHVuZGVmaW5lZCwgTWF0aEYudGVzdFNvbU5vdE9mVmFsc0FycmF5KCdoJyxoQXJyYXksXCJpc05vdFZhbE5hdHVyYWxQb3NXaXRoWmVyb1wiKTshXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGhBcnJheS5tYXAoKHZhbF9oLCBfaW5kZXgpID0+XHJcbiAgICAgICAgICAgIE1hdGhGLnBvdzJfbGFzdEJlZm9yZU5leHQodmFsX2ggYXMgbnVtYmVyKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgXTtcclxuICAgIHJlc3VsdE0udmFsdWUgPSBFeGNlbChtYXRoRW50ZXIsIG1hdGhDYWxjcyk7XHJcbiAgfTtcclxuXHJcbiAgLy8gSGFuZGxlciBkbGEgb25WYWx1ZUNoYW5nZSwga3RcdTAwRjNyeSBvZHp3aWVyY2llZGxhIHphY2hvd2FuaWUgYCsoZS5jdXJyZW50VGFyZ2V0LnZhbHVlKWBcclxuICAvLyBLaWVkeSBpbnB1dCBqZXN0IHB1c3R5LCBgZS5jdXJyZW50VGFyZ2V0LnZhbHVlYCB0byBcIlwiLCBhIGArXCJcImAgdG8gMC5cclxuICAvLyBOYXN6IGBvblZhbHVlQ2hhbmdlYCBwcnpla2F6dWplIGB1bmRlZmluZWRgLCBnZHkgYHZhbHVlQXNOdW1iZXJgIHRvIE5hTiAobnAuIGRsYSBwdXN0ZWdvIGlucHV0dSkuXHJcbiAgY29uc3QgaGFuZGxlRnJvbUNoYW5nZSA9IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmcm9tLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmcm9tLnZhbHVlID0gMDsgLy8gTHViIGlubmEgd2FydG9cdTAxNUJcdTAxMDcgZG9teVx1MDE1QmxuYSwgbnAuIDEsIGplXHUwMTVCbGkgdG8gYmFyZHppZWogc2Vuc293bmVcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVUb0NoYW5nZSA9IChuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkKSA9PiB7XHJcbiAgICBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0by52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG8udmFsdWUgPSAwOyAvLyBMdWIgaW5uYSB3YXJ0b1x1MDE1Qlx1MDEwNyBkb215XHUwMTVCbG5hXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxtYWluPlxyXG4gICAgICA8aDE+TWF0ZW1hdHlrYSB3IGdlbmVhbG9naWkuPC9oMT5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgICAgIGFsaWduSXRlbXM6IFwic3RyZXRjaFwiLFxyXG4gICAgICAgICAgZ2FwOiBcIjQwcHhcIixcclxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMHB4XCIsXHJcbiAgICAgICAgICBmbGV4RmxvdzogXCJyb3cgbm93cmFwXCIsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIG9uQ2xpY2s9e2NhbGN1bGF0ZX1cclxuICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6IFwiMC41cmVtIDFyZW1cIiwgZm9udFNpemU6IFwiMXJlbVwiIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgUG9saWN6XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGZpZWxkc2V0XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBib3JkZXI6IFwiM3B4IHNvbGlkICM2Yzc1N2RcIixcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiBcIjIwcHhcIixcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjBcIixcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjBcIixcclxuICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiZmxleC1zdGFydFwiLFxyXG4gICAgICAgICAgICBnYXA6IFwiNDBweFwiLFxyXG4gICAgICAgICAgICBmbGV4RmxvdzogXCJyb3cgbm93cmFwXCIsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxsZWdlbmRcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiBcIiNmZmZcIixcclxuICAgICAgICAgICAgICBwYWRkaW5nOiBcIjNweCA2cHhcIixcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgQ2hvb3NlIHJhbmdlIG9mIFx1MzAxMGlcdTMwMTFcclxuICAgICAgICAgIDwvbGVnZW5kPlxyXG5cclxuICAgICAgICAgIDxJbnB1dE51bWJlclxyXG4gICAgICAgICAgICBuYW1lPVwiaW5wdXQxXCJcclxuICAgICAgICAgICAgdmFsdWU9e2Zyb20udmFsdWV9XHJcbiAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9e2hhbmRsZUZyb21DaGFuZ2V9XHJcbiAgICAgICAgICAgIGRlZj17MX1cclxuICAgICAgICAgICAgbWluPXsxfSAvLyBsb2cyIGplc3QgemRlZmluaW93YW55IGRsYSBsaWN6YiA+IDBcclxuICAgICAgICAgICAgc3RlcD17MX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJPZFwiXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgcHJ6ZWR6aWFcdTAxNDJ1XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8SW5wdXROdW1iZXJcclxuICAgICAgICAgICAgbmFtZT1cImlucHV0MlwiXHJcbiAgICAgICAgICAgIHZhbHVlPXt0by52YWx1ZX1cclxuICAgICAgICAgICAgb25WYWx1ZUNoYW5nZT17aGFuZGxlVG9DaGFuZ2V9XHJcbiAgICAgICAgICAgIGRlZj17N31cclxuICAgICAgICAgICAgbWluPXtmcm9tLnZhbHVlID49IDEgPyBmcm9tLnZhbHVlIDogMX0gLy8gJ3RvJyBuaWUgcG93aW5ubyBieVx1MDEwNyBtbmllanN6ZSBuaVx1MDE3QyAnZnJvbSdcclxuICAgICAgICAgICAgc3RlcD17MX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJEb1wiXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXYXJ0b1x1MDE1Qlx1MDEwNyBrb1x1MDE0NGNvd2EgcHJ6ZWR6aWFcdTAxNDJ1XCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgPGxpPmggPSBmbG9vcihsb2dcdTIwODIoaSkpIGRsYSBwcnplZHppYVx1MDE0MnUgW2ldPC9saT5cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAge3Jlc3VsdE0udmFsdWUuc2l6ZSA+IDAgJiYgKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qPGgzPlRhYmVsYSBzdGFuZGFyZG93YSAodHlwZT1cImNvbFwiKTo8L2gzPlxyXG4gICAgICAgICAgPFBsb3RFeGNlbFxyXG4gICAgICAgICAgICBkYXRhPXtyZXN1bHRNLnZhbHVlfVxyXG4gICAgICAgICAgICB0eXBlPVwiY29sXCJcclxuICAgICAgICAgICAgY2FwdGlvbj1cIld5bmlraSBvYmxpY3plXHUwMTQ0XCJcclxuICAgICAgICAgIC8+Ki9cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgPGgzPlJlenVsdGF0IG9ibGljemVcdTAxNDQ6PC9oMz5cclxuICAgICAgICAgIDxQbG90RXhjZWxcclxuICAgICAgICAgICAgZGF0YT17cmVzdWx0TS52YWx1ZX1cclxuICAgICAgICAgICAgdHlwZT1cInJvd1wiXHJcbiAgICAgICAgICAgIGNhcHRpb249XCJXeW5pa2kgb2JsaWN6ZVx1MDE0NCAodHJhbnNwb25vd2FuZSlcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8Lz5cclxuICAgICAgKX1cclxuICAgIDwvbWFpbj5cclxuICApO1xyXG59XHJcbiIsICIvKiogQGpzeFJ1bnRpbWUgYXV0b21hdGljICovXHJcbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXHJcblxyXG5pbXBvcnQge1xyXG4gIHVzZUNhbGxiYWNrLFxyXG4gIHVzZUVmZmVjdCxcclxuICB1c2VSZWYsXHJcbn0gZnJvbSBcImh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44L2hvb2tzXCI7XHJcbmltcG9ydCB7IEpTWCB9IGZyb20gXCJodHRwczovL2VzbS5zaC9wcmVhY3RAMTAuMjYuOFwiO1xyXG5cclxuLy8gWmF3YXJ0b1x1MDE1Qlx1MDEwNyBTVkcgZGxhIGRvbXlcdTAxNUJsbnljaCBpa29uICsvLSAoamVcdTAxNUJsaSB6ZGVjeWR1amVzeiBzaVx1MDExOSBqZSBuYWtcdTAxNDJhZGFcdTAxMDcpXHJcbi8vIE5hIHJhemllIG5pZSBzXHUwMTA1IG9uZSBhdXRvbWF0eWN6bmllIHJlbmRlcm93YW5lIHcgdGVqIHdlcnNqaSxcclxuLy8gcG9uaWV3YVx1MDE3QyB6YWtcdTAxNDJhZGFtLCBcdTAxN0NlIFR3XHUwMEYzaiBnXHUwMTQyXHUwMEYzd255IFNWRyBkZWZpbml1amUgd3lnbFx1MDEwNWQgcHJ6eWNpc2tcdTAwRjN3LlxyXG4vLyBKZVx1MDE1QmxpIGNoY2VzeiBqZSBkb2RhXHUwMTA3LCBtdXNpc3ogcHJ6eXdyXHUwMEYzY2lcdTAxMDcgbG9naWtcdTAxMTkgaWNoIHJlbmRlcm93YW5pYSB6IHRyYW5zZm9ybWFjamFtaS5cclxuY29uc3QgRGVmYXVsdERlY3JlbWVudEljb25TdmdDb250ZW50ID0gKFxyXG4gIDxyZWN0IHg9XCI1XCIgeT1cIjExXCIgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjJcIiByeD1cIjFcIiAvPlxyXG4pO1xyXG5jb25zdCBEZWZhdWx0SW5jcmVtZW50SWNvblN2Z0NvbnRlbnQgPSAoXHJcbiAgPD5cclxuICAgIDxyZWN0IHg9XCIxMVwiIHk9XCI1XCIgd2lkdGg9XCIyXCIgaGVpZ2h0PVwiMTRcIiByeD1cIjFcIiAvPlxyXG4gICAgPHJlY3QgeD1cIjVcIiB5PVwiMTFcIiB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMlwiIHJ4PVwiMVwiIC8+XHJcbiAgPC8+XHJcbik7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElucHV0TnVtYmVyUHJvcHMge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIGRlZmF1bHRWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICBkZWY/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgbWluPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIG1heD86IHN0cmluZyB8IG51bWJlcjtcclxuICBzdGVwPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgbmFtZT86IHN0cmluZztcclxuICBpZD86IHN0cmluZztcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgb25DaGFuZ2U/OiAoZXZlbnQ6IEpTWC5UYXJnZXRlZEV2ZW50PEhUTUxJbnB1dEVsZW1lbnQsIEV2ZW50PikgPT4gdm9pZDtcclxuICBvblZhbHVlQ2hhbmdlPzogKG5ld1ZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQsIG5hbWU/OiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgcmF0aW9TSVpFPzogbnVtYmVyO1xyXG4gIHdyYXBwZXJDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc3ZnQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGlucHV0Q2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XHJcbiAgc2VsZWN0QnV0dG9uU3R5bGU/OiBKU1guQ1NTUHJvcGVydGllcztcclxuICBpbmNyZW1lbnRCdXR0b25TdHlsZT86IEpTWC5DU1NQcm9wZXJ0aWVzO1xyXG4gIGRlY3JlbWVudEJ1dHRvblN0eWxlPzogSlNYLkNTU1Byb3BlcnRpZXM7XHJcbiAgaW5wdXRBcmVhU3R5bGU/OiBKU1guQ1NTUHJvcGVydGllcztcclxuICBzZWxlY3RCdXR0b25GaWxsPzogc3RyaW5nO1xyXG4gIGluY3JlbWVudEJ1dHRvbkZpbGw/OiBzdHJpbmc7XHJcbiAgZGVjcmVtZW50QnV0dG9uRmlsbD86IHN0cmluZztcclxuICBpbnB1dEFyZWFSZWN0RmlsbD86IHN0cmluZztcclxuICBpbnB1dEFyZWFCb3JkZXJGaWxsPzogc3RyaW5nO1xyXG4gIC8vIGljb25GaWxsPzogc3RyaW5nOyAvLyBKZVx1MDE1QmxpIGJcdTAxMTlkemllc3ogdVx1MDE3Q3l3YVx1MDE0MiBvc29ibnljaCBpa29uICsvLVxyXG4gIFtrZXk6IHN0cmluZ106IGFueTtcclxufVxyXG5cclxuY29uc3Qgc3ZnTGF5b3V0RGF0YSA9IHtcclxuICBiYXNlVmlld0JveFdpZHRoOiAxNzQsXHJcbiAgYmFzZVZpZXdCb3hIZWlnaHQ6IDcyLFxyXG4gIGJ1dHRvbnM6IHtcclxuICAgIGNob29zZTogeyAvLyBabWllbmlvbm8geiAnc2VsZWNlY3QnIG5hICdjaG9vc2UnIGRsYSBzcFx1MDBGM2pub1x1MDE1QmNpIHogVHdvaW0gSFRNTFxyXG4gICAgICBuYW1lOiBcImJ0bi1jaG9vc2VcIixcclxuICAgICAgcGF0aHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tZmlsbFwiLFxyXG4gICAgICAgICAgZDogXCJNMTE1Ljc1LDcxLjYyYy0xMC4wMywwLTE5LjkzLTEuNjItMjguNjMtNC42N2wtLjEyLS4wNC0uMTIuMDRjLTguNywzLjA2LTE4LjU5LDQuNjctMjguNjMsNC42Ny0xMy4wNiwwLTI1LjgxLTIuNzUtMzYuMDItNy43NWwyNi45Ni0xNS4yMWg3NS42MWwyNi45NiwxNS4yMWMtMTAuMiw1LTIyLjk2LDcuNzUtMzYuMDIsNy43NVpcIixcclxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiM5MTkxOTFcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1ib3JkZXItZmlsbFwiLFxyXG4gICAgICAgICAgZDogXCJNMTI0LjcxLDQ5LjA0bDI2LjI1LDE0LjgxYy0xMC4wNCw0Ljc4LTIyLjQ4LDcuNC0zNS4yMSw3LjQtOS45OSwwLTE5Ljg0LTEuNjEtMjguNS00LjY1bC0uMjUtLjA5LS4yNS4wOWMtOC42NiwzLjA0LTE4LjUxLDQuNjUtMjguNSw0LjY1LTEyLjczLDAtMjUuMTYtMi42Mi0zNS4yMS03LjRsMjYuMjUtMTQuODFoNzUuNDFNMTI0LjksNDguMjlINDkuMWwtMjcuNjYsMTUuNmMxMC4wMyw1LjA2LDIyLjg1LDguMTEsMzYuODIsOC4xMSwxMC40NiwwLDIwLjI3LTEuNzEsMjguNzUtNC42OSw4LjQ4LDIuOTgsMTguMjksNC42OSwyOC43NSw0LjY5LDEzLjk3LDAsMjYuNzgtMy4wNCwzNi44Mi04LjExbC0yNy42Ni0xNS42aDBaXCIsXHJcbiAgICAgICAgICBkZWZhdWx0RmlsbDpcclxuICAgICAgICAgICAgXCIjNTA1MDUwXCIsIC8qIEtvbG9yIGRsYSBvYnJ5c3UvZHJ1Z2llaiB3YXJzdHd5LCBkb3N0b3N1aiAqL1xyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgaW5jcmVtZW50OiB7XHJcbiAgICAgIG5hbWU6IFwiYnRuLWluY3JlbWVudFwiLFxyXG4gICAgICBwYXRoczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGRhdGFOYW1lOiBcImJ0bi1maWxsXCIsXHJcbiAgICAgICAgICBkOiBcIk0xMjcuMzgsNDMuNTFWMS4xYzI2LjgzLDMuMzcsNDYuMjUsMTguMDEsNDYuMjUsMzQuOSwwLDkuMTktNS42OCwxNy45MS0xNi4wMSwyNC41N2wtMzAuMjQtMTcuMDZaXCIsXHJcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjMjE1OTdmXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tYm9yZGVyLWZpbGxcIixcclxuICAgICAgICAgIGQ6IFwiTTEyNy43NSwxLjUzYzI2LjQyLDMuNDUsNDUuNSwxNy44Niw0NS41LDM0LjQ3LDAsOS01LjU1LDE3LjU2LTE1LjY1LDI0LjEzbC0yOS44NS0xNi44NFYxLjUzTTEyNywuNjh2NDMuMDVsMzAuNjMsMTcuMjhjMTAuMTMtNi40OCwxNi4zNy0xNS4yOSwxNi4zNy0yNS4wMSwwLTE3LjUtMjAuMjEtMzIuMDgtNDctMzUuMzJoMFpcIixcclxuICAgICAgICAgIGRlZmF1bHRGaWxsOiBcIiMxMDQwNjBcIiwgLyogQ2llbW5pZWpzenkgZGxhIG9icnlzdT8gRG9zdG9zdWogKi9cclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBpY29uQW5jaG9yWDogMTUwLCAvLyAxNTBweCB3IHByYXdvICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxyXG4gICAgICBpY29uQW5jaG9yWTogMzAsIC8vIDMwcHggdyBkXHUwMEYzXHUwMTQyICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxyXG4gICAgfSxcclxuICAgIGRlY3JlbWVudDoge1xyXG4gICAgICBuYW1lOiBcImJ0bi1kZWNyZW1lbnRcIixcclxuICAgICAgcGF0aHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tZmlsbFwiLFxyXG4gICAgICAgICAgZDogXCJNMTYuMzgsNjAuNTdDNi4wNiw1My45MS4zOCw0NS4xOS4zOCwzNiwuMzgsMTkuMTEsMTkuOCw0LjQ3LDQ2LjYyLDEuMXY0Mi40MWwtMzAuMjQsMTcuMDZaXCIsXHJcbiAgICAgICAgICBkZWZhdWx0RmlsbDogXCIjYjIxMDEwXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBkYXRhTmFtZTogXCJidG4tYm9yZGVyLWZpbGxcIixcclxuICAgICAgICAgIGQ6IFwiTTQ2LjI1LDEuNTN2NDEuNzZoMHMtMjkuODUsMTYuODQtMjkuODUsMTYuODRDNi4zLDUzLjU2Ljc1LDQ1LC43NSwzNiwuNzUsMTkuMzksMTkuODMsNC45Nyw0Ni4yNSwxLjUzTTQ3LC42OEMyMC4yMSwzLjkyLDAsMTguNSwwLDM2YzAsOS43Miw2LjI0LDE4LjUzLDE2LjM3LDI1LjAxbDMwLjYzLTE3LjI4Vi42OGgwWlwiLFxyXG4gICAgICAgICAgZGVmYXVsdEZpbGw6IFwiIzgwMDAwMFwiLCAvKiBDaWVtbmllanN6eSBkbGEgb2JyeXN1PyBEb3N0b3N1aiAqL1xyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGljb25BbmNob3JYOiAyNSwgLy8gMjBweCB3IHByYXdvICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxyXG4gICAgICBpY29uQW5jaG9yWTogMzAsIC8vIDMwcHggdyBkXHUwMEYzXHUwMTQyICh3IHN5c3RlbWllIHZpZXdCb3ggMTc0eDcyKVxyXG4gICAgfSxcclxuICB9LFxyXG4gIGlucHV0QXJlYToge1xyXG4gICAgbmFtZTogXCJpbnB1dFwiLFxyXG4gICAgcmVjdDoge1xyXG4gICAgICB4OiA1Mi4zOCxcclxuICAgICAgeTogMC4zOCxcclxuICAgICAgd2lkdGg6IDY5LjI1LFxyXG4gICAgICBoZWlnaHQ6IDQyLjU0LFxyXG4gICAgICBkZWZhdWx0RmlsbDogXCIjZmZmXCIsXHJcbiAgICB9LFxyXG4gICAgYm9yZGVyUGF0aDoge1xyXG4gICAgICBkOiBcIk0xMjEuMjUuNzV2NDEuNzlINTIuNzVWLjc1aDY4LjVNMTIyLDBINTJ2NDMuMjloNzBWMGgwWlwiLFxyXG4gICAgICBkZWZhdWx0RmlsbDogXCIjMzMzXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcblxyXG5jb25zdCBDT05UQUlORVJfQ0xBU1NfTkFNRSA9IFwiaW5wdXRudW1iZXItY29udGFpbmVyXCI7XHJcbmNvbnN0IFNWR19DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1zdmdcIjtcclxuY29uc3QgU1ZHX0JVVFRPTl9DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1zdmctYnV0dG9uXCI7IC8vIFVcdTAxN0N5d2FuZSB3IFR3b2ltIEhUTUxcclxuY29uc3QgSFRNTF9JTlBVVF9DTEFTU19OQU1FID0gXCJpbnB1dG51bWJlci1odG1sLWlucHV0XCI7IC8vIFVcdTAxN0N5d2FuZSB3IFR3b2ltIEhUTUxcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbnB1dE51bWJlcihwcm9wczogSW5wdXROdW1iZXJQcm9wcyk6IEpTWC5FbGVtZW50IHtcclxuICBjb25zdCB7XHJcbiAgICB2YWx1ZSxcclxuICAgIGRlZmF1bHRWYWx1ZSxcclxuICAgIGRlZiA9IDEsXHJcbiAgICBtaW4sXHJcbiAgICBtYXgsXHJcbiAgICBzdGVwID0gMSxcclxuICAgIHBsYWNlaG9sZGVyLFxyXG4gICAgcmVxdWlyZWQsXHJcbiAgICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gICAgbmFtZSxcclxuICAgIGlkLFxyXG4gICAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICAgIG9uQ2hhbmdlLFxyXG4gICAgb25WYWx1ZUNoYW5nZSxcclxuICAgIHJhdGlvU0laRSA9IDEsXHJcbiAgICB3cmFwcGVyQ2xhc3NOYW1lLFxyXG4gICAgc3ZnQ2xhc3NOYW1lLFxyXG4gICAgaW5wdXRDbGFzc05hbWUsXHJcbiAgICBzdHlsZSxcclxuICAgIHNlbGVjdEJ1dHRvblN0eWxlLFxyXG4gICAgaW5jcmVtZW50QnV0dG9uU3R5bGUsXHJcbiAgICBkZWNyZW1lbnRCdXR0b25TdHlsZSxcclxuICAgIGlucHV0QXJlYVN0eWxlLFxyXG4gICAgc2VsZWN0QnV0dG9uRmlsbCxcclxuICAgIGluY3JlbWVudEJ1dHRvbkZpbGwsXHJcbiAgICBkZWNyZW1lbnRCdXR0b25GaWxsLFxyXG4gICAgaW5wdXRBcmVhUmVjdEZpbGwsXHJcbiAgICBpbnB1dEFyZWFCb3JkZXJGaWxsLFxyXG4gICAgLy8gaWNvbkZpbGwgPSBcIndoaXRlXCIsIC8vIEplXHUwMTVCbGkgYlx1MDExOWR6aWVzeiByZW5kZXJvd2FcdTAxMDcgb3NvYm5lIGlrb255ICsvLVxyXG4gICAgLi4ucmVzdERpdlByb3BzXHJcbiAgfSA9IHByb3BzO1xyXG5cclxuICBjb25zdCBpbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50PihudWxsKTtcclxuXHJcbiAgLy8gSW5pY2phbGl6YWNqYSB3YXJ0b1x1MDE1QmNpIGlucHV0YSBwcnp5IG1vbnRvd2FuaXUgbHViIHptaWFuaWUgZGVmYXVsdFZhbHVlL3ZhbHVlXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChpbnB1dFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRSZWYuY3VycmVudC52YWx1ZSA9IFwiXCI7IC8vIEphd25lIHVzdGF3aWVuaWUgbmEgcHVzdHkgc3RyaW5nLCBqZVx1MDE1QmxpIGJyYWsgd2FydG9cdTAxNUJjaVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSwgW3ZhbHVlLCBkZWZhdWx0VmFsdWVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RlcCA9IHVzZUNhbGxiYWNrKChkaXJlY3Rpb246IFwidXBcIiB8IFwiZG93blwiKSA9PiB7XHJcbiAgICBpZiAoaW5wdXRSZWYuY3VycmVudCAmJiAhZGlzYWJsZWQgJiYgIXJlYWRPbmx5KSB7XHJcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwidXBcIikgaW5wdXRSZWYuY3VycmVudC5zdGVwVXAoKTtcclxuICAgICAgZWxzZSBpbnB1dFJlZi5jdXJyZW50LnN0ZXBEb3duKCk7XHJcblxyXG4gICAgICAvLyBTeW11bGFjamEgemRhcnplbmlhIGlucHV0LCBhYnkgd3l3b1x1MDE0MmFcdTAxMDcgaGFuZGxlSW5wdXRDaGFuZ2VcclxuICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoXCJpbnB1dFwiLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUgfSk7XHJcbiAgICAgIGlucHV0UmVmLmN1cnJlbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcbiAgfSwgW2Rpc2FibGVkLCByZWFkT25seV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWNyZW1lbnQgPSB1c2VDYWxsYmFjaygoKSA9PiBoYW5kbGVTdGVwKFwiZG93blwiKSwgW2hhbmRsZVN0ZXBdKTtcclxuICBjb25zdCBoYW5kbGVJbmNyZW1lbnQgPSB1c2VDYWxsYmFjaygoKSA9PiBoYW5kbGVTdGVwKFwidXBcIiksIFtoYW5kbGVTdGVwXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNob29zZUNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlucHV0UmVmLmN1cnJlbnQgJiYgIWRpc2FibGVkICYmICFyZWFkT25seSkge1xyXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IGRlZiA/PyAxOyAvLyBKYWsgdyBUd29pbSBKU1xyXG4gICAgICBpbnB1dFJlZi5jdXJyZW50LnZhbHVlID0gU3RyaW5nKG5ld1ZhbHVlKTtcclxuXHJcbiAgICAgIC8vIFJcdTAxMTljem5lIHd5d29cdTAxNDJhbmllIGxvZ2lraSB6bWlhbnkgd2FydG9cdTAxNUJjaVxyXG4gICAgICBpZiAob25WYWx1ZUNoYW5nZSkgb25WYWx1ZUNoYW5nZShuZXdWYWx1ZSwgbmFtZSk7XHJcbiAgICAgIGlmIChvbkNoYW5nZSkge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KFwiY2hhbmdlXCIsIHtcclxuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgfSkgYXMgdW5rbm93biBhcyBKU1guVGFyZ2V0ZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBFdmVudD47XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcInRhcmdldFwiLCB7XHJcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICB2YWx1ZTogaW5wdXRSZWYuY3VycmVudCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwiY3VycmVudFRhcmdldFwiLCB7XHJcbiAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICB2YWx1ZTogaW5wdXRSZWYuY3VycmVudCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBvbkNoYW5nZShldmVudCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2coXCJDaG9vc2UgYnV0dG9uIGNsaWNrZWQsIHZhbHVlIHNldCB0byAxXCIpO1xyXG4gICAgfVxyXG4gIH0sIFtkaXNhYmxlZCwgcmVhZE9ubHksIG5hbWUsIG9uVmFsdWVDaGFuZ2UsIG9uQ2hhbmdlXSk7XHJcblxyXG4gIC8vID09PSBQT0NaXHUwMTA0VEVLIERFRklOSUNKSSBoYW5kbGVJbnB1dENoYW5nZSA9PT1cclxuICBjb25zdCBoYW5kbGVJbnB1dENoYW5nZSA9IChlOiBKU1guVGFyZ2V0ZWRFdmVudDxIVE1MSW5wdXRFbGVtZW50LCBFdmVudD4pID0+IHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY29uc3QgcmF3VmFsdWUgPSB0YXJnZXQudmFsdWU7XHJcbiAgICBsZXQgbnVtZXJpY1ZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgaWYgKHJhd1ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgIG51bWVyaWNWYWx1ZSA9IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNwclx1MDBGM2J1aiBzcGFyc293YVx1MDEwNyBqYWtvIGxpY3piXHUwMTE5OyBwYXJzZUZsb2F0IGplc3QgYmFyZHppZWogZWxhc3R5Y3pueVxyXG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUZsb2F0KHJhd1ZhbHVlKTtcclxuICAgICAgbnVtZXJpY1ZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IHVuZGVmaW5lZCA6IHBhcnNlZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob25WYWx1ZUNoYW5nZSkge1xyXG4gICAgICBvblZhbHVlQ2hhbmdlKG51bWVyaWNWYWx1ZSwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICAvLyBKZVx1MDE1QmxpIHVcdTAxN0N5dGtvd25payBwcnpla2F6YVx1MDE0MiB3XHUwMTQyYXNueSBvbkNoYW5nZSwgdGVcdTAxN0MgZ28gd3l3b1x1MDE0MmFqXHJcbiAgICAvLyBUbyB6ZGFyemVuaWUgXCJpbnB1dFwiIHogZWxlbWVudHUgSFRNTFxyXG4gICAgaWYgKG9uQ2hhbmdlKSB7XHJcbiAgICAgIG9uQ2hhbmdlKGUpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgLy8gPT09IEtPTklFQyBERUZJTklDSkkgaGFuZGxlSW5wdXRDaGFuZ2UgPT09XHJcblxyXG4gIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gc3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveFdpZHRoICogcmF0aW9TSVpFO1xyXG4gIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IHN2Z0xheW91dERhdGEuYmFzZVZpZXdCb3hIZWlnaHQgKiByYXRpb1NJWkU7XHJcblxyXG4gIC8vIFN0eWxlIGRsYSBuYVx1MDE0Mm9cdTAxN0NvbmVnbyBpbnB1dHUgSFRNTCwgc2thbG93YW5lIHByemV6IHJhdGlvU0laRVxyXG4gIGNvbnN0IGh0bWxJbnB1dFN0eWxlOiBKU1guQ1NTUHJvcGVydGllcyA9IHtcclxuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICBsZWZ0OiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LnggKiByYXRpb1NJWkV9cHhgLFxyXG4gICAgdG9wOiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LnkgKiByYXRpb1NJWkV9cHhgLFxyXG4gICAgd2lkdGg6IGAke3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3Qud2lkdGggKiByYXRpb1NJWkV9cHhgLFxyXG4gICAgaGVpZ2h0OiBgJHtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmhlaWdodCAqIHJhdGlvU0laRX1weGAsXHJcbiAgICBib3JkZXI6IFwibm9uZVwiLFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICBjb2xvcjogXCIjMzMzXCIsXHJcbiAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICBmb250U2l6ZTogYCR7TWF0aC5tYXgoOCwgMTggKiByYXRpb1NJWkUpfXB4YCwgLy8gRG9zdG9zdWogY3pjaW9ua1x1MDExOVxyXG4gICAgb3V0bGluZTogXCJub25lXCIsXHJcbiAgICBwYWRkaW5nOiBgMCAke01hdGgubWF4KDEsIDIgKiByYXRpb1NJWkUpfXB4YCxcclxuICAgIG1hcmdpbjogMCxcclxuICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXHJcbiAgICBNb3pBcHBlYXJhbmNlOiBcInRleHRmaWVsZFwiLFxyXG4gICAgV2Via2l0QXBwZWFyYW5jZTogXCJub25lXCIsXHJcbiAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIixcclxuICAgIHpJbmRleDogMixcclxuICB9O1xyXG5cclxuICAvLyBSb3ptaWFyIGlrb24gKy8tLiBaYVx1MDE0Mlx1MDBGM1x1MDE3Q215LCBcdTAxN0NlIG9yeWdpbmFsbmUgaWtvbnkgc1x1MDEwNSAyNHgyNC5cclxuICAvLyBDaGNlbXkgamUgcHJ6ZXNrYWxvd2FcdTAxMDcsIGFieSBwYXNvd2FcdTAxNDJ5IGRvIHByenljaXNrXHUwMEYzdy5cclxuICAvLyBQcnp5a1x1MDE0MmFkb3dvLCBuaWVjaCB6YWptdWpcdTAxMDUgb2tvXHUwMTQybyA1MCUgd3lzb2tvXHUwMTVCY2kgcHJ6eWNpc2t1ICh3IGplZG5vc3RrYWNoIHZpZXdCb3gpXHJcbiAgY29uc3QgaWNvblZpZXdCb3hTaXplID0gMjQ7IC8vIE9yeWdpbmFsbnkgcm96bWlhciB2aWV3Qm94IGlrb24gKy8tXHJcbiAgY29uc3QgdGFyZ2V0SWNvbkhlaWdodEluU3ZnVW5pdHMgPSBzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94SGVpZ2h0ICogMC4yNSAqXHJcbiAgICAocmF0aW9TSVpFID4gMC41ID8gMSA6IHJhdGlvU0laRSAqIDIpOyAvLyBucC4gMjUlIHd5c29rb1x1MDE1QmNpIGNhXHUwMTQyZWdvIGtvbXBvbmVudHVcclxuICBjb25zdCBpY29uQWN0dWFsU2NhbGUgPSAxLjUgKiAodGFyZ2V0SWNvbkhlaWdodEluU3ZnVW5pdHMgLyBpY29uVmlld0JveFNpemUpO1xyXG5cclxuICBsZXQgZGlzcGxheVZhbHVlOiBzdHJpbmcgPSBcIlwiOyAvLyBJbnB1dCB2YWx1ZSB6YXdzemUgamFrbyBzdHJpbmdcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgZGlzcGxheVZhbHVlID0gU3RyaW5nKHZhbHVlKTtcclxuICB9IGVsc2UgaWYgKGRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkaXNwbGF5VmFsdWUgPSBTdHJpbmcoZGVmYXVsdFZhbHVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbW1vblN2Z0J1dHRvblN0eWxlOiBKU1guQ1NTUHJvcGVydGllcyA9IHtcclxuICAgIGN1cnNvcjogZGlzYWJsZWQgfHwgcmVhZE9ubHkgPyBcImRlZmF1bHRcIiA6IFwicG9pbnRlclwiLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17YCR7Q09OVEFJTkVSX0NMQVNTX05BTUV9ICR7d3JhcHBlckNsYXNzTmFtZSB8fCBcIlwifWB9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgd2lkdGg6IGAke2NvbnRhaW5lcldpZHRofXB4YCxcclxuICAgICAgICBoZWlnaHQ6IGAke2NvbnRhaW5lckhlaWdodH1weGAsXHJcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcclxuICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcclxuICAgICAgICAuLi5zdHlsZSxcclxuICAgICAgfX1cclxuICAgICAgey4uLnJlc3REaXZQcm9wc31cclxuICAgID5cclxuICAgICAgPHN2Z1xyXG4gICAgICAgIGNsYXNzTmFtZT17YCR7U1ZHX0NMQVNTX05BTUV9ICR7c3ZnQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cclxuICAgICAgICBkYXRhLW5hbWU9XCJpbnB1dC1udW1iZXJcIiAvLyBaIFR3b2plZ28gSFRNTFxyXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgIHZpZXdCb3g9e2AwIDAgJHtzdmdMYXlvdXREYXRhLmJhc2VWaWV3Qm94V2lkdGh9ICR7c3ZnTGF5b3V0RGF0YS5iYXNlVmlld0JveEhlaWdodH1gfVxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCIsXHJcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgfX1cclxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICA+XHJcbiAgICAgICAgey8qIEdydXBhIFwiQ2hvb3NlL1NlbGVjdFwiICovfVxyXG4gICAgICAgIDxnXHJcbiAgICAgICAgICBjbGFzc05hbWU9e1NWR19CVVRUT05fQ0xBU1NfTkFNRX0gLy8gS2xhc2EgeiBUd29qZWdvIEhUTUxcclxuICAgICAgICAgIGRhdGEtbmFtZT17c3ZnTGF5b3V0RGF0YS5idXR0b25zLmNob29zZS5uYW1lfSAvLyBkYXRhLW5hbWUgeiBUd29qZWdvIEhUTUxcclxuICAgICAgICAgIG9uQ2xpY2s9eyFkaXNhYmxlZCA/IGhhbmRsZUNob29zZUNsaWNrIDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3ZnQnV0dG9uU3R5bGUsIC4uLihzZWxlY3RCdXR0b25TdHlsZSB8fCB7fSkgfX1cclxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9e2Rpc2FibGVkID8gXCJub25lXCIgOiBcImF1dG9cIn1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmNob29zZS5wYXRocy5tYXAoKHAsIGkpID0+IChcclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBrZXk9e2BjaG9vc2UtcGF0aC0ke2l9YH1cclxuICAgICAgICAgICAgICBkYXRhLW5hbWU9e3AuZGF0YU5hbWV9XHJcbiAgICAgICAgICAgICAgZD17cC5kfVxyXG4gICAgICAgICAgICAgIGZpbGw9e3NlbGVjdEJ1dHRvbkZpbGwgfHwgcC5kZWZhdWx0RmlsbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZz5cclxuXHJcbiAgICAgICAgey8qIEdydXBhIFwiSW5wdXQgQXJlYVwiICovfVxyXG4gICAgICAgIDxnXHJcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLm5hbWV9XHJcbiAgICAgICAgICBzdHlsZT17aW5wdXRBcmVhU3R5bGUgfHwge319XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHJlY3RcclxuICAgICAgICAgICAgeD17c3ZnTGF5b3V0RGF0YS5pbnB1dEFyZWEucmVjdC54fVxyXG4gICAgICAgICAgICB5PXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0Lnl9XHJcbiAgICAgICAgICAgIHdpZHRoPXtzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LndpZHRofVxyXG4gICAgICAgICAgICBoZWlnaHQ9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLnJlY3QuaGVpZ2h0fVxyXG4gICAgICAgICAgICBmaWxsPXtpbnB1dEFyZWFSZWN0RmlsbCB8fCBzdmdMYXlvdXREYXRhLmlucHV0QXJlYS5yZWN0LmRlZmF1bHRGaWxsfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgIGQ9e3N2Z0xheW91dERhdGEuaW5wdXRBcmVhLmJvcmRlclBhdGguZH1cclxuICAgICAgICAgICAgZmlsbD17aW5wdXRBcmVhQm9yZGVyRmlsbCB8fFxyXG4gICAgICAgICAgICAgIHN2Z0xheW91dERhdGEuaW5wdXRBcmVhLmJvcmRlclBhdGguZGVmYXVsdEZpbGx9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZz5cclxuXHJcbiAgICAgICAgey8qIEdydXBhIFwiRGVjcmVtZW50XCIgKi99XHJcbiAgICAgICAgPGdcclxuICAgICAgICAgIGNsYXNzTmFtZT17U1ZHX0JVVFRPTl9DTEFTU19OQU1FfVxyXG4gICAgICAgICAgZGF0YS1uYW1lPXtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lm5hbWV9XHJcbiAgICAgICAgICBvbkNsaWNrPXshZGlzYWJsZWQgJiYgIXJlYWRPbmx5ID8gaGFuZGxlRGVjcmVtZW50IDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgc3R5bGU9e3sgLi4uY29tbW9uU3ZnQnV0dG9uU3R5bGUsIC4uLihkZWNyZW1lbnRCdXR0b25TdHlsZSB8fCB7fSkgfX1cclxuICAgICAgICAgIHBvaW50ZXJFdmVudHM9e2Rpc2FibGVkIHx8IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcImF1dG9cIn1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7c3ZnTGF5b3V0RGF0YS5idXR0b25zLmRlY3JlbWVudC5wYXRocy5tYXAoKHAsIGkpID0+IChcclxuICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICBrZXk9e2BkZWMtcGF0aC0ke2l9YH1cclxuICAgICAgICAgICAgICBkYXRhLW5hbWU9e3AuZGF0YU5hbWV9XHJcbiAgICAgICAgICAgICAgZD17cC5kfVxyXG4gICAgICAgICAgICAgIGZpbGw9e2RlY3JlbWVudEJ1dHRvbkZpbGwgfHwgcC5kZWZhdWx0RmlsbH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgICAgey8qIEplXHUwMTVCbGkgY2hjZXN6IGRvZGFcdTAxMDcgaWtvblx1MDExOSBTVkcgXCItXCIgbmEgdHltIGtzenRhXHUwMTQyY2llLCB6clx1MDBGM2IgdG8gdHV0YWosIG5wLjogKi99XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIC8qPGcgdHJhbnNmb3JtPVwidHJhbnNsYXRlKFggWSkgc2NhbGUoUylcIj5cclxuICAgICAgICAgICAge0RlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudH1cclxuICAgICAgICAgIDwvZz4qL1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgey8qIElrb25hIERlY3JlbWVudCAoLSkgKi99XHJcbiAgICAgICAgICA8Z1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lmljb25BbmNob3JYfSwgJHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuZGVjcmVtZW50Lmljb25BbmNob3JZfSkgc2NhbGUoJHtpY29uQWN0dWFsU2NhbGV9KSB0cmFuc2xhdGUoLSR7XHJcbiAgICAgICAgICAgICAgaWNvblZpZXdCb3hTaXplIC8gMlxyXG4gICAgICAgICAgICB9LCAtJHtpY29uVmlld0JveFNpemUgLyAyfSlgfVxyXG4gICAgICAgICAgICBzdHlsZT17eyBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIiB9fSAvLyBJa29ueSBuaWUgcG93aW5ueSBwcnplY2h3eXR5d2FcdTAxMDcga2xpa25pXHUwMTE5XHUwMTA3XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICB2aWV3Qm94PXtgMCAwICR7aWNvblZpZXdCb3hTaXplfSAke2ljb25WaWV3Qm94U2l6ZX1gfVxyXG4gICAgICAgICAgICAgIHdpZHRoPXtpY29uVmlld0JveFNpemV9XHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXtpY29uVmlld0JveFNpemV9XHJcbiAgICAgICAgICAgICAgZmlsbD1cIndoaXRlXCJcclxuICAgICAgICAgICAgICBvdmVyZmxvdz1cInZpc2libGVcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge0RlZmF1bHREZWNyZW1lbnRJY29uU3ZnQ29udGVudH1cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L2c+XHJcbiAgICAgICAgPC9nPlxyXG5cclxuICAgICAgICB7LyogR3J1cGEgXCJJbmNyZW1lbnRcIiAqL31cclxuICAgICAgICA8Z1xyXG4gICAgICAgICAgY2xhc3NOYW1lPXtTVkdfQlVUVE9OX0NMQVNTX05BTUV9XHJcbiAgICAgICAgICBkYXRhLW5hbWU9e3N2Z0xheW91dERhdGEuYnV0dG9ucy5pbmNyZW1lbnQubmFtZX1cclxuICAgICAgICAgIG9uQ2xpY2s9eyFkaXNhYmxlZCAmJiAhcmVhZE9ubHkgPyBoYW5kbGVJbmNyZW1lbnQgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICBzdHlsZT17eyAuLi5jb21tb25TdmdCdXR0b25TdHlsZSwgLi4uKGluY3JlbWVudEJ1dHRvblN0eWxlIHx8IHt9KSB9fVxyXG4gICAgICAgICAgcG9pbnRlckV2ZW50cz17ZGlzYWJsZWQgfHwgcmVhZE9ubHkgPyBcIm5vbmVcIiA6IFwiYXV0b1wifVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtzdmdMYXlvdXREYXRhLmJ1dHRvbnMuaW5jcmVtZW50LnBhdGhzLm1hcCgocCwgaSkgPT4gKFxyXG4gICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgIGtleT17YGluYy1wYXRoLSR7aX1gfVxyXG4gICAgICAgICAgICAgIGRhdGEtbmFtZT17cC5kYXRhTmFtZX1cclxuICAgICAgICAgICAgICBkPXtwLmR9XHJcbiAgICAgICAgICAgICAgZmlsbD17aW5jcmVtZW50QnV0dG9uRmlsbCB8fCBwLmRlZmF1bHRGaWxsfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgICB7LyogSmVcdTAxNUJsaSBjaGNlc3ogZG9kYVx1MDEwNyBpa29uXHUwMTE5IFNWRyBcIitcIiBuYSB0eW0ga3N6dGFcdTAxNDJjaWUsIHpyXHUwMEYzYiB0byB0dXRhaiwgbnAuOiAqL31cclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLyo8ZyB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoWCBZKSBzY2FsZShTKVwiPlxyXG4gICAgICAgICAgICB7RGVmYXVsdEluY3JlbWVudEljb25TdmdDb250ZW50fVxyXG4gICAgICAgICAgPC9nPiovXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB7LyogSWtvbmEgSW5jcmVtZW50ICgrKSAqL31cclxuICAgICAgICAgIDxnXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3N2Z0xheW91dERhdGEuYnV0dG9ucy5pbmNyZW1lbnQuaWNvbkFuY2hvclh9LCAke3N2Z0xheW91dERhdGEuYnV0dG9ucy5pbmNyZW1lbnQuaWNvbkFuY2hvcll9KSBzY2FsZSgke2ljb25BY3R1YWxTY2FsZX0pIHRyYW5zbGF0ZSgtJHtcclxuICAgICAgICAgICAgICBpY29uVmlld0JveFNpemUgLyAyXHJcbiAgICAgICAgICAgIH0sIC0ke2ljb25WaWV3Qm94U2l6ZSAvIDJ9KWB9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHBvaW50ZXJFdmVudHM6IFwibm9uZVwiIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICB2aWV3Qm94PXtgMCAwICR7aWNvblZpZXdCb3hTaXplfSAke2ljb25WaWV3Qm94U2l6ZX1gfVxyXG4gICAgICAgICAgICAgIHdpZHRoPXtpY29uVmlld0JveFNpemV9XHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXtpY29uVmlld0JveFNpemV9XHJcbiAgICAgICAgICAgICAgZmlsbD1cIndoaXRlXCJcclxuICAgICAgICAgICAgICBvdmVyZmxvdz1cInZpc2libGVcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge0RlZmF1bHRJbmNyZW1lbnRJY29uU3ZnQ29udGVudH1cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L2c+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgICA8L3N2Zz5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17aW5wdXRSZWZ9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgJHtIVE1MX0lOUFVUX0NMQVNTX05BTUV9ICR7aW5wdXRDbGFzc05hbWUgfHwgXCJcIn1gfSAvLyBLbGFzYSB6IFR3b2plZ28gSFRNTFxyXG4gICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgIG5hbWU9e25hbWV9XHJcbiAgICAgICAgaWQ9e2lkfVxyXG4gICAgICAgIHZhbHVlPXtkaXNwbGF5VmFsdWV9IC8vIGRpc3BsYXlWYWx1ZSBqZXN0IGp1XHUwMTdDIHN0cmluZ2llbSBsdWIgcHVzdHltIHN0cmluZ2llbVxyXG4gICAgICAgIG1pbj17bWlufVxyXG4gICAgICAgIG1heD17bWF4fVxyXG4gICAgICAgIHN0ZXA9e3N0ZXB9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICAgIG9uSW5wdXQ9e2hhbmRsZUlucHV0Q2hhbmdlfSAvLyBQb2RcdTAxNDJcdTAxMDVjem9ueSBwb3ByYXdueSBoYW5kbGVyXHJcbiAgICAgICAgc3R5bGU9e2h0bWxJbnB1dFN0eWxlfVxyXG4gICAgICAgIGFyaWEtbGFiZWw9e3Byb3BzW1wiYXJpYS1sYWJlbFwiXSB8fCBcIldhcnRvXHUwMTVCXHUwMTA3IGxpY3pib3dhXCJ9XHJcbiAgICAgICAgey4uLnJlc3REaXZQcm9wc31cclxuICAgICAgLz5cclxuICAgICAge1xyXG4gICAgICAgIC8vIFptaWVuaW9uZSB6IHJlc3RJbnB1dFByb3BzLCBibyB0ZSBzXHUwMTA1IGRsYSBnXHUwMTQyXHUwMEYzd25lZ28gZGl2YVxyXG4gICAgICAgIC8vIEplXHUwMTVCbGkgY2hjZXN6IHByemVrYXp5d2FcdTAxMDcgZG9kYXRrb3dlIGF0cnlidXR5IGRvIGlucHV0YSxcclxuICAgICAgICAvLyBtdXNpc3ogamUgb3NvYm5vIG9ic1x1MDE0MnVcdTAxN0N5XHUwMTA3IGx1YiBuYXp3YVx1MDEwNyBucC4gaHRtbElucHV0UHJvcHNcclxuICAgICAgfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iLCAiLy8gRGVmaW5pY2plIHR5cFx1MDBGM3dcclxudHlwZSBFeGNlbE5lc3RlZE51bWJlckFycmF5ID0gbnVtYmVyIHwgRXhjZWxOZXN0ZWROdW1iZXJBcnJheVtdO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhjZWxOZXN0ZWROID0gRXhjZWxOZXN0ZWROdW1iZXJBcnJheTtcclxuZXhwb3J0IHR5cGUgRXhjZWxSZXN1bHRzID0gTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROdW1iZXJBcnJheT47XHJcbmV4cG9ydCB0eXBlIEV4Y2VsU2V0c1NldCA9IHtcclxuICB2YXI6IHN0cmluZzsgLy8gTmF6d2Egem1pZW5uZWogd2VqXHUwMTVCY2lvd2VqXHJcbiAgdmFsOiBFeGNlbE5lc3RlZE51bWJlckFycmF5OyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyB6bWllbm5laiAobGljemJhIGx1YiB6YWduaWVcdTAxN0NkXHUwMTdDb25hIHRhYmxpY2EgbGljemIpXHJcbn07XHJcblxyXG4vLyBUeXAgZGxhIGZ1bmtjamkgb2JsaWN6ZW5pb3dlajogcHJ6eWptdWplIG1hcFx1MDExOSwgendyYWNhIG9ibGljem9uXHUwMTA1IHdhcnRvXHUwMTVCXHUwMTA3XHJcbnR5cGUgQ2FsY3VsYXRpb25GdW5jdGlvbiA9IChjdXJyZW50TWFwOiBFeGNlbFJlc3VsdHMpID0+IEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXk7XHJcblxyXG5leHBvcnQgdHlwZSBFeGNlbFNldHNHZXQgPSB7XHJcbiAgdmFyOiBzdHJpbmc7IC8vIE5hendhIG5vd2VqLCBvYmxpY3pvbmVqIHptaWVubmVqXHJcbiAgdmFsOiBDYWxjdWxhdGlvbkZ1bmN0aW9uOyAvLyBGdW5rY2phIG9ibGljemFqXHUwMTA1Y2Egd2FydG9cdTAxNUJcdTAxMDcgdGVqIHptaWVubmVqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFptaWVuaW9ubyB6IGBmdW5gIG5hIGB2YWxgIHpnb2RuaWUgeiBUd29pbSBwcnp5a1x1MDE0MmFkZW0gdVx1MDE3Q3ljaWFcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGdW5rY2phIEV4Y2VsIHByemV0d2FyemEgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93ZSBpIHd5a29udWplIHpkZWZpbmlvd2FuZSBvYmxpY3plbmlhLlxyXG4gKiBAcGFyYW0gaW5wdXRWYWx1ZXMgV2FydG9cdTAxNUJjaSBwb2N6XHUwMTA1dGtvd2UgZG8gdW1pZXN6Y3plbmlhIHcgbWFwaWUuXHJcbiAqIEBwYXJhbSBjYWxjc1ZhbHVlcyBEZWZpbmljamUgb2JsaWN6ZVx1MDE0NCBkbyB3eWtvbmFuaWEuXHJcbiAqIEByZXR1cm5zIE1hcGEgemF3aWVyYWpcdTAxMDVjYSB3c3p5c3RraWUgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93ZSBpIG9ibGljem9uZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBFeGNlbChcclxuICBpbnB1dFZhbHVlczogRXhjZWxTZXRzU2V0IHwgRXhjZWxTZXRzU2V0W10sXHJcbiAgY2FsY3NWYWx1ZXM/OiBFeGNlbFNldHNHZXQgfCBFeGNlbFNldHNHZXRbXSAvLyBEcnVnaSBhcmd1bWVudCBqZXN0IG9wY2pvbmFsbnlcclxuKTogRXhjZWxSZXN1bHRzIHsgLy8gWndyYWNhbXkgbWFwXHUwMTE5IHogYmFyZHppZWogc3pjemVnXHUwMEYzXHUwMTQyb3d5bSB0eXBlbVxyXG4gIFxyXG4gIC8vIEluaWNqYWxpemFjamEgbWFweSB6IHBvcHJhd255bWkgdHlwYW1pXHJcbiAgY29uc3QgTTpFeGNlbFJlc3VsdHMgPSBuZXcgTWFwPHN0cmluZywgRXhjZWxOZXN0ZWROdW1iZXJBcnJheT4oKTtcclxuXHJcbiAgLy8gMS4gUHJ6ZXR3YXJ6YW5pZSB3YXJ0b1x1MDE1QmNpIHdlalx1MDE1QmNpb3d5Y2ggKGlucHV0VmFsdWVzKVxyXG4gIC8vIE5vcm1hbGl6YWNqYSBpbnB1dFZhbHVlcyBkbyB0YWJsaWN5LCBqZVx1MDE1QmxpIHByemVrYXphbm8gcG9qZWR5bmN6eSBvYmlla3RcclxuICBjb25zdCByZXNvbHZlZElucHV0VmFsdWVzID0gIUFycmF5LmlzQXJyYXkoaW5wdXRWYWx1ZXMpID8gW2lucHV0VmFsdWVzXSA6IGlucHV0VmFsdWVzO1xyXG4gIHJlc29sdmVkSW5wdXRWYWx1ZXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIE0uc2V0KGl0ZW0udmFyLCBpdGVtLnZhbCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIDIuIFByemV0d2FyemFuaWUgd2FydG9cdTAxNUJjaSBvYmxpY3plbmlvd3ljaCAoY2FsY3NWYWx1ZXMpXHJcbiAgaWYgKGNhbGNzVmFsdWVzKSB7IC8vIFd5a29uYWogdHlsa28sIGplXHUwMTVCbGkgY2FsY3NWYWx1ZXMgem9zdGFcdTAxNDJ5IGRvc3RhcmN6b25lXHJcbiAgICAvLyBOb3JtYWxpemFjamEgY2FsY3NWYWx1ZXMgZG8gdGFibGljeSwgamVcdTAxNUJsaSBwcnpla2F6YW5vIHBvamVkeW5jenkgb2JpZWt0XHJcbiAgICBjb25zdCByZXNvbHZlZENhbGNzVmFsdWVzID0gIUFycmF5LmlzQXJyYXkoY2FsY3NWYWx1ZXMpID8gW2NhbGNzVmFsdWVzXSA6IGNhbGNzVmFsdWVzO1xyXG4gICAgXHJcbiAgICByZXNvbHZlZENhbGNzVmFsdWVzLmZvckVhY2goY2FsY0l0ZW0gPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIFd5d29cdTAxNDJhbmllIGZ1bmtjamkgb2JsaWN6ZW5pb3dlaiB1XHUwMTdDeXRrb3duaWthLCBwcnpla2F6dWpcdTAxMDVjIGFrdHVhbG5cdTAxMDUgbWFwXHUwMTE5IE1cclxuICAgICAgICBjb25zdCByZXN1bHRWYWx1ZSA9IGNhbGNJdGVtLnZhbChNKTtcclxuICAgICAgICAvLyBaYXBpc2FuaWUgd3luaWt1IG9ibGljemVcdTAxNDQgZG8gbWFweSBNXHJcbiAgICAgICAgTS5zZXQoY2FsY0l0ZW0udmFyLCByZXN1bHRWYWx1ZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQlx1MDE0Mlx1MDEwNWQgcG9kY3phcyBvYmxpY3phbmlhIHptaWVubmVqIFwiJHtjYWxjSXRlbS52YXJ9XCI6YCwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpKTtcclxuICAgICAgICAvLyBNb1x1MDE3Q2VzeiB6ZGVjeWRvd2FcdTAxMDcsIGphayBvYnNcdTAxNDJ1XHUwMTdDeVx1MDEwNyBiXHUwMTQyXHUwMTA1ZDogcG9taW5cdTAxMDVcdTAxMDcsIHphcGlzYVx1MDEwNyBiXHUwMTQyXHUwMTA1ZCwgcHJ6ZXJ3YVx1MDEwNywgaXRwLlxyXG4gICAgICAgIC8vIE5hIHJhemllIHphcGlzdWplbXkgYHVuZGVmaW5lZGAsIGFieSB3c2themFcdTAxMDcgcHJvYmxlbS5cclxuICAgICAgICBNLnNldChjYWxjSXRlbS52YXIsIHVuZGVmaW5lZCBhcyBhbnkpOyAvLyBVXHUwMTdDeXdhbXkgYGFzIGFueWAgYWJ5IHBvendvbGlcdTAxMDcgbmEgYHVuZGVmaW5lZGAgdyBtYXBpZSB6IHR5cGVtIEV4Y2VsTmVzdGVkTnVtYmVyQXJyYXlcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gTTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVydWplIHRhYmxpY1x1MDExOSBsaWN6YiAocHJ6ZWR6aWFcdTAxNDIpIG8gb2tyZVx1MDE1QmxvbmVqIGxpY3piaWUgZWxlbWVudFx1MDBGM3csIGtyb2t1IGkgd2FydG9cdTAxNUJjaSBwb2N6XHUwMTA1dGtvd2VqLlxyXG4gKlxyXG4gKiBAcGFyYW0gc3RhcnRBdCBXYXJ0b1x1MDE1Qlx1MDEwNyBwb2N6XHUwMTA1dGtvd2EgcGllcndzemVnbyBlbGVtZW50dSB3IHRhYmxpY3kuXHJcbiAqIEBwYXJhbSBzdGVwIEtyb2sgKHJcdTAwRjNcdTAxN0NuaWNhKSBtaVx1MDExOWR6eSBrb2xlam55bWkgZWxlbWVudGFtaSB3IHRhYmxpY3kuIE1vXHUwMTdDZSBieVx1MDEwNyBkb2RhdG5pLCB1amVtbnkgbHViIHplcm93eS5cclxuICogQHBhcmFtIGl0ZW1zIExpY3piYSBlbGVtZW50XHUwMEYzdyBkbyB3eWdlbmVyb3dhbmlhIHcgdGFibGljeS5cclxuICogQHJldHVybnMgVGFibGljYSBsaWN6YiAobnVtYmVyW10pIHJlcHJlemVudHVqXHUwMTA1Y2Egd3lnZW5lcm93YW55IHByemVkemlhXHUwMTQyLlxyXG4gKiBad3JhY2EgcHVzdFx1MDEwNSB0YWJsaWNcdTAxMTksIGplXHUwMTVCbGkgYGl0ZW1zYCBqZXN0IG1uaWVqc3plIGx1YiByXHUwMEYzd25lIDAuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFJhbmdlRmlyc3RTdGVwU2l6ZShzdGFydEF0OiBudW1iZXIsIHN0ZXA6IG51bWJlciwgaXRlbXM6IG51bWJlcik6IG51bWJlcltdIHtcclxuICBpZiAoaXRlbXMgPD0gMCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzdWx0OiBudW1iZXJbXSA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXM7IGkrKykge1xyXG4gICAgcmVzdWx0LnB1c2goc3RhcnRBdCArIChpICogc3RlcCkpO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJ1amUgdGFibGljXHUwMTE5IGxpY3piIChwcnplZHppYVx1MDE0MiksIHphY3p5bmFqXHUwMTA1YyBvZCBgc3RhcnRBdGAsIHBvc3RcdTAxMTlwdWpcdTAxMDVjIG8gYHN0ZXBgLFxyXG4gKiBhXHUwMTdDIGRvIG9zaVx1MDEwNWduaVx1MDExOWNpYSAoaSBwb3RlbmNqYWxuaWUgd1x1MDE0Mlx1MDEwNWN6ZW5pYSkgYGVuZEF0YC5cclxuICpcclxuICogQHBhcmFtIHN0YXJ0QXQgV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIHBpZXJ3c3plZ28gZWxlbWVudHUgdyB0YWJsaWN5LlxyXG4gKiBAcGFyYW0gc3RlcCBLcm9rIChyXHUwMEYzXHUwMTdDbmljYSkgbWlcdTAxMTlkenkga29sZWpueW1pIGVsZW1lbnRhbWkgdyB0YWJsaWN5LiBNb1x1MDE3Q2UgYnlcdTAxMDcgZG9kYXRuaSwgdWplbW55IGx1YiB6ZXJvd3kuXHJcbiAqIEBwYXJhbSBlbmRBdCBXYXJ0b1x1MDE1Qlx1MDEwNyBrb1x1MDE0NGNvd2EgcHJ6ZWR6aWFcdTAxNDJ1LiBFbGVtZW50eSBiXHUwMTE5ZFx1MDEwNSBnZW5lcm93YW5lIHRhayBkXHUwMTQydWdvLCBqYWtcclxuICogZFx1MDE0MnVnbyBtaWVzemN6XHUwMTA1IHNpXHUwMTE5IHcgcHJ6ZWR6aWFsZSBva3JlXHUwMTVCbG9ueW0gcHJ6ZXogYHN0YXJ0QXRgLCBgc3RlcGAgaSBgZW5kQXRgICh3XHUwMTQyXHUwMTA1Y3puaWUpLlxyXG4gKiBAcmV0dXJucyBUYWJsaWNhIGxpY3piIChudW1iZXJbXSkgcmVwcmV6ZW50dWpcdTAxMDVjYSB3eWdlbmVyb3dhbnkgcHJ6ZWR6aWFcdTAxNDIuXHJcbiAqIFp3cmFjYSBwdXN0XHUwMTA1IHRhYmxpY1x1MDExOSwgamVcdTAxNUJsaSBuaWUgbW9cdTAxN0NuYSB3eWdlbmVyb3dhXHUwMTA3IFx1MDE3Q2FkbnljaCBlbGVtZW50XHUwMEYzd1xyXG4gKiAobnAuIHN0YXJ0QXQgPiBlbmRBdCBwcnp5IGRvZGF0bmltIGtyb2t1LCBsdWIgamVcdTAxNUJsaSBzdGVwPTAgYSBzdGFydEF0ICE9PSBlbmRBdCkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFJhbmdlRmlyc3RTdGVwTGFzdChzdGFydEF0OiBudW1iZXIsIHN0ZXA6IG51bWJlciwgZW5kQXQ6IG51bWJlcik6IG51bWJlcltdIHtcclxuICBjb25zdCByZXN1bHQ6IG51bWJlcltdID0gW107XHJcblxyXG4gIGlmIChzdGVwID09PSAwKSB7XHJcbiAgICAvLyBKZVx1MDE1QmxpIGtyb2sgd3lub3NpIDAsIHByemVkemlhXHUwMTQyIG1vXHUwMTdDZSB6YXdpZXJhXHUwMTA3IHR5bGtvIGplZGVuIGVsZW1lbnQsXHJcbiAgICAvLyBqZVx1MDE1QmxpIHN0YXJ0QXQgamVzdCByXHUwMEYzd25lIGVuZEF0LlxyXG4gICAgaWYgKHN0YXJ0QXQgPT09IGVuZEF0KSB7XHJcbiAgICAgIHJlc3VsdC5wdXNoKHN0YXJ0QXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDsgLy8gWndyYWNhIFtzdGFydEF0XSBsdWIgW11cclxuICB9XHJcblxyXG4gIGlmIChzdGVwID4gMCkge1xyXG4gICAgLy8gS3JvayBkb2RhdG5pOiBpZHppZW15IHcgZ1x1MDBGM3JcdTAxMTlcclxuICAgIGlmIChzdGFydEF0ID4gZW5kQXQpIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIGplc3QganVcdTAxN0MgemEgd2FydG9cdTAxNUJjaVx1MDEwNSBrb1x1MDE0NGNvd1x1MDEwNVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgY3VycmVudFZhbHVlID0gc3RhcnRBdDsgY3VycmVudFZhbHVlIDw9IGVuZEF0OyBjdXJyZW50VmFsdWUgKz0gc3RlcCkge1xyXG4gICAgICByZXN1bHQucHVzaChjdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7IC8vIHN0ZXAgPCAwXHJcbiAgICAvLyBLcm9rIHVqZW1ueTogaWR6aWVteSB3IGRcdTAwRjNcdTAxNDJcclxuICAgIGlmIChzdGFydEF0IDwgZW5kQXQpIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdDsgLy8gV2FydG9cdTAxNUJcdTAxMDcgcG9jelx1MDEwNXRrb3dhIGplc3QganVcdTAxN0MgemEgd2FydG9cdTAxNUJjaVx1MDEwNSBrb1x1MDE0NGNvd1x1MDEwNSAodyB6XHUwMTQyXHUwMTA1IHN0cm9uXHUwMTE5KVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgY3VycmVudFZhbHVlID0gc3RhcnRBdDsgY3VycmVudFZhbHVlID49IGVuZEF0OyBjdXJyZW50VmFsdWUgKz0gc3RlcCkge1xyXG4gICAgICByZXN1bHQucHVzaChjdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLy8gQWx0ZXJuYXR5d25hLCBiYXJkemllaiB6d2lcdTAxMTl6XHUwMTQyYSBpbXBsZW1lbnRhY2phIHVcdTAxN0N5d2FqXHUwMTA1Y2EgQXJyYXkuZnJvbSAoZHppYVx1MDE0MmEgdGFrIHNhbW8pOlxyXG4vKlxyXG5mdW5jdGlvbiBpbml0UmFuZ2VGaXJzdFN0ZXBTaXplQWx0ZXJuYXRpdmUoaXRlbXM6IG51bWJlciwgc3RlcDogbnVtYmVyLCBzdGFydEF0OiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgaWYgKGl0ZW1zIDw9IDApIHtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IGl0ZW1zIH0sIChfLCBpbmRleCkgPT4gc3RhcnRBdCArIGluZGV4ICogc3RlcCk7XHJcbn1cclxuXHJcbmNvbnNvbGUubG9nKFwiLS0tIFRlc3QgYWx0ZXJuYXR5d25laiBpbXBsZW1lbnRhY2ppIC0tLVwiKTtcclxuY29uc3QgcmFuZ2UxX2FsdCA9IGluaXRSYW5nZUZpcnN0U3RlcFNpemVBbHRlcm5hdGl2ZSg1LCAyLCAxMCk7XHJcbmNvbnNvbGUubG9nKFwiUmFuZ2UgMSBBbHQgKGl0ZW1zOiA1LCBzdGVwOiAyLCBzdGFydEF0OiAxMCk6XCIsIHJhbmdlMV9hbHQpO1xyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhjZWw7XHJcblxyXG4vLyAtLS0gUHJ6eWtcdTAxNDJhZCB1XHUwMTdDeWNpYSAtLS1cclxuLy8vLyBEZWZpbmljamEgd2FydG9cdTAxNUJjaSB3ZWpcdTAxNUJjaW93eWNoXHJcbi8vY29uc3QgaW5wdXRzOiBFeGNlbFNldHNTZXRbXSA9IFtcclxuLy8gIHsgdmFyOiBcImlcIiwgdmFsOiBbMSwgMiwgMywgNCwgNSwgNiwgN10gfSxcclxuLy8gIHsgdmFyOiBcImpcIiwgdmFsOiBbMSwgMywgMiwgNywgNiwgNSwgNF0gfVxyXG4vL107XHJcbi8vXHJcbi8vLy8gRGVmaW5pY2phIG9ibGljemVcdTAxNDRcclxuLy9jb25zdCBjYWxjdWxhdGlvbnM6IEV4Y2VsU2V0c0dldFtdID0gW1xyXG4vLyAge1xyXG4vLyAgICB2YXI6IFwiaWpfc3VtXCIsIC8vIE5vd2Egem1pZW5uYSwga3RcdTAwRjNyYSBiXHUwMTE5ZHppZSBzdW1cdTAxMDUgaVtrXSArIGpba11cclxuLy8gICAgdmFsOiAoY3VycmVudE1hcCkgPT4ge1xyXG4vLyAgICAgIC8vIFBvYmllcmFteSB0YWJsaWNlICdpJyBvcmF6ICdqJyB6IG1hcHlcclxuLy8gICAgICBjb25zdCBpQXJyYXkgPSBjdXJyZW50TWFwLmdldChcImlcIik7XHJcbi8vICAgICAgY29uc3QgakFycmF5ID0gY3VycmVudE1hcC5nZXQoXCJqXCIpO1xyXG4vL1xyXG4vLyAgICAgIC8vIFdhXHUwMTdDbmU6IFNwcmF3ZHplbmllIHR5cFx1MDBGM3cgaSBvYnNcdTAxNDJ1Z2EgYlx1MDE0Mlx1MDExOWRcdTAwRjN3IHdld25cdTAxMDV0cnogZnVua2NqaSB1XHUwMTdDeXRrb3duaWthXHJcbi8vICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGlBcnJheSkgfHwgIUFycmF5LmlzQXJyYXkoakFycmF5KSkge1xyXG4vLyAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWm1pZW5uZSAnaScgb3JheiAnaicgbXVzelx1MDEwNSBieVx1MDEwNyB0YWJsaWNhbWkgZGxhIHRlaiBvcGVyYWNqaSBzdW1vd2FuaWEuXCIpO1xyXG4vLyAgICAgIH1cclxuLy8gICAgICBpZiAoaUFycmF5LnNvbWUoaXNOYU4pIHx8IGpBcnJheS5zb21lKGlzTmFOKSkge1xyXG4vLyAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXc3p5c3RraWUgZWxlbWVudHkgdyB0YWJsaWNhY2ggJ2knIG9yYXogJ2onIG11c3pcdTAxMDUgYnlcdTAxMDcgbGljemJhbWkuXCIpO1xyXG4vLyAgICAgIH1cclxuLy8gICAgICBpZiAoaUFycmF5Lmxlbmd0aCAhPT0gakFycmF5Lmxlbmd0aCkge1xyXG4vLyAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGFibGljZSAnaScgb3JheiAnaicgbXVzelx1MDEwNSBtaWVcdTAxMDcgdGFrXHUwMTA1IHNhbVx1MDEwNSBkXHUwMTQydWdvXHUwMTVCXHUwMTA3IGRvIHN1bW93YW5pYSBlbGVtZW50IHBvIGVsZW1lbmNpZS5cIik7XHJcbi8vICAgICAgfVxyXG4vL1xyXG4vLyAgICAgIC8vIFd5a29uYW5pZSBvcGVyYWNqaSBzdW1vd2FuaWEgZWxlbWVudCBwbyBlbGVtZW5jaWVcclxuLy8gICAgICAvLyBaYWtcdTAxNDJhZGFteSwgXHUwMTdDZSBzXHUwMTA1IHRvIHBcdTAxNDJhc2tpZSB0YWJsaWNlIGxpY3piLCB6Z29kbmllIHogcHJ6eWtcdTAxNDJhZGVtLlxyXG4vLyAgICAgIC8vIERsYSBFeGNlbE5lc3RlZE51bWJlckFycmF5IG9wZXJhY2phIGJ5XHUwMTQyYWJ5IGJhcmR6aWVqIHpcdTAxNDJvXHUwMTdDb25hIChyZWt1cmVuY3lqbmEpLlxyXG4vLyAgICAgIHJldHVybiBpQXJyYXkubWFwKCh2YWxfaSwgaW5kZXgpID0+ICh2YWxfaSBhcyBudW1iZXIpICsgKGpBcnJheVtpbmRleF0gYXMgbnVtYmVyKSk7XHJcbi8vICAgIH1cclxuLy8gIH0sXHJcbi8vICB7XHJcbi8vICAgIHZhcjogXCJrXCIsIC8vIFByenlrXHUwMTQyYWQgaW5uZWogem1pZW5uZWosIG5wLiBza2FsYXJcclxuLy8gICAgdmFsOiAoKSA9PiAxMDAgLy8gUHJvc3RhIGZ1bmtjamEgendyYWNhalx1MDEwNWNhIHdhcnRvXHUwMTVCXHUwMTA3XHJcbi8vICB9LFxyXG4vLyAge1xyXG4vLyAgICB2YXI6IFwiaV9wbHVzX2tcIiwgLy8gUHJ6eWtcdTAxNDJhZCBvcGVyYWNqaSB0YWJsaWNhICsgc2thbGFyIChicm9hZGNhc3RpbmcpXHJcbi8vICAgIHZhbDogKGN1cnJlbnRNYXApID0+IHtcclxuLy8gICAgICAgIGNvbnN0IGlBcnJheSA9IGN1cnJlbnRNYXAuZ2V0KFwiaVwiKTtcclxuLy8gICAgICAgIGNvbnN0IGtWYWwgPSBjdXJyZW50TWFwLmdldChcImtcIik7XHJcbi8vXHJcbi8vICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoaUFycmF5KSB8fCB0eXBlb2Yga1ZhbCAhPT0gJ251bWJlcicpIHtcclxuLy8gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCInaScgbXVzaSBieVx1MDEwNyB0YWJsaWNcdTAxMDUsIGEgJ2snIGxpY3piXHUwMTA1LlwiKTtcclxuLy8gICAgICAgIH1cclxuLy8gICAgICAgIHJldHVybiBpQXJyYXkubWFwKHZhbF9pID0+ICh2YWxfaSBhcyBudW1iZXIpICsgKGtWYWwgYXMgbnVtYmVyKSk7XHJcbi8vICAgIH1cclxuLy8gIH1cclxuLy9dO1xyXG4vL1xyXG4vLy8vIFd5d29cdTAxNDJhbmllIGZ1bmtjamkgRXhjZWxcclxuLy9jb25zdCBBMSA9IEV4Y2VsKGlucHV0cywgY2FsY3VsYXRpb25zKTtcclxuLy9cclxuLy8vLyBXeVx1MDE1QndpZXRsZW5pZSB3eW5pa1x1MDBGM3dcclxuLy9jb25zb2xlLmxvZyhcIkNhXHUwMTQyYSBtYXBhIEExOlwiLCBBMSk7XHJcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2knKTpcIiwgQTEuZ2V0KFwiaVwiKSk7XHJcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2onKTpcIiwgQTEuZ2V0KFwialwiKSk7XHJcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2lqX3N1bScpOlwiLCBBMS5nZXQoXCJpal9zdW1cIikpOyAvLyBPY3pla2l3YW5lOiBbMiwgNSwgNSwgMTEsIDExLCAxMSwgMTFdXHJcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2snKTpcIiwgQTEuZ2V0KFwia1wiKSk7ICAgICAgICAgLy8gT2N6ZWtpd2FuZTogMTAwXHJcbi8vY29uc29sZS5sb2coXCJBMS5nZXQoJ2lfcGx1c19rJyk6XCIsIEExLmdldChcImlfcGx1c19rXCIpKTsgLy8gT2N6ZWtpd2FuZTogWzEwMSwgMTAyLCAxMDMsIDEwNCwgMTA1LCAxMDYsIDEwN11cclxuLy9jb25zb2xlLmxvZyhcIldhcnRvXHUwMTVCXHUwMTA3IGlbM10gKGluZGVrcyAzLCBjenlsaSBjendhcnR5IGVsZW1lbnQpOlwiLCAoQTEuZ2V0KFwiaVwiKSBhcyBudW1iZXJbXSlbM10pOyAvLyBPY3pla2l3YW5lOiA0XHJcbiIsICJleHBvcnQgZnVuY3Rpb24gZmxvb3JMb2cyKHg6bnVtYmVyKTpudW1iZXIge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgubG9nMih4KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwb3cyKHg6bnVtYmVyKTpudW1iZXIge1xyXG4gIHJldHVybiBNYXRoLnBvdygyLHgpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwb3cyX2xhc3RCZWZvcmVOZXh0KHg6bnVtYmVyKTpudW1iZXIge1xyXG4gIHJldHVybiBNYXRoLnBvdygyLHgrMSktMTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTm90VmFsTmF0dXJhbFBvcyh2YWw6dW5rbm93bik6Ym9vbGVhbiB7XHJcbiAgcmV0dXJuICh0eXBlb2YgdmFsICE9PSBcIm51bWJlclwiIHx8IGlzTmFOKHZhbCkgfHwgIU51bWJlci5pc0ludGVnZXIodmFsKSB8fFxyXG4gIHZhbCA8PSAwKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm8odmFsOnVua25vd24pOmJvb2xlYW4ge1xyXG4gIHJldHVybiAodHlwZW9mIHZhbCAhPT0gXCJudW1iZXJcIiB8fCBpc05hTih2YWwpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbCkgfHxcclxuICB2YWwgPCAwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RTb21Ob3RPZlZhbHNBcnJheSh2OnN0cmluZywgYXJyOnVua25vd24sIHRlc3Q6XCJpc05vdFZhbE5hdHVyYWxQb3NcInxcImlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvXCIpOnZvaWQge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBabWllbm5lICR7dn0gIG11c3pcdTAxMDUgYnlcdTAxMDcgdGFibGljYW1pLmAsXHJcbiAgICApO1xyXG4gIH1cclxuICBzd2l0Y2ggKHRlc3QpIHtcclxuICAgIGNhc2UgXCJpc05vdFZhbE5hdHVyYWxQb3NcIjpcclxuICAgICAgaWYgKGFyci5zb21lKGlzTm90VmFsTmF0dXJhbFBvcykpIHt0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICBgV3N6eXN0a2llIGVsZW1lbnR5IHcgdGFibGljeSAke3Z9IG11c3pcdTAxMDUgYnlcdTAxMDcgbGljemJhbWkgbmF0dXJhbG55bWkgZG9kYXRuaW1pICh3aVx1MDExOWtzenltaSBvZCAwKS5gLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiaXNOb3RWYWxOYXR1cmFsUG9zV2l0aFplcm9cIjpcclxuICAgICAgaWYgKGFyci5zb21lKGlzTm90VmFsTmF0dXJhbFBvc1dpdGhaZXJvKSkge3Rocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgV3N6eXN0a2llIGVsZW1lbnR5IHcgdGFibGljeSAke3Z9IG11c3pcdTAxMDUgYnlcdTAxMDcgbGljemJhbWkgbmF0dXJhbG55bWkgZG9kYXRuaW1pIHogemVybyAod2lcdTAxMTlrc3p5bWkgb2QgLTEpLmAsXHJcbiAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcbiIsICIvKiogQGpzeFJ1bnRpbWUgYXV0b21hdGljICovXHJcbi8qKiBAanN4SW1wb3J0U291cmNlIGh0dHBzOi8vZXNtLnNoL3ByZWFjdEAxMC4yNi44ICovXHJcblxyXG5pbXBvcnQgeyBKU1ggfSBmcm9tIFwiaHR0cHM6Ly9lc20uc2gvcHJlYWN0QDEwLjI2LjhcIjtcclxuXHJcbi8vIFphXHUwMTQyXHUwMEYzXHUwMTdDbXksIFx1MDE3Q2UgdGUgdHlweSBzXHUwMTA1IHpkZWZpbmlvd2FuZSBnbG9iYWxuaWUgbHViIGltcG9ydG93YW5lXHJcbi8vIEplXHUwMTVCbGkgbmllLCBvZGtvbWVudHVqIGplIGx1YiBwcnplbmllXHUwMTVCIGRvIHdzcFx1MDBGM2xuZWdvIHBsaWt1IHR5cFx1MDBGM3cuXHJcbnR5cGUgTmVzdGVkTnVtYmVyQXJyYXkgPSBudW1iZXIgfCBOZXN0ZWROdW1iZXJBcnJheVtdO1xyXG50eXBlIEV4Y2VsUmVzdWx0cyA9IE1hcDxzdHJpbmcsIE5lc3RlZE51bWJlckFycmF5PjtcclxuXHJcbmludGVyZmFjZSBQbG90RXhjZWxQcm9wcyB7XHJcbiAgZGF0YTogRXhjZWxSZXN1bHRzO1xyXG4gIHR5cGU6IFwicm93XCIgfCBcImNvbFwiOyAvLyBPcmllbnRhY2phIHRhYmVsaTogXCJyb3dcIiAoZGFuZSB3IHdpZXJzemFjaCksIFwiY29sXCIgKGRhbmUgdyBrb2x1bW5hY2gpXHJcbiAgY2FwdGlvbj86IHN0cmluZzsgICAgIC8vIE9wY2pvbmFsbnkgcG9kcGlzIHRhYmVsaVxyXG4gIHRhYmxlQ2xhc3NOYW1lPzogc3RyaW5nOyAvLyBPcGNqb25hbG5hIGtsYXNhIENTUyBkbGEgdGFiZWxpXHJcbiAgdGhDbGFzc05hbWU/OiBzdHJpbmc7ICAgIC8vIE9wY2pvbmFsbmEga2xhc2EgQ1NTIGRsYSBrb21cdTAwRjNyZWsgdGhcclxuICB0ZENsYXNzTmFtZT86IHN0cmluZzsgICAgLy8gT3Bjam9uYWxuYSBrbGFzYSBDU1MgZGxhIGtvbVx1MDBGM3JlayB0ZFxyXG59XHJcblxyXG4vLyBGdW5rY2phIHBvbW9jbmljemEgZG8gZm9ybWF0b3dhbmlhIHdhcnRvXHUwMTVCY2kga29tXHUwMEYzcmtpXHJcbmNvbnN0IGZvcm1hdENlbGxWYWx1ZSA9ICh2YWx1ZTogTmVzdGVkTnVtYmVyQXJyYXkgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHJldHVybiBTdHJpbmcodmFsdWUpO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgLy8gRGxhIHphZ25pZVx1MDE3Q2RcdTAxN0NvbnljaCB0YWJsaWMsIEpTT04uc3RyaW5naWZ5IG1vXHUwMTdDZSBieVx1MDEwNyBkb2JyeW0gcm96d2lcdTAxMDV6YW5pZW0uXHJcbiAgICAvLyBEbGEgcFx1MDE0MmFza2ljaCB0YWJsaWMgbGljemIsIG1vXHUwMTdDbmEgdVx1MDE3Q3lcdTAxMDcgdmFsdWUuam9pbignLCAnKS5cclxuICAgIC8vIFR1dGFqIHd5YmllcmFteSBKU09OLnN0cmluZ2lmeSBkbGEgb2dcdTAwRjNsbm9cdTAxNUJjaS5cclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiBcIltCXHUwMTQyXHUwMTA1ZCBzZXJpYWxpemFjamkgdGFibGljeV1cIjtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7IC8vIEZhbGxiYWNrXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxvdEV4Y2VsKHsgZGF0YSwgdHlwZSwgY2FwdGlvbiwgdGFibGVDbGFzc05hbWUsIHRoQ2xhc3NOYW1lLCB0ZENsYXNzTmFtZSB9OiBQbG90RXhjZWxQcm9wcyk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XHJcbiAgaWYgKCFkYXRhIHx8IGRhdGEuc2l6ZSA9PT0gMCkge1xyXG4gICAgcmV0dXJuIDxwPkJyYWsgZGFueWNoIGRvIHd5XHUwMTVCd2lldGxlbmlhLjwvcD47IC8vIEx1YiBudWxsLCBqZVx1MDE1QmxpIG5pZSBjaGNlc3ogbmljIHJlbmRlcm93YVx1MDEwN1xyXG4gIH1cclxuXHJcbiAgY29uc3Qga2V5cyA9IEFycmF5LmZyb20oZGF0YS5rZXlzKCkpO1xyXG4gIFxyXG4gIC8vIFVzdGFsZW5pZSBtYWtzeW1hbG5laiBkXHUwMTQydWdvXHUwMTVCY2kgc2VyaWkgZGFueWNoIChkbGEgd3lyXHUwMEYzd25hbmlhIHRhYmVsaSlcclxuICBsZXQgbWF4TGVuZ3RoID0gMDtcclxuICBsZXQgaGFzQW55RGF0YSA9IGZhbHNlO1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gZGF0YS5nZXQoa2V5KTtcclxuICAgIGhhc0FueURhdGEgPSB0cnVlO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgIG1heExlbmd0aCA9IE1hdGgubWF4KG1heExlbmd0aCwgdmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gSmVcdTAxNUJsaSBzXHUwMTA1IGRhbmUsIGFsZSBuaWUgbWEgdGFibGljIChucC4gc2FtZSBza2FsYXJ5KSBsdWIgd3N6eXN0a2llIHRhYmxpY2Ugc1x1MDEwNSBwdXN0ZSxcclxuICAvLyB0byBrYVx1MDE3Q2RhIHNlcmlhIG1hIGVmZWt0eXduaWUgXCJkXHUwMTQydWdvXHUwMTVCXHUwMTA3XCIgMS5cclxuICBpZiAoaGFzQW55RGF0YSAmJiBtYXhMZW5ndGggPT09IDApIHtcclxuICAgIG1heExlbmd0aCA9IDE7XHJcbiAgfVxyXG4gIGlmIChtYXhMZW5ndGggPT09IDAgJiYga2V5cy5sZW5ndGggPiAwKSB7IC8vIEplXHUwMTVCbGkgc1x1MDEwNSBrbHVjemUsIGFsZSBicmFrIGRhbnljaCAobnAuIG1hcG93YW5pZSBuYSB1bmRlZmluZWQpXHJcbiAgICAgIG1heExlbmd0aCA9IDE7IC8vIFBva2FcdTAxN0MgcHJ6eW5ham1uaWVqIG5hZ1x1MDE0Mlx1MDBGM3draVxyXG4gIH1cclxuXHJcbiAgXHJcbiAgaWYgKHR5cGUgPT09IFwiY29sXCIpIHtcclxuICAgIC8vIFN0YW5kYXJkb3dhIHRhYmVsYToga2x1Y3plIG1hcHkgamFrbyBuYWdcdTAxNDJcdTAwRjN3a2kga29sdW1uXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzTmFtZX0+XHJcbiAgICAgICAge2NhcHRpb24gJiYgPGNhcHRpb24+e2NhcHRpb259PC9jYXB0aW9uPn1cclxuICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIHtrZXlzLm1hcChrZXkgPT4gPHRoIGNsYXNzTmFtZT17dGhDbGFzc05hbWV9IGtleT17a2V5fT57a2V5fTwvdGg+KX1cclxuICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90aGVhZD5cclxuICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogbWF4TGVuZ3RoIH0pLm1hcCgoXywgcm93SW5kZXgpID0+IChcclxuICAgICAgICAgICAgPHRyIGtleT17YHJvdy0ke3Jvd0luZGV4fWB9PlxyXG4gICAgICAgICAgICAgIHtrZXlzLm1hcChrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VyaWVzID0gZGF0YS5nZXQoa2V5KTtcclxuICAgICAgICAgICAgICAgIGxldCBjZWxsQ29udGVudDogc3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZXJpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllc1tyb3dJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dJbmRleCA9PT0gMCkgeyAvLyBXYXJ0b1x1MDE1Qlx1MDEwNyBza2FsYXJuYSwgd3lcdTAxNUJ3aWV0bCB0eWxrbyB3IHBpZXJ3c3p5bSB3aWVyc3p1XHJcbiAgICAgICAgICAgICAgICAgIGNlbGxDb250ZW50ID0gZm9ybWF0Q2VsbFZhbHVlKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT17dGRDbGFzc05hbWV9IGtleT17YCR7a2V5fS1yb3ctJHtyb3dJbmRleH1gfT57Y2VsbENvbnRlbnR9PC90ZD47XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicm93XCIpIHtcclxuICAgIC8vIFRhYmVsYSB0cmFuc3Bvbm93YW5hOiBrbHVjemUgbWFweSBqYWtvIG5hZ1x1MDE0Mlx1MDBGM3draSB3aWVyc3p5XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzTmFtZX0+XHJcbiAgICAgICAge2NhcHRpb24gJiYgPGNhcHRpb24+e2NhcHRpb259PC9jYXB0aW9uPn1cclxuICAgICAgICB7LyogTW9cdTAxN0NuYSBkb2RhXHUwMTA3IDx0aGVhZD4geiBuYWdcdTAxNDJcdTAwRjN3a2FtaSBrb2x1bW4sIGplXHUwMTVCbGkgc1x1MDEwNSBwb3RyemVibmUsIG5wLiBcIlBhcmFtZXRyXCIsIFwiV2FydG9cdTAxNUJcdTAxMDcgMVwiLCBcIldhcnRvXHUwMTVCXHUwMTA3IDJcIiwgLi4uICovfVxyXG4gICAgICAgIHsvKiBEbGEgdXByb3N6Y3plbmlhLCBwb21pamFteSA8dGhlYWQ+IHR1dGFqLCBhIHBpZXJ3c3p5IDx0aD4gdyBrYVx1MDE3Q2R5bSB3aWVyc3p1IGR6aWFcdTAxNDJhIGpha28gbmFnXHUwMTQyXHUwMEYzd2VrIHdpZXJzemEgKi99XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAge2tleXMubWFwKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlcmllcyA9IGRhdGEuZ2V0KGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPHRyIGtleT17YHNlcmllcy1yb3ctJHtrZXl9YH0+XHJcbiAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJyb3dcIiBjbGFzc05hbWU9e3RoQ2xhc3NOYW1lfT57a2V5fTwvdGg+IHsvKiBOYWdcdTAxNDJcdTAwRjN3ZWsgd2llcnN6YSAqL31cclxuICAgICAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBtYXhMZW5ndGggfSkubWFwKChfLCBjb2xJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBsZXQgY2VsbENvbnRlbnQ6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZXJpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzW2NvbEluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sSW5kZXggPT09IDApIHsgLy8gV2FydG9cdTAxNUJcdTAxMDcgc2thbGFybmEsIHd5XHUwMTVCd2lldGwgdHlsa28gdyBwaWVyd3N6ZWoga29sdW1uaWUgZGFueWNoXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbENvbnRlbnQgPSBmb3JtYXRDZWxsVmFsdWUoc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT17dGRDbGFzc05hbWV9IGtleT17YCR7a2V5fS1jb2wtJHtjb2xJbmRleH1gfT57Y2VsbENvbnRlbnR9PC90ZD47XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gPHA+TmllcHJhd2lkXHUwMTQyb3d5IHR5cCB0YWJlbGk6IHt0eXBlfTwvcD47IC8vIEZhbGxiYWNrXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsY0FBYzs7O0FDQXZCLFNBQWlCLGlCQUFpQjs7O0FDQ2xDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQVFMLFNBR0EsVUFIQSxLQUdBLFlBSEE7QUFERixJQUFNLGlDQUNKLG9CQUFDLFVBQUssR0FBRSxLQUFJLEdBQUUsTUFBSyxPQUFNLE1BQUssUUFBTyxLQUFJLElBQUcsS0FBSTtBQUVsRCxJQUFNLGlDQUNKLGlDQUNFO0FBQUEsc0JBQUMsVUFBSyxHQUFFLE1BQUssR0FBRSxLQUFJLE9BQU0sS0FBSSxRQUFPLE1BQUssSUFBRyxLQUFJO0FBQUEsRUFDaEQsb0JBQUMsVUFBSyxHQUFFLEtBQUksR0FBRSxNQUFLLE9BQU0sTUFBSyxRQUFPLEtBQUksSUFBRyxLQUFJO0FBQUEsR0FDbEQ7QUFvQ0YsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixrQkFBa0I7QUFBQSxFQUNsQixtQkFBbUI7QUFBQSxFQUNuQixTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxVQUFVO0FBQUEsVUFDVixHQUFHO0FBQUEsVUFDSCxhQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLEdBQUc7QUFBQSxVQUNILGFBQ0U7QUFBQTtBQUFBLFFBQ0o7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLFVBQVU7QUFBQSxVQUNWLEdBQUc7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LG9CQUNWLGVBQWU7QUFBQSxvQkFDZixLQUFLO0FBQUEsb0JBQ0wsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLFFBQVE7QUFBQSxvQkFDcEMsTUFBTTtBQUFBLG9CQUNOLGFBQVk7QUFBQSxvQkFDWixjQUFXO0FBQUE7QUFBQSxnQkFDYjtBQUFBO0FBQUE7QUFBQSxVQUNGO0FBQUEsVUFDQSxnQkFBQUEsS0FBQyxPQUNDLDBCQUFBQSxLQUFDLFFBQ0MsMEJBQUFBLEtBQUMsUUFBRyw2REFBcUMsR0FDM0MsR0FDRjtBQUFBO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFDQyxRQUFRLE1BQU0sT0FBTyxLQUNwQixnQkFBQUMsTUFBQUYsV0FBQSxFQVNFO0FBQUEsc0JBQUFDLEtBQUMsUUFBRztBQUFBLE1BQ0osZ0JBQUFBLEtBQUMsUUFBRyxxQ0FBa0I7QUFBQSxNQUN0QixnQkFBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE1BQU0sUUFBUTtBQUFBLFVBQ2QsTUFBSztBQUFBLFVBQ0wsU0FBUTtBQUFBO0FBQUEsTUFDVjtBQUFBLE9BQ0Y7QUFBQSxLQUVKO0FBRUo7OztBRDFMTyxnQkFBQUUsWUFBQTtBQUFQLE9BQU8sZ0JBQUFBLEtBQUMsT0FBSSxHQUFJLFNBQVMsZUFBZSxNQUFNLENBQUU7IiwKICAibmFtZXMiOiBbImpzeCIsICJqc3hzIiwgIkZyYWdtZW50IiwgImpzeCIsICJqc3hzIiwgImpzeCJdCn0K
