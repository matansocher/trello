import { IList } from './List';
import { IActivityItem } from './ActivityItem';

export interface IBoard {
  id: string;
  title: string;
  lists: IList[];
  background?: string;
  activityItems?: IActivityItem[];
}
