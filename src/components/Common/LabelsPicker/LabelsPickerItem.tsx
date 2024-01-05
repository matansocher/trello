import Checkbox from '@mui/material/Checkbox';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import { ILabel } from '@models';

interface ILabelsPickerItemProps {
  label: ILabel;
  isChecked: boolean;
  handleLabelsChange: (label: ILabel, isChecked: boolean) => void;
}

function LabelsPickerItem({ label, isChecked, handleLabelsChange }: ILabelsPickerItemProps) {

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
        onClick={() => {
        }}>
        <EditOutlinedIcon/>
      </div>
    </div>
  )
}

export default LabelsPickerItem;
