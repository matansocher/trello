import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd';
import { List, BoardHeader, AddNewList } from '@components';
import { useBoard } from '@context';
import { IBoard, IList } from '@models';
import { dataService, dndService } from '@services';
import './Board.scss';

function Board() {
  const { boardState: board, updateBoardState } = useBoard();

  useEffect(() => {
    const boardId = '1';
    const board = dataService.getBoard(boardId);
    updateBoardState(board);
  }, []);

  const addNewList = (list: IList) => {
    const newBoard = dataService.addListToBoard(board, list) as IBoard;
    updateBoardState(newBoard);
  }

  const onDragEnd = (result: any) => {
    const newBoard = dndService.getDragEndBoard(board, result);
    updateBoardState(newBoard);
  }

  const renderLists = () => {
    if (!board?.lists?.length) {
      return;
    }
    return board.lists.map((list: IList, index: number) => {
      return (
        <Draggable key={list.id} draggableId={list.id} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
              <List list={list} />
            </div>
          )}
        </Draggable>
      )
    });
  }

  return (
      <div className='board-wrapper'>
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
      </div>
  )
}

export default Board;
