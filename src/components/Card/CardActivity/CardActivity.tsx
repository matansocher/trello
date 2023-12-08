import './CardActivity.scss'
import { ICard } from '@models';

interface ICardActivityProps {
  card: ICard;
}

function CardActivity({ card }: ICardActivityProps) {
  return (
    <div>
      <p>{card.title}</p>
    </div>
  )
}

export default CardActivity;
