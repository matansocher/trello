import { useNavigate, Link } from 'react-router-dom';
import {
  ExpandMore as ExpandMoreIcon,
  InfoOutlined as InfoOutlinedIcon,
  NotificationsNoneOutlined as NotificationsNoneOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
} from '@mui/icons-material';
import { DropdownMenu, UserAvatar } from '@components';
import { useUser } from '@context';
import { IBoard, IDropdownItem } from '@models';
import { dataService } from '@services';
import './Header.scss';
import { useGetBoards } from '@hooks';

function Header() {
  const { userState: user } = useUser();
  const { boards } = useGetBoards();
  const navigate = useNavigate();

  const handleSomething = () => {
    console.log('createBoard');
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return boards.map((board: IBoard) => {
      return {
        label: board.title,
        onClick: () => navigate(`/boards/${board.id}`),
      }
    });
  }

  const handleCreateBoardClick = async () => {
    const newBoard = await dataService.createBoard('New Board');
    navigate(`/boards/${newBoard.id}`);
  }

  return (
    <header className='header-wrapper'>
      <div className='header-wrapper__content'>
        <div className='header-wrapper__content__left'>
          <Link to='/' className='logo'>LOGO</Link>
          <div className='menu'>
            <div className='menu__item'>
              <DropdownMenu menuHeader='boards' menuIcon={<ExpandMoreIcon />} menuItems={getDropdownMenuItems()} />
            </div>
            <div className='menu__item'>
              <button className='create' onClick={handleCreateBoardClick}>Create</button>
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
