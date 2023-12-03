import { useState } from 'react';
import './Card.scss'
import { DropdownMenu, Tag } from '../index';
import { ICard, ITag } from '../../models';
import { useTags } from '../../context/tags-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { IDropdownItem } from '../../models/DropdownItem.tsx';
import { CardDetails, ModalWrapper } from '../';

interface ICardProps {
  card: ICard;
  archiveCard: (cardId: string) => void;
}

function Card({ card, archiveCard }: ICardProps) {
  const { tagsState: tags } = useTags();
  // dropdown hover
  const [showMoreIcon, setShowMoreIcon] = useState(false);
  // modal
  const [modalOpen, setModalOpen] = useState(false);


  const renderTags = () => {
    return card.tags.map((tag: string) => {
      const relevantTag: ITag = tags.find((originalTag: ITag) => originalTag.id === tag) || tags[0]
      return <Tag key={tag} tag={relevantTag}/>;
    });
  }

  const handleHover = (isHovered: boolean) => {
    setShowMoreIcon(isHovered);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Archive Card', icon: <DeleteIcon fontSize='small' />, onClick: () => archiveCard(card.id) }
    ];
  }

  const handleCardClick = () => {
    console.log('handleCardClick');
    console.log(card);
    setModalOpen(true)
  }

  return (
    <>
      <div className='card-wrapper'
           onClick={handleCardClick}
           onMouseEnter={() => handleHover(true)}
           onMouseLeave={() => handleHover(false)}
      >
        {showMoreIcon && <div className='card-wrapper__more-icon'>
          <DropdownMenu menuItems={getDropdownMenuItems()} />
        </div>}
        <div className='card-wrapper__tags'>
          {renderTags()}
        </div>
        <div className='card-wrapper__content'>
          <p className='header'>{card.title}</p>
        </div>
      </div>
      <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <CardDetails card={card} setModalOpen={setModalOpen} />
      </ModalWrapper>
    </>
  )
}

export default Card;
