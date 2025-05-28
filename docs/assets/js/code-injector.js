// Plik  assets/js/code-injector.js

/**
 * Ładuje zawartość pliku tekstowego (np. kodu źródłowego) i wstrzykuje ją
 * do wskazanego elementu <pre>, a następnie uruchamia podświetlanie Prism.js.
 *
 * @param {string} preId ID elementu <pre>, w którym ma być umieszczony kod.
 * @param {string} filePath Ścieżka do pliku z kodem.
 * @param {string} language Język programowania (dla klasy Prism.js, np. "typescript").
 */
export async function loadAndHighlightCode(preId, filePath, language = 'typescript') {
  console.log(`Ładowanie kodu dla ${preId} z ${filePath}`);
  const preElement = document.getElementById(preId);

  if (!preElement) {
    console.warn(`Brak elementu <pre> o ID "${preId}"`);
    return;
  }

  // Upewnij się, że element <pre> ma wewnątrz element <code>
  // Jeśli nie ma, stwórz go.
  let codeElement = preElement.querySelector('code');
  if (!codeElement) {
    codeElement = document.createElement('code');
    preElement.appendChild(codeElement);
  }

  // Ustaw odpowiednią klasę języka dla Prism.js
  codeElement.className = `language-${language}`;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      console.error(`Nie udało się wczytać pliku z kodem z ${filePath}. Status: ${response.status}`);
      codeElement.textContent = `Błąd ładowania pliku: ${filePath}`;
      return;
    }
    const codeContent = await response.text();
    codeElement.textContent = codeContent; // Wstaw surowy kod

    // Uruchom podświetlanie Prism.js dla tego konkretnego elementu
    // Upewnij się, że Prism i komponent języka są już załadowane!
    if (window.Prism) {
      Prism.highlightElement(codeElement);
    } else {
      console.warn('Prism.js nie jest załadowany. Podświetlanie nie zostanie uruchomione.');
    }

  } catch (error) {
    console.error(`Błąd podczas ładowania lub przetwarzania pliku ${filePath}:`, error);
    if (codeElement) { // Sprawdzenie czy codeElement istnieje, na wypadek błędu przed jego utworzeniem
        codeElement.textContent = `Błąd ładowania pliku: ${filePath}\n${error}`;
    }
  }
}
