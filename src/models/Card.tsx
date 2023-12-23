import { IComment, IChecklistItem, IActivityItem } from '@models';

export interface ICard {
  id: string;
  title: string;
  description?: string;
  createdDate: string;
  dueDate?: string;
  labels?: string[];
  isWatching?: boolean;
  comments?: IComment[];
  checklistTitle?: string;
  checklistItems?: IChecklistItem[];
  activityItems?: IActivityItem[];
}
