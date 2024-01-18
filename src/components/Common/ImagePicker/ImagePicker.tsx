import { useEffect, useRef, useState } from 'react';
import { ModalWrapper } from '@components';
import { useGetBackgrounds } from '@hooks';
import { IBackground, IModalStyles } from '@models';
import { firebaseService, utilsService } from '@services';
import './ImagePicker.scss';
import { useBoard, useUser } from '@context';

const backgroundPickerModalStyles: IModalStyles = {
  width: 850,
  height: 535,
  // @ts-ignore
  overflow: 'scroll',
  p: 2,
};

interface IImagePickerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialSelectedBackground: IBackground;
  handleSaveBackgroundPicker: (selectedBackground: any) => void;
}

function ImagePicker({ isOpen, setIsOpen, initialSelectedBackground, handleSaveBackgroundPicker }: IImagePickerProps) {
  const { user } = useUser();
  const { boardState: board } = useBoard();
  const { backgrounds, refreshBackgrounds } = useGetBackgrounds(board.id as string);
  const [selectedBackground, setSelectedBackground] = useState<IBackground>(initialSelectedBackground);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedBackground(initialSelectedBackground);
  }, [initialSelectedBackground]);

  const handleUploadClick = async (e: any) => {
    if (!e.target.files[0]) return;

    const file = new File([e.target.files[0]], e.target.files[0].name);
    const fileName = await firebaseService.uploadFile(user, file);
    const boardBackground = { type: 'image', background: fileName, boardId: board.id } as IBackground;
    await firebaseService.saveFileToBoardBackgrounds(boardBackground);
    refreshBackgrounds();
  }

  const selectImage = (image: any) => {
    const background = { type: 'image', background: image.fileName } as IBackground;
    setSelectedBackground(background);
  }

  const renderBackgroundImages = () => {
    return backgrounds?.images?.map((image: any) => {
      const isSelected = selectedBackground.background === image.fileName;
      const photoUrl = utilsService.getStorageLinkUrl(image.fileName);
      const className = `background-picker__backgrounds__images__image ${isSelected ? 'selected-image' : ''}`;
      return (
        <div key={image.fileName} className={className} onClick={() => selectImage(image)}>
          <img src={photoUrl} alt={image.fileName.split('.')[0]} />
        </div>
      )
    })
  }

  return (
    <ModalWrapper modalOpen={isOpen} closeModal={() => setIsOpen(false)} modalStyle={backgroundPickerModalStyles}>
      <div className='background-picker'>
        <div className='background-picker__header'>
          <p>Change background</p>
        </div>
        <div className='background-picker__backgrounds'>
          <div className='background-picker__backgrounds__images'>
            <div key='new' className='upload-item plus' onClick={() => hiddenFileInput.current?.click()}>
              <p>+</p>
              <input type='file' onChange={handleUploadClick} ref={hiddenFileInput} />
            </div>
            {renderBackgroundImages()}
          </div>
        </div>
        <div className='background-picker__footer'>
          <button className='save' onClick={() => handleSaveBackgroundPicker(selectedBackground)}>Save</button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ImagePicker;
