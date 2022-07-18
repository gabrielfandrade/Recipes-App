import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function FoodCard({ details }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const entries = Object.entries(details);
    const ingredient = entries.filter((entry) => entry[0].includes('strIngredient'));
    const notNull = ingredient.filter((item) => item[1] !== '');
    setIngredients(notNull);
  }, [details]);

  console.log();

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
      <p data-testid="recipe-category">
        { details.strCategory }
      </p>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {
                details[ingredient[0]]
              }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">
        { details.strInstructions}
      </p>

      <p data-testid="video">VIDEO</p>

      {/* <video
        data-testid="video"
        width="750"
        height="500"
        controls
      >
        <track
          default
          kind="captions"
          srcLang="en"
          src="/media/examples/friday.vtt"
        />
        { details}
      </video> */}

    </div>
  );
}

FoodCard.propTypes = {
  details: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
  }).isRequired,
};

export default FoodCard;
