import { IActivityItem } from './ActivityItem';

export interface IBoard {
  id?: string;
  title: string;
  lists: string[];
  createdAt: string;
  background?: string;
  activityItems?: IActivityItem[];
  labels?: string[];
}
