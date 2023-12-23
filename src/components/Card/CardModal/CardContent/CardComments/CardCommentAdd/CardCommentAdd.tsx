import { useEffect, useState, useRef } from 'react';
import { Textarea, UserAvatar } from '@components';
import { useToggleFocus } from '@hooks';
import { IComment } from '@models';
import { UserAvatarSize } from '../../../../../UserAvatar/UserAvatar';
import './CardCommentAdd.scss';

interface ICardCommentAddProps {
  addNewComment: (comment: IComment) => void;
}

function CardCommentAdd({ addNewComment }: ICardCommentAddProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, focusEventHandlers] = useToggleFocus(false);
  const textareaRef = useRef();

  useEffect(() => {
    if (isFocused) {
      setIsOpen(true);
    }
  }, [isFocused]);

  const handleInputChange = () => {
    const textarea = textareaRef.current as any;
    setInput(textarea.value);
    adjustTextareaHeight();
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current as any;
    textarea.style.height = `${textarea.scrollHeight}px`;
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
    adjustTextareaHeight();
  }

  const handleCancelCommentClick = () => {
    setIsOpen(false);
    setInput('');
    adjustTextareaHeight();
  }

  return (
    <div className='add-new-comment'>
      <div className='add-new-comment__left'>
        <UserAvatar user={null} size={UserAvatarSize.M} />
      </div>
      <div className='add-new-comment__right'>
        <textarea
          ref={textareaRef as any}
          rows={1}
          placeholder='Write a comment'
          value={input}
          className='editable-input'
          {...(focusEventHandlers as Object)}
          onInput={handleInputChange}
        />
        <p>textarea</p>
        <Textarea maxLines={10}>{input}</Textarea>
        {isOpen ? <div className='add-new-comment__right__actions'>
          <button className='save-btn' onClick={() => handleAddCommentClick()}>Add</button>
          <button className='cancel-btn' onClick={() => handleCancelCommentClick()}>Cancel</button>
        </div> : null}
      </div>
    </div>
  )
}

export default CardCommentAdd;
