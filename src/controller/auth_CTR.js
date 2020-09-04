async function user(args = { user: null, pwd: null }) {
  const { user, pwd } = args;

  if (user == "e@mail.com" && pwd == "123456")
    return {
      name: "user teste",
      token: "igoréumgato",
      status: "success",
      error: null,
    };
  else {
    return { name: null, token: null, status: "fail", error: "custom error" };
  }
}

async function token(token) {
  console.log("authctr.token()");
  console.log("token", token);
}

export default { user, token };
