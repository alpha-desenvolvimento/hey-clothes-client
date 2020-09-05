import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";

import { AuthContext } from "../../AuthContext";
import Button from "../Button_CMP";
import { Heading, FormWrapper, Input, Label, Wrapper, Error } from "./styles";

// import AuthCTR from "../../controller/auth_CTR";
import HerokuServer from "../../API/HerokuServer";

const Login = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [userValues, setValues] = useState({ pwd: undefined, user: undefined });

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    window.localStorage.setItem("section", null);
    const { user, pwd } = userValues;
    setCurrentUser(null);
    if (!user) {
    }
    if (!pwd) {
    } else {
      await HerokuServer.Auth.user({ user, pwd }).then((resp) => {
        if (resp.status == "success") setCurrentUser({ ...resp });
      });
    }
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;

    let nValue = userValues;
    nValue[name] = value;

    setValues(nValue);
  }

  if (currentUser) return <Redirect to="/p" />;

  return (
    <Wrapper>
      <FormWrapper>
        <Heading>Log in</Heading>
        <form onSubmit={handleLogin}>
          <Label> Email </Label>
          <Input
            name="user"
            type="email"
            value={userValues.user}
            placeholder="meu@email.com"
            onInput={handleInputChange}
          />
          <Label> Password </Label>
          <Input
            name="pwd"
            type="password"
            value={userValues.pwd}
            placeholder="Password"
            onInput={handleInputChange}
          />
          <Button
            primary
            type="submit"
            style={{ margin: "5rem auto 2rem", display: "block" }}
          >
            Entrar
          </Button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default withRouter(Login);
