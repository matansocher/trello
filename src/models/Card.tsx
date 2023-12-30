import { IComment, IChecklistItem, IActivityItem } from '@models';

export interface ICard {
  id?: string;
  title: string;
  description?: string;
  createdAt: string;
  dueDate?: string;
  labels?: string[];
  comments?: IComment[];
  checklistTitle?: string;
  checklistItems?: IChecklistItem[];
  activityItems?: IActivityItem[];
}
