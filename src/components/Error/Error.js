// React imports
import React from 'react';
// Helpers imports
import PropTypes from 'prop-types';
// Styles imports
import styles from './Error.module.css';

const Error = ({ message }) => {
  return <p className={styles.error}>{message}</p>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
