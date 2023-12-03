import { IBoard, ITag } from '../models';

export const TAGS_INITIAL_STATE: ITag[] = [
  { id: '1', displayName: 'Stop', backgroundColor: '#ae2e24', textColor: '#ffd5d2'},
  { id: '2', displayName: 'Waiting', backgroundColor: '#0055cc', textColor: '#cce0ff'},
  { id: '3', displayName: 'In Progress', backgroundColor: '#7f5f01', textColor: '#f8e6a0'},
  { id: '4', displayName: 'Done', backgroundColor: '#216e4e', textColor: '#baf3db'},
];

export const BOARD_INITIAL_STATE: IBoard = {
  id: '12345678',
  title: 'Matan Personal Board',
  lists: [
    {
      title: 'Backlog',
      dataIndex: 'backlog',
      id: '1234',
      cards: [
        { id: '1', title: 'some title to the card', date: '11-11-2023', tags: ['1'] },
      ]
    },
    {
      title: 'In Progress',
      dataIndex: 'inProgress',
      id: '2345',
      cards: [
        { id: '1', title: 'some title to the card', date: '11-11-2023', tags: ['4'] },
        { id: '2', title: 'some title to the card', date: '11-11-2023', tags: ['1', '4'] },
        { id: '3', title: 'some title to the card', date: '11-11-2023', tags: ['1', '2'] },
        { id: '4', title: 'some title to the card', date: '11-11-2023', tags: ['3', '4'] },
        { id: '5', title: 'some title to the card', date: '11-11-2023', tags: ['1', '3', '4'] },
        { id: '6', title: 'some title to the card', date: '11-11-2023', tags: ['1'] },
      ]
    },
    {
      title: 'Done',
      dataIndex: 'done',
      id: '3456',
      cards: [
        { id: '1', title: 'some title to the card', date: '11-11-2023', tags: ['2', '3', '4'] },
        { id: '2', title: 'some title to the card', date: '11-11-2023', tags: ['1', '4'] },
        { id: '3', title: 'some title to the card', date: '11-11-2023', tags: ['1', '2', '4'] },
        { id: '4', title: 'some title to the card', date: '11-11-2023', tags: ['1', '2',] },
      ]
    },
  ],
}
