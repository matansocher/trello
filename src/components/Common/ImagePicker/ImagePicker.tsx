import { useEffect, useState } from 'react';
import { ModalWrapper } from '@components';
import { useGetBackgrounds } from '@hooks';
import { IModalStyles } from '@models';
import { utilsService } from '@services';
import './ImagePicker.scss';

const backgroundPickerModalStyles: IModalStyles = {
  width: 450,
  // @ts-ignore
  overflow: 'scroll',
  height: 535,
  p: 2,
};

interface ICardHeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialSelectedBackground: string;
  handleSaveBackgroundPicker: (selectedBackground: any) => void;
}

function ImagePicker({ isOpen, setIsOpen, initialSelectedBackground = '', handleSaveBackgroundPicker }: ICardHeaderProps) {
  const { backgrounds } = useGetBackgrounds();
  const [selectedBackground, setSelectedBackground] = useState(initialSelectedBackground);

  useEffect(() => {
    setSelectedBackground(initialSelectedBackground);
  }, [initialSelectedBackground]);

  const handleSaveBtnClick = () => {
    handleSaveBackgroundPicker(selectedBackground);
  }

  const renderBackgroundImages = () => {
    return backgrounds.map((background: any) => {
      const isSelected = selectedBackground === background.fileName;
      const photoUrl = utilsService.getStorageLinkUrl(background.fileName);
      return (
        <div
          key={background.fileName}
          className={`background-picker__backgrounds__background ${isSelected ? 'selected-background' : ''}`}
          onClick={() => setSelectedBackground(background.fileName)}
        >
          <img src={photoUrl} alt={background.fileName.split('.')[0]} />
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
          {renderBackgroundImages()}
        </div>
        <div className='background-picker__footer'>
          <button className='save' onClick={handleSaveBtnClick}>Save</button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ImagePicker;
