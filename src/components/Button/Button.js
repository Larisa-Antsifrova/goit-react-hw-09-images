// React imports
import React from 'react';
// Helpers imports
import PropTypes from 'prop-types';
// Styles imports
import styles from './Button.module.css';

const Button = ({ onClick, label }) => {
  return (
    <button type="button" className={styles.Button} onClick={onClick}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  label: 'Button',
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default Button;
