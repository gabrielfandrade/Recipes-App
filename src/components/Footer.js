import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../style/images/drink-grey.png';
import mealIcon from '../style/images/food-grey.png';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            src={ drinkIcon }
            alt="drink"
            data-testid="drinks-bottom-btn"
            className="drink-btn"
          />
        </button>
      </Link>

      <Link to="/foods">
        <button type="button">
          <img
            src={ mealIcon }
            alt="foods"
            data-testid="food-bottom-btn"
            className="food-btn"
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
