/**
 * Wstawia strukturę artykułu z nagłówkiem i wieloma sekcjami treści w <main>.
 *
 * @param {HTMLElement} ARTICLE - Element, do którego mają być dodane nowe elementy.
 * @param {string} NrIDN - Kod rozdziału.
 * @param {string} TITLE - Nazwa rozdziału.
 * @param {Array<(((el: HTMLElement) => string | HTMLElement) | string | HTMLElement)>} contentBlocks
 *        - Tablica bloków zawartości: funkcje przyjmujące rodzica (section) i zwracające string lub HTMLElement,
 *          lub bezpośrednio stringi / elementy.
 * @param {[string|number, string|number] | [string|number]} [sizeFlex]
 *        - Opcjonalne rozmiary: flexBasis i maxWidth (jeśli są dwa), lub tylko flexBasis (jeśli jeden).
 */
export function insertContentToArticle(ARTICLE, NrIDN, TITLE, contentBlocks, sizeFlex) {
  // Tworzenie nagłówka
  const HEADER = document.createElement('header');

  const SPAN_ID = document.createElement('span');
  SPAN_ID.className = 'article-nrid';
  SPAN_ID.textContent = NrIDN;

  const SPAN_TITLE = document.createElement('span');
  SPAN_TITLE.className = 'article-name';
  SPAN_TITLE.textContent = TITLE;

  HEADER.appendChild(SPAN_ID);
  HEADER.appendChild(SPAN_TITLE);
  ARTICLE.appendChild(HEADER);

  // Tworzenie ram głównej treści
  const MAIN = document.createElement('main');

  // Iteracja po tablicy bloków treści
  for (const block of contentBlocks) {
    const SECTION = document.createElement('section');

    let content = typeof block === 'function' ? block(SECTION) : block;

    if (typeof content === 'string') {
      SECTION.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      SECTION.appendChild(content);
    }

    MAIN.appendChild(SECTION);
  }

  ARTICLE.appendChild(MAIN);

  // Obsługa sizeFlex
  if (Array.isArray(sizeFlex)) {
    if (sizeFlex.length === 1) {
      ARTICLE.style.flexBasis = `${sizeFlex[0]}`;
    } else if (sizeFlex.length === 2) {
      ARTICLE.style.flexBasis = `${sizeFlex[0]}`;
      ARTICLE.style.maxWidth = `${sizeFlex[1]}`;
    }
  }
}

export default insertContentToArticle;

// insertContentToArticle(
//   document.getElementById("mathCoreDEFINITION"),
//   "1-A:",
//   "DEFINICJE PODSTAWOWE.",[
//     () => '<p>Pierwszy paragraf jako string.</p>',
//     (() => {
//       const box = document.createElement('div');
//       box.textContent = 'Drugi element jako HTMLElement';
//       return box;
//     })(),
//     () => `
//       <p> 
//         $$E = mc^2$$<br/>
//         $$\\int_0^\\infty e^{-x} dx = 1$$
//       </p>
//     `
//   ],['300px','600px']
// );
// 
// if (window.MathJax && MathJax.typesetPromise) {
//   MathJax.typesetPromise();
// }
