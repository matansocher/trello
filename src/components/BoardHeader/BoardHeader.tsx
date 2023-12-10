import { Star as StarIcon, MoreHoriz as MoreHorizIcon, CalendarMonth as CalendarMonthIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { EllipsisText } from '@components';
import { useBoard } from '@context';
import './BoardHeader.scss';

function BoardHeader() {
  const { boardState: board } = useBoard();

  if (!board) {
    return;
  }
  return (
    <div className='board-header'>
      <div className='board-header__left'>
        <EllipsisText maxLines={1}>{board.title}</EllipsisText>
        <StarIcon />
      </div>
      <div className='board-header__right'>
        <MoreHorizIcon />
        <CalendarMonthIcon />
        <FilterListIcon />
      </div>
    </div>
  )
}

export default BoardHeader;
