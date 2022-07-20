import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OtherRecipesFoods from './OtherRecipesFoods';
import ButtonsFavShare from './ButtonsFavShare';
import ButtonFinishRecipe from './ButtonFinishRecipe';

function DrinkCard({ details, page, history }) {
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
    if (Object.keys(storage.cocktails).includes(details.idDrink)) {
      ingredientsList.forEach((ingredient) => {
        if (storage.cocktails[details.idDrink].includes(ingredient[1])) {
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
      storage.cocktails[details.idDrink] = used;
      localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
      ref.current = false;
    }
  }, [checked, details.idDrink, ingredients]);

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
      {
        page === 'progress' && checked
        && <ButtonFinishRecipe
          checked={ checked }
          details={ details }
          history={ history }
        />
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
  page: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default DrinkCard;
