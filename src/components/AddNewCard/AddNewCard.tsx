import { useState } from 'react';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { ICard } from '@models';
import './AddNewCard.scss';

interface IAddNewCardProps {
  addNewCard: (card: ICard) => void
}

function AddNewCard({ addNewCard }: IAddNewCardProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCardClick = () => {
    if (!input?.length) {
      setIsOpen(false);
      return;
    }
    const newCard: ICard = { id: 'cardId__5', title: input, dueDate: '11-11-2023', createdDate: '2023-12-11', labels: ['2'] };
    addNewCard(newCard);
    setIsOpen(false);
    setInput('');
  }

  const renderOpened = () => {
    return (
      <div className='add-new-card add-new-card-open'>
        <textarea placeholder='Enter a title for this card…' rows={4} value={input} onInput={e => setInput((e.target as HTMLInputElement).value)} />
        <div className='add-new-card-open__actions'>
          <button className='save' onClick={() => handleAddCardClick()}>Add Card</button>
          <button className='close' onClick={() => setIsOpen(false)}><CloseIcon /></button>
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
