import { useState, MouseEvent } from 'react';
import { ICard, IList, ITag } from '@models';
import { useTags } from '@context';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { DropdownMenu, ModalWrapper } from '@components';
import { IDropdownItem, IFooterIcon } from '@models';
import CardModal from '../CardModal/CardModal';
import FooterIcon from './FooterIcon/FooterIcon';
import Tag from './Tag/Tag';
import './CardPreview.scss'

interface ICardProps {
  card: ICard;
  list: IList
  archiveCard: (cardId: string) => void;
}

function CardPreview({ card, archiveCard, list }: ICardProps) {
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
      { label: 'Archive CardPreview', icon: <DeleteIcon fontSize='small' />, onClick: () => archiveCard(card.id) }
    ];
  }

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as any;
    const isClickedOnMoreIcon = clickedElement.classList.contains('card-preview__more-icon') || clickedElement.closest('.card-preview__more-icon');
    const isClickedOutsideOfCard = !clickedElement.classList.contains('card-preview') && !clickedElement.closest('.card-preview');
    if (isClickedOnMoreIcon || isClickedOutsideOfCard) { // on more icon
      return;
    }
    // on card and not on more icon
    setModalOpen(true);
  }

  const renderDropdownMenu = () => {
    if (showMoreIcon) {
      return (
        <div className='card-preview__more-icon'>
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
    const footerIcons: IFooterIcon[] = [];
    if (card?.isWatching) {
      footerIcons.push({ id: 'footerIcon__1', icon: <VisibilityOutlinedIcon/>, tooltipText: 'You are watching this card' });
    }
    if (card?.description) {
      footerIcons.push({ id: 'footerIcon__2', icon: <FormatAlignLeftIcon/>, tooltipText: 'This card has a description' });
    }
    if (card?.comments && card.comments?.length > 0) {
      footerIcons.push({ id: 'footerIcon__3', icon: <ChatBubbleOutlineIcon/>, tooltipText: 'Comments' });
    }
    if (card?.checklistItems && card.checklistItems?.length > 0) {
      footerIcons.push({ id: 'footerIcon__4', icon: <CheckBoxOutlinedIcon/>, tooltipText: 'Checklist items' });
    }
    if (footerIcons.length === 0) {
      return;
    }
    return footerIcons.map((footerIcon) => {
      return <FooterIcon key={footerIcon.id} card={card} footerIcon={footerIcon} />;
    });
  }

  return (
    <>
      <div className='card-preview'
        onClick={handleCardClick}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        {renderDropdownMenu()}
        <div className='card-preview__tags'>
          {renderTags()}
        </div>
        <div className='card-preview__content'>
          <p className='header'>{card.title}</p>
        </div>
        <div className='card-preview__footer'>
          {renderFooterIcons()}
        </div>
      </div>
      <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <CardModal card={card} list={list} setModalOpen={setModalOpen} archiveCard={archiveCard} />
      </ModalWrapper>
    </>
  )
}

export default CardPreview;
