import {
  CreditCardOutlined as CreditCardOutlinedIcon,
  Close as CloseIcon,
  VisibilityOutlined as VisibilityOutlinedIcon
} from '@mui/icons-material';
import { EditableInput } from '@components';
import { useCurrentCard } from '@context';
import { dataService } from '@services';
import './CardHeader.scss';

interface ICardHeaderProps {
  listTitle: string;
  handleCloseModal: () => void;
}

function CardHeader({ listTitle, handleCloseModal }: ICardHeaderProps) {
  const { currentCard: card } = useCurrentCard();

  const handleSave = async (title: string) => {
    dataService.updateCardTitle(card, title);
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
        <p className='card-header__left__list'>list: {listTitle}</p>
      </div>
      <div className='card-header__right'>
        <button className='card-header__right__watch' onClick={handleWatchClick}>
          <VisibilityOutlinedIcon />
          Watch
        </button>
        <CloseIcon onClick={handleCloseModal} />
      </div>
    </div>
  )
}

export default CardHeader;
