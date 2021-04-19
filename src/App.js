import React, { Component } from 'react';
// Importing components
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import Modal from './components/Modal';
import Error from './components/Error';
// Importing function to fetch images from API
import { fetchImages } from './services/pixabayApi';
// Loader from https://github.com/mhnpd/react-loader-spinner and its styles
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import _ from 'lodash';
class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    selectedImg: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImages();
    }
  }

  handleSubmit = newQuery => {
    this.setState({
      images: [],
      query: newQuery,
      page: 1,
      error: null,
      selectedImg: '',
      showModal: false,
    });
  };

  getImages = () => {
    const { query, page } = this.state;

    const options = {
      query,
      page,
    };

    this.setState({ isLoading: true });

    fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));

        // Taken from Homework task for smooth scroll
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  setLargeImg = image => {
    this.setState({ selectedImg: image.largeImageURL });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  deleteImage = imageId => {
    this.setState(prevState => {
      return {
        images: prevState.images.filter(image => image.id !== imageId),
      };
    });
  };

  render() {
    const { images, error, isLoading, showModal, selectedImg } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <Container>
          <ImageGallery>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                setLargeImg={this.setLargeImg}
                deleteImage={this.deleteImage}
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
          <Button onLoadMore={this.getImages} />
        )}
        {showModal && (
          <Modal largeImgUrl={selectedImg} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
