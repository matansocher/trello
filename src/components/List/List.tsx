import { useEffect, useState } from 'react';
import { Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { AddNewCard, CardPreview, ListHeader, Loader } from '@components';
import { LoaderSize, LIST_INITIAL_STATE } from '@constants';
import { CurrentCardContextProvider, useBoard } from '@context';
import { useGetList } from '@hooks';
import { ICard, IList } from '@models';
import { firebaseService, utilsService } from '@services';
import './List.scss';

interface IListProps {
  listIdToFetch: string;
}

function List({ listIdToFetch }: IListProps) {
  const { boardState: board } = useBoard();
  const { list: listFromDb, cards, loading } = useGetList(listIdToFetch);
  const [list, setList] = useState<IList>(LIST_INITIAL_STATE);

  useEffect(()=>{
    setList(listFromDb);
  },[listFromDb]);

  const addNewCardToList = async (card: ICard) => {
    await firebaseService.addNewCardToList(list, card);
  }

  const cloneCard = async (card: ICard) => {
    await firebaseService.cloneCard(list, card);
  }

  const archiveCard = async (card: ICard) => {
    await firebaseService.archiveCard(board.id as string, list, card);
  }

  const moveToTop = async (card: ICard) => {
    firebaseService.moveCardToTop(list, card);
  }

  const moveToBottom = async (card: ICard) => {
    firebaseService.moveCardToBottom(list, card);
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
            <Droppable droppableId={`list_${list.id}`} type='list' direction='vertical'>
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
