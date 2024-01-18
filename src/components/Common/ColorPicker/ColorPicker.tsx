import { useState } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { ModalWrapper } from '@components';
import { IColorTile, IModalStyles } from '@models';
import { COLOR_TILES } from '@constants';
import './ColorPicker.scss';

const colorPickerModalStyles: IModalStyles = {
  width: 320,
  // @ts-ignore
  padding: 0,
  p: 2,
};

interface IColorPickerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  hasHeader?: boolean;
  editLabelId?: string;
  initialTitle?: string;
  initialTile?: IColorTile;
  handleSaveColorPicker: (selectedColor: IColorTile, editLabelId: string, title: string) => void;
  handleCloseColorPicker: () => void;
}

function ColorPicker({ isOpen, setIsOpen, hasHeader = true, editLabelId, initialTitle, initialTile, handleSaveColorPicker, handleCloseColorPicker }: IColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<IColorTile | null>(initialTile || null);
  const [title, setTitle] = useState(initialTitle || '');

  const handleSaveBtnClick = () => {
    if ((hasHeader && !title?.length) || !selectedColor) return;
    handleSaveColorPicker(selectedColor, editLabelId as string, title);
    setTitle('');
  }

  const renderColorTiles = () => {
    return COLOR_TILES.map((tile: IColorTile) => {
      const isSelected = selectedColor?.id === tile.id || selectedColor?.backgroundColor === tile.backgroundColor;
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
        {hasHeader ? <div className='color-picker__header'>
          <p>Title</p>
          <input type='text' placeholder='Choose a title' value={title} onInput={e => setTitle((e.target as HTMLInputElement).value)}/>
          <CloseIcon onClick={handleCloseColorPicker}/>
        </div> : null}
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
