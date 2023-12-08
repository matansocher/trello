import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ICard } from '@models';
import './AddNewCard.scss';

interface IAddNewCardProps {
  addNewCard: (card: ICard) => void
}

function AddNewCard({ addNewCard }: IAddNewCardProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenOrClose = (open: boolean) => {
    setIsOpen(open);
  }

  const handleAddCardClick = () => {
    if (!input?.length) {
      setIsOpen(false);
      return;
    }
    const newCard: ICard = { id: '5', title: input, date: '11-11-2023', tags: ['2'] };
    addNewCard(newCard);
    setIsOpen(false);
    setInput('');
  }

  const renderOpened = () => {
    return (
      <div className='add-new-card add-new-card-open'>
        <textarea placeholder='Enter a title for this card…' rows={4} value={input} onInput={e => setInput((e.target as HTMLInputElement).value)} />
        <div className='add-new-card-open__actions'>
          <div className='save'>
            <p onClick={() => handleAddCardClick()}>Add Card</p>
          </div>
          <div className='close'>
            <CloseIcon onClick={() => handleOpenOrClose(false)} />
          </div>
        </div>
      </div>
    )
  }

  const renderClosed = () => {
    return (
      <div className='add-new-card add-new-card-closed' onClick={() => handleOpenOrClose(true)}>
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
