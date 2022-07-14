import React from 'react';
import {  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
// import App from '../App';
import Login from '../pages/Login';

describe('Testes para a página de Login', () => {
  it('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouter(<Login />);
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se existe input de email', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  })

  it('Verifica se existe input de password', () => {
    renderWithRouter(<Login />);
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  })
  
  it('Verifica se existe botão de enter', () => {
    renderWithRouter(<Login />);
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeInTheDocument();
  })

  it('Verifica se botao esta desativado ao entrar na página', () => {
    renderWithRouter(<Login />);
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeDisabled();
  })

  it('Verifica se botao esta desativado se um dos inputs estiver vazio', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');

    expect(buttonEnter).toBeDisabled();
  })

  it('Verifica se ao clicar no botão a rota é redirecionada para /foods', () => {
    renderWithRouter(<Login />);
    const buttonEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(buttonEnter);

    const elementHeading = screen.getByTestId('foods-test');
    expect(elementHeading).toHaveTextContent();
  })
});