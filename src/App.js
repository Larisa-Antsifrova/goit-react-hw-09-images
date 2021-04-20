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
  // Declaring all state slices
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // useEffect is used to send fetch request for a new batch of images.
  useEffect(() => {
    // When the page is loaded for the first time, we do not expect any pictures to be rendered.
    if (!query) return;
    // Setting loading to true to display loader.
    setIsLoading(true);
    // Sending fetch request to get a new batch of images.
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
    // Sending fetch request depends on query and page.
    // If any of the two or both parameters change we want to send new fetch request.
  }, [page, query]);

  // When the new form submited we want to resent all state fields except for the query.
  const handleSubmit = newQuery => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
    setIsLoading(false);
    setError(null);
    setSelectedImage('');
    setShowModal(false);
  };

  // Function to set the large image url to be used in Modal, and to open Modal.
  const setLargeImg = largeImageURL => {
    setSelectedImage(largeImageURL);
    toggleModal();
  };

  // Function to increase page in the state. We want to page to be increased only when we press the Load more button.
  const increasePage = () => setPage(prevPage => prevPage + 1);

  // Function to open or close Modal.
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to delete one image from the displayed batch.
  const deleteImage = imageId => {
    setImages(prevImages => prevImages.filter(image => image.id !== imageId));
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
