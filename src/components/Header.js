import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, condition }) {
  const [inputSearch, setInputSearch] = useState(false);

  const handleSearch = () => {
    setInputSearch(!inputSearch);
  };

  return (
    <header>
      <Link to="/profile">
        <button type="button">
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
      </Link>
      {
        condition
        && (
          <button type="button" onClick={ handleSearch }>
            <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
          </button>
        )
      }
      {
        inputSearch
        && (
          <input type="text" data-testid="search-input" />
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
