import { useNavigate } from 'react-router-dom';
import { earth } from '@assets';
import { EllipsisText } from '@components';
import { BOARD_INITIAL_STATE } from '@constants';
import { useBoard } from '@context';
import { useGetBoards } from '@hooks';
import { IBoard } from '@models';
import { dataService } from '@services';
import './Home.scss';

function Home() {
  const { updateBoardState } = useBoard();
  const { boards } = useGetBoards();
  const navigate = useNavigate();

  const handleCreateBoardClick = async () => {
    const newBoard = await dataService.createBoard('New Board');
    navigate(`/boards/${newBoard.id}`);
  }

  const handleBoardClick = (boardId: string) => {
    updateBoardState(BOARD_INITIAL_STATE);
    navigate(`/boards/${boardId}`);
  }

  const renderBoards = () => {
    return boards?.map((board: IBoard) => {
      return (
        <div key={board.id} className='boards-items-item' onClick={() => handleBoardClick(board.id || '')} style={{ backgroundImage: `url(${earth})` }}>
          <EllipsisText maxLines={1}>{board.title}</EllipsisText>
        </div>
      );
    });
  }

  return (
    <div className='home-wrapper'>
      <div className='home-wrapper__content'>
        <div className='home-wrapper__content__header'>
          <div className='home-wrapper__content__header__left'>
            <span>M</span>
          </div>
          <div className='home-wrapper__content__header__right'>
            <p>Matan Socher's workspace</p>
          </div>
        </div>
        <div className='home-wrapper__content__boards'>
          <div className='boards'>
            <p className='header'>Most popular templates</p>
            <p className='description'>Get going faster with a template from the Trello community</p>
            <div className='boards-items'>
              {renderBoards()}
              <div key='new' className='boards-items-item plus' onClick={handleCreateBoardClick}>+</div>
            </div>
          </div>
          <div className='boards'>
            <p className='header'>Your Boards</p>
            <div className='boards-items'>
              {renderBoards()}
              <div key='new' className='boards-items-item plus' onClick={handleCreateBoardClick}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
