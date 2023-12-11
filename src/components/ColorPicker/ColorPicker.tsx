import { IColorTile } from '@models';
import { TILES } from './ColorPicker.config';
import './ColorPicker.scss';

interface ColorPickerProps {
  handleColorClick: (tile: IColorTile) => void,
}

function ColorPicker({ handleColorClick }: ColorPickerProps) {

  const renderColors = () => {
    return TILES.map((tile: IColorTile) => {
      return (
        <div
          key={tile.id}
          className='color-picker__colors__color'
          style={{ backgroundColor: tile.backgroundColor }}
          onClick={() => handleColorClick(tile)}
        />
      )
    })
  }

  return (
    <div className='color-picker'>
      <p>select a color</p>
      <div className='color-picker__colors'>
        {renderColors()}
      </div>
    </div>
  )
}

export default ColorPicker;
