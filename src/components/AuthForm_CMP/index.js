import React, { useState, useEffect } from "react";
import apis from "./../../API";

const AuthForm_CMP = () => {
  const [values, setValues] = useState({ pwd: null, user: null });
  const [token, setToken] = useState(null);

  function handleInputChange(event) {
    const { name, value } = event.target;

    let nValue = values;
    nValue[name] = value;

    setValues(nValue);

    console.log(values);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    apis.heyClothesHeroku.Auth.user();
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <label>
        E-Mail
        <input
          type="email"
          id="email"
          name="user"
          value={values.user}
          onInput={handleInputChange}
          placeholder="meu@email.com"
          required
        />
      </label>
      <label>
        Senha
        <input
          type="password"
          id="password"
          name="pwd"
          value={values.pwd}
          onChange={handleInputChange}
          required
        />
      </label>

      <button onClick={handleSubmit}>Acessar</button>
      
    </form>
  );
};

export default AuthForm_CMP;
