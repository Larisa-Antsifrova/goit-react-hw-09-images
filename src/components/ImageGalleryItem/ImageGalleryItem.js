import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteButton from '../DeleteButton';

import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showDeleteButton: false,
  };

  toggleButton = () => {
    this.setState({
      showDeleteButton: !this.state.showDeleteButton,
    });
  };
  showButton = () => {
    this.setState({ showDeleteButton: true });
  };

  render() {
    const { image, setLargeImg, deleteImage } = this.props;
    const { webformatURL, tags, id } = image;

    return (
      <li
        className={styles.ImageGalleryItem}
        onMouseEnter={this.toggleButton}
        onMouseLeave={this.toggleButton}
        onMouseOver={this.showButton}
      >
        <img
          onClick={() => setLargeImg(image)}
          src={webformatURL}
          alt={tags}
          className={styles['ImageGalleryItem-image']}
        />
        {this.state.showDeleteButton && (
          <DeleteButton id={id} onDelete={deleteImage} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  setLargeImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
