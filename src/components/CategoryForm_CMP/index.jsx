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

const CategoryForm = ({ categoryId, isCreate, refreshData, hideDrawer }) => {
  const { register, handleSubmit, control } = useForm();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [checked, setChecked] = useState(true);

  const classes = useStyles();

  const history = useHistory();

  const fetchAndSetData = () => {
    setIsLoadingCategory(true);
    let url = `${process.env.REACT_APP_API_URL}/api/category/${categoryId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentCategory(resp.data);
        setChecked(resp.data.isActive == 1);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingCategory(false);
      });
  };

  useEffect(() => {
    if (isCreate) {
      setCurrentCategory({
        name: "",
        isActive: 1,
      });
      setChecked(true);
    } else {
      fetchAndSetData();
    }
  }, []);

  const onSubmit = (formData) => {
    if (!formData.name || formData.name == "") {
      swal({
        text: "Informe um nome para a categoria",
        icon: "warning",
      });
      return;
    }
    formData.isActive = checked;

    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/category/${action}`;

    const categoryTO = { ...formData };

    if (currentCategory) categoryTO.id = currentCategory.id;

    console.log(categoryTO);

    axios.post(url, categoryTO).then((resp) => {
      console.log(" resp", resp);

      if (resp.data.id) {
        hideDrawer();
        refreshData();
        fetchAndSetData();
        swal({
          text: "Operação executada com sucesso!",
          icon: "success",
        });
        history.push("/c/category/");
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
          <h4>{isCreate ? "Nova Categoria" : currentCategory.name}</h4>
          <Controller
            as={TextField}
            control={control}
            name="name"
            defaultValue={() => {
              if (currentCategory) return currentCategory.name;
              return "";
            }}
            ref={register({ required: true })}
          />
          <h6>Ativo?</h6>
          <Switch
            name="isActive"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
          />

          <br />
          <Button color="primary" variant="contained" type="submit">
            Salvar
          </Button>
        </form>
      </Box>
    );
  }

  function errorLoad() {
    return <h4>Erro: Categoria não localizada</h4>;
  }

  return (
    <>
      {isLoadingCategory && !isCreate ? (
        <Loading />
      ) : currentCategory ? (
        sucessLoad()
      ) : (
        errorLoad()
      )}
    </>
  );
};

export default CategoryForm;
