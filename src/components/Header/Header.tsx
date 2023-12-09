import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { UserAvatar } from '@components';
import { useUser } from '@context';
import './Header.scss';

function Header() {

  const { userState: user } = useUser();

  const createBoard = () => {
    console.log('createBoard');
  }

  const handleSomething = () => {
    console.log('createBoard');
  }

  return (
    <header className='header-wrapper'>
      <div className='header-wrapper__content'>
        <div className='header-wrapper__content__left'>
          <div className='logo'>LOGO</div>
          <div className='menu'>
            <div className='menu__item'>
              <p>Recents</p>
              <ExpandMoreIcon />
            </div>
            <div className='menu__item'>
              <p>Starred</p>
              <ExpandMoreIcon />
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
