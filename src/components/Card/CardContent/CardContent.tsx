import './CardContent.scss'
import { ICard } from '../../../models';
import { CardDescription, CardActivity } from "../";

interface ICardContentProps {
  card: ICard;
}

function CardContent({ card }: ICardContentProps) {
  return (
    <div className='card-details__content__right__sections'>
      <div className='card-details__content__right__sections__section'>
        <p className='subheader'>Description</p>
        <CardDescription card={card} />
      </div>
      <div className='card-details__content__right__sections__section'>
        <p className='subheader'>Activity</p>
        <CardActivity card={card} />
      </div>
    </div>
  )
}

export default CardContent;
