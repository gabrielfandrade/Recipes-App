import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/login.css';

function Login({ history }) {
  const [login, setLogin] = useState({
    email: '',
    senha: '',
  });

  const validateEmail = () => {
    const { email } = login;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const validatePassword = () => {
    const { senha } = login;
    const NUM = 6;
    const teste = senha.length > NUM;
    return teste;
  };

  const handleChange = ({ id, value }) => {
    setLogin((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClick = () => {
    const { email } = login;
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    history.push('/foods');
  };

  return (
    <div>
      <div className="text-principal">
        <h1>
          Cooking Experience
          Like a Chef
        </h1>
        <p>Let's make a delicious dish with the best recipe for the family</p>
      </div>

      <div className="container-login">
        <p>Login</p>

        <label>
          Email:
        </label>
        <input
          type="email"
          id="email"
          data-testid="email-input"
          onChange={ (event) => handleChange(event.target) }
        />

        <label>
          Senha:
        </label>
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          onChange={ (event) => handleChange(event.target) }
        />

        <button
          type="button"
          disabled={ !(validateEmail() && validatePassword()) }
          data-testid="login-submit-btn"
          onClick={ () => handleClick() }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
