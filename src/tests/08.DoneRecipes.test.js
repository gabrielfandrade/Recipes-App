import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './mocks/renderWithRouter';
import App from '../App';
import fetch from './mocks/fetchs';
import LocalStorageMock from './mocks/mockStorage';
import { act } from 'react-dom/test-utils';

const mock = () => {
  jest.spyOn(global, 'fetch').mockImplementation(fetch)
}

const mockDone =
[
  {
    "id":"52771",
    "type":"food",
    "nationality":"Italian",
    "category":"Vegetarian",
    "alcoholicOrNot":"",
    "name":"Spicy Arrabiata Penne",
    "image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    "doneDate":"21/07/2022",
    "tags":["Pasta","Curry"],
  },
  {
    "id":"15997",
    "type":"drink",
    "nationality":"","category":"Ordinary Drink",
    "alcoholicOrNot":"Optional alcohol",
    "name":"GG",
    "image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
    "doneDate":"21/07/2022",
    "tags":[""],
  },
]

describe('Testes da tela "DoneRecipes"', () => {
  beforeEach(() => {
    mock();
  })
  afterEach(() => jest.clearAllMocks());

  it('Verifica os componentes da tela "DoneRecipes"', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('doneRecipes', JSON.stringify(mockDone));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/done-recipes');
    })

    localStorage.clear();
  })
})