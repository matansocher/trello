import {
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreHorizIcon,
  Watch as WatchIcon,
} from '@mui/icons-material';
import { DropdownMenu, EllipsisText } from '@components';
import { IDropdownItem, IList } from '@models';
import { dataService } from '@services';
import { useBoard } from '@context';
import './ListHeader.scss';
// import { useToggleFocus, useToggleHover } from '@hooks';

interface IListHeaderProps {
  list: IList;
}

function ListHeader({ list }: IListHeaderProps) {
  const { boardState: board, updateBoardState } = useBoard();
  // const [input, setInput] = useState(list.title as string);
  // const [isOpen, setIsOpen] = useState(true);
  // const [isFocused, focusEventHandlers] = useToggleFocus(false);
  // const [isHovered, hoverEventHandlers] = useToggleHover(false);

  // const handleOpenChange = (isFocused: boolean) => {
  //   setIsOpen(isFocused);
  // }

  // const handleListTitleUpdate = async (newTitle: string) => {
  //   await dataService.updateListTitle(list, newTitle);
  // }

  const handleCloneList = async () => {
    const newBoard = await dataService.cloneList(board, list);
    updateBoardState(newBoard);
  }

  const handleWatchList = () => {
    console.log('handleWatchList');
  }

  const handleArchiveList = async () => {
    const newBoard = await dataService.archiveList(board, list.id as string);
    updateBoardState(newBoard);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Clone list...', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleCloneList() },
      { label: 'Watch', icon: <WatchIcon fontSize='small' />, onClick: () => handleWatchList() },
      { label: 'Archive list', icon: <DeleteIcon fontSize='small' />, onClick: () => handleArchiveList() },
    ];
  }

  return (
    <>
      <EllipsisText maxLines={3}>{list.title}</EllipsisText>
      <DropdownMenu menuHeader='' menuIcon={<MoreHorizIcon/>} menuItems={getDropdownMenuItems()}/>
    </>
  );
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
