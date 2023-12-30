import { useState } from 'react';
import { Textarea } from '@components';
import { useCurrentCard } from '@context';
import { firebaseService } from '@services';
import './CardDescription.scss';

interface ICardDescriptionProps {

}

function CardDescription({  }: ICardDescriptionProps) {
  const { currentCard: card, updateCurrentCard } = useCurrentCard();
  const [input, setInput] = useState(card.description || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveClick = async () => {
    const cardToSave = { ...card, description: input };
    await firebaseService.updateCard(cardToSave);
    updateCurrentCard(cardToSave);
    setIsOpen(false);
  }

  const handleCancelClick = () => {
    setInput(card.description || '');
    setIsOpen(false);
  }

  const renderOpened = () => {
    return (
      <div className='card-description card-description-open'>
        <Textarea placeholder='Add a more detailed description…' text={input} handleFocusChange={setIsOpen} handleInputChange={setInput} />
        <div className='card-description-open__actions'>
          <button className='save' onClick={handleSaveClick}>Save</button>
          <button className='cancel' onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    )
  }

  const renderClosed = () => {
    if (!card.description) {
      return (
        <div className='card-description card-description-closed' onClick={() => setIsOpen(true)}>
          <p>Add a more detailed description…</p>
        </div>
      )
    }
    return (
      <div className='card-description card-description-closed' onClick={() => setIsOpen(true)}>
        <p>{card.description}</p>
      </div>
    )
  }

  return isOpen ? renderOpened() : renderClosed();
}

export default CardDescription;
