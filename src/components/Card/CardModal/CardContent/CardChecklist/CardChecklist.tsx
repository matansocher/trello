import { CardChecklistItem } from '@components';
import { useBoard } from '@context';
import { ICard, IChecklistItem, IList } from '@models';
import { dataService } from '@services';
import './CardChecklist.scss';

interface ICardCheckListProps {
  list: IList;
  card: ICard;
}

function CardChecklist({ list, card }: ICardCheckListProps) {
  const { boardState: board, updateBoardState } = useBoard();

  const handleChecklistItemChange = (checklistItem: IChecklistItem) => {
    const checklistItems = card.checklistItems || [];
    const newChecklistItems = checklistItems.map((item: IChecklistItem) => item.id === checklistItem.id ? checklistItem : item);
    const cardToSave = { ...card, checklistItems: newChecklistItems };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const renderChecklistItems = () => {
    return (
      <>
        {card.checklistItems?.map((checklistItem: IChecklistItem) => {
          return <CardChecklistItem key={checklistItem.id} checklistItem={checklistItem} handleChecklistItemChange={handleChecklistItemChange} />;
        })}
      </>
    )
  }

  return (
    <div className='card-checklist'>
      <div className='card-checklist__items'>
        {renderChecklistItems()}
      </div>
    </div>
  )
}

export default CardChecklist;
