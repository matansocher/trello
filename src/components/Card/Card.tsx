import { useState, MouseEvent } from 'react';
import './Card.scss'
import { ICard, IList, ITag } from '../../models';
import { useTags } from '../../context/tags-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { IDropdownItem } from '../../models/DropdownItem';
import { DropdownMenu, ModalWrapper } from '../';
import { CardDetails, Tag } from './';

interface ICardProps {
  card: ICard;
  list: IList
  archiveCard: (cardId: string) => void;
}

function Card({ card, archiveCard, list }: ICardProps) {
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

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target;
    const isClickedOnMoreIcon = clickedElement.classList.contains('card-wrapper__more-icon') || clickedElement.closest('.card-wrapper__more-icon');
    const isClickedOutsideOfCard = !clickedElement.classList.contains('card-wrapper') && !clickedElement.closest('.card-wrapper');
    if (isClickedOnMoreIcon || isClickedOutsideOfCard) { // on more icon
      return;
    }
    // on card and not on more icon
    setModalOpen(true);
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
        <CardDetails card={card} list={list} setModalOpen={setModalOpen} archiveCard={archiveCard} />
      </ModalWrapper>
    </>
  )
}

export default Card;
