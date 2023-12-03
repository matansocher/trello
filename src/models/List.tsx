import { ICard } from './Card';

export interface IList {
  id: string;
  title: string;
  dataIndex: string;
  cards: ICard[];
}
