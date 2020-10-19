import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";

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
  const { control, handleSubmit } = useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const classes = useStyles();

  const isValidUser = async (formData) => {
    const { userName, userEmail, userPassword, confirmPassword } = formData;

    if (!userName || userName == "") {
      swal({
        text: "Informe um nome para o usuário",
        icon: "error",

        dangerMode: true,
      });
      return false;
    } else if (!userEmail || userEmail == "") {
      swal({
        text: "Informe um email para o usuário",
        icon: "error",
        dangerMode: true,
      });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      swal({
        text: "Informe um email valido para o usuário",
        icon: "error",
        dangerMode: true,
      });
      return false;
    } else if (userPassword !== confirmPassword) {
      swal({
        text:
          "Verifique se os campos 'senha' e 'confirme sua senha' estão preenchidos corretamente",
        icon: "error",
        dangerMode: true,
      });
      return false;
    } else if (
      (isCreate && userPassword == undefined) ||
      userPassword == "" ||
      userPassword.length === 0
    ) {
      swal({
        text: "O usuário precisa de uma senha",
        icon: "error",
        dangerMode: true,
      });
      return false;
    } else if (
      (userPassword.length !== 0 && userPassword.length < 6) ||
      userPassword.length > 20
    ) {
      swal({
        text: "Sua senha deve ter entre 6 e 20 caracteres.",
        icon: "error",
        dangerMode: true,
      });
      return false;
    }

    return true;
  };

  const fetchAndSetData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/users/${userID}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
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
    if (isCreate) {
      setCurrentUser({
        name: "",
        email: "",
        password: "",
      });
    } else {
      fetchAndSetData();
    }
  }, []);

  const onSubmit = async (formData) => {
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/users/${action}`;

    console.log("formData", formData);

    if ((await isValidUser(formData)) == false) return;

    const id = !isCreate && currentUser.id;
    const name = formData.userName;
    const email = formData.userEmail;
    const password =
      formData.userPassword === formData.confirmPassword &&
      formData.userPassword;

    const userToSend = {
      id: !isCreate && currentUser.id,
      name: formData.userName,
      email: formData.userEmail,
      password:
        formData.userPassword === formData.confirmPassword &&
        formData.userPassword,
    };

    // console.log("data onSubmit", { id, name, email, password });

    isCreate // isActive não pode ser 0 no create se não o js acha que é "false" na query
      ? axios
          .post(url, { name, email, password, isActive: 1 })
          .then((resp) => {
            if (!resp.data) {
              swal({
                text: `Erro ao criar novo usuário, verifique as informações ou se já existe um usuário com o email informado e tente novamente`,
                icon: "error",
              });
            } else {
              swal({
                text: `Usuário criado sucesso`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            swal({
              text: `Erro ao executar operação:\n${error}`,
              icon: "error",
              dangerMode: true,
            });
          })
          .finally(() => {
            hideDrawer();
            refreshData();
            fetchAndSetData();
          })
      : axios
          .post(url, userToSend)
          .then((resp) => {
            console.log("updatedUser resp", resp);

            if (!resp.data) {
              swal({
                text: `Erro ao atualizar usuário, verifique as informações ou se já existe um usuário com o email informado e tente novamente`,
                icon: "error",
              });
            } else {
              swal({
                text: `Usuário atualizado sucesso`,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            swal({
              text: `Erro ao executar operação:\n${error}`,
              icon: "error",
              dangerMode: true,
            });
          })
          .finally(() => {
            hideDrawer();
            refreshData();
            fetchAndSetData();
          });
  };

  function sucessLoad() {
    return (
      <Box padding="2rem" fontSize="2.4rem">
        <p>Usuário:</p>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4>{isCreate ? "Novo usuario" : currentUser.name}</h4>

          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Nome de usuário"
            name="userName"
            defaultValue={isCreate ? "" : currentUser.name}
          />
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Email"
            name="userEmail"
            defaultValue={currentUser.email}
          />

          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Senha"
            name="userPassword"
            type="password"
            defaultValue=""
          />

          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Confirme a senha"
            name="confirmPassword"
            type="password"
            defaultValue=""
          />

          {/* 
          
          TODO: descomenta isso e faz ir pra o back

          <h6>Ativo?</h6>
          <Controller
            as={Switch}
            control={control}
            name="isActive"
            defaultValue={checked}
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />
          <br /> */}

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
