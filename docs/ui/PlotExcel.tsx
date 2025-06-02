/** @jsxRuntime automatic */
/** @jsxImportSource https://esm.sh/preact@10.26.8 */

import { JSX } from "https://esm.sh/preact@10.26.8";

// Załóżmy, że te typy są zdefiniowane globalnie lub importowane
// Jeśli nie, odkomentuj je lub przenieś do wspólnego pliku typów.
type NestedNumberArray = number | NestedNumberArray[];
type ExcelResults = Map<string, NestedNumberArray>;

interface PlotExcelProps {
  data: ExcelResults;
  type: "row" | "col"; // Orientacja tabeli: "row" (dane w wierszach), "col" (dane w kolumnach)
  caption?: string; // Opcjonalny podpis tabeli
  tableClassName?: string; // Opcjonalna klasa CSS dla tabeli
  thClassName?: string; // Opcjonalna klasa CSS dla komórek th
  tdClassName?: string; // Opcjonalna klasa CSS dla komórek td
}

// Funkcja pomocnicza do formatowania wartości komórki
const formatCellValue = (value: NestedNumberArray | undefined): string => {
  if (value === undefined || value === null) return "";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    // Dla zagnieżdżonych tablic, JSON.stringify może być dobrym rozwiązaniem.
    // Dla płaskich tablic liczb, można użyć value.join(', ').
    // Tutaj wybieramy JSON.stringify dla ogólności.
    try {
      return JSON.stringify(value);
    } catch (e) {
      return "[Błąd serializacji tablicy]";
    }
  }
  return String(value); // Fallback
};

export function PlotExcel(
  { data, type, caption, tableClassName, thClassName, tdClassName }:
    PlotExcelProps,
): JSX.Element | null {
  if (!data || data.size === 0) {
    return <p>Brak danych do wyświetlenia.</p>; // Lub null, jeśli nie chcesz nic renderować
  }

  const keys = Array.from(data.keys());

  // Ustalenie maksymalnej długości serii danych (dla wyrównania tabeli)
  let maxLength = 0;
  let hasAnyData = false;
  for (const key of keys) {
    const value = data.get(key);
    hasAnyData = true;
    if (Array.isArray(value)) {
      maxLength = Math.max(maxLength, value.length);
    }
  }
  // Jeśli są dane, ale nie ma tablic (np. same skalary) lub wszystkie tablice są puste,
  // to każda seria ma efektywnie "długość" 1.
  if (hasAnyData && maxLength === 0) {
    maxLength = 1;
  }
  if (maxLength === 0 && keys.length > 0) { // Jeśli są klucze, ale brak danych (np. mapowanie na undefined)
    maxLength = 1; // Pokaż przynajmniej nagłówki
  }

  if (type === "col") {
    // Standardowa tabela: klucze mapy jako nagłówki kolumn
    return (
      <table className={tableClassName}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {keys.map((key) => (
              <th className={thClassName} key={key}>【{key}】</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxLength }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {keys.map((key) => {
                const series = data.get(key);
                let cellContent: string = "";
                if (Array.isArray(series)) {
                  cellContent = formatCellValue(series[rowIndex]);
                } else if (rowIndex === 0) { // Wartość skalarna, wyświetl tylko w pierwszym wierszu
                  cellContent = formatCellValue(series);
                }
                return (
                  <td className={tdClassName} key={`${key}-row-${rowIndex}`}>
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (type === "row") {
    // Tabela transponowana: klucze mapy jako nagłówki wierszy
    return (
      <table className={tableClassName}>
        {caption && <caption>{caption}</caption>}
        {/* Można dodać <thead> z nagłówkami kolumn, jeśli są potrzebne, np. "Parametr", "Wartość 1", "Wartość 2", ... */}
        {/* Dla uproszczenia, pomijamy <thead> tutaj, a pierwszy <th> w każdym wierszu działa jako nagłówek wiersza */}
        <tbody>
          {keys.map((key) => {
            const series = data.get(key);
            return (
              <tr key={`series-row-${key}`}>
                <th scope="row" className={thClassName}>【{key}】</th>{" "}
                {/* Nagłówek wiersza */}
                {Array.from({ length: maxLength }).map((_, colIndex) => {
                  let cellContent: string = "";
                  if (Array.isArray(series)) {
                    cellContent = formatCellValue(series[colIndex]);
                  } else if (colIndex === 0) { // Wartość skalarna, wyświetl tylko w pierwszej kolumnie danych
                    cellContent = formatCellValue(series);
                  }
                  return (
                    <td className={tdClassName} key={`${key}-col-${colIndex}`}>
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <p>Nieprawidłowy typ tabeli: {type}</p>; // Fallback
}
