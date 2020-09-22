import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Button from "../Button_CMP";
import { FormWrapper, Input, Label, Wrapper, ForgotPwdText } from "./styles";
import { useState } from "react";

const PwdResetForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const [mockLink, setMockLink] = useState(null);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const executePwdReset = async (formValues) => {
    setInvalidEmail(false);
    const { email } = formValues;

    const url = `${process.env.REACT_APP_API_URL}/api/auth/resetPassword/email`;
    await axios
      .post(url, { email })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data) {
          setMockLink(resp.data);
        } else {
          setInvalidEmail(true);
        }
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  return (
    <>
      <FormWrapper>
        <form onSubmit={handleSubmit(executePwdReset)}>
          <h5>Esqueci minha senha</h5>
          <Label htmlFor="user"> Email </Label>

          <Input
            id="inputUser"
            ref={register({
              required: "please, enter an email adress.",
              pattern: /^\S+@\S+$/i,
            })}
            name="email"
            type="email"
            error={errors.user}
            placeholder="meu@email.com"
          />

          {invalidEmail && (
            <>
              <p>Email informado não localizado, verifique e tente novamente</p>
            </>
          )}

          <Button
            primary
            type="submit"
            style={{ margin: "5rem auto 2rem", display: "block" }}
          >
            Recuperar <br />
            minha senha
          </Button>
        </form>
      </FormWrapper>
      {mockLink && (
        <>
          <h6>Mock envio de email:</h6>

          <br />
          <br />
          <FormWrapper>
            <p>
              Você solicitou a recuperação de sua senhal,{" "}
              <a target="_blank" href={`/resetPassword/${mockLink}`}>
                clica aqui
              </a>{" "}
              para recuperar o acesso a sua conta!
            </p>
            <p>
              Caso não tenha sido você, fique tranquilo(a), nenhuma ação foi
              tomada.
            </p>
          </FormWrapper>
        </>
      )}
    </>
  );
};

export default PwdResetForm;
