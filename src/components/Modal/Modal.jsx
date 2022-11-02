import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled.js';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.clickKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickKeyDown);
  }

  clickKeyDown = elem => {
    if (elem.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImgURL, tag } = this.props.dataModal;
    console.log(this.props);

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={largeImgURL} alt={tag} />
        </ModalWindow>
      </Overlay>
    );
  }
}
