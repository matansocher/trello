import {  UserAvatar } from '@components';
import { UserAvatarSize } from '@constants';
import { useBoard } from '@context';
import { IActivityItem } from '@models';
import './BoardActivity.scss';

interface IBoardActivityProps {

}

function BoardActivity({}: IBoardActivityProps) {
  const { boardState: board } = useBoard();

  const renderActivityItems = () => {
    const sortedActivityItems = board.activityItems?.sort((a: IActivityItem, b: IActivityItem) => b.timestamp - a.timestamp) || [];
    return sortedActivityItems.map((activityItem: IActivityItem) => {
      const key = `${activityItem.userId}_${activityItem.timestamp}`;
      return (
        <div key={key} className='board-activities__activity'>
          <div className='board-activities__activity__left'>
            <UserAvatar user={null} size={UserAvatarSize.S}/>
          </div>
          <div className='board-activities__activity__right'>
            <p className='description'><span>{activityItem.userId}</span>: {activityItem.description}</p>
            <p className='date'>{new Date(activityItem.timestamp).toISOString().slice(0, 10)}</p>
          </div>
        </div>
      )
    })
  }

  const renderEmptyState = () => {
    return (
      <>
        <p>Here you will see all this board's activity.</p>
        <p>Start using the board and this window will be filled with your actions</p>
      </>
    )
  }

  return (
    <div className='board-activities'>
      {!board.activityItems?.length ? renderEmptyState() : renderActivityItems()}
    </div>
  )
}

export default BoardActivity;
