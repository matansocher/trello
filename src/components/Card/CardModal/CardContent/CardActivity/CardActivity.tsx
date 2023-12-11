import { ICard } from '@models';
import './CardActivity.scss';

interface ICardActivityProps {
  card: ICard;
}

function CardActivity({ card }: ICardActivityProps) {
  console.log(card);
  return (
    <div className='card-activities'>
      <div className='card-activities__activity'>

      </div>
    </div>
  )
}

export default CardActivity;
