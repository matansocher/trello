import {  UserAvatar } from '@components';
import { UserAvatarSize } from '@constants';
import { useCurrentCard } from '@context';
import { IActivityItem } from '@models';
import './CardActivity.scss';

interface ICardActivityProps {
}

function CardActivity({}: ICardActivityProps) {
  const { currentCard: card } = useCurrentCard();

  const renderActivityItems = () => {
    return card.activityItems?.map((activityItem: IActivityItem) => {
      return (
        <div className='card-activities__activity'>
          <div className='card-activities__activity__left'>
            <UserAvatar user={null} size={UserAvatarSize.S}/>
          </div>
          <div className='card-activities__activity__right'>
            <p className='description'><span>{activityItem.userId}</span>: {activityItem.description}</p>
            <p className='date'>{activityItem.createdAt}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='card-activities'>
      {renderActivityItems()}
    </div>
  )
}

export default CardActivity;
