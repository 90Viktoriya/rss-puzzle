import { Piece } from './pieces';
import { PieceArray } from './piecesArray';

export class Canvas {
  private canvas;

  private context;

  private width;

  private height;

  private x;

  private y;

  private pieceHeight;

  private pieces: Array<Piece[]>;

  private currentRowID;

  private piecesAdd: PieceArray;

  private piecesResult: PieceArray;

  private emptyPieces: Array<Piece>;

  private result: Array<string>;

  private sentences;

  private dontMove;

  private img: HTMLImageElement;

  private scale;

  constructor(width: number, height: number, sentences: Array<Array<string>>, curRowID: number, imgSrc: string) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.className = 'mainPage_canvas';
    this.sentences = sentences;
    this.currentRowID = curRowID - 1;
    this.canvas.width = width;
    this.scale = 1;
    if (width > 900) this.canvas.width = 900;

    this.canvas.height = height;
    this.pieceHeight = this.canvas.height / (sentences.length + 2);
    this.width = this.canvas.width - 20;
    this.height = this.pieceHeight * sentences.length;
    this.x = 0;
    this.y = 0;
    this.img = new Image();
    this.pieces = [];
    this.emptyPieces = [];
    this.result = sentences[this.currentRowID];
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
    this.loadImg(imgSrc);
    // this.drawAll();
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

  static btnCheckDisable() {
    const btn = document.querySelector('.mainPage_button-check');
    btn?.classList.add('mainPage_button-disable');
  }

  public onClick(evt: MouseEvent, currentPieces: Piece[]) {
    if (evt.target instanceof HTMLElement) {
      for (let i = 0; i < currentPieces.length; i += 1) {
        if (currentPieces[i].checkPress(evt)) {
          Canvas.btnCheckDisable();
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
        else rightTab = widthParam / 100;
        let leftTab;
        if (j === 0) leftTab = 0;
        else leftTab = -widthParam / 100;
        this.pieces[i].push(
          new Piece(i, j, sentences[i][j], x, y, this.pieceHeight, width, leftTab, rightTab, this.img, this.scale, x)
        );
        x += this.pieces[i][j].getWidth();
      }
      this.emptyPieces.push(
        new Piece(i, -1, '', x, y, this.pieceHeight, widthParam * 2, 0, 0, this.img, this.scale, -100)
      );
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

  public initArg() {
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
  }

  public nextSentence() {
    this.currentRowID += 1;
    this.result = this.sentences[this.currentRowID];
    this.dontMove = false;
    this.initArg();
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

  private setNewValues() {
    const proportion = this.img.width / this.img.height;
    this.height = (this.canvas.width - 20) / proportion;
    this.pieceHeight = this.height / this.sentences.length;
    this.canvas.height = this.pieceHeight * (this.sentences.length + 2);
    this.width = this.canvas.width - 20;
    this.scale = this.width / this.img.width;
    this.pieces = [];
    this.emptyPieces = [];
    this.createPieces(this.sentences);
  }

  public loadImg(imgSrc: string) {
    this.img.src = imgSrc;
    console.log(this.img.src);
    if (this.img === null) return;
    this.img.onload = () => {
      this.setNewValues();
      this.initArg();
      // this.context?.drawImage(this.img,0,0,this.img.width,this.img.height,this.x,this.y,this.width,this.height);
      this.drawAll();
    };
  }

  public getCanvas() {
    return this.canvas;
  }

  public completeSentence() {
    Canvas.btnCheckDisable();
    this.piecesResult.fillInOrder(this.pieces[this.currentRowID]);
    this.piecesResult.draw(this.context);
    this.piecesAdd.clear(this.context);
    this.checkResult();
  }

  public resize() {
    console.log(this);
    this.canvas.width = window.innerWidth * 0.9;
    if (this.canvas.width > 900) this.canvas.width = 900;
    this.setNewValues();
    for (let i = 0; i < this.currentRowID; i += 1) {
      for (let j = 0; j < this.pieces[i].length; j += 1) {
        this.pieces[i][j].draw(this.context);
      }
    }
    this.piecesAdd.changeValues(
      this.pieces[this.currentRowID],
      0,
      (this.sentences.length + 1) * this.pieceHeight,
      this.width,
      this.pieceHeight,
      this.emptyPieces[this.currentRowID],
      'source'
    );
    this.piecesAdd.draw(this.context);
    this.piecesResult.changeValues(
      this.pieces[this.currentRowID],
      0,
      this.currentRowID * this.pieceHeight,
      this.width,
      this.pieceHeight,
      this.emptyPieces[this.currentRowID],
      'result'
    );
    this.piecesResult.draw(this.context);
    // this.drawAll();
  }
}
export default Canvas;
