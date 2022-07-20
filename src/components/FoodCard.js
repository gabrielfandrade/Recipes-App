import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import OtherRecipesDrinks from './OtherRecipesDrinks';
import ButtonsFavShare from './ButtonsFavShare';

function FoodCard({ details, page }) {
  const [ingredients, setIngredients] = useState([]);
  const [checked, setChecked] = useState();

  const ref = useRef(false);

  useEffect(() => {
    const entries = Object.entries(details);
    const strIngredients = entries.filter((entry) => entry[0].includes('strIngredient'));
    const ingredientsList = strIngredients.filter(
      (item) => item[1] !== '' && item[1] !== null,
    );
    let storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!storage) {
      storage = {
        meals: {},
        cocktails: {},
      };
    }
    if (Object.keys(storage.meals).includes(details.idMeal)) {
      ingredientsList.forEach((ingredient) => {
        if (storage.meals[details.idMeal].includes(ingredient[1])) {
          setChecked((prev) => ({
            ...prev,
            [ingredient[0]]: true,
          }));
        } else {
          setChecked((prev) => ({
            ...prev,
            [ingredient[0]]: false,
          }));
        }
      });
    } else {
      const keys = ingredientsList.reduce((objects, ingredient) => {
        objects[ingredient[0]] = false;
        return objects;
      }, {});
      setChecked(keys);
    }
    setIngredients(ingredientsList);
  }, [details]);

  useEffect(() => {
    if (ref.current) {
      let storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (!storage) {
        storage = {
          meals: {},
          cocktails: {},
        };
      }
      const used = ingredients.reduce((list, ingredient) => {
        if (checked[ingredient[0]]) return [...list, ingredient[1]];
        return list;
      }, []);
      storage.meals[details.idMeal] = used;
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
      ref.current = false;
    }
  }, [checked, details.idMeal, ingredients]);

  const handleChange = ({ target }) => {
    const { id } = target;
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    ref.current = true;
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
        src={ details.strMealThumb }
        alt={ details.strMeal }
        width="150px"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        { details.strMeal }
      </h2>
      <ButtonsFavShare copyUrl={ `localhost:3000/foods/${details.idMeal}` } />
      <p data-testid="recipe-category">
        { details.strCategory }
      </p>
      { ingredientsList() }
      <p data-testid="instructions">
        { details.strInstructions}
      </p>

      {
        page === 'details'
        && (
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
        )
      }

      {
        page === 'details'
        && <OtherRecipesDrinks />
      }

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
    idMeal: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.string.isRequired,
};

export default FoodCard;
