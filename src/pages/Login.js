import React, { useState } from 'react';

function Login() {
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
  };

  return (
    <div>
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            data-testid="email-input"
            onChange={ (event) => handleChange(event.target) }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="password"
            id="senha"
            data-testid="password-input"
            onChange={ (event) => handleChange(event.target) }
          />
        </label>
        <button
          type="button"
          disabled={ !(validateEmail() && validatePassword()) }
          data-testid="login-submit-btn"
          onClick={ () => handleClick() }
        >
          Enter
        </button>
      </fieldset>
    </div>
  );
}

export default Login;
