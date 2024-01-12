import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { CardActions, CardContent, CardHeader, ColorPicker, DatePicker, LabelsPicker } from '@components';
import { useCurrentCard } from '@context';
import { ICard, IColorTile, ILabel, IList } from '@models';
import { dataService } from '@services';
import './CardModal.scss';

interface ICardModalProps {
  list: IList;
  closeModal: () => void;
  archiveCard: (card: ICard) => void;
}

function CardModal({ list, closeModal, archiveCard }: ICardModalProps) {
  const { currentCard: card } = useCurrentCard();
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);

  const handleMoveClick = () => {
    console.log('handleMoveClick');
  }

  const handleCloneClick = async () => {
    await dataService.cloneCard(list, card);
    closeModal();
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
    setLabelsModalOpen(true);
  }

  const handleDueDateChange = async (newValue: Dayjs | null) => {
    dataService.updateCardDueDate(card, newValue);
  }

  const handleLabelsChange = async (label: ILabel, isChecked: boolean) => {
    dataService.updateCardLabels(card, label, isChecked);
  }

  const handleChecklistClick = async () => {
    if (card.checklistItems?.length || card.checklistTitle?.length) return;
    dataService.createChecklist(card);
  }

  const handleDueDateClick = () => {
    setDatePickerModalOpen(true);
  }

  const handleAttachmentClick = () => {
    console.log('handleAttachmentClick');
  }

  const handleCoverClick = () => {
    setColorPickerModalOpen(true);
  }

  const handleSaveCoverColorPicker = async (tile: IColorTile) => {
    dataService.updateCardCoverColor(card, tile.backgroundColor);
    setColorPickerModalOpen(false);
  }

  return (
    <div className='card-modal'>
      {card?.coverColor ? <div className='card-modal__cover' style={{ backgroundColor: card.coverColor }} /> : null}
      <CardHeader listTitle={list.title} handleCloseModal={closeModal} />
      <div className='card-modal__body'>
        <div className='card-modal__body__content'>
          <div className='card-modal__body__content__left'>
            <CardContent />
          </div>
          <div className='card-modal__body__content__right'>
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
      </div>

      <ColorPicker isOpen={colorPickerModalOpen} setIsOpen={setColorPickerModalOpen} hasHeader={false} handleSaveColorPicker={handleSaveCoverColorPicker} handleCloseColorPicker={() => setColorPickerModalOpen(false)} />
      <DatePicker dueDate={card.dueDate as string} handleChange={handleDueDateChange} isOpen={datePickerModalOpen} setIsOpen={setDatePickerModalOpen} />
      <LabelsPicker isOpen={labelsModalOpen} setIsOpen={setLabelsModalOpen} cardLabels={card.labels || []} handleLabelsChange={handleLabelsChange} />
    </div>
  )
}

export default CardModal;
