import './Home.scss';
import {BOARDS_INITIAL_STATE} from "@constants";
import {IBoard} from "@models";
import {useNavigate} from "react-router-dom";
import {earth} from "@assets";
import {EllipsisText} from "@components";

interface IHomeProps {

}

function Home({  }: IHomeProps) {
  const navigate = useNavigate();

  const renderTemplates = () => {
    return BOARDS_INITIAL_STATE.map((board: IBoard) => {
      return (
        <div key={board.id} className='templates-items-item' onClick={() => navigate(`/boards/${board.id}`)} style={{ backgroundImage: `url(${earth})` }}>
          <EllipsisText maxLines={1}>{board.title}</EllipsisText>
        </div>
      );
    });
  }

  const renderBoards = () => {
    return BOARDS_INITIAL_STATE.map((board: IBoard) => {
      return (
        <div key={board.id} className='templates-items-item' onClick={() => navigate(`/boards/${board.id}`)} style={{ backgroundImage: `url(${earth})` }}>
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
          <div className='templates'>
            <p className='header'>Most popular templates</p>
            <p className='description'>Get going faster with a template from the Trello community</p>
            <div className='templates-items'>
              {renderTemplates()}
            </div>
          </div>
          <div className='boards'>
            <p className='header'>Your Boards</p>
            <div className='boards-items'>
              {renderBoards()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
