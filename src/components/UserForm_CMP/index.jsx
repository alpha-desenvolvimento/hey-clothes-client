import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Form, Input, Label } from "../ProductForm_CMP/styles";

const UserForm = ({ userID, isCreate, refreshData }) => {
  const { register, handleSubmit, watch } = useForm();
  const [currentUser, setCurrentUser] = useState(null);

  const fetchAndSetData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/users/${userID}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentUser(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("userID", userID);

    if (isCreate) {
    } else {
      fetchAndSetData();
    }

    console.log(currentUser);
  }, []);

  const onSubmit = (formData) => {
    const url = `${process.env.REACT_APP_API_URL}/api/users/update`;
    const id = currentUser.id;
    const name = formData.userName;
    //const isActive = formData.userActive ? 1 : 0;
    const email = formData.userEmail;
    const password = formData.userPassword;
    console.log("data onSubmit", { id, name, email, password });
    axios.post(url, { id, name, email, password }).then((resp) => {
      console.log("updatedUser resp", resp);
      refreshData();
      fetchAndSetData();
    });
  };

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

          <Label htmlFor="userPassword">Senha</Label>
          <Input
            name="userPassword"
            type="password"
            ref={register({ required: true })}
          />

          <Label htmlFor="confirmPassword">Confirme a senha</Label>
          <Input
            name="confirmPassword"
            type="password"
            ref={register({
              required: true,
              validate: {
                matchesPassword: (value) => value === watch("userPassword"),
              },
            })}
          />
          {/*
          <Label htmlFor="userActive">Ativo</Label>
           <input
            name="userActive"
            type="checkbox"
            defaultChecked={currentUser.isActive == 1 ? true : false}
            ref={register}
          /> */}

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
