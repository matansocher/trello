import { IBackground } from './Background';

export interface IBoardTemplate {
  id: string;
  title: string;
  lists: string[];
  background: IBackground;
}
