import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import recipesApi from '../service/recipesApi';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const request = async (type, filter, inputSearch) => {
    const api = await recipesApi(type, filter, inputSearch);
    if (!api) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setRecipes(api);
    }
  };

  // useEffect(() => {
  //   const request = async () => {
  //     const api = await recipesApi();
  //     setRecipes(api);
  //   };
  //   request();
  // }, []);

  const initialValue = {
    recipes,
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
