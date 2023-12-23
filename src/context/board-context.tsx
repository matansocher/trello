import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC } from 'react';
import { IBoard } from '@models';

const INITIAL_BOARD_STATE: IBoard = { id: '', title: '', lists: [] }

interface BoardContextType {
  boardState: IBoard;
  updateBoardState: Dispatch<SetStateAction<IBoard>>;
}

const BoardContext = createContext<BoardContextType | null>(null);

type BoardContextProviderProps = {
  children: ReactNode;
}

export const BoardContextProvider: FC<BoardContextProviderProps> = ({ children }) => {
  const [boardState, setBoardState] = useState<IBoard>(INITIAL_BOARD_STATE); // Provide an initial non-null state
  // const [boardState, setBoardState] = useState<IBoard>(null);

  const updateBoardState: BoardContextType['updateBoardState'] = (newState: SetStateAction<IBoard>) => {
    setBoardState(newState);
  };

  return (
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
