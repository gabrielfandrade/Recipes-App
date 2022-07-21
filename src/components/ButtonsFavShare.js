import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ButtonsFavShare({ copyUrl, details, type }) {
  console.log(details);
  console.log(copyUrl);
  const [isCopied, setIsCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoriteRecipes) {
    favoriteRecipes = [];
  }
  useEffect(() => {
    const typeID = type === 'food' ? details.idMeal : details.idDrink;
    console.log(typeID);
    console.log(favoriteRecipes);
    const fav = favoriteRecipes.some((item) => item.id === typeID);
    console.log(fav);
    setIsFav(fav);
  }, [favoriteRecipes, details, type]);

  const handleClick = () => {
    const obj = {
      id: type === 'food' ? details.idMeal : details.idDrink,
      type,
      nationality: details.strArea ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: type === 'food' ? '' : details.strAlcoholic,
      name: type === 'food' ? details.strMeal : details.strDrink,
      image: type === 'food' ? details.strMealThumb : details.strDrinkThumb,
    };
    const arraynovo = [...favoriteRecipes, obj];
    console.log(arraynovo);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arraynovo));
  };

  return (
    <div>
      { isCopied ? <p>Link copied!</p> : null }
      <button
        onClick={ handleClick }
        type="button"
        data-testid="favorite-btn"
        alt="share-url"
        src={ isFav ? blackHeartIcon : whiteHeartIcon }
      >
        {
          isFav ? <img
            alt="share-url"
            src={ blackHeartIcon }
          /> : <img
            src={ whiteHeartIcon }
            alt="share-url"
          />
        }
      </button>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://${copyUrl}`);
          setIsCopied(true);
        } }
      >
        <img
          src={ shareIcon }
          alt="share-url"
        />
      </button>
    </div>
  );
}

ButtonsFavShare.propTypes = {
  copyUrl: PropTypes.string.isRequired,
  details: PropTypes.shape({
    strDrinkThumb: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    idDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default ButtonsFavShare;
