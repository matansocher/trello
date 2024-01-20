import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
} from '@mui/icons-material';
import { EllipsisText, FooterIcon, Label } from '@components';
import { useBoard, useLabels } from '@context';
import { ILabel, IFooterIcon, IArchivedCard } from '@models';
import './ArchivedCard.scss';
import { firebaseService } from '@services';

interface IArchivedCardProps {
  card: IArchivedCard;
  handleCloseCardsArchiveModal: () => void;
}

function ArchivedCard({ card, handleCloseCardsArchiveModal }: IArchivedCardProps) {
  const { labels } = useLabels();
  const { boardState: board } = useBoard();

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
      footerIcons.push({ id: 'footerIcon__1', icon: <FormatAlignLeftIcon/>, tooltipText: 'This card has a description' });
    }
    if (card?.comments && card.comments?.length > 0) {
      footerIcons.push({ id: 'footerIcon__2', icon: <ChatBubbleOutlineIcon/>, tooltipText: 'Comments' });
    }
    if (card?.checklistItems && card.checklistItems?.length > 0) {
      footerIcons.push({ id: 'footerIcon__3', icon: <CheckBoxOutlinedIcon/>, tooltipText: 'Checklist items' });
    }
    if (card?.location) {
      footerIcons.push({ id: 'footerIcon__4', icon: <LocationOnOutlinedIcon/>, tooltipText: 'This card has a location' });
    }
    if (footerIcons.length === 0) {
      return;
    }

    return footerIcons.map((footerIcon: IFooterIcon) => {
      return <FooterIcon key={footerIcon.id} card={card} footerIcon={footerIcon} />;
    });
  }

  const sendToBoard = async () => {
    console.log('sendToBoard');
    await firebaseService.sendArchivedCardToBoard(board, card);
    handleCloseCardsArchiveModal();
  }

  return (
    <>
      <div className='archived-card'>
        {card?.coverColor ? <div className='archived-card__cover' style={{backgroundColor: card.coverColor}}/> : null}
        <div className='archived-card__body' style={card?.coverColor ? {paddingTop: 6} : {}}>
          <span className='card-id'>{card.id}</span>
          <div className='archived-card__body__labels'>
            {renderLabels()}
          </div>
          <div className='archived-card__body__content'>
            <EllipsisText maxLines={3}>{card.title}</EllipsisText>
          </div>
          <div className='archived-card__body__footer'>
            {renderFooterIcons()}
          </div>
        </div>
      </div>
      <p className='send-to-board' onClick={sendToBoard}>Send to board</p>
    </>
  )
}

export default ArchivedCard;
