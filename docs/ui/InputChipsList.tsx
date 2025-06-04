// ./ui/InputChipsList.tsx
/** @jsxRuntime automatic */
/** @jsxImportSource https://esm.sh/preact@10.26.8 */

import {
  useEffect,
  useRef,
  useState,
} from "https://esm.sh/preact@10.26.8/hooks";
import { JSX } from "https://esm.sh/preact@10.26.8";

type Mode = "View" | "Drag" | "Click";

interface InputChipsListProps {
  availableValues: Map<string, number>;
  values: string[];
  defaultValues?: string[];
  titleAvailable?: string;
  titleSelected?: string;
  titleModeView?: string;
  titleModeDrag?: string;
  titleModeClick?: string;
  titleModeButton?: string;
  onChange?: (updated: string[]) => void;
}

export function InputChipsList(props: InputChipsListProps) {
  const {
    titleAvailable,
    titleSelected,
    titleModeButton = "Mode",
    titleModeView = "View",
    titleModeDrag = "Drag",
    titleModeClick = "Click",
    availableValues,
    values,
    defaultValues = [],
    onChange = () => {},
  } = props;

  const [mode, setMode] = useState<Mode>("View");
  const [modeTitle, setModeTitle] = useState("View");
  const [selected, setSelected] = useState<string[]>([...defaultValues]);

  // compute available list
  const computeRemaining = (): string[] => {
    const usedCount = new Map<string, number>();
    selected.forEach((val) => {
      usedCount.set(val, (usedCount.get(val) ?? 0) + 1);
    });

    const result: string[] = [];
    for (const [key, total] of availableValues.entries()) {
      const used = usedCount.get(key) ?? 0;
      const remaining = total - used;
      for (let i = 0; i < remaining; i++) {
        result.push(key);
      }
    }
    return result;
  };

  const remaining = computeRemaining();

  // Sync with parent
  useEffect(() => {
    onChange([...selected]);
  }, [selected]);

  // toggle mode
  const toggleMode = () => {
    setMode((prev) => {
      if (prev === "View") {
        setModeTitle(titleModeDrag);
        return "Drag";
      } else if (prev === "Drag") {
        setModeTitle(titleModeClick);
        return "Click";
      } else {
        setModeTitle(titleModeView);
        return "View";
      }
    });
  };

  // click handlers
  const handleAdd = (val: string) => {
    setSelected([...selected, val]);
  };

  const handleRemove = (index: number) => {
    setSelected((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleMoveLeft = (index: number) => {
    if (index <= 0) return;
    setSelected((prev) => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const handleMoveRight = (index: number) => {
    if (index >= selected.length - 1) return;
    setSelected((prev) => {
      const copy = [...prev];
      [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
      return copy;
    });
  };

  return (
    <div class="inputchips-container">
      <div class="inputchips-mode">
        <span class="inputchips-mode-label">
          {titleModeButton}:
        </span>
        <button
          onClick={toggleMode}
          class="inputchips-mode-button"
        >
          {modeTitle}
        </button>
      </div>

      <div class="inputchips-container-list">
        <div class="inputchips-list">
          {titleAvailable && (
            <div class="inputchips-list-title">{titleAvailable}</div>
          )}
          <div class="inputchips-list-box">
            {remaining.map((chip, idx) => (
              <span
                key={`rem-${chip}-${idx}`}
                class="inputchips-chips inputchips-chips-available"
              >
                {chip}
                {mode === "Click" && (
                  <button
                    onClick={() => handleAdd(chip)}
                    class="inputchips-chips-button inputchips-chips-button-add"
                  >
                    +
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        <div class="inputchips-list">
          {titleSelected && (
            <div class="inputchips-list-title">{titleSelected}</div>
          )}
          <div class="inputchips-list-box">
            {selected.map((chip, index) => (
              <span
                key={`sel-${chip}-${index}`}
                class="inputchips-chips inputchips-chips-selected"
              >
                {mode === "Click" && (
                  <>
                    {index > 0 && (
                      <button
                        onClick={() => handleMoveLeft(index)}
                        class="inputchips-chips-button inputchips-chips-button-ord"
                      >
                        ←
                      </button>
                    )}
                    {index < selected.length - 1 && (
                      <button
                        onClick={() => handleMoveRight(index)}
                        class="inputchips-chips-button inputchips-chips-button-ord"
                      >
                        →
                      </button>
                    )}
                  </>
                )}
                {chip}
                {mode === "Click" && (
                  <>
                    <button
                      onClick={() => handleRemove(index)}
                      class="inputchips-chips-button inputchips-chips-button-del"
                    >
                      x
                    </button>
                  </>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
