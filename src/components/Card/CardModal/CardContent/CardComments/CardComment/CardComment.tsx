import { useState } from 'react';
import { EllipsisText, Textarea, UserAvatar } from '@components';
import { IComment } from '@models';
import { UserAvatarSize } from '../../../../../UserAvatar/UserAvatar';
import './CardComment.scss';

interface ICardCommentProps {
  comment: IComment;
  handleCommentEdit: (comment: IComment, newDescription: string) => void;
  handleCommentDelete: (comment: IComment) => void;
}

function CardComment({ comment, handleCommentEdit, handleCommentDelete }: ICardCommentProps) {
  const [commentText, setCommentText] = useState(comment.description);
  const [isEditMode, setIsEditMode] = useState(false);
  const { description, userId, timestamp } = comment;

  const handleSaveEditedComment = () => {
    handleCommentEdit(comment, commentText);
    setIsEditMode(false);
  }

  const handleFocusChange = (isFocused: boolean) => {
    setIsEditMode(isFocused);
  }

  const handleInputChange = (newValue: string) => {
    setCommentText(newValue);
  }

  const handleDeleteCommentClick = () => {
    handleCommentDelete(comment);
  }

  const renderComment = () => {
    if (!isEditMode) {
      return <EllipsisText maxLines={10}>{description}</EllipsisText>
    }
    return <Textarea placeholder='Write a comment' text={commentText} handleFocusChange={handleFocusChange} handleInputChange={handleInputChange} />
  }

  const renderActionsSection = () => {
    if (isEditMode) {
      return (
        <>
          <button className='save-btn' onClick={() => handleSaveEditedComment()}>Save</button>
          <button className='cancel-btn' onClick={() => setIsEditMode(false)}>Cancel</button>
        </>
      );
    }
    return (
      <>
        <p className='edit-btn' onClick={() => setIsEditMode(true)}>Edit</p>
        <p className='delete-btn' onClick={() => handleDeleteCommentClick()}>Delete</p>
      </>
    );
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

        {renderComment()}

        <div className='comment__items__item__right__actions'>
          {renderActionsSection()}
        </div>
      </div>
    </div>
  )
}

export default CardComment;
