import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ButtonStartRecipe({ type, id }) {
  // const buttonText = () => {
  //   const test = localStorage.getItem('inProgressRecipes');
  //   const getID = JSON.parse(test);
  //   if (type2 === 'meals') {
  //     return getID.type2.includes(id) ? 'Continue Recipe' : 'Start Recipe';
  //   }
  //   return getID.type2.includes(id) ? 'Continue Recipe' : 'Start Recipe';
  // };
  return (
    <div>
      <Link to={ `/${type}/${id}/in-progress` }>
        <p data-testid="start-recipe-btn" className="btn-start-recipe">
          {/* { buttonText() } */}
          Start Recipe
        </p>
      </Link>
    </div>
  );
}

ButtonStartRecipe.propTypes = {
  type: PropTypes.string.isRequired,
  // type2: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonStartRecipe;
