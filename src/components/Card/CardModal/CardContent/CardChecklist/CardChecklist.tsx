import { CardChecklistAdd, CardChecklistItem } from '@components';
import { useCurrentCard } from '@context';
import { IChecklistItem } from '@models';
import { firebaseService } from '@services';
import './CardChecklist.scss';

interface ICardCheckListProps {

}

function CardChecklist({}: ICardCheckListProps) {
  const { currentCard: card } = useCurrentCard();

  const addNewChecklistItem = async (checklistItem: IChecklistItem) => {
    firebaseService.addNewChecklistItem(card, checklistItem);
  }

  const updateChecklistItem = async (checklistItem: IChecklistItem) => {
    firebaseService.updateChecklistItem(card, checklistItem);
  }

  const deleteChecklistItem = async (checklistItem: IChecklistItem) => {
    firebaseService.deleteChecklistItem(card, checklistItem);
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
