import { ICard } from '@models';
import './CardActivity.scss'

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
