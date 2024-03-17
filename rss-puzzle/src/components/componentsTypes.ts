export type Props = {
  className?: string;
  textContent?: string;
  tag?: string;
  type?: string;
  id?: string;
  for?: string;
  required?: string;
  onclick?(): void;
  onchange?(evt: MouseEvent): void;
  name?: string;
  list?: string;
  value?: string;
  innerHTML?: string;
};

export type ImageElement = {
  img: HTMLImageElement;
  cols: number;
  rows: number;
};

export type Place = 'source' | 'result';
