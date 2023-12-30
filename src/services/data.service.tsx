import dayjs, { Dayjs } from 'dayjs';
import { IBoard, ICard, IChecklistItem, IComment, ILabel, IList } from '@models';
import { firebaseService } from './index.tsx';

export function createBoard(title: string): IBoard {
  const id = `board_${Date.now()}`;
  const lists: IList[] = [];
  const newBoard = { id, title, lists, createdAt: dayjs().format('YYYY-MM-DD') }; // $$$$$$$$$$$$$$$ you are on create board, you need to return the board, or boards
  // here we need to add the board to the database, navigate to the board, and then return the board
  return newBoard;
}

export async function addNewList(board: IBoard, list: IList): Promise<IBoard> {
  const { id: createdListId } = await firebaseService.createList(list);
  const newBoard = { ...board, lists: [...board.lists, createdListId] } as IBoard;
  await firebaseService.updateBoard(newBoard);
  return newBoard;
}

export async function cloneList(board: IBoard, list: IList): Promise<IBoard> {
  // copy the cards in the cards collection
  // copy the list in the list collection
  // add the list id to the board lists array

  // $$$$$$$$$ we also need to copy the cards in the cards collection
  const clonedList = { ...list, title: `Copy of ${list.title}` } as IList;
  delete clonedList.id;
  await firebaseService.createList(clonedList);
  const newBoard = { ...board, lists: [...board.lists, list.id] } as IBoard;
  await firebaseService.updateBoard(newBoard);
  return newBoard;
}

export async function archiveList(board: IBoard, listId: string): Promise<IBoard> {
  await firebaseService.archiveList(listId);
  const newBoard = { ...board, lists: board.lists.filter((list: string) => list !== listId) } as IBoard;
  await firebaseService.updateBoard(newBoard);
  return newBoard
}

export async function updateCardTitle(card: ICard, title: string): Promise<ICard> {
  const cardToSave = { ...card, title };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function updateCardDescription(card: ICard, description: string): Promise<ICard> {
  const cardToSave = { ...card, description };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function updateCardDueDate(card: ICard, newDueDate: Dayjs | null): Promise<ICard> {
  const dueDate = newDueDate ? newDueDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
  const cardToSave = { ...card, dueDate } as ICard;
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function updateCardLabels(card: ICard, label: ILabel, isChecked: boolean): Promise<ICard> {
  const currentLabels = card.labels || [];
  const newLabels = isChecked ? [...currentLabels, label.id] : currentLabels.filter((labelId: string) => labelId !== label.id);
  const cardToSave = { ...card, labels: newLabels };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function addCommentToCard(card: ICard, comment: IComment): Promise<ICard> {
  const comments = card.comments || [];
  const newComments = [comment, ...comments];
  const cardToSave = { ...card, comments: newComments };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function editComment(card: ICard, comment: IComment, newDescription: string): Promise<ICard> {
  const comments = card.comments || [];
  const updatedComment = { ...comment, description: newDescription };
  const newComments = comments.map((item: IComment) => item.id === comment.id ? updatedComment : item);
  const cardToSave = { ...card, comments: newComments };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function deleteCommentFromCard(card: ICard, comment: IComment): Promise<ICard> {
  const comments = card.comments || [];
  const newComments = comments.filter((item: IComment) => item.id !== comment.id);
  const cardToSave = { ...card, comments: newComments };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function createChecklist(card: ICard): Promise<ICard> {
  const cardToSave = { ...card, checklistItems: [], checklistTitle: 'Checklist' };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function deleteChecklist(card: ICard): Promise<ICard> {
  const cardToSave = { ...card, checklistItems: [], checklistTitle: '' };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function updateChecklistTitle(card: ICard, checklistTitle: string): Promise<ICard> {
  const cardToSave = { ...card, checklistTitle };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function addNewChecklistItem(card: ICard, checklistItem: IChecklistItem): Promise<ICard> {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = [...checklistItems, checklistItem];
  const cardToSave = { ...card, checklistItems: newChecklistItems };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function updateChecklistItem(card: ICard, checklistItem: IChecklistItem): Promise<ICard> {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = checklistItems.map((item: IChecklistItem) => item.id === checklistItem.id ? checklistItem : item);
  const cardToSave = { ...card, checklistItems: newChecklistItems };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function deleteChecklistItem(card: ICard, checklistItem: IChecklistItem): Promise<ICard> {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = checklistItems.filter((item: IChecklistItem) => item.id !== checklistItem.id);
  const cardToSave = { ...card, checklistItems: newChecklistItems };
  await firebaseService.updateCard(cardToSave);
  return cardToSave;
}

export async function archiveCard(list: IList, cardId: string) {
  await firebaseService.archiveCard(cardId);/**/
  const newList = { ...list, cards: list.cards.filter((card: string) => card !== cardId) };
  await firebaseService.updateList(newList);
}

export async function cloneCard(list: IList, card: ICard) {
  const clonedCard = { ...card, title: `Copy of ${card.title}`, createdAt: new Date().toISOString().slice(0, 10) } as ICard;
  delete clonedCard.id;
  const { id: createdCardId } = await firebaseService.createCard(clonedCard);
  const newList = { ...list, cards: [...list.cards, createdCardId] } as IList;
  await firebaseService.updateList(newList);
}

export async function addNewCardToList(list: IList, card: ICard) {
  const { id: createdCardId } = await firebaseService.createCard(card);
  const newList = { ...list, cards: [...list.cards, createdCardId] } as IList;
  await firebaseService.updateList(newList);
}

