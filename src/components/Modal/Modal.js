import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';

import styles from './Modal.module.css';

// Getting access to another div to render the Modal
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = {
    loaded: false,
  };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImgUrl: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleLoad = () => {
    this.setState({ loaded: true });
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImgUrl } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          {this.state.loaded && <CloseButton onClose={this.props.onClose} />}
          <img src={largeImgUrl} alt="Gallery item" onLoad={this.handleLoad} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
