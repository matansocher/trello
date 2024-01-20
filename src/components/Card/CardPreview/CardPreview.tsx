import { useState, MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  ContentCopyOutlined as ContentCopyOutlinedIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  Schedule as ScheduleIcon,
  VerticalAlignBottomOutlined as VerticalAlignBottomOutlinedIcon,
  VerticalAlignTopOutlined as VerticalAlignTopOutlinedIcon,
} from '@mui/icons-material';
import { CardModal, DropdownMenu, EllipsisText, ModalWrapper, FooterIcon, Label } from '@components';
import { useCurrentCard, useLabels } from '@context';
import { CARD_INITIAL_STATE } from '@constants';
import { useToggleHover } from '@hooks';
import { ICard, IList, ILabel, IDropdownItem, IFooterIcon, IModalStyles } from '@models';
import { utilsService } from '@services';
import './CardPreview.scss';

const modalWrapperModalStyles: IModalStyles = { width: 900, height: 700, overflow: 'scroll', padding: 0 };

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
  const { boardId = '', cardId: cardIdFromUrl = '' } = useParams<{ boardId: string, cardId: string }>();
  const navigate = useNavigate();
  const { updateCurrentCard } = useCurrentCard();
  const [thisCard, setThisCard] = useState<ICard>(card);
  const [isHovered, hoverEventHandlers] = useToggleHover(false);
  // modal
  const [cardModalOpen, setCardModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (cardIdFromUrl === card.id) {
      updateCurrentCard(card);
      setCardModalOpen(true);
    }
  }, []);

  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as any;
    const isClickedOnMoreIcon = clickedElement.classList.contains('card-preview__body__more-icon') || clickedElement.closest('.card-preview__body__more-icon');
    const isClickedOutsideOfCard = !clickedElement.classList.contains('card-preview') && !clickedElement.closest('.card-preview');
    if (isClickedOnMoreIcon || isClickedOutsideOfCard) { // clicked on more icon
      return;
    }
    // clicked on card and not on more icon
    updateCurrentCard(thisCard);
    setCardModalOpen(true);
    navigate(`/board/${boardId}/${thisCard.id}`); // update url to have the cardId as a param
  }

  const closeModal = (newCard?: ICard) => {
    setCardModalOpen(false);
    setThisCard(newCard || CARD_INITIAL_STATE);
    updateCurrentCard(CARD_INITIAL_STATE);
    navigate(`/board/${boardId}`); // update url not to have the cardId as a param
  }

  const renderDropdownMenu = () => {
    if (!isHovered) return;

    const dropdownMenuItems: IDropdownItem[] = [
      { label: 'Move to Top', icon: <VerticalAlignTopOutlinedIcon fontSize='small' />, onClick: () => moveToTop(thisCard) },
      { label: 'Move to Bottom', icon: <VerticalAlignBottomOutlinedIcon fontSize='small' />, onClick: () => moveToBottom(thisCard) },
      { label: 'Clone Card', icon: <ContentCopyOutlinedIcon fontSize='small' />, onClick: () => cloneCard(thisCard) },
      { label: 'Archive Card', icon: <DeleteIcon fontSize='small' />, onClick: () => archiveCard(thisCard) },
    ]
    return (
      <div className='card-preview__body__more-icon'>
        <DropdownMenu menuHeader='' menuIcon={<ExpandMoreIcon/>} menuItems={dropdownMenuItems} />
      </div>
    );
  }

  const renderLabels = () => {
    return thisCard?.labels?.map((label: string) => {
      const relevantLabel: ILabel | null = labels.find((originalLabel: ILabel) => originalLabel.id === label) || null;
      if (!relevantLabel) return;
      return <Label key={label} label={relevantLabel} isBigLabel={false} />;
    });
  }

  const renderFooterIcons = () => {
    const footerIcons: IFooterIcon[] = [];
    if (thisCard?.description) {
      footerIcons.push({ id: 'footerIcon__1', icon: <FormatAlignLeftIcon/>, tooltipText: 'This card has a description' });
    }
    if (thisCard?.comments && thisCard.comments?.length > 0) {
      footerIcons.push({ id: 'footerIcon__2', icon: <ChatBubbleOutlineIcon/>, tooltipText: 'Comments' });
    }
    if (thisCard?.checklistItems && thisCard.checklistItems?.length > 0) {
      footerIcons.push({ id: 'footerIcon__3', icon: <CheckBoxOutlinedIcon/>, tooltipText: 'Checklist items' });
    }
    if (thisCard?.location) {
      footerIcons.push({ id: 'footerIcon__4', icon: <LocationOnOutlinedIcon/>, tooltipText: 'This card has a location' });
    }
    if (thisCard?.dueDate && thisCard.dueDate?.length > 0) {
      const numOfDaysDueAfterToday = utilsService.getNumOfDaysAfterToday(thisCard.dueDate)
      let component;
      if (numOfDaysDueAfterToday === 0) { // today
        component = <p className='side-label today'>Today</p>;
      }
      else if (numOfDaysDueAfterToday < 0) { // overdue
        const date = utilsService.getOverdueDate(thisCard.dueDate);
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
      return <FooterIcon key={footerIcon.id} card={card} footerIcon={footerIcon} />;
    });
  }

  return (
    <>
      <div className='card-preview' onClick={handleCardClick} {...(hoverEventHandlers as Object)}>
        {thisCard?.coverColor ? <div className='card-preview__cover' style={{ backgroundColor: thisCard.coverColor }} /> : null}
        <div className='card-preview__body' style={thisCard?.coverColor ? { paddingTop: 6 } : {}}>
          <span className='card-id'>{thisCard.id}</span>
          {renderDropdownMenu()}
          <div className='card-preview__body__labels'>
            {renderLabels()}
          </div>
          <div className='card-preview__body__content'>
            <EllipsisText maxLines={3}>{thisCard.title}</EllipsisText>
          </div>
          <div className='card-preview__body__footer'>
            {renderFooterIcons()}
          </div>
        </div>
      </div>
      <ModalWrapper modalOpen={cardModalOpen} modalStyle={modalWrapperModalStyles} closeModalOnClickOutside={false}>
        <CardModal list={list} closeModal={closeModal} archiveCard={archiveCard}/>
      </ModalWrapper>
    </>
  )
}

export default CardPreview;
