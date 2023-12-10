import { useState, useEffect } from 'react';
import { Close as CloseIcon, VisibilityOutlined as VisibilityOutlinedIcon } from '@mui/icons-material';
import { useBoard } from '@context';
import { useToggleOnFocus } from '@hooks';
import { ICard, IList } from '@models';
import { dataService } from '@services';
import './CardHeader.scss';

interface ICardHeaderProps {
  list: IList;
  card: ICard;
  setModalOpen: (modalOpen: boolean) => void;
}

function CardHeader({ list, card, setModalOpen }: ICardHeaderProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const [input, setInput] = useState(card.title || '');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, eventHandlers] = useToggleOnFocus(false);

  useEffect(() => {
    if (!isFocused) { // outside clicked
      if (isOpen) {
        handleSaveClick();
        setIsOpen(false);
      }
    } else { // inside clicked
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  }, [isFocused]);

  const handleSaveClick = () => {
    if (card.title === input) return; // text was not changed
    const newCard = { ...card, title: input };
    const newBoard = dataService.saveCard(board, list.id, newCard);
    updateBoardState(newBoard);
  }

  const handleWatchClick = () => {
    console.log('handleWatchClick');
  }

  return (
    <div className='card-header'>
      <div className='card-header__left'>
        <div className='card-header__left__title'>
          <input
            {...(eventHandlers as Object)}
            className={ !isOpen ? 'closed-input' : '' }
            type='text'
            value={input}
            onInput={e => setInput((e.target as HTMLInputElement).value)}
          />
        </div>
        <p className='card-header__left__list'>list: {list.title}</p>
      </div>
      <div className='card-header__right'>
        <button className='card-header__right__watch' onClick={handleWatchClick}>
          <VisibilityOutlinedIcon />
          Watch
        </button>
        <CloseIcon onClick={() => setModalOpen(false) } />
      </div>
    </div>
  )
}

export default CardHeader;
