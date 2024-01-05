import { ModalWrapper, LabelsPickerItem, ColorPicker } from '@components';
import { useLabels } from '@context';
import { IColorTile, ILabel, IModalStyles } from '@models';
import './LabelsPicker.scss';
import { Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';

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
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);

  const handleCloseColorPicker = () => {
    setColorPickerModalOpen(false);
  }

  const handleSaveColorPicker = (editLabelId: string, title: string, tile: IColorTile) => {
    const newLabel: ILabel = {
      displayName: title,
      backgroundColor: tile.backgroundColor,
      textColor: tile.textColor as string
    };
    console.log('editLabelId');
    console.log(editLabelId);
    console.log('newLabel');
    console.log(newLabel);
    console.log('labels');
    console.log(labels);

    const newLabels = labels.filter((label: ILabel) => label.id !== editLabelId);
    newLabels.push(newLabel);

    if (editLabelId) {
      // edited an existing label - update it in labels collection
    } else {
      // created new label - save it to labels collection
    }
    console.log('newLabels');
    console.log(newLabels);
    setColorPickerModalOpen(false);
  }

  const renderLabels = () => {
    return labels.map((label: ILabel) => {
      const isChecked = cardLabels?.includes(label.id as string);
      return <LabelsPickerItem key={label.id} label={label} isChecked={isChecked} handleSaveColorPicker={handleSaveColorPicker} handleLabelsChange={handleLabelsChange} />;
    })
  }

  return (
    <ModalWrapper modalOpen={isOpen} closeModal={() => setIsOpen(false)} modalStyle={labelsModalStyles}>
      <div className='labels-wrapper'>
        <div className='labels-wrapper__header'>
          <div className='close' onClick={() => setIsOpen(false)}>
            <CloseIcon/>
          </div>
          <p>Labels</p>
        </div>
        <div className='labels-wrapper__divider'></div>
        <div className='labels-wrapper__labels'>
        {renderLabels()}
        </div>
        <button className='add-new-button' onClick={() => setColorPickerModalOpen(true)}>Add new label</button>
      </div>

      <ColorPicker
        isOpen={colorPickerModalOpen}
        setIsOpen={setColorPickerModalOpen}
        handleSaveColorPicker={handleSaveColorPicker}
        handleCloseColorPicker={handleCloseColorPicker} />

    </ModalWrapper>
  )
}

export default LabelsPicker;
