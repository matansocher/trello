import { IBoard, ITag } from '../models';

export const TAGS_INITIAL_STATE: ITag[] = [
  { id: '1', displayName: 'Stop', backgroundColor: '#ae2e24', textColor: '#ffd5d2'},
  { id: '2', displayName: 'Waiting', backgroundColor: '#0055cc', textColor: '#cce0ff'},
  { id: '3', displayName: 'In Progress', backgroundColor: '#7f5f01', textColor: '#f8e6a0'},
  { id: '4', displayName: 'Done', backgroundColor: '#216e4e', textColor: '#baf3db'},
];

export const BOARD_INITIAL_STATE: IBoard = {
  id: 'boardId_12345678',
  title: 'Matan Personal Board',
  lists: [
    {
      title: 'Backlog',
      dataIndex: 'backlog',
      id: 'listId_1234',
      cards: [
        { id: 'cardId__1', title: 'some title to the card', date: '11-11-2023', tags: ['1'] },
      ]
    },
    {
      title: 'In Progress',
      dataIndex: 'inProgress',
      id: 'listId_2345',
      cards: [
        { id: 'cardId__2', title: 'some title to the card', date: '11-11-2023', tags: ['4'] },
        { id: 'cardId__3', title: 'some title to the card', date: '11-11-2023', tags: ['1', '4'] },
        { id: 'cardId__4', title: 'some title to the card', date: '11-11-2023', tags: ['1', '2'] },
        { id: 'cardId__5', title: 'some title to the card', date: '11-11-2023', tags: ['3', '4'] },
        { id: 'cardId__6', title: 'some title to the card', date: '11-11-2023', tags: ['1', '3', '4'] },
        { id: 'cardId__7', title: 'some title to the card', date: '11-11-2023', tags: ['1'] },
      ]
    },
    {
      title: 'Done',
      dataIndex: 'done',
      id: 'listId_3456',
      cards: [
        { id: 'cardId__8', title: 'some title to the card', date: '11-11-2023', tags: ['2', '3', '4'] },
        { id: 'cardId__9', title: 'some title to the card', date: '11-11-2023', tags: ['1', '4'] },
        { id: 'cardId__10', title: 'some title to the card', date: '11-11-2023', tags: ['1', '2', '4'] },
        { id: 'cardId__11', title: 'some title to the card', date: '11-11-2023', tags: ['1', '2',] },
      ]
    },
  ],
}
