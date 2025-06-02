/** @jsxRuntime automatic */
/** @jsxImportSource https://esm.sh/preact@10.26.8 */

import {
  useCallback,
  useEffect,
  useRef,
} from "https://esm.sh/preact@10.26.8/hooks";
import { JSX } from "https://esm.sh/preact@10.26.8";

// Zawartość SVG dla domyślnych ikon +/- (jeśli zdecydujesz się je nakładać)
// Na razie nie są one automatycznie renderowane w tej wersji,
// ponieważ zakładam, że Twój główny SVG definiuje wygląd przycisków.
// Jeśli chcesz je dodać, musisz przywrócić logikę ich renderowania z transformacjami.
const DefaultDecrementIconSvgContent = (
  <rect x="5" y="11" width="14" height="2" rx="1" />
);
const DefaultIncrementIconSvgContent = (
  <>
    <rect x="11" y="5" width="2" height="14" rx="1" />
    <rect x="5" y="11" width="14" height="2" rx="1" />
  </>
);

export interface InputNumberProps {
  value?: string | number;
  defaultValue?: string | number;
  def?: string | number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  readOnly?: boolean;
  onChange?: (event: JSX.TargetedEvent<HTMLInputElement, Event>) => void;
  onValueChange?: (newValue: number | undefined, name?: string) => void;
  ratioSIZE?: number;
  wrapperClassName?: string;
  svgClassName?: string;
  inputClassName?: string;
  style?: JSX.CSSProperties;
  selectButtonStyle?: JSX.CSSProperties;
  incrementButtonStyle?: JSX.CSSProperties;
  decrementButtonStyle?: JSX.CSSProperties;
  inputAreaStyle?: JSX.CSSProperties;
  selectButtonFill?: string;
  incrementButtonFill?: string;
  decrementButtonFill?: string;
  inputAreaRectFill?: string;
  inputAreaBorderFill?: string;
  // iconFill?: string; // Jeśli będziesz używał osobnych ikon +/-
  [key: string]: any;
}

const svgLayoutData = {
  baseViewBoxWidth: 174,
  baseViewBoxHeight: 72,
  buttons: {
    choose: { // Zmieniono z 'selecect' na 'choose' dla spójności z Twoim HTML
      name: "btn-choose",
      paths: [
        {
          dataName: "btn-fill",
          d: "M115.75,71.62c-10.03,0-19.93-1.62-28.63-4.67l-.12-.04-.12.04c-8.7,3.06-18.59,4.67-28.63,4.67-13.06,0-25.81-2.75-36.02-7.75l26.96-15.21h75.61l26.96,15.21c-10.2,5-22.96,7.75-36.02,7.75Z",
          defaultFill: "#919191",
        },
        {
          dataName: "btn-border-fill",
          d: "M124.71,49.04l26.25,14.81c-10.04,4.78-22.48,7.4-35.21,7.4-9.99,0-19.84-1.61-28.5-4.65l-.25-.09-.25.09c-8.66,3.04-18.51,4.65-28.5,4.65-12.73,0-25.16-2.62-35.21-7.4l26.25-14.81h75.41M124.9,48.29H49.1l-27.66,15.6c10.03,5.06,22.85,8.11,36.82,8.11,10.46,0,20.27-1.71,28.75-4.69,8.48,2.98,18.29,4.69,28.75,4.69,13.97,0,26.78-3.04,36.82-8.11l-27.66-15.6h0Z",
          defaultFill:
            "#505050", /* Kolor dla obrysu/drugiej warstwy, dostosuj */
        },
      ],
    },
    increment: {
      name: "btn-increment",
      paths: [
        {
          dataName: "btn-fill",
          d: "M127.38,43.51V1.1c26.83,3.37,46.25,18.01,46.25,34.9,0,9.19-5.68,17.91-16.01,24.57l-30.24-17.06Z",
          defaultFill: "#21597f",
        },
        {
          dataName: "btn-border-fill",
          d: "M127.75,1.53c26.42,3.45,45.5,17.86,45.5,34.47,0,9-5.55,17.56-15.65,24.13l-29.85-16.84V1.53M127,.68v43.05l30.63,17.28c10.13-6.48,16.37-15.29,16.37-25.01,0-17.5-20.21-32.08-47-35.32h0Z",
          defaultFill: "#104060", /* Ciemniejszy dla obrysu? Dostosuj */
        },
      ],
      iconAnchorX: 150, // 150px w prawo (w systemie viewBox 174x72)
      iconAnchorY: 30, // 30px w dół (w systemie viewBox 174x72)
    },
    decrement: {
      name: "btn-decrement",
      paths: [
        {
          dataName: "btn-fill",
          d: "M16.38,60.57C6.06,53.91.38,45.19.38,36,.38,19.11,19.8,4.47,46.62,1.1v42.41l-30.24,17.06Z",
          defaultFill: "#b21010",
        },
        {
          dataName: "btn-border-fill",
          d: "M46.25,1.53v41.76h0s-29.85,16.84-29.85,16.84C6.3,53.56.75,45,.75,36,.75,19.39,19.83,4.97,46.25,1.53M47,.68C20.21,3.92,0,18.5,0,36c0,9.72,6.24,18.53,16.37,25.01l30.63-17.28V.68h0Z",
          defaultFill: "#800000", /* Ciemniejszy dla obrysu? Dostosuj */
        },
      ],
      iconAnchorX: 25, // 20px w prawo (w systemie viewBox 174x72)
      iconAnchorY: 30, // 30px w dół (w systemie viewBox 174x72)
    },
  },
  inputArea: {
    name: "input",
    rect: {
      x: 52.38,
      y: 0.38,
      width: 69.25,
      height: 42.54,
      defaultFill: "#fff",
    },
    borderPath: {
      d: "M121.25.75v41.79H52.75V.75h68.5M122,0H52v43.29h70V0h0Z",
      defaultFill: "#333",
    },
  },
};

const CONTAINER_CLASS_NAME = "inputnumber-container";
const SVG_CLASS_NAME = "inputnumber-svg";
const SVG_BUTTON_CLASS_NAME = "inputnumber-svg-button"; // Używane w Twoim HTML
const HTML_INPUT_CLASS_NAME = "inputnumber-html-input"; // Używane w Twoim HTML

export function InputNumber(props: InputNumberProps): JSX.Element {
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

  const inputRef = useRef<HTMLInputElement>(null);

  // Inicjalizacja wartości inputa przy montowaniu lub zmianie defaultValue/value
  useEffect(() => {
    if (inputRef.current) {
      if (value !== undefined) {
        inputRef.current.value = String(value);
      } else if (defaultValue !== undefined) {
        inputRef.current.value = String(defaultValue);
      } else {
        inputRef.current.value = ""; // Jawne ustawienie na pusty string, jeśli brak wartości
      }
    }
  }, [value, defaultValue]);

  const handleStep = useCallback((direction: "up" | "down") => {
    if (inputRef.current && !disabled && !readOnly) {
      if (direction === "up") inputRef.current.stepUp();
      else inputRef.current.stepDown();

      // Symulacja zdarzenia input, aby wywołać handleInputChange
      const event = new Event("input", { bubbles: true, cancelable: true });
      inputRef.current.dispatchEvent(event);
    }
  }, [disabled, readOnly]);

  const handleDecrement = useCallback(() => handleStep("down"), [handleStep]);
  const handleIncrement = useCallback(() => handleStep("up"), [handleStep]);

  const handleChooseClick = useCallback(() => {
    if (inputRef.current && !disabled && !readOnly) {
      const newValue = def ?? 1; // Jak w Twoim JS
      inputRef.current.value = String(newValue);

      // Ręczne wywołanie logiki zmiany wartości
      if (onValueChange) onValueChange(newValue, name);
      if (onChange) {
        const event = new Event("change", {
          bubbles: true,
        }) as unknown as JSX.TargetedEvent<HTMLInputElement, Event>;
        Object.defineProperty(event, "target", {
          writable: false,
          value: inputRef.current,
        });
        Object.defineProperty(event, "currentTarget", {
          writable: false,
          value: inputRef.current,
        });
        onChange(event);
      }
      console.log("Choose button clicked, value set to 1");
    }
  }, [disabled, readOnly, name, onValueChange, onChange]);

  // === POCZĄTEK DEFINICJI handleInputChange ===
  const handleInputChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = e.currentTarget as HTMLInputElement;
    const rawValue = target.value;
    let numericValue: number | undefined;

    if (rawValue === "") {
      numericValue = undefined;
    } else {
      // Spróbuj sparsować jako liczbę; parseFloat jest bardziej elastyczny
      const parsed = parseFloat(rawValue);
      numericValue = isNaN(parsed) ? undefined : parsed;
    }

    if (onValueChange) {
      onValueChange(numericValue, name);
    }
    // Jeśli użytkownik przekazał własny onChange, też go wywołaj
    // To zdarzenie "input" z elementu HTML
    if (onChange) {
      onChange(e);
    }
  };
  // === KONIEC DEFINICJI handleInputChange ===

  const containerWidth = svgLayoutData.baseViewBoxWidth * ratioSIZE;
  const containerHeight = svgLayoutData.baseViewBoxHeight * ratioSIZE;

  // Style dla nałożonego inputu HTML, skalowane przez ratioSIZE
  const htmlInputStyle: JSX.CSSProperties = {
    position: "absolute",
    left: `${svgLayoutData.inputArea.rect.x * ratioSIZE}px`,
    top: `${svgLayoutData.inputArea.rect.y * ratioSIZE}px`,
    width: `${svgLayoutData.inputArea.rect.width * ratioSIZE}px`,
    height: `${svgLayoutData.inputArea.rect.height * ratioSIZE}px`,
    border: "none",
    backgroundColor: "transparent",
    color: "#333",
    textAlign: "center",
    fontSize: `${Math.max(8, 18 * ratioSIZE)}px`, // Dostosuj czcionkę
    outline: "none",
    padding: `0 ${Math.max(1, 2 * ratioSIZE)}px`,
    margin: 0,
    boxSizing: "border-box",
    MozAppearance: "textfield",
    WebkitAppearance: "none",
    appearance: "none",
    zIndex: 2,
  };

  // Rozmiar ikon +/-. Załóżmy, że oryginalne ikony są 24x24.
  // Chcemy je przeskalować, aby pasowały do przycisków.
  // Przykładowo, niech zajmują około 50% wysokości przycisku (w jednostkach viewBox)
  const iconViewBoxSize = 24; // Oryginalny rozmiar viewBox ikon +/-
  const targetIconHeightInSvgUnits = svgLayoutData.baseViewBoxHeight * 0.25 *
    (ratioSIZE > 0.5 ? 1 : ratioSIZE * 2); // np. 25% wysokości całego komponentu
  const iconActualScale = 1.5 * (targetIconHeightInSvgUnits / iconViewBoxSize);

  let displayValue: string = ""; // Input value zawsze jako string
  if (value !== undefined) {
    displayValue = String(value);
  } else if (defaultValue !== undefined) {
    displayValue = String(defaultValue);
  }

  const commonSvgButtonStyle: JSX.CSSProperties = {
    cursor: disabled || readOnly ? "default" : "pointer",
  };

  return (
    <div
      className={`${CONTAINER_CLASS_NAME} ${wrapperClassName || ""}`}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      {...restDivProps}
    >
      <svg
        className={`${SVG_CLASS_NAME} ${svgClassName || ""}`}
        data-name="input-number" // Z Twojego HTML
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${svgLayoutData.baseViewBoxWidth} ${svgLayoutData.baseViewBoxHeight}`}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        aria-hidden="true"
      >
        {/* Grupa "Choose/Select" */}
        <g
          className={SVG_BUTTON_CLASS_NAME} // Klasa z Twojego HTML
          data-name={svgLayoutData.buttons.choose.name} // data-name z Twojego HTML
          onClick={!disabled ? handleChooseClick : undefined}
          style={{ ...commonSvgButtonStyle, ...(selectButtonStyle || {}) }}
          pointerEvents={disabled ? "none" : "auto"}
        >
          {svgLayoutData.buttons.choose.paths.map((p, i) => (
            <path
              key={`choose-path-${i}`}
              data-name={p.dataName}
              d={p.d}
              fill={selectButtonFill || p.defaultFill}
            />
          ))}
        </g>

        {/* Grupa "Input Area" */}
        <g
          data-name={svgLayoutData.inputArea.name}
          style={inputAreaStyle || {}}
        >
          <rect
            x={svgLayoutData.inputArea.rect.x}
            y={svgLayoutData.inputArea.rect.y}
            width={svgLayoutData.inputArea.rect.width}
            height={svgLayoutData.inputArea.rect.height}
            fill={inputAreaRectFill || svgLayoutData.inputArea.rect.defaultFill}
          />
          <path
            d={svgLayoutData.inputArea.borderPath.d}
            fill={inputAreaBorderFill ||
              svgLayoutData.inputArea.borderPath.defaultFill}
          />
        </g>

        {/* Grupa "Decrement" */}
        <g
          className={SVG_BUTTON_CLASS_NAME}
          data-name={svgLayoutData.buttons.decrement.name}
          onClick={!disabled && !readOnly ? handleDecrement : undefined}
          style={{ ...commonSvgButtonStyle, ...(decrementButtonStyle || {}) }}
          pointerEvents={disabled || readOnly ? "none" : "auto"}
        >
          {svgLayoutData.buttons.decrement.paths.map((p, i) => (
            <path
              key={`dec-path-${i}`}
              data-name={p.dataName}
              d={p.d}
              fill={decrementButtonFill || p.defaultFill}
            />
          ))}
          {/* Jeśli chcesz dodać ikonę SVG "-" na tym kształcie, zrób to tutaj, np.: */}
          {
            /*<g transform="translate(X Y) scale(S)">
            {DefaultDecrementIconSvgContent}
          </g>*/
          }
          {/* Ikona Decrement (-) */}
          <g
            transform={`translate(${svgLayoutData.buttons.decrement.iconAnchorX}, ${svgLayoutData.buttons.decrement.iconAnchorY}) scale(${iconActualScale}) translate(-${
              iconViewBoxSize / 2
            }, -${iconViewBoxSize / 2})`}
            style={{ pointerEvents: "none" }} // Ikony nie powinny przechwytywać kliknięć
          >
            <svg
              viewBox={`0 0 ${iconViewBoxSize} ${iconViewBoxSize}`}
              width={iconViewBoxSize}
              height={iconViewBoxSize}
              fill="white"
              overflow="visible"
            >
              {DefaultDecrementIconSvgContent}
            </svg>
          </g>
        </g>

        {/* Grupa "Increment" */}
        <g
          className={SVG_BUTTON_CLASS_NAME}
          data-name={svgLayoutData.buttons.increment.name}
          onClick={!disabled && !readOnly ? handleIncrement : undefined}
          style={{ ...commonSvgButtonStyle, ...(incrementButtonStyle || {}) }}
          pointerEvents={disabled || readOnly ? "none" : "auto"}
        >
          {svgLayoutData.buttons.increment.paths.map((p, i) => (
            <path
              key={`inc-path-${i}`}
              data-name={p.dataName}
              d={p.d}
              fill={incrementButtonFill || p.defaultFill}
            />
          ))}
          {/* Jeśli chcesz dodać ikonę SVG "+" na tym kształcie, zrób to tutaj, np.: */}
          {
            /*<g transform="translate(X Y) scale(S)">
            {DefaultIncrementIconSvgContent}
          </g>*/
          }
          {/* Ikona Increment (+) */}
          <g
            transform={`translate(${svgLayoutData.buttons.increment.iconAnchorX}, ${svgLayoutData.buttons.increment.iconAnchorY}) scale(${iconActualScale}) translate(-${
              iconViewBoxSize / 2
            }, -${iconViewBoxSize / 2})`}
            style={{ pointerEvents: "none" }}
          >
            <svg
              viewBox={`0 0 ${iconViewBoxSize} ${iconViewBoxSize}`}
              width={iconViewBoxSize}
              height={iconViewBoxSize}
              fill="white"
              overflow="visible"
            >
              {DefaultIncrementIconSvgContent}
            </svg>
          </g>
        </g>
      </svg>

      <input
        ref={inputRef}
        className={`${HTML_INPUT_CLASS_NAME} ${inputClassName || ""}`} // Klasa z Twojego HTML
        type="number"
        name={name}
        id={id}
        value={displayValue} // displayValue jest już stringiem lub pustym stringiem
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onInput={handleInputChange} // Podłączony poprawny handler
        style={htmlInputStyle}
        aria-label={props["aria-label"] || "Wartość liczbowa"}
        {...restDivProps}
      />
      {
        // Zmienione z restInputProps, bo te są dla głównego diva
        // Jeśli chcesz przekazywać dodatkowe atrybuty do inputa,
        // musisz je osobno obsłużyć lub nazwać np. htmlInputProps
      }
    </div>
  );
}
