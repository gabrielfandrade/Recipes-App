import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import { act } from 'react-dom/test-utils';

const mock = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(async () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(meals),
    }));
}

const mock2 = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(async () => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinks),
    }));
}

describe('Testes do componente SearchBar', () => {
  // beforeEach(mock)
  // afterEach(() => jest.clearAllMocks());

  it('Verifica se possui os elementos na tela, e se a requisição é realizada na página de Foods', async () => {
    await act(async () => {
      renderWithRouter(<App />)
    });

    mock();

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

    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();  

    userEvent.type(input, 'Apple');
    userEvent.click(radio);

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

    mock2();

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
  })
})