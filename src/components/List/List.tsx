import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddNewCard from '../AddNewCard/AddNewCard';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import WatchIcon from '@mui/icons-material/Watch';
import SortIcon from '@mui/icons-material/Sort';
import { useBoard } from '@context';
import { IBoard, ICard, IList, IDropdownItem } from '@models';
import { archiveList, sortList, addCardToList, removeCardFromList } from '@services';
import { CardPreview, DropdownMenu } from '../index';
import './List.scss'

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

  const handleCopyList = () => {
    console.log('handleCopyList');
    // const newBoard = board;
    // updateBoardState(newBoard);
  }

  const handleMoveList = () => {
    console.log('handleMoveList');
    // const newBoard = board;
    // updateBoardState(newBoard);
  }

  const handleWatch = () => {
    console.log('handleWatch');
    // const newBoard = board;
    // updateBoardState(newBoard);
  }

  const handleAddCard = () => {
    console.log('handleAddCard');
    // const newBoard = board;
    // updateBoardState(newBoard);
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
      { label: 'Add card...', icon: <AddIcon fontSize='small' />, onClick: () => handleAddCard() },
      { label: 'Copy list...', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleCopyList() },
      { label: 'Move List...', icon: <DeleteIcon fontSize='small' />, onClick: () => handleMoveList() },
      { label: 'Watch', icon: <WatchIcon fontSize='small' />, onClick: () => handleWatch() },
      { label: 'Sort by...', icon: <SortIcon fontSize='small' />, onClick: () => handleSortList() },
      { label: 'Archive list', icon: <DeleteIcon fontSize='small' />, onClick: () => handleArchiveList() },
    ];
  }

  const renderCards = () => {
    return cards.map((card: ICard, index: number) => {
      return (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <CardPreview card={card} list={list} archiveCard={archiveCard} />
            </div>
          )}
        </Draggable>
      );
    })
  }

  return (
    <div className='list-wrapper'>
      <div className='list-wrapper__content'>
        <div className='list-wrapper__content__header'>
          <p className='header'>{list.title}</p>
          <DropdownMenu menuItems={getDropdownMenuItems()} />
        </div>
        <div className='list-wrapper__content__cards'>
          <Droppable droppableId={list.id} direction='vertical' type='group'>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {renderCards()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <AddNewCard addNewCard={addNewCard} />
        </div>
      </div>
    </div>
  )
}

export default List;
