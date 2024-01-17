import { IActivityItem } from './ActivityItem';
import { IBackground } from './Background';

export interface IBoard {
  id?: string;
  title: string;
  lists: string[];
  createdAt: string;
  background?: IBackground;
  activityItems?: IActivityItem[];
  labels?: string[];
}
