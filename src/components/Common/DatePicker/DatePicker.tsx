import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { ModalWrapper } from '@components';
import { IModalStyles } from '@models';
import './DatePicker.scss';

const datePickerModalStyles: IModalStyles = {
  width: 350,
  height: 400,
  p: 2,
};

interface IDatePickerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dueDate: string;
  handleChange: (newValue: Dayjs | null) => void;
}

function DatePicker({ dueDate, isOpen, setIsOpen, handleChange }: IDatePickerProps) {
  const dateInitialValue = dueDate || new Date().toISOString().slice(0, 10);
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(dayjs(dateInitialValue));

  const handleDateChange = (newValue: Dayjs | null) => {
    setDatePickerValue(newValue);
    handleChange(newValue);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <ModalWrapper modalOpen={isOpen} closeModal={closeModal} modalStyle={datePickerModalStyles}>
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
