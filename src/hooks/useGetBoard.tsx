import { useState, useEffect } from 'react';
import { BOARD_INITIAL_STATE } from '@constants';
import { IBoard, ILabel } from '@models';
import { firebaseService } from '@services';

export const useGetBoard = (boardId: string = '') => {
  const [board, setBoard] = useState<IBoard>(BOARD_INITIAL_STATE);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    if (!boardId) {
      return;
    }
    const fetchBoard = async () => {
      try {
        setLoading(true);
        firebaseService.getBoardListener(boardId, async (querySnapshot: any) => {
          const [board] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
          if (!board) {
            return;
          }
          setBoard(board);
          if (!board.labels?.length) {
            await addDefaultLabels(board);
          }
          setLoading(false);
        });
      } catch(err) {
        setLoading(false);
      }
    }

    fetchBoard();
  },[boardId])

  const addDefaultLabels = async (board: IBoard) => {
    const defaultLabelsRes = await firebaseService.getDefaultLabels() as ILabel[];
    const labelIds = defaultLabelsRes.map((label: any) => label.labelId);
    const newBoard = { ...board, labels: labelIds };
    setBoard(newBoard);
  }

  return { board, loading };
}
