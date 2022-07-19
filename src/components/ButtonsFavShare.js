import React /* { useState } */ from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ButtonsFavShare({ copyUrl }) {
  return (
    <div>
      <button type="button" data-testid="favorite-btn">
        Favorite
      </button>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copy(copyUrl) }
      >
        <img
          src={ shareIcon }
          alt="share-url"
        />
      </button>
    </div>
  );
}

ButtonsFavShare.propTypes = {
  copyUrl: PropTypes.string.isRequired,
};

export default ButtonsFavShare;
