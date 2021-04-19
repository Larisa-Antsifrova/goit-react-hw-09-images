// React imports
import React from 'react';
// Icons imports
import { MdRemoveCircleOutline } from 'react-icons/md';
// Styles imports
import styles from './DeleteButton.module.css';

const DeleteButton = ({ id, onDelete }) => {
  return (
    <button
      type="button"
      onClick={() => onDelete(id)}
      className={styles.DeleteButton}
    >
      <MdRemoveCircleOutline className={styles.deleteIcon} />
    </button>
  );
};

export default DeleteButton;
