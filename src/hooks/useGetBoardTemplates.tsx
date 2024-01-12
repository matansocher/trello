import { useState, useEffect } from 'react';
import { IBoardTemplate } from '@models';
import { firebaseStore } from '@services';

export const useGetBoardTemplates = () => {
  const [boardTemplates, setBoardTemplates] = useState<IBoardTemplate[]>([]);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  useEffect(()=>{
    const fetchBoardTemplates = async () => {
      try {
        setLoading(true)
        const boardTemplatesRes = await firebaseStore.getBoardTemplates() as IBoardTemplate[];
        setBoardTemplates(boardTemplatesRes)
      } catch(err) {
        setError(err as any)
      } finally {
        setLoading(false)
      }
    }

    fetchBoardTemplates();
  },[])

  return { boardTemplates, loading, error };
}
