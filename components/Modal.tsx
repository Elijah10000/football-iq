import React, { ReactNode, useRef } from 'react';
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
        maxWidth: '1200px',
        width: '100%',
        height: '80vh',
    },
    closeButton: {
        fontSize: '2rem',
    },
};

function ModalComponent({ isOpen, onRequestClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (!navigator.share) {
            console.error('Web Share API not supported in this browser');
            return;
        }
    
        try {
            const modalContent = modalRef.current?.textContent ?? '';
            const shareData = {
                title: 'Check out these statistics!',
                text: modalContent + '\n\n',
            };
    
            await navigator.share(shareData);
    
            console.log('Shared successfully');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Modal"
        >
            <button
                onClick={onRequestClose}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    color: 'black',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '50%',
                    fontSize: '2rem',
                    cursor: 'pointer',
                }}
            >
                X
            </button>
            <div ref={modalRef}>{children}</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Share the Stats!</h2>
                <button
                    id="share-button"
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onClick={handleShare}
                >
                    Share
                </button>
            </div>
        </Modal>
    );
}

export { ModalComponent };