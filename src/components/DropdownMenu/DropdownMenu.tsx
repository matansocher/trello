import { MouseEvent, useState } from 'react';
import './DropdownMenu.scss'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { IDropdownItem } from '../../models/DropdownItem.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IDropdownMenuProps {
  menuItems: IDropdownItem[];
}

function DropdownMenu({ menuItems }: IDropdownMenuProps) {
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

  const handleOpenMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MoreHorizIcon onClick={handleOpenMenuClick} />
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
      </>
  )
}

export default DropdownMenu;
