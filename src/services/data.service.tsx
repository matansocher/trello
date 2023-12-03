import { IBoard, ICard, IList } from "../models";

function addCardToList(board: IBoard, list: IList, card: ICard) {
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

  const newBoard = { ...board, lists: newLists };
  return newBoard;
}

export {
  addCardToList,
}