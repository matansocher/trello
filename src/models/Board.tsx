import { IActivityItem } from './ActivityItem';
import { IBackground } from './Background';

export interface IBoard {
  id?: string;
  title: string;
  description?: string;
  lists: string[];
  createdAt: string;
  createdBy: string;
  background?: IBackground;
  activityItems?: IActivityItem[];
  labels?: string[];
}
