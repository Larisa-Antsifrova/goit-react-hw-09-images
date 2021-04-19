// React imports
import React from 'react';
// Styles imports
import styles from './CloseButton.module.css';

const CloseButton = ({ onClose }) => {
  return (
    <button type="button" className={styles.CloseButton} onClick={onClose}>
      x
    </button>
  );
};

export default CloseButton;
