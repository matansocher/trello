import { useState } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { ColorPicker, ImagePicker, ModalWrapper } from '@components';
import { BackgroundType } from '@constants';
import { useBoard } from '@context';
import { IBackground, IColorTile, IModalStyles } from '@models';
import './BackgroundPicker.scss';

const imagePickerModalStyles: IModalStyles = {
  width: 850,
  height: 535,
  overflow: 'scroll',
  p: 2,
};

const colorPickerModalStyles: IModalStyles = {
  width: 320,
  padding: 0,
};

interface IBackgroundPickerProps {
  setIsOpen: (isOpen: boolean) => void;
  handleCloseBackgroundPicker: () => void;
  handleSaveBackgroundPicker: (selectedBackground: any) => void;
}

function BackgroundPicker({ handleCloseBackgroundPicker, handleSaveBackgroundPicker }: IBackgroundPickerProps) {
  const { boardState: board } = useBoard();
  const [imagesPickerModalOpen, setImagesPickerModalOpen] = useState(false);
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);

  const handleSaveColorPicker = (background: IColorTile) => {
    const backgroundToSave = { type: BackgroundType.COLOR, background: background.backgroundColor } as IBackground;
    handleSaveBackgroundPicker(backgroundToSave);
    setColorPickerModalOpen(false);
  }

  const handleSaveImagePicker = (background: IBackground) => {
    handleSaveBackgroundPicker(background);
    setImagesPickerModalOpen(false);
  }

  return (
    <>
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
          <div className='background-picker__content__item' onClick={() => setColorPickerModalOpen(true)}>
            <img src={'https://trello.com/assets/97db30fe74a58b7b7a18.png'} alt='colors' />
            <p>Colors</p>
          </div>
        </div>
      </div>

      <ModalWrapper modalOpen={imagesPickerModalOpen} closeModal={() => setImagesPickerModalOpen(false)} modalStyle={imagePickerModalStyles}>
        <ImagePicker
          setIsOpen={setImagesPickerModalOpen}
          initialSelectedBackground={board.background as IBackground}
          handleSaveBackgroundPicker={handleSaveImagePicker} />
      </ModalWrapper>

      <ModalWrapper modalOpen={colorPickerModalOpen} closeModal={() => setColorPickerModalOpen(false)} modalStyle={colorPickerModalStyles}>
        <ColorPicker
          setIsOpen={setColorPickerModalOpen}
          hasHeader={false}
          initialTile={{ id: '', backgroundColor: board?.background?.background as string,  hoverColor: '',  textColor: '' }}
          handleSaveColorPicker={handleSaveColorPicker}
          handleCloseColorPicker={() => setColorPickerModalOpen(false)} />
      </ModalWrapper>
    </>
  )
}

export default BackgroundPicker;
