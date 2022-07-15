import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import appContext from '../context/Context';

function Recipes({ history }) {
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
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Recipes;
