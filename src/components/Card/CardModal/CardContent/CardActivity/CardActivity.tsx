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
    const sortedActivityItems = card.activityItems?.sort((a: IActivityItem, b: IActivityItem) => b.timestamp - a.timestamp) || [];
    return sortedActivityItems.map((activityItem: IActivityItem) => {
      const key = `${activityItem.userId}_${activityItem.timestamp}`;
      return (
        <div key={key} className='card-activities__activity'>
          <div className='card-activities__activity__left'>
            <UserAvatar user={null} size={UserAvatarSize.S}/>
          </div>
          <div className='card-activities__activity__right'>
            <p className='description'><span>{activityItem.userId}</span>: {activityItem.description}</p>
            <p className='date'>{new Date(activityItem.timestamp).toISOString().slice(0, 10)}</p>
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
