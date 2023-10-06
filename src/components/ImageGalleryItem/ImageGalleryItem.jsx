// import axios from 'axios';
import React, { Component } from 'react';
import css from '../../Styles.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { images, showImages, onToggleModal } = this.props;

    // Получите изображения из состояния
    return (
      <>
        {showImages &&
          images.map(({ id, webformatURL, largeImageURL }) => {
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
  }
}
