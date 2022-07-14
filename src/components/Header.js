import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, condition }) {
  return (
    <header>
      <button type="button">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </button>
      {
        condition
        && (
          <button type="button">
            <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
          </button>
        )
      }
      <h2 data-testid="page-title">
        { title }
      </h2>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
};

export default Header;
