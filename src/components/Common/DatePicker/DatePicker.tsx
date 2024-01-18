import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers';
import './DatePicker.scss';

interface IDatePickerProps {
  setIsOpen: (isOpen: boolean) => void;
  dueDate: string;
  handleChange: (newValue: Dayjs | null) => void;
}

function DatePicker({ setIsOpen, dueDate, handleChange }: IDatePickerProps) {
  const dateInitialValue = dueDate || new Date().toISOString().slice(0, 10);
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null>(dayjs(dateInitialValue));

  const handleDateChange = (newValue: Dayjs | null) => {
    setDatePickerValue(newValue);
    handleChange(newValue);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='date-picker-wrapper'>
        <StaticDatePicker displayStaticWrapperAs='desktop' value={datePickerValue} onChange={(newValue) => handleDateChange(newValue)} />
        <button className='save-button' onClick={() => setIsOpen(false)}>Save</button>
      </div>
    </LocalizationProvider>
  )
}

export default DatePicker;
