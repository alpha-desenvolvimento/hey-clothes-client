import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import {
  Checkbox,
  Button,
  TextField,
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@material-ui/core";
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

const ConditionForm = ({ conditionId, isCreate, refreshData, hideDrawer }) => {
  const { register, handleSubmit, control } = useForm();
  const [currentCondition, setCurrentCondition] = useState(null);
  const [isLoadingCondition, setIsLoadingCondition] = useState(true);
  const [allowDelete, setAllowDelete] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  const fetchAndSetData = () => {
    setIsLoadingCondition(true);
    let url = `${process.env.REACT_APP_API_URL}/api/conditions/${conditionId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentCondition(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingCondition(false);
      });
  };

  useEffect(() => {
    if (isCreate) {
      setCurrentCondition({
        name: "",
        isActive: 1,
      });
    } else {
      fetchAndSetData();
    }
  }, []);

  const onSubmit = (formData) => {
    if (!formData.name || formData.name == "") {
      swal({
        text: "Informe um nome para a condição do produto",
        icon: "warning",
      });
      return;
    }
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/conditions/${action}`;

    const conditionTO = { ...formData };

    if (currentCondition) conditionTO.id = currentCondition.id;

    console.log(conditionTO);

    axios.post(url, conditionTO).then((resp) => {
      console.log(" resp", resp);

      if (resp.data.id) {
        hideDrawer();
        refreshData();
        fetchAndSetData();
        swal({
          text: "Operação executada com sucesso!",
          icon: "success",
        });
        history.push("/c/condition/");
      }
      isCreate = false;
    });
  };

  const deleteCondition = (event) => {
    event.preventDefault();

    console.log("doasd");
  };

  function sucessLoad() {
    return (
      <Box padding="2rem" fontSize="2.4rem">
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4>
            {isCreate ? "Nova Condiçao de produto" : currentCondition.name}
          </h4>
          <Controller
            as={TextField}
            control={control}
            name="name"
            defaultValue={() => {
              if (currentCondition) return currentCondition.name;
              return "";
            }}
            ref={register({ required: true })}
          />

          <Button color="primary" variant="contained" type="submit">
            Salvar
          </Button>

          {allowDelete && (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={deleteCondition}
            >
              Deletar
            </Button>
          )}
        </form>
      </Box>
    );
  }

  function errorLoad() {
    return <h4>Erro: COndição não localizada</h4>;
  }

  return (
    <>
      {isLoadingCondition && !isCreate ? (
        <Loading />
      ) : currentCondition ? (
        sucessLoad()
      ) : (
        errorLoad()
      )}
    </>
  );
};

export default ConditionForm;
