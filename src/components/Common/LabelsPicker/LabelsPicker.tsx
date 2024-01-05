import { useState } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { ModalWrapper, LabelsPickerItem, ColorPicker } from '@components';
import { useBoard, useLabels } from '@context';
import { IColorTile, ILabel, IModalStyles } from '@models';
import { dataService, firebaseService } from '@services';
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

function LabelsPicker({ isOpen, setIsOpen, handleLabelsChange, cardLabels }: ILabelsPickerProps) {
  const { labels } = useLabels();
  const { boardState } = useBoard();
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false);

  const handleCloseColorPicker = () => {
    setColorPickerModalOpen(false);
  }

  const handleSaveColorPicker = async (editLabelId: string, title: string, tile: IColorTile) => {
    const newLabel: ILabel = {
      displayName: title,
      backgroundColor: tile.backgroundColor,
      textColor: tile.textColor as string
    };

    const newLabels = labels.filter((label: ILabel) => label.id !== editLabelId);
    newLabels.push(newLabel);

    if (editLabelId) {
      firebaseService.updateLabel({ ...newLabel, id: editLabelId });
    } else {
      const labelId = await firebaseService.createLabel(newLabel);
      dataService.addLabelToBoard(boardState, labelId);
    }

    setColorPickerModalOpen(false);
  }

  const handleDeleteColorPickerItem = async (editLabelId: string) => {
    firebaseService.deleteLabel(editLabelId);
    dataService.removeLabelFromBoard(boardState, editLabelId);
  }

  const renderLabels = () => {
    return labels.map((label: ILabel) => {
      const isChecked = cardLabels?.includes(label.id as string);
      return (
        <LabelsPickerItem
          key={label.id}
          label={label}
          isChecked={isChecked}
          handleSaveColorPicker={handleSaveColorPicker}
          handleDeleteColorPickerItem={handleDeleteColorPickerItem}
          handleLabelsChange={handleLabelsChange} />
      );
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
