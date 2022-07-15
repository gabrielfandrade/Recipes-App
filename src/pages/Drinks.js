import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import appContext from '../context/Context';

function DoneRecipes({ history }) {
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
      <Footer />
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;
