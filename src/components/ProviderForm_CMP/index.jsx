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

const ProviderForm = ({ providerId, isCreate, refreshData }) => {
  const { register, handleSubmit, errors } = useForm();
  const [currentProvider, setCurrentProvider] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const onSubmit = (formData) => {
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/provider/${action}`;

    const id = !isCreate && currentProvider.id;
    const name = formData.providerName;
    const phone = formData.providerPhone;
    const email = formData.providerEmail;
    const endereco = formData.providerAdress;

    axios.post(url, { id, name, phone, email, endereco }).then((resp) => {
      console.log("updatedProvider resp", resp);
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
          <h4>{isCreate ? "Novo fornecedor" : currentProvider.name}</h4>

          <TextField
            variant="outlined"
            label="Nome"
            type="text"
            defaultValue={currentProvider.name}
            name="providerName"
            ref={register({ required: true, maxLength: 80 })}
          />

          <TextField
            variant="outlined"
            label="Telefone"
            type="text"
            defaultValue={currentProvider.phone}
            name="providerPhone"
            ref={register({ required: true, maxLength: 15 })}
          />

          <TextField
            variant="outlined"
            label="Email"
            type="email"
            defaultValue={currentProvider.email}
            name="providerEmail"
            ref={register()}
          />

          <TextField
            variant="outlined"
            multiline
            label="Endereço"
            type="text"
            defaultValue={currentProvider.endereco}
            name="providerAdress"
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
