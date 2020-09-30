import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../MaterialLoading_CMP";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "1rem",
      width: "100%",
    },
  },
}));

const UserForm = ({ userID, isCreate, refreshData, hideDrawer }) => {
  const { register, handleSubmit, watch } = useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const classes = useStyles();

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
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    console.log("userID", userID);

    if (isCreate) {
      setCurrentUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
      fetchAndSetData();
    }

    console.log(currentUser);
  }, []);

  const onSubmit = (formData) => {
    console.log(formData);
    const action = isCreate ? "create" : "update";
    console.log("action", isCreate);
    const url = `${process.env.REACT_APP_API_URL}/api/users/${action}`;

    const id = !isCreate && currentUser.id;
    const name = formData.userName;
    const isActive = 1; //TODO, adicionar ao for
    const email = formData.userEmail;
    const password = formData.userPassword;
    console.log("data onSubmit", { id, name, email, password });

    isCreate // isActive não pode ser 0 no create se não o js acha que é "false" na query
      ? axios.post(url, { name, email, password, isActive }).then((resp) => {
          console.log("updatedCategory resp", resp);
          hideDrawer();
          refreshData();
          fetchAndSetData();
        })
      : axios.post(url, { id, name, email, password }).then((resp) => {
          console.log("updatedUser resp", resp);
          refreshData();
          fetchAndSetData();
        });
  };

  function sucessLoad() {
    return (
      <Box padding="2rem" fontSize="2.4rem">
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4>{isCreate ? "Novo usuario" : currentUser.name}</h4>

          <TextField
            variant="outlined"
            label="Nome de usuário"
            name="userName"
            defaultValue={isCreate ? "" : currentUser.name}
            ref={register({ required: true })}
          />
          <TextField
            variant="outlined"
            label="Email"
            name="userEmail"
            defaultValue={currentUser.email}
            ref={register({ required: true })}
          />

          <TextField
            variant="outlined"
            label="Senha"
            name="userPassword"
            type="password"
            ref={register({ required: true })}
          />

          <TextField
            variant="outlined"
            label="Confirme a senha"
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
          />
           */}

          <Button color="primary" variant="contained" type="submit">
            Salvar
          </Button>
        </form>
      </Box>
    );
  }

  function errorLoad() {
    return <h4>Erro: usuário não localizado</h4>;
  }

  return (
    <>
      {!isLoaded && !isCreate ? (
        <Loading />
      ) : currentUser ? (
        sucessLoad()
      ) : (
        errorLoad()
      )}
    </>
  );
};

export default UserForm;
