import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Board.scss'
import { List, BoardHeader } from '../index';
import { IList } from '@models';
import { useBoard } from '../../context/board-context';
import { BOARD_INITIAL_STATE } from '../../constants/initial-data';
import { getPostDragBoard } from '../../services/dnd.service';

function Board() {
  const { boardState: board, updateBoardState } = useBoard();

  useEffect(() => {
    updateBoardState(BOARD_INITIAL_STATE);
  }, []);


  const onDragEnd = (result: any) => {
    const newBoard = getPostDragBoard(board, result);
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
          <Droppable droppableId='ROOT' direction='horizontal' index={1}>
            {(provided) => (
              <div className='board-wrapper__columns' ref={provided.innerRef} {...provided.droppableProps}>
                {renderLists()}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
  )
}

export default Board;
