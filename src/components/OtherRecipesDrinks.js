import React, { useContext } from 'react';
import appContext from '../context/Context';
import '../App.css';

function OtherRecipesDrinks() {
  const { recommendation } = useContext(appContext);
  console.log('ALO');
  return (
    <div
      className="recommendations"
    >
      {
        recommendation.map((recipe, index) => (
          <div
            key={ `${recipe.strDrink}-${index}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img width="100px" src={ recipe.strDrinkThumb } alt="recommendation" />
            <span
              data-testid={ `${index}-recomendation-title` }
            >
              { recipe.strDrink }
            </span>
          </div>
        ))
      }
    </div>
  );
}

export default OtherRecipesDrinks;
