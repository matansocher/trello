import { ReactNode } from 'react';
import { Box, Modal } from '@mui/material';
import { IModalStyles } from '@models';
import './ModalWrapper.scss';

const DEFAULT_MODAL_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#333b41',
  outline: 'none',
  p: 2,
  borderRadius: '10px',
  boxSizing: 'border-box',
};

interface IModalProps {
  modalOpen: boolean;
  closeModal?: () => void;
  closeModalOnClickOutside?: boolean;
  modalStyle: IModalStyles;
  children: ReactNode;
}

function ModalWrapper({ modalOpen, closeModal, closeModalOnClickOutside = true, modalStyle, children }: IModalProps) {
  const finalModalStyle = { ...DEFAULT_MODAL_STYLE, ...modalStyle };

  const onClose = () => {
    if (closeModalOnClickOutside && closeModal) {
      closeModal();
    }
  }

  return (
    <Modal open={modalOpen} onClose={onClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={finalModalStyle}>
        {children}
      </Box>
    </Modal>
  )
}

export default ModalWrapper;
