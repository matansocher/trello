import { ICard, IComment } from '@models';
import Comment from './Comment/Comment';
import './CardComments.scss'

interface ICardCommentsProps {
  card: ICard;
}

function CardComments({ card }: ICardCommentsProps) {

  const renderComments = () => {
    return card?.comments?.map((comment: IComment) => {
      return <Comment key={comment.id} comment={comment} />
    });
  }

  return (
    <div className='card-comments'>
      <div className='card-comments__comments'>
        {renderComments()}
      </div>
    </div>
  )
}

export default CardComments;
