// const FOODS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
const foodI = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
const foodN = 'https://www.themealdb.com/api/json/v1/1/search.php?';
const drinkI = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
const drinkN = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';

const getRecipesApi = async (type, filter, inputSearch) => {
  let url = '';
  if (type === 'meals' && filter !== 'i') {
    url = foodN;
  } else if (type === 'meals' && filter === 'i') {
    url = foodI;
  } else if (type === 'drinks' && filter !== 'i') {
    url = drinkN;
  } else {
    url = drinkI;
  }
  const response = await fetch(`${url}${filter}=${inputSearch}`);
  const data = await response.json();

  return response.ok ? Promise.resolve(data[type]) : Promise.reject(data);
};

export default getRecipesApi;
