import { useState, useEffect } from 'react';
import { BOARD_INITIAL_STATE } from '@constants';
import { IBoard } from '@models';
import { firebaseService } from '@services';

export const useGetBoard = (boardId: string = '') => {
  const [board, setBoard] = useState<IBoard>(BOARD_INITIAL_STATE);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{
    if (!boardId) {
      return;
    }
    const fetchBoard = async () => {
      try {
        setLoading(true);
        firebaseService.getBoardListener(boardId, (querySnapshot: any) => {
          const [board] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
          setBoard(board)
          setLoading(false);
        });
      } catch(err) {
        setLoading(false);
        setError(err as any)
      }
    }

    fetchBoard();
  },[boardId])

  return { board, loading, error };
}
