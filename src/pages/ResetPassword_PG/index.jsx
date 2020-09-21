import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import LargeLogo from "../../assets/img/logos/large_heyclothes.png";
import axios from "axios";
import Button from "../../components/Button_CMP";

import {
  Img,
  Main,
  ContainerInner,
  Label,
  Input,
  ErrorContainer,
  Loader,
  LoaderContainer,
} from "./styles";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const [token, setToken] = useState(useParams().token);
  const [tokenUsed, setTokenUsed] = useState(false);
  const history = useHistory();
  const [resetInfo, setResetInfo] = useState(null);
  const [formError, setFormError] = useState(" ");

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/resetPassword/token`;
    axios.post(url, { token }).then((resp) => {
      if (resp.data) setResetInfo(resp.data);
      else setToken(null);
    });
  }, []);

  const handleSave = async (formValues) => {
    const { pwd, pwdConfirm } = formValues;
    setFormError("");

    if (pwd != pwdConfirm) {
      setFormError("Confirmação de senha diferente da senha informada!");
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/users/updatePasswordWithToken/`;
    await axios
      .post(url, { ...resetInfo, pwd })
      .then((resp) => {
        if (resp.data) {
          setTokenUsed(true);
        }
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  function form() {
    return (
      <form onSubmit={handleSubmit(handleSave)}>
        <Label htmlFor="pwd"> Nova senha </Label>
        <Input
          id="inputPwd"
          ref={register({ required: true })}
          name="pwd"
          type="password"
          placeholder="Password"
        />

        <Label htmlFor="pwd"> Confirme a senha </Label>
        <Input
          id="inputPwd"
          ref={register({ required: true })}
          name="pwdConfirm"
          type="password"
          placeholder="Password"
        />

        <Button>Salvar</Button>
        <br />
        <ErrorContainer>
          <p>{formError}</p>
        </ErrorContainer>
      </form>
    );
  }

  function urlDontHasToken() {
    return (
      <>
        <h3>Ops...</h3>
        <p>
          Para utilizar essa página é necessário utilizar um Token válido...
        </p>
      </>
    );
  }

  function finish() {
    setTimeout(() => {
      history.push("/");
    }, 3000);
    return (
      <>
        <p style={{ textAlign: "center" }}>Senha alterada com sucesso!</p>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </>
    );
  }

  function selectContent() {
    // return finish();
    if (!token) return urlDontHasToken();
    if (tokenUsed) return finish();
    if (token && !tokenUsed && resetInfo) return form();

    return <></>;
  }

  return (
    <Main>
      <ContainerInner>
        <Img src={LargeLogo} alt="logo" />
        {selectContent()}
      </ContainerInner>
    </Main>
  );
};

export default ResetPassword;
