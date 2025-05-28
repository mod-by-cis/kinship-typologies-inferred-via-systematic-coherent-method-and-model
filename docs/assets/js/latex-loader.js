// W pliku assets/js/latex-loader.js (lub podobnym)

/**
 * Ładuje zawartość pliku (np. .md lub .tex z kodem LaTeX) i wstrzykuje ją
 * do wskazanego elementu, a następnie informuje MathJax o konieczności
 * przetworzenia tego elementu.
 *
 * @param {string} containerId ID elementu (np. <div>), w którym ma być umieszczona treść.
 * @param {string} filePath Ścieżka do pliku .md lub .tex.
 */
export async function loadAndRenderLatex(containerId, filePath) {
  console.log(`Ładowanie treści (LaTeX/Markdown) dla ${containerId} z ${filePath}`);
  const containerElement = document.getElementById(containerId);

  if (!containerElement) {
    console.warn(`Brak elementu o ID "${containerId}" do wstawienia treści.`);
    return;
  }

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.error(`Nie udało się wczytać pliku z ${filePath}. Status: ${response.status}`);
      containerElement.textContent = `Błąd ładowania pliku: ${filePath}`;
      return;
    }
    const content = await response.text(); // Pobieramy całą zawartość pliku .md

    // Wstawiamy całą zawartość pliku .md do kontenera.
    // MathJax przeszuka ten fragment HTML w poszukiwaniu swoich delimiterów.
    // Elementy Markdown (np. zwykły tekst, nagłówki) również się tu znajdą.
    containerElement.innerHTML = content;
    // Jeśli plik .md zawierałby znaczniki HTML, zostałyby one zinterpretowane przez przeglądarkę.
    // Dla bezpieczeństwa, jeśli pliki .md mogłyby pochodzić z niezaufanego źródła
    // lub nie chcesz, aby jakikolwiek HTML z pliku .md był renderowany,
    // bezpieczniej byłoby użyć:
    // containerElement.textContent = content;
    // Jednak MathJax nadal powinien znaleźć i przetworzyć LaTeX w węzłach tekstowych.
    // Dla kontrolowanych przez Ciebie plików .md, .innerHTML jest zazwyczaj w porządku.

    // Poinformuj MathJax, aby przetworzył zawartość tego konkretnego kontenera
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      await window.MathJax.typesetPromise([containerElement]);
      console.log(`MathJax przetworzył ${containerId} po załadowaniu z ${filePath}`);
    } else {
      console.warn('MathJax (lub MathJax.typesetPromise) nie jest dostępny.');
    }

  } catch (error) {
    console.error(`Błąd podczas ładowania lub przetwarzania pliku ${filePath}:`, error);
    if (containerElement) {
      containerElement.textContent = `Błąd ładowania pliku: ${filePath}\n${error}`;
    }
  }
}
