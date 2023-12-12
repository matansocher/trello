import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker, StaticDatePicker} from '@mui/x-date-pickers';
import { CardActions, CardContent, CardHeader, ModalWrapper } from '@components';
import { ICard, IList, IModalStyles } from '@models';
import './CardModal.scss';

const datePickerModalStyles: IModalStyles = {
  width: 320,
  height: 375,
  p: 2,
};

interface ICardModalProps {
  card: ICard;
  list: IList;
  setModalOpen: (modalOpen: boolean) => void;
  archiveCard: (cardId: string) => void;
}

function CardModal({ card, list, setModalOpen, archiveCard }: ICardModalProps) {
  const dateInitialValue = card.dueDate || new Date().toISOString().slice(0, 10);
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(dayjs(dateInitialValue));
  const [datePickerModalOpen, setDatePickerModalOpen] = useState(false);

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

  const handleDueDateClick = () => {
    console.log('handleDueDateClick');
    setDatePickerModalOpen(true);
  }

  const handleDueDateChange = (newValue: Dayjs | null) => {
    console.log(newValue);
    setDatePickerValue(newValue);
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
      <ModalWrapper modalOpen={datePickerModalOpen} setModalOpen={setDatePickerModalOpen} modalStyle={datePickerModalStyles}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className='date-picker-wrapper'>
            <StaticDatePicker displayStaticWrapperAs='desktop' value={datePickerValue} onChange={(newValue) => handleDueDateChange(newValue)} />
            {/*<DatePicker value={datePickerValue} onChange={(newValue) => handleDueDateChange(newValue)} />*/}
            <button className='save-button' onClick={() => setDatePickerModalOpen(false)}>Save</button>
          </div>
        </LocalizationProvider>
      </ModalWrapper>
    </div>
  )
}

export default CardModal;
