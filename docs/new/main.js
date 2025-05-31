import * as uDOM from "./scripts/utils-dom.js";
import insertContentToArticle from './scripts/insert-article.js';
import insertMathJaxFromFile  from './scripts/insert-mathjax-from-file.js';

let stateExpand = true;

const UX = {
  bodyGround:document.getElementById("bodyGround"),
  bodyMainly:document.getElementById("bodyMainly"),
  showToggle:document.getElementById("menuExpand"),
  stripeHead:document.getElementById("headStripe"),
  stripeFoot:document.getElementById("footStripe"),
  stripeMenu:document.getElementById("menuStripe"),
  drawerMenu:document.getElementById("menuDrawer"),
  drawerFoot:document.getElementById("footDrawer")
};


uDOM.fAddCLASS(UX.bodyGround, "expandSHOW");

UX.showToggle.addEventListener("click", () => {
  stateExpand = ! stateExpand;
  uDOM.fToggleVALUE(UX.showToggle,stateExpand, "HIDE", "SHOW");
  uDOM.fToggleCLASS(UX.bodyGround,stateExpand,"expandHIDE","expandSHOW");
  uDOM.fToggleDISPLAY(UX.stripeHead,stateExpand,"","none");
  uDOM.fToggleDISPLAY(UX.stripeFoot,stateExpand,"","none");

  uDOM.fToggleDISPLAY(UX.stripeMenu,stateExpand,"flex","none");
  uDOM.fTogglePOSITION(UX.stripeMenu,stateExpand,"static", "fixed");
  uDOM.fToggleTRANSFORM(UX.stripeMenu,stateExpand,"translateX(0%)", "translateX(-150%)");
});

uDOM.fManyADD(UX.stripeMenu, 40, "li","boxLI");
uDOM.fManyADD(UX.bodyMainly, 340, "article","boxARTICLE");



insertContentToArticle(
  document.getElementById("mathCoreDEFINITION"),
  "1-A:",
  "DEFINICJE PODSTAWOWE.",
  [
    () => '<div class="math-box container-mathjax" id="mathjaxCoreDEFINITION"></div>'
  ],  ['300px','600px']
);
insertMathJaxFromFile(
  document.getElementById("mathjaxCoreDEFINITION"),
  './math/num-core-definition.tex',
  '500px'
);


insertContentToArticle(
  document.getElementById("mathCoreTreeGoFAMS"),
  "1-B",
  "NAWIGACJA PO DRZEWIE.",
  [
    () => '<div class="math-box container-mathjax" id="mathjaxCoreTreeGoFAMS"></div>'
  ],  ['400px','600px']
);
insertMathJaxFromFile(
  document.getElementById("mathjaxCoreTreeGoFAMS"),
  './math/num-core-navigation.tex',
  '500px'
);


insertContentToArticle(
  document.getElementById("mathCoreResultTABS"),
  "1-D:",
  "KILKA WYNIKÓW.",
  [
    () => '<div class="math-box container-mathjax" id="mathjaxCoreResultTABS"></div>'
  ],  ['100%']
);
insertMathJaxFromFile(
  document.getElementById("mathjaxCoreResultTABS"),
  './math/num-core-result.tex',
  '500px'
);

insertContentToArticle(
  document.getElementById("apletBasicMathCore"),
  "1-C",
  "KALKULATOR.",
  [
    () => '<p>Tu możesz samodzielnie policzyć</p>',
    (() => {
      const box = document.createElement('div');
      uDOM.fAddCLASS(box, "math-core-calculator-box");
      //box.className = 'math-core-calculator-box';
      const boxINPUT = document.createElement('div');
      uDOM.fAddCLASS(boxINPUT, "math-core-calculator-inputs");

      // RADIO
      const radioGroup = document.createElement('div');      
      uDOM.fAddCLASS(radioGroup, "math-core-calculator-box-radio-group");
      //radioGroup.className = 'math-core-calculator-box-radio-group';

      const modes = ['i', 'j', 'm&n', 'w&v'];
      const inputs = {};

      modes.forEach((mode) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'calc-mode';
        radio.value = mode;
        if (mode === 'i') {
          radio.checked = true;
        }
        label.appendChild(radio);
        label.append(` ${mode}`);
        radioGroup.appendChild(label);
      });

      // INPUTY
      const inputContainer = document.createElement('div');
      inputContainer.className = 'math-core-calculator-box-inputs';

      // i → 1 input
      const input_i = document.createElement('input');
      uDOM.fInputNumberAttrSet(input_i,'1','1',1,true,'Podaj liczbę naturalną > 0');
      
      // j → 1 input
      const input_j = document.createElement('input');
      uDOM.fInputNumberAttrSet(input_j,'1','1',1,true,'Podaj liczbę naturalną > 0');

      // m&n → 2 inputy
      const input_m = document.createElement('input');
      uDOM.fInputNumberAttrSet(input_m,'2','2',2,true,'Parzysta liczba ≥ 2');

      const input_n = document.createElement('input');
      uDOM.fInputNumberAttrSet(input_n,'0','1',0,true,'Podaj liczbę naturalną ≥ 0');

      // w&v → 2 inputy
      const input_w = document.createElement('input');
      uDOM.fInputNumberAttrSet(input_w,'3','2',3,true,'Nieparzysta liczba ≥ 2');

      const input_v = document.createElement('input');
      uDOM.fInputNumberAttrSet(input_v,'0','1',0,true,'Podaj liczbę naturalną ≥ 0');

      // Obiekt pomocniczy do zarządzania widocznością
      inputs['i'] = [{el:uDOM.fInputNumberCreate(input_i),default:'1'}];
      inputs['j'] = [{el:uDOM.fInputNumberCreate(input_j),default:'1'}];
      inputs['m&n'] = [{el:uDOM.fInputNumberCreate(input_m),default:'2'}, {el:uDOM.fInputNumberCreate(input_n),default:'0'}];
      inputs['w&v'] = [{el:uDOM.fInputNumberCreate(input_w),default:'3'}, {el:uDOM.fInputNumberCreate(input_v),default:'0'}];

      let currentMode = 'i';
      // TODO: nie działa restowanie wartości do domyślniej podcza sprzełaczania trybu
      function updateVisibleInputs(mode) {
        // Resetuj inputy poprzedniego trybu
        if (inputs[currentMode]) {
          inputs[currentMode].forEach(({ el, default: def }) => {
            el.value = def;
          });
        }

        // Wyczyść i pokaż inputy nowego trybu
        inputContainer.innerHTML = '';
        if (inputs[mode]) {
          inputs[mode].forEach(({ el }) => inputContainer.appendChild(el));
        }

        currentMode = mode;
      }


      // Obsługa zmiany trybu
      radioGroup.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', (e) => {
          updateVisibleInputs(e.target.value);
        });
      });

      // PRZYCISK
      const calcBtn = document.createElement('button');
      calcBtn.textContent = 'Oblicz';
      calcBtn.type = 'button';

      // WYNIK
      const resultBox = document.createElement('div');
      resultBox.id = 'result-box';
      resultBox.className = 'result';
      resultBox.style.marginTop = '1rem';

      // Dołączenie wszystkiego
      boxINPUT.appendChild(radioGroup);
      boxINPUT.appendChild(inputContainer);
      boxINPUT.appendChild(calcBtn);
      box.appendChild(boxINPUT);
      box.appendChild(resultBox);
      
      updateVisibleInputs('i');

      return box;
    })()
  ],  ['400px','600px']
);

