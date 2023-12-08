import './CardActions.scss'
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

interface ICardAction {
  label: string;
  icon: any;
  onClick: () => void;
}

interface ICardActionsProps {
  handleMembersClick: () => void;
  handleLabelsClick: () => void;
  handleChecklistClick: () => void;
  handleDatesClick: () => void,
  handleAttachmentClick: () => void,
  handleCoverClick: () => void,
  handleMoveClick: () => void,
  handleCopyClick: () => void,
  handleArchiveClick: () => void,
  handleShareClick: () => void,
}

function CardActions({
  handleMembersClick,
  handleLabelsClick,
  handleChecklistClick,
  handleDatesClick,
  handleAttachmentClick,
  handleCoverClick,
  handleMoveClick,
  handleCopyClick,
  handleArchiveClick,
  handleShareClick,
}: ICardActionsProps) {

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
        <div className='card-modal__content__right__actions__section__action' key={action.label} onClick={action.onClick}>
          {action.icon}
          <p>{action.label}</p>
        </div>
      )
    });
  }

  return (
    <div className='card-modal__content__right__actions'>
      <div className='card-modal__content__right__actions__section'>
        <p>Add to Card</p>
        {renderActionsTop()}
      </div>
      <div className='card-modal__content__right__actions__section'>
        <p>Actions</p>
        {renderActionsBottom()}
      </div>
    </div>
  )
}

export default CardActions;
