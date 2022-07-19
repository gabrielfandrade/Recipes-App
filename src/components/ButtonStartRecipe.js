import React from 'react';

function ButtonStartRecipe() {
  return (
    <div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="btn-start-recipe"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default ButtonStartRecipe;
