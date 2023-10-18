import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { IElement } from '../../types';

export interface CategoryWrapperProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  handleDeleteClick: () => void;
  category: IElement;
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  width: number;
  setX1: React.Dispatch<React.SetStateAction<number>>;
  setX2: React.Dispatch<React.SetStateAction<number>>;
  bgColor: string;
  scaleValue: number;
}
