import { useEffect, useState } from 'react';
import { ModalWrapper } from '@components';
import { useGetBackgrounds } from '@hooks';
import { IBackground, IColorTile, IModalStyles } from '@models';
import { utilsService } from '@services';
import './ImagePicker.scss';

const backgroundPickerModalStyles: IModalStyles = {
  width: 850,
  // @ts-ignore
  overflow: 'scroll',
  height: 535,
  p: 2,
};

interface ICardHeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialSelectedBackground: IBackground;
  handleSaveBackgroundPicker: (selectedBackground: any) => void;
}

function ImagePicker({ isOpen, setIsOpen, initialSelectedBackground, handleSaveBackgroundPicker }: ICardHeaderProps) {
  const { backgrounds } = useGetBackgrounds();
  const [selectedBackground, setSelectedBackground] = useState<IBackground>(initialSelectedBackground);

  useEffect(() => {
    setSelectedBackground(initialSelectedBackground);
  }, [initialSelectedBackground]);

  const handleSaveBtnClick = () => {
    handleSaveBackgroundPicker(selectedBackground);
  }

  const handleUploadClick = async () => {
    console.log('handleUploadClick');
  }

  const selectImage = (image: any) => {
    const background = { type: 'image', background: image.fileName } as IBackground;
    setSelectedBackground(background);
  }

  const selectColor = (color: any) => {
    const background = { type: 'color', background: color.backgroundColor } as IBackground;
    setSelectedBackground(background);
  }

  const renderBackgroundImages = () => {
    return backgrounds?.images?.map((image: any) => {
      const isSelected = selectedBackground.background === image.fileName;
      const photoUrl = utilsService.getStorageLinkUrl(image.fileName);
      const className = `background-picker__backgrounds__images__image ${isSelected ? 'selected-background' : ''}`;
      return (
        <div key={image.fileName} className={className} onClick={() => selectImage(image)}>
          <img src={photoUrl} alt={image.fileName.split('.')[0]} />
        </div>
      )
    })
  }

  const renderBackgroundColors = () => {
    return backgrounds?.colors?.map((tile: IColorTile) => {
      const isSelected = selectedBackground.background === tile.backgroundColor;
      const className = `background-picker__backgrounds__colors__color ${isSelected ? 'selected-tile' : ''}`;
      return (
        <div key={tile.id} className={className} style={{ backgroundColor: tile.backgroundColor }} onClick={() => selectColor(tile)} />
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
            <div key='new' className='upload-item plus' onClick={handleUploadClick}>+</div>
            {renderBackgroundImages()}
          </div>
          <div className='background-picker__backgrounds__colors'>
            {renderBackgroundColors()}
          </div>
        </div>
        <div className='background-picker__footer'>
          <button className='save' onClick={handleSaveBtnClick}>Save</button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ImagePicker;
