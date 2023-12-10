import { IBoard, ILabel } from '@models';

export const USER_INITIAL_STATE = {
  id: 'userId_12345678',
  firstName: 'Matan',
  lastName: 'Socher',
  email: 'matansocher@gmail.com',

}

export const LABELS_INITIAL_STATE: ILabel[] = [
  { id: '1', displayName: 'Stop', backgroundColor: '#ae2e24', textColor: '#ffd5d2' },
  { id: '2', displayName: 'Waiting', backgroundColor: '#0055cc', textColor: '#cce0ff' },
  { id: '3', displayName: 'In Progress', backgroundColor: '#7f5f01', textColor: '#f8e6a0' },
  { id: '4', displayName: 'Done', backgroundColor: '#216e4e', textColor: '#baf3db' },
];

export const BOARD_INITIAL_STATE: IBoard = {
  id: 'boardId_12345678',
  title: 'Matan Personal Board',
  lists: [
    {
      title: 'To Do',
      id: 'listId_1234',
      cards: [
        {
          id: 'cardId_1',
          title: 'some title to the card',
          description: 'some descriptions to describe this card',
          date: '2023-11-11',
          labels: [],
          isWatching: true
        },
      ]
    },
    {
      title: 'In Progress',
      id: 'listId_2345',
      cards: [
        { id: 'cardId_2', title: 'some title to the card', date: '2023-11-11', labels: ['4']},
        { id: 'cardId_3', title: 'some title to the card', date: '2023-11-11', labels: ['1', '4'], isWatching: true},
        {
          id: 'cardId_4',
          title: 'some title to the card',
          date: '2023-11-11',
          labels: ['1', '2'],
          checklistItems: [
            { checklistItemDescription: 'this is a checklist item', isChecked: true },
            { checklistItemDescription: 'this is a checklist item', isChecked: false },
          ],
          comments: [
            { id: 'commentId_1', userId: '', commentDescription: 'this is a comment description', timestamp: '2023-11-11' },
          ],
        },
        {
          id: 'cardId_5',
          title: 'some title to the card',
          date: '2023-11-11',
          labels: ['3', '4'],
          checklistItems: [
            { checklistItemDescription: 'this is a checklist item', isChecked: true },
            { checklistItemDescription: 'this is a checklist item', isChecked: false },
          ],
          comments: [
            { id: 'commentId_2', userId: '', commentDescription: 'this is a comment description', timestamp: '2023-11-11' }
          ],
        },
        {
          id: 'cardId_6',
          title: 'some title to the card',
          description: 'some descriptions to describe this card',
          date: '2023-11-11',
          labels: ['1', '3', '4'],
          isWatching: true
        },
        {
          id: 'cardId_7',
          title: 'some title to the card',
          description: 'some descriptions to describe this card',
          date: '2023-11-11',
          labels: ['1']
        },
      ]
    },
    {
      title: 'Done',
      id: 'listId_3456',
      cards: [
        {
          id: 'cardId_8',
          title: 'some title to the card',
          description: 'some descriptions to describe this card',
          date: '2023-11-11',
          labels: ['2', '3', '4'],
          isWatching: true
        },
        {
          id: 'cardId_9',
          title: 'some title to the card',
          description: 'some descriptions to describe this card',
          date: '2023-11-11',
          labels: ['1', '4'],
          isWatching: true,
          checklistItems: [
            { checklistItemDescription: 'this is a checklist item', isChecked: true },
            { checklistItemDescription: 'this is a checklist item', isChecked: false },
          ],
          comments: [
            { id: 'commentId_3', userId: '', commentDescription: 'this is a comment description', timestamp: '2023-11-11' }
          ],
        },
        {
          id: 'cardId_10',
          title: 'some title to the card',
          description: 'some descriptions to describe this card',
          date: '2023-11-11',
          labels: [],
          checklistItems: [
            { checklistItemDescription: 'this is a checklist item', isChecked: true },
            { checklistItemDescription: 'this is a checklist item', isChecked: false },
          ],
          comments: [
            { id: 'commentId_4', userId: '', commentDescription: 'this is a comment description', timestamp: '2023-11-11' }
          ],
        },
        {
          id: 'cardId_11',
          title: 'some title to the card, some title to the card, some title to the card, some title to the card, some title to the card, some title to the card',
          date: '2023-11-11',
          labels: ['1', '2', '4'],
          checklistItems: [
            { checklistItemDescription: 'this is a checklist item', isChecked: true },
            { checklistItemDescription: 'this is a checklist item', isChecked: false },
          ],
          comments: [
            { id: 'commentId_5', userId: '', commentDescription: 'this is a comment description', timestamp: '2023-11-11' }
          ],
        },
      ]
    },
  ],
}
