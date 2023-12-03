import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Header.scss'

function Header() {
  return (
    <header className='header-wrapper'>
      <div className='header-wrapper__content'>
        <div className='header-wrapper__content__left'>
          <div className='logo'>LOGO</div>
          <div className='menu'>
            <div className='menu__item'>
              <p>Workspaces</p>
              <ExpandMoreIcon />
            </div>
            <div className='menu__item'>
              <p>Workspaces</p>
              <ExpandMoreIcon />
            </div>
            <div className='menu__item'>
              <p>Workspaces</p>
              <ExpandMoreIcon />
            </div>
          </div>
        </div>
        <div className='header-wrapper__content__right'>
          <div className='logo'></div>
        </div>
      </div>
    </header>
  )
}

export default Header;
