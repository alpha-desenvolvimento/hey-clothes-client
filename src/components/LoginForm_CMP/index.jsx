import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

import { AuthContext } from "../../AuthContext";
import Button from "../Button_CMP";
import { FormWrapper, Input, Label, Wrapper, ForgotPwdText } from "./styles";

const Login = ({ history, className, displayPwdReset }) => {
  const { register, handleSubmit, errors, setValue: SetFormValue } = useForm({
    mode: "onChange",
  });

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogin = async (formValues) => {
    window.localStorage.setItem("section", null);
    const { user, pwd } = formValues;
    SetFormValue("pwd", "");
    setCurrentUser(null);

    const url = `${process.env.REACT_APP_API_URL}/api/auth/user`;
    await axios
      .post(url, { user, pwd })
      .then((resp) => {
        if (resp.data.auth) {
          setCurrentUser({ ...resp.data });
          window.localStorage.setItem("section", JSON.stringify(resp.data));
        } else {
          swal(
            "Oops",
            "Não foi possível realizar o login, verifique seu email e sua senha e tente novamente."
          );
        }
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  if (currentUser) return <Redirect to="/p" />;

  function pwdResetHandler() {
    displayPwdReset(true);
  }

  return (
    <Wrapper>
      <FormWrapper className={className}>
        <h3>Log in</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Label htmlFor="user"> Email </Label>
          <Input
            id="inputUser"
            ref={register({
              required: "please, enter an email adress.",
              pattern: /^\S+@\S+$/i,
            })}
            name="user"
            type="email"
            error={errors.user}
            placeholder="meu@email.com"
          />

          <Label htmlFor="pwd"> Password </Label>
          <Input
            id="inputPwd"
            ref={register({ required: true })}
            name="pwd"
            type="password"
            error={errors.pwd}
            placeholder="Password"
          />

          <Button
            primary
            type="submit"
            style={{ margin: "5rem auto 2rem", display: "block" }}
          >
            Login
          </Button>
        </form>
        <ForgotPwdText href="#" onClick={pwdResetHandler}>
          <span>Esqueci minha senha</span>
        </ForgotPwdText>
      </FormWrapper>
    </Wrapper>
  );
};

export default withRouter(Login);
