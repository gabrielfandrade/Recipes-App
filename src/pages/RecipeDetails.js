import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { recipeDetail } from '../service/recipesApi';

function RecipeDetails({ history, match: { params } }) {
  const [detailRecipe, setDetailRecipe] = useState({});

  const ref = useRef(true);

  useEffect(() => {
    const requestRecipeDetail = async () => {
      const pathDrink = history.location.pathname.includes('drink');
      // const pathFood = history.location.pathname.includes('foods');
      const type = (pathDrink) ? 'drinks' : 'meals';
      const { id } = params;
      const api = await recipeDetail(type, id);
      setDetailRecipe(api);
    };
    if (ref.current) {
      requestRecipeDetail();
      ref.current = false;
    }
  }, [history.location.pathname, params]);

  console.log(detailRecipe);

  return (
    <div>
      { params.id }
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
