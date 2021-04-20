// React imports
import React, { useState, useEffect } from 'react';
// Components imports
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import Modal from './components/Modal';
import Error from './components/Error';
// Importing function to fetch images from API
import { fetchImages } from './services/pixabayApi';
// Loader imports
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// Libs imports
import _ from 'lodash';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    fetchImages({
      query,
      page,
    })
      .then(images => {
        setImages(prevImages => [...prevImages, ...images]);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const handleSubmit = newQuery => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
    setIsLoading(false);
    setError(null);
    setSelectedImage('');
    setShowModal(false);
  };

  const setLargeImg = largeImageURL => {
    setSelectedImage(largeImageURL);
    toggleModal();
  };

  const increasePage = () => setPage(prevPage => prevPage + 1);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deleteImage = imageId => {
    setImages(prevState => prevState.filter(image => image.id !== imageId));
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <Container>
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              setLargeImg={setLargeImg}
              deleteImage={deleteImage}
            />
          ))}
        </ImageGallery>
        {error && <Error message={error.message} />}
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={80}
            width={80}
            className="loader"
          />
        )}
      </Container>
      {!_.isEmpty(images) && !isLoading && (
        <Button onClick={increasePage} label="Load more" />
      )}
      {showModal && <Modal largeImgUrl={selectedImage} onClose={toggleModal} />}
    </div>
  );
}
