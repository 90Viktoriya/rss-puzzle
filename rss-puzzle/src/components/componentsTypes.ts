export type Props = {
  className?: string;
  textContent?: string;
  tag?: string;
  type?: string;
  id?: string;
  for?: string;
  required?: string;
  onclick?(): void;
};
export type Size = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type Place = 'source' | 'result';
