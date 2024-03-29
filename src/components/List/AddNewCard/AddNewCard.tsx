import { useState } from 'react';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Textarea } from '@components';
import { ICard } from '@models';
import './AddNewCard.scss';

interface IAddNewCardProps {
  addNewCardToList: (card: ICard) => void;
}

function AddNewCard({ addNewCardToList }: IAddNewCardProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (newValue: string) => {
    setInput(newValue);
  }

  const handleAddCardClick = () => {
    if (!input?.length) {
      setIsOpen(false);
      return;
    }
    const newCard: ICard = { title: input, createdAt: new Date().toISOString().slice(0, 10) };
    addNewCardToList(newCard);
    setIsOpen(false);
    setInput('');
  }

  const handleCancelAddCardClick = () => {
    setIsOpen(false);
    setInput('');
  }

  const renderOpened = () => {
    return (
      <div className='add-new-card add-new-card-open'>
        <Textarea placeholder='Enter a title for this card…' text={input} handleFocusChange={setIsOpen} handleInputChange={handleInputChange} />
        <div className='add-new-card-open__actions'>
          <button className='save' onClick={() => handleAddCardClick()}>Add Card</button>
          <button className='close' onClick={() => handleCancelAddCardClick()}><CloseIcon /></button>
        </div>
      </div>
    )
  }

  const renderClosed = () => {
    return (
      <div className='add-new-card add-new-card-closed' onClick={() => setIsOpen(true)}>
        <div className='add-new-card-closed__wrapper'>
          <AddIcon />
          <p>Add Card</p>
        </div>
      </div>
    )
  }

  return isOpen ? renderOpened() : renderClosed();
}

export default AddNewCard;
