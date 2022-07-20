import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetchs';
import LocalStorageMock from './mocks/mockStorage';
import { act } from 'react-dom/test-utils';

const mock = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch)
}

const mockProgress = 
  {"meals":{"52977":["Lentils"]},"cocktails":{"15997":["Galliano","Ginger ale","Ice"],"178319":["Hpnotiq"]}}

describe('Testes da tela "RecipeInProgress"', () => {
  beforeEach(() => {
    mock();
  })
  afterEach(() => jest.clearAllMocks());

  it('Verifica se uma checkbox mantém seu estado ao recarregar', async () => {
    global.localStorage = new LocalStorageMock;

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods/52977/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    });
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1.checked).toBeFalsy();

    userEvent.click(checkbox1);

    expect(checkbox1.checked).toBeTruthy();

    await act(async () => {
      history.push('/foods/52977/in-progress');
    })

    const checkbox = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    });   
    expect(checkbox.checked).toBeTruthy();
    
    localStorage.clear();
  })

  it('Verifica se uma checkbox mantém seu estado ao recarregar', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockProgress));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/foods/52977/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /lentils \- 1 cup/i
    });
    expect(checkbox1).toBeInTheDocument();

    expect(checkbox1.checked).toBeTruthy();
    
    localStorage.clear();
  })

  it('Verifica tela de Receita em Progresso de Drinks', async () => {
    global.localStorage = new LocalStorageMock;

    const { history } = renderWithRouter(<App />);  
    await act(async () => {
      history.push('/drinks/178319/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /hpnotiq \- 2 oz/i
    })
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1.checked).toBeFalsy();

    userEvent.click(checkbox1);

    expect(checkbox1.checked).toBeTruthy();

    await act(async () => {
      history.push('/drinks/178319/in-progress');
    })

    const checkbox = screen.getByRole('checkbox', {
      name: /hpnotiq \- 2 oz/i
    })  
    expect(checkbox.checked).toBeTruthy();

    localStorage.clear();
  })

  it('Verifica tela de Receita continua Progresso de Drinks ', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockProgress));

    const { history } = renderWithRouter(<App />);  
    await act(async () => {
      history.push('/drinks/178319/in-progress');
    })

    const checkbox1 = screen.getByRole('checkbox', {
      name: /hpnotiq \- 2 oz/i
    })
    expect(checkbox1).toBeInTheDocument();

    expect(checkbox1.checked).toBeTruthy();

    localStorage.clear();
  })
});
