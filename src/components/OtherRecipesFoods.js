import React, { useContext } from 'react';
import appContext from '../context/Context';
import '../App.css';

function OtherRecipesFoods() {
  const { recommendation } = useContext(appContext);
  return (
    <div
      className="recommendations"
    >
      {
        recommendation.map((recipe, index) => (
          <div
            key={ `${recipe.strMeal}-${index}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img width="100px" src={ recipe.strMealThumb } alt="recommendation" />
            <span
              data-testid={ `${index}-recomendation-title` }
            >
              { recipe.strMeal }
            </span>
          </div>
        ))
      }
    </div>
  );
}

export default OtherRecipesFoods;
