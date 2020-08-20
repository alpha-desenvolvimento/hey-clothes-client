import React from "react";
import { useHistory, Link } from "react-router-dom";

import apis from "./../../API";
// apis.heyClothesHeroku.Auth.user
// apis.heyClothesHeroku.Auth.token
// import "./style.scss";

function apiTest_PG() {
  var token = null;

  async function getToken() {
    console.log(`Log solicitado`);

    apis.heyClothesHeroku.Auth.user({
      user: "e@mail.com",
      pwd: "123456",
    }).then((resp) => (token = resp.data.token));
  }

  async function validateToken() {
    console.log(`token validado: ${token}`);

    apis.heyClothesHeroku.Auth.token(token).then((resp) => console.log(resp));
  }

  function showToken() {
    console.log(`Seu log é ${token}`);
  }

  return (
    <>
      <h1>API TEST!</h1>
      <ul>
        <li>
          <p>Heroku</p>
          <ul>
            <li>
              <p>Auth</p>
              <ul>
                <li onClick={getToken}>user</li>
                <li onClick={validateToken}>token</li>
                <li onClick={showToken}>Show my token!</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default apiTest_PG;
