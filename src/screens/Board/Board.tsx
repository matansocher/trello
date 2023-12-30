import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { earth } from '@assets';
import { List, BoardHeader, AddNewList, Loader } from '@components';
import { useBoard } from '@context';
import { LoaderSize } from '@constants';
import { useGetBoard } from '@hooks';
import { IBoard, IList } from '@models';
import { dataService, dndService, firebaseService } from '@services';
import './Board.scss';

function Board() {
  const { boardId = '' } = useParams<{ boardId: string }>();
  const { board: boardFromDb, loading } = useGetBoard(boardId);
  const { boardState: board, updateBoardState } = useBoard();

  useEffect(()=>{
    updateBoardState(boardFromDb)
  },[boardFromDb])

  const addNewList = async (list: IList) => {
    const { id: createdListId } = await firebaseService.createList(list);
    const newBoard = { ...board, lists: [...board.lists, createdListId] } as IBoard;
    await firebaseService.updateBoard(newBoard);



    // const { id: createdCardId } = await firebaseService.createCard(card);
    // const newList = { ...board , lists: [createdCardId] } as IList;
    // await firebaseService.updateList(newList);
  }

  const onDragEnd = (result: any) => {
    const newBoard = dndService.getDragEndBoard(board, result);
    updateBoardState(newBoard);
  }

  const renderLists = () => {
    return board.lists.map((listId: string, index: number) => {
      return (
        <Draggable key={listId} draggableId={listId} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <List listId={listId} />
            </div>
          )}
        </Draggable>
      )
    });
  }

  return (
    <div className='board-wrapper' style={{ backgroundImage: `url(${earth})` }}>
      {!board || loading ? <div className='loader-container'><Loader size={LoaderSize.L} /></div> :
      <>
        <BoardHeader />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='board-wrapper__main'>
            <Droppable droppableId='ROOT' direction='horizontal'>
              {(provided: DroppableProvided) => (
                <div className='board-wrapper__main__lists' ref={provided.innerRef} {...provided.droppableProps}>
                  {renderLists()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className='board-wrapper__add-new'>
              <AddNewList addNewList={addNewList} />
            </div>
          </div>
        </DragDropContext>
      </>}
    </div>
  )
}

export default Board;
