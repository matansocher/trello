import { MouseEvent, useState } from 'react';
import { Delete as DeleteIcon, EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { ColorPicker } from '@components';
import { IColorTile, ILabel } from '@models';
import { useToggleHover } from '@hooks';
import { COLOR_TILES } from '../ColorPicker/ColorPicker.config.tsx';

interface ILabelsPickerItemProps {
  label: ILabel;
  isChecked: boolean;
  handleSaveColorPicker: (editLabelId: string, title: string, selectedColor: IColorTile) => void;
  handleDeleteColorPickerItem: (label: ILabel) => void;
  handleLabelsChange: (label: ILabel, isChecked: boolean) => void;
}

function LabelsPickerItem({ label, isChecked, handleSaveColorPicker, handleDeleteColorPickerItem, handleLabelsChange }: ILabelsPickerItemProps) {
  const [isHovered, hoverEventHandlers] = useToggleHover(false);
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);
  const relevantColorTile: IColorTile = COLOR_TILES.find((tile: IColorTile) => tile.backgroundColor.toLowerCase() === label.backgroundColor.toLowerCase()) as IColorTile;

  const handleCloseColorPicker = () => {
    setColorPickerModalOpen(false);
  }

  const saveColorPickerItem = (editLabelId: string, title: string, tile: IColorTile) => {
    handleSaveColorPicker(editLabelId, title, tile);
    setColorPickerModalOpen(false);
  }

  const handleLabelColorClick = (event: MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as any;
    const isClickedOnDeleteIcon = clickedElement.classList.contains('delete-icon') || clickedElement.closest('.delete-icon');
    if (isClickedOnDeleteIcon) {
      return;
    }
    handleLabelsChange(label, !isChecked);
  }

  return (
    <div className='label-select'>
      <Checkbox
        checked={isChecked}
        onChange={(event) => handleLabelsChange(label, event.target.checked)}
        inputProps={{'aria-label': 'controlled'}}/>
      <div
        className='label-color'
        style={{backgroundColor: label.backgroundColor}}
        onClick={handleLabelColorClick}
        {...(hoverEventHandlers as Object)}>
        <p style={{color: label.textColor}}>{label.displayName}</p>
        {isHovered ? <div className='delete-icon' onClick={() => handleDeleteColorPickerItem(label)}>
          <DeleteIcon />
        </div> : null}
      </div>
      <div
        className='label-edit'
        onClick={() => setColorPickerModalOpen(true)}>
        <EditOutlinedIcon/>
      </div>

      <ColorPicker
        isOpen={colorPickerModalOpen}
        setIsOpen={setColorPickerModalOpen}
        editLabelId={label.id}
        initialTitle={label.displayName}
        initialTile={relevantColorTile}
        handleSaveColorPicker={saveColorPickerItem}
        handleCloseColorPicker={handleCloseColorPicker}/>
    </div>
  )
}

export default LabelsPickerItem;
