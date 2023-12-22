import { useState } from 'react';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { IList } from '@models';
import './AddNewList.scss';

interface IAddNewListProps {
  addNewList: (list: IList) => void;
}

function AddNewList({ addNewList }: IAddNewListProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenOrClose = (isOpen: boolean) => {
    setIsOpen(isOpen);
  }

  const handleAddListClick = () => {
    if (!input?.length) {
      setIsOpen(false);
      return;
    }
    const newList: IList = { id: 'listId_4567', title: input, cards: [] };
    addNewList(newList);
    setIsOpen(false);
    setInput('');
  }

  const renderOpened = () => {
    return (
      <div className='add-new-list add-new-list-open'>
        <textarea placeholder='Enter list title…' rows={4} className='editable-text-area' value={input} onInput={e => setInput((e.target as HTMLInputElement).value)} />
        <div className='add-new-list-open__actions'>
          <button className='save' onClick={() => handleAddListClick()}>Add list</button>
          <button className='close' onClick={() => handleOpenOrClose(false)}><CloseIcon /></button>
        </div>
      </div>
    )
  }

  const renderClosed = () => {
    return (
      <div className='add-new-list add-new-list-closed' onClick={() => handleOpenOrClose(true)}>
        <div className='add-new-list-closed__wrapper'>
          <AddIcon />
          <p>Add another list</p>
        </div>
      </div>
    )
  }

  return isOpen ? renderOpened() : renderClosed();
}

export default AddNewList;
