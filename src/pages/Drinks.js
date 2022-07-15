import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import appContext from '../context/Context';
import Recipes from '../components/Recipes';

function Drinks({ history }) {
  const { recipes } = useContext(appContext);

  useEffect(() => {
    if (recipes.length === 1) {
      const { idDrink } = recipes[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [recipes, history]);

  return (
    <div>
      <Header title="Drinks" condition history={ history } />
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
