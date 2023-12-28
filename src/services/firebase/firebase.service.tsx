import { collection, documentId, doc, onSnapshot, query, where, addDoc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { IBoard, ICard, IList } from '@models';
import { db } from './firebase.init';

const COLLECTIONS = {
  LABEL: 'Label',
  BOARD: 'Board',
  LIST: 'List',
  CARD: 'Card',
};

export const getLabels = async () => {
  const labelsSnapshot = await getDocs(collection(db, COLLECTIONS.LABEL));
  const newData = labelsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return newData;
}

export const createBoard = async (board: IBoard) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.BOARD), {
      Board: board,
    });
    return docRef
  } catch (error) {
    console.error('Error adding item: ', error);
  }
};

export const getBoards = async () => {
  const boardsSnapshot = await getDocs(collection(db, COLLECTIONS.BOARD));
  const newData = boardsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return newData;
};

export const getBoard = async (id: string) => {
  const boardRef = doc(db, COLLECTIONS.BOARD, id);
  const boardSnap = await getDoc(boardRef);
  if (!boardSnap.exists()) {
    console.log('Board Does Not Exist');
  }
  return boardSnap.data() as IBoard;
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
  const cards = await getCards(list?.cards);

  return {
    ...listSnap.data(),
    id: listSnap.id,
    cards,
  };
};

export const getListListener = async (id: string, callback: any) => {
  const q = query(collection(db, COLLECTIONS.LIST), where(documentId(), '==', id));
  return onSnapshot(q, callback)
};

export const getLists = async (listIds: string[]) => {
  const q = query(
    collection(db, COLLECTIONS.LIST),
    where(documentId(), 'in', listIds),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IList[];
}

export const getCards = async (cardIds: string[]) => {
  const q = query(
    collection(db, COLLECTIONS.CARD),
    where(documentId(), 'in', cardIds),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ICard[];
}

export const getListCards = async (list: IList) => {
  const q = query(
    collection(db, COLLECTIONS.CARD),
    where(documentId(), 'in', list.cards),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ICard[];
}

export const updateBoard = async (board: IBoard) => {
  const boardsRef = collection(db, COLLECTIONS.BOARD);
  await setDoc(doc(boardsRef, 'SF'), board);
};
