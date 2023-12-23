import { IComment } from '@models';
import './CardComment.scss';
import { EllipsisText, UserAvatar } from '@components';
import { UserAvatarSize } from '../../../../../UserAvatar/UserAvatar';

interface ICardCommentProps {
  comment: IComment;
  handleCommentEdit: (comment: IComment, newDescription: string) => void;
  handleCommentDelete: (comment: IComment) => void;
}

function CardComment({ comment, handleCommentEdit, handleCommentDelete }: ICardCommentProps) {
  const { description, userId, timestamp } = comment;

  const handleEditCommentClick = () => {
    console.log('edit comment');
    handleCommentEdit(comment, 'new description');
  }

  const handleDeleteCommentClick = () => {
    handleCommentDelete(comment);
  }

  return (
    <div className='comment__items__item'>
      <div className='comment__items__item__left'>
        <UserAvatar user={null} size={UserAvatarSize.M} />
      </div>
      <div className='comment__items__item__right'>
        <div className='comment__items__item__right__author'>
          <p className='name'>{userId}</p>
          <p className='date'>{timestamp}</p>
        </div>

        <EllipsisText maxLines={10}>{description}</EllipsisText>

        <div className='comment__items__item__right__actions'>
          <p className='edit-btn' onClick={() => handleEditCommentClick()}>Edit</p>
          <p className='delete-btn' onClick={() => handleDeleteCommentClick()}>Delete</p>
        </div>
      </div>
    </div>
  )
}

export default CardComment;
