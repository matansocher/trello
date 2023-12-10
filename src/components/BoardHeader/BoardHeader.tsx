import {
  CalendarMonth as CalendarMonthIcon,
  FilterList as FilterListIcon,
  MoreHoriz as MoreHorizIcon,
  Star as StarIcon,
} from '@mui/icons-material';
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
        <div className='board-header-icon'>
          <StarIcon />
        </div>
      </div>
      <div className='board-header__right'>
        <div className='board-header-icon'>
          <MoreHorizIcon />
        </div>
        <div className='board-header-icon'>
          <CalendarMonthIcon />
        </div>
        <div className='board-header-icon'>
          <FilterListIcon />
        </div>
      </div>
    </div>
  )
}

export default BoardHeader;
