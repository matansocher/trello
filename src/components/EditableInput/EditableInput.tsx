import { useEffect, useState } from 'react';
import { useToggleFocus } from '@hooks';
import './EditableInput.scss';

interface EditableInputProps {
  handleSave: (newValue: string) => void;
  initialValue: string;
}

function EditableInput({ handleSave, initialValue = '' }: EditableInputProps) {
  const [input, setInput] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, focusEventHandlers] = useToggleFocus(false);

  useEffect(() => {
    if (!isFocused) { // outside clicked
      if (isOpen) {
        if (initialValue === input) {
          setIsOpen(false);
          return; // text was not changed
        }
        handleSave(input);
        setIsOpen(false);
      }
    } else { // inside clicked
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  }, [isFocused]);

  return (
    <div className='editable-input-wrapper'>
      <input
        {...(focusEventHandlers as Object)}
        className={ !isOpen ? 'closed-input' : '' }
        type='text'
        value={input}
        onInput={e => setInput((e.target as HTMLInputElement).value)}
      />
    </div>
  )
}

export default EditableInput;
