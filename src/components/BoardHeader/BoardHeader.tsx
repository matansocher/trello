import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArchiveOutlined as ArchiveOutlinedIcon,
  CalendarMonth as CalendarMonthIcon,
  EmailOutlined as EmailOutlinedIcon,
  FilterList as FilterListIcon,
  FormatListBulletedOutlined as FormatListBulletedOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  Label as LabelIcon,
  MoreHoriz as MoreHorizIcon,
  NotInterestedOutlined as NotInterestedOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  Star as StarIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  WatchOutlined as WatchOutlinedIcon,
} from '@mui/icons-material';
import { BackgroundPicker, BoardAbout, CardsArchive, DropdownMenu, EditableInput, LabelsPicker, ModalWrapper } from '@components';
import { useBoard, useUser } from '@context';
import { useGetStarredBoards } from '@hooks';
import { IBackground, IDropdownItem, IModalStyles } from '@models';
import { firebaseService, utilsService } from '@services';
import './BoardHeader.scss';

const backgroundPickerModalStyles: IModalStyles = { width: 450, height: 350 };
const labelsModalStyles: IModalStyles = { width: 320 };
const aboutModalStyles: IModalStyles = { width: 400, minHeight: 400, overflow: 'scroll' };
const archivedItemsModalStyles: IModalStyles = { width: 400, minHeight: 400, overflow: 'scroll', padding: 0 };

function BoardHeader() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { boardState: board, updateBoardState } = useBoard();
  const [backgroundPickerModalOpen, setBackgroundPickerModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);
  const [aboutsModalOpen, setAboutModalOpen] = useState(false);
  const [archivedItemsModalOpen, setArchivedItemsModalOpen] = useState(false);
  const { starredBoards } = useGetStarredBoards(user.id);
  const isBoardStarred = starredBoards?.includes(board.id as string);

  const handleStarClick = () => {
    if (!board?.id) return;

    let newStarredBoards = [...starredBoards];
    if (isBoardStarred) {
      newStarredBoards = newStarredBoards.filter((boardId: string) => board.id !== boardId);
    } else {
      newStarredBoards.push(board.id);
      newStarredBoards = [...new Set(newStarredBoards)];
    }
    firebaseService.updateStarredBoards(user.id, newStarredBoards);
  }

  const handleAboutClick = () => {
    setAboutModalOpen(true);
  }

  const handleActivityClick = () => {
    console.log('handleActivityClick');
  }

  const handleArchivedItemsClick = () => {
    setArchivedItemsModalOpen(true);
  }

  const handleSettingsClick = () => {
    console.log('handleSettingsClick');
  }

  const handleChangeBackgroundClick = () => {
    setBackgroundPickerModalOpen(true);
  }

  const handleLabelsClick = () => {
    setLabelsModalOpen(true);
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

  const handleCloseBackgroundPicker = () => {
    setBackgroundPickerModalOpen(false);
  }

  const handleSaveBackgroundPicker = (background: IBackground) => {
    const newBoard = firebaseService.updateBoardBackground(board, background);
    updateBoardState(newBoard);
    setBackgroundPickerModalOpen(false);
  }

  const getDropdownMenuItems = (): IDropdownItem[] => {
    return [
      { label: 'About this board', icon: <InfoOutlinedIcon fontSize='small' />, onClick: () => handleAboutClick() },
      { label: 'Activity', icon: <FormatListBulletedOutlinedIcon fontSize='small' />, onClick: () => handleActivityClick() },
      { label: 'Archived items', icon: <ArchiveOutlinedIcon fontSize='small' />, onClick: () => handleArchivedItemsClick() },
      { label: 'Settings', icon: <SettingsOutlinedIcon fontSize='small' />, onClick: () => handleSettingsClick() },
      { label: 'Change background', icon: <div className='change-bg' style={ utilsService.getBackgroundStyle(board?.background as IBackground) } />, onClick: () => handleChangeBackgroundClick() },
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
        <div className='board-header__right__star' onClick={handleStarClick}>
          {isBoardStarred ? <StarIcon/> : <StarBorderOutlinedIcon/>}
        </div>
        <div className='board-header-icon'>
          <FilterListIcon/>
        </div>
        <div className='board-header-icon'>
          <CalendarMonthIcon/>
        </div>
        <div className='board-header-icon'>
          <DropdownMenu menuHeader='' menuIcon={<MoreHorizIcon/>} menuItems={getDropdownMenuItems()}/>
        </div>
      </div>

      <ModalWrapper modalOpen={backgroundPickerModalOpen} closeModal={() => setBackgroundPickerModalOpen(false)}
                    modalStyle={backgroundPickerModalStyles}>
        <BackgroundPicker
          setIsOpen={setBackgroundPickerModalOpen}
          handleCloseBackgroundPicker={handleCloseBackgroundPicker}
          handleSaveBackgroundPicker={handleSaveBackgroundPicker} />
      </ModalWrapper>

      <ModalWrapper modalOpen={labelsModalOpen} closeModal={() => setLabelsModalOpen(false)} modalStyle={labelsModalStyles}>
        <LabelsPicker setIsOpen={setLabelsModalOpen} cardLabels={board.labels || []} />
      </ModalWrapper>

      <ModalWrapper modalOpen={aboutsModalOpen} closeModal={() => setAboutModalOpen(false)} modalStyle={aboutModalStyles}>
        <BoardAbout handleCloseBoardAboutModal={() => setAboutModalOpen(false)} />
      </ModalWrapper>

      <ModalWrapper modalOpen={archivedItemsModalOpen} closeModal={() => setArchivedItemsModalOpen(false)} modalStyle={archivedItemsModalStyles}>
        <CardsArchive handleCloseCardsArchiveModal={() => setArchivedItemsModalOpen(false)} />
      </ModalWrapper>

    </div>
  )
}

export default BoardHeader;
