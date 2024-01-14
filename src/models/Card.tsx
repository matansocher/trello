import { IComment, IChecklistItem, IActivityItem, ILocation } from '@models';

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
  coverColor?: string;
  location?: ILocation;
}
