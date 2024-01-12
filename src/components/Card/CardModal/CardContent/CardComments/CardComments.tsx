import { CardComment, CardCommentAdd } from '@components';
import { useCurrentCard } from '@context';
import { IComment } from '@models';
import { dataService } from '@services';
import './CardComments.scss';

interface ICardCommentsProps {

}

function CardComments({  }: ICardCommentsProps) {
  const { currentCard: card } = useCurrentCard();

  const addNewComment = async (comment: IComment) => {
    dataService.addCommentToCard(card, comment);
  }

  const editComment = async (comment: IComment, newDescription: string) => {
    dataService.editComment(card, comment, newDescription);
  }

  const deleteComment = async (comment: IComment) => {
    dataService.deleteCommentFromCard(card, comment);
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
