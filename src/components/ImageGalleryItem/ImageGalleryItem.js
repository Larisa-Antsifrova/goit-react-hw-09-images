// React imports
import React, { useState } from 'react';
// Components imports
import DeleteButton from '../DeleteButton';
// Helpers imports
import PropTypes from 'prop-types';
// Styles imports
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  image: { webformatURL, largeImageURL, tags, id },
  setLargeImg,
  deleteImage,
}) {
  const [showDeleteButton, setShowDeleteButton] = useState();

  const toggleButton = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const showButton = () => {
    setShowDeleteButton(true);
  };

  return (
    <li
      className={styles.ImageGalleryItem}
      onMouseEnter={toggleButton}
      onMouseLeave={toggleButton}
      onMouseOver={showButton}
    >
      <img
        onClick={() => setLargeImg(largeImageURL)}
        src={webformatURL}
        alt={tags}
        className={styles['ImageGalleryItem-image']}
      />
      {showDeleteButton && <DeleteButton id={id} onDelete={deleteImage} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  setLargeImg: PropTypes.func.isRequired,
};
