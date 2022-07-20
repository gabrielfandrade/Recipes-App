import React from 'react';
import PropTypes from 'prop-types';

function ButtonFinishRecipe({ checked }) {
  const handleDisabled = () => {
    const checkedList = Object.values(checked);
    return checkedList.every((check) => check);
  };

  // const submitRecipe = () => {
  //   let storage = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (!storage) {
  //     storage = [];
  //   }
  //   const finishedRecipe = {
  //     id: ,
  //     type: ,
  //     nationality: ,
  //     category: ,
  //     alcoholicOrNot: ,
  //     name: ,
  //     image: ,
  //     doneDate: ,
  //     tags: ,
  //   };
  // };

  return (
    <div>
      <button
        type="button"
        className="btn-finish-recipe"
        disabled={ !handleDisabled() }
        onClick={ () => {} }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

ButtonFinishRecipe.propTypes = {
  checked: PropTypes.shape().isRequired,
  // details: PropTypes.shape().isRequired,
};

export default ButtonFinishRecipe;
