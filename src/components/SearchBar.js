import React from 'react';
// import PropTypes from 'prop-types';

function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />

      <div>
        <label htmlFor="ingredient-radio">
          Ingredient
          <input
            type="radio"
            name="search-radio"
            data-testid="ingredient-search-radio"
            id="ingredient-radio"
            value="Ingredient"
          />
        </label>

        <label htmlFor="name-radio">
          Name
          <input
            type="radio"
            name="search-radio"
            data-testid="name-search-radio"
            id="name-radio"
            value="Name"
          />
        </label>

        <label htmlFor="first-radio">
          First Letter
          <input
            type="radio"
            name="search-radio"
            data-testid="first-letter-search-radio"
            id="first-radio"
            value="FirstLetter"
          />
        </label>

        <button data-testid="exec-search-btn" type="button">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
