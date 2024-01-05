import Checkbox from '@mui/material/Checkbox';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import { IColorTile, ILabel } from '@models';
import { ColorPicker } from '@components';
import { useState } from 'react';

interface ILabelsPickerItemProps {
  label: ILabel;
  isChecked: boolean;
  handleSaveColorPicker: (editLabelId: string, title: string, selectedColor: IColorTile) => void;
  handleLabelsChange: (label: ILabel, isChecked: boolean) => void;
}

function LabelsPickerItem({ label, isChecked, handleSaveColorPicker, handleLabelsChange }: ILabelsPickerItemProps) {
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);

  const handleCloseColorPicker = () => {
    setColorPickerModalOpen(false);
  }

  const saveColorPickerItem = (editLabelId: string, title: string, tile: IColorTile) => {
    handleSaveColorPicker(editLabelId, title, tile);
    setColorPickerModalOpen(false);
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
        onClick={() => handleLabelsChange(label, !isChecked)}>
        <p style={{color: label.textColor}}>{label.displayName}</p>
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
        handleSaveColorPicker={saveColorPickerItem}
        handleCloseColorPicker={handleCloseColorPicker}/>
    </div>
  )
}

export default LabelsPickerItem;
