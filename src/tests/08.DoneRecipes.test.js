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
  {
    "id": "52804",
    "type": "food",
    "nationality": "Canadian",
    "category": "Miscellaneous",
    "alcoholicOrNot": "",
    "name": "Poutine",
    "image": "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
    "doneDate": "21/07/2022",
    "tags": [
        "UnHealthy",
        "Speciality",
        "HangoverFood"
    ]
  },
]

describe('Testes da tela "DoneRecipes"', () => {
  beforeEach(() => {
    mock();
  })
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Verifica os componentes da tela "DoneRecipes"', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('doneRecipes', JSON.stringify(mockDone));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/done-recipes');
    })

    const btnAll = screen.getByTestId('filter-by-all-btn')
    expect(btnAll).toBeInTheDocument();

    const btnFoods = screen.getByTestId('filter-by-food-btn')
    expect(btnFoods).toBeInTheDocument();
    
    const btnDrinks = screen.getByTestId('filter-by-drink-btn')
    expect(btnDrinks).toBeInTheDocument();

    const image1 = screen.getByTestId('0-horizontal-image')
    expect(image1).toBeInTheDocument();

    const name1 = screen.getByTestId('0-horizontal-name')
    expect(name1).toHaveTextContent(/spicy arrabiata penne/i)

    const top1 = screen.getByTestId('0-horizontal-top-text')
    expect(top1).toHaveTextContent(/italian \- vegetarian \-/i);

    const data1 = screen.getByTestId('0-horizontal-done-date')
    expect(data1).toHaveTextContent('21/07/2022')

    const share1 = screen.getByTestId('0-horizontal-share-btn')
    expect(share1).toBeInTheDocument()

    const pastaTag = screen.getByTestId('0-Pasta-horizontal-tag')
    expect(pastaTag).toHaveTextContent(/Pasta/i);
  })

  it('Verifica com localStorage vazio', async () => {
    global.localStorage = new LocalStorageMock;

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/done-recipes');
    })
  });

  it('Verifica a filtragem da tela de "Done Recipes"', async () => {
    global.localStorage = new LocalStorageMock;
    localStorage.setItem('doneRecipes', JSON.stringify(mockDone));

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/done-recipes');
    })

    const btnAll = screen.getByTestId('filter-by-all-btn')
    const btnFoods = screen.getByTestId('filter-by-food-btn')
    const btnDrinks = screen.getByTestId('filter-by-drink-btn')

    let name = screen.getByTestId('0-horizontal-name');
    expect(name).toHaveTextContent(/Spicy Arrabiata Penne/i);
    
    userEvent.click(btnDrinks);

    name = screen.getByTestId('0-horizontal-name');
    expect(name).toHaveTextContent(/GG/i);

    userEvent.click(btnFoods);

    let name2 = screen.getByTestId('1-horizontal-name');
    expect(name2).toHaveTextContent(/Poutine/i);

    userEvent.click(btnAll);

    name2 = screen.getByTestId('1-horizontal-name');
    expect(name2).toHaveTextContent(/GG/i);

    const btnShare = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(btnShare);
  })
})