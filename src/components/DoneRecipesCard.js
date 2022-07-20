import React /* , { useState, useEffect } */ from 'react';
// import PropTypes from 'prop-types';
// import copy from 'clipboard-copy';
// import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard() {
  // const [doneCards, setDoneCards] = useState([]);

  // useEffect(() => {
  //   let storageDoneCard = JSON.parse(localStorage.getItem('doneRecipes'));
  //   if (!storageDoneCard) {
  //     storageDoneCard = {
  //       alcoholicOrNot: '',
  //       category: '',
  //       doneDate: '',
  //       id: '',
  //       image: '',
  //       name: '',
  //       nationality: '',
  //       tags: '',
  //       type: '',
  //     };
  //   }
  //   const finishedRecipe = {
  //     id: storageDoneCard[0].id,
  //     type: storageDoneCard[0].type,
  //     nationality: storageDoneCard[0].nationality,
  //     category: storageDoneCard[0].category,
  //     alcoholicOrNot: storageDoneCard[0].alcoholicOrNot,
  //     name: storageDoneCard[0].name,
  //     image: storageDoneCard[0].image,
  //     doneDate: storageDoneCard[0].doneDate,
  //     tags: storageDoneCard[0].tags,
  //   };
  //   setDoneCards(finishedRecipe);
  // }, [setDoneCards]);

  // console.log(doneCards);

  return (
    <div>
      {/* {
        doneCards.map((card, index) => (
          <div key={ index }>
            <img
              scr={ card.image[0] }
              alt="card-recipes-done"
              width="150px"
              data-testid={ `${index}-horizontal-image` }
            />
          </div>
        ))
      } */}
    </div>
  );
}

export default DoneRecipesCard;
