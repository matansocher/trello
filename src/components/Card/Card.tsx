import { useState, MouseEvent } from 'react';
import './Card.scss'
import { ICard, IList, ITag } from '../../models';
import { useTags } from '../../context/tags-context';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { IDropdownItem } from '../../models/DropdownItem';
import { DropdownMenu, ModalWrapper } from '../';
import { CardDetails, FooterIcon, Tag } from './';
import { IFooterIcon } from '../../models/FooterIcon';

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


  const handleHover = (isHovered: boolean) => {
    setShowMoreIcon(isHovered);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Archive Card', icon: <DeleteIcon fontSize='small' />, onClick: () => archiveCard(card.id) }
    ];
  }

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as any;
    const isClickedOnMoreIcon = clickedElement.classList.contains('card-wrapper__more-icon') || clickedElement.closest('.card-wrapper__more-icon');
    const isClickedOutsideOfCard = !clickedElement.classList.contains('card-wrapper') && !clickedElement.closest('.card-wrapper');
    if (isClickedOnMoreIcon || isClickedOutsideOfCard) { // on more icon
      return;
    }
    // on card and not on more icon
    setModalOpen(true);
  }

  const renderDropdownMenu = () => {
    if (showMoreIcon) {
      return (
        <div className='card-wrapper__more-icon'>
          <DropdownMenu menuItems={getDropdownMenuItems()} />
        </div>
      );
    }
  }

  const renderTags = () => {
    return card.tags.map((tag: string) => {
      const relevantTag: ITag = tags.find((originalTag: ITag) => originalTag.id === tag) || tags[0];
      return <Tag key={tag} tag={relevantTag}/>;
    });
  }

  const renderFooterIcons = () => {
    const footerIcons: IFooterIcon[] = [
      { id: 'footerIcon__1', icon: <VisibilityOutlinedIcon/>, tooltipText: 'You are watching this card' },
      { id: 'footerIcon__2', icon: <FormatAlignLeftIcon/>, tooltipText: 'This card has a description' },
      { id: 'footerIcon__3', icon: <ChatBubbleOutlineIcon/>, tooltipText: 'Comments' },
      { id: 'footerIcon__4', icon: <CheckBoxOutlinedIcon/>, tooltipText: 'Checklist items' },
    ];
    return footerIcons.map((footerIcon) => {
      return <FooterIcon key={footerIcon.id} card={card} footerIcon={footerIcon} />;
    });
  }

  return (
    <>
      <div className='card-wrapper'
        onClick={handleCardClick}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {renderDropdownMenu()}
        <div className='card-wrapper__tags'>
          {renderTags()}
        </div>
        <div className='card-wrapper__content'>
          <p className='header'>{card.title}</p>
        </div>
        <div className='card-wrapper__footer'>
          {renderFooterIcons()}
        </div>
      </div>
      <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <CardDetails card={card} list={list} setModalOpen={setModalOpen} archiveCard={archiveCard} />
      </ModalWrapper>
    </>
  )
}

export default Card;
