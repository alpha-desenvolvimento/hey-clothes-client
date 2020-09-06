// import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";

import { users } from "./database";

const mockUser = {
  id: null,
  email: "",
  password: "",
  nome: "Cadastrar usuário",
};

export default class User {
  static async list() {
    return users;
  }

  static mockUser = mockUser;
}
