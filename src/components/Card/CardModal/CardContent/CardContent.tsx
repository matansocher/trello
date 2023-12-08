import { ICard, IList } from '@models';
import CardActivity from './CardActivity/CardActivity';
import CardDescription from './CardDescription/CardDescription';
import CardInfo from './CardInfo/CardInfo';
import './CardContent.scss'

interface ICardContentProps {
  list: IList;
  card: ICard;
}

function CardContent({ list, card }: ICardContentProps) {
  return (
    <div className='card-modal__content__right__sections'>
      <div className='card-modal__content__right__sections__section'>
        <CardInfo card={card} />
      </div>
      <div className='card-modal__content__right__sections__section'>
        <p className='subheader'>Description</p>
        <CardDescription list={list} card={card} />
      </div>
      <div className='card-modal__content__right__sections__section'>
        <p className='subheader'>Activity</p>
        <CardActivity card={card} />
      </div>
    </div>
  )
}

export default CardContent;
