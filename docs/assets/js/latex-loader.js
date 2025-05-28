// Plik assets/js/latex-loader.js

/**
 * Ładuje zawartość pliku LaTeX (.tex) i wstrzykuje ją do wskazanego elementu,
 * a następnie informuje MathJax o konieczności przetworzenia tego elementu.
 *
 * @param {string} containerId ID elementu (np. <div>), w którym ma być umieszczony LaTeX.
 * @param {string} filePath Ścieżka do pliku .tex z kodem LaTeX.
 */
export async function loadAndRenderLatex(containerId, filePath) {
  console.log(`Ładowanie LaTeX dla ${containerId} z ${filePath}`);
  const containerElement = document.getElementById(containerId);

  if (!containerElement) {
    console.warn(`Brak elementu o ID "${containerId}" do wstawienia LaTeX.`);
    return;
  }

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.error(`Nie udało się wczytać pliku LaTeX z ${filePath}. Status: ${response.status}`);
      containerElement.textContent = `Błąd ładowania pliku: ${filePath}`;
      return;
    }
    const latexContent = await response.text();
    containerElement.innerHTML = latexContent; // Wstaw surowy kod LaTeX

    // Poinformuj MathJax, aby przetworzył zawartość tego konkretnego kontenera
    // Upewnij się, że MathJax jest już załadowany i skonfigurowany!
    if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
      // Dla MathJax v3
      await window.MathJax.typesetPromise([containerElement]);
      console.log(`MathJax przetworzył ${containerId}`);
    } else {
      console.warn('MathJax (lub MathJax.typesetPromise) nie jest dostępny. Renderowanie LaTeX może nie zadziałać dla dynamicznie załadowanej treści.');
    }

  } catch (error) {
    console.error(`Błąd podczas ładowania lub przetwarzania pliku LaTeX ${filePath}:`, error);
    if (containerElement) {
      containerElement.textContent = `Błąd ładowania pliku LaTeX: ${filePath}\n${error}`;
    }
  }
}
