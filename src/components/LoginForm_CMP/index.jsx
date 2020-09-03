import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";

import { AuthContext } from "../../AuthContext";
import Button from '../Button_CMP'
import {
    Heading,
    FormWrapper,
    Input,
    Label,
    Wrapper
} from './styles'


const Login = ({ history }) => {
    const handleLogin = useCallback(
      async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
          //Aqui vai a lógica de autenticação, exemplo:
          //await app.auth().signInWithEmailAndPassword(email.value, password.value);
          setCurrentUser({
            token: "tokenaleatorio"
          })
          history.push("/"); //push redireciona pra alguma rota caso a autenticação funcione
        } catch (error) {
          alert(error);
        }
      },
      [history]
    );
  
    const { currentUser, setCurrentUser } = useContext(AuthContext);
  
    if (currentUser) {
      return <Redirect to="/Mock" />;
    }
  
    return (
      <Wrapper>
        <FormWrapper>
          <Heading>Log in</Heading>
          <form onSubmit={handleLogin}>
            <Label> Email </Label>
            <Input name="email" type="email" placeholder="Email" />
            <Label> Password </Label>
            <Input name="password" type="password" placeholder="Password" />
            <Button
              primary
              type="submit"
            > Entrar </Button>
          </form>
          <Button onClick={() => {console.log(currentUser)}}>Log current User</Button>
        </FormWrapper>
      </Wrapper>
    );
  };
  
  export default withRouter(Login);