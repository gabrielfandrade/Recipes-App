import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ButtonStartRecipe({ type, id }) {
  const test = localStorage.getItem('inProgressRecipes');
  const getID = JSON.parse(test);
  let typeID = '';
  if (type === 'foods') {
    typeID = 'meals';
  } else {
    typeID = 'cocktails';
  }
  const obj = getID[typeID][id];
  return (
    <div>
      <Link to={ `/${type}/${id}/in-progress` }>
        <p data-testid="start-recipe-btn" className="btn-start-recipe">
          { obj ? 'Continue Recipe' : 'Start recipe' }
          {/* Start Recipe */}
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
