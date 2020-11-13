import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

async function user(args = { user: null, pwd: null }) {
  const { user, pwd } = args;

  if (user == "e@mail.com" && pwd == "123456") {
    const section = {
      name: "user teste",
      token: "igoréumgato",
      status: "success",
      error: null,
    };

    window.localStorage.setItem("section", JSON.stringify(section));

    return section;
  } else {
    return { name: null, token: null, status: "fail", error: "custom error" };
  }
}

async function token(token) {
  console.log("authctr.token()");
  console.log("token", token);
}

function logoff() {
  window.localStorage.removeItem("section");
  window.location.reload(false);
}

export default { user, token, logoff };
