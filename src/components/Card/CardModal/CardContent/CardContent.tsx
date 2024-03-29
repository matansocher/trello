import {
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  CommentOutlined as CommentOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  SubjectOutlined as SubjectOutlinedIcon,
} from '@mui/icons-material';
import {
  CardActivity,
  CardCheckList,
  CardComments,
  CardDescription,
  CardInfo,
  CardLocation,
  EditableInput,
  ProgressBar
} from '@components';
import { useCurrentCard } from '@context';
import { firebaseService } from '@services';
import './CardContent.scss';

interface ICardContentProps {

}

function CardContent({  }: ICardContentProps) {
  const { currentCard: card } = useCurrentCard();

  const handleChecklistTitleSave = async (checklistTitle: string) => {
    firebaseService.updateChecklistTitle(card, checklistTitle);
  }

  const handleDeleteChecklistClick = async () => {
    if (!card.checklistItems?.length && !card.checklistTitle) return;

    firebaseService.deleteChecklist(card);
  }

  const amountOfCheckListChecked = card.checklistItems?.filter((item) => item.isChecked).length || 0;

  return (
    <div className='card-modal__content__right__sections'>
      <div className='card-modal__content__right__sections__section card-info-section'>
        <CardInfo />
      </div>
      <div className='card-modal__content__right__sections__section description-section'>
        <div className='header-icon'><SubjectOutlinedIcon /></div>
        <p className='subheader'>Description</p>
        <CardDescription />
      </div>
      {card?.location?.id ? <div className='card-modal__content__right__sections__section location-section'>
        <div className='header-icon'><LocationOnOutlinedIcon/></div>
        <p className='subheader'>Location</p>
        <CardLocation />
      </div> : null}
      {card.checklistItems?.length || card.checklistTitle ? <div className='card-modal__content__right__sections__section checklist-section'>
        <div className='checklist-section__header'>
          <div className='header-icon'><CheckBoxOutlinedIcon /></div>
          <EditableInput handleSave={handleChecklistTitleSave} initialValue={card.checklistTitle || 'Checklist'} />
          <button onClick={handleDeleteChecklistClick}>Delete</button>
        </div>
        <ProgressBar value={amountOfCheckListChecked} total={card.checklistItems?.length || 0}/>
        <CardCheckList />
      </div> : null}
      <div className='card-modal__content__right__sections__section comments-section'>
        <div className='comments-section__header'>
          <div className='header-icon'><ChatBubbleOutlineIcon/></div>
          <p className='subheader'>Comments</p>
        </div>
        <CardComments/>
      </div>
      {false && card.activityItems?.length ? <div className='card-modal__content__right__sections__section activity-section'>
        <div className='activity-section__header'>
          <div className='header-icon'><CommentOutlinedIcon/></div>
          <p className='subheader'>Activity</p>
        </div>
        <CardActivity />
      </div> : null}
    </div>
  )
}

export default CardContent;
