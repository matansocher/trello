import {createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC} from 'react';
import { BOARD_INITIAL_STATE } from '@constants';
import { IBoard } from '@models';

export interface BoardContextType {
  boardState: IBoard;
  updateBoardState: Dispatch<SetStateAction<IBoard>>;
}

const BoardContext = createContext<BoardContextType | null>(null);

type BoardContextProviderProps = {
  children: ReactNode;
}

export const BoardContextProvider: FC<BoardContextProviderProps> = ({ children }) => {
  const [boardState, setBoardState] = useState<IBoard>(BOARD_INITIAL_STATE);

  const updateBoardState: BoardContextType['updateBoardState'] = (newState: SetStateAction<IBoard>) => {
    setBoardState(newState);
  };

  return (
    // Step 5: Provide the context value to children components
    <BoardContext.Provider value={{ boardState, updateBoardState }}>
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): BoardContextType {
  const board = useContext(BoardContext);
  if (!board) {
      throw new Error('useBoard must be used within a BoardContextProvider');
  }
  return board;
}
