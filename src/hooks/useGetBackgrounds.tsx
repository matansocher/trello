import { useState, useEffect } from 'react';
import { firebaseService } from '@services';

export const useGetBackgrounds = () => {
  const [backgrounds, setBackgrounds] = useState<any[]>([]);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchBoards = async () => {
      try {
        setLoading(true)
        const backgroundsRes = await firebaseService.getBackgrounds();
        setBackgrounds(backgroundsRes);
      } finally {
        setLoading(false)
      }
    }

    fetchBoards();
  },[])

  return { backgrounds, loading };
}
