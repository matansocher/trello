import { useEffect, ChangeEvent } from 'react';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base';
import { useToggleFocus } from '@hooks';
import './Textarea.scss';

interface ITextareaProps {
  placeholder: string;
  text: string;
  handleFocusChange: (isFocused: boolean) => void;
  handleInputChange: (newValue: string) => void;
  maxRows?: number;
}

function Textarea({ placeholder, text, handleFocusChange, handleInputChange, maxRows = 10 }: ITextareaProps) {
  const [isFocused, focusEventHandlers] = useToggleFocus(false);

  useEffect(() => {
    if (isFocused) {
      handleFocusChange(isFocused as boolean);
    }
  }, [isFocused]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(event.target.value)
  };

  return (
    <div className='textarea-wrapper'>
      <BaseTextareaAutosize
        maxRows={maxRows}
        {...(focusEventHandlers as Object)}
        aria-label='maximum height'
        placeholder={placeholder}
        value={text}
        onChange={handleTextChange}
      />
    </div>
  )
}

export default Textarea;
