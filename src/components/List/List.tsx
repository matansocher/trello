import { Card, DropdownMenu } from '../index';
import AddNewCard from '../AddNewCard/AddNewCard';
import DeleteIcon from '@mui/icons-material/Delete';
import './List.scss'
import { IBoard, ICard, IList } from '../../models';
import { useBoard } from '../../context/board-context.tsx';
import { addCardToList, removeCardFromList } from '../../services/data.service.tsx';
import { IDropdownItem } from '../../models/DropdownItem.tsx';

interface IListProps {
  list: IList;
}

function List({ list }: IListProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const { cards } = list;

  const archiveList = () => {
    console.log('handleArchiveListClick');
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
      { label: 'Archive List', icon: <DeleteIcon fontSize='small' />, onClick: archiveList }
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
