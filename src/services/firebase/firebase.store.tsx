import { collection, documentId, doc, onSnapshot, query, where, addDoc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { IArchivedCard, IBackground, IBoard, ICard, ILabel, IList, IUser } from '@models';
import { db, storage } from './firebase.init';

const COLLECTIONS = {
  BOARD_BACKGROUND: 'BoardBackground',
  DEFAULT_BACKGROUND: 'DefaultBackground',
  USER: 'User',
  LABEL: 'Label',
  DEFAULT_LABEL: 'DefaultLabel',
  BOARD_TEMPLATE: 'BoardTemplate',
  BOARD: 'Board',
  STARRED_BOARD: 'StarredBoard',
  LIST: 'List',
  CARD: 'Card',
  CARD_ARCHIVE: 'CardArchive',
};

// *********************  BACKGROUND  ********************* //
export const getDefaultBackgrounds = async () => {
  const backgroundsSnapshot = await getDocs(collection(db, COLLECTIONS.DEFAULT_BACKGROUND));
  return backgroundsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export const getBackgrounds = async (boardId: string) => {

  const q = query(
    collection(db, COLLECTIONS.BOARD_BACKGROUND),
    where('boardId', '==', boardId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IList[];
}

export const saveFileToBoardBackgrounds = async (boardBackground: IBackground) => {
  const boardBackgroundsRef = collection(db, COLLECTIONS.BOARD_BACKGROUND);
  return addDoc(boardBackgroundsRef, boardBackground);
}

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

// *********************  STARRED_BOARD  ********************* //
export const getStarredBoardsListener = async (id: string, callback: any) => {
  const q = query(collection(db, COLLECTIONS.STARRED_BOARD), where(documentId(), '==', id));
  return onSnapshot(q, callback);
};

export const updateStarredBoards = (userId: string, starredBoards: string[]) => {
  const starredBoardsRef = doc(db, COLLECTIONS.STARRED_BOARD, userId);
  return setDoc(starredBoardsRef, { userId, boardIds: starredBoards });
};

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

export const archiveBoard = async (boardId: string) => {
  const boardToDeleteRef = doc(db, COLLECTIONS.BOARD, boardId);
  return deleteDoc(boardToDeleteRef);
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

export const getListWithCards = async (id: string) => {
  const listRef = doc(db, COLLECTIONS.LIST, id);
  const listSnap = await getDoc(listRef);
  if (!listSnap.exists()) {
    console.log('List Does Not Exist');
  }

  const list = listSnap.data();
  const cards = list?.cards?.length ? await getCards(list?.cards) : [];

  return {
    ...listSnap.data(),
    id: listSnap.id,
    cards,
  };
};

export const getList = async (id: string) => {
  const listRef = doc(db, COLLECTIONS.LIST, id);
  const listSnap = await getDoc(listRef);
  if (!listSnap.exists()) {
    console.log('List Does Not Exist');
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

// *********************  ARCHIVED_CARD  ********************* //
export async function getArchivedCards(boardId: string) {
  const q = query(
    collection(db, COLLECTIONS.CARD_ARCHIVE),
    where('boardId', '==', boardId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IArchivedCard[];
}

export async function removeArchivedCards(archivedCard: IArchivedCard) {
  const archivedCardToDeleteRef = doc(db, COLLECTIONS.CARD_ARCHIVE, archivedCard.id as string);
  return deleteDoc(archivedCardToDeleteRef);
}

// *********************  CARD  ********************* //
export const getCard = async (id: string) => {
  const cardRef = doc(db, COLLECTIONS.CARD, id);
  const cardSnap = await getDoc(cardRef);
  if (!cardSnap.exists()) {
    console.log('Card Does Not Exist');
  }
  return {
    ...cardSnap.data(),
    id: cardSnap.id,
  };
}

export const getCards = async (cardIds: string[]) => {
  const q = query(
    collection(db, COLLECTIONS.CARD),
    where(documentId(), 'in', cardIds),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ICard[];
}

export const getCardListener = (id: string = '', callback: any) => {
  const q = query(collection(db, COLLECTIONS.CARD), where(documentId(), '==', id));
  return onSnapshot(q, callback);
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

export const deleteFieldFromCard = (card: ICard, field: string) => {
  const cardRef = doc(db, COLLECTIONS.CARD, card.id as string);
  const fieldsToDelete = {} as any;
  fieldsToDelete[field] = deleteField();
  return updateDoc(cardRef, fieldsToDelete);
};

export const archiveCard = async (boardId: string, card: ICard) => {
  const cardToDeleteRef = doc(db, COLLECTIONS.CARD, card.id as string);
  const cardToArchive = { ...card, boardId } as IArchivedCard;
  const archiveCardsRef = collection(db, COLLECTIONS.CARD_ARCHIVE);
  await Promise.all([
    addDoc(archiveCardsRef, cardToArchive),
    deleteDoc(cardToDeleteRef),
  ])
};

// *********************  STORAGE  ********************* //
export const uploadFile = async (file: File, fileName: string): Promise<string> => {
  const imageRef = ref(storage, `images/${fileName}`);
  const snapshot = await uploadBytes(imageRef, file);
  return snapshot.ref.name;
}
