import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { ModalWrapper } from '@components';
import { ICard, IModalStyles } from '@models';
import './DatePicker.scss';

const datePickerModalStyles: IModalStyles = {
  width: 320,
  height: 375,
  p: 2,
};

interface DatePickerProps {
  handleChange: (newValue: Dayjs | null) => void;
  card: ICard;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function DatePicker({ card, isOpen, setIsOpen, handleChange }: DatePickerProps) {
  const dateInitialValue = card.dueDate || new Date().toISOString().slice(0, 10);
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(dayjs(dateInitialValue));

  const handleDateChange = (newValue: Dayjs | null) => {
    setDatePickerValue(newValue);
    handleChange(newValue);
  }

  return (
    <ModalWrapper modalOpen={isOpen} setModalOpen={setIsOpen} modalStyle={datePickerModalStyles}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='date-picker-wrapper'>
          <StaticDatePicker displayStaticWrapperAs='desktop' value={datePickerValue} onChange={(newValue) => handleDateChange(newValue)} />
          <button className='save-button' onClick={() => setIsOpen(false)}>Save</button>
        </div>
      </LocalizationProvider>
    </ModalWrapper>
  )
}

export default DatePicker;