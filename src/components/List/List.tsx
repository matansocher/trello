import { Card, DropdownMenu } from '../index';
import AddNewCard from '../AddNewCard/AddNewCard';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import WatchIcon from '@mui/icons-material/Watch';
import SortIcon from '@mui/icons-material/Sort';
import './List.scss'
import { IBoard, ICard, IList } from '../../models';
import { useBoard } from '../../context/board-context.tsx';
import { archiveList, sortList, addCardToList, removeCardFromList } from '../../services/data.service.tsx';
import { IDropdownItem } from '../../models/DropdownItem.tsx';

interface IListProps {
  list: IList;
}

function List({ list }: IListProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const { cards } = list;

  const handleArchiveList = () => {
    console.log('handleArchiveListClick');
    const newBoard = archiveList(board, list.id) as IBoard;
    updateBoardState(newBoard);
  }

  const handleSortList = () => {
    console.log('handleSortList');
    const newBoard = sortList(board, list) as IBoard;
    updateBoardState(newBoard);
  }

  const addNewCard = (card: ICard) => {
    const newBoard = addCardToList(board, list, card) as IBoard;
    updateBoardState(newBoard);
  }

  const archiveCard = (cardId: string) => {
    console.log('archiveCard', cardId);
    const newBoard = removeCardFromList(board, list, cardId) as IBoard;
    updateBoardState(newBoard);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Add card...', icon: <AddIcon fontSize='small' />, onClick: () => handleSortList(card.id) },
      { label: 'Copy list...', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleSortList(card.id) },
      { label: 'Move List...', icon: <DeleteIcon fontSize='small' />, onClick: () => handleSortList(card.id) },
      { label: 'Watch', icon: <WatchIcon fontSize='small' />, onClick: () => handleSortList(card.id) },
      { label: 'Sort by...', icon: <SortIcon fontSize='small' />, onClick: () => handleSortList(card.id) },
      { label: 'Archive list', icon: <DeleteIcon fontSize='small' />, onClick: handleArchiveList },
    ];
  }

  const renderCards = () => {
    return cards.map((card: ICard) => {
      return <Card key={card.id} card={card} archiveCard={archiveCard} />;
    })
  }

  return (
    <div className='list-wrapper'>
      <div className='list-wrapper__content'>
        <div className='list-wrapper__content__header'>
          <p className='header'>{list.title}</p>
          <DropdownMenu menuItems={getDropdownMenuItems()} />
        </div>
        <div className='list-wrapper__cards'>
          {renderCards()}
          <AddNewCard addNewCard={addNewCard} />
        </div>
      </div>
    </div>
  )
}

export default List;
