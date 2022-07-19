import React /* { useState } */ from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import shareIcon from '../images/shareIcon.svg';

function ButtonsFavShare({ copyUrl }) {
  // console.log(copyUrl);
  return (
    <div>
      <button type="button" data-testid="favorite-btn">
        Favorite
      </button>

      <CopyToClipboard text={ copyUrl }>
        <button type="button" data-testid="share-btn">
          <img
            src={ shareIcon }
            alt="share-url"
          />
        </button>
      </CopyToClipboard>
    </div>
  );
}

ButtonsFavShare.propTypes = {
  copyUrl: PropTypes.string.isRequired,
};

export default ButtonsFavShare;
