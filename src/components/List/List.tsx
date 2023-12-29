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
import { useGetBoard } from '@hooks';
import { IBoard, ICard, IList, IDropdownItem } from '@models';
import { dataService, firebaseService } from '@services';
import './List.scss';

interface IListProps {
  listId: string;
}

function List({ listId }: IListProps) {
  const { updateBoardState } = useBoard();
  const { board } = useGetBoard();
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
        const cards = await firebaseService.getCards(list.cards);
        setCards(cards);
        setIsLoading(false);
      });
    };

    refreshList();
  }, [listId]);

  const handleArchiveList = () => {
    console.log('handleArchiveListClick');
    const newBoard = dataService.archiveList(board, listId) as IBoard;
    updateBoardState(newBoard);
  }

  const handleCopyList = () => {
    console.log('handleCopyList');
    const newBoard = dataService.copyList(board, listId) as IBoard;
    updateBoardState(newBoard);
  }

  const handleWatch = () => {
    console.log('handleWatch');
    // const newBoard = board;
    // updateBoardState(newBoard);
  }

  const addNewCard = (card: ICard) => {
    const newBoard = dataService.addCardToList(board, list, card) as IBoard;
    updateBoardState(newBoard);
  }

  const copyCard = (card: ICard) => {
    const newCard = { ...card, id: `cardId_${Math.random()}`, title: `Copy of ${card.title}` };
    const newBoard = dataService.addCardToList(board, list, newCard) as IBoard;
    updateBoardState(newBoard);
  }

  const archiveCard = (cardId: string) => {
    const newBoard = dataService.removeCardFromList(board, list, cardId) as IBoard;
    updateBoardState(newBoard);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Copy list...', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleCopyList() },
      { label: 'Watch', icon: <WatchIcon fontSize='small' />, onClick: () => handleWatch() },
      { label: 'Archive list', icon: <DeleteIcon fontSize='small' />, onClick: () => handleArchiveList() },
    ];
  }

  const renderCards = () => {
    return cards?.map((card: ICard, index: number) => {
      return (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <CardPreview card={card} list={list} copyCard={copyCard} archiveCard={archiveCard} />
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
