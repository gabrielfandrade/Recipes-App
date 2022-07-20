import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetchs';
import mockStorage from './mocks/mockStorage';
import { act } from 'react-dom/test-utils';

const mock = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch)
}

const mockSet = () => {
  jest.spyOn(global.Storage.prototype, 'setItem')
    .mockImplementation((key, value) => {
      mockStorage[key] = value
    })
}

const mockGet = () => {
  jest.spyOn(global.Storage.prototype, 'getItem')
    .mockImplementation((key) => mockStorage[key])
}

describe('Testes da tela "RecipeInProgress"', () => {
  beforeEach(() => {
    mock();
    mockSet();
    mockGet();
  })
  afterEach(() => jest.clearAllMocks());

  it('Verifica se uma checkbox mantém seu estado ao recarregar', async () => {
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
  })

  it('Verifica tela de Receita em Progresso de Drinks', async () => {
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
  })
});
