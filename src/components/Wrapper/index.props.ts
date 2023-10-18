import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface WrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  scaleValue: number;
  centered: boolean;
  setCentered: React.Dispatch<React.SetStateAction<boolean>>;
}
