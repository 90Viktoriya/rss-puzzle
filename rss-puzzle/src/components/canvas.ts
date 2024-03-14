import { Piece } from './pieces';
import { Size } from './componentsTypes';

export class Canvas {
  private canvas;

  private context;

  private sizeMain: Size;

  private sizeAdd: Size;

  private sizeResult: Size;

  private pieceHeight;

  private pieces: Array<Piece[]>;

  private currentRowID;

  private piecesAdd: Array<Piece>;

  private piecesResult: Array<Piece>;

  private emptyPieces: Array<Piece>;

  private result: Array<string>;

  private sentences;

  private dontMove;

  constructor(width: number, height: number, sentences: Array<Array<string>>, curRowID: number) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.className = 'mainPage_canvas';
    this.sentences = sentences;
    this.currentRowID = curRowID;
    this.canvas.width = width;
    this.canvas.height = height;
    this.pieceHeight = height / (sentences.length + 2);
    this.sizeMain = {
      width,
      height: sentences.length * this.pieceHeight,
      x: 0,
      y: 0
    };
    this.sizeAdd = {
      width,
      height: this.pieceHeight,
      x: 0,
      y: (sentences.length + 1) * this.pieceHeight
    };
    this.sizeResult = {
      width,
      height: this.pieceHeight,
      x: 0,
      y: this.currentRowID * this.pieceHeight
    };
    this.pieces = [];
    this.piecesAdd = [];
    this.piecesResult = [];
    this.emptyPieces = [];
    this.result = sentences[curRowID];
    this.dontMove = false;
    this.createPieces(sentences);
    this.drawRect(this.sizeMain.x, this.sizeMain.y, this.sizeMain.width, this.sizeMain.height);
    this.drawAll();
    this.initAdd();
    this.initResult();
    this.addListener();
  }

  private reDraw(pieces: Array<Piece>, index: number) {
    let x = 0;
    let y = 0;
    if (pieces[index].getPlace() === 'source') y = this.sizeAdd.y;
    else y = this.sizeResult.y;
    for (let i = 0; i < index; i += 1) x += pieces[i].getWidth();
    if (this.context) {
      for (let i = index; i < pieces.length; i += 1) {
        pieces[i].draw(this.context, x, y);
        x += pieces[i].getWidth();
      }
      this.clearRect(x, y, this.sizeMain.width, this.pieceHeight);
    }
  }

  private insertPiece(index: number, piece: Piece) {
    if (piece.getPlace() === 'source') {
      this.piecesAdd[index] = piece;
      this.reDraw(this.piecesAdd, index);
    } else {
      this.piecesResult[index] = piece;
      this.reDraw(this.piecesResult, index);
    }
  }

  static findEmptyPiece(pieces: Array<Piece>) {
    for (let i = 0; i < pieces.length; i += 1) if (pieces[i].getText() === '') return i;
    return -1;
  }

  private removePiece(index: number) {
    if (this.emptyPieces[this.currentRowID].getPlace() === 'source') {
      this.piecesAdd[index] = this.emptyPieces[this.currentRowID];
      this.reDraw(this.piecesAdd, index);
    } else {
      this.piecesResult[index] = this.emptyPieces[this.currentRowID];
      this.reDraw(this.piecesResult, index);
    }
  }

  private moveToAdd(piece: Piece, index: number) {
    const currentIndex = Canvas.findEmptyPiece(this.piecesAdd);
    piece.setPlace('source');
    this.insertPiece(currentIndex, piece);
    this.emptyPieces[this.currentRowID].setPlace('result');
    this.removePiece(index);
  }

  private checkResult() {
    for (let i = 0; i < this.result.length; i += 1) {
      if (this.result[i] !== this.piecesResult[i].getText()) {
        const btn = document.querySelector('.mainPage_button-check');
        btn?.classList.remove('mainPage_button-disable');
        return false;
      }
    }
    this.clearRect(0, this.sizeAdd.y, this.sizeAdd.width, this.sizeAdd.height);
    this.disableClick();
    const btn = document.querySelector('.mainPage_button-continue');
    btn?.classList.remove('mainPage_button-disable');
    return true;
  }

  private moveToResult(piece: Piece, index: number) {
    const currentIndex = Canvas.findEmptyPiece(this.piecesResult);
    piece.setPlace('result');
    this.insertPiece(currentIndex, piece);
    this.emptyPieces[this.currentRowID].setPlace('source');
    this.removePiece(index);
    if (Canvas.findEmptyPiece(this.piecesResult) === -1) this.checkResult();
  }

  private moveCurrentPiece(piece: Piece) {
    if (this.dontMove) return;
    for (let i = 0; i < this.piecesAdd.length; i += 1) {
      if (this.piecesAdd[i].getColID() === piece.getColID()) {
        if (this.piecesAdd[i].getPlace() === 'source') {
          this.moveToResult(this.piecesAdd[i], i);
          return;
        }
      }
      if (this.piecesResult[i].getColID() === piece.getColID()) {
        if (this.piecesResult[i].getPlace() === 'result') {
          this.moveToAdd(this.piecesResult[i], i);
          return;
        }
      }
    }
  }

  public onClick(evt: MouseEvent, currentPieces: Piece[]) {
    if (evt.target instanceof HTMLElement) {
      for (let i = 0; i < currentPieces.length; i += 1) {
        if (currentPieces[i].checkPress(evt)) {
          const btn = document.querySelector('.mainPage_button-check');
          btn?.classList.add('mainPage_button-disable');
          this.moveCurrentPiece(currentPieces[i]);
          return;
        }
      }
    }
  }

  public clearRect(x: number, y: number, width: number, height: number) {
    if (!this.context) return;
    this.context.clearRect(x, y, width, height);
  }

  public drawRect(x: number, y: number, width: number, height: number) {
    if (!this.context) return;
    this.context.fillStyle = '#A66A2C';
    this.context.beginPath();
    this.context.fillRect(x, y, width, height);
    this.context.rect(x, y, width, height);
    this.context.stroke();
  }

  public calculateWidthParam(sentence: Array<string>) {
    const letterCount = sentence.toString().length + 1;
    return this.sizeMain.width / letterCount;
  }

  public createPieces(sentences: Array<Array<string>>) {
    for (let i = 0; i < sentences.length; i += 1) {
      this.pieces.push([]);
      const widthParam = this.calculateWidthParam(sentences[i]);
      for (let j = 0; j < sentences[i].length; j += 1) {
        const width = widthParam * (sentences[i][j].length + 1);
        this.pieces[i].push(new Piece(i, j, sentences[i][j], this.pieceHeight, width));
      }
      this.emptyPieces.push(new Piece(i, -1, '', this.pieceHeight, widthParam * 2));
    }
  }

  public drawAll() {
    if (this.context) {
      for (let i = 0; i < this.currentRowID; i += 1) {
        for (let j = 0; j < this.pieces[i].length; j += 1) {
          this.pieces[i][j].draw(this.context, this.sizeMain.x, this.sizeMain.y);
          this.sizeMain.x += this.pieces[i][j].getWidth();
        }
        this.sizeMain.x = 0;
        this.sizeMain.y += this.pieceHeight;
      }
    }
  }

  public drawAdd() {
    if (this.context) {
      for (let i = 0; i < this.piecesAdd.length; i += 1) {
        this.piecesAdd[i].draw(this.context, this.sizeAdd.x, this.sizeAdd.y);
        this.sizeAdd.x += this.piecesAdd[i].getWidth();
      }
    }
  }

  public drawResult() {
    if (this.context) {
      for (let i = 0; i < this.piecesResult.length; i += 1) {
        this.piecesResult[i].draw(this.context, this.sizeResult.x, this.sizeResult.y);
        this.sizeResult.x += this.piecesResult[i].getWidth();
      }
    }
  }

  public initAdd() {
    this.piecesAdd = this.pieces[this.currentRowID]
      .map((el) => ({ el, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ el }) => el);
    this.drawAdd();
  }

  public initResult() {
    for (let i = 0; i < this.pieces[this.currentRowID].length; i += 1)
      this.piecesResult.push(this.emptyPieces[this.currentRowID]);
    this.drawResult();
    this.clearRect(this.sizeResult.x, this.sizeResult.y, this.sizeResult.width, this.sizeResult.height);
  }

  public nextSentence() {
    this.currentRowID += 1;
    this.sizeResult.x = 0;
    this.sizeResult.y = this.currentRowID * this.pieceHeight;
    this.sizeAdd.x = 0;
    this.piecesResult = [];
    this.result = this.sentences[this.currentRowID];
    this.dontMove = false;
    this.initAdd();
    this.initResult();
  }

  public checkSentence() {
    if (this.context === null) return;
    for (let i = 0; i < this.result.length; i += 1) {
      if (this.result[i] !== this.piecesResult[i].getText()) this.piecesResult[i].markError(this.context);
      else this.piecesResult[i].markRight(this.context);
    }
  }

  private addListener() {
    this.canvas.addEventListener('click', (evt) => {
      this.onClick(evt, this.pieces[this.currentRowID]);
    });
  }

  private disableClick() {
    this.dontMove = true;
  }

  public getCanvas() {
    return this.canvas;
  }
}
export default Canvas;
