import { useEffect, useState } from 'react';
import { Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';
import {
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreHorizIcon,
  Watch as WatchIcon,
} from '@mui/icons-material';
import { AddNewCard, CardPreview, DropdownMenu, EllipsisText, Loader } from '@components';
import { CurrentCardContextProvider, useBoard } from '@context';
import { LoaderSize, LIST_INITIAL_STATE } from '@constants';
import { ICard, IList, IDropdownItem, IBoard } from '@models';
import { firebaseService } from '@services';
import './List.scss';

interface IListProps {
  listId: string;
}

function List({ listId }: IListProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const [list, setList] = useState<IList>(LIST_INITIAL_STATE);
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!listId) {
      return;
    }

    const refreshList = async () => {
      setIsLoading(true);
      firebaseService.getListListener(listId, async (querySnapshot: any) => {
        const [list] = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
        setList(list);
        const cards = list?.cards?.length ? await firebaseService.getCards(list.cards) : [];
        setCards(cards);
        setIsLoading(false);
      });
    };

    refreshList();
  }, [listId]);

  const handleCloneList = async () => {
    // copy the cards in the cards collection
    // copy the list in the list collection
    // add the list id to the board lists array

    // $$$$$$$$$ we also need to copy the cards in the cards collection
    const clonedList = { ...list, title: `Copy of ${list.title}` } as IList;
    delete clonedList.id;
    await firebaseService.createList(clonedList);
    const newBoard = { ...board, lists: [...board.lists, listId] } as IBoard;
    await firebaseService.updateBoard(newBoard);
    updateBoardState(newBoard);
  }

  const handleWatchList = () => {
    console.log('handleWatchList');
  }

  const handleArchiveList = async () => {
    await firebaseService.archiveList(list.id);
    const newBoard = { ...board, lists: board.lists.filter((list: string) => list !== listId) } as IBoard;
    await firebaseService.updateBoard(newBoard);
    updateBoardState(newBoard);
  }

  const addNewCard = async (card: ICard) => {
    const { id: createdCardId } = await firebaseService.createCard(card);
    const newList = { ...list, cards: [...list.cards, createdCardId] } as IList;
    await firebaseService.updateList(newList);
  }

  const cloneCard = async (card: ICard) => {
    const clonedCard = { ...card, title: `Copy of ${card.title}`, createdAt: new Date().toISOString().slice(0, 10) } as ICard;
    delete clonedCard.id;
    const { id: createdCardId } = await firebaseService.createCard(clonedCard);
    const newList = { ...list, cards: [...list.cards, createdCardId] } as IList;
    await firebaseService.updateList(newList);
  }

  const archiveCard = async (cardId: string) => {
    await firebaseService.archiveCard(cardId);/**/
    const newList = { ...list, cards: list.cards.filter((card: string) => card !== cardId) };
    await firebaseService.updateList(newList);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Clone list...', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleCloneList() },
      { label: 'Watch', icon: <WatchIcon fontSize='small' />, onClick: () => handleWatchList() },
      { label: 'Archive list', icon: <DeleteIcon fontSize='small' />, onClick: () => handleArchiveList() },
    ];
  }

  const renderCards = () => {
    return cards?.map((card: ICard, index: number) => {
      return (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <CardPreview card={card} list={list} cloneCard={cloneCard} archiveCard={archiveCard} />
            </div>
          )}
        </Draggable>
      );
    })
  }

  return (
    <CurrentCardContextProvider>
      <div className='list-wrapper'>
        {!list || isLoading ? <div className='loader-container'><Loader size={LoaderSize.M} /></div> :
          <div className='list-wrapper__content'>
            <div className='list-wrapper__content__header'>
              <EllipsisText maxLines={3}>{list.title}</EllipsisText>
              <DropdownMenu menuHeader='' menuIcon={<MoreHorizIcon/>} menuItems={getDropdownMenuItems()}/>
            </div>
            <div className='list-wrapper__content__cards'>
              <Droppable droppableId={list.id} direction='vertical' type='group'>
                {(provided: DroppableProvided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderCards()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className='list-wrapper__content__add-new'>
              <AddNewCard addNewCard={addNewCard}/>
            </div>
          </div>}
      </div>
    </CurrentCardContextProvider>
  )
}

export default List;
