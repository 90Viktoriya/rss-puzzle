import { BaseComponent } from '../components/baseComponent';
import './mainPage.css';
import { Canvas } from '../components/canvas';
import { Game } from '../components/currentGame';

const currentGame = new Game(1, 0);
const mainCanvas = new Canvas(window.innerWidth * 0.8, window.innerHeight * 0.8, currentGame.getSentences(), 0);

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
export const mainPage = () =>
  new BaseComponent(
    { tag: 'div', className: 'mainPage_wrapper' },
    new BaseComponent({ tag: 'div', className: 'mainPage_menu-wrapper' }),
    mainCanvas.getCanvas()
  );

export default mainPage;
