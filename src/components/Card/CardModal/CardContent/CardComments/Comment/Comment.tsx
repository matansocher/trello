import { IComment } from '@models';
import './Comment.scss';

interface ICommentProps {
  comment: IComment
}

function Comment({ comment }: ICommentProps) {
  return (
    <div className='comment' key={comment.userId}>
      <p className='comment__author'>{comment.commentDescription}</p>
      <p className='comment__text'>{comment.timestamp}</p>
    </div>
  )
}

export default Comment;
