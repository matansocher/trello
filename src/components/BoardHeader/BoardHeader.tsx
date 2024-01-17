import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArchiveOutlined as ArchiveOutlinedIcon,
  CalendarMonth as CalendarMonthIcon,
  EmailOutlined as EmailOutlinedIcon,
  FilterList as FilterListIcon,
  FormatListBulletedOutlined as FormatListBulletedOutlinedIcon,
  Label as LabelIcon,
  MoreHoriz as MoreHorizIcon,
  NotInterestedOutlined as NotInterestedOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  WatchOutlined as WatchOutlinedIcon,
} from '@mui/icons-material';
import { ImagePicker, DropdownMenu, EditableInput } from '@components';
import { useBoard } from '@context';
import { IBackground, IDropdownItem } from '@models';
import { firebaseService, utilsService } from '@services';
import './BoardHeader.scss';

function BoardHeader() {
  const navigate = useNavigate();
  const { boardState: board, updateBoardState } = useBoard();
  const [backgroundPickerModalOpen, setBackgroundPickerModalOpen] = useState(false);

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
    setBackgroundPickerModalOpen(true);
  }

  const handleLabelsClick = () => {
    console.log('handleLabelsClick');
  }

  const handleWatchClick = () => {
    console.log('handleWatchClick');
  }

  const handlePrintExportShareClick = () => {
    console.log('handlePrintExportShareClick');
  }

  const handleCloseBoardClick = async () => {
    console.log('handleCloseBoardClick');
    await firebaseService.closeBoard(board);
    navigate(`/`);
  }

  const handleTitleSave = (newValue: string) => {
    const newBoard = { ...board, title: newValue };
    firebaseService.updateBoard(newBoard);
  }

  const handleSaveBackgroundPicker = async (selectedBackground: IBackground) => {
    const newBoard = firebaseService.updateBoardBackground(board, selectedBackground);
    updateBoardState(newBoard);
    setBackgroundPickerModalOpen(false);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'Activity', icon: <FormatListBulletedOutlinedIcon fontSize='small' />, onClick: () => handleActivityClick() },
      { label: 'Archived items', icon: <ArchiveOutlinedIcon fontSize='small' />, onClick: () => handleArchivedItemsClick() },
      { label: 'Settings', icon: <SettingsOutlinedIcon fontSize='small' />, onClick: () => handleSettingsClick() },
      { label: 'Change background', icon: <div className='change-bg' style={ utilsService.getBackgroundStyle(board?.background) } />, onClick: () => handleChangeBackgroundClick() },
      { label: 'Labels', icon: <LabelIcon fontSize='small' />, onClick: () => handleLabelsClick() },
      { label: 'Watch', icon: <WatchOutlinedIcon fontSize='small' />, onClick: () => handleWatchClick() },
      { label: 'Print, export, and share', icon: <EmailOutlinedIcon fontSize='small' />, onClick: () => handlePrintExportShareClick() },
      { label: 'Close board', icon: <NotInterestedOutlinedIcon fontSize='small' />, onClick: () => handleCloseBoardClick() },
    ];
  }

  return (
    <div className='board-header'>
      <div className='board-header__left'>
        <EditableInput handleSave={handleTitleSave} initialValue={board.title} fontSize={18} />
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

      <ImagePicker
        isOpen={backgroundPickerModalOpen}
        setIsOpen={setBackgroundPickerModalOpen}
        initialSelectedBackground={board.background}
        handleSaveBackgroundPicker={handleSaveBackgroundPicker} />
    </div>
  )
}

export default BoardHeader;
