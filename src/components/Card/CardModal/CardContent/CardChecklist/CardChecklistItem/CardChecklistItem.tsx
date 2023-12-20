import { Delete as DeleteIcon } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import { EditableInput } from '@components';
import { useToggleHover } from '@hooks';
import { IChecklistItem } from '@models';
import './CardChecklistItem.scss';

interface ICardCheckListItemProps {
  checklistItem: IChecklistItem;
  handleChecklistItemChange: (checklistItem: IChecklistItem) => void;
}

function CardChecklistItem({ checklistItem, handleChecklistItemChange }: ICardCheckListItemProps) {
  const [isHovered, hoverEventHandlers] = useToggleHover(false);
  const { description, isChecked } = checklistItem;

  return (
  <div className='card-checklist__items__item' {...(hoverEventHandlers as Object)}>
    <Checkbox
      checked={isChecked}
      onChange={(event) => handleChecklistItemChange({ ...checklistItem, isChecked: event.target.checked } )}
      inputProps={{ 'aria-label': 'controlled' }} />
    <EditableInput handleSave={(newValue: string) => handleChecklistItemChange({ ...checklistItem, description: newValue })} initialValue={description} />
    {isHovered ? <div className='delete-icon'>
      <DeleteIcon/>
    </div> : null}
  </div>
  )
}

export default CardChecklistItem;
