import { useEffect, useState } from 'react';
import { Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';

import { AddNewCard, CardPreview, ListHeader, Loader } from '@components';
import { CurrentCardContextProvider } from '@context';
import { LoaderSize, LIST_INITIAL_STATE } from '@constants';
import { ICard, IList } from '@models';
import { dataService, utilsService } from '@services';
import { useGetList } from '@hooks';
import './List.scss';

interface IListProps {
  listIdToFetch: string;
}

function List({ listIdToFetch }: IListProps) {
  const [listId, setListId] = useState(listIdToFetch);
  const { list: listFromDb, cards, loading } = useGetList(listId);
  const [list, setList] = useState<IList>(LIST_INITIAL_STATE);

  useEffect(()=>{
    setList(listFromDb);
  },[listFromDb]);

  const refreshList = async () => {
    setListId(''); // unset and then set listId so useGetList will fetch the list again
    setTimeout(() => setListId(listIdToFetch), 0);
  }

  const addNewCardToList = async (card: ICard) => {
    await dataService.addNewCardToList(list, card);
  }

  const cloneCard = async (card: ICard) => {
    await dataService.cloneCard(list, card);
  }

  const archiveCard = async (card: ICard) => {
    await dataService.archiveCard(list, card);
  }

  const moveToTop = async (card: ICard) => {
    dataService.moveCardToTop(list, card);
  }

  const moveToBottom = async (card: ICard) => {
    dataService.moveCardToBottom(list, card);
  }

  const renderCards = () => {
    const cardsToRender = utilsService.sortCardsByListOrder(list.cards, cards);
    return cardsToRender?.map((card: ICard, index: number) => {
      return (
        <Draggable key={card.id} draggableId={`card_${card.id}`} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <CardPreview
                card={card}
                list={list}
                refreshList={refreshList}
                moveToTop={moveToTop}
                moveToBottom={moveToBottom}
                cloneCard={cloneCard}
                archiveCard={archiveCard} />
            </div>
          )}
        </Draggable>
      );
    })
  }

  return (
    <CurrentCardContextProvider>
      <div className='list-wrapper'>
        {!list || loading ? <div className='loader-container'><Loader size={LoaderSize.M} /></div> : null}
        <div className='list-wrapper__content'>
          <div className='list-wrapper__content__header'>
            <ListHeader list={list} />
          </div>
          {list?.id ? <div className='list-wrapper__content__cards'>
            <Droppable droppableId={`list_${list.id}`} direction='vertical' type='list'>
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {renderCards()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div> : null}
          <div className='list-wrapper__content__add-new'>
            <AddNewCard addNewCardToList={addNewCardToList}/>
          </div>
        </div>
      </div>
    </CurrentCardContextProvider>
  )
}

export default List;
