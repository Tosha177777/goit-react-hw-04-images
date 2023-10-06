import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import fetchImages from 'components/Service/api';
import { ColorRing } from 'react-loader-spinner';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    input: '',
    modal: {
      isOpened: false,
      data: '',
    },
    page: 1,
    perPage: 12,
    images: null,
    isLoading: false,
    totalHits: 0,
    loadMore: true,
  };

  componentDidMount() {
    this.fetchAllImages();
  }

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.input !== prevState.input ||
      this.state.page !== prevState.page
    ) {
      this.fetchAllImages();
    }
  }

  onToggleModal = modalData => {
    this.setState(prevState => ({
      modal: {
        isOpened: !prevState.modal.isOpened,
        data: modalData,
      },
    }));
  };

  fetchAllImages = async () => {
    const { page, perPage, input } = this.state;
    try {
      if (page === 1) {
        this.setState({ images: null });
      }
      this.setState({
        isLoading: true,
      });
      const images = await fetchImages(page, perPage, input);
      this.setState(prevState => ({
        totalHits: images.totalHits,
        images:
          page === 1 ? images.hits : [...prevState.images, ...images.hits],
        loadMore: page < Math.ceil(images.totalHits / perPage),
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSubmit = input => {
    if (!input) {
      return;
    }

    this.setState({
      input,
      page: 1,
    });
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images } = this.state;
    const showImages =
      Array.isArray(this.state.images) && this.state.images.length;
    return (
      <div>
        <Searchbar handleSubmit={this.handleSubmit} />
        <ColorRing visible={this.state.isLoading} />
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            showImages={showImages}
            onToggleModal={this.onToggleModal}
          />
        </ImageGallery>
        {this.state.loadMore && (
          <Button handleClick={this.handleClick} showImages={showImages} />
        )}
        {this.state.modal.isOpened && (
          <Modal data={this.state.modal.data} onClose={this.onToggleModal} />
        )}
      </div>
    );
  }
}
