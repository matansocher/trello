import {
  ArchiveOutlined as ArchiveOutlinedIcon,
  CalendarMonth as CalendarMonthIcon,
  ContentCopy as ContentCopyIcon,
  EmailOutlined as EmailOutlinedIcon,
  FilterList as FilterListIcon,
  FormatListBulletedOutlined as FormatListBulletedOutlinedIcon,
  Label as LabelIcon,
  MoreHoriz as MoreHorizIcon,
  NotInterestedOutlined as NotInterestedOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  WatchOutlined as WatchOutlinedIcon,
} from '@mui/icons-material';
import { earth } from '@assets';
import { DropdownMenu, EditableInput } from '@components';
import { useBoard } from '@context';
import { IDropdownItem } from '@models';
import './BoardHeader.scss';

function BoardHeader() {
  const { boardState: board } = useBoard();

  const handleActivityClick = () => {
    console.log('handleActivityClick');
  }

  const handleArchivedItemsClick = () => {
    console.log('handleArchivedItemsClick');
  }

  const handleSettingsClick = () => {
    console.log('handleSettingsClick');
  }

  const handleChangeBackgroundClick = () => {
    console.log('handleChangeBackgroundClick');
  }

  const handleLabelsClick = () => {
    console.log('handleLabelsClick');
  }

  const handleWatchClick = () => {
    console.log('handleWatchClick');
  }

  const handleCopyBoardClick = () => {
    console.log('handleCopyBoardClick');
  }

  const handlePrintExportShareClick = () => {
    console.log('handlePrintExportShareClick');
  }

  const handleCloseBoardClick = () => {
    console.log('handleCloseBoardClick');
  }

  const handleTitleSave = (newValue: string) => {
    console.log('handleTitleSave', newValue);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Activity', icon: <FormatListBulletedOutlinedIcon fontSize='small' />, onClick: () => handleActivityClick() },
      { label: 'Archived items', icon: <ArchiveOutlinedIcon fontSize='small' />, onClick: () => handleArchivedItemsClick() },
      { label: 'Settings', icon: <SettingsOutlinedIcon fontSize='small' />, onClick: () => handleSettingsClick() },
      { label: 'Change background', icon: <div className='change-bg' style={{ backgroundImage: `url(${earth})` }} />, onClick: () => handleChangeBackgroundClick() },
      { label: 'Labels', icon: <LabelIcon fontSize='small' />, onClick: () => handleLabelsClick() },
      { label: 'Watch', icon: <WatchOutlinedIcon fontSize='small' />, onClick: () => handleWatchClick() },
      { label: 'Copy board', icon: <ContentCopyIcon fontSize='small' />, onClick: () => handleCopyBoardClick() },
      { label: 'Print, export, and share', icon: <EmailOutlinedIcon fontSize='small' />, onClick: () => handlePrintExportShareClick() },
      { label: 'Close board', icon: <NotInterestedOutlinedIcon fontSize='small' />, onClick: () => handleCloseBoardClick() },
    ];
  }

  if (!board) {
    return;
  }
  return (
    <div className='board-header'>
      <div className='board-header__left'>
        <EditableInput handleSave={handleTitleSave} initialValue={board.title} />
      </div>
      <div className='board-header__right'>
        <div className='board-header-icon'>
          <FilterListIcon />
        </div>
        <div className='board-header-icon'>
          <CalendarMonthIcon />
        </div>
        <div className='board-header-icon'>
          <DropdownMenu menuHeader='' menuIcon={<MoreHorizIcon />} menuItems={getDropdownMenuItems()} />
        </div>
      </div>
    </div>
  )
}

export default BoardHeader;
