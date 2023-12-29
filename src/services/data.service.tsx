import dayjs, { Dayjs } from 'dayjs';
import { IBoard, ICard, IChecklistItem, IComment, ILabel, IList } from '@models';

export function createBoard(title: string): IBoard {
  const id = `board_${Date.now()}`;
  const lists: IList[] = [];
  const newBoard = { id, title, lists, createdAt: dayjs().format('YYYY-MM-DD') }; // $$$$$$$$$$$$$$$ you are on create board, you need to return the board, or boards
  // here we need to add the board to the database, navigate to the board, and then return the board
  return newBoard;
}

export function copyList(board: IBoard, listId: string): IBoard {
  const list = board.lists.find((list: IList) => list.id === listId);
  const newList = { ...list, id: 'listId_4567', title: `Copy of ${list?.title}` };
  const newLists = [...board.lists, newList] as IList[];
  return { ...board, lists: newLists };
}

export function archiveList(board: IBoard, listId: string): IBoard {
  const newLists: IList[] = board.lists.filter((list: IList) => list.id !== listId);
  return { ...board, lists: newLists };
}

export function addListToBoard(board: IBoard, list: IList): IBoard {
  const newLists = [...board.lists, list];
  return { ...board, lists: newLists };
}

export function addCardToList(board: IBoard, list: IList, card: ICard): IBoard {
  const listId = list.id;
  const newList = structuredClone(board.lists.find((list: IList) => list.id === listId)) || {} as IList;
  newList.cards.push(card);
  const newLists = board.lists.map((list: IList) => list.id === listId ? newList : list);
  return { ...board, lists: newLists };
}

export function removeCardFromList(board: IBoard, list: IList, cardId: string): IBoard {
  // const boardId = board.id;
  const listId = list.id;
  const newList = structuredClone(list) || {} as IList;
  newList.cards = newList.cards.filter((card: ICard) => card.id !== cardId);
  const newLists = board.lists.map((list: IList) => list.id === listId ? newList : list);

  return { ...board, lists: newLists };
}

export function saveCard(board: IBoard, listId: string, newCard: ICard): IBoard {
  const newLists = board.lists.map((list: IList) => {
    if (list.id === listId) {
      const newCards = list.cards.map((card: ICard) => card.id === newCard.id ? newCard : card);
      return { ...list, cards: newCards };
    }
    return list;
  });

  return { ...board, lists: newLists };
}

export function updateCard(board: IBoard, listId: string, cardToSave: ICard): IBoard {
  const newLists = board.lists.map((list: IList) => {
    if (list.id === listId) {
      const newCards = list.cards.map((card: ICard) => card.id === cardToSave.id ? cardToSave : card);
      return { ...list, cards: newCards };
    }
    return list;
  });

  return { ...board, lists: newLists };
}

export function updateCardDueDate(card: ICard, newDueDate: Dayjs | null): ICard {
  const dueDate = newDueDate ? newDueDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
  return { ...card, dueDate };
}

export function updateCardLabels(card: ICard, label: ILabel, isChecked: boolean): ICard {
  const currentLabels = card.labels || [];
  const newLabels = isChecked ? [...currentLabels, label.id] : currentLabels.filter((labelId: string) => labelId !== label.id);
  return { ...card, labels: newLabels };
}

export function addCommentToCard(card: ICard, comment: IComment): ICard {
  const comments = card.comments || [];
  const newComments = [comment, ...comments];
  return { ...card, comments: newComments };
}

export function editComment(card: ICard, comment: IComment, newDescription: string): ICard {
  const comments = card.comments || [];
  const updatedComment = { ...comment, description: newDescription };
  const newComments = comments.map((item: IComment) => item.id === comment.id ? updatedComment : item);
  return { ...card, comments: newComments };
}

export function deleteCommentFromCard(card: ICard, comment: IComment): ICard {
  const comments = card.comments || [];
  const newComments = comments.filter((item: IComment) => item.id !== comment.id);
  return{ ...card, comments: newComments };
}

export function addNewChecklistItem(card: ICard, checklistItem: IChecklistItem) {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = [...checklistItems, checklistItem];
  return { ...card, checklistItems: newChecklistItems };
}

export function updateChecklistItem(card: ICard, checklistItem: IChecklistItem) {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = checklistItems.map((item: IChecklistItem) => item.id === checklistItem.id ? checklistItem : item);
  return { ...card, checklistItems: newChecklistItems };
}

export function deleteChecklistItem(card: ICard, checklistItem: IChecklistItem) {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = checklistItems.filter((item: IChecklistItem) => item.id !== checklistItem.id);
  return { ...card, checklistItems: newChecklistItems };
}

