import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import fetchImages from 'components/Service/api';
import { ColorRing } from 'react-loader-spinner';
import Modal from './Modal/Modal';

export const App = () => {
  const [input, setInput] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [data, setData] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!input) {
      return;
    }
    const fetchAllImages = async () => {
      setIsLoading(true);
      try {
        const imagesEl = await fetchImages(page, input);
        setImages(prevImages =>
          page === 1 ? imagesEl.hits : [...prevImages, ...imagesEl.hits]
        );
        setLoadMore(page < Math.ceil(imagesEl.totalHits / 12));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllImages();
  }, [page, input]);

  const onToggleModal = modalData => {
    setIsOpened(!isOpened);
    setData(modalData);
  };

  const handleSubmit = input => {
    if (!input) {
      return;
    }

    setInput(input);
    setPage(1);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  const showImages = Array.isArray(images) && images.length;

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery>
        {showImages ? (
          <ImageGalleryItem images={images} onToggleModal={onToggleModal} />
        ) : (
          <ColorRing visible={isLoading} />
        )}
      </ImageGallery>
      {loadMore && <Button handleClick={handleClick} />}
      {isOpened && <Modal data={data} onClose={onToggleModal} />}
    </div>
  );
};
