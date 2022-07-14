import React from 'react';
import { cleanup } from "@testing-library/react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Login from '../pages/Login';

describe('Testes para a página de Login', () => {
    beforeEach(cleanup);
  it('Verifica se existe input de email', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  })

  it('Verifica se existe input de password', () => {
    renderWithRouter(<App />);
    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  })

  it('Verifica se existe botão de enter', () => {
    renderWithRouter(<App />);
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(buttonEnter).toBeInTheDocument();
  })

// w


 
//   it('Verifica botão de filtrar', () => {
//     render(<App />);
//     const filterButton = screen.getByRole('button', {
//       name: /filtrar/i
//     })
//     expect(filterButton).toBeInTheDocument()
//   })

//   it('Verifica se existe botao de opções', () => {
//     render(<App />);
//     const inputOptions = screen.getAllByRole('combobox')
//     expect(inputOptions).toBeDefined()
//   })

  
//   it('Verifica textbox retorna conforme digitado', () => {
//     render(<App />);
    
//     const textInput = screen.getByRole('textbox')
//     expect(textInput).toBeInTheDocument()
    
//     userEvent.type(textInput, 'est')
//     const test = screen.findByText(/teste/i)
//     expect(test).toBeDefined()
//   })

//   it('Verificando se quando aplicado os filtros numericos as filtragens acontece ', async () => {
//     render(<App />);
//     const column = screen.getByTestId('column-filter');
//     const comparison = screen.getByTestId('comparison-filter');
//     const valueFilter = screen.getByTestId('value-filter');
//     const buttonFilter = screen.getByTestId('button-filter');

//     const planetBespin = await screen.findByText('Bespin');
//     expect(planetBespin).toBeInTheDocument();

//     userEvent.selectOptions(column, 'surface_water');
//     userEvent.selectOptions(comparison, 'maior que');
//     userEvent.type(valueFilter, '0');
//     userEvent.click(buttonFilter);
//     const planetas = await screen.findAllByTestId("planet-name");
//     expect(planetas).toHaveLength(10);
//     const filterVisible = screen.getByTestId('filter');
//     expect(filterVisible).toBeVisible();
//   });
});