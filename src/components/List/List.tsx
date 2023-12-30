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
import { ICard, IList, IDropdownItem } from '@models';
import { dataService } from '@services';
import { useGetList } from '@hooks';
import './List.scss';

interface IListProps {
  listIdToFetch: string;
}

function List({ listIdToFetch }: IListProps) {
  const [listId, setListId] = useState(listIdToFetch);
  const { boardState: board, updateBoardState } = useBoard();
  const { list: listFromDb, cards, loading } = useGetList(listId);
  const [list, setList] = useState<IList>(LIST_INITIAL_STATE);

  useEffect(()=>{
    setList(listFromDb);
  },[listFromDb])

  const refreshList = async () => {
    setListId('');
    setTimeout(() => setListId(listIdToFetch), 0);
  }

  const handleCloneList = async () => {
    const newBoard = await dataService.cloneList(board, list);
    updateBoardState(newBoard);
  }

  const handleWatchList = () => {
    console.log('handleWatchList');
  }

  const handleArchiveList = async () => {
    const newBoard = await dataService.archiveList(board, listId);
    updateBoardState(newBoard);
  }

  const addNewCardToList = async (card: ICard) => {
    await dataService.addNewCardToList(list, card);
  }

  const cloneCard = async (card: ICard) => {
    await dataService.cloneCard(list, card);
  }

  const archiveCard = async (cardId: string) => {
    await dataService.archiveCard(list, cardId);
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
        <Draggable key={card.id} draggableId={card.id || ''} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <CardPreview card={card} list={list} refreshList={refreshList} cloneCard={cloneCard} archiveCard={archiveCard} />
            </div>
          )}
        </Draggable>
      );
    })
  }

  return (
    <CurrentCardContextProvider>
      <div className='list-wrapper'>
        {!list || loading ? <div className='loader-container'><Loader size={LoaderSize.M} /></div> :
          <div className='list-wrapper__content'>
            <div className='list-wrapper__content__header'>
              <EllipsisText maxLines={3}>{list.title}</EllipsisText>
              <DropdownMenu menuHeader='' menuIcon={<MoreHorizIcon/>} menuItems={getDropdownMenuItems()}/>
            </div>
            <div className='list-wrapper__content__cards'>
              <Droppable droppableId={list.id || ''} direction='vertical' type='group'>
                {(provided: DroppableProvided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {renderCards()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div className='list-wrapper__content__add-new'>
              <AddNewCard addNewCardToList={addNewCardToList}/>
            </div>
          </div>}
      </div>
    </CurrentCardContextProvider>
  )
}

export default List;
