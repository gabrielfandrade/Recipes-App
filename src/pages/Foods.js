import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

function Recipes() {
  return (
    <div>
      <Header title="Foods" condition />
      <h1 data-testid="foods-test">
        Recipes
      </h1>
    </div>
  );
}

export default Recipes;
