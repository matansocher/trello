import { IBoard, ICard } from '@models';
import { firebaseService } from './index';

export async function boardDragEndHandler(board: IBoard, result: any) {
  const { draggableId, source, destination } = result;
  if (!destination) return;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  const isDragItemCard = draggableId.startsWith('card');
  const isDragItemList = draggableId.startsWith('list');
  const isDraggedFromBoard = source.droppableId === 'board';
  const isDroppedOnBoard = destination.droppableId === 'board';
  const isDroppedOnList = destination.droppableId.startsWith('list');

  // list drag
  if (isDragItemList && isDraggedFromBoard && isDroppedOnBoard) {
    return handleListReorder(board, source.index, destination.index);
  }
  // card drag
  if (isDragItemCard && isDroppedOnList) {
    // card drag to the same list
    if (destination.droppableId === source.droppableId) {
      return handleCardsReorder(source.index, destination);
    }
    // card drag to another list
    if (destination.droppableId !== source.droppableId) {
      return handleCardToAnotherList(source, destination);
    }
  }
  console.log('boardDragEndHandler - nothing handled');
}

async function handleListReorder(board: IBoard, sourceIndex: number, destinationIndex: number): Promise<void> {
  const boardLists = [...board.lists];
  const list = boardLists.splice(sourceIndex, 1)[0];
  boardLists.splice(destinationIndex, 0, list);
  const newBoard = { ...board, lists: boardLists };
  firebaseService.updateBoard(newBoard);
}

async function handleCardsReorder(sourceIndex: number, destination: any): Promise<void> {
  const list = await firebaseService.getList(destination.droppableId.split('_')[1]);
  const listCards = [...list.cards];
  const card = listCards.splice(sourceIndex, 1)[0];
  listCards.splice(destination.index, 0, card);
  const newList = { ...list, cards: listCards };
  firebaseService.updateList(newList);
}

async function handleCardToAnotherList(source: any, destination: any) {
  const [sourceList, destinationList] = await Promise.all([
    firebaseService.getList(source.droppableId.split('_')[1]),
    firebaseService.getList(destination.droppableId.split('_')[1]),
  ]);

  const sourceListCards = [...sourceList.cards];
  const destinationListCards = [...destinationList.cards];

  const card = sourceListCards.splice(source.index, 1)[0];
  destinationListCards.splice(destination.index, 0, card);

  const newSourceList = { ...sourceList, cards: sourceListCards };
  const newDestinationList = { ...destinationList, cards: destinationListCards };

  return Promise.all([
    firebaseService.updateList(newSourceList),
    firebaseService.updateList(newDestinationList),
  ]);
}

export async function checklistDragEndHandler(card: ICard, result: any) {
  const { source, destination } = result;
  if (!destination) return;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return;

  const checklistItems = card.checklistItems || [];
  const checklistItem = checklistItems.splice(source.index, 1)[0];
  checklistItems.splice(destination.index, 0, checklistItem);

  return firebaseService.updateChecklistItemsOrder(card, checklistItems)
}
