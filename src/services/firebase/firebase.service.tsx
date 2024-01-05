import { collection, documentId, doc, onSnapshot, query, where, addDoc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { IBoard, ICard, IList, IUser } from '@models';
import { db } from './firebase.init';

const COLLECTIONS = {
  USER: 'User',
  LABEL: 'Label',
  DEFAULT_LABEL: 'DefaultLabel',
  BOARD_TEMPLATE: 'BoardTemplate',
  BOARD: 'Board',
  LIST: 'List',
  CARD: 'Card',
};

export const saveUser = async (user: IUser) => {
  const userRef = doc(db, COLLECTIONS.USER, user.id);
  return setDoc(userRef, user);
}

export const getDefaultLabels = async () => {
  const defaultLabelsSnapshot = await getDocs(collection(db, COLLECTIONS.DEFAULT_LABEL));
  return defaultLabelsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getBoardLabelsListener = async (labelIds: string[], callback: any) => {
  const q = query(collection(db, COLLECTIONS.LABEL), where(documentId(), 'in', labelIds));
  return onSnapshot(q, callback);
}

export const getBoardTemplates = async () => {
  const boardTemplatesSnapshot = await getDocs(collection(db, COLLECTIONS.BOARD_TEMPLATE));
  return boardTemplatesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const createBoard = async (board: IBoard) => {
  const boardRef = collection(db, COLLECTIONS.BOARD);
  const newBoardRef = await addDoc(boardRef, board);
  return newBoardRef
};

export const getBoards = async () => {
  const boardsSnapshot = await getDocs(collection(db, COLLECTIONS.BOARD));
  const newData = boardsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return newData;
};

export const getBoardListener = async (id: string, callback: any) => {
  const q = query(collection(db, COLLECTIONS.BOARD), where(documentId(), '==', id));
  return onSnapshot(q, callback)
};

export const getList = async (id: string) => {
  const listRef = doc(db, COLLECTIONS.LIST, id);
  const listSnap = await getDoc(listRef);
  if (!listSnap.exists()) {
    console.log('Board Does Not Exist');
  }

  const list = listSnap.data();
  const cards = list?.cards?.length ? await getCards(list?.cards) : [];

  return {
    ...listSnap.data(),
    id: listSnap.id,
    cards,
  };
};

export const getCleanedList = async (id: string) => {
  const listRef = doc(db, COLLECTIONS.LIST, id);
  const listSnap = await getDoc(listRef);
  if (!listSnap.exists()) {
    console.log('Board Does Not Exist');
  }
  return {
    ...listSnap.data(),
    id: listSnap.id,
  };
}

export const getListListener = async (id: string, callback: any) => {
  const q = query(collection(db, COLLECTIONS.LIST), where(documentId(), '==', id));
  return onSnapshot(q, callback);
};

export const getCards = async (cardIds: string[]) => {
  const q = query(
    collection(db, COLLECTIONS.CARD),
    where(documentId(), 'in', cardIds),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ICard[];
}

export const getCardListener = async (id: string, callback: any) => {
  const q = query(collection(db, COLLECTIONS.CARD), where(documentId(), '==', id));
  return onSnapshot(q, callback)
}

export const updateBoard = async (board: IBoard) => {
  const boardToSave = { ...board } as any;
  delete boardToSave.id;
  const boardRef = doc(db, COLLECTIONS.BOARD, board.id as string);
  await updateDoc(boardRef, { ...boardToSave });
};

export const createCard = async (card: ICard) => {
  const cardsRef = collection(db, COLLECTIONS.CARD);
  const newCardRef = await addDoc(cardsRef, card);
  return newCardRef
};

export const createList = async (list: IList) => {
  const listsRef = collection(db, COLLECTIONS.LIST);
  const newListRef = await addDoc(listsRef, list);
  return newListRef
};

export const updateCard = async (card: ICard) => {
  const cardToSave = { ...card } as any;
  delete cardToSave.id;
  const cardRef = doc(db, COLLECTIONS.CARD, card.id as string);
  await updateDoc(cardRef, { ...cardToSave });
};

export const updateList = async (list: IList) => {
  const listToSave = { ...list } as any;
  delete listToSave.id;
  const listRef = doc(db, COLLECTIONS.LIST, list.id as string);
  await updateDoc(listRef, { ...listToSave });
};

export const archiveCard = async (cardId: string) => {
  const cardToDeleteRef = doc(db, COLLECTIONS.CARD, cardId);
  await deleteDoc(cardToDeleteRef);
};

export const archiveList = async (listId: string) => {
  const listToDeleteRef = doc(db, COLLECTIONS.LIST, listId);
  await deleteDoc(listToDeleteRef);
};
