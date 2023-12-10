import { CardActions, CardContent, CardHeader } from '@components';
import { ICard, IList } from '@models';
import './CardModal.scss';

interface ICardModalProps {
  card: ICard;
  list: IList;
  setModalOpen: (modalOpen: boolean) => void;
  archiveCard: (cardId: string) => void;
}

function CardModal({ card, list, setModalOpen, archiveCard }: ICardModalProps) {

  const handleMoveClick = () => {
    console.log('handleMoveClick');
  }

  const handleCopyClick = () => {
    console.log('handleCopyClick');
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
      <CardHeader list={list} card={card} setModalOpen={setModalOpen} />
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
