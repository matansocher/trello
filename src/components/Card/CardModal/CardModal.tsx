import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CardActions, CardContent, CardHeader, DatePicker, LabelsPicker } from '@components';
import { useBoard } from '@context';
import { IBoard, ICard, ILabel, IList } from '@models';
import { dataService } from '@services';
import './CardModal.scss';

interface ICardModalProps {
  card: ICard;
  list: IList;
  setModalOpen: (modalOpen: boolean) => void;
  archiveCard: (cardId: string) => void;
}

function CardModal({ card, list, setModalOpen, archiveCard }: ICardModalProps) {
  const { boardState: board, updateBoardState } = useBoard();
  // date picker
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  // labels picker
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);

  const handleMoveClick = () => {
    console.log('handleMoveClick');
  }

  const handleCopyClick = () => {
    const newCard = { ...card, id: `cardId_${Math.random()}`, title: `Copy of ${card.title}` };
    const newBoard = dataService.addCardToList(board, list, newCard) as IBoard;
    updateBoardState(newBoard);
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
    setLabelsModalOpen(true);
  }

  const handleLabelsChange = (isChecked: boolean, label: ILabel) => {
    const currentLabels = card.labels || [];
    const newLabels = isChecked ? [...currentLabels, label.id] : currentLabels.filter((labelId: string) => labelId !== label.id);
    const cardToSave: ICard = { ...card, labels: newLabels };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const handleDueDateClick = () => {
    setDatePickerModalOpen(true);
  }

  const handleDueDateChange = (newValue: Dayjs | null) => {
    const dueDate = newValue ? newValue.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
    const cardToSave = { ...card, dueDate };
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
      <CardHeader list={list} card={card} setModalOpen={setModalOpen} />
      <div className='card-modal__content'>
        <div className='card-modal__content__left'>
          <CardContent list={list} card={card} />
        </div>
        <div className='card-modal__content__right'>
          <CardActions
            handleMembersClick={handleMembersClick}
            handleLabelsClick={handleLabelsClick}
            handleDueDateClick={handleDueDateClick}
            handleAttachmentClick={handleAttachmentClick}
            handleCoverClick={handleCoverClick}
            handleMoveClick={handleMoveClick}
            handleCopyClick={handleCopyClick}
            handleArchiveClick={handleArchiveClick}
            handleShareClick={handleShareClick}
          />
        </div>
      </div>

      <DatePicker handleChange={handleDueDateChange} card={card} isOpen={datePickerModalOpen} setIsOpen={setDatePickerModalOpen} />
      <LabelsPicker handleLabelsChange={handleLabelsChange} card={card} isOpen={labelsModalOpen} setIsOpen={setLabelsModalOpen} />
    </div>
  )
}

export default CardModal;
