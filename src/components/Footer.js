import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <button type="button">
          <img
            src={ drinkIcon }
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>

      <Link to="/foods">
        <button type="button">
          <img
            src={ mealIcon }
            alt="foods"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
