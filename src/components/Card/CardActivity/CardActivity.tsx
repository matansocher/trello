import './CardActivity.scss'
import { ICard } from '../../../models';
import { CardActions, CardContent } from "../";

interface ICardActivityProps {
  card: ICard;
}

function CardActivity({ card }: ICardActivityProps) {
  return (
    <div>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
    </div>
  )
}

export default CardActivity;
