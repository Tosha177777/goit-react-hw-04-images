import React from 'react';
import css from '../../Styles.module.css';

const Button = ({ handleClick, showImages }) => {
  return (
    showImages && (
      <button type="button" className={css.Button} onClick={handleClick}>
        Load more
      </button>
    )
  );
};
export default Button;
