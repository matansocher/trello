import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { List, BoardHeader, AddNewList, Loader } from '@components';
import { useBoard, useLabels } from '@context';
import { LoaderSize } from '@constants';
import { useGetBoard } from '@hooks';
import { IList } from '@models';
import { firebaseService, dndService, utilsService } from '@services';
import './Board.scss';

function Board() {
  const { boardId = '' } = useParams<{ boardId: string, cardId: string }>();
  const { board: boardFromDb, loading } = useGetBoard(boardId);
  const { boardState: board, updateBoardState } = useBoard();
  const { updateLabelsState } = useLabels();

  useEffect(()=>{
    updateBoardState(boardFromDb);

    const fetchBoardLabels = async () => {
      if (!boardFromDb?.labels?.length) return;

      try {
        firebaseService.getBoardLabelsListener(boardFromDb.labels, (querySnapshot: any) => {
          const labels = querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
          const sortedLabels = utilsService.sortLabelsByListOrder(labels, boardFromDb.labels);
          updateLabelsState(sortedLabels || []);
        });
      } catch(err) {
        console.log('could not fetch board labels');
      }
    }

    fetchBoardLabels();
  },[boardFromDb]);

  const addNewList = async (list: IList) => {
    const newBoard = await firebaseService.addNewList(board, list);
    updateBoardState(newBoard);
  }

  const onDragEnd = async (result: any) => {
    await dndService.boardDragEndHandler(board, result);
  }

  const renderLists = () => {
    return board.lists.map((listId: string, index: number) => {
      return (
        <Draggable key={listId} draggableId={`list_${listId}`} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <List listIdToFetch={listId} />
            </div>
          )}
        </Draggable>
      )
    });
  }

  return (
    <div className='board-wrapper' style={ utilsService.getBackgroundStyle(board?.background) }>
      {!board || loading ? <div className='loader-container'><Loader size={LoaderSize.L} /></div> :
      <>
        <BoardHeader />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='board-wrapper__main'>
            <Droppable droppableId='board' type='board' direction='horizontal'>
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
