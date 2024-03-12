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

  constructor(width: number, height: number, sentences: Array<Array<string>>, curRowID: number) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.className = 'mainPage_canvas';
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
    this.createPieces(sentences);
    this.drawRect();
    this.initAdd();
    this.canvas.addEventListener('click', (evt) => {
      this.onClick(evt, this.pieces[this.currentRowID]);
    });
  }

  private addToResult(piece: Piece) {
    this.piecesResult.push(piece);
    if (this.context) {
      for (let i = 0; i < this.piecesAdd.length; i += 1)
        if (this.piecesAdd[i].getCallID() === piece.getCallID()) this.piecesAdd[i].delete(this.context);
      this.piecesResult[this.piecesResult.length - 1].draw(this.context, this.sizeResult.x, this.sizeResult.y);
      this.sizeResult.x += piece.getWidth();
    }
  }

  public onClick(evt: MouseEvent, currentPieces: Piece[]) {
    for (let i = 0; i < currentPieces.length; i += 1) {
      if (currentPieces[i].checkPress(evt)) {
        this.addToResult(currentPieces[i]);
      }
    }
  }

  public drawRect() {
    if (!this.context) return;
    this.context.fillStyle = '#A66A2C';
    this.context.beginPath();
    this.context.fillRect(this.sizeMain.x, this.sizeMain.y, this.sizeMain.width, this.sizeMain.height);
    this.context.stroke();
  }

  public createPieces(sentences: Array<Array<string>>) {
    for (let i = 0; i < sentences.length; i += 1) {
      this.pieces.push([]);
      const width = this.sizeMain.width / sentences[i].length;
      for (let j = 0; j < sentences[i].length; j += 1) {
        this.pieces[i].push(new Piece(i, j, sentences[i][j], this.pieceHeight, width));
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

  public drawAdd() {
    if (this.context) {
      this.context.strokeStyle = 'green';
      for (let i = 0; i < this.piecesAdd.length; i += 1) {
        this.piecesAdd[i].draw(this.context, this.sizeAdd.x, this.sizeAdd.y);
        this.sizeAdd.x += this.piecesAdd[i].getWidth();
      }
      this.context.strokeStyle = 'black';
    }
  }

  public drawResult() {
    if (this.context) {
      this.context.strokeStyle = 'black';
      for (let i = 0; i < this.piecesResult.length; i += 1) {
        this.piecesResult[i].draw(this.context, this.sizeResult.x, this.sizeResult.y);
        this.sizeResult.x += this.piecesResult[i].getWidth();
      }
    }
  }

  public getCanvas() {
    return this.canvas;
  }
}
export default Canvas;
