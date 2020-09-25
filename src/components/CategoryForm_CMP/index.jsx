import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
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
  const { register, handleSubmit, errors } = useForm();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const classes = useStyles();

  const history = useHistory();

  const fetchAndSetData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/category/${categoryId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentCategory(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    console.log("categoryId", categoryId);

    if (isCreate) {
      setCurrentCategory({
        name: "",
        isActive: 0,
      });
    } else {
      fetchAndSetData();
    }

    console.log(currentCategory);
  }, []);

  const onSubmit = (formData) => {
    //TODO, formData está voltando vazio
    console.log(formData);
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/category/${action}`;

    const id = !isCreate && currentCategory.id;
    const name = formData.categoryName;
    const isActive = formData.categoryActive ? 1 : 0;

    isCreate // isActive não pode ser 0 no create se não o js acha que é "false" na query
      ? axios.post(url, { name, isActive }).then((resp) => {
          console.log("updatedCategory resp", resp);
          hideDrawer();
          refreshData();
          fetchAndSetData();
        })
      : axios.post(url, { id, name, isActive }).then((resp) => {
          console.log("updatedCategory resp", resp);
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
          <h4>{isCreate ? "Nova Categoria" : currentCategory.name}</h4>

          <TextField
            name="categoryName"
            defaultValue={isCreate ? "" : currentCategory.name}
            ref={register({ required: true })}
          />

          <h6>Ativo?</h6>
          <Checkbox
            name="categoryActive"
            defaultChecked={currentCategory.isActive == 1 ? true : false}
            ref={register}
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
      {!isLoaded && !isCreate ? (
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
