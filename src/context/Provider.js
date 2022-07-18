import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getRecipesApi, firstRecipes, fiveCategories } from '../service/recipesApi';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const request = async (type, filter, inputSearch) => {
    const api = await getRecipesApi(type, filter, inputSearch);
    if (!api) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setRecipes(api);
    }
  };

  const requestFirstRecipes = async (type) => {
    const api = await firstRecipes(type);
    setRecipes(api);
  };

  const requestCategories = async (type) => {
    const NUMBER_FIVE = 5;
    const api = await fiveCategories(type);
    setCategories(api.slice(0, NUMBER_FIVE));
  };

  const initialValue = {
    recipes,
    requestFirstRecipes,
    setRecipes,
    request,
    categories,
    setCategories,
    requestCategories,
  };

  return (
    <Context.Provider value={ initialValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
