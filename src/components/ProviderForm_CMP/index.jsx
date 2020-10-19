import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
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

const ProviderForm = ({ providerId, isCreate, refreshData, hideDrawer }) => {
  const { register, handleSubmit, errors, control } = useForm();
  const [currentProvider, setCurrentProvider] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  const classes = useStyles();

  const fetchAndSetData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/provider/${providerId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentProvider(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    console.log("providerId", providerId);

    if (isCreate) {
      setCurrentProvider({
        name: "",
        phone: "",
      });
    } else {
      fetchAndSetData();
    }

    console.log(currentProvider);
  }, []);

  function validateForm(formData) {
    console.log(formData);

    if (formData.name == '') {
      swal({
        text: "Informe o nome do fornecedor",
        icon: "error",
      });
      return false;
    }

    if (formData.name.length > 80) {
      swal({
        text: "Nome deve possuir no máximo 80 caracteres",
        icon: "error",
      });
      return false;
    }

    if (formData.email != undefined && formData.email.length > 50) {
      swal({
        text: "E-Mail deve possuir no máximo 50 caracteres",
        icon: "error",
      });
      return false;
    }

    if (formData.endereco != undefined && formData.endereco.length > 300) {
      swal({
        text: "Endereço deve possuir no máximo 300 caracteres",
        icon: "error",
      });
      return false;
    }

    if (formData.phone != undefined && formData.phone.length > 15) {
      swal({
        text: "Telefone deve possuir no máximo 15 caracteres",
        icon: "error",
      });
      return false;
    }

    return true;
  }

  const onSubmit = (formData) => {
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/provider/${action}`;

    if (!validateForm(formData)) return null;

    const id = !isCreate && currentProvider.id;

    if (!isCreate) formData.id = currentProvider.id;

    axios.post(url, { ...formData }).then((resp) => {
      console.log(resp);
      if (resp.data && resp.data.id) {
        hideDrawer();
        refreshData();
        swal({
          text: "Operação executada com sucesso!",
          icon: "success",
        });
        history.push("/c/provider");
      } else {
        swal({
          text: "Erro ao executar operação",
          icon: "error",
        });
      }
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
          <p>Fornecedor:</p>
          <h4>{isCreate ? "Novo fornecedor" : currentProvider.name}</h4>

          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Nome"
            type="text"
            defaultValue={currentProvider.name}
            name="name"
            ref={register({ required: true, maxLength: 80 })}
          />

          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Telefone"
            type="text"
            defaultValue={currentProvider.phone}
            name="phone"
            ref={register({ required: true, maxLength: 15 })}
          />

          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Email"
            type="email"
            defaultValue={currentProvider.email}
            name="email"
            ref={register()}
          />

          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            multiline
            label="Endereço"
            type="text"
            defaultValue={currentProvider.endereco}
            name="endereco"
            ref={register()}
          />

          <Button color="primary" variant="contained" type="submit">
            Salvar
          </Button>
        </form>
      </Box>
    );
  }

  function errorLoad() {
    return <h4>Erro: Fornecedor não localizado</h4>;
  }

  return (
    <>
      {!isLoaded && !isCreate ? (
        <Loading />
      ) : currentProvider ? (
        sucessLoad()
      ) : (
        errorLoad()
      )}
    </>
  );
};

export default ProviderForm;
