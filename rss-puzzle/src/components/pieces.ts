import { Place } from './componentsTypes';

export class Piece {
  private rowID: number;

  private colID: number;

  private text: string;

  private height;

  private width;

  private x = 0;

  private y = 0;

  private place: Place;

  constructor(rowID: number, colID: number, text: string, pieceHeight: number, pieceWidth: number) {
    this.rowID = rowID;
    this.colID = colID;
    this.text = text;
    this.height = pieceHeight;
    this.width = pieceWidth;
    this.place = 'source';
  }

  getColID() {
    return this.colID;
  }

  getWidth() {
    return this.width;
  }

  getY() {
    return this.y;
  }

  getPlace() {
    return this.place;
  }

  getText() {
    return this.text;
  }

  setPlace(newValue: Place) {
    this.place = newValue;
  }

  public delete(context: CanvasRenderingContext2D) {
    this.place = 'result';
    context.clearRect(this.x, this.y, this.width, this.height);
  }

  public draw(context: CanvasRenderingContext2D, x: number, y: number) {
    context.beginPath();
    this.x = x;
    this.y = y;
    context.fillStyle = '#A66A2C';
    context.fillRect(x, y, this.width, this.height);
    context.fillStyle = 'black';
    context.rect(x, y, this.width, this.height);
    context.stroke();
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(this.text, x + this.width / 2, y + this.height / 2);
  }

  public markError(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.strokeStyle = 'red';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.strokeStyle = 'black';
  }

  public markRight(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.strokeStyle = 'green';
    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();
    context.strokeStyle = 'black';
  }

  public checkPress(loc: MouseEvent) {
    let x = 0;
    let y = 0;
    if (loc.target instanceof HTMLElement) {
      x = loc.pageX - loc.target.offsetLeft;
      y = loc.pageY - loc.target.offsetTop;
    }
    if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) return true;
    return false;
  }
}
export default Piece;
