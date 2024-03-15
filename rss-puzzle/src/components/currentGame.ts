import { levels } from '../data/levels';

export class Game {
  private levelID;

  private levelData;

  private roundsCount;

  private roundID;

  private round;

  private sentenceID;

  private imgSrc;

  constructor(levelID: number, roundID: number = 0, sentenceID = 0) {
    const data = levels[levelID - 1];
    this.levelID = levelID;
    this.levelData = data.rounds;
    this.roundsCount = data.roundsCount;
    this.roundID = roundID;
    this.round = data.rounds[roundID];
    this.sentenceID = sentenceID;
    const imgFile = this.round.levelData.imageSrc;
    this.imgSrc = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imgFile}`;
  }

  private getSentence(sentenceID: number) {
    const str = this.round.words[sentenceID].textExample;
    return str.split(' ');
  }

  public getSentenceID() {
    return this.sentenceID;
  }

  public getImageSrc() {
    return this.imgSrc;
  }

  public getSentences() {
    const arr = [];
    for (let i = 0; i < this.round.words.length; i += 1) arr.push(this.getSentence(i));
    return arr;
  }

  private loadNewLevel() {
    if (this.levelID < levels.length) this.levelID += 1;
    else this.levelID = 1;
    const data = levels[this.levelID - 1];
    this.levelData = data.rounds;
    this.roundsCount = data.roundsCount;
    this.roundID = 0;
    this.round = data.rounds[this.roundID];
    const imgFile = this.round.levelData.imageSrc;
    this.imgSrc = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imgFile}`;
  }

  public nextSentence() {
    if (this.sentenceID < this.round.words.length - 1) {
      this.sentenceID += 1;
      return true;
    }
    if (this.roundID < this.roundsCount - 1) {
      this.roundID += 1;
      this.round = this.levelData[this.roundID];
      const imgFile = this.round.levelData.imageSrc;
      this.imgSrc = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imgFile}`;
    } else {
      this.loadNewLevel();
    }
    this.sentenceID = 0;
    return false;
  }
}

export default Game;
