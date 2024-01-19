import { BackgroundType } from '@constants';

export interface IBackground {
  type: BackgroundType;
  background: string;
  boardId?: string;
}
