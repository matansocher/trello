import { useState } from 'react';
import { Textarea } from '@components';
import { useBoard, useCurrentCard } from '@context';
import { IList } from '@models';
import { dataService } from '@services';
import './CardDescription.scss';

interface ICardDescriptionProps {
  list: IList;
}

function CardDescription({ list }: ICardDescriptionProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const { currentCard: card } = useCurrentCard();
  const [input, setInput] = useState(card.description || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveClick = () => {
    const newCard = { ...card, description: input };
    const newBoard = dataService.saveCard(board, list.id, newCard);
    updateBoardState(newBoard);
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
