import { Piece } from './pieces';
import { PieceArray } from './piecesArray';

export class Canvas {
  private canvas;

  private context;

  private width;

  private pieceHeight;

  private pieces: Array<Piece[]>;

  private currentRowID;

  private piecesAdd: PieceArray;

  private piecesResult: PieceArray;

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
    this.width = width;
    this.pieces = [];
    this.emptyPieces = [];
    this.result = sentences[curRowID];
    this.dontMove = false;
    this.createPieces(sentences);
    this.piecesAdd = new PieceArray(
      this.pieces[this.currentRowID]
        .map((el) => ({ el, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ el }) => el),
      0,
      (this.sentences.length + 1) * this.pieceHeight,
      this.width,
      this.pieceHeight
    );
    this.piecesResult = new PieceArray(
      Array(this.pieces[this.currentRowID].length).fill(this.emptyPieces[this.currentRowID]),
      0,
      this.currentRowID * this.pieceHeight,
      this.width,
      this.pieceHeight
    );
    this.drawAll();
    this.addListener();
  }

  private checkResult() {
    if (this.piecesResult.checkOrder()) {
      this.disableClick();
      const btn = document.querySelector('.mainPage_button-continue');
      btn?.classList.remove('mainPage_button-disable');
      return true;
    }
    const btn = document.querySelector('.mainPage_button-check');
    btn?.classList.remove('mainPage_button-disable');
    return false;
  }

  private moveTo(piece: Piece, index: number) {
    if (piece.getPlace() === 'source') {
      piece.setPlace('result');
      this.piecesResult.insertPiece(piece);
      this.emptyPieces[this.currentRowID].setPlace('source');
      this.piecesAdd.insertPiece(this.emptyPieces[this.currentRowID], index);
      if (this.piecesResult.findEmpty() === -1) this.checkResult();
    } else {
      piece.setPlace('source');
      this.piecesAdd.insertPiece(piece);
      this.emptyPieces[this.currentRowID].setPlace('result');
      this.piecesResult.insertPiece(this.emptyPieces[this.currentRowID], index);
    }
    this.piecesAdd.clearX();
    this.piecesResult.clearX();
    this.piecesAdd.draw(this.context);
    this.piecesResult.draw(this.context);
    if (this.dontMove) this.piecesAdd.clear(this.context);
  }

  private moveCurrentPiece(piece: Piece) {
    if (this.dontMove) return;
    let checkResult = this.piecesAdd.checkMove(piece, 'source');
    if (checkResult !== null) {
      this.moveTo(checkResult.piece, checkResult.index);
      return;
    }
    checkResult = this.piecesResult.checkMove(piece, 'result');
    if (checkResult !== null) {
      this.moveTo(checkResult.piece, checkResult.index);
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

  public calculateWidthParam(sentence: Array<string>) {
    const letterCount = sentence.toString().length + 1;
    return this.width / letterCount;
  }

  public createPieces(sentences: Array<Array<string>>) {
    let x = 0;
    let y = 0;
    for (let i = 0; i < sentences.length; i += 1) {
      this.pieces.push([]);
      const widthParam = this.calculateWidthParam(sentences[i]);
      for (let j = 0; j < sentences[i].length; j += 1) {
        const width = widthParam * (sentences[i][j].length + 1);
        let rightTab;
        if (j === sentences[i].length - 1) rightTab = 0;
        else rightTab = 0.5;
        let leftTab;
        if (j === 0) leftTab = 0;
        else leftTab = -0.5;
        this.pieces[i].push(new Piece(i, j, sentences[i][j], x, y, this.pieceHeight, width, leftTab, rightTab));
        x += this.pieces[i][j].getWidth();
      }
      this.emptyPieces.push(new Piece(i, -1, '', x, y, this.pieceHeight, widthParam * 2, 0, 0));
      x = 0;
      y += this.pieceHeight;
    }
  }

  public drawAll() {
    for (let i = 0; i < this.currentRowID; i += 1) {
      for (let j = 0; j < this.pieces[i].length; j += 1) {
        this.pieces[i][j].draw(this.context);
      }
    }
    this.piecesAdd.draw(this.context);
    this.piecesResult.draw(this.context);
  }

  public nextSentence() {
    this.currentRowID += 1;
    this.result = this.sentences[this.currentRowID];
    this.dontMove = false;
    this.piecesAdd = new PieceArray(
      this.pieces[this.currentRowID]
        .map((el) => ({ el, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ el }) => el),
      0,
      (this.sentences.length + 1) * this.pieceHeight,
      this.width,
      this.pieceHeight
    );
    this.piecesResult = new PieceArray(
      Array(this.pieces[this.currentRowID].length).fill(this.emptyPieces[this.currentRowID]),
      0,
      this.currentRowID * this.pieceHeight,
      this.width,
      this.pieceHeight
    );
    this.drawAll();
  }

  public checkAndMark() {
    this.piecesResult.checkAndMark(this.context);
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
