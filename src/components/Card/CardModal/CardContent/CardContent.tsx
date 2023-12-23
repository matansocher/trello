import { Checklist as ChecklistIcon, CheckBoxOutlined as CheckBoxOutlinedIcon, SubjectOutlined as SubjectOutlinedIcon, CommentOutlined as CommentOutlinedIcon } from '@mui/icons-material';
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

interface ICardContentProps {
  list: IList;
  card: ICard;
}

function CardContent({ list, card }: ICardContentProps) {
  const { boardState: board, updateBoardState } = useBoard();

  const handleChecklistTitleSave = (newValue: string) => {
    const cardToSave = { ...card, checklistTitle: newValue };
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
      {card.checklistItems?.length ? <div className='card-modal__content__right__sections__section checklist-section'>
        <div className='header-icon'><CheckBoxOutlinedIcon /></div>
        <EditableInput handleSave={handleChecklistTitleSave} initialValue={card.checklistTitle || 'Checklist'} />
        <ProgressBar value={amountOfCheckListChecked} total={card.checklistItems.length} />
        <CardCheckList list={list} card={card} />
      </div> : null}
      <div className='card-modal__content__right__sections__section comments-section'>
        <div className='header-icon'><ChecklistIcon /></div>
        <p className='subheader'>Comments</p>
        <CardComments list={list} card={card} />
      </div>
      {card.activity ? <div className='card-modal__content__right__sections__section activity-section'>
        <div className='header-icon'><CommentOutlinedIcon /></div>
        <p className='subheader'>Activity</p>
        <CardActivity card={card} />
      </div> : null}
    </div>
  )
}

export default CardContent;
