// React imports
import React from 'react';
// Icons imports
import { MdClose } from 'react-icons/md';
// Styles imports
import styles from './CloseButton.module.css';

const CloseButton = ({ onClose }) => {
  return (
    <button type="button" className={styles.CloseButton} onClick={onClose}>
      <MdClose />
    </button>
  );
};

export default CloseButton;
