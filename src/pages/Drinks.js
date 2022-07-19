import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import appContext from '../context/Context';
import Recipes from '../components/Recipes';
import ButtonsCategory from '../components/ButtonsCategory';

function Drinks({ history }) {
  const { redirect,
    recipes, requestFirstRecipes, requestCategories,
    requestRecommendations } = useContext(appContext);

  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      requestFirstRecipes('drinks');
      requestCategories('drinks');
      requestRecommendations('meals');
      ref.current = false;
    }
  }, [requestFirstRecipes, requestCategories, requestRecommendations]);

  useEffect(() => {
    if (redirect) {
      const { idDrink } = recipes[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [recipes, history, redirect]);

  return (
    <div>
      <Header title="Drinks" condition history={ history } />
      <ButtonsCategory history={ history } />
      <h1 data-testid="foods-test">
        Recipes
      </h1>
      {
        recipes
        && recipes.map((recipe, index) => {
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
