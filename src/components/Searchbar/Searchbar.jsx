import React, { useState } from 'react';
import css from '../../Styles.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

const Searchbar = ({ handleSubmit }) => {
  const [input, setInput] = useState('');

  const handleChange = event => {
    setInput(event.target.value);
  };

  const onHandleSubmit = event => {
    event.preventDefault();
    handleSubmit(input);
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onHandleSubmit}>
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
          value={input}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
export default Searchbar;
