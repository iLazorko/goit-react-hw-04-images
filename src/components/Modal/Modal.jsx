import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled.js';

export const Modal = ({ closeModal, largeImgURL, tag }) => {
  useEffect(() => {
    const clickKeyDown = elem => {
      if (elem.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', clickKeyDown);

    return () => {
      window.removeEventListener('keydown', clickKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImgURL} alt={tag} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImgURL: PropTypes.string.isRequired,
  tag: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
