import {
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreHorizIcon,
  Watch as WatchIcon,
} from '@mui/icons-material';
import { DropdownMenu, EditableInput } from '@components';
import { useBoard } from '@context';
import { IDropdownItem, IList } from '@models';
import { dataService } from '@services';
import './ListHeader.scss';

interface IListHeaderProps {
  list: IList;
}

function ListHeader({ list }: IListHeaderProps) {
  const { boardState: board, updateBoardState } = useBoard();

  const handleTitleSave = async (newValue: string) => {
    dataService.updateListTitle(list, newValue);
  }

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
      <EditableInput handleSave={handleTitleSave} initialValue={list?.title} fontSize={16} />
      <DropdownMenu menuHeader='' menuIcon={<MoreHorizIcon/>} menuItems={getDropdownMenuItems()}/>
    </>
  );
}

export default ListHeader;
