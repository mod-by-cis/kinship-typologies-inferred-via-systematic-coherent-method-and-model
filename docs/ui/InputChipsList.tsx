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
  titleMode?: Map<"View" | "Drag" | "Click", string>;
  titleModeButton?: string;
  onChange?: (updated: string[]) => void;
}

export function InputChipsMode(
  View: string = "View",
  Drag: string = "Drag",
  Click: string = "Click",
): Map<"View" | "Drag" | "Click", string> {
  return new Map<"View" | "Drag" | "Click", string>([
    ["View", View],
    ["Drag", Drag],
    ["Click", Click],
  ]);
}

export function InputChipsList(props: InputChipsListProps) {
  const {
    titleAvailable,
    titleSelected,
    titleModeButton = "Mode",
    titleMode = InputChipsMode(),
    availableValues,
    values,
    defaultValues = [],
    onChange = () => {},
  } = props;

  const [mode, setMode] = useState<Mode>("View");
  // Lepiej bez oddzielnego modeTitle, tylko generuj dynamicznie z mode
  // const [modeTitle, setModeTitle] = useState("View");

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

  // Toggle mode cycling: View -> Drag -> Click -> View ...
  const toggleMode = () => {
    /*
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
    });*/
    setMode((prev) => {
      if (prev === "View") return "Drag";
      if (prev === "Drag") return "Click";
      return "View";
    });
  };

  // Click handlers (only active in Click mode)
  const handleAdd = (val: string) => {
    if (mode !== "Click") return; // Blokada poza trybem Click
    setSelected([...selected, val]);
  };

  const handleRemove = (index: number) => {
    if (mode !== "Click") return; // Blokada poza trybem Click
    setSelected((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  const handleMoveLeft = (index: number) => {
    if (mode !== "Click") return; // Blokada poza trybem Click
    if (index <= 0) return;
    setSelected((prev) => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const handleMoveRight = (index: number) => {
    if (mode !== "Click") return; // Blokada poza trybem Click
    if (index >= selected.length - 1) return;
    setSelected((prev) => {
      const copy = [...prev];
      [copy[index], copy[index + 1]] = [copy[index + 1], copy[index]];
      return copy;
    });
  };

  // ----------- Drag & Drop logic (aktywny tylko w trybie Drag) -----------

  // Przechowuje indeks przeciąganego elementu z selected lub null
  const dragIndex = useRef<number | null>(null);

  // Przechowuje chip przeciągany z available (który jeszcze nie jest w selected)
  const dragAvailableChip = useRef<string | null>(null);

  // Handlery dla elementów dostępnych (available chips)
  const onDragStartAvailable = (e: DragEvent, chip: string) => {
    if (mode !== "Drag") {
      e.preventDefault();
      return;
    }
    dragAvailableChip.current = chip;
    e.dataTransfer?.setData("text/plain", chip);
    e.dataTransfer!.effectAllowed = "copy";
  };

  const onDragEndAvailable = (e: DragEvent) => {
    dragAvailableChip.current = null;
  };

  // Handlery dla elementów wybranych (selected chips)
  const onDragStartSelected = (e: DragEvent, index: number) => {
    if (mode !== "Drag") {
      e.preventDefault();
      return;
    }
    dragIndex.current = index;
    e.dataTransfer?.setData("text/plain", selected[index]);
    e.dataTransfer!.effectAllowed = "move";
  };

  const onDragEndSelected = (e: DragEvent) => {
    dragIndex.current = null;
  };

  // Obszar upuszczania - pole selected chips
  const onDropSelected = (e: DragEvent, targetIndex: number | null = null) => {
    e.preventDefault();
    if (mode !== "Drag") return;

    // Przeciągnięto chip z available
    if (dragAvailableChip.current !== null) {
      // Dodaj go na koniec (lub na wskazane miejsce)
      setSelected((prev) => {
        const newSelected = [...prev];
        if (targetIndex === null || targetIndex >= newSelected.length) {
          newSelected.push(dragAvailableChip.current!);
        } else {
          newSelected.splice(targetIndex, 0, dragAvailableChip.current!);
        }
        return newSelected;
      });
      dragAvailableChip.current = null;
      return;
    }

    // Przeciągnięto chip z selected (zmiana kolejności)
    if (dragIndex.current !== null) {
      const fromIndex = dragIndex.current;
      const toIndex = targetIndex !== null ? targetIndex : selected.length - 1;

      if (fromIndex === toIndex) return;

      setSelected((prev) => {
        const copy = [...prev];
        const [moved] = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, moved);
        return copy;
      });
      dragIndex.current = null;
    }
  };

  const onDragOverSelected = (e: DragEvent) => {
    if (mode === "Drag") {
      e.preventDefault(); // pozwól na drop
    }
  };

  // Obszar upuszczania - pole available chips (do usuwania z selected)
  const onDropAvailable = (e: DragEvent) => {
    e.preventDefault();
    if (mode !== "Drag") return;

    if (dragIndex.current !== null) {
      // Usuń z selected (co oznacza "przeniesienie" na available)
      const indexToRemove = dragIndex.current;
      setSelected((prev) => {
        const copy = [...prev];
        copy.splice(indexToRemove, 1);
        return copy;
      });
      dragIndex.current = null;
    }

    // Nie ma sensu przeciągać z available na available - ignorujemy
    dragAvailableChip.current = null;
  };

  const onDragOverAvailable = (e: DragEvent) => {
    if (mode === "Drag") {
      e.preventDefault();
    }
  };

  // ----------- Renderowanie -----------

  return (
    <div
      class="inputchips-container"
      style={{ maxWidth: "600px" }}
    >
      <div class="inputchips-mode">
        <button
          onClick={toggleMode}
          class="inputchips-mode-button"
        >
          {titleModeButton}:<br />
          {titleMode.get(mode)}
        </button>
      </div>

      <div class="inputchips-container-list">
        <div class="inputchips-list">
          {titleAvailable && (
            <div class="inputchips-list-title">{titleAvailable}</div>
          )}
          <div
            class="inputchips-list-box"
            onDrop={onDropAvailable}
            onDragOver={onDragOverAvailable}
          >
            {remaining.map((chip, i) => (
              <span
                key={`rem-${chip}-${i}`}
                draggable={mode === "Drag"}
                onDragStart={(e) =>
                  onDragStartAvailable(e as unknown as DragEvent, chip)}
                onDragEnd={(e) => onDragEndAvailable(e as unknown as DragEvent)}
                class="inputchips-chips inputchips-chips-available"
                style={{
                  cursor: "pointer",
                }}
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
          <div
            class="inputchips-list-box"
            onDrop={(e) => onDropSelected(e)}
            onDragOver={onDragOverSelected}
          >
            {selected.map((chip, i) => (
              <span
                key={`sel-${chip}-${i}`}
                draggable={mode === "Drag"}
                onDragStart={(e) =>
                  onDragStartSelected(e as unknown as DragEvent, i)}
                onDragEnd={(e) => onDragEndSelected(e as unknown as DragEvent)}
                onDrop={(e) => {
                  if (mode === "Drag") {
                    e.preventDefault();
                    onDropSelected(e, i);
                  }
                }}
                onDragOver={(e) => {
                  if (mode === "Drag") e.preventDefault();
                }}
                class="inputchips-chips inputchips-chips-selected"
              >
                {mode === "Click" && (
                  <>
                    {i > 0 && (
                      <button
                        onClick={() => handleMoveLeft(i)}
                        class="inputchips-chips-button inputchips-chips-button-ord"
                      >
                        ←
                      </button>
                    )}
                    {i < selected.length - 1 && (
                      <button
                        onClick={() => handleMoveRight(i)}
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
                      onClick={() => handleRemove(i)}
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
