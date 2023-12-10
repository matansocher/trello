import { useNavigate } from 'react-router-dom';
import {
  ExpandMore as ExpandMoreIcon,
  InfoOutlined as InfoOutlinedIcon,
  NotificationsNoneOutlined as NotificationsNoneOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@mui/icons-material';
import { DropdownMenu, UserAvatar } from '@components';
import { BOARDS_INITIAL_STATE } from '@constants';
import { useUser } from '@context';
import { IBoard, IDropdownItem } from '@models';
import './Header.scss';

function Header() {
  const { userState: user } = useUser();
  const navigate = useNavigate();

  const createBoard = () => {
    console.log('createBoard');
  }

  const handleSomething = () => {
    console.log('createBoard');
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return BOARDS_INITIAL_STATE.map((board: IBoard) => {
      return {
        label: board.title,
        onClick: () => navigate(`/boards/${board.id}`),
      }
    });
  }

  return (
    <header className='header-wrapper'>
      <div className='header-wrapper__content'>
        <div className='header-wrapper__content__left'>
          <div className='logo'>LOGO</div>
          <div className='menu'>
            <div className='menu__item'>
              <DropdownMenu menuHeader='boards' menuIcon={<ExpandMoreIcon />} menuItems={getDropdownMenuItems()} />
            </div>
            <div className='menu__item'>
              <button className='create' onClick={createBoard}>Create</button>
            </div>
          </div>
        </div>
        <div className='header-wrapper__content__right'>
          <div className='search'>
            <SearchOutlinedIcon />
            <input placeholder='Search'/>
          </div>
          <div className='notifications'>
            <NotificationsNoneOutlinedIcon />
          </div>
          <div className='info'>
            <InfoOutlinedIcon />
          </div>
          <div className='user'>
            <UserAvatar user={user} onClick={handleSomething} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
