import { ICard } from '@models';
import CardActivity from './CardActivity/CardActivity';
import CardDescription from './CardDescription/CardDescription';
import './CardContent.scss'

interface ICardContentProps {
  card: ICard;
}

function CardContent({ card }: ICardContentProps) {
  return (
    <div className='card-modal__content__right__sections'>
      <div className='card-modal__content__right__sections__section'>
        <p className='subheader'>Description</p>
        <CardDescription card={card} />
      </div>
      <div className='card-modal__content__right__sections__section'>
        <p className='subheader'>Activity</p>
        <CardActivity card={card} />
      </div>
    </div>
  )
}

export default CardContent;
