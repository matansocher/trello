import { Close as CloseIcon } from '@mui/icons-material';
import { IChecklistItem } from '@models';
import { useState } from 'react';
import './CardChecklistAdd.scss';
import { Textarea } from '@components';

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
    const newChecklistItem: IChecklistItem = { id: 'checklist_11', description: input, isChecked: false };
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
