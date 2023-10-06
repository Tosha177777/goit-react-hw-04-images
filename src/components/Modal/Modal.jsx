import React, { Component } from 'react';
import css from '../../Styles.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleClick);
  }
  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };
  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={css.Overlay} onClick={this.handleClick}>
        <div className={css.Modal}>
          <img src={this.props.data} alt="" />
        </div>
      </div>
    );
  }
}
