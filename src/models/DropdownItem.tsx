import { JSX } from 'react';

export interface IDropdownItem {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}
