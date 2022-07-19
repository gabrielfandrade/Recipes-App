import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import appContext from '../context/Context';
import ButtonsCategory from '../components/ButtonsCategory';

function Foods({ history }) {
  const {
    recipes, requestFirstRecipes, requestCategories, redirect,
    requestRecommendations } = useContext(appContext);

  useEffect(() => {
    if (redirect) {
      const { idMeal } = recipes[0];
      history.push(`/foods/${idMeal}`);
    }
  }, [redirect, recipes, history]);

  const ref = useRef(true);

  useEffect(() => {
    if (ref.current) {
      requestFirstRecipes('meals');
      requestCategories('meals');
      requestRecommendations('drinks');
      ref.current = false;
    }
  }, [requestFirstRecipes, requestCategories, requestRecommendations]);

  return (
    <div>
      <Header title="Foods" condition history={ history } />
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
                url={ `/foods/${recipe.idMeal}` }
                name={ recipe.strMeal }
                img={ recipe.strMealThumb }
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

Foods.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Foods;
