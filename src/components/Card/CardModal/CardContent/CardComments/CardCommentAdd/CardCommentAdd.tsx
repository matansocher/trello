import { useState } from 'react';
import { Textarea, UserAvatar } from '@components';
import { IComment } from '@models';
import { UserAvatarSize } from '../../../../../UserAvatar/UserAvatar';
import './CardCommentAdd.scss';

interface ICardCommentAddProps {
  addNewComment: (comment: IComment) => void;
}

function CardCommentAdd({ addNewComment }: ICardCommentAddProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (newValue: string) => {
    setInput(newValue);
  }

  const handleFocusChange = (isFocused: boolean) => {
    setIsOpen(isFocused);
  }

  const handleAddCommentClick = () => {
    if (!input?.length) {
      setIsOpen(false);
      return;
    }
    const newComment: IComment = { id: 'comment_11', description: input, timestamp: '2021-10-10', userId: 'user_1' };
    addNewComment(newComment);
    setIsOpen(false);
    setInput('');
  }

  const handleCancelCommentClick = () => {
    setIsOpen(false);
    setInput('');
  }

  return (
    <div className='add-new-comment'>
      <div className='add-new-comment__left'>
        <UserAvatar user={null} size={UserAvatarSize.M} />
      </div>
      <div className='add-new-comment__right'>
        <Textarea placeholder='Write a comment' text={input} handleFocusChange={handleFocusChange} handleInputChange={handleInputChange} />
        {isOpen ? <div className='add-new-comment__right__actions'>
          <button className='save-btn' onClick={() => handleAddCommentClick()}>Add</button>
          <button className='cancel-btn' onClick={() => handleCancelCommentClick()}>Cancel</button>
        </div> : null}
      </div>
    </div>
  )
}

export default CardCommentAdd;
