import { BOARDS_INITIAL_STATE } from '@constants';
import { IBoard, ICard, IList } from '@models';

export function getBoard(boardId: string | undefined): IBoard {
  return BOARDS_INITIAL_STATE.find(board => board.id === boardId)!;
}

export function archiveList(board: IBoard, listId: string): IBoard {
  const newLists: IList[] = board.lists.filter((list: IList) => list.id !== listId);
  return { ...board, lists: newLists };
}

export function sortList(board: IBoard, list: IList): IBoard {
  console.log(list);
  return board;
  // const sortedList = structuredClone(list).cards.sort((a: ICard, b: ICard) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // const relevantList = board.lists.find((list: IList) => list.id === list.id);
  // const newLists = board.lists.map((list: IList) => {
  //   if (list.id === list.id) {
  //     return { ...relevantList, cards: sortedList };
  //   }
  //   return list;
  // });
  // return { ...board, lists: newLists };
}

export function addListToBoard(board: IBoard, list: IList): IBoard {
  const newLists = [...board.lists, list];
  return { ...board, lists: newLists };
}

export function addCardToList(board: IBoard, list: IList, card: ICard): IBoard {
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

export function removeCardFromList(board: IBoard, list: IList, cardId: string): IBoard {
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

export function saveCard(board: IBoard, listId: string, newCard: ICard): IBoard {
  const newLists = board.lists.map((list: IList) => {
    if (list.id === listId) {
      const newCards = list.cards.map((card: ICard) => {
        if (card.id === card.id) {
          return newCard;
        }
        return card;
      });
      return { ...list, cards: newCards };
    }
    return list;
  });

  return { ...board, lists: newLists };
}
