// import { IBoard, ILabel } from '@models';

// export const USER_INITIAL_STATE = {
//   id: 'userId_12345678',
//   firstName: 'Matan',
//   lastName: 'Socher',
//   email: 'matansocher@gmail.com',
// }

// export const LABELS_INITIAL_STATE: ILabel[] = [
//   { id: '1', displayName: 'Stop', backgroundColor: '#ae2e24', textColor: '#ffd5d2' },
//   { id: '2', displayName: 'Waiting', backgroundColor: '#0055cc', textColor: '#cce0ff' },
//   { id: '3', displayName: 'In Progress', backgroundColor: '#7f5f01', textColor: '#f8e6a0' },
//   { id: '4', displayName: 'Done', backgroundColor: '#216e4e', textColor: '#baf3db' },
// ];

// export const BOARDS_INITIAL_STATE: IBoard[] = [
//   {
//     id: 'boardId_12345678',
//     title: 'Matan Personal Board 1',
//     lists: [
//       {
//         title: 'To Do',
//         id: 'listId_1234',
//         cards: [
//           {
//             id: 'cardId_1',
//             title: 'some title to the card',
//             description: 'some descriptions to describe this card',
//             dueDate: '2023-12-13',
//             createdAt: '2023-11-11',
//             labels: ['1'],
//             activityItems: [
//               {
//                 id: 'activityId_1',
//                 userId: 'userId',
//                 createdAt: '2023-12-23',
//                 description: 'ticket created',
//               },
//               {
//                 id: 'activityId_2',
//                 userId: 'userId',
//                 createdAt: '2023-12-24',
//                 description: 'added description - some descriptions to describe this card',
//               },
//               {
//                 id: 'activityId_3',
//                 userId: 'userId',
//                 createdAt: '2023-12-24',
//                 description: 'added label - Stop',
//               },
//             ],
//           },
//         ]
//       },
//       {
//         title: 'In Progress',
//         id: 'listId_2345',
//         cards: [
//           { id: 'cardId_2', title: 'some title to the card', createdAt: '2023-11-11', labels: ['4'] },
//           {
//             id: 'cardId_4',
//             title: 'some title to the card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: ['1', '2'],
//             checklistItems: [
//               { id: 'checklist_1', description: 'this is a checklist item', isChecked: true},
//               { id: 'checklist_2', description: 'this is a checklist item', isChecked: false},
//             ],
//             comments: [
//               {
//                 id: 'commentId_1',
//                 userId: 'userId',
//                 description: 'this is a comment description',
//                 timestamp: '2023-11-11'
//               },
//             ],
//           },
//           {
//             id: 'cardId_5',
//             title: 'some title to the card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: ['3', '4'],
//             checklistItems: [
//               { id: 'checklist_3', description: 'this is a checklist item', isChecked: true},
//               { id: 'checklist_4', description: 'this is a checklist item', isChecked: false},
//             ],
//             comments: [
//               {
//                 id: 'commentId_2',
//                 userId: 'userId',
//                 description: 'this is a comment description',
//                 timestamp: '2023-11-11'
//               }
//             ],
//           },
//           {
//             id: 'cardId_6',
//             title: 'some title to the card',
//             description: 'some descriptions to describe this card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: ['1', '3', '4'],
//           },
//         ]
//       },
//       {
//         title: 'Done',
//         id: 'listId_3456',
//         cards: [
//           {
//             id: 'cardId_8',
//             title: 'some title to the card',
//             description: 'some descriptions to describe this card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: ['2', '3', '4'],
//           },
//           {
//             id: 'cardId_9',
//             title: 'some title to the card',
//             description: 'some descriptions to describe this card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: ['1', '4'],
//             checklistItems: [
//               { id: 'checklist_5', description: 'this is a checklist item', isChecked: true},
//               { id: 'checklist_6', description: 'this is a checklist item', isChecked: false},
//             ],
//             comments: [
//               {
//                 id: 'commentId_3',
//                 userId: 'userId',
//                 description: 'this is a comment description',
//                 timestamp: '2023-11-11'
//               }
//             ],
//           },
//           {
//             id: 'cardId_10',
//             title: 'some title to the card',
//             description: 'some descriptions to describe this card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: [],
//             checklistItems: [
//               { id: 'checklist_7', description: 'this is a checklist item', isChecked: true},
//               { id: 'checklist_8', description: 'this is a checklist item', isChecked: false},
//             ],
//             comments: [
//               {
//                 id: 'commentId_4',
//                 userId: 'userId',
//                 description: 'this is a comment description',
//                 timestamp: '2023-11-11'
//               }
//             ],
//           },
//           {
//             id: 'cardId_11',
//             title: 'some title to the card, some title to the card, some title to the card, some title to the card, some title to the card, some title to the card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: ['1', '2', '4'],
//             checklistItems: [
//               { id: 'checklist_9', description: 'this is a checklist item', isChecked: true},
//               { id: 'checklist_10', description: 'this is a checklist item', isChecked: false},
//             ],
//             comments: [
//               {
//                 id: 'commentId_5',
//                 userId: 'userId',
//                 description: 'this is a comment descriptionn this is a comment descriptionn this is a comment descriptionn this is a comment descriptionn this is a comment descriptionn',
//                 timestamp: '2023-11-11'
//               }
//             ],
//           },
//         ]
//       },
//     ],
//   },
//   {
//     id: 'boardId_23456789',
//     title: 'Matan Personal Board 2',
//     lists: [
//       {
//         title: 'To Do',
//         id: 'listId_1234',
//         cards: [
//           {
//             id: 'cardId_1',
//             title: 'some title to the card',
//             description: 'some descriptions to describe this card',
//             dueDate: '2023-12-11',
//             createdAt: '2023-11-11',
//             labels: [],
//           },
//         ]
//       },
//     ],
//   },
// ];
