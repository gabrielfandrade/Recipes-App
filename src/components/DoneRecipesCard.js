import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard() {
  const [doneCards, setDoneCards] = useState([]);

  useEffect(() => {
    let storageDoneCard = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!storageDoneCard) {
      storageDoneCard = {
        alcoholicOrNot: '',
        category: '',
        doneDate: '',
        id: '',
        image: '',
        name: '',
        nationality: '',
        tags: '',
        type: '',
      };
    }
    setDoneCards(storageDoneCard);
  }, [setDoneCards]);

  // console.log(doneCards[0]);
  // const limit = 3;

  return (
    <div>
      {
        doneCards.map((card, index) => (
          <div key={ card.name }>
            <img
              src={ card.image }
              alt="card-recipes-done"
              width="100px"
              data-testid={ `${index}-horizontal-image` }
            />

            <p data-testid={ `${index}-horizontal-top-text` }>
              { card.category }
            </p>

            <p data-testid={ `${index}-horizontal-name` }>
              { card.name }
            </p>

            <p data-testid={ `${index}-horizontal-done-date` }>
              { card.doneDate }
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

            { card.tags.map((tag, idx) => {
              if (idx < 2) {
                return (
                  <div key={ idx }>
                    <p data-testid={ `${idx}-${tag}-horizontal-tag` }>
                      { tag }
                    </p>
                  </div>
                );
              }
              return null;
            })}

          </div>
        ))
      }
    </div>
  );
}

export default DoneRecipesCard;
