import React from 'react';
import PropTypes from 'prop-types';

function ButtonFinishRecipe({ checked }) {
  const handleDisabled = () => {
    const checkedList = Object.values(checked);
    return checkedList.every((check) => check);
  };

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
};

export default ButtonFinishRecipe;
