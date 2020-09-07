import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { users } from "./database";

export default class Auth {
  static async user(args = { user: null, pwd: null }) {
    const { user, pwd } = args;

    for (const u of users)
      if (user == u.email && pwd == u.password) {
        const section = {
          name: u.name,
          token: "MockToKeN",
          status: "success",
          error: null,
        };

        window.localStorage.setItem("section", JSON.stringify(section));

        return section;
      }

    return {
      name: null,
      token: null,
      status: "fail",
      error:
        "Erro de autenticação: usuário não existe ou informações estão incorretas",
    };
  }

  static async token(token) {
    console.log("authctr.token()");
    console.log("token", token);
  }

  static logoff() {
    window.localStorage.removeItem("section");
    window.location.reload(false);
  }
}
