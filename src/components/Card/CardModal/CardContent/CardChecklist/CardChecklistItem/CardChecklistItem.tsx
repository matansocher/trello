import { Delete as DeleteIcon, DragIndicatorOutlined as DragIndicatorOutlinedIcon } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { EditableInput } from '@components';
import { useToggleHover } from '@hooks';
import { IChecklistItem } from '@models';
import './CardChecklistItem.scss';

interface ICardCheckListItemProps {
  checklistItem: IChecklistItem;
  handleChecklistItemChange: (checklistItem: IChecklistItem) => void;
  handleChecklistItemDelete: (checklistItem: IChecklistItem) => void;
}

function CardChecklistItem({ checklistItem, handleChecklistItemChange, handleChecklistItemDelete }: ICardCheckListItemProps) {
  const [isHovered, hoverEventHandlers] = useToggleHover(false);
  const { description, isChecked } = checklistItem;

  return (
    <div className='card-checklist__items__item' {...(hoverEventHandlers as Object)}>
      <Checkbox
        checked={isChecked}
        onChange={(event) => handleChecklistItemChange({ ...checklistItem, isChecked: event.target.checked } )}
        inputProps={{ 'aria-label': 'controlled' }} />
      <DragIndicatorOutlinedIcon />
      <EditableInput handleSave={(newValue: string) => handleChecklistItemChange({ ...checklistItem, description: newValue })} initialValue={description} />
      {isHovered ? <div className='delete-icon' onClick={() => handleChecklistItemDelete(checklistItem)}>
        <DeleteIcon />
      </div> : null}
    </div>
  )
}

export default CardChecklistItem;
