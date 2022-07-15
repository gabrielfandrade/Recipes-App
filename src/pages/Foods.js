import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes({ history }) {
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
