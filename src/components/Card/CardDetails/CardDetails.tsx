import './CardDetails.scss'
import { ICard, IList } from '@models';
import CloseIcon from '@mui/icons-material/Close';
import { useBoard } from '../../../context/board-context';
import { addCardToList } from '../../../services/data.service';
import { CardActions, CardContent } from '../';

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
