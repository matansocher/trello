import { IComment, IChecklistItem } from '@models';

export interface ICard {
  id: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  isWatching?: boolean;
  comments?: IComment[]; // create a type and add to initial data
  checklistItems?: IChecklistItem[]; // create a type and add to initial data
}
