import { useState } from 'react';
import { Close as CloseIcon, RestoreOutlined as RestoreOutlinedIcon } from '@mui/icons-material';
import { ModalWrapper, LabelsPickerItem, ColorPicker } from '@components';
import { useBoard, useLabels } from '@context';
import { IColorTile, ILabel, IModalStyles } from '@models';
import { firebaseService } from '@services';
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

  const handleSaveColorPicker = async (tile: IColorTile, editLabelId: string, title: string) => {
    const newLabel: ILabel = {
      displayName: title,
      backgroundColor: tile.backgroundColor,
      textColor: tile.textColor as string
    };

    let labelIds = labels.map((label: ILabel) => label.id as string);

    if (editLabelId) {
      const relevantLabel = labels.find((label: ILabel) => label.id === editLabelId) as ILabel;
      if (relevantLabel.isDefault) {
        const newLabelId = await firebaseService.createLabel(newLabel);
        firebaseService.replaceDefaultLabelWithNewUpdatedLabel(boardState, editLabelId, newLabelId);
        labelIds = labelIds.filter((labelId: string) => labelId !== editLabelId);
        labelIds.push(newLabelId);
      } else {
        firebaseService.updateLabel({ ...newLabel, id: editLabelId });
      }
    } else {
      const labelId = await firebaseService.createLabel(newLabel);
      labelIds.push(labelId);
    }
    firebaseService.updateBoardLabels(boardState, labelIds);

    setColorPickerModalOpen(false);
  }

  const handleDeleteColorPickerItem = async (label: ILabel) => {
    if (!label.isDefault) {
      firebaseService.deleteLabel(label.id as string);
    }
    firebaseService.removeLabelFromBoard(boardState, label.id as string);
    firebaseService.deleteLabelFromUsingCards(boardState.lists, label.id as string);
  }

  const handleRestoreLabelsClick = async () => {
    firebaseService.restoreBoardLabels(labels, boardState);
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
          <div className='restore' onClick={handleRestoreLabelsClick}>
            <RestoreOutlinedIcon/>
          </div>
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
