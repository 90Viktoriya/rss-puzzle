import { Place } from './componentsTypes';
import { Piece } from './pieces';

export class PieceArray extends Array {
  private x;

  private y;

  private width;

  private height;

  private pieces: Array<Piece>;

  constructor(pieces: Array<Piece>, x: number, y: number, width: number, height: number) {
    super();
    this.pieces = pieces;
    this.x = x;
    this.width = width;
    this.height = height;
    this.y = y;
  }

  public clearX() {
    this.x = 0;
  }

  public draw(context: CanvasRenderingContext2D | null) {
    if (context === null) return;
    context.clearRect(this.x - 1, this.y - 1, this.width + 20, this.height + 3);
    for (let i = 0; i < this.pieces.length; i += 1) {
      this.pieces[i].draw(context, this.x, this.y);
      this.x += this.pieces[i].getWidth();
    }
  }

  public checkMove(piece: Piece, place: Place): { piece: Piece; index: number } | null {
    for (let i = 0; i < this.pieces.length; i += 1)
      if (this.pieces[i].getColID() === piece.getColID())
        if (this.pieces[i].getPlace() === place) return { piece: this.pieces[i], index: i };
    return null;
  }

  public findEmpty() {
    for (let i = 0; i < this.pieces.length; i += 1) if (this.pieces[i].getText() === '') return i;
    return -1;
  }

  public insertPiece(piece: Piece, index?: number) {
    let i = index;
    if (typeof i === 'undefined') i = this.findEmpty();
    this.pieces[i] = piece;
  }

  public checkOrder() {
    for (let i = 0; i < this.pieces.length; i += 1) if (this.pieces[i].getColID() !== i) return false;
    return true;
  }

  public checkAndMark(context: CanvasRenderingContext2D | null) {
    if (context === null) return;
    for (let i = 0; i < this.pieces.length; i += 1) {
      if (i !== this.pieces[i].getColID()) this.pieces[i].markError(context);
      else this.pieces[i].markRight(context);
    }
  }

  public clear(context: CanvasRenderingContext2D | null) {
    if (context !== null) {
      context.clearRect(0, this.y - 1, this.width + 20, this.height + 1);
    }
  }

  public fillInOrder(pieces: Array<Piece>) {
    for (let i = 0; i < pieces.length; i += 1)
      for (let j = 0; j < pieces.length; j += 1) if (pieces[j].getColID() === i) this.pieces[i] = pieces[j];
    this.x = 0;
  }

  public changeValues(
    pieces: Array<Piece>,
    x: number,
    y: number,
    width: number,
    height: number,
    empty: Piece,
    place: Place
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    for (let i = 0; i < this.pieces.length; i += 1)
      for (let j = 0; j < this.pieces.length; j += 1) {
        if (this.pieces[i].getColID() === pieces[j].getColID()) {
          this.pieces[i] = pieces[j];
          this.pieces[i].setPlace(place);
        }
        if (this.pieces[i].getColID() === empty.getColID()) this.pieces[i] = empty;
      }
  }
}
export default PieceArray;
