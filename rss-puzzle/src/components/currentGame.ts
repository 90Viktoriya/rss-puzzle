import { levels } from '../data/levels';

export class Game {
  private levelID;

  private roundID;

  private round;

  private sentenceID;

  constructor(levelID: number, roundID: number = 0, sentenceID = 0) {
    const data = levels.first;
    this.levelID = levelID;
    this.roundID = roundID;
    this.round = data.rounds[roundID];
    this.sentenceID = sentenceID;
  }

  private getSentence(sentenceID: number = this.sentenceID) {
    const str = this.round.words[sentenceID].textExample;
    return str.split(' ');
  }

  public getSentences() {
    const arr = [];
    for (let i = 0; i < this.round.words.length; i += 1) arr.push(this.getSentence(i));
    return arr;
  }
}

export default Game;
