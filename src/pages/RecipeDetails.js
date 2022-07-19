import React, { useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { recipeDetail } from '../service/recipesApi';
import DrinkCard from '../components/DrinkCard';
import FoodCard from '../components/FoodCard';
import appContext from '../context/Context';
import ButtonStartRecipe from '../components/ButtonStartRecipe';

function RecipeDetails({ history, match: { params } }) {
  const { requestRecommendations } = useContext(appContext);
  const [detailRecipe, setDetailRecipe] = useState({});

  const ref = useRef(true);

  useEffect(() => {
    const requestRecipeDetail = async () => {
      const pathDrink = history.location.pathname.includes('drink');
      // const pathFood = history.location.pathname.includes('foods');
      const type = (pathDrink) ? 'drinks' : 'meals';
      const type2 = (pathDrink) ? 'meals' : 'drinks';
      const { id } = params;
      const api = await recipeDetail(type, id);
      setDetailRecipe(api);
      requestRecommendations(type2);
    };
    if (ref.current) {
      requestRecipeDetail();
      ref.current = false;
    }
  }, [history.location.pathname, params, requestRecommendations]);

  // console.log(detailRecipe);

  const detailsCard = () => {
    const pathDrink = history.location.pathname.includes('drink');

    if (pathDrink) {
      return (
        <div>
          <DrinkCard details={ detailRecipe[0] } />
          <ButtonStartRecipe />
        </div>
      );
    }
    return (
      <div>
        <FoodCard details={ detailRecipe[0] } />
        <ButtonStartRecipe />
      </div>
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
