import { useState } from 'react';
import { Close as CloseIcon, SubjectOutlined as SubjectOutlinedIcon, PersonOutlined as PersonOutlinedIcon } from '@mui/icons-material';
import { Textarea, UserAvatar } from '@components';
import { useBoard, useUser } from '@context';
import { firebaseService } from '@services';
import './BoardAbout.scss';

interface IBoardAboutProps {
  handleCloseBoardAboutModal: () => void;
}

function BoardAbout({ handleCloseBoardAboutModal }: IBoardAboutProps) {
  const { user } = useUser();
  const { boardState: board } = useBoard();
  const [descriptionInput, setDescriptionInput] = useState(board.description as string);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleDescriptionSaveClick = async () => {
    firebaseService.updateBoardDescription(board, descriptionInput);
    setIsDescriptionOpen(false);
  }

  const handleDescriptionCancelClick = () => {
    setDescriptionInput(board.description as string);
    setIsDescriptionOpen(false);
  }

  const renderDescriptionInput = () => {
    if (isDescriptionOpen) {
      return (
        <div className='board-description board-description-open'>
          <Textarea placeholder='Add a more detailed description to the board…' text={descriptionInput} handleFocusChange={setIsDescriptionOpen} handleInputChange={setDescriptionInput}/>
          <div className='board-description-open__actions'>
            <button className='save' onClick={handleDescriptionSaveClick}>Save</button>
            <button className='cancel' onClick={handleDescriptionCancelClick}>Cancel</button>
          </div>
        </div>
      )
    }
    return (
      <div className='board-description board-description-closed' onClick={() => setIsDescriptionOpen(true)}>
        <p>{!board.description ? 'Add a more detailed description…' : board.description}</p>
      </div>
    )
  }

  return (
    <div className='background-about'>
      <div className='background-about__header'>
        <p>About this board</p>
        <CloseIcon onClick={handleCloseBoardAboutModal}/>
      </div>
      <div className='background-about__content'>
        <div className='background-about__content__admins'>
          <div className='header-icon'><PersonOutlinedIcon/></div>
          <p className='subheader'>Board admins</p>
          <div className='background-about__content__admins__admin'>
            <UserAvatar user={user}/>
            <p>{user.displayName}</p>
          </div>
        </div>
        <div className='background-about__content__description'>
          <div className='header-icon'><SubjectOutlinedIcon/></div>
          <p className='subheader'>Description</p>
          {renderDescriptionInput()}
        </div>
      </div>
    </div>
  )
}

export default BoardAbout;
