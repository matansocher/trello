import { CardComment, CardCommentAdd } from '@components';
import { ICard, IComment, IList } from '@models';
import './CardComments.scss';
import { dataService } from '@services';
import { useBoard } from '@context';

interface ICardCommentsProps {
  list: IList;
  card: ICard;
}

function CardComments({ list, card }: ICardCommentsProps) {
  const { boardState: board, updateBoardState } = useBoard();

  const addNewComment = (comment: IComment) => {
    const comments = card.comments || [];
    const newComments = [...comments, comment];
    const cardToSave = { ...card, comments: newComments };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const deleteComment = (comment: IComment) => {
    const comments = card.comments || [];
    const newComments = comments.filter((item: IComment) => item.id !== comment.id);
    const cardToSave = { ...card, comments: newComments };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const renderComments = () => {
    return card?.comments?.map((comment: IComment) => {
      return <CardComment key={comment.id} comment={comment}  handleCommentDelete={deleteComment} />
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
