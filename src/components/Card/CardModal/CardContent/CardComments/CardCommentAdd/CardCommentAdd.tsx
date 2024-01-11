import { useState } from 'react';
import { Textarea, UserAvatar } from '@components';
import { UserAvatarSize } from '@constants';
import { IComment } from '@models';
import './CardCommentAdd.scss';
import { useUser } from '@context';
import { utilsService } from '@services';

interface ICardCommentAddProps {
  addNewComment: (comment: IComment) => void;
}

function CardCommentAdd({ addNewComment }: ICardCommentAddProps) {
  const { user } = useUser();
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
    const id = utilsService.generateId();
    const timestamp = new Date().toISOString().slice(0, 10);
    const newComment: IComment = { id, description: input, timestamp, userId: user.id };
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
        <UserAvatar user={null} size={UserAvatarSize.S} />
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
