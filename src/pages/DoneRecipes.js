import React /* , { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes({ history }) {
  return (
    <div data-testid="Done-Recipes-test">
      <Header title="Done Recipes" condition={ false } history={ history } />

      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Foods</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      <DoneRecipesCard />

    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default DoneRecipes;
