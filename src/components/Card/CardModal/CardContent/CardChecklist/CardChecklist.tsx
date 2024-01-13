import { DragDropContext, Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { CardChecklistAdd, CardChecklistItem } from '@components';
import { useCurrentCard } from '@context';
import { IChecklistItem } from '@models';
import { dndService, firebaseService } from '@services';
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

  const onDragEnd = async (result: any) => {
    await dndService.checklistDragEndHandler(card, result);
  }

  const renderChecklistItems = () => {
    return card.checklistItems?.map((checklistItem: IChecklistItem, index: number) => {
      return (
        <Draggable key={checklistItem.id} draggableId={`checklistItem_${checklistItem.id}`} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <CardChecklistItem
                checklistItem={checklistItem}
                handleChecklistItemChange={updateChecklistItem}
                handleChecklistItemDelete={deleteChecklistItem}
              />
            </div>
          )}
        </Draggable>
      )
    });
  }

  return (
    <div className='card-checklist'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='checklist' type='checklist' direction='vertical'>
          {(provided: DroppableProvided) => (
            <div className='card-checklist__items' ref={provided.innerRef} {...provided.droppableProps}>
              {renderChecklistItems()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      <CardChecklistAdd addNewChecklistItem={addNewChecklistItem} />
      </DragDropContext>
    </div>
  )
}

export default CardChecklist;
