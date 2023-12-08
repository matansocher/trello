import { IBoard, ICard, IList } from '@models';

function archiveList(board: IBoard, listId: string): IBoard {
  const newLists: IList[] = board.lists.filter((list: IList) => list.id !== listId);
  return { ...board, lists: newLists };
}

function sortList(board: IBoard, list: IList): IBoard {
  console.log(list);
  return structuredClone(board);
}

function addCardToList(board: IBoard, list: IList, card: ICard): IBoard {
  // const boardId = board.id;
  const listId = list.id;
  const newList = structuredClone(board.lists.find((list: IList) => list.id === listId)) || {} as IList;
  newList.cards.push(card);

  const newLists = board.lists.map((list: IList) => {
    if (list.id === listId) {
      return newList;
    }
    return list;
  });

  return { ...board, lists: newLists };
}

function removeCardFromList(board: IBoard, list: IList, cardId: string): IBoard {
  // const boardId = board.id;
  const listId = list.id;
  const newList = structuredClone(list) || {} as IList;
  newList.cards = newList.cards.filter((card: ICard) => card.id !== cardId);
  const newLists = board.lists.map((list: IList) => {
    if (list.id === listId) {
      return newList;
    }
    return list;
  });

  return { ...board, lists: newLists };
}

export {
  archiveList,
  sortList,
  addCardToList,
  removeCardFromList,
}