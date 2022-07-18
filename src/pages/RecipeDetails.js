import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { recipeDetail } from '../service/recipesApi';
import DrinkCard from '../components/DrinkCard';
import FoodCard from '../components/FoodCard';

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

  const detailsCard = () => {
    const pathDrink = history.location.pathname.includes('drink');
    if (pathDrink) {
      return (
        <DrinkCard details={ detailRecipe[0] } />
      );
    }
    return (
      <FoodCard details={ detailRecipe[0] } />
    );
  };

  return (
    <div>
      {
        detailRecipe.length > 0
        && detailsCard()
      }
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
