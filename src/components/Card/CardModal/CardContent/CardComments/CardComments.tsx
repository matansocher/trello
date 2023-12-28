import { CardComment, CardCommentAdd } from '@components';
import { ICard, IComment, IList } from '@models';
import './CardComments.scss';
import { dataService } from '@services';
import { useBoard } from '@context';
import { useGetBoard } from '@hooks';

interface ICardCommentsProps {
  list: IList;
  card: ICard;
}

function CardComments({ list, card }: ICardCommentsProps) {
  const { updateBoardState } = useBoard();
  const { board } = useGetBoard();

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
