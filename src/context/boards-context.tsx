import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, FC } from 'react';
import { IBoard } from '@models';

interface IBoardsContextType {
  boardsState: IBoard[];
  updateBoardsState: Dispatch<SetStateAction<IBoard[]>>;
}

const BoardsContext = createContext<IBoardsContextType | null>(null);

type BoardsContextProviderProps = {
  children: ReactNode;
}

export const BoardsContextProvider: FC<BoardsContextProviderProps> = ({ children }) => {
  const [boardsState, setBoardsState] = useState<IBoard[]>([]);

  const updateBoardsState: IBoardsContextType['updateBoardsState'] = (newState: SetStateAction<IBoard[]>) => {
    setBoardsState(newState);
  };

  return (
    <BoardsContext.Provider value={{ boardsState, updateBoardsState }}>
      {children}
    </BoardsContext.Provider>
  );
};

export function useBoards(): IBoardsContextType {
  const boards = useContext(BoardsContext);
  if (!boards) {
      throw new Error('useBoards must be used within a BoardContextProvider');
  }
  return boards;
}
