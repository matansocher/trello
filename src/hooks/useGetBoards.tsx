import { useState, useEffect } from 'react';
import { IBoard } from '@models';
import { firebaseService } from '@services';

export const useGetBoards = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  useEffect(()=>{
    const fetchBoards = async () => {
      try {
        setLoading(true)
        const boardsRes = await firebaseService.getBoards() as IBoard[];
        setBoards(boardsRes)
      } catch(err) {
        setError(err as any)
      } finally {
        setLoading(false)
      }
    }

    fetchBoards();
  },[])

  return { boards, loading, error };
}
