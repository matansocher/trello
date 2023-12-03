import './CardDetails.scss'
import { ICard } from '../../models';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

interface ICardDetailsProps {
  card: ICard;
  setModalOpen: (modalOpen: boolean) => void;
}

function CardDetails({ card, setModalOpen }: ICardDetailsProps) {

  const handleMoveClick = () => {
    console.log(handleMoveClick);
  }

  const handleCopyClick = () => {
    console.log(handleCopyClick);
  }

  const handleArchiveClick = () => {
    console.log(handleArchiveClick);
  }

  const handleShareClick = () => {
    console.log(handleShareClick);
  }

  const renderActions = () => {
    const actions = [
      { label: 'Move', icon: <ArrowForwardIcon fontSize='small' />, onClick: () => handleMoveClick() },
      { label: 'Copy', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleCopyClick() },
      { label: 'Archive', icon: <DeleteIcon fontSize='small' />, onClick: () => handleArchiveClick() },
      { label: 'Share', icon: <ShareIcon fontSize='small' />, onClick: () => handleShareClick() },
    ];
    return actions.map((action) => {
      return (
        <div className='card-details__content__right__actions__action' key={action.label} onClick={action.onClick}>
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
          <p>Description</p>
          <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
          <br />
          <p>Activity</p>
          <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>
        <div className='card-details__content__right'>
          <p>Actions</p>
          <div className='card-details__content__right__actions'>
            {renderActions()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetails;
