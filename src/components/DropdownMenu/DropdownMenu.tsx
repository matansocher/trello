import { JSX, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { IDropdownItem } from '@models';
import './DropdownMenu.scss';

interface IDropdownMenuProps {
  menuHeader: string;
  menuIcon: JSX.Element;
  menuItems: IDropdownItem[];
}

function DropdownMenu({ menuHeader, menuIcon, menuItems }: IDropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const renderItems = () => {
    return menuItems.map((item: IDropdownItem) => {
      return (
        <MenuItem key={item.label} onClick={() => handleItemClick(item)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <Typography variant='inherit'>{item.label}</Typography>
        </MenuItem>
      )
    });
  }

  const handleItemClick = (item: IDropdownItem) => {
    item.onClick();
    handleCloseMenu();
  }

  const handleOpenMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className='dropdown-menu' onClick={handleOpenMenuClick}>
      <p>{menuHeader}</p>
      <div className='dropdown-menu__icon'>
        {menuIcon ? menuIcon : <MoreHorizIcon/>}
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {renderItems()}
      </Menu>
    </div>
  )
}

export default DropdownMenu;
