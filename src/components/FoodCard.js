import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OtherRecipes from './OtherRecipes';
import ButtonsFavShare from './ButtonsFavShare';

function FoodCard({ details }) {
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
        src={ details.strMealThumb }
        alt={ details.strMeal }
        width="150px"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        { details.strMeal }
      </h2>
      <ButtonsFavShare />
      <p data-testid="recipe-category">
        { details.strCategory }
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
        { details.strInstructions}
      </p>

      <iframe
        src={ details.strYoutube.replace('watch?v=', 'embed/') }
        width="560"
        height="315"
        frameBorder="0"
        allowFullScreen
        title="video"
        data-testid="video"
      >
        {}
      </iframe>

      <OtherRecipes />

    </div>
  );
}

FoodCard.propTypes = {
  details: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodCard;
