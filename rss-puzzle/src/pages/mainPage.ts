import { BaseComponent } from '../components/baseComponent';
import './mainPage.css';
import { Canvas } from '../components/canvas';
import { Game } from '../components/currentGame';

const currentGame = new Game(1, 0, 9);
let mainCanvas = new Canvas(
  window.innerWidth * 0.8,
  window.innerHeight * 0.8,
  currentGame.getSentences(),
  currentGame.getSentenceID()
);

let canvasElement = mainCanvas.getCanvas();
/* var img = new Image();
img.onload = function() {
  let scale = Math.min(canvas.width/img.width,canvas.height/img.height);
  let size = {width: scale*img.width,
    height: scale*img.height,
    x:canvas.width/2 - scale*img.width/2,
    y:canvas.height/2 - scale*img.height/2,
  }
    context?.drawImage(img,size.x,size.y,size.width,size.height);
};
img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/level1/9th_wave.jpg';
*/
function changeSentence() {
  const btn = document.querySelector('.mainPage_button-continue');
  btn?.classList.add('mainPage_button-disable');
  if (currentGame.nextSentence()) {
    mainCanvas.nextSentence();
  } else {
    mainCanvas = new Canvas(
      window.innerWidth * 0.8,
      window.innerHeight * 0.8,
      currentGame.getSentences(),
      currentGame.getSentenceID()
    );
    canvasElement = mainCanvas.getCanvas();
    document.querySelector('.mainPage_canvas')?.replaceWith(canvasElement);
  }
}

function checkSentence() {
  mainCanvas.checkSentence();
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
