import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import appContext from '../context/Context';
import Recipes from '../components/Recipes';
import ButtonsCategory from '../components/ButtonsCategory';

function Drinks({ history }) {
  const { recipes, requestFirstRecipes, requestCategories } = useContext(appContext);

  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      requestFirstRecipes('drinks');
      requestCategories('drinks');
      ref.current = false;
    }
  }, [requestFirstRecipes, requestCategories]);

  useEffect(() => {
    if (recipes.length === 1) {
      const { idDrink } = recipes[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [recipes, history]);

  return (
    <div>
      <Header title="Drinks" condition history={ history } />
      <ButtonsCategory />
      <h1 data-testid="foods-test">
        Recipes
      </h1>
      {
        recipes.map((recipe, index) => {
          const limit = 11;
          if (index <= limit) {
            return (
              <Recipes
                key={ index }
                url={ `/drinks/${recipe.idDrink}` }
                name={ recipe.strDrink }
                img={ recipe.strDrinkThumb }
                index={ index }
              />
            );
          }
          return null;
        })
      }
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Drinks;
