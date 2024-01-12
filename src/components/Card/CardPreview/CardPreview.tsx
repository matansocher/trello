import { useState, MouseEvent, useEffect, useRef } from 'react';
import {
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  Schedule as ScheduleIcon,
  VerticalAlignTopOutlined as VerticalAlignTopOutlinedIcon,
  VerticalAlignBottomOutlined as VerticalAlignBottomOutlinedIcon,
} from '@mui/icons-material';
import { CardModal, DropdownMenu, EllipsisText, ModalWrapper, FooterIcon, Label } from '@components';
import { useCurrentCard, useLabels } from '@context';
import { useToggleHover } from '@hooks';
import { ICard, IList, ILabel, IDropdownItem, IFooterIcon, IModalStyles } from '@models';
import { firebaseService, utilsService } from '@services';
import './CardPreview.scss';

const modalWrapperModalStyles: IModalStyles = {
  width: 800,
  height: 700,
  // @ts-ignore
  overflow: 'scroll',
  padding: 0,
};

interface ICardPreviewProps {
  card: ICard;
  list: IList
  moveToTop: (card: ICard) => void;
  moveToBottom: (card: ICard) => void;
  cloneCard: (card: ICard) => void;
  archiveCard: (card: ICard) => void;
}

function CardPreview({ list, card, moveToTop, moveToBottom, cloneCard, archiveCard }: ICardPreviewProps) {
  const { labels } = useLabels();
  const { currentCard, updateCurrentCard } = useCurrentCard();
  const [isHovered, hoverEventHandlers] = useToggleHover(false);
  // const [unsubscribeFromCardListener, setUnsubscribeFromCardListener] = useState<Function>();
  const unsubscribeRef = useRef<() => void>();
  // modal
  const [cardModalOpen, setCardModalOpen] = useState(false);

  useEffect(() => {
    updateCurrentCard(card);
  }, []);

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Move to Top', icon: <VerticalAlignTopOutlinedIcon fontSize='small' />, onClick: () => moveToTop(currentCard) },
      { label: 'Move to Bottom', icon: <VerticalAlignBottomOutlinedIcon fontSize='small' />, onClick: () => moveToBottom(currentCard) },
      { label: 'Clone Card', icon: <ContentCopyOutlinedIcon fontSize='small' />, onClick: () => cloneCard(currentCard) },
      { label: 'Archive Card', icon: <DeleteIcon fontSize='small' />, onClick: () => archiveCard(currentCard) },
    ];
  }

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as any;
    const isClickedOnMoreIcon = clickedElement.classList.contains('card-preview__body__more-icon') || clickedElement.closest('.card-preview__body__more-icon');
    const isClickedOutsideOfCard = !clickedElement.classList.contains('card-preview') && !clickedElement.closest('.card-preview');
    if (isClickedOnMoreIcon || isClickedOutsideOfCard) { // clicked on more icon
      return;
    }
    // clicked on card and not on more icon
    // updateCurrentCard(card);
    startListeningToCardChanges();
    setCardModalOpen(true);
  }

  const closeModal = () => {
    setCardModalOpen(false);
    stopListeningToCardChanges();
  }

  const startListeningToCardChanges = () => {
    unsubscribeRef.current = firebaseService.getCardListener(card?.id, async (querySnapshot: any) => {
      const [card] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
      if (!card) return;
      updateCurrentCard(card);
    });
  }

  const stopListeningToCardChanges = () => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = undefined;
    }
  }

  const renderDropdownMenu = () => {
    if (isHovered) {
      return (
        <div className='card-preview__body__more-icon'>
          <DropdownMenu menuHeader='' menuIcon={<ExpandMoreIcon/>} menuItems={getDropdownMenuItems()} />
        </div>
      );
    }
  }

  const renderLabels = () => {
    return currentCard?.labels?.map((label: string) => {
      const relevantLabel: ILabel | null = labels.find((originalLabel: ILabel) => originalLabel.id === label) || null;
      if (!relevantLabel) return;
      return <Label key={label} label={relevantLabel} isBigLabel={false} />;
    });
  }

  const renderFooterIcons = () => {
    const footerIcons: IFooterIcon[] = [];
    if (currentCard?.description) {
      footerIcons.push({ id: 'footerIcon__2', icon: <FormatAlignLeftIcon/>, tooltipText: 'This card has a description' });
    }
    if (currentCard?.comments && currentCard.comments?.length > 0) {
      footerIcons.push({ id: 'footerIcon__3', icon: <ChatBubbleOutlineIcon/>, tooltipText: 'Comments' });
    }
    if (currentCard?.checklistItems && currentCard.checklistItems?.length > 0) {
      footerIcons.push({ id: 'footerIcon__4', icon: <CheckBoxOutlinedIcon/>, tooltipText: 'Checklist items' });
    }
    if (currentCard?.dueDate && currentCard.dueDate?.length > 0) {
      const numOfDaysDueAfterToday = utilsService.getNumOfDaysAfterToday(currentCard.dueDate)
      let component;
      if (numOfDaysDueAfterToday === 0) { // today
        component = <p className='side-label today'>Today</p>;
      }
      else if (numOfDaysDueAfterToday < 0) { // overdue
        const date = utilsService.getOverdueDate(currentCard.dueDate);
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
        {currentCard?.coverColor ? <div className='card-preview__cover' style={{ backgroundColor: currentCard.coverColor }} /> : null}
        <div className='card-preview__body' style={currentCard?.coverColor ? { paddingTop: 6 } : {}}>
          <span className='card-id'>{currentCard.id}</span>
          {renderDropdownMenu()}
          <div className='card-preview__body__labels'>
            {renderLabels()}
          </div>
          <div className='card-preview__body__content'>
            <EllipsisText maxLines={3}>{currentCard.title}</EllipsisText>
          </div>
          <div className='card-preview__body__footer'>
            {renderFooterIcons()}
          </div>
        </div>
      </div>
      <ModalWrapper modalOpen={cardModalOpen} closeModal={closeModal} modalStyle={modalWrapperModalStyles}>
        <CardModal list={list} closeModal={closeModal} archiveCard={archiveCard}/>
      </ModalWrapper>
    </>
  )
}

export default CardPreview;
