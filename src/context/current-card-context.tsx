import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC } from 'react';
import { ICard } from '@models';
import { CARD_INITIAL_STATE } from '@constants';

interface ICurrentCardContextType {
  currentCard: ICard;
  updateCurrentCard: Dispatch<SetStateAction<ICard>>;
}

const CurrentCardContext = createContext<ICurrentCardContextType | null>(null);

type CurrentCardContextProviderProps = {
  children: ReactNode;
}

export const CurrentCardContextProvider: FC<CurrentCardContextProviderProps> = ({ children }) => {
  const [currentCard, setCurrentCard] = useState<ICard>(CARD_INITIAL_STATE);

  const updateCurrentCard: ICurrentCardContextType['updateCurrentCard'] = (newState: SetStateAction<ICard>) => {
    setCurrentCard(newState);
  };

  return (
    <CurrentCardContext.Provider value={{ currentCard, updateCurrentCard }}>
      {children}
    </CurrentCardContext.Provider>
  );
};

export function useCurrentCard(): ICurrentCardContextType {
  const currentCard = useContext(CurrentCardContext);
  if (!currentCard) {
      throw new Error('useCurrentCard must be used within a CurrentCardContextProvider');
  }
  return currentCard;
}
