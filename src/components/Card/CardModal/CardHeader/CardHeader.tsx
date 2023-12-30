import {
  CreditCardOutlined as CreditCardOutlinedIcon,
  Close as CloseIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import { EditableInput } from '@components';
import { useCurrentCard } from '@context';
import { IList } from '@models';
import { dataService } from '@services';
import './CardHeader.scss';

interface ICardHeaderProps {
  list: IList;
  setModalOpen: (modalOpen: boolean) => void;
}

function CardHeader({ list, setModalOpen }: ICardHeaderProps) {
  const { currentCard: card, updateCurrentCard } = useCurrentCard();

  const handleSave = async (title: string) => {
    const cardToSave = await dataService.updateCardTitle(card, title);
    updateCurrentCard(cardToSave);
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
