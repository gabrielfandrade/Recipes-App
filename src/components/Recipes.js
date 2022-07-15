import React from 'react';
import PropTypes from 'prop-types';

function Recipes({ name, img, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        width="150px"
        src={ img }
        alt="recipes"
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

Recipes.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Recipes;
