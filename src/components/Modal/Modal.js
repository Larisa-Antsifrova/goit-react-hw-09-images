// React imports
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// Components imports
import CloseButton from '../CloseButton';
// Helpers imports
import PropTypes from 'prop-types';
// Styles imports
import styles from './Modal.module.css';

// Getting access to another div to render the Modal
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImgUrl }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => event.code === 'Escape' && onClose();

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleBackdropClick = event =>
    event.currentTarget === event.target && onClose();

  const handleLoad = () => setLoaded(true);

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        {loaded && <CloseButton onClose={onClose} />}
        <img src={largeImgUrl} alt="Gallery item" onLoad={handleLoad} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
};
