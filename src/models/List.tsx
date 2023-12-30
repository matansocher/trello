import { ICard } from './Card';

export interface IList {
  id?: string;
  title: string;
  cards: ICard[];
  createdAt: string;
}
