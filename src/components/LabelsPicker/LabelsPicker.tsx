import Checkbox from '@mui/material/Checkbox';
import { ModalWrapper } from '@components';
import { useGetLabels } from '@hooks';
import { ILabel, IModalStyles } from '@models';
import './LabelsPicker.scss';

const labelsModalStyles: IModalStyles = {
  width: 320,
  p: 2,
};

interface ILabelsPickerProps {
  handleLabelsChange: (label: ILabel, isChecked: boolean) => void;
  cardLabels: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function LabelsPicker({ handleLabelsChange, cardLabels, isOpen, setIsOpen }: ILabelsPickerProps) {
  const { labels } = useGetLabels();

  const renderLabels = () => {
    return labels.map((label: ILabel) => {
      const isChecked = cardLabels?.includes(label.id);
      return (
        <div className='label-select' key={label.id}>
          <Checkbox
            checked={isChecked}
            onChange={(event) => handleLabelsChange(label, event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }} />
          <div
            className='label-color'
            style={{ backgroundColor: label.backgroundColor }}
            onClick={() => handleLabelsChange(label, !isChecked)}>
            <p style={{ color: label.textColor }}>{label.displayName}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <ModalWrapper modalOpen={isOpen} setModalOpen={setIsOpen} modalStyle={labelsModalStyles}>
      <div className='labels-wrapper'>
        <p>Labels</p>
        {renderLabels()}
        <button className='save-button' onClick={() => setIsOpen(false)}>Save</button>
      </div>
    </ModalWrapper>
  )
}

export default LabelsPicker;
