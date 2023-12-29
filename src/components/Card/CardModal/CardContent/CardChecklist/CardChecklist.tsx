import { CardChecklistAdd, CardChecklistItem } from '@components';
import { useBoard, useCurrentCard } from '@context';
import { useGetBoard } from '@hooks';
import { IChecklistItem, IList } from '@models';
import { dataService } from '@services';
import './CardChecklist.scss';

interface ICardCheckListProps {
  list: IList;
}

function CardChecklist({ list }: ICardCheckListProps) {
  const { updateBoardState } = useBoard();
  const { board } = useGetBoard();
  const { currentCard: card } = useCurrentCard();

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
