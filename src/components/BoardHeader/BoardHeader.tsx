import StarIcon from '@mui/icons-material/Star';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterListIcon from '@mui/icons-material/FilterList';
import './BoardHeader.scss'
import { useBoard } from '../../context/board-context';

function BoardHeader() {
  const { boardState: board } = useBoard();

  if (!board) {
    return;
  }
  return (
    <div className='board-header'>
      <div className='board-header__left'>
        <p className='board-header__left-title'>{ board.title }</p>
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
