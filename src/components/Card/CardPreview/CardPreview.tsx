import { useState, MouseEvent } from 'react';
import {
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { CardModal, DropdownMenu, EllipsisText, ModalWrapper, FooterIcon, Label } from '@components';
import { useCurrentCard } from '@context';
import { useToggleHover, useGetLabels } from '@hooks';
import { ICard, IList, ILabel, IDropdownItem, IFooterIcon, IModalStyles } from '@models';
import { utilsService } from '@services';
import './CardPreview.scss';

const modalWrapperModalStyles: IModalStyles = {
  width: 800,
  height: 700,
  // @ts-ignore
  overflow: 'scroll',
};

interface ICardPreviewProps {
  card: ICard;
  list: IList
  cloneCard: (card: ICard) => void;
  archiveCard: (cardId: string) => void;
}

function CardPreview({ card, cloneCard, archiveCard, list }: ICardPreviewProps) {
  const { labels } = useGetLabels();
  const { updateCurrentCard } = useCurrentCard();
  const [isHovered, hoverEventHandlers] = useToggleHover(false);
  // modal
  const [modalOpen, setModalOpen] = useState(false);

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Clone Card', icon: <ContentCopyOutlinedIcon fontSize='small' />, onClick: () => cloneCard(card) },
      { label: 'Archive Card', icon: <DeleteIcon fontSize='small' />, onClick: () => archiveCard(card.id || '') },
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
    // setCard(card);
    updateCurrentCard(card); // set the current card state so child card modal can use it
    setModalOpen(true);
  }

  const renderDropdownMenu = () => {
    if (isHovered) {
      return (
        <div className='card-preview__more-icon'>
          <DropdownMenu menuHeader='' menuIcon={<ExpandMoreIcon/>} menuItems={getDropdownMenuItems()} />
        </div>
      );
    }
  }

  const renderLabels = () => {
    return card?.labels?.map((label: string) => {
      const relevantLabel: ILabel | null = labels.find((originalLabel: ILabel) => originalLabel.id === label) || null;
      if (!relevantLabel) return;
      return <Label key={label} label={relevantLabel} isBigLabel={false} />;
    });
  }

  const renderFooterIcons = () => {
    const footerIcons: IFooterIcon[] = [];
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
      const numOfDaysDueAfterToday = utilsService.getNumOfDaysAfterToday(card.dueDate)
      let component = null;
      if (numOfDaysDueAfterToday === 0) { // today
        component = <p className='side-label today'>Today</p>;
      }
      else if (numOfDaysDueAfterToday < 0) { // overdue
        const date = utilsService.getOverdueDate(card.dueDate);
        component = (<p className='side-label overdue'><AccessTimeOutlinedIcon /> {date}</p>)
      } else {
        component = <ScheduleIcon/>;
      }
      footerIcons.push({ id: 'footerIcon__5', icon: component, tooltipText: 'Due date' });
    }
    if (footerIcons.length === 0) {
      return;
    }

    return footerIcons.map((footerIcon: IFooterIcon) => {
      return <FooterIcon key={footerIcon.id} footerIcon={footerIcon} />;
    });
  }

  return (
    <>
      <div className='card-preview' onClick={handleCardClick} {...(hoverEventHandlers as Object)}>
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
        <CardModal list={list} setModalOpen={setModalOpen} archiveCard={archiveCard} />
      </ModalWrapper>
    </>
  )
}

export default CardPreview;
