// Definicje typów
type ExcelNestedNumberArray = number | ExcelNestedNumberArray[];

export type ExcelNestedN = ExcelNestedNumberArray;
export type ExcelResults = Map<string, ExcelNestedNumberArray>;
export type ExcelSetsSet = {
  var: string; // Nazwa zmiennej wejściowej
  val: ExcelNestedNumberArray; // Wartość zmiennej (liczba lub zagnieżdżona tablica liczb)
};

// Typ dla funkcji obliczeniowej: przyjmuje mapę, zwraca obliczoną wartość
type CalculationFunction = (currentMap: ExcelResults) => ExcelNestedNumberArray;

export type ExcelSetsGet = {
  var: string; // Nazwa nowej, obliczonej zmiennej
  val: CalculationFunction; // Funkcja obliczająca wartość tej zmiennej
                           // Zmieniono z `fun` na `val` zgodnie z Twoim przykładem użycia
};

/**
 * Funkcja Excel przetwarza wartości wejściowe i wykonuje zdefiniowane obliczenia.
 * @param inputValues Wartości początkowe do umieszczenia w mapie.
 * @param calcsValues Definicje obliczeń do wykonania.
 * @returns Mapa zawierająca wszystkie wartości wejściowe i obliczone.
 */
export function Excel(
  inputValues: ExcelSetsSet | ExcelSetsSet[],
  calcsValues?: ExcelSetsGet | ExcelSetsGet[] // Drugi argument jest opcjonalny
): ExcelResults { // Zwracamy mapę z bardziej szczegółowym typem
  
  // Inicjalizacja mapy z poprawnymi typami
  const M:ExcelResults = new Map<string, ExcelNestedNumberArray>();

  // 1. Przetwarzanie wartości wejściowych (inputValues)
  // Normalizacja inputValues do tablicy, jeśli przekazano pojedynczy obiekt
  const resolvedInputValues = !Array.isArray(inputValues) ? [inputValues] : inputValues;
  resolvedInputValues.forEach(item => {
    M.set(item.var, item.val);
  });

  // 2. Przetwarzanie wartości obliczeniowych (calcsValues)
  if (calcsValues) { // Wykonaj tylko, jeśli calcsValues zostały dostarczone
    // Normalizacja calcsValues do tablicy, jeśli przekazano pojedynczy obiekt
    const resolvedCalcsValues = !Array.isArray(calcsValues) ? [calcsValues] : calcsValues;
    
    resolvedCalcsValues.forEach(calcItem => {
      try {
        // Wywołanie funkcji obliczeniowej użytkownika, przekazując aktualną mapę M
        const resultValue = calcItem.val(M);
        // Zapisanie wyniku obliczeń do mapy M
        M.set(calcItem.var, resultValue);
      } catch (error) {
        console.error(`Błąd podczas obliczania zmiennej "${calcItem.var}":`, error instanceof Error ? error.message : String(error));
        // Możesz zdecydować, jak obsłużyć błąd: pominąć, zapisać błąd, przerwać, itp.
        // Na razie zapisujemy `undefined`, aby wskazać problem.
        M.set(calcItem.var, undefined as any); // Używamy `as any` aby pozwolić na `undefined` w mapie z typem ExcelNestedNumberArray
      }
    });
  }

  return M;
}

/**
 * Generuje tablicę liczb (przedział) o określonej liczbie elementów, kroku i wartości początkowej.
 *
 * @param startAt Wartość początkowa pierwszego elementu w tablicy.
 * @param step Krok (różnica) między kolejnymi elementami w tablicy. Może być dodatni, ujemny lub zerowy.
 * @param items Liczba elementów do wygenerowania w tablicy.
 * @returns Tablica liczb (number[]) reprezentująca wygenerowany przedział.
 * Zwraca pustą tablicę, jeśli `items` jest mniejsze lub równe 0.
 */
export function initRangeFirstStepSize(startAt: number, step: number, items: number): number[] {
  if (items <= 0) {
    return [];
  }

  const result: number[] = [];
  for (let i = 0; i < items; i++) {
    result.push(startAt + (i * step));
  }
  return result;
}

/**
 * Generuje tablicę liczb (przedział), zaczynając od `startAt`, postępując o `step`,
 * aż do osiągnięcia (i potencjalnie włączenia) `endAt`.
 *
 * @param startAt Wartość początkowa pierwszego elementu w tablicy.
 * @param step Krok (różnica) między kolejnymi elementami w tablicy. Może być dodatni, ujemny lub zerowy.
 * @param endAt Wartość końcowa przedziału. Elementy będą generowane tak długo, jak
 * długo mieszczą się w przedziale określonym przez `startAt`, `step` i `endAt` (włącznie).
 * @returns Tablica liczb (number[]) reprezentująca wygenerowany przedział.
 * Zwraca pustą tablicę, jeśli nie można wygenerować żadnych elementów
 * (np. startAt > endAt przy dodatnim kroku, lub jeśli step=0 a startAt !== endAt).
 */
export function initRangeFirstStepLast(startAt: number, step: number, endAt: number): number[] {
  const result: number[] = [];

  if (step === 0) {
    // Jeśli krok wynosi 0, przedział może zawierać tylko jeden element,
    // jeśli startAt jest równe endAt.
    if (startAt === endAt) {
      result.push(startAt);
    }
    return result; // Zwraca [startAt] lub []
  }

  if (step > 0) {
    // Krok dodatni: idziemy w górę
    if (startAt > endAt) {
      return result; // Wartość początkowa jest już za wartością końcową
    }
    for (let currentValue = startAt; currentValue <= endAt; currentValue += step) {
      result.push(currentValue);
    }
  } else { // step < 0
    // Krok ujemny: idziemy w dół
    if (startAt < endAt) {
      return result; // Wartość początkowa jest już za wartością końcową (w złą stronę)
    }
    for (let currentValue = startAt; currentValue >= endAt; currentValue += step) {
      result.push(currentValue);
    }
  }

  return result;
}

// Alternatywna, bardziej zwięzła implementacja używająca Array.from (działa tak samo):
/*
function initRangeFirstStepSizeAlternative(items: number, step: number, startAt: number): number[] {
  if (items <= 0) {
    return [];
  }
  return Array.from({ length: items }, (_, index) => startAt + index * step);
}

console.log("--- Test alternatywnej implementacji ---");
const range1_alt = initRangeFirstStepSizeAlternative(5, 2, 10);
console.log("Range 1 Alt (items: 5, step: 2, startAt: 10):", range1_alt);
*/



export function ExcelResultSortingOutputAtTable(
  mode: "ROW" | "COL",
  sort: string[],
  data: ExcelResults,
  part: boolean = false
): (string | number)[][] {
  let result: (string | number)[][] = [];

  const TRIM = data.get("h") as number[] | undefined;

  // Nagłówki (pierwszy wiersz lub kolumna)
  const headers = sort.map((key) => key === "=||" ? "" : `【${key}】`);

  result.push(headers); // pierwszy wiersz to nagłówki

  // Zakładamy, że wszystkie tablice mają tę samą długość
  const rowCount = Math.max(
    ...sort.map((key) =>
      Array.isArray(data.get(key)) ? (data.get(key) as number[]).length : 0
    ),
  );

  // ! coto
  let lastTrimValue: number | undefined = TRIM?.[0];

  for (let row = 0; row < rowCount; row++) {
    const rowData: (string | number)[] = [];

    for (const key of sort) {
      if (key === "=||") {
        rowData.push("");
      } else {
        const colData = data.get(key);
        if (Array.isArray(colData)) {
          rowData.push((colData as number[])[row] ?? "");
        } else {
          rowData.push("");
        }
      }
    }

    if (part && TRIM !== undefined && row > 0) {
      const currentTrimValue = TRIM[row];
      if (currentTrimValue !== lastTrimValue) {
        // Wstawiamy pusty wiersz jako separator
        result.push(new Array(headers.length).fill(""));
      }
      lastTrimValue = currentTrimValue;
    }

    result.push(rowData);
  }  
  result = mode != "COL" ? transposeTABLE(result) : result;
  console.log("result",result);
  return result;
}

  function transposeTABLE<T>(matrix: T[][]): T[][] {
    if (matrix.length === 0) return [];
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const result: T[][] = Array.from({ length: cols }, () => new Array<T>(rows));
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        result[j][i] = matrix[i][j];
      }
    }
  
    return result;
  }


export default Excel;

// --- Przykład użycia ---
//// Definicja wartości wejściowych
//const inputs: ExcelSetsSet[] = [
//  { var: "i", val: [1, 2, 3, 4, 5, 6, 7] },
//  { var: "j", val: [1, 3, 2, 7, 6, 5, 4] }
//];
//
//// Definicja obliczeń
//const calculations: ExcelSetsGet[] = [
//  {
//    var: "ij_sum", // Nowa zmienna, która będzie sumą i[k] + j[k]
//    val: (currentMap) => {
//      // Pobieramy tablice 'i' oraz 'j' z mapy
//      const iArray = currentMap.get("i");
//      const jArray = currentMap.get("j");
//
//      // Ważne: Sprawdzenie typów i obsługa błędów wewnątrz funkcji użytkownika
//      if (!Array.isArray(iArray) || !Array.isArray(jArray)) {
//        throw new Error("Zmienne 'i' oraz 'j' muszą być tablicami dla tej operacji sumowania.");
//      }
//      if (iArray.some(isNaN) || jArray.some(isNaN)) {
//          throw new Error("Wszystkie elementy w tablicach 'i' oraz 'j' muszą być liczbami.");
//      }
//      if (iArray.length !== jArray.length) {
//        throw new Error("Tablice 'i' oraz 'j' muszą mieć taką samą długość do sumowania element po elemencie.");
//      }
//
//      // Wykonanie operacji sumowania element po elemencie
//      // Zakładamy, że są to płaskie tablice liczb, zgodnie z przykładem.
//      // Dla ExcelNestedNumberArray operacja byłaby bardziej złożona (rekurencyjna).
//      return iArray.map((val_i, index) => (val_i as number) + (jArray[index] as number));
//    }
//  },
//  {
//    var: "k", // Przykład innej zmiennej, np. skalar
//    val: () => 100 // Prosta funkcja zwracająca wartość
//  },
//  {
//    var: "i_plus_k", // Przykład operacji tablica + skalar (broadcasting)
//    val: (currentMap) => {
//        const iArray = currentMap.get("i");
//        const kVal = currentMap.get("k");
//
//        if (!Array.isArray(iArray) || typeof kVal !== 'number') {
//            throw new Error("'i' musi być tablicą, a 'k' liczbą.");
//        }
//        return iArray.map(val_i => (val_i as number) + (kVal as number));
//    }
//  }
//];
//
//// Wywołanie funkcji Excel
//const A1 = Excel(inputs, calculations);
//
//// Wyświetlenie wyników
//console.log("Cała mapa A1:", A1);
//console.log("A1.get('i'):", A1.get("i"));
//console.log("A1.get('j'):", A1.get("j"));
//console.log("A1.get('ij_sum'):", A1.get("ij_sum")); // Oczekiwane: [2, 5, 5, 11, 11, 11, 11]
//console.log("A1.get('k'):", A1.get("k"));         // Oczekiwane: 100
//console.log("A1.get('i_plus_k'):", A1.get("i_plus_k")); // Oczekiwane: [101, 102, 103, 104, 105, 106, 107]
//console.log("Wartość i[3] (indeks 3, czyli czwarty element):", (A1.get("i") as number[])[3]); // Oczekiwane: 4
