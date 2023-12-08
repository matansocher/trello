import { ReactNode } from 'react';
import './ModalWrapper.scss'
import { Box, Modal } from '@mui/material';

interface IModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  children: ReactNode;
}

function ModalWrapper({ modalOpen, setModalOpen, children }: IModalProps) {

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 700,
    bgcolor: '#333b41',
    outline: 'none',
    p: 2,
    borderRadius: '10px',
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        {children}
      </Box>
    </Modal>
  )
}

export default ModalWrapper;
