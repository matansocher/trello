import { ModalWrapper, LabelsPickerItem } from '@components';
import { useLabels } from '@context';
import { ILabel, IModalStyles } from '@models';
import './LabelsPicker.scss';
import { Close as CloseIcon } from '@mui/icons-material';

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

function LabelsPicker({ isOpen, setIsOpen, handleLabelsChange, cardLabels }: ILabelsPickerProps) {
  const { labels } = useLabels();

  const renderLabels = () => {
    return labels.map((label: ILabel) => {
      const isChecked = cardLabels?.includes(label.id);
      return (
        <LabelsPickerItem key={label.id} label={label} isChecked={isChecked} handleLabelsChange={handleLabelsChange} />
      )
    })
  }

  return (
    <ModalWrapper modalOpen={isOpen} closeModal={() => setIsOpen(false)} modalStyle={labelsModalStyles}>
      <div className='labels-wrapper'>
        <p className='labels-wrapper__header'>Labels</p>
        <div className='labels-wrapper__close' onClick={() => setIsOpen(false)}>
          <CloseIcon/>
        </div>
        <div className='labels-wrapper__divider'></div>
        <div className='labels-wrapper__labels'>
          {renderLabels()}
        </div>
        <button className='add-new-button' onClick={() => {}}>Add new label</button>
      </div>
    </ModalWrapper>
  )
}

export default LabelsPicker;
