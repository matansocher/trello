import { collection, documentId, doc, onSnapshot, query, where, addDoc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { IBoard, ICard, ILabel, IList, IUser } from '@models';
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

// *********************  USER  ********************* //
export const saveUser = async (user: IUser) => {
  const userRef = doc(db, COLLECTIONS.USER, user.id);
  return setDoc(userRef, user);
}

// *********************  LABEL  ********************* //
export const getDefaultLabels = async () => {
  const defaultLabelsSnapshot = await getDocs(collection(db, COLLECTIONS.DEFAULT_LABEL));
  return defaultLabelsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getBoardLabelsListener = async (labelIds: string[], callback: any) => {
  const q = query(collection(db, COLLECTIONS.LABEL), where(documentId(), 'in', labelIds));
  return onSnapshot(q, callback);
}

export const updateLabel = async (label: ILabel) => {
  const labelToSave = { ...label } as any;
  delete labelToSave.id;
  const labelRef = doc(db, COLLECTIONS.LABEL, label.id as string);
  await updateDoc(labelRef, { ...labelToSave });
}

export const createLabel = async (label: ILabel) => {
  const labelsRef = collection(db, COLLECTIONS.LABEL);
  const labelCreated = await addDoc(labelsRef, label);
  return labelCreated.id;
}

export const deleteLabel = async (labelId: string) => {
  const LabelToDeleteRef = doc(db, COLLECTIONS.LABEL, labelId);
  return deleteDoc(LabelToDeleteRef);
}

// *********************  BOARD_TEMPLATE  ********************* //
export const getBoardTemplates = async () => {
  const boardTemplatesSnapshot = await getDocs(collection(db, COLLECTIONS.BOARD_TEMPLATE));
  return boardTemplatesSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

// *********************  BOARD  ********************* //
export const createBoard = async (board: IBoard) => {
  const boardRef = collection(db, COLLECTIONS.BOARD);
  return addDoc(boardRef, board);
};

export const getBoards = async () => {
  const boardsSnapshot = await getDocs(collection(db, COLLECTIONS.BOARD));
  return boardsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getBoardListener = async (id: string, callback: any) => {
  const q = query(collection(db, COLLECTIONS.BOARD), where(documentId(), '==', id));
  return onSnapshot(q, callback)
};

export const updateBoard = async (board: IBoard) => {
  const boardToSave = { ...board } as any;
  delete boardToSave.id;
  const boardRef = doc(db, COLLECTIONS.BOARD, board.id as string);
  await updateDoc(boardRef, { ...boardToSave });
};

// *********************  LIST  ********************* //
export const getLists = async (listIds: string[]) => {
  const q = query(
    collection(db, COLLECTIONS.LIST),
    where(documentId(), 'in', listIds),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IList[];
}

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

export const createList = async (list: IList) => {
  const listsRef = collection(db, COLLECTIONS.LIST);
  return addDoc(listsRef, list);
};

export const updateList = async (list: IList) => {
  const listToSave = { ...list } as any;
  delete listToSave.id;
  const listRef = doc(db, COLLECTIONS.LIST, list.id as string);
  await updateDoc(listRef, { ...listToSave });
};

export const archiveList = async (listId: string) => {
  const listToDeleteRef = doc(db, COLLECTIONS.LIST, listId);
  return deleteDoc(listToDeleteRef);
};

// *********************  CARD  ********************* //
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

export const createCard = async (card: ICard) => {
  const cardsRef = collection(db, COLLECTIONS.CARD);
  return addDoc(cardsRef, card);
};

export const updateCard = async (card: ICard) => {
  const cardToSave = { ...card } as any;
  delete cardToSave.id;
  const cardRef = doc(db, COLLECTIONS.CARD, card.id as string);
  await updateDoc(cardRef, { ...cardToSave });
};

export const archiveCard = async (cardId: string) => {
  const cardToDeleteRef = doc(db, COLLECTIONS.CARD, cardId);
  await deleteDoc(cardToDeleteRef);
};
