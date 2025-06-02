// Definicje typów
type NestedNumberArray = number | NestedNumberArray[];

export type ExcelResults = Map<string, NestedNumberArray>;
export type ExcelSetsSet = {
  var: string; // Nazwa zmiennej wejściowej
  val: NestedNumberArray; // Wartość zmiennej (liczba lub zagnieżdżona tablica liczb)
};

// Typ dla funkcji obliczeniowej: przyjmuje mapę, zwraca obliczoną wartość
type CalculationFunction = (currentMap: ExcelResults) => NestedNumberArray;

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
  const M:ExcelResults = new Map<string, NestedNumberArray>();

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
        M.set(calcItem.var, undefined as any); // Używamy `as any` aby pozwolić na `undefined` w mapie z typem NestedNumberArray
      }
    });
  }

  return M;
}

/**
 * Generuje tablicę liczb (przedział) o określonej liczbie elementów, kroku i wartości początkowej.
 *
 * @param items Liczba elementów do wygenerowania w tablicy.
 * @param step Krok (różnica) między kolejnymi elementami w tablicy. Może być dodatni, ujemny lub zerowy.
 * @param startAt Wartość początkowa pierwszego elementu w tablicy.
 * @returns Tablica liczb (number[]) reprezentująca wygenerowany przedział.
 * Zwraca pustą tablicę, jeśli `items` jest mniejsze lub równe 0.
 */
export function ExcelRangeInit(items: number, step: number, startAt: number): number[] {
  if (items <= 0) {
    return [];
  }

  const result: number[] = [];
  for (let i = 0; i < items; i++) {
    result.push(startAt + (i * step));
  }
  return result;
}

// --- Przykłady użycia funkcji ExcelRangeInit ---
// 
// // Przykład 1: Generowanie 5 elementów, zaczynając od 10, z krokiem 2
// const range1 = ExcelRangeInit(5, 2, 10);
// console.log("Range 1 (items: 5, step: 2, startAt: 10):", range1);
// // Oczekiwany output: [10, 12, 14, 16, 18]
// 
// // Przykład 2: Generowanie 7 elementów, zaczynając od 1, z krokiem 1 (jak w Twoim przykładzie dla 'i')
// const range_i_like = ExcelRangeInit(7, 1, 1);
// console.log("Range 'i' (items: 7, step: 1, startAt: 1):", range_i_like);
// // Oczekiwany output: [1, 2, 3, 4, 5, 6, 7]
// 
// // Przykład 3: Generowanie 4 elementów, zaczynając od 100, z krokiem -5 (malejąco)
// const range2 = ExcelRangeInit(4, -5, 100);
// console.log("Range 2 (items: 4, step: -5, startAt: 100):", range2);
// // Oczekiwany output: [100, 95, 90, 85]
// 
// // Przykład 4: Generowanie 3 elementów, zaczynając od 7, z krokiem 0
// const range3 = ExcelRangeInit(3, 0, 7);
// console.log("Range 3 (items: 3, step: 0, startAt: 7):", range3);
// // Oczekiwany output: [7, 7, 7]
// 
// // Przykład 5: items <= 0
// const range4 = ExcelRangeInit(0, 5, 10);
// console.log("Range 4 (items: 0, step: 5, startAt: 10):", range4); // Oczekiwany output: []
// const range5 = ExcelRangeInit(-2, 5, 10);
// console.log("Range 5 (items: -2, step: 5, startAt: 10):", range5); // Oczekiwany output: []


// Alternatywna, bardziej zwięzła implementacja używająca Array.from (działa tak samo):
/*
function ExcelRangeInitAlternative(items: number, step: number, startAt: number): number[] {
  if (items <= 0) {
    return [];
  }
  return Array.from({ length: items }, (_, index) => startAt + index * step);
}

console.log("--- Test alternatywnej implementacji ---");
const range1_alt = ExcelRangeInitAlternative(5, 2, 10);
console.log("Range 1 Alt (items: 5, step: 2, startAt: 10):", range1_alt);
*/

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
//      // Dla NestedNumberArray operacja byłaby bardziej złożona (rekurencyjna).
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
