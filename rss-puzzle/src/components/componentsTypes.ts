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

export type Place = 'source' | 'result';
