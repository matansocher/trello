import { useState, MouseEvent } from 'react';
import { Card } from '../index';
import AddNewCard from '../AddNewCard/AddNewCard';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import './List.scss'
import {IBoard, ICard, IList} from '../../models';
import {useBoard} from "../../context/board-context.tsx";
import {addCardToList} from "../../services/data.service.tsx";

interface IListProps {
  list: IList;
}

function List({ list }: IListProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const { cards } = list;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleArchiveListClick = () => {
    console.log('handleArchiveListClick');
    handleClose();
  }

  const addNewCard = (card: ICard) => {
    const newBoard = addCardToList(board, list, card) as IBoard;
    updateBoardState(newBoard);
  }

  const renderCards = () => {
    return cards.map((card: ICard) => {
      return <Card key={card.id} card={card} />;
    })
  }

  return (
    <div className='list-wrapper'>
      <div className='list-wrapper__content'>
        <div className='list-wrapper__content__header'>
          <p className='header'>{list.title}</p>
          <div onClick={handleOpenMenuClick}>
            <MoreHorizIcon />
          </div>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleArchiveListClick}>
              <ListItemIcon><DeleteIcon fontSize='small' /></ListItemIcon>
              <Typography variant='inherit'>Archive List</Typography>
            </MenuItem>
          </Menu>
        </div>
        <div className='list-wrapper__cards'>
          {renderCards()}
          <AddNewCard addNewCard={addNewCard} />
        </div>
      </div>
    </div>
  )
}

export default List;
