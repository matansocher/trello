import {
  CreditCardOutlined as CreditCardOutlinedIcon,
  Close as CloseIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import { EditableInput } from '@components';
import { useBoard } from '@context';
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

  const handleSave = (newValue: string) => {
    const newCard = { ...card, title: newValue };
    const newBoard = dataService.saveCard(board, list.id, newCard);
    updateBoardState(newBoard);
  }

  const handleWatchClick = () => {
    console.log('handleWatchClick');
  }

  return (
    <div className='card-header'>
      <div className='header-icon'><CreditCardOutlinedIcon /></div>
      <div className='card-header__left'>
        <div className='card-header__left__title'>
          <EditableInput handleSave={handleSave} initialValue={card.title} />
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
