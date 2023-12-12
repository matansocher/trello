import { ReactNode } from 'react';
import './ModalWrapper.scss';
import { Box, Modal } from '@mui/material';
import { IModalStyles } from '@models';

const DEFAULT_MODAL_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#333b41',
  outline: 'none',
  p: 2,
  borderRadius: '10px',
};

interface IModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  modalStyle: IModalStyles;
  children: ReactNode;
}

function ModalWrapper({ modalOpen, setModalOpen, modalStyle, children }: IModalProps) {
  const finalModalStyle = { ...DEFAULT_MODAL_STYLE, ...modalStyle };
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={finalModalStyle}>
        {children}
      </Box>
    </Modal>
  )
}

export default ModalWrapper;
