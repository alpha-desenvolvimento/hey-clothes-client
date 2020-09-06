import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form, Input, Label } from "./styles";

import HerokuServer from "../../API/HerokuServer";

const UserForm = ({ userID, isCreate, ...rest }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log(userID)

    if (isCreate) setCurrentUser(HerokuServer.User.mockUser);
    else
      HerokuServer.User.get({ id: userID }).then((resp) =>
        setCurrentUser(resp)
      );

    console.log(currentUser);
  });

  function sucessLoad() {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>{currentUser.name}</h4>
          <br />
          <br />
          <br />
          <Label htmlFor="userName">Nome</Label>
          <Input
            name="userName"
            defaultValue={isCreate ? "" : currentUser.name}
            ref={register({ required: true })}
          />
          {/* {errors.productName && <ErrorText>Este campo é necessário</ErrorText>} */}
          <Label htmlFor="userEmail">E-mail</Label>
          <Input
            name="userEmail"
            defaultValue={currentUser.email}
            ref={register({ required: true })}
          />

          <Label htmlFor="password1">Senha</Label>
          <Input
            name="password1"
            type="password"
            // defaultValue={currentUser.password}
            ref={register({ required: true })}
          />

          <Label htmlFor="password2">Confirme a senha</Label>
          <Input
            name="password2"
            type="password"
            // defaultValue={currentUser.email}
            ref={register({ required: true })}
          />

          <button type="submit">Salvar</button>
        </Form>
      </>
    );
  }

  function errorLoad() {
    return <h4>Erro: usuário não localizado</h4>;
  }

  return <>{currentUser ? sucessLoad() : errorLoad()}</>;
};

export default UserForm;
