import { useNavigate } from 'react-router-dom';
import { Star as StarIcon } from '@mui/icons-material';
import { EllipsisText } from '@components';
import { BOARD_INITIAL_STATE } from '@constants';
import { useBoard, useUser } from '@context';
import { useGetBoards, useGetBoardTemplates, useGetStarredBoards } from '@hooks';
import { IBackground, IBoard, IBoardTemplate } from '@models';
import { firebaseService, utilsService } from '@services';
import './Home.scss';

function Home() {
  const { user } = useUser();
  const { updateBoardState } = useBoard();
  const { boards } = useGetBoards();
  const { boardTemplates } = useGetBoardTemplates();
  const navigate = useNavigate();
  const { starredBoards } = useGetStarredBoards(user.id);

  const handleCreateBoardClick = async () => {
    const newBoard = await firebaseService.createBoard('New Board');
    navigate(`/board/${newBoard.id}`);
  }

  const handleBoardTemplateClick = async (boardTemplate: IBoardTemplate) => {
    const createdBoardId = await firebaseService.createBoardFromTemplate(boardTemplate);
    // updateBoardState(BOARD_INITIAL_STATE);
    navigate(`/board/${createdBoardId}`);
  }

  const handleBoardClick = (boardId: string) => {
    updateBoardState(BOARD_INITIAL_STATE);
    navigate(`/board/${boardId}`);
  }

  const renderBoardTemplates = () => {
    return boardTemplates?.map((boardTemplate: IBoardTemplate) => {
      return (
        <div key={boardTemplate.id} className='boards-items-item' onClick={() => handleBoardTemplateClick(boardTemplate)} style={ utilsService.getBackgroundStyle(boardTemplate.background) }>
          <EllipsisText maxLines={1}>{boardTemplate.title}</EllipsisText>
          <div className='template-label'>
            <p>Template</p>
          </div>
        </div>
      );
    });
  }

  const renderStarredBoards = (starredBoards: string[]) => {
    const starredBoardsToRender = starredBoards
      .filter((boardId: string) => boards?.find((board: IBoard) => board.id === boardId))
      .map((boardId: string) => boards?.find((board: IBoard) => board.id === boardId)) as IBoard[];
    return starredBoardsToRender?.map((board: IBoard) => {
      return (
        <div key={board.id} className='boards-items-item' onClick={() => handleBoardClick(board.id as string)} style={utilsService.getBackgroundStyle(board.background as IBackground)}>
          <EllipsisText maxLines={1}>{board.title}</EllipsisText>
          <div className='starred-label'>
            <StarIcon />
          </div>
        </div>
      );
    });
  }

  const renderBoards = (boards: IBoard[]) => {
    return boards?.map((board: IBoard) => {
      const isStarredBoard = starredBoards?.includes(board.id as string);
      return (
        <div key={board.id} className='boards-items-item' onClick={() => handleBoardClick(board.id as string)} style={utilsService.getBackgroundStyle(board.background as IBackground)}>
          <EllipsisText maxLines={1}>{board.title}</EllipsisText>
          {isStarredBoard && (
            <div className='starred-label'>
              <StarIcon />
            </div>
          )}
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
            </div>
          </div>
          {starredBoards?.length ? <div className='starred'>
            <p className='header'>Starred Boards</p>
            <div className='boards-items'>
              {renderStarredBoards(starredBoards)}
            </div>
          </div> : null}
          <div className='boards'>
            <p className='header'>Your Boards</p>
            <div className='boards-items'>
              {renderBoards(boards)}
              <div key='new' className='boards-items-item plus' onClick={handleCreateBoardClick}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
