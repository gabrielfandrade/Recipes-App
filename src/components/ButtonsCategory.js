import React, { useContext } from 'react';
import appContext from '../context/Context';

function ButtonsCategory({ history }) {
  const { categories } = useContext(appContext);

  const handleClick = (categoryName) => {
    if (history.location.pathname === '/foods') {
      return filterByCategory('meals', categoryName);
    } return filterByCategory('drinks', categoryName);
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
    </div>
  );
}

ButtonsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    condition: PropTypes.bool.isRequired,
    history: PropTypes.shape().isRequired,
  };
export default ButtonsCategory;
