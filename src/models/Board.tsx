import { IList } from './List';
import { IActivityItem } from './ActivityItem';

export interface IBoard {
  id?: string;
  title: string;
  lists: IList[];
  createdAt: string;
  background?: string;
  activityItems?: IActivityItem[];
}
