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

  private leftTab;

  private rightTab;

  private img;

  private scale;

  private resultX;

  constructor(
    rowID: number,
    colID: number,
    text: string,
    x: number,
    y: number,
    pieceHeight: number,
    pieceWidth: number,
    leftTab: number,
    rightTab: number,
    img: HTMLImageElement,
    scale: number,
    resultX: number
  ) {
    this.rowID = rowID;
    this.colID = colID;
    this.text = text;
    this.x = x;
    this.y = y;
    this.height = pieceHeight;
    this.width = pieceWidth;
    this.place = 'source';
    this.leftTab = leftTab;
    this.rightTab = rightTab;
    this.img = img;
    this.scale = scale;
    this.resultX = resultX;
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

  getRightTab() {
    return this.rightTab;
  }

  private drawRect(context: CanvasRenderingContext2D) {
    const neck = 0.2 * this.height;
    const tabSize = 0.25 * this.height;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + this.width, this.y);
    if (this.rightTab) {
      context.lineTo(this.x + this.width, this.y + this.height * this.rightTab - neck);
      context.lineTo(this.x + this.width + tabSize * Math.sign(this.rightTab), this.y + this.height * this.rightTab);
      context.lineTo(this.x + this.width, this.y + this.height * this.rightTab + neck);
    }
    context.lineTo(this.x + this.width, this.y + this.height);
    context.lineTo(this.x, this.y + this.height);
    if (this.leftTab) {
      context.lineTo(this.x, this.y - this.height * this.leftTab + neck);
      context.lineTo(this.x - tabSize * Math.sign(this.leftTab), this.y - this.height * this.leftTab);
      context.lineTo(this.x, this.y - this.height * this.leftTab - neck);
    }
    context.lineTo(this.x, this.y);
  }

  public draw(context: CanvasRenderingContext2D | null, x?: number, y?: number) {
    if (context === null) return;

    if (typeof x !== 'undefined') this.x = x;
    if (typeof y !== 'undefined') this.y = y;

    context.fillStyle = 'black';
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    this.drawRect(context);
    context.save();
    context.clip();
    context.drawImage(
      this.img,
      this.resultX * this.scale,
      this.rowID * this.height * this.scale,
      (this.width + 0.25 * this.height) / this.scale,
      this.height / this.scale,
      this.x,
      this.y,
      this.width + 0.25 * this.height,
      this.height
    );
    context.restore();
    context.stroke();
    context.font = '24px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.strokeText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }

  public markError(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'red';
    this.drawRect(context);
    context.stroke();
    context.strokeStyle = 'black';
  }

  public markRight(context: CanvasRenderingContext2D) {
    context.strokeStyle = 'green';
    this.drawRect(context);
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
