import { IComment, IChecklistItem } from '@models';

export interface ICard {
  id: string;
  title: string;
  description?: string;
  date: string;
  labels: string[];
  isWatching?: boolean;
  comments?: IComment[];
  checklistItems?: IChecklistItem[];
}
