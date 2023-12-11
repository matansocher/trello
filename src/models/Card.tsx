import { IComment, IChecklistItem } from '@models';

export interface ICard {
  id: string;
  title: string;
  description?: string;
  createdDate: string;
  dueDate?: string;
  labels?: string[];
  isWatching?: boolean;
  comments?: IComment[];
  activity?: any;
  checklistItems?: IChecklistItem[];
}
