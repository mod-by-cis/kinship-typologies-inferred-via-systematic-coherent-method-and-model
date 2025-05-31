/**
 * Dodaje wiele elementów potomnych do wskazanego elementu nadrzędnego.
 *
 * @param {HTMLElement} PARENT - Element, do którego mają być dodane nowe elementy.
 * @param {number} count - Liczba elementów do dodania.
 * @param {string} elementType - Typ elementu HTML do utworzenia (np. 'div', 'span').
 * @param {string} className - Klasa CSS do przypisania każdemu utworzonemu elementowi.
 */
export function fManyADD(PARENT, count, elementType, className) {
  for (let i = 1; i <= count; i++) {
    const X = document.createElement(elementType);
    X.textContent = `X #${i}`;
    X.className = className;
    PARENT.appendChild(X);
  }
}

/**
 * Przełącza dwie klasy CSS w zależności od warunku logicznego.
 *
 * @param {HTMLElement} ELEMENT - Element HTML, na którym operujemy.
 * @param {boolean} TEST - Warunek logiczny decydujący, która klasa zostanie dodana/usunięta.
 * @param {string} ifTrueADD - Klasa, która zostanie usunięta jeśli TEST jest true, a dodana jeśli false.
 * @param {string} ifTrueDEL - Klasa, która zostanie dodana jeśli TEST jest true, a usunięta jeśli false.
 */
export function fToggleCLASS(ELEMENT, TEST, ifTrueADD, ifTrueDEL) {
  ELEMENT.classList.remove(TEST ? ifTrueADD : ifTrueDEL);
  ELEMENT.classList.add(TEST ? ifTrueDEL : ifTrueADD);
}

/**
 * Dodaje klasę CSS do danego elementu HTML.
 *
 * @param {HTMLElement} ELEMENT - Element HTML, do którego zostanie dodana klasa.
 * @param {string} className - Nazwa klasy CSS do dodania.
 */
export function fAddCLASS(ELEMENT, className) {
  ELEMENT.classList.add(className);
}

/**
 * Ustawia wartość `value` w zależności od warunku logicznego.
 *
 * @param {HTMLInputElement|HTMLTextAreaElement} ELEMENT - Element input lub textarea.
 * @param {boolean} TEST - Warunek logiczny.
 * @param {string} isTrue - Wartość przypisana, gdy TEST jest true.
 * @param {string} isFalse - Wartość przypisana, gdy TEST jest false.
 */
export function fToggleVALUE(ELEMENT, TEST, isTrue, isFalse) {
  ELEMENT.value = TEST ? isTrue : isFalse;
}

/**
 * Ustawia styl `display` w zależności od warunku logicznego.
 *
 * @param {HTMLElement} ELEMENT - Element HTML, którego styl będzie zmieniany.
 * @param {boolean} TEST - Warunek logiczny.
 * @param {string} isTrue - Wartość `display`, gdy TEST jest true.
 * @param {string} isFalse - Wartość `display`, gdy TEST jest false.
 */
export function fToggleDISPLAY(ELEMENT, TEST, isTrue, isFalse) {
  ELEMENT.style.display = TEST ? isTrue : isFalse;
}

/**
 * Ustawia styl `position` w zależności od warunku logicznego.
 *
 * @param {HTMLElement} ELEMENT - Element HTML, którego styl będzie zmieniany.
 * @param {boolean} TEST - Warunek logiczny.
 * @param {string} isTrue - Wartość `position`, gdy TEST jest true.
 * @param {string} isFalse - Wartość `position`, gdy TEST jest false.
 */
export function fTogglePOSITION(ELEMENT, TEST, isTrue, isFalse) {
  ELEMENT.style.position = TEST ? isTrue : isFalse;
}

/**
 * Ustawia styl `transform` w zależności od warunku logicznego.
 *
 * @param {HTMLElement} ELEMENT - Element HTML, którego styl będzie zmieniany.
 * @param {boolean} TEST - Warunek logiczny.
 * @param {string} isTrue - Wartość `transform`, gdy TEST jest true.
 * @param {string} isFalse - Wartość `transform`, gdy TEST jest false.
 */
export function fToggleTRANSFORM(ELEMENT, TEST, isTrue, isFalse) {
  ELEMENT.style.transform = TEST ? isTrue : isFalse;
}


/**  
 * Tworzy kontener typu `number-input-group` zawierający przyciski `–` i `+`  
 * po bokach podanego `input[type="number"]`.  
 * Przypisuje odpowiednie zdarzenia do zwiększania i zmniejszania wartości pola.  
 *  
 * @param {HTMLInputElement} input - Element `<input type="number">`, który ma być opakowany.  
 * @returns {HTMLDivElement} Element `div`, zawierający `–`, `input`, `+` w jednej linii.  
 */
export function fInputNumberCreate(input) {
  const wrapper = document.createElement('div');
  wrapper.className = 'number-input-panel';

  const decBtn = document.createElement('button');
  decBtn.className = 'number-input-buton decrement';
  decBtn.innerHTML = `<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="2" rx="1" /></svg>`;

  const incBtn = document.createElement('button');
  incBtn.className = 'number-input-buton increment';
  incBtn.innerHTML = `<svg viewBox="0 0 24 24"><rect x="11" y="5" width="2" height="14" rx="1" /><rect x="5" y="11" width="14" height="2" rx="1" /></svg>`;

  decBtn.addEventListener('click', () => input.stepDown());
  incBtn.addEventListener('click', () => input.stepUp());

  wrapper.appendChild(decBtn);
  wrapper.appendChild(input);
  wrapper.appendChild(incBtn);

  return wrapper;
}

/**  
 * Ustawia atrybuty
 *  
 * @param {HTMLInputElement} input - Element `<input type="number">`, 
 * @param {string} valMin - , 
 * @param {string} valStep - , 
 * @param {number|string} valFirst - , 
 * @param {boolean} valRequired - , 
 * @param {string} valPlaceholder - , 
 */
export function fInputNumberAttrSet(input,valMin,valStep,valFirst,valRequired, valPlaceholder) {
  input.type = 'number';
  input.placeholder = valPlaceholder;
  input.min = valMin;
  input.stem = valStep;
  input.value = valFirst;
  input.required = valRequired;
}
