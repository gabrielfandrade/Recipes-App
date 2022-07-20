import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetchs';
import { act } from 'react-dom/test-utils';

const mock = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch)
}

describe('Testes da tela "RecipeInProgress"', () => {
  beforeEach(mock)
  afterEach(() => jest.clearAllMocks());

  it('', async () => {
    await act(async () => {
      const { history } = renderWithRouter(<App />);
    })
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    await act(async () => {
      userEvent.click(buttonEnter);
    });
    const btnFirstRecipe = screen.getByTestId('0-card-img');
    await act(async () => {
      userEvent.click(btnFirstRecipe);
    });
    const btnStart = screen.getByTestId('start-recipe-btn');
    await act(async () => {
      userEvent.click(btnStart);
    });

    const checkbox1 = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    });
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1.checked).toBeFalsy();

    userEvent.click(checkbox1);

    expect(checkbox1.checked).toBeTruthy();
  })
});
