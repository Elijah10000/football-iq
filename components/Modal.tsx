import React, { ReactNode } from 'react';
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: ReactNode;
}

Modal.setAppElement('#__next');

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 9999,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
        maxWidth: '900px',
        width: '100%',
        height: '80vh', // Set the height to 80% of the viewport height
    },
};

function ModalComponent({ isOpen, onRequestClose, children }: ModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Modal"
        >
            {children}
        </Modal>
    );
};

export { ModalComponent };
