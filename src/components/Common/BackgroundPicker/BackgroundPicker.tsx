import { useState } from 'react';
import { ColorPicker, ImagePicker, ModalWrapper } from '@components';
import { IBackground, IColorTile, IModalStyles } from '@models';
import './BackgroundPicker.scss';
import { useBoard } from '@context';
import { Close as CloseIcon } from '@mui/icons-material';

const backgroundPickerModalStyles: IModalStyles = {
  width: 450,
  height: 350,
  p: 2,
};

interface IBackgroundPickerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCloseBackgroundPicker: () => void;
  handleSaveBackgroundPicker: (selectedBackground: any) => void;
}

function BackgroundPicker({ isOpen, setIsOpen, handleCloseBackgroundPicker, handleSaveBackgroundPicker }: IBackgroundPickerProps) {
  const { boardState: board } = useBoard();
  const [imagesPickerModalOpen, setImagesPickerModalOpen] = useState(false);
  const [colorPickerModalOpen, setColorsPickerModalOpen] = useState(false);

  const handleSaveColorPicker = (background: IColorTile) => {
    const backgroundToSave = { type: 'color', background: background.backgroundColor } as IBackground;
    handleSaveBackgroundPicker(backgroundToSave);
    setColorsPickerModalOpen(false);
  }

  const handleSaveImagePicker = (background: IBackground) => {
    handleSaveBackgroundPicker(background);
    setImagesPickerModalOpen(false);
  }

  return (
    <ModalWrapper modalOpen={isOpen} closeModal={() => setIsOpen(false)} modalStyle={backgroundPickerModalStyles}>
      <div className='background-picker'>
        <div className='background-picker__header'>
          <p>Change background</p>
          <CloseIcon onClick={handleCloseBackgroundPicker}/>
        </div>
        <div className='background-picker__content'>
          <div className='background-picker__content__item' onClick={() => setImagesPickerModalOpen(true)}>
            <img src={'https://trello.com/assets/8f9c1323c9c16601a9a4.jpg'} alt='images' />
            <p>Images</p>
          </div>
          <div className='background-picker__content__item' onClick={() => setColorsPickerModalOpen(true)}>
            <img src={'https://trello.com/assets/97db30fe74a58b7b7a18.png'} alt='colors' />
            <p>Colors</p>
          </div>
        </div>
      </div>

      <ImagePicker
        isOpen={imagesPickerModalOpen}
        setIsOpen={setImagesPickerModalOpen}
        initialSelectedBackground={board.background as IBackground}
        handleSaveBackgroundPicker={handleSaveImagePicker} />

      <ColorPicker
        isOpen={colorPickerModalOpen}
        setIsOpen={setColorsPickerModalOpen}
        hasHeader={false}
        initialTile={{ id: '', backgroundColor: board?.background?.background as string,  hoverColor: '',  textColor: '' }}
        handleSaveColorPicker={handleSaveColorPicker}
        handleCloseColorPicker={() => setColorsPickerModalOpen(false)} />
    </ModalWrapper>
  )
}

export default BackgroundPicker;
