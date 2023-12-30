import { IBoard, ICard, IList } from '@models';
import { dataService } from './index.tsx';

export function getDragEndBoard(board: IBoard, result: any): IBoard {
  const { source, destination, draggableId } = result;
  if (!destination) return board;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return board;

  // switch between lists
  if (draggableId.startsWith('listId')) {
    const list = board.lists.find((list: IList) => list.id === draggableId);
    if (!list) return board;

    board.lists.splice(source.index, 1);
    board.lists.splice(destination.index, 0, list);
    return board;
  }

  // move to the same list
  if (destination.droppableId === source.droppableId) {
    const list = board.lists.find((list: IList) => list.id === source.droppableId);
    if (!list) return board;

    const card = list.cards.find((card: ICard) => card.id === draggableId);
    if (!card) return board;

    list.cards.splice(source.index, 1);
    list.cards.splice(destination.index, 0, card);
    return board;
  }

  // move to another list
  const sourceList = board.lists.find((list: IList) => list.id === source.droppableId);
  const destinationList = board.lists.find((list: IList) => list.id === destination.droppableId);
  if (!sourceList || !destinationList) return board;

  const card = sourceList.cards.find((card: ICard) => card.id === draggableId);
  if (!card) return board;

  sourceList.cards.splice(source.index, 1);
  destinationList.cards.splice(destination.index, 0, card);
  return structuredClone(board);
}

export async function dragEndHandler(board: IBoard, result: any) {
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
    return handleListReorderDrag(board, source.index, destination.index);
  }
  // card drag
  if (isDragItemCard && isDroppedOnList) {
    // card drag to the same list
    if (destination.droppableId === source.droppableId) {
      return handleCardsReorderDrag(source.index, destination);
    }
    // card drag to another list
    if (destination.droppableId !== source.droppableId) {
      return handleCardToAnotherListDrag(source, destination);
    }
  }
  console.log('dragEndHandler - nothing handled');
}

async function handleListReorderDrag(board: IBoard, sourceIndex: number, destinationIndex: number): Promise<void> {
  const boardLists = [...board.lists];
  const list = boardLists.splice(sourceIndex, 1)[0];
  boardLists.splice(destinationIndex, 0, list);
  const newBoard = { ...board, lists: boardLists };
  await dataService.updateBoard(newBoard);
}

async function handleCardsReorderDrag(sourceIndex: number, destination: any): Promise<void> {
  const list = await dataService.getCleanedList(destination.droppableId.split('_')[1]);
  const listCards = [...list.cards];
  const card = listCards.splice(sourceIndex, 1)[0];
  listCards.splice(destination.index, 0, card);
  const newList = { ...list, cards: listCards };
  await dataService.updateList(newList);
}

async function handleCardToAnotherListDrag(source: any, destination: any): Promise<void> {
  const [sourceList, destinationList] = await Promise.all([
    dataService.getCleanedList(source.droppableId.split('_')[1]),
    dataService.getCleanedList(destination.droppableId.split('_')[1]),
  ]);

  const sourceListCards = [...sourceList.cards];
  const destinationListCards = [...destinationList.cards];

  const card = sourceListCards.splice(source.index, 1)[0];
  destinationListCards.splice(destination.index, 0, card);

  const newSourceList = { ...sourceList, cards: sourceListCards };
  const newDestinationList = { ...destinationList, cards: destinationListCards };

  await Promise.all([
    dataService.updateList(newSourceList),
    dataService.updateList(newDestinationList),
  ]);
}
