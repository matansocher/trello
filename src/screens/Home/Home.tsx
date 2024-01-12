import { useNavigate } from 'react-router-dom';
import { earth } from '@assets';
import { EllipsisText } from '@components';
import { BOARD_INITIAL_STATE } from '@constants';
import { useBoard, useUser } from '@context';
import { useGetBoards, useGetBoardTemplates } from '@hooks';
import { IBoard, IBoardTemplate } from '@models';
import { firebaseService, utilsService } from '@services';
import './Home.scss';

function Home() {
  const { user } = useUser();
  const { updateBoardState } = useBoard();
  const { boards } = useGetBoards();
  const { boardTemplates } = useGetBoardTemplates();
  const navigate = useNavigate();

  const handleCreateBoardClick = async () => {
    const newBoard = await firebaseService.createBoard('New Board');
    navigate(`/boards/${newBoard.id}`);
  }

  const handleBoardTemplateClick = async (boardTemplate: IBoardTemplate) => {
    const createdBoardId = await firebaseService.createBoardFromTemplate(boardTemplate);
    // updateBoardState(BOARD_INITIAL_STATE);
    navigate(`/boards/${createdBoardId}`);
  }

  const handleBoardClick = (boardId: string) => {
    updateBoardState(BOARD_INITIAL_STATE);
    navigate(`/boards/${boardId}`);
  }

  const renderBoardTemplates = () => {
    return boardTemplates?.map((boardTemplate: IBoardTemplate) => {
      return (
        <div key={boardTemplate.id} className='boards-items-item' onClick={() => handleBoardTemplateClick(boardTemplate)} style={{ backgroundImage: `url(${earth})` }}>
          <EllipsisText maxLines={1}>{boardTemplate.title}</EllipsisText>
        </div>
      );
    });
  }

  const renderBoards = () => {
    return boards?.map((board: IBoard) => {
      return (
        <div
          key={board.id}
          className='boards-items-item'
          onClick={() => handleBoardClick(board.id as string)}
          style={{ backgroundImage: board?.background ? `url(${utilsService.getStorageLinkUrl(board?.background)})` : `url(${earth})` }}>
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
            <span>{user?.displayName?.charAt(0).toUpperCase()}</span>
          </div>
          <div className='home-wrapper__content__header__right'>
            <p>{user?.displayName}'s workspace</p>
          </div>
        </div>
        <div className='home-wrapper__content__boards'>
          <div className='boards'>
            <p className='header'>Most popular templates</p>
            <p className='description'>Get going faster with a template from the Trello community</p>
            <div className='boards-items'>
              {renderBoardTemplates()}
              {/*<div key='new' className='boards-items-item plus' onClick={handleCreateBoardClick}>+</div>*/}
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
