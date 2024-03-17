import { BaseComponent } from '../components/baseComponent';
import './mainPage.css';
import { Canvas } from '../components/canvas';
import { Game } from '../components/currentGame';

let canvasWidth = window.innerWidth * 0.9;
let canvasHeight = window.innerHeight * 0.9;
const currentLevel = 1;
const currentRound = 1;
const currentSentence = 1;
let currentGame = new Game(currentLevel, currentRound, currentSentence);
let mainCanvas = new Canvas(
  canvasWidth,
  canvasHeight,
  currentGame.getSentences(),
  currentGame.getSentenceID(),
  currentGame.getImageSrc()
);

let canvasElement = mainCanvas.getCanvas();
window.addEventListener('resize', () => {
  canvasWidth = window.innerWidth * 0.9;
  canvasHeight = window.innerHeight * 0.9;
  mainCanvas.resize();
});
function updateCanvas() {
  mainCanvas = new Canvas(
    canvasWidth,
    canvasHeight,
    currentGame.getSentences(),
    currentGame.getSentenceID(),
    currentGame.getImageSrc()
  );
  canvasElement = mainCanvas.getCanvas();
  document.querySelector('.mainPage_canvas')?.replaceWith(canvasElement);
}
function changeSentence() {
  const btn = document.querySelector('.mainPage_button-continue');
  btn?.classList.add('mainPage_button-disable');
  if (currentGame.nextSentence()) {
    mainCanvas.nextSentence();
  } else {
    updateCanvas();
  }
}

function checkSentence() {
  mainCanvas.checkAndMark();
}
function completeSentence() {
  mainCanvas.completeSentence();
}
function levelList() {
  let result = '';
  for (let i = 1; i <= 6; i += 1) result += `<option value="level ${i}"></option>`;
  return result;
}
function roundList(max: number) {
  let result = '';
  for (let i = 1; i <= max; i += 1) result += `<option value="round ${i}"></option>`;
  return result;
}
function loadGame(evt: MouseEvent) {
  try {
    const level = document.getElementById('level');
    if (level instanceof HTMLInputElement && evt.target instanceof HTMLInputElement) {
      let levelID = currentGame.getLevelID();
      if (level.value === 'undefined') levelID = Number(level.value.split(' ')[1]);
      currentGame = new Game(levelID, Number(evt.target.value.split(' ')[1]), 1);
      updateCanvas();
    }
  } catch (err) {
    console.log('Choose the right round');
  }
}
function loadRounds(evt: MouseEvent) {
  if (evt.target instanceof HTMLInputElement) {
    try {
      const value = evt.target.value.split(' ');
      const game = new Game(Number(value[1]), 1, 1);
      const newRoundInput = new BaseComponent({
        innerHTML: `<input list="round-list" id="round" class="mainPage_input"/>
        <datalist id="round-list" >
        ${roundList(game.getMaxRound())}
        </datalist>`,
        onchange: (evt1: MouseEvent) => {
          loadGame(evt1);
        }
      });
      const round = document.getElementById('round');
      if (round instanceof HTMLInputElement) if (round.value !== 'undefined') loadGame(evt);
      round?.replaceWith(newRoundInput.getNode());
    } catch (error) {
      console.log('Choose the right level');
    }
  }
}
const levelInput = new BaseComponent({
  innerHTML: `<input list="level-list" id="level" class="mainPage_input"/>
<datalist id="level-list">
${levelList()}
</datalist>`,
  onchange: (evt: MouseEvent) => {
    loadRounds(evt);
  }
});

const roundInput = new BaseComponent({
  innerHTML: `<input list="round-list" id="round" class="mainPage_input"/>
  <datalist id="round-list" >
  ${roundList(currentGame.getMaxRound())}
  </datalist>`,
  onchange: (evt: MouseEvent) => {
    loadGame(evt);
  }
});

const menuWrapper = new BaseComponent(
  { tag: 'div', className: 'mainPage_menu-wrapper' },
  new BaseComponent(
    { tag: 'div', className: 'mainPage_Level' },
    new BaseComponent({ tag: 'label', textContent: 'Level:', className: 'mainPage_label' }),
    new BaseComponent({ tag: 'div', className: 'mainPage_inputWrapper' }, levelInput)
  ),
  new BaseComponent(
    { tag: 'div', className: 'mainPage_Round' },
    new BaseComponent({ tag: 'label', textContent: 'Round:', className: 'mainPage_label' }),
    new BaseComponent({ tag: 'div', className: 'mainPage_inputWrapper' }, roundInput)
  )
);

export const mainPage = () =>
  new BaseComponent(
    { tag: 'div', className: 'mainPage_wrapper' },
    menuWrapper,
    canvasElement,
    new BaseComponent(
      { tag: 'div', className: 'mainPage_button-wrapper' },
      new BaseComponent({
        tag: 'div',
        textContent: 'Continue',
        className: 'mainPage_button-continue mainPage_button-disable',
        onclick: () => {
          changeSentence();
        }
      }),
      new BaseComponent({
        tag: 'div',
        textContent: 'Check',
        className: 'mainPage_button-check mainPage_button-disable',
        onclick: () => {
          checkSentence();
        }
      }),
      new BaseComponent({
        tag: 'div',
        textContent: 'Auto-Complete',
        className: 'mainPage_button-complete',
        onclick: () => {
          completeSentence();
        }
      })
    )
  );

export default mainPage;
