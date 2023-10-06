import React, { Component } from 'react';
import css from '../../Styles.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export default class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = event => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { input } = this.state;
    this.props.handleSubmit(input);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <SearchIcon width={35} height={35} />
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            name="input"
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
