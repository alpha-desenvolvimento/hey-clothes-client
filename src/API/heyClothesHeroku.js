// require("dotenv-safe").config();
import axios from "axios";

// const axios = require("axios");

const baseUrl =
  process.env.ENV_TYPE != undefined
    ? "https://hey-clothes-server.herokuapp.com"
    : "http://localhost:5000/api";

export class Auth {
  static async user(args = { user: null, pwd: null }) {
    let uri = baseUrl + `/auth/user`;
    const { user, pwd } = args;

    return axios.post(uri, { user, pwd });
  }

  static async token(token = null) {
    let uri = baseUrl + `/auth/token`;

    console.log(uri);

    return axios.post(uri, { token });
  }
}
