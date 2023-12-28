import { CardChecklistAdd, CardChecklistItem } from '@components';
import { useBoard } from '@context';
import { ICard, IChecklistItem, IList } from '@models';
import { dataService } from '@services';
import './CardChecklist.scss';
import { useGetBoard } from '@hooks';

interface ICardCheckListProps {
  list: IList;
  card: ICard;
}

function CardChecklist({ list, card }: ICardCheckListProps) {
  const { updateBoardState } = useBoard();
  const { board } = useGetBoard();

  const addNewChecklistItem = (checklistItem: IChecklistItem) => {
    const cardToSave = dataService.addNewChecklistItem(card, checklistItem);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const updateChecklistItem = (checklistItem: IChecklistItem) => {
    const cardToSave = dataService.updateChecklistItem(card, checklistItem);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const deleteChecklistItem = (checklistItem: IChecklistItem) => {
    const cardToSave = dataService.deleteChecklistItem(card, checklistItem);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const renderChecklistItems = () => {
    return (
      <>
        {card.checklistItems?.map((checklistItem: IChecklistItem) => {
          const key = Math.random();
          return <CardChecklistItem key={key} checklistItem={checklistItem} handleChecklistItemChange={updateChecklistItem} handleChecklistItemDelete={deleteChecklistItem} />;
        })}
      </>
    )
  }

  return (
    <div className='card-checklist'>
      <div className='card-checklist__items'>
        {renderChecklistItems()}
      </div>
      <CardChecklistAdd addNewChecklistItem={addNewChecklistItem} />
    </div>
  )
}

export default CardChecklist;
