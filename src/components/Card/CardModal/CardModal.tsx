import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import {
  CardActions,
  CardContent,
  CardHeader,
  ColorPicker,
  DatePicker,
  LabelsPicker,
  ModalWrapper,
  PlacePicker
} from '@components';
import { useCurrentCard } from '@context';
import { ICard, IColorTile, ILabel, IList, ILocation, IModalStyles } from '@models';
import { firebaseService } from '@services';
import './CardModal.scss';

const datePickerModalStyles: IModalStyles = {
  width: 350,
  height: 400,
};

const placePickerModalStyles: IModalStyles = {
  width: 350,
  height: 450,
};

const labelsModalStyles: IModalStyles = {
  width: 320,
};

const colorPickerModalStyles: IModalStyles = {
  width: 320,
  padding: 0,
};

interface ICardModalProps {
  list: IList;
  closeModal: (card?: ICard) => void;
  archiveCard: (card: ICard) => void;
}

function CardModal({ list, closeModal, archiveCard }: ICardModalProps) {
  const { currentCard: card, updateCurrentCard } = useCurrentCard();
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);
  const [locationPlaceModalOpen, setLocationPlaceModalOpen] = useState(false);

  useEffect(() => {
    if (!card?.id) return;

    const unsubscribe = firebaseService.getCardListener(card?.id, async (querySnapshot: any) => {
      const [card] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
      if (!card) return;
      updateCurrentCard(card);
    });

    return () => unsubscribe();
  }, []);

  const handleMoveClick = () => {
    console.log('handleMoveClick');
  }

  const handleCloneClick = async () => {
    await firebaseService.cloneCard(list, card);
    closeModal(card);
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
    firebaseService.updateCardDueDate(card, newValue);
  }

  const handleLabelsChange = async (label: ILabel, isChecked: boolean) => {
    firebaseService.updateCardLabels(card, label, isChecked);
  }

  const handleChecklistClick = async () => {
    if (card.checklistItems?.length || card.checklistTitle?.length) return;
    firebaseService.createChecklist(card);
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
    firebaseService.updateCardCoverColor(card, tile.backgroundColor);
    setColorPickerModalOpen(false);
  }

  const handleLocationClick = () => {
    setLocationPlaceModalOpen(true);
  }

  const handleSaveLocationClick = (location: ILocation) => {
    firebaseService.updateCardLocation(card, location);
    setLocationPlaceModalOpen(false);
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
              handleLocationClick={handleLocationClick}
              handleMoveClick={handleMoveClick}
              handleCloneClick={handleCloneClick}
              handleArchiveClick={handleArchiveClick}
              handleShareClick={handleShareClick}
            />
          </div>
        </div>
      </div>

      <ModalWrapper modalOpen={colorPickerModalOpen} closeModal={() => setColorPickerModalOpen(false)} modalStyle={colorPickerModalStyles}>
        <ColorPicker setIsOpen={setColorPickerModalOpen} hasHeader={false} handleSaveColorPicker={handleSaveCoverColorPicker} handleCloseColorPicker={() => setColorPickerModalOpen(false)} />
      </ModalWrapper>

      <ModalWrapper modalOpen={datePickerModalOpen} closeModal={() => setDatePickerModalOpen(false)} modalStyle={datePickerModalStyles}>
        <DatePicker setIsOpen={setDatePickerModalOpen} dueDate={card.dueDate as string} handleChange={handleDueDateChange} />
      </ModalWrapper>

      <ModalWrapper modalOpen={labelsModalOpen} closeModal={() => setLabelsModalOpen(false)} modalStyle={labelsModalStyles}>
        <LabelsPicker setIsOpen={setLabelsModalOpen} cardLabels={card.labels || []} handleLabelsChange={handleLabelsChange} />
      </ModalWrapper>

      <ModalWrapper modalOpen={locationPlaceModalOpen} closeModal={() => setLocationPlaceModalOpen(false)} modalStyle={placePickerModalStyles}>
        <PlacePicker isOpen={locationPlaceModalOpen} setIsOpen={setLocationPlaceModalOpen} handleSave={handleSaveLocationClick} />
      </ModalWrapper>

    </div>
  )
}

export default CardModal;
