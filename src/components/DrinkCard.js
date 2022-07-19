import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OtherRecipes from './OtherRecipes';

function DrinkCard({ details }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const entries = Object.entries(details);
    const ingredient = entries.filter((entry) => entry[0].includes('strIngredient'));
    const notNull = ingredient.filter((item) => item[1] !== '' && item[1] !== null);
    setIngredients(notNull);
  }, [details]);

  return (
    <div>
      <img
        src={ details.strDrinkThumb }
        alt={ details.strDrink }
        width="150px"
        data-testid="recipe-photo"
      />
      <h2
        data-testid="recipe-title"
      >
        { details.strDrink }
      </h2>
      <p
        data-testid="recipe-category"
      >
        { details.strAlcoholic }
      </p>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { details[ingredient[0]] }
              { details[`strMeasure${index + 1}`] }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { details.strInstructions }
      </p>
      <OtherRecipes />
    </div>
  );
}

DrinkCard.propTypes = {
  details: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkCard;
