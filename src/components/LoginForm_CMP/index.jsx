import React, { useCallback, useContext, useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router";

import { AuthContext } from "../../AuthContext";
import Button from "../Button_CMP";
import { Heading, FormWrapper, Input, Label, Wrapper } from "./styles";

// import AuthCTR from "../../controller/auth_CTR";
import HerokuServer from '../../API/HerokuServer'

const Login = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { errorText, setErrorText } = useState("");
  const [userValues, setValues] = useState({ pwd: undefined, user: undefined });

  const handleLogin = useCallback(async (event, setErrorText) => {
    event.preventDefault();

    setCurrentUser(null);
    window.localStorage.setItem("section", null);

    await HerokuServer.Auth.user({ ...userValues }).then((resp) => {
      if (resp.status == "success") setCurrentUser({ ...resp });
      else {
        // setErrorText(resp.error);
      }
    });
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
          <div>{errorText}</div>
          <Button primary type="submit">
            Entrar
          </Button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default withRouter(Login);

{
  /*  */
}

// <button onClick={openDrawer}>Drawer</button>
