import { IBoard, IList } from '@models';

export function getPostDragBoard(board: IBoard, result: any): IBoard {
  const { source, destination, draggableId } = result;
  if (!destination) return board;
  if (destination.droppableId === source.droppableId && destination.index === source.index) return board;

  // switch lists
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

    const card = list.cards.find((card: any) => card.id === draggableId);
    if (!card) return board;

    list.cards.splice(source.index, 1);
    list.cards.splice(destination.index, 0, card);
    return board;
  }

  // move to another list
  const sourceList = board.lists.find((list: IList) => list.id === source.droppableId);
  const destinationList = board.lists.find((list: IList) => list.id === destination.droppableId);
  if (!sourceList || !destinationList) return board;

  const card = sourceList.cards.find((card: any) => card.id === draggableId);
  if (!card) return board;

  sourceList.cards.splice(source.index, 1);
  destinationList.cards.splice(destination.index, 0, card);
  return board;
}
