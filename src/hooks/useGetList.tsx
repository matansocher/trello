import { useState, useEffect } from 'react';
import { LIST_INITIAL_STATE } from '@constants';
import { ICard, IList } from '@models';
import { firebaseService } from '@services';

export const useGetList = (listId: string = '') => {
  const [list, setList] = useState<IList>(LIST_INITIAL_STATE);
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{
    if (!listId) {
      return;
    }
    const fetchList = async () => {
      try {
        setLoading(true);
        firebaseService.getListListener(listId, async (querySnapshot: any) => {
          const [list] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
          setList(list)
          const cards = list?.cards?.length ? await firebaseService.getCards(list.cards) : [];
          setCards(cards);
          setLoading(false);
        });
      } catch(err) {
        setLoading(false);
        setError(err as any)
      }
    }

    fetchList();
  },[listId])

  return { list, cards, loading, error };
}
