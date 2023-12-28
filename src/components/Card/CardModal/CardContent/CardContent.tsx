import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  CommentOutlined as CommentOutlinedIcon,
  SubjectOutlined as SubjectOutlinedIcon,
} from '@mui/icons-material';
import {
  CardActivity,
  CardCheckList,
  CardComments,
  CardDescription,
  CardInfo,
  EditableInput,
  ProgressBar
} from '@components';
import { useBoard } from '@context';
import { ICard, IList } from '@models';
import { dataService } from '@services';
import './CardContent.scss';
import { useGetBoard } from '@hooks';

interface ICardContentProps {
  list: IList;
  card: ICard;
}

function CardContent({ list, card }: ICardContentProps) {
  const { updateBoardState } = useBoard();
  const { board } = useGetBoard();

  const handleChecklistTitleSave = (newValue: string) => {
    const cardToSave = { ...card, checklistTitle: newValue };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const handleDeleteChecklistClick = () => {
    if (!card.checklistItems?.length) return;

    const cardToSave = { ...card, checklistItems: [], checklistTitle: '' };
    const newBoard = dataService.updateCard(board, list.id, cardToSave);
    updateBoardState(newBoard);
  }

  const amountOfCheckListChecked = card.checklistItems?.filter((item) => item.isChecked).length || 0;

  return (
    <div className='card-modal__content__right__sections'>
      <div className='card-modal__content__right__sections__section card-info-section'>
        <CardInfo list={list} card={card} />
      </div>
      <div className='card-modal__content__right__sections__section description-section'>
        <div className='header-icon'><SubjectOutlinedIcon /></div>
        <p className='subheader'>Description</p>
        <CardDescription list={list} card={card} />
      </div>
      {card.checklistItems?.length || card.checklistTitle ? <div className='card-modal__content__right__sections__section checklist-section'>
        <div className='checklist-section__header'>
          <div className='header-icon'><CheckBoxOutlinedIcon /></div>
          <EditableInput handleSave={handleChecklistTitleSave} initialValue={card.checklistTitle || 'Checklist'} />
          <button className='card-header__right__watch' onClick={handleDeleteChecklistClick}>Delete</button>
        </div>
        <ProgressBar value={amountOfCheckListChecked} total={card.checklistItems?.length || 0}/>
        <CardCheckList list={list} card={card} />
      </div> : null}
      <div className='card-modal__content__right__sections__section comments-section'>
        <div className='comments-section__header'>
          <div className='header-icon'><ChatBubbleOutlineIcon/></div>
          <p className='subheader'>Comments</p>
        </div>
        <CardComments list={list} card={card}/>
      </div>
      {card.activityItems?.length ? <div className='card-modal__content__right__sections__section activity-section'>
        <div className='activity-section__header'>
          <div className='header-icon'><CommentOutlinedIcon/></div>
          <p className='subheader'>Activity</p>
        </div>
        <CardActivity card={card}/>
      </div> : null}
    </div>
  )
}

export default CardContent;
