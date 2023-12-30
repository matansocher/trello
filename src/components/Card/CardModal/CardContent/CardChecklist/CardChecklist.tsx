import { CardChecklistAdd, CardChecklistItem } from '@components';
import { useCurrentCard } from '@context';
import { IChecklistItem } from '@models';
import { dataService, firebaseService } from '@services';
import './CardChecklist.scss';

interface ICardCheckListProps {

}

function CardChecklist({}: ICardCheckListProps) {
  const { currentCard: card, updateCurrentCard } = useCurrentCard();

  const addNewChecklistItem = async (checklistItem: IChecklistItem) => {
    const cardToSave = dataService.addNewChecklistItem(card, checklistItem);
    await firebaseService.updateCard(cardToSave);
    updateCurrentCard(cardToSave);
  }

  const updateChecklistItem = async (checklistItem: IChecklistItem) => {
    const cardToSave = dataService.updateChecklistItem(card, checklistItem);
    await firebaseService.updateCard(cardToSave);
    updateCurrentCard(cardToSave);
  }

  const deleteChecklistItem = async (checklistItem: IChecklistItem) => {
    const cardToSave = dataService.deleteChecklistItem(card, checklistItem);
    await firebaseService.updateCard(cardToSave);
    updateCurrentCard(cardToSave);
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
