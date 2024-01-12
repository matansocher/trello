import { useState, useEffect } from 'react';
import { CARD_INITIAL_STATE } from '@constants';
import { ICard } from '@models';
import { firebaseService } from '@services';

export const useGetCard = () => {
  const [cardId, setCardId] = useState<string>('');
  const [card, setCard] = useState<ICard>(CARD_INITIAL_STATE);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{
    if (!cardId) {
      return;
    }
    const fetchBoard = async () => {
      try {
        setLoading(true);
        firebaseService.getCardListener(cardId, (querySnapshot: any) => {
          const [card] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
          setCard(card)
          setLoading(false);
        });
      } catch(err) {
        setLoading(false);
        setError(err as any)
      }
    }

    fetchBoard();
  },[cardId])

  useEffect(() => {
    console.log(card);
  }, [card]);

  return { card, setCard, setCardId, loading, error };
}
