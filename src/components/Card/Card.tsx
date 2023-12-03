import {MouseEvent, useState} from 'react';
import './Card.scss'
import { Tag } from '../index';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ICard, ITag } from '../../models';
import { useTags } from '../../context/tags-context';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: 'red',
  p: 4,
};

interface ICardProps {
  card: ICard;
  archiveCard: (cardId: string) => void;
}

function Card({ card, archiveCard }: ICardProps) {
  const { tagsState: tags } = useTags();
  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  // dropdown
  const [showMoreIcon, setShowMoreIcon] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpenMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderTags = () => {
    return card.tags.map((tag: string) => {
      const relevantTag: ITag = tags.find((originalTag: ITag) => originalTag.id === tag) || tags[0]
      return <Tag key={tag} tag={relevantTag}/>;
    });
  }

  const handleHover = (isHovered: boolean) => {
    setShowMoreIcon(isHovered);
  }

  const handleArchiveCardClick = () => {
    archiveCard(card.id);
    handleCloseMenu();
  };

  // const handleClick = () => {
  //   console.log('handleClick');
  //   console.log(card);
  // }

  return (
    <div className='card-wrapper'
     onClick={() => setModalOpen(!'$$$$$$$$$$$$$$$$$$$$')}
     onMouseEnter={() => handleHover(true)}
     onMouseLeave={() => handleHover(false)}
    >
      {showMoreIcon && <>
        <ExpandMoreIcon className='card-wrapper__more-icon' onClick={handleOpenMenuClick} />
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleArchiveCardClick}>
            <ListItemIcon><DeleteIcon fontSize='small' /></ListItemIcon>
            <Typography variant='inherit'>Archive Card</Typography>
          </MenuItem>
        </Menu>
      </>}
      <div className='card-wrapper__tags'>
        {renderTags()}
      </div>
      <div className='card-wrapper__content'>
        <p className='header'>{card.title}</p>
      </div>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Card;
