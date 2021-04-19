// React imports
import React from 'react';
// Helpers imports
import PropTypes from 'prop-types';
// Styles imports
import styles from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={styles.ImageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
