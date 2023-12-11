import { useState, MouseEvent } from 'react';
import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon, ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  Schedule as ScheduleIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material';
import { CardModal, DropdownMenu, EllipsisText, ModalWrapper, FooterIcon, Label } from '@components';
import { useLabels } from '@context';
import { ICard, IList, ILabel, IDropdownItem, IFooterIcon, IModalStyles } from '@models';
import './CardPreview.scss';

const modalWrapperModalStyles: IModalStyles = {
  width: 800,
  height: 700,
};

interface ICardProps {
  card: ICard;
  list: IList
  archiveCard: (cardId: string) => void;
}

function CardPreview({ card, archiveCard, list }: ICardProps) {
  const { labelsState: labels } = useLabels();
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
    const isClickedOnMoreIcon = clickedElement.classList.contains('card-preview__more-icon') || clickedElement.closest('.card-preview__more-icon');
    const isClickedOutsideOfCard = !clickedElement.classList.contains('card-preview') && !clickedElement.closest('.card-preview');
    if (isClickedOnMoreIcon || isClickedOutsideOfCard) { // clicked on more icon
      return;
    }
    // clicked on card and not on more icon
    setModalOpen(true);
  }

  const renderDropdownMenu = () => {
    if (showMoreIcon) {
      return (
        <div className='card-preview__more-icon'>
          <DropdownMenu menuHeader='' menuIcon={<ExpandMoreIcon/>} menuItems={getDropdownMenuItems()} />
        </div>
      );
    }
  }

  const renderLabels = () => {
    return card?.labels?.map((label: string) => {
      const relevantLabel: ILabel = labels.find((originalLabel: ILabel) => originalLabel.id === label) || labels[0];
      return <Label key={label} label={relevantLabel} isBigLabel={false} />;
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
    if (card?.dueDate && card.dueDate?.length > 0) {
      const numOfDaysDueAfterToday = new Date(card.dueDate).getDate() - new Date().getDate();
      let component = null;
      if (numOfDaysDueAfterToday === 0) { // today
        component = <p className='side-label today'>Today</p>;
      }
      else if (numOfDaysDueAfterToday > 0) { // overdue
        component = <p className='side-label overdue'>Overdue</p>;
      } else {
        component = <ScheduleIcon/>;
      }
      footerIcons.push({ id: 'footerIcon__5', icon: component, tooltipText: 'Due date' });
    }
    if (footerIcons.length === 0) {
      return;
    }

    return footerIcons.map((footerIcon: IFooterIcon) => {
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
        <div className='card-preview__labels'>
          {renderLabels()}
        </div>
        <div className='card-preview__content'>
          <EllipsisText maxLines={3}>{card.title}</EllipsisText>
        </div>
        <div className='card-preview__footer'>
          {renderFooterIcons()}
        </div>
      </div>
      <ModalWrapper modalOpen={modalOpen} setModalOpen={setModalOpen} modalStyle={modalWrapperModalStyles} >
        <CardModal card={card} list={list} setModalOpen={setModalOpen} archiveCard={archiveCard} />
      </ModalWrapper>
    </>
  )
}

export default CardPreview;
