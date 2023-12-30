import { useState } from 'react';
import { EditableInput, EllipsisText, Textarea } from '@components';
import { IList } from '@models';
import './ListHeader.scss';
// import { useToggleFocus, useToggleHover } from '@hooks';

interface IListHeaderProps {
  list: IList;
}

function ListHeader({ list }: IListHeaderProps) {
  // const [input, setInput] = useState(list.title || '');
  // const [isOpen, setIsOpen] = useState(true);
  // const [isFocused, focusEventHandlers] = useToggleFocus(false);
  // const [isHovered, hoverEventHandlers] = useToggleHover(false);

  // const handleOpenChange = (isFocused: boolean) => {
  //   setIsOpen(isFocused);
  // }

  return <EllipsisText maxLines={3}>{list.title}</EllipsisText>;
  // return (
  //   <div className={`list-header ${isHovered ? 'list-header-open' : 'list-header-closed'}`} {...(hoverEventHandlers as Object)}>
  //     {isHovered ?
  //       <EditableInput handleSave={setInput} initialValue={input} fontSize={14} /> :
  //       <Textarea placeholder='Add a list title…' text={input} handleFocusChange={handleOpenChange} handleInputChange={setInput}/> :
        // <p>{list.title}</p>
      // }
    // </div>
  // )
}

export default ListHeader;
