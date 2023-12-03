import { useState } from 'react';
import './Card.scss'
import { Tag } from '../index';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ICard, ITag } from '../../models';
import { useTags } from '../../context/tags-context';

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
}

function Card({ card }: ICardProps) {
  const { tagsState: tags } = useTags();
  const [showMoreIcon, setShowMoreIcon] = useState(false);
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderTags = () => {
    return card.tags.map((tag: string) => {
      const relevantTag: ITag = tags.find((originalTag: ITag) => originalTag.id === tag) || tags[0]
      return <Tag key={tag} tag={relevantTag}/>;
    });
  }

  const handleHover = (isHovered: boolean) => {
    setShowMoreIcon(isHovered);
  }

  // const handleClick = () => {
  //   console.log('handleClick');
  //   console.log(card);
  // }

  return (
    <div className='card-wrapper'
         onClick={() => setOpen(!'$$$$$$$$$$$$$$$$$$$$')}
         onMouseEnter={() => handleHover(true)}
         onMouseLeave={() => handleHover(false)}
    >
      {showMoreIcon && <ExpandMoreIcon className='card-wrapper__more-icon' />}
      <div className='card-wrapper__tags'>
        {renderTags()}
      </div>
      <div className='card-wrapper__content'>
        <p className='header'>{card.title}</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
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
