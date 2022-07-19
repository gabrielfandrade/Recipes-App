import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OtherRecipesFoods from './OtherRecipesFoods';
import ButtonsFavShare from './ButtonsFavShare';

function DrinkCard({ details, page }) {
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState();

  useEffect(() => {
    const entries = Object.entries(details);
    const keys = Object.keys(details);
    const keysIngredient = keys.filter((key) => key.includes('strIngredient'));
    const keysObject = keysIngredient.reduce((objects, key) => {
      objects[key] = false;
      return objects;
    }, {});
    setChecked(keysObject);
    const ingredient = entries.filter((entry) => entry[0].includes('strIngredient'));
    const notNull = ingredient.filter((item) => item[1] !== '' && item[1] !== null);
    setIngredients(notNull);
  }, [details]);

  const handleChange = ({ target }) => {
    const { id } = target;
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const ingredientsList = () => {
    if (page === 'details') {
      return (
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
      );
    } return (
      <div>
        {
          ingredients.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ ingredient[0] }>
                { `${details[ingredient[0]]} - ${details[`strMeasure${index + 1}`]}` }
                <input
                  type="checkbox"
                  id={ ingredient[0] }
                  checked={ checked[ingredient[0]] }
                  onChange={ handleChange }
                />
              </label>
            </div>
          ))
        }
      </div>
    );
  };

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
      <ButtonsFavShare
        copyUrl={ `localhost:3000/drinks/${details.idDrink}` }
      />
      <p
        data-testid="recipe-category"
      >
        { details.strAlcoholic }
      </p>
      { ingredientsList() }
      <p data-testid="instructions">
        { details.strInstructions }
      </p>
      {
        page === 'details'
        && <OtherRecipesFoods />
      }
    </div>
  );
}

DrinkCard.propTypes = {
  details: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkCard;
