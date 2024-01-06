import { ModalWrapper } from '@components';
import { IColorTile, IModalStyles } from '@models';
import { COLOR_TILES } from './ColorPicker.config';
import './ColorPicker.scss';
import { Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';

const colorPickerModalStyles: IModalStyles = {
  width: 320,
  // @ts-ignore
  padding: 0,
  p: 2,
};

interface IColorPickerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editLabelId?: string;
  initialTitle?: string;
  initialTile?: IColorTile;
  handleSaveColorPicker: (editLabelId: string, title: string, selectedColor: IColorTile) => void;
  handleCloseColorPicker: () => void;
}

function ColorPicker({ isOpen, setIsOpen, editLabelId, initialTitle, initialTile, handleSaveColorPicker, handleCloseColorPicker }: IColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<IColorTile | null>(initialTile || null);
  const [title, setTitle] = useState(initialTitle || '');

  const handleSaveBtnClick = () => {
    if (!title?.length || !selectedColor) return;
    handleSaveColorPicker(editLabelId as string, title, selectedColor);
    setTitle('');
  }

  const renderColorTiles = () => {
    return COLOR_TILES.map((tile: IColorTile) => {
      const isSelected = selectedColor?.id === tile.id;
      return (
        <div
          key={tile.id}
          className={`color-picker__colors__tiles__tile ${isSelected ? 'selected-tile' : ''}`}
          style={{ backgroundColor: tile.backgroundColor }}
          onClick={() => setSelectedColor(tile)}
        />
      )
    })
  }

  return (
    <ModalWrapper modalOpen={isOpen} closeModal={() => setIsOpen(false)} modalStyle={colorPickerModalStyles}>
      <div className='color-picker'>
        <div className='color-picker__header'>
          <p>Title</p>
          <input type='text' placeholder='Choose a title' value={title} onInput={e => setTitle((e.target as HTMLInputElement).value)}/>
          <CloseIcon onClick={handleCloseColorPicker}/>
        </div>
        <div className='color-picker__colors'>
          <p>Select a color</p>
          <div className='color-picker__colors__tiles'>
          {renderColorTiles()}
          </div>
        </div>
        <div className='color-picker__footer'>
          <button className='save' onClick={handleSaveBtnClick}>Save</button>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ColorPicker;
