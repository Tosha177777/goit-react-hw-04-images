import React from 'react';
import css from '../../Styles.module.css';

const ImageGalleryItem = ({ images, onToggleModal }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li className={css.ImageGalleryItem} key={id}>
            <img
              onClick={() => {
                largeImageURL && onToggleModal(largeImageURL);
              }}
              src={webformatURL}
              alt=""
              className={css.ImageGalleryItemImage}
            />
          </li>
        );
      })}
    </>
  );
};

export default ImageGalleryItem;
