import dayjs, { Dayjs } from 'dayjs';
import { BackgroundType } from '@constants';
import {
  IArchivedCard,
  IBackground,
  IBoard,
  IBoardTemplate,
  ICard,
  IChecklistItem,
  IComment,
  ILabel,
  IList,
  ILocation,
  IUser,
} from '@models';
import { firebaseStore } from '../index';
import { BACKGROUND_DEFAULT_COLOR } from '@constants';

export function getDefaultBackgrounds() {
  return firebaseStore.getDefaultBackgrounds();
}

export function getBackgrounds(boardId: string) {
  return firebaseStore.getBackgrounds(boardId);
}

export function saveFileToBoardBackgrounds(boardBackground: IBackground) {
  return firebaseStore.saveFileToBoardBackgrounds(boardBackground);
}

// *********************  USER  ********************* //
export function saveUser(user: IUser) {
  return firebaseStore.saveUser(user);
}

// *********************  STARRED BOARD  ********************* //
export function getStarredBoardsListener(userId: string, callback: any) {
  return firebaseStore.getStarredBoardsListener(userId, callback);
}

export function updateStarredBoards(userId: string, newStarredBoards: any = []) {
  firebaseStore.updateStarredBoards(userId, newStarredBoards);
}

// *********************  LABEL  ********************* //
export function getDefaultLabels() {
  return firebaseStore.getDefaultLabels();
}

export function createLabel(label: ILabel) {
  return firebaseStore.createLabel(label);
}

export function updateLabel(label: ILabel) {
  return firebaseStore.updateLabel(label);
}

export function deleteLabel(labelId: string) {
  return firebaseStore.deleteLabel(labelId);
}

export function replaceDefaultLabelWithNewUpdatedLabel(boardState: IBoard, defaultLabelId: string, updatedLabelId: string): IBoard  {
  const labels = boardState.labels || [];
  const newLabels = labels.map((labelId: string) => labelId === defaultLabelId ? updatedLabelId : labelId);
  const boardToSave = { ...boardState, labels: newLabels } as IBoard;
  firebaseStore.updateBoard(boardToSave);
  return boardToSave;

}
// *********************  BOARD  ********************* //
export function getBoardListener(id: string, callback: any) {
  return firebaseStore.getBoardListener(id, callback);
}

export function getBoards() {
  return firebaseStore.getBoards();
}

export function getBoardLabelsListener(labelIds: string[], callback: any) {
  return firebaseStore.getBoardLabelsListener(labelIds, callback);
}

export function getBoardTemplates() {
  return firebaseStore.getBoardTemplates();
}

export async function createBoard(userId:string, title: string): Promise<IBoard> {
  const newBoard = { createdBy: userId, title, lists: [], createdAt: dayjs().format('YYYY-MM-DD'), background: { type: BackgroundType.COLOR, background: BACKGROUND_DEFAULT_COLOR } } as IBoard;
  const { id: createdBoardId } = await firebaseStore.createBoard(newBoard);
  return { ...newBoard, id: createdBoardId };
}

export function updateBoard(board: IBoard): void {
  firebaseStore.updateBoard(board);
}

export function updateBoardBackground(board: IBoard, background: IBackground): IBoard {
  const newBoard = { ...board, background } as IBoard;
  firebaseStore.updateBoard(newBoard);
  return newBoard;
}

export async function createBoardFromTemplate(userId: string, boardTemplate: IBoardTemplate): Promise<string> {
  const createListPromises = boardTemplate.lists.map(async (list: string) => {
    const newList = { title: list, cards: [], createdAt: dayjs().format('YYYY-MM-DD') } as IList;
    return firebaseStore.createList(newList);
  });
  const createdLists = await Promise.all(createListPromises);
  const createdListIds = createdLists.map((list) => list.id);
  const newBoard = { createdBy: userId, title: boardTemplate.title, lists: createdListIds, createdAt: dayjs().format('YYYY-MM-DD') } as IBoard;

  const { id: createdBoardId } = await firebaseStore.createBoard(newBoard);
  return createdBoardId;
}

export function updateBoardLabels(board: IBoard, labelIds: string[]): IBoard {
  const boardToSave = { ...board, labels: labelIds };
  firebaseStore.updateBoard(boardToSave);
  return boardToSave;
}

export async function restoreBoardLabels(labels: ILabel[], board: IBoard) {
  const nonDefaultBoardLabels = labels.filter((label: ILabel) => label.isDefault).map((label: ILabel) => label.id);
  updateBoardLabels(board, []);
  // find all non default labels and delete them
  const lists = await firebaseStore.getLists(board.lists);
  const cards = await firebaseStore.getCards(lists.flatMap((list: IList) => list.cards));
  const cardsToUpdate = cards.filter((card: ICard) => card.labels?.some((label: string) => nonDefaultBoardLabels.includes(label)));
  const updatedCards = cardsToUpdate.map((card: ICard) => {
    const newLabels = card.labels?.filter((label: string) => !nonDefaultBoardLabels.includes(label));
    return { ...card, labels: newLabels };
  });
  const updateCardPromises = updatedCards.map((card: ICard) => firebaseStore.updateCard(card));
  await Promise.all(updateCardPromises);
}

export function removeLabelFromBoard(board: IBoard, labelId: string): IBoard {
  const boardLabels = board.labels || [];
  const newLabels = boardLabels.filter((label: string) => label !== labelId);
  const boardToSave = { ...board, labels: newLabels };
  firebaseStore.updateBoard(boardToSave);
  return boardToSave;
}

export function updateBoardDescription(board: IBoard, description: string): ICard {
  const boardToSave = { ...board, description };
  firebaseStore.updateBoard(boardToSave);
  return boardToSave;
}

export async function closeBoard(board: IBoard) {
  let promisesArr: any[] = [];

  if (board?.lists?.length) {
    const lists = await firebaseStore.getLists(board.lists);
    const cardIds = lists.flatMap((list: IList) => list.cards);
    if (cardIds?.length) {
      const cards = await firebaseStore.getCards(cardIds);
      const archiveCardPromises = cards.map((card: ICard) => firebaseStore.archiveCard(board.id as string, card));
      promisesArr = [...archiveCardPromises];
    }
    const archiveListPromises = lists.map((list: IList) => firebaseStore.archiveList(list.id as string));
    promisesArr = [...promisesArr, ...archiveListPromises];
  }
  promisesArr = [...promisesArr, firebaseStore.archiveBoard(board.id as string)];

  return Promise.all(promisesArr);

}
// *********************  LIST  ********************* //
export function getListListener(listId: string = '', callback: any) {
  return firebaseStore.getListListener(listId, callback);
}

export function getList(listId: string): any {
  return firebaseStore.getList(listId);
}

export function updateList(list: IList) {
  return firebaseStore.updateList(list);
}

export async function addNewList(board: IBoard, list: IList): Promise<IBoard> {
  const { id: createdListId } = await firebaseStore.createList(list);
  const newBoard = { ...board, lists: [...board.lists, createdListId] } as IBoard;
  await firebaseStore.updateBoard(newBoard);
  return newBoard;
}

export async function cloneList(board: IBoard, list: IList): Promise<IBoard> {
  let listCards: ICard[] = [];
  if (list.cards.length !== 0) {
    listCards = await firebaseStore.getCards(list.cards);
  }

  const createCardPromises = listCards.map(async (card: ICard) => {
    const clonedCard = { ...card, createdAt: new Date().toISOString().slice(0, 10) } as ICard;
    delete clonedCard.id;
    return firebaseStore.createCard(clonedCard);
  });
  const createdCards = await Promise.all(createCardPromises);

  const clonedListCards = createdCards.map((card) => card.id);
  const clonedList = { ...list, title: `Copy of ${list.title}`, cards: clonedListCards } as IList;
  delete clonedList.id;
  const { id: createdListId } = await firebaseStore.createList(clonedList);
  const newBoard = { ...board, lists: [...board.lists, createdListId] } as IBoard;
  await firebaseStore.updateBoard(newBoard);
  return newBoard;
}

export async function archiveList(board: IBoard, listId: string): Promise<IBoard> {
  const list = await firebaseStore.getListWithCards(listId);
  const deleteCardPromises = list.cards.map((card: ICard) => firebaseStore.archiveCard(board.id as string, card));
  await Promise.all(deleteCardPromises);

  await firebaseStore.archiveList(listId);
  const newBoard = { ...board, lists: board.lists.filter((list: string) => list !== listId) } as IBoard;
  await firebaseStore.updateBoard(newBoard);
  return newBoard;
}

export function moveCardToTop(list: IList, card: ICard): void {
  const cardIds = [...list.cards];
  const indexOfCard = cardIds.indexOf(card.id as string);
  cardIds.splice(indexOfCard, 1);
  const newCards = [card.id, ...cardIds] as string[];
  firebaseStore.updateList({ ...list, cards: newCards });
}

export function moveCardToBottom(list: IList, card: ICard): void {
  const cardIds = [...list.cards];
  const indexOfCard = cardIds.indexOf(card.id as string);
  cardIds.splice(indexOfCard, 1);
  const newCards = [...cardIds, card.id] as string[];
  firebaseStore.updateList({ ...list, cards: newCards });
}

export function updateListTitle(list: IList, title: string): IList {
  const listToSave = { ...list, title };
  firebaseStore.updateList(listToSave);
  return listToSave;
}

// *********************  ARCHIVED_CARD  ********************* //
export function getArchivedCards(boardId: string) {
  return firebaseStore.getArchivedCards(boardId);
}

export async function sendArchivedCardToBoard(board: IBoard, archivedCard: IArchivedCard) {
  // get the first list
  const list = await getList(board.lists[0]);
  // add the card to the cards collection
  const newCreatedCard = await firebaseStore.createCard(archivedCard);
  return Promise.all([
    // remove the card from the archived cards collection
    firebaseStore.removeArchivedCards(archivedCard),
    // add the card id to the cards of the list
    updateList({ ...list, cards: [newCreatedCard.id, ...list.cards] }),
  ]);
}

// *********************  CARD  ********************* //
export function getCardListener(cardId: string = '', callback: any) {
  return firebaseStore.getCardListener(cardId, callback);
}

export function getCards(cardIds: string[]) {
  return firebaseStore.getCards(cardIds);
}

export async function archiveCard(boardId: string, list: IList, card: ICard): Promise<void> {
  const cardId = card.id as string;
  await firebaseStore.archiveCard(boardId, card);
  const newList = { ...list, cards: list.cards.filter((card: string) => card !== cardId) };
  await firebaseStore.updateList(newList);
}

export async function cloneCard(list: IList, card: ICard): Promise<void> {
  const clonedCard = { ...card, title: `Copy of ${card.title}`, createdAt: new Date().toISOString().slice(0, 10) } as ICard;
  delete clonedCard.id;
  const { id: createdCardId } = await firebaseStore.createCard(clonedCard);
  const newList = { ...list, cards: [...list.cards, createdCardId] } as IList;
  await firebaseStore.updateList(newList);
}

export async function addNewCardToList(list: IList, card: ICard): Promise<void> {
  const { id: createdCardId } = await firebaseStore.createCard(card);
  const newList = { ...list, cards: [...list.cards, createdCardId] } as IList;
  await firebaseStore.updateList(newList);
}

export function updateCardTitle(card: ICard, title: string): ICard {
  const cardToSave = { ...card, title };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function updateCardDescription(card: ICard, description: string): ICard {
  const cardToSave = { ...card, description };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function updateCardDueDate(card: ICard, newDueDate: Dayjs | null): ICard {
  const dueDate = newDueDate ? newDueDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
  const cardToSave = { ...card, dueDate } as ICard;
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function updateCardLabels(card: ICard, label: ILabel, isChecked: boolean): ICard {
  const currentLabels = card.labels || [];
  const newLabels = isChecked ? [...currentLabels, label.id] : currentLabels.filter((labelId: string) => labelId !== label.id);
  const cardToSave = { ...card, labels: newLabels } as ICard;
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function addCommentToCard(card: ICard, comment: IComment): ICard {
  const comments = card.comments || [];
  const newComments = [comment, ...comments];
  const cardToSave = { ...card, comments: newComments };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function editComment(card: ICard, comment: IComment, newDescription: string): ICard {
  const comments = card.comments || [];
  const updatedComment = { ...comment, description: newDescription };
  const newComments = comments.map((item: IComment) => item.id === comment.id ? updatedComment : item);
  const cardToSave = { ...card, comments: newComments };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function deleteCommentFromCard(card: ICard, comment: IComment): ICard {
  const comments = card.comments || [];
  const newComments = comments.filter((item: IComment) => item.id !== comment.id);
  const cardToSave = { ...card, comments: newComments };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function createChecklist(card: ICard): ICard {
  const cardToSave = { ...card, checklistItems: [], checklistTitle: 'Checklist' };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function deleteChecklist(card: ICard): ICard {
  const cardToSave = { ...card, checklistItems: [], checklistTitle: '' };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function updateChecklistTitle(card: ICard, checklistTitle: string): ICard {
  const cardToSave = { ...card, checklistTitle };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function addNewChecklistItem(card: ICard, checklistItem: IChecklistItem): ICard {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = [...checklistItems, checklistItem];
  const cardToSave = { ...card, checklistItems: newChecklistItems };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function updateChecklistItem(card: ICard, checklistItem: IChecklistItem): ICard {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = checklistItems.map((item: IChecklistItem) => item.id === checklistItem.id ? checklistItem : item);
  const cardToSave = { ...card, checklistItems: newChecklistItems };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function deleteChecklistItem(card: ICard, checklistItem: IChecklistItem): ICard {
  const checklistItems = card.checklistItems || [];
  const newChecklistItems = checklistItems.filter((item: IChecklistItem) => item.id !== checklistItem.id);
  const cardToSave = { ...card, checklistItems: newChecklistItems };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function updateChecklistItemsOrder(card: ICard, checklistItems: IChecklistItem[]): ICard {
  const cardToSave = { ...card, checklistItems };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function updateCardCoverColor(card: ICard, coverColor: string): ICard {
  const cardToSave = { ...card, coverColor };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export function removeCardCoverColor(card: ICard): ICard {
  if (!card.coverColor) {
    return card;
  }
  const cardToSave = { ...card };
  delete cardToSave.coverColor;
  firebaseStore.deleteFieldFromCard(cardToSave, 'coverColor');
  return cardToSave;
}

export function removeLocationFromCard(card: ICard): ICard {
  if (!card.location) {
    return card;
  }
  const cardToSave = { ...card };
  delete cardToSave.location;
  firebaseStore.deleteFieldFromCard(cardToSave, 'location');
  return cardToSave;
}

export function updateCardLocation(card: ICard, location: ILocation): ICard {
  const cardToSave = { ...card, location };
  firebaseStore.updateCard(cardToSave);
  return cardToSave;
}

export async function deleteLabelFromUsingCards(listIds: string[], labelId: string) {
  const lists = await firebaseStore.getLists(listIds);
  const cards = await firebaseStore.getCards(lists.flatMap((list: IList) => list.cards));
  const cardsToUpdate = cards.filter((card: ICard) => card.labels?.includes(labelId));
  const updatedCards = cardsToUpdate.map((card: ICard) => {
    const newLabels = card.labels?.filter((label: string) => label !== labelId);
    return { ...card, labels: newLabels };
  });
  const updateCardPromises = updatedCards.map((card: ICard) => firebaseStore.updateCard(card));
  await Promise.all(updateCardPromises);
}

// *********************  STORAGE  *********************
export function uploadFile(user: IUser, file: File) {
  const [fileName, fileExtension] = file.name.split('.');
  const cleanedFileName = fileName.replace(new RegExp(' ', 'g'), '');
  const newFileName = `${cleanedFileName}-${user.id}-${Date.now()}.${fileExtension}`;
  return firebaseStore.uploadFile(file, newFileName);
}
