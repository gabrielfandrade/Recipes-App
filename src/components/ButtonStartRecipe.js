import React from 'react';
import { Link } from 'react-router-dom';

function ButtonStartRecipe() {
  return (
    <div>
      <Link to="/done-recipes">
        <p data-testid="start-recipe-btn" className="btn-start-recipe">
          Start Recipe
        </p>
      </Link>
    </div>
  );
}

export default ButtonStartRecipe;
