import CloseIcon from '@mui/icons-material/Close';
import { ICard, IList } from '@models';
import { useBoard } from '@context';
import { addCardToList } from '@services';
import CardActions from './CardActions/CardActions';
import CardContent from './CardContent/CardContent';
import './CardModal.scss'

interface ICardModalProps {
  card: ICard;
  list: IList;
  setModalOpen: (modalOpen: boolean) => void;
  archiveCard: (cardId: string) => void;
}

function CardModal({ card, list, setModalOpen, archiveCard }: ICardModalProps) {

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
    <div className='card-modal'>
      <div className='card-modal__header'>
        <div className='card-modal__header__left'>
          <p className='card-modal__header__left__title'>{card.title}</p>
          <p className='card-modal__header__left__list'>list: {list.title}</p>
        </div>
        <div className='card-modal__header__right'>
          <CloseIcon onClick={() => setModalOpen(false) } />
        </div>
      </div>
      <div className='card-modal__content'>
        <div className='card-modal__content__left'>
          <CardContent list={list} card={card} />
        </div>
        <div className='card-modal__content__right'>
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

export default CardModal;
