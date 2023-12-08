import { ICard, IComment } from '@models';
import Comment from './Comment/Comment';
import './CardActivity.scss'

interface ICardActivityProps {
  card: ICard;
}

function CardActivity({ card }: ICardActivityProps) {

  const renderComments = () => {
    return card?.comments?.map((comment: IComment) => {
      return <Comment key={comment.id} comment={comment} />
    });
  }

  return (
    <div className='card-activity'>
      <div className='card-activity__comments'>
        {renderComments()}
      </div>
    </div>
  )
}

export default CardActivity;
