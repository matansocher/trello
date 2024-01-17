import { useState, useEffect } from 'react';
import { firebaseService } from '@services';
import { COLOR_TILES } from '@constants';

export const useGetBackgrounds = () => {
  const [backgrounds, setBackgrounds] = useState<any>(null);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchBackgrounds = async () => {
      try {
        setLoading(true)
        const backgroundsRes = await firebaseService.getBackgrounds();
        setBackgrounds({ images: backgroundsRes, colors: COLOR_TILES });
      } finally {
        setLoading(false)
      }
    }

    fetchBackgrounds();
  },[])

  return { backgrounds, loading };
}
