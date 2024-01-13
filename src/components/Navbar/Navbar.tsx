import { useNavigate, Link } from 'react-router-dom';
import {
  ExpandMore as ExpandMoreIcon,
  InfoOutlined as InfoOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  NotificationsNoneOutlined as NotificationsNoneOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  CalendarMonth as CalendarMonthIcon,
} from '@mui/icons-material';
import { trelloLogo } from '@assets';
import { DropdownMenu, UserAvatar } from '@components';
import { useUser } from '@context';
import { useGetBoards } from '@hooks';
import { IBoard, IDropdownItem } from '@models';
import { firebaseService } from '@services';
import './Navbar.scss';

function Navbar() {
  const { user, logOut } = useUser();
  const { boards } = useGetBoards();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    logOut();
  }

  const handleNotificationsClick = () => {
    console.log('handleNotificationsClick');
  }

  const handleInfoClick = () => {
    console.log('handleInfoClick');
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return boards.map((board: IBoard) => {
      return {
        label: board.title,
        icon: <CalendarMonthIcon />,
        onClick: () => navigate(`/board/${board.id}`),
      }
    });
  }

  const handleCreateBoardClick = async () => {
    const newBoard = await firebaseService.createBoard('New Board');
    navigate(`/board/${newBoard.id}`);
  }

  const getUserDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Logout', icon: <LogoutOutlinedIcon fontSize='small' />, onClick: () => handleLogoutClick() },
    ];
  }

  if (!user) return;

  return (
    <header className='navbar-wrapper'>
      <div className='navbar-wrapper__content'>
        <div className='navbar-wrapper__content__left'>
          <Link to='/' className='logo'>
            <img src={trelloLogo} alt='logo' />
          </Link>
          <div className='menu'>
            <div className='menu__item'>
              <DropdownMenu menuHeader='boards' menuIcon={<ExpandMoreIcon/>} menuItems={getDropdownMenuItems()}/>
            </div>
            <div className='menu__item'>
              <button className='create' onClick={handleCreateBoardClick}>Create</button>
            </div>
          </div>
        </div>
        <div className='navbar-wrapper__content__right'>
          <div className='search'>
            <SearchOutlinedIcon/>
            <input placeholder='Search'/>
          </div>
          <div className='notifications' onClick={handleNotificationsClick}>
            <NotificationsNoneOutlinedIcon/>
          </div>
          <div className='info' onClick={handleInfoClick}>
            <InfoOutlinedIcon/>
          </div>
          <div className='user'>
            <DropdownMenu menuHeader='' menuIcon={<UserAvatar user={user} />} menuItems={getUserDropdownMenuItems()} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
