import { Close as CloseIcon } from '@mui/icons-material';
import { IChecklistItem } from '@models';
import { useState } from 'react';
import './CardChecklistAdd.scss';
import { Textarea } from '@components';
import { utilsService } from '@services';

interface ICardCheckListAddProps {
  addNewChecklistItem: (checklistItem: IChecklistItem) => void;
}

function CardChecklistAdd({ addNewChecklistItem }: ICardCheckListAddProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddChecklistItemClick = () => {
    if (!input?.length) {
      setIsOpen(false);
      return;
    }
    const timestamp = new Date().toISOString().slice(0, 10);
    const id = utilsService.generateId();
    const newChecklistItem: IChecklistItem = { id, description: input, isChecked: false, timestamp };
    addNewChecklistItem(newChecklistItem);
    setIsOpen(false);
    setInput('');
  }

  const handleCancelClick = () => {
    setIsOpen(false);
    setInput('');
  }

  const renderOpened = () => {
    return (
      <div className='add-new-checklist-item add-new-checklist-item-open'>
        <Textarea placeholder='Add an item' text={input} handleFocusChange={setIsOpen} handleInputChange={setInput} />
        <div className='add-new-checklist-item-open__actions'>
          <button className='save' onClick={() => handleAddChecklistItemClick()}>Add</button>
          <button className='close' onClick={() => handleCancelClick()}><CloseIcon /></button>
        </div>
      </div>
    )
  }

  const renderClosed = () => {
    return (
      <div className='add-new-checklist-item add-new-checklist-item-closed' onClick={() => setIsOpen(true)}>
        <div className='add-new-checklist-item-closed__wrapper'>
          <button className='add' onClick={() => handleAddChecklistItemClick()}>Add an item</button>
        </div>
      </div>
    )
  }

  return isOpen ? renderOpened() : renderClosed();
}

export default CardChecklistAdd;
