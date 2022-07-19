import React, { useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes({ done }) {
  const [doneCards, setDoneCards] = useState([]);

  return (
    <div data-testid="Done-Recipes-test">
      <Header title="Done Recipes" condition={ false } />

      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Foods</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      <div>
        {
          doneCards.map((card, index) => (
            <div key={ index }>

              <img
                scr={ `${done[card[0]]}` }
                alt="card-recipes-done"
                width="150px"
                data-testid={ `${index}-horizontal-image` }
              />

              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${done[card[0]]}` }
              </p>

              <p data-testid={ `${index}-horizontal-name` }>
                { `${done[card[0]]}` }
              </p>

              <p data-testid={ `${index}-horizontal-done-date` }>
                DATA
              </p>

              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copy(copyUrl) }
              >
                <img
                  src={ shareIcon }
                  alt="share-url"
                />
              </button>

              <p data-testid={ `${index}-${tagName}-horizontal-tag` }>
                { `${done[card[0]]}` }
              </p>

            </div>
          ))
        }
      </div>

    </div>
  );
}

export default DoneRecipes;
