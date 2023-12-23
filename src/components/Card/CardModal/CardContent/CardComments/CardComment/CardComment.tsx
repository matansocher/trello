import { useRef, useState } from 'react';
import { EllipsisText, UserAvatar } from '@components';
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
  const textareaRef = useRef();
  const { description, userId, timestamp } = comment;

  const handleSaveEditedComment = () => {
    handleCommentEdit(comment, commentText);
    setIsEditMode(false);
    adjustTextareaHeight();
  }

  const handleInputChange = () => {
    const textarea = textareaRef.current as any;
    setCommentText(textarea.value);
    adjustTextareaHeight();
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current as any;
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const handleDeleteCommentClick = () => {
    handleCommentDelete(comment);
  }

  const renderComment = () => {
    if (isEditMode) {
      return (
        <textarea
          ref={textareaRef as any}
          rows={1}
          placeholder='Write a comment'
          value={commentText}
          className='editable-input'
          onInput={handleInputChange}
        />
      );
    }
    return (
      <EllipsisText maxLines={10}>{description}</EllipsisText>
    )
  }

  const renderActionsSection = () => {
    if (isEditMode) {
      return (
        <div className='comment__items__item__right__actions'>
          <button className='save-btn' onClick={() => handleSaveEditedComment()}>Save</button>
          <button className='cancel-btn' onClick={() => setIsEditMode(false)}>Cancel</button>
        </div>
      );
    }
    return (
      <div className='comment__items__item__right__actions'>
        <p className='edit-btn' onClick={() => setIsEditMode(true)}>Edit</p>
        <p className='delete-btn' onClick={() => handleDeleteCommentClick()}>Delete</p>
      </div>
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

        {renderActionsSection()}
      </div>
    </div>
  )
}

export default CardComment;
