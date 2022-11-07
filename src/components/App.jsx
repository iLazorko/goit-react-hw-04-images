import React, { useState, useEffect } from 'react';
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

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalTag, setModalTag] = useState('');
  const [largeImgURL, setLargeImgURL] = useState('');

  const updateStateQuery = value => {
    setSearchValue(value);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);
        const pictures = await fetchImages(searchValue, page);
        const picturesInfo = pictures.hits.map(
          ({ webformatURL, largeImageURL, id, tags }) => ({
            id,
            smallImageURL: webformatURL,
            largeImageURL: largeImageURL,
            tags,
          })
        );

        setTotalHits(pictures.totalHits);
        setImages(prevState => [...prevState, ...picturesInfo]);
        setIsLoading(false);

        if (!pictures.hits.length) {
          return toast.error(
            'There is no images found with that search request'
          );
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [page, searchValue]);

  const moreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const showImgModal = id => {
    const selectedPicture = images.find(image => image.id === id);

    setModalTag(selectedPicture.tags);
    setLargeImgURL(selectedPicture.largeImageURL);
  };

  const closeImgModal = () => {
    setModalTag('');
    setLargeImgURL('');
  };

  return (
    <Wrapper>
      <Searchbar updateStateQuery={updateStateQuery} />
      {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
      {images.length > 0 && (
        <ImageGallery>
          {images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                image={image}
                onClick={showImgModal}
              />
            );
          })}
        </ImageGallery>
      )}
      {totalHits > 12 && !isLoading && images.length !== totalHits && (
        <Button moreImages={moreImages} />
      )}
      {isLoading && <Loader />}
      {largeImgURL !== '' && (
        <Modal
          largeImgURL={largeImgURL}
          tag={modalTag}
          closeModal={closeImgModal}
        />
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
};
