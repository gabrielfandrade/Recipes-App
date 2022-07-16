import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import appContext from '../context/Context';

function SearchBar({ history }) {
  const [searchForm, setSearchForm] = useState({
    input: '',
    radio: '',
  });

  const { request } = useContext(appContext);

  const handleSearch = () => {
    const { radio, input } = searchForm;
    if (radio === 'f' && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const { location: pathname } = history;
      const type = (pathname.pathname === '/foods') ? 'meals' : 'drinks';
      request(type, radio, input);
    }
  };

  const handleRadio = ({ target: { value } }) => {
    setSearchForm((prev) => ({
      ...prev,
      radio: value,
    }));
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ setSearchForm.input }
        onChange={
          ({ target: { value } }) => setSearchForm((prev) => ({ ...prev, input: value }))
        }
      />

      <div>
        <label htmlFor="ingredient-radio">
          Ingredient
          <input
            type="radio"
            name="search-radio"
            data-testid="ingredient-search-radio"
            id="ingredient-radio"
            value="i"
            onClick={ handleRadio }
          />
        </label>

        <label htmlFor="name-radio">
          Name
          <input
            type="radio"
            name="search-radio"
            data-testid="name-search-radio"
            id="name-radio"
            value="s"
            onClick={ handleRadio }
          />
        </label>

        <label htmlFor="first-radio">
          First Letter
          <input
            type="radio"
            name="search-radio"
            data-testid="first-letter-search-radio"
            id="first-radio"
            value="f"
            onClick={ handleRadio }
          />
        </label>

        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ handleSearch }
        >
          Search
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SearchBar;
