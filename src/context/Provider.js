import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getRecipesApi, firstRecipes } from '../service/recipesApi';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);

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

  // useEffect(() => {
  //   const request = async () => {
  //     const api = await recipesApi();
  //     setRecipes(api);
  //   };
  //   request();
  // }, []);

  // useEffect(() => {
  //   requestFirstRecipes('meals');
  // }, []);

  const initialValue = {
    recipes,
    requestFirstRecipes,
    setRecipes,
    request,
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
