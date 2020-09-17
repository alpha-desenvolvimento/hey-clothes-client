import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { useForm } from "react-hook-form";

import { AuthContext } from "../../AuthContext";
import Button from "../Button_CMP";
import { FormWrapper, Input, Label, Wrapper, ForgotPwdText } from "./styles";

// import AuthCTR from "../../controller/auth_CTR";
import HerokuServer from "../../API/HerokuServer";

const Login = ({ history, className }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const handleLogin = async (formValues) => {
    console.log(formValues);
    window.localStorage.setItem("section", null);
    const { user, pwd } = formValues;
    setCurrentUser(null);
    if (!user) {
    }
    if (!pwd) {
    } else {
      await HerokuServer.Auth.user({ user, pwd }).then((resp) => {
        if (resp.status === "success") setCurrentUser({ ...resp });
      });
    }
  };

  if (currentUser) return <Redirect to="/p" />;

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
            //value={userValues.user}
            placeholder="meu@email.com"
            //onInput={handleInputChange}
          />

          <Label htmlFor="pwd"> Password </Label>
          <Input
            id="inputPwd"
            ref={register({ required: true })}
            name="pwd"
            type="password"
            error={errors.pwd}
            //value={userValues.pwd}
            placeholder="Password"
            //onInput={handleInputChange}
          />

          <Button
            primary
            type="submit"
            style={{ margin: "5rem auto 2rem", display: "block" }}
          >
            Login
          </Button>
        </form>
        <ForgotPwdText href="#a">
          <span>Forgot your password?</span>
        </ForgotPwdText>
      </FormWrapper>
    </Wrapper>
  );
};

export default withRouter(Login);
