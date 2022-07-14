import React from 'react';

function Login() {
  return (
    <div>
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="email">
          Email:
          <input type="email" id="email" data-testid="email-input" />
        </label>
        <label htmlFor="senha">
          Senha:
          <input type="password" id="senha" data-testid="password-input" />
        </label>
        <button type="button" data-testid="login-submit-btn">
          Enter
        </button>
      </fieldset>
    </div>
  );
}

export default Login;
