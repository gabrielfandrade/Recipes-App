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
    const fav = favoriteRecipes.some((item) => item.id === typeID);
    setIsFav(fav);
  }, [favoriteRecipes, details, type]);

  function setFavotite() {
    const objectForLocalStorage = {
      id: type === 'food' ? details.idMeal : details.idDrink,
      type,
      nationality: details.strArea ? details.strArea : '',
      category: details.strCategory,
      alcoholicOrNot: type === 'food' ? '' : details.strAlcoholic,
      name: type === 'food' ? details.strMeal : details.strDrink,
      image: type === 'food' ? details.strMealThumb : details.strDrinkThumb,
    };
    const setNewArray = [...favoriteRecipes, objectForLocalStorage];
    console.log(setNewArray);
    localStorage.setItem('favoriteRecipes', JSON.stringify(setNewArray));
  }

  const handleClick = () => {
    if (!isFav) {
      setFavotite();
      setIsFav(true);
    } else {
      const typeID = type === 'food' ? details.idMeal : details.idDrink;
      const newArray = favoriteRecipes.filter((item) => item.id !== typeID);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setIsFav(false);
    }
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
