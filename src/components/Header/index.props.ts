import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICoefficient } from '../../types';

export interface HeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  decrementScale: () => void;
  incrementScale: () => void;
  scaleLabel: string;
  handleSelect: (coefficient: ICoefficient) => void;
  handleCenterPosition: () => void;
}
