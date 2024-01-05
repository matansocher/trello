import { IActivityItem } from './ActivityItem';
import { ILabel } from './Label';

export interface IBoard {
  id?: string;
  title: string;
  lists: string[];
  createdAt: string;
  background?: string;
  activityItems?: IActivityItem[];
  labels?: string[];
}
