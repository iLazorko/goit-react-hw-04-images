import { Overlay, ModalWindow } from './Modal.styled.js';

export const Modal = ({ closeModal, dataModal }) => {
  const clickKeyDown = elem => {
    if (elem.code === 'Escape') {
      closeModal();
    }
  };

  window.addEventListener('keydown', clickKeyDown);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
      window.removeEventListener('keydown', clickKeyDown);
    }
  };

  const { largeImgURL, tag } = dataModal;

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImgURL} alt={tag} />
      </ModalWindow>
    </Overlay>
  );
};
