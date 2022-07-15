import React from 'react';
// import { cleanup } from "@testing-library/react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';

describe('Teste de cobertura do componente Footer', () => {
  it('Verifica se possui os botões', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();

    const btnFoods = screen.getByTestId('food-bottom-btn');
    expect(btnFoods).toBeInTheDocument();
  })

  it('Verifica se o botão Drinks redireciona para a tela Drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');
    
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();

    const btnFoods = screen.getByTestId('food-bottom-btn');
    expect(btnFoods).toBeInTheDocument();

    userEvent.click(btnDrinks);

    expect(btnDrinks).toBeInTheDocument();
    expect(btnFoods).toBeInTheDocument();
    
  });

});