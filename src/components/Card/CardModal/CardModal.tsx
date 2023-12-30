import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { CardActions, CardContent, CardHeader, DatePicker, LabelsPicker } from '@components';
import { useCurrentCard } from '@context';
import { ICard, ILabel, IList } from '@models';
import { dataService } from '@services';
import './CardModal.scss';

interface ICardModalProps {
  list: IList;
  closeModal: () => void;
  archiveCard: (card: ICard) => void;
}

function CardModal({ list, closeModal, archiveCard }: ICardModalProps) {
  const { currentCard: card, updateCurrentCard } = useCurrentCard();
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);

  const handleMoveClick = () => {
    console.log('handleMoveClick');
  }

  const handleCloneClick = async () => {
    await dataService.cloneCard(list, card);
  }

  const handleArchiveClick = () => {
    archiveCard(card);
  }

  const handleShareClick = () => {
    console.log('handleShareClick');
  }

  const handleMembersClick = () => {
    console.log('handleMembersClick');
  }

  const handleLabelsClick = () => {
    console.log('handleLabelsClick');
    setLabelsModalOpen(true);
  }

  const handleDueDateChange = async (newValue: Dayjs | null) => {
    const cardToSave = await dataService.updateCardDueDate(card, newValue);
    updateCurrentCard(cardToSave);
  }

  const handleLabelsChange = async (label: ILabel, isChecked: boolean) => {
    const cardToSave = await dataService.updateCardLabels(card, label, isChecked);
    updateCurrentCard(cardToSave);
  }

  const handleChecklistClick = async () => {
    const cardToSave = await dataService.createChecklist(card);
    updateCurrentCard(cardToSave);
  }

  const handleDueDateClick = () => {
    setDatePickerModalOpen(true);
  }

  const handleAttachmentClick = () => {
    console.log('handleAttachmentClick');
  }

  const handleCoverClick = () => {
    console.log('handleCoverClick');
  }

  const handleCloseModal = () => {
    closeModal();
  }

  return (
    <div className='card-modal'>
      <CardHeader list={list} handleCloseModal={handleCloseModal} />
      <div className='card-modal__content'>
        <div className='card-modal__content__left'>
          <CardContent />
        </div>
        <div className='card-modal__content__right'>
          <CardActions
            handleMembersClick={handleMembersClick}
            handleLabelsClick={handleLabelsClick}
            handleDueDateClick={handleDueDateClick}
            handleChecklistClick={handleChecklistClick}
            handleAttachmentClick={handleAttachmentClick}
            handleCoverClick={handleCoverClick}
            handleMoveClick={handleMoveClick}
            handleCloneClick={handleCloneClick}
            handleArchiveClick={handleArchiveClick}
            handleShareClick={handleShareClick}
          />
        </div>
      </div>

      <DatePicker dueDate={card.dueDate || ''} handleChange={handleDueDateChange} isOpen={datePickerModalOpen} setIsOpen={setDatePickerModalOpen} />
      <LabelsPicker cardLabels={card.labels || []} handleLabelsChange={handleLabelsChange} isOpen={labelsModalOpen} setIsOpen={setLabelsModalOpen} />
    </div>
  )
}

export default CardModal;
