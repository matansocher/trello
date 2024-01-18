import { useState, useEffect } from 'react';
import { firebaseService } from '@services';
import { COLOR_TILES } from '@constants';
import { IBackground } from '@models';

export const useGetBackgrounds = (boardId: string) => {
  const [backgrounds, setBackgrounds] = useState<any>(null);
  const [defaultBackgrounds, setDefaultBackgrounds] = useState<any>([]);
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    fetchBackgrounds();
  },[boardId])

  const fetchBackgrounds = async () => {
    try {
      setLoading(true);
      const [defaultBackgroundImages, boardBackgrounds] = await Promise.all([
        getDefaultBackgrounds(),
        getBackgrounds(boardId),
      ]);
      const images = [...boardBackgrounds, ...defaultBackgroundImages];
      // const backgroundsRes = await firebaseService.getBackgrounds(boardId);
      setBackgrounds({ images, colors: COLOR_TILES });
    } finally {
      setLoading(false)
    }
  }

  const getDefaultBackgrounds = async () => {
    if (defaultBackgrounds && defaultBackgrounds.length) {
      return defaultBackgrounds;
    }

    const defaultBackgroundsRes = await firebaseService.getDefaultBackgrounds();
    setDefaultBackgrounds(defaultBackgroundsRes);
    return defaultBackgroundsRes;
  }
  const getBackgrounds = async (boardId: string) => {
    if (!boardId) return [];

    const backgrounds = await firebaseService.getBackgrounds(boardId);
    const backgroundImages: any[] = [];

    backgrounds.forEach((background: IBackground | any) => {
      const bg = { fileName: background.background, type: 'image' };
      backgroundImages.push(bg);
    });

    return backgroundImages;
  }

  const refreshBackgrounds = async () => {
    return fetchBackgrounds();
  }

  return { backgrounds, refreshBackgrounds, loading };
}
