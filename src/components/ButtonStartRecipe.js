import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ButtonStartRecipe({ type, id }) {
  return (
    <div>
      <Link to={ `/${type}/${id}/in-progress` }>
        <p data-testid="start-recipe-btn" className="btn-start-recipe">
          Start Recipe
        </p>
      </Link>
    </div>
  );
}

ButtonStartRecipe.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonStartRecipe;
