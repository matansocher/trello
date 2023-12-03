import { useEffect } from 'react';
import './Board.scss'
import { List, BoardHeader } from '../index';
import { IList } from '../../models';
import { useBoard } from '../../context/board-context';
import { BOARD_INITIAL_STATE } from '../../constants/initial-data.tsx';

function Board() {
  const { boardState: board, updateBoardState } = useBoard();

  useEffect(() => {
    updateBoardState(BOARD_INITIAL_STATE);
  }, []);

  const renderLists = () => {
    if (!board?.lists?.length) {
      return;
    }
    return board.lists.map((list: IList) => {
      return <List key={list.id} list={list} />;
    })
  }

  return (
      <div className='board-wrapper'>
        <BoardHeader />
        <div className='board-wrapper__columns'>
          {renderLists()}
        </div>
      </div>
  )
}

export default Board;
