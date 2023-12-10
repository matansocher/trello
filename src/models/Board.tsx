import { IList } from './List';

export interface IBoard {
  id: string;
  title: string;
  lists: IList[];
  background?: string;
}
