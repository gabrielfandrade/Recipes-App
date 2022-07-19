import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div data-testid="Favorite-recipes">
      <Header title="Favorite Recipes" condition={ false } />
    </div>
  );
}

export default FavoriteRecipes;
