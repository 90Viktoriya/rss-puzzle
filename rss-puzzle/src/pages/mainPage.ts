import { BaseComponent } from '../components/baseComponent';
import './mainPage.css';
import { Canvas } from '../components/canvas';
import { Game } from '../components/currentGame';

const canvasWidth = window.innerWidth * 0.8;
const canvasHeight = window.innerHeight * 0.8;
const currentGame = new Game(2, 4, 8);
let mainCanvas = new Canvas(
  canvasWidth,
  canvasHeight,
  currentGame.getSentences(),
  currentGame.getSentenceID(),
  currentGame.getImageSrc()
);

let canvasElement = mainCanvas.getCanvas();

function changeSentence() {
  const btn = document.querySelector('.mainPage_button-continue');
  btn?.classList.add('mainPage_button-disable');
  if (currentGame.nextSentence()) {
    mainCanvas.nextSentence();
  } else {
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
}

function checkSentence() {
  mainCanvas.checkAndMark();
}

export const mainPage = () =>
  new BaseComponent(
    { tag: 'div', className: 'mainPage_wrapper' },
    new BaseComponent({ tag: 'div', className: 'mainPage_menu-wrapper' }),
    canvasElement,
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
    })
  );

export default mainPage;
