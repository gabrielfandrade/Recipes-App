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

  const detailsCard = () => {
    const pathDrink = history.location.pathname.includes('drink');

    if (pathDrink) {
      return (
        <div>
          <DrinkCard details={ detailRecipe[0] } page="details" history={ history } />
          <ButtonStartRecipe
            type="drinks"
            type2="cocktails"
            id={ detailRecipe[0].idDrink }
          />
        </div>
      );
    }
    return (
      <div>
        <FoodCard details={ detailRecipe[0] } page="details" history={ history } />
        <ButtonStartRecipe type="foods" type2="meals" id={ detailRecipe[0].idMeal } />
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
