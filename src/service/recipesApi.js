const foodAPI = 'https://www.themealdb.com/api/json/v1/1/';
const drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/';
const filterAPI = 'filter.php?';
const searchAPI = 'search.php?';
const foodURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const getRecipesApi = async (type, filter, inputSearch) => {
  const api = (type === 'meals') ? foodAPI : drinkAPI;
  const php = (filter !== 'i') ? searchAPI : filterAPI;
  const response = await fetch(`${api}${php}${filter}=${inputSearch}`);
  const data = await response.json();

  return response.ok ? Promise.resolve(data[type]) : Promise.reject(data);
};

export const firstRecipes = async (type) => {
  const url = (type === 'meals') ? foodURL : drinkURL;
  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data[type]) : Promise.reject(data);
};
