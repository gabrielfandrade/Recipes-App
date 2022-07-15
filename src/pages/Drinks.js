import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DoneRecipes({ history }) {
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
