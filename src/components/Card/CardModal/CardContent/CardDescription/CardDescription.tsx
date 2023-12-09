import { useState } from 'react';
import { useBoard } from '@context';
import { ICard, IList } from '@models';
import { saveCard} from '@services';
import './CardDescription.scss'

interface ICardDescriptionProps {
  list: IList;
  card: ICard;
}

function CardDescription({ list, card }: ICardDescriptionProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const [input, setInput] = useState(card.description || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenOrClose = (open: boolean) => {
    setIsOpen(open);
  }

  const handleSaveClick = () => {
    const newCard = { ...card, description: input };
    const newBoard = saveCard(board, list.id, newCard);
    updateBoardState(newBoard);
    handleOpenOrClose(false);
  }

  const handleCancelClick = () => {
    setInput(card.description || '');
    handleOpenOrClose(false);
  }

  const renderOpened = () => {
    return (
      <div className='card-description card-description-open'>
        <textarea placeholder='Add a more detailed description…' rows={4} value={input} onInput={e => setInput((e.target as HTMLInputElement).value)} />
        <div className='card-description-open__actions'>
          <button className='save' onClick={handleSaveClick}>Save</button>
          <button className='cancel' onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    )
  }

  const renderClosed = () => {
    if (!card.description) {
      handleOpenOrClose(true);
      return (
        <div className='card-description card-description-closed' onClick={() => handleOpenOrClose(true)}>
          <p>Add a more detailed description…</p>
        </div>
      )
    }
    return (
      <div className='card-description card-description-closed' onClick={() => handleOpenOrClose(true)}>
        <p>{card.description}</p>
      </div>
    )
  }

  return isOpen ? renderOpened() : renderClosed();
}

export default CardDescription;
