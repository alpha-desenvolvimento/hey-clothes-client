import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { FiExternalLink } from "react-icons/fi";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";

import { makeStyles } from "@material-ui/core/styles";

import { Link, ProductPhoto } from "./styles";
import Loading from "../MaterialLoading_CMP";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "1rem",
      width: "100%",
    },
  },
}));

const ProductForm = ({ prodId, isCreate, refreshData }) => {
  const { currentUser } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedDateEnter, setSelectedDateEnter] = React.useState(null);
  const [selectedDateLeave, setSelectedDateLeave] = React.useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const classes = useStyles();

  const handleDateChangeEnter = (date) => {
    setSelectedDateEnter(date);
  };
  const handleDateChangeLeave = (date) => {
    setSelectedDateLeave(date);
  };

  const fetchAndSetData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/products/${prodId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentProduct(resp.data[0]);
        setSelectedDateEnter(resp.data[0].revievedAt);
        resp.data[0].soldAt && setSelectedDateLeave(resp.data[0].soldAt);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  const fetchAndSetCatsAndProvs = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/provider/list`)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setProviders(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category/list`)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCategories(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAndSetCatsAndProvs();
    if (isCreate) {
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        Brand: "",
        category: 1,
        imgA: "",
        imgB: "",
        imgC: "",
        imgD: "",
        provider: 1,
      });
    } else {
      fetchAndSetData();
    }
  }, []);

  const onSubmit = (formData) => {
    console.log("formData", formData);
    //TODO implementar onSubmit direito
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/products/${action}`;

    const id = !isCreate && currentProduct.id;
    //TODO colocar isso dentro de um if else bonito, to muito cansado pra isso agora
    const createdBy = isCreate && currentUser.id;
    const quantity = isCreate && 1;

    const updatedProd = {
      id,
      name: formData.prodName,
      description: formData.prodDescription,
      price: formData.prodPrice,
      Brand: formData.prodbrand,
      category: formData.prodCategory,
      imgA: formData.prodImgA,
      imgB: formData.prodImgB,
      imgC: formData.prodImgC,
      imgD: formData.prodImgD,
      provider: formData.provider,
      createdBy,
      quantity,
    };

    axios.post(url, updatedProd).then((resp) => {
      console.log("updatedProvider resp", resp);
      refreshData();
      fetchAndSetData();
    });
  };

  function sucessLoad() {
    return (
      console.log(currentProduct), //TODO atualizar os campos do form
      (
        <Box padding="2rem" fontSize="2.4rem">
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4>{isCreate ? "Novo Produto" : currentProduct.name}</h4>

            <TextField
              variant="outlined"
              label="Nome do Produto"
              name="prodName"
              defaultValue={currentProduct.name}
              ref={register({ required: true })}
            />

            <TextField
              variant="outlined"
              multiline
              label="Descrição do Produto"
              name="prodDescription"
              defaultValue={currentProduct.description}
              ref={register({ required: true })}
            />

            <CurrencyTextField
              label="Preço do Produto"
              variant="outlined"
              currencySymbol="R$"
              minimumValue="0"
              outputFormat="string"
              decimalCharacter=","
              digitGroupSeparator="."
              defaultValue={currentProduct.price}
              textAlign="left"
              ref={register({ required: true, min: 0.01 })}
            />

            <TextField
              variant="outlined"
              label="Marca"
              name="prodBrand"
              defaultValue={currentProduct.brand}
              ref={register({ required: true })}
            />

            <TextField
              select
              variant="outlined"
              label="Categoria"
              name="prodCategory"
              defaultValue={currentProduct.category}
              ref={register({ required: true })}
            >
              {categories.map(
                (category, index) =>
                  category.isActive == 1 && (
                    <MenuItem key={"cat-" + index} value={category.id}>
                      {category.name}
                    </MenuItem>
                  )
              )}
            </TextField>

            <h4>Fotos do Produto</h4>
            <Grid
              justify="center"
              cols={2}
              container
              wrap="wrap"
              direction="row"
              spacing={3}
            >
              <Grid item sm>
                <ProductPhoto imageUrl={currentProduct.imgA} />
                <TextField
                  label="foto 1"
                  variant="outlined"
                  name="prodImgA"
                  defaultValue={currentProduct.imgA}
                  ref={register}
                />
              </Grid>

              <Grid item sm>
                <ProductPhoto imageUrl={currentProduct.imgB} />
                <TextField
                  label="foto 2"
                  variant="outlined"
                  name="prodImgB"
                  defaultValue={currentProduct.imgB}
                  ref={register}
                />
              </Grid>

              <Grid item sm>
                <ProductPhoto imageUrl={currentProduct.imgC} />
                <TextField
                  label="foto 3"
                  variant="outlined"
                  name="prodImgC"
                  defaultValue={currentProduct.imgC}
                  ref={register}
                />
              </Grid>

              <Grid item sm>
                <ProductPhoto imageUrl={currentProduct.imgD} />
                <TextField
                  label="foto 4"
                  variant="outlined"
                  name="prodImgD"
                  defaultValue={currentProduct.imgD}
                  ref={register}
                />
              </Grid>
            </Grid>

            <TextField
              select
              variant="outlined"
              label="Fornecedor"
              name="prodProvider"
              defaultValue={currentProduct.provider}
              ref={register({ required: true })}
            >
              {providers.map((provider, index) => (
                <MenuItem key={"prov-" + index} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
            </TextField>

            <Link to={`/c/provider/${currentProduct.provider}`}>
              <h4>
                {/*TODO, estilizar */}
                Ir ao fornecedor <FiExternalLink />
              </h4>
            </Link>

            <MuiPickersUtilsProvider locale={ptBrLocale} utils={DateFnsUtils}>
              {/*TODO, ainda não testei esses inputs de data */}
              <KeyboardDatePicker
                name="prodDataDeEntrada"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                label="Data de entrada"
                value={selectedDateEnter}
                initialFocusedDate={new Date(currentProduct.recievedAt)}
                onChange={handleDateChangeEnter}
                KeyboardButtonProps={{
                  "aria-label": "Mudar data de entrada",
                }}
              />

              <KeyboardDatePicker
                name="prodDataDeSaida"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                label="Data de saída"
                value={selectedDateLeave}
                initialFocusedDate={new Date(currentProduct.soldAt)}
                onChange={handleDateChangeLeave}
                KeyboardButtonProps={{
                  "aria-label": "Mudar data de saída",
                }}
              />
            </MuiPickersUtilsProvider>

            <Button color="primary" variant="contained" type="submit">
              Salvar
            </Button>
          </form>
        </Box>
      )
    );
  }

  function errorLoad() {
    return <h4>Erro produto não localizado</h4>;
  }

  return (
    <>
      {!isLoaded && !isCreate ? (
        <Loading />
      ) : currentProduct ? (
        sucessLoad()
      ) : (
        errorLoad()
      )}
    </>
  );
};

export default ProductForm;
