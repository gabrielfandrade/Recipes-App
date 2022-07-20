import oneMeal from './oneMeal';
import meals from './meals2';
import drinks from './drinks2'
import mealCategories from './mealCategories';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {    
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
      return Promise.resolve(oneMeal);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(meals);      
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mealCategories);      
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(drinks);
    }
    return Promise.reject(new Error('Invalid url'));
  }
});

module.exports = fetch;