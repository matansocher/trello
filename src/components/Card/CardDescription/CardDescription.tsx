import './CardDescription.scss'
import { ICard } from '@models';

interface ICardDescriptionProps {
  card: ICard;
}

function CardDescription({ card }: ICardDescriptionProps) {
  return (
    <div>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</p>
    </div>
  )
}

export default CardDescription;
