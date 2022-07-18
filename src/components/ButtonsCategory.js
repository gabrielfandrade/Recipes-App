import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from '../context/Context';
import { filterByCategory } from '../service/recipesApi';

function ButtonsCategory({ history }) {
  const [filter, setFilter] = useState('');
  const { categories,
    setRecipes, requestFirstRecipes } = useContext(appContext);

  const handleClick = async (categoryName) => {
    if (categoryName === filter) {
      if (history.location.pathname === '/foods') {
        requestFirstRecipes('meals');
      } else {
        requestFirstRecipes('drinks');
      }
    } else {
      if (history.location.pathname === '/foods') {
        const filterFoods = await filterByCategory('meals', categoryName);
        setRecipes(filterFoods);
      } else {
        const filterDrinks = await filterByCategory('drinks', categoryName);
        setRecipes(filterDrinks);
      }
      setFilter(categoryName);
    }
  };

  const handleClick2 = () => {
    if (history.location.pathname === '/foods') {
      requestFirstRecipes('meals');
    } else {
      requestFirstRecipes('drinks');
    }
  };

  return (
    <div>
      {
        categories.map((category) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            key={ category.strCategory }
            onClick={ () => handleClick(category.strCategory) }
          >
            { category.strCategory}
          </button>
        ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleClick2() }
      >
        All
      </button>

    </div>
  );
}

ButtonsCategory.propTypes = {
  history: PropTypes.shape().isRequired,
};
export default ButtonsCategory;
