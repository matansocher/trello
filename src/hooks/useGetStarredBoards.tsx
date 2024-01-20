import { useState, useEffect } from 'react';
import { firebaseService } from '@services';

export const useGetStarredBoards = (userId: string = '') => {
  const [starredBoards, setStarredBoards] = useState<string[]>([]);

  useEffect(()=>{
    if (!userId) {
      return;
    }
    const fetchStarredBoards = async () => {
      try {
        firebaseService.getStarredBoardsListener(userId, async (querySnapshot: any) => {
          const [starredBoards] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
          setStarredBoards(starredBoards.boardIds)
        });
      } catch(err) {
        console.log('useGetStarredBoards fetchStarredBoards error: ', err);
      }
    }

    fetchStarredBoards();
  },[userId])

  return { starredBoards };
}
