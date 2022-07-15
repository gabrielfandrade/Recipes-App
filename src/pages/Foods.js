import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import appContext from '../context/Context';

function Foods({ history }) {
  const { recipes } = useContext(appContext);

  useEffect(() => {
    if (recipes.length === 1) {
      const { idMeal } = recipes[0];
      history.push(`/foods/${idMeal}`);
    }
  }, [recipes, history]);

  return (
    <div>
      <Header title="Foods" condition history={ history } />
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
