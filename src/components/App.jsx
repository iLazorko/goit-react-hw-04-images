import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle.js';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from '../Api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Wrapper } from './App.styled.js';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    totalHits: null,
    total: null,
    error: '',
    isLoading: false,
    page: 1,
    modal: {
      tag: '',
      largeImgURL: '',
    },
  };

  updateStateQuery = value => {
    this.setState({
      searchValue: value,
      images: [],
      page: 1,
    });
  };

  getImages = async () => {
    try {
      this.setState({ isLoading: true });

      const pictures = await fetchImages(
        this.state.searchValue,
        this.state.page
      );

      const picturesInfo = pictures.hits.map(
        ({ webformatURL, largeImageURL, id, tags }) => ({
          id,
          smallImageURL: webformatURL,
          largeImageURL: largeImageURL,
          tags,
        })
      );

      this.setState(prevState => ({
        totalHits: pictures.totalHits,
        images: [...prevState.images, ...picturesInfo],
        total: pictures.total,
      }));
      this.setState({ isLoading: false });

      if (!pictures.hits.length) {
        return toast.error('There is no images found with that search request');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidUpdate(_, prevState) {
    const prevSearchValue = prevState.searchValue;
    const currentSearchValue = this.state.searchValue;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevPage !== currentPage || prevSearchValue !== currentSearchValue) {
      this.getImages();
    }

    if (prevSearchValue !== currentSearchValue) {
      this.setState({
        images: [],
        page: 1,
      });
    }
  }

  moreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showImgModal = id => {
    const selectedPicture = this.state.images.find(image => image.id === id);

    this.setState({
      modal: {
        tag: selectedPicture.tags,
        largeImgURL: selectedPicture.largeImageURL,
      },
    });
  };

  closeImgModal = () => {
    this.setState({
      modal: {
        tag: '',
        largeImgURL: '',
      },
    });
  };

  render() {
    const { images, isLoading, totalHits, modal, error, searchValue } =
      this.state;
    return (
      <Wrapper>
        <Searchbar
          updateStateQuery={this.updateStateQuery}
          searchValue={searchValue}
        />
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
        {images.length > 0 && (
          <ImageGallery>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  id={image.id}
                  onClick={this.showImgModal}
                />
              );
            })}
          </ImageGallery>
        )}
        {totalHits > 12 && !isLoading && images.length !== totalHits && (
          <Button moreImages={this.moreImages} />
        )}
        {isLoading && <Loader />}
        {modal.largeImgURL !== '' && (
          <Modal dataModal={modal} closeModal={this.closeImgModal} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <GlobalStyle />
      </Wrapper>
    );
  }
}
