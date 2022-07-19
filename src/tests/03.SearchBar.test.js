import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import categories from './mocks/mockCategories';
import * as recipesApi from '../service/recipesApi';
import { act } from 'react-dom/test-utils';

const mockFirstRecipes = () => {
  jest.spyOn(recipesApi, 'firstRecipes')
    .mockImplementation((type) => {
      if (type === 'meals') {
        return meals;
      } else {
        return drinks;
      }
    })
}
const mockCategories = () => {
  jest.spyOn(recipesApi, 'fiveCategories')
    .mockImplementation(async () => Promise.resolve(categories))
}
const mockSearch = () => {
  jest.spyOn(recipesApi, 'getRecipesApi')
    .mockImplementation((type, filter, inputSearch) => {
      if (inputSearch === 'abcdef') {
        return null;
      } else if (filter === 's' && inputSearch === 'Corba') {
        return [meals[0]];
      } else if (type === 'meals') {
        return meals;
      } else if (filter === 'i' && inputSearch === 'Apple') {
        return [drinks[0]];
      } else {
        return drinks;
      } 
    })
}

describe('Testes do componente SearchBar', () => {
  beforeEach(() => {
    mockFirstRecipes();
    mockCategories();
    mockSearch();
  });
  afterEach(() => jest.clearAllMocks());

  it('Verifica se possui os elementos na tela, e se a requisição é realizada na página de Foods', async () => {
    await act(async () => {
      renderWithRouter(<App />)
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    
    await act(async () => {
      userEvent.click(buttonEnter);
    });

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();

    const radio = screen.getByTestId('name-search-radio')
    expect(radio).toBeInTheDocument();
    expect(radio.checked).toBeFalsy();

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();  

    userEvent.type(input, 'Apple');
    userEvent.click(radio);
    expect(radio.checked).toBeTruthy();

    await act(async () => {
      userEvent.click(btnSearch);
    })

    const recipe1 = screen.getByTestId('0-card-img')
    expect(recipe1).toBeInTheDocument()
  })

  it('Verifica se o alerta é renderizado na tela', async () => {
    await act(async () => {
      renderWithRouter(<App />)
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);
    
    const input = screen.getByTestId('search-input');
    const radio = screen.getByText(/first letter/i);
    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(input, 'aa');
    userEvent.click(radio);

    global.alert = jest.fn();

    await act(async () => {
      userEvent.click(btnSearch);
    })

    expect(global.alert).toHaveBeenCalledTimes(1);    
  })

  it('Verifica se possui os elementos na tela, e se a requisição é realizada na página de Drink', async () => {
    await act(async () => {
      renderWithRouter(<App />)
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

    const drinksPage = screen.getByTestId('drinks-bottom-btn');
    expect(drinksPage).toBeInTheDocument();

    await act(async () => {
      userEvent.click(drinksPage);
    });

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);

    const input = screen.getByTestId('search-input');

    const radio = screen.getByTestId('name-search-radio')

    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(input, 'A');
    userEvent.click(radio);

    await act(async () => {
      userEvent.click(btnSearch);
    })

    const recipeName = screen.getByTestId('0-card-name');
    expect(recipeName).toHaveTextContent('GG');
  })

  it('Verifica se um alert é chamado ao não encontrar nenhum Drink', async () => {
    const mockAlertText = "Sorry, we haven't found any recipes for these filters.";

    await act(async () => {
      renderWithRouter(<App />)
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);
    
    const input = screen.getByTestId('search-input');
    const radio = screen.getByTestId('name-search-radio')
    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(input, 'abcdef');
    userEvent.click(radio);

    global.alert = jest.fn();

    await act(async () => {
      userEvent.click(btnSearch);
    })

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith(mockAlertText);
  })

  it('Verifica se é redirecionada para a pagina RecipeDetails', async () => {
    await act(async () => {
      renderWithRouter(<App />)
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();

    const radio = screen.getByTestId('ingredient-search-radio');
    expect(radio).toBeInTheDocument();
    expect(radio.checked).toBeFalsy();

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();  

    userEvent.type(input, 'Apple');
    userEvent.click(radio);
    expect(radio.checked).toBeTruthy();

    await act(async () => {
      userEvent.click(btnSearch);
    })
  })

  it('Verifica se é redirecionada para a pagina RecipeDetails', async () => {
    await act(async () => {
      renderWithRouter(<App />)
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

    const btnFilter = screen.getByTestId('search-top-btn');
    
    userEvent.click(btnFilter);

    const input = screen.getByTestId('search-input');

    const radio = screen.getByTestId('name-search-radio');

    const btnSearch = screen.getByTestId('exec-search-btn'); 

    userEvent.type(input, 'Corba');
    userEvent.click(radio);

    await act(async () => {
      userEvent.click(btnSearch);
    })
  })
})