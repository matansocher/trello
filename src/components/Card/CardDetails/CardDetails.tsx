import './CardDetails.scss'
import { ICard, IList } from '../../../models';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LabelIcon from '@mui/icons-material/Label';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useBoard } from '../../../context/board-context.tsx';
import { addCardToList } from "../../../services/data.service.tsx";
import { CardActions, CardContent } from "../";

interface ICardAction {
  label: string;
  icon: any;
  onClick: () => void;
}

interface ICardDetailsProps {
  card: ICard;
  list: IList;
  setModalOpen: (modalOpen: boolean) => void;
  archiveCard: (cardId: string) => void;
}

function CardDetails({ card, list, setModalOpen, archiveCard }: ICardDetailsProps) {

  const { boardState: board, updateBoardState } = useBoard();

  const handleMoveClick = () => {
    console.log('handleMoveClick');
  }

  const handleCopyClick = () => {
    console.log('handleCopyClick');
    // addCardToList(board, list, card);
  }

  const handleArchiveClick = () => {
    archiveCard(card.id);
  }

  const handleShareClick = () => {
    console.log('handleShareClick');
  }

  const handleMembersClick = () => {
    console.log('handleMembersClick');
  }

  const handleLabelsClick = () => {
    console.log('handleLabelsClick');
  }

  const handleChecklistClick = () => {
    console.log('handleChecklistClick');
  }

  const handleDatesClick = () => {
    console.log('handleDatesClick');
  }

  const handleAttachmentClick = () => {
    console.log('handleAttachmentClick');
  }

  const handleCoverClick = () => {
    console.log('handleCoverClick');
  }

  const renderActionsTop = () => {
    const actions: ICardAction[] = [
      { label: 'Members', icon: <PersonOutlineIcon fontSize='small' />, onClick: () => handleMembersClick() },
      { label: 'Labels', icon: <LabelIcon fontSize='small' />, onClick: () => handleLabelsClick() },
      { label: 'Checklist', icon: <ChecklistIcon fontSize='small' />, onClick: () => handleChecklistClick() },
      { label: 'Dates', icon: <ScheduleIcon fontSize='small' />, onClick: () => handleDatesClick() },
      { label: 'Attachment', icon: <AttachFileIcon fontSize='small' />, onClick: () => handleAttachmentClick() },
      { label: 'Cover', icon: <InventoryIcon fontSize='small' />, onClick: () => handleCoverClick() },
    ];
    return renderActions(actions);
  }

  const renderActionsBottom = () => {
    const actions: ICardAction[] = [
      { label: 'Move', icon: <ArrowForwardIcon fontSize='small' />, onClick: () => handleMoveClick() },
      { label: 'Copy', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleCopyClick() },
      { label: 'Archive', icon: <DeleteIcon fontSize='small' />, onClick: () => handleArchiveClick() },
      { label: 'Share', icon: <ShareIcon fontSize='small' />, onClick: () => handleShareClick() },
    ];
    return renderActions(actions);
  }

  const renderActions = (actions: ICardAction[]) => {
    return actions.map((action: ICardAction) => {
      return (
        <div className='card-details__content__right__actions__section__action' key={action.label} onClick={action.onClick}>
          {action.icon}
          <p>{action.label}</p>
        </div>
      )
    });
  }

  return (
    <div className='card-details'>
      <div className='card-details__header'>
        <div className='card-details__header__left'>
          <p>{card.id}</p>
          <p>{card.title}</p>
        </div>
        <div className='card-details__header__right'>
          <CloseIcon onClick={() => setModalOpen(false) } />
        </div>
      </div>
      <div className='card-details__content'>
        <div className='card-details__content__left'>
          <CardContent card={card} />
        </div>
        <div className='card-details__content__right'>
          <CardActions
            handleMembersClick={handleMembersClick}
            handleLabelsClick={handleLabelsClick}
            handleChecklistClick={handleChecklistClick}
            handleDatesClick={handleDatesClick}
            handleAttachmentClick={handleAttachmentClick}
            handleCoverClick={handleCoverClick}
            handleMoveClick={handleMoveClick}
            handleCopyClick={handleCopyClick}
            handleArchiveClick={handleArchiveClick}
            handleShareClick={handleShareClick}
          />
        </div>
      </div>
    </div>
  )
}

export default CardDetails;
