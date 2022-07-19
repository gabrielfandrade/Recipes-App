import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import * as recipesApi from '../service/recipesApi';
import { act } from 'react-dom/test-utils';

const mockWithMeals = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(async () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(meals),
    }));
}

const mockWithDrinks = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(async () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinks),
    }));
}

const mockWithoutRecipes = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(async () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve({ meals: null }),
    }));
}

describe('Testes do componente SearchBar', () => {
  afterEach(() => jest.clearAllMocks());

  it('Verifica se possui os elementos na tela, e se a requisição é realizada na página de Foods', async () => {
    await act(async () => {
      renderWithRouter(<App />)
    });

    mockWithMeals();

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

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
    mockWithMeals();

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
    const radioName = screen.getByTestId('name-search-radio')
  })

  it('Verifica se possui os elementos na tela, e se a requisição é realizada na página de Drink', async () => {
    const mockFirstRecipes = () => {
      await jest.spyOn(recipesApi, 'firstRecipes').mockReturnValue(drinks);
    }

    mockFirstRecipes();

    await act(async () => {
      renderWithRouter(<App />)
    });

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEnter);

    const drinks = screen.getByTestId('drinks-bottom-btn');
    expect(drinks).toBeInTheDocument();

    userEvent.click(drinks);

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

    const recipe1 = screen.getByTestId('0-card-img')
    expect(recipe1).toBeInTheDocument()

    mockFirst.mockRestore();
  })

  it.skip('Verifica se um alert é chamado ao não encontrar nenhum Drink', async () => {
    const mockAlertText = "Sorry, we haven't found any recipes for these filters.";

    await act(async () => {
      renderWithRouter(<App />)
    });

    mockWithoutRecipes();

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

    await act(async () => {
      userEvent.click(btnSearch);
    })

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith(mockAlertText);
  })

  it.skip('Verifica se é redirecionada para a pagina RecipeDetails', async () => {
    const mock = () => {
      jest.spyOn(global, 'fetch')
        .mockImplementation(async () => Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({drinks: [
            {
            "strDrink": "Apple Berry Smoothie",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/xwqvur1468876473.jpg",
            "idDrink": "12710"
            }
            ]}),
        }));
    }

    mock();

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

    const detailsPage = screen.getByText(/recipe details/i);
    expect(detailsPage).toBeInTheDocument(); 
  })
})