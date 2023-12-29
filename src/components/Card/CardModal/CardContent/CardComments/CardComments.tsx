import { CardComment, CardCommentAdd } from '@components';
import { useBoard, useCurrentCard } from '@context';
import { IComment, IList } from '@models';
import { dataService } from '@services';
import './CardComments.scss';

interface ICardCommentsProps {
  list: IList;
}

function CardComments({ list }: ICardCommentsProps) {
  const { boardState: board, updateBoardState } = useBoard();
  const { currentCard: card } = useCurrentCard();

  const addNewComment = (comment: IComment) => {
    const cardToSave = dataService.addCommentToCard(card, comment);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const editComment = (comment: IComment, newDescription: string) => {
    const cardToSave = dataService.editComment(card, comment, newDescription);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const deleteComment = (comment: IComment) => {
    const cardToSave = dataService.deleteCommentFromCard(card, comment);
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const renderComments = () => {
    return card?.comments?.map((comment: IComment) => {
      const key = Math.random();
      return <CardComment key={key} comment={comment} handleCommentEdit={editComment} handleCommentDelete={deleteComment} />
    });
  }

  return (
    <div className='card-comments'>
      <CardCommentAdd addNewComment={addNewComment} />
      <div className='card-comments__comments'>
        {renderComments()}
      </div>
    </div>
  )
}

export default CardComments;
