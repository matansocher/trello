import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { CardActions, CardContent, CardHeader, DatePicker, LabelsPicker } from '@components';
import { useBoard, useCurrentCard } from '@context';
import { useGetBoard } from '@hooks';
import { IBoard, ILabel, IList } from '@models';
import { dataService } from '@services';
import './CardModal.scss';

interface ICardModalProps {
  list: IList;
  setModalOpen: (modalOpen: boolean) => void;
  archiveCard: (cardId: string) => void;
}

function CardModal({ list, setModalOpen, archiveCard }: ICardModalProps) {
  const { updateBoardState } = useBoard();
  const { board } = useGetBoard();
  const { currentCard: card } = useCurrentCard();
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);

  const handleMoveClick = () => {
    console.log('handleMoveClick');
  }

  const handleCopyClick = () => {
    const newCard = { ...card, id: `cardId_${Math.random()}`, title: `Copy of ${card.title}` };
    const newBoard = dataService.addCardToList(board, list, newCard) as IBoard;
    updateBoardState(newBoard);
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
    setLabelsModalOpen(true);
  }

  const handleDueDateChange = (newValue: Dayjs | null) => {
    const cardToSave = dataService.updateCardDueDate(card, newValue);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const handleLabelsChange = (label: ILabel, isChecked: boolean) => {
    const cardToSave = dataService.updateCardLabels(card, label, isChecked);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const handleDueDateClick = () => {
    setDatePickerModalOpen(true);
  }

  const handleChecklistClick = () => {
    const cardToSave = { ...card, checklistItems: [], checklistTitle: 'Checklist' };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const handleAttachmentClick = () => {
    console.log('handleAttachmentClick');
  }

  const handleCoverClick = () => {
    console.log('handleCoverClick');
  }

  return (
    <div className='card-modal'>
      <CardHeader list={list} setModalOpen={setModalOpen} />
      <div className='card-modal__content'>
        <div className='card-modal__content__left'>
          <CardContent list={list} />
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
            handleCopyClick={handleCopyClick}
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
