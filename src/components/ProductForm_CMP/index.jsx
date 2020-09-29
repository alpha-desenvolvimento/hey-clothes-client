import { Link, ProductPhoto, SoldNote } from "./styles";
import axios from "axios";
import swal from "sweetalert";
import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../AuthContext";
import { FiExternalLink } from "react-icons/fi";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  makeStyles,
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "1rem",
      width: "100%",
    },
  },
}));

const SoldProd = ({ currentProduct }) => {
  var soldDate = new Date(currentProduct.soldAt);
  soldDate = `${soldDate.getDay()}/${
    soldDate.getMonth() + 1
  }/${soldDate.getFullYear()}`;

  return (
    <>
      <SoldNote>
        Produto indisponível
        <br />
        Vendido/entregue em {soldDate}
      </SoldNote>
    </>
  );
};
const ProductForm = ({ isCreate, currentProduct, categories, providers }) => {
  const { currentUser } = useContext(AuthContext);
  const { handleSubmit, control } = useForm();

  const classes = useStyles();

  const isValidProduct = async (formData) => {
    const { name, price, brand, recievedAt } = formData;

    if (!name || name == "") {
      swal({
        text: "Informe um nome para o produto",
        icon: "error",

        dangerMode: true,
      });
      return false;
    }

    if (!price || price == 0) {
      await swal({
        text: "Você informou valor R$ 0.00 para o produto, deseja continuar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (!willDelete) {
          swal("Operação cancelada, você pode corrigir o valor do produto.", {
            icon: "info",
          });
          return false;
        }
      });
    }

    if (!brand || brand == "") {
      await swal({
        text: "Você não informou uma marca para o produto, deseja continuar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (!willDelete) {
          swal("Operação cancelada, você pode corrigir a marca do produto.", {
            icon: "info",
          });
          return false;
        }
      });
    }

    if (!recievedAt || recievedAt == "") {
      await swal({
        text:
          "Você não informou uma data de recebimento do produto, deseja continuar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (!willDelete) {
          swal(
            "Operação cancelada, você pode corrigir a data de recebimento do produto.",
            {
              icon: "info",
            }
          );
          return false;
        }
      });
    }

    return true;
  };

  const onSubmit = (formData) => {
    if (!isValidProduct(formData)) return;
    const action = isCreate ? "create" : "update";
    const restEndpoint = `${process.env.REACT_APP_API_URL}/api/products/${action}`;

    const productTO = { ...formData };

    console.log("product", productTO);

    if (isCreate) {
      productTO.createdBy = currentUser.id;
    } else {
      productTO.id = currentProduct.id;
    }

    delete productTO.isActive;

    axios
      .post(restEndpoint, productTO)
      .then((resp) => {
        console.log("product resp", resp.data);
        const returnedProduct = resp.data;
        if (returnedProduct.id) {
          if (isCreate) {
            //successCreate(returnedProduct.id);
          } else {
            //setCurrentProduct(returnedProduct);
          }
        } else {
          swal({
            text: `Erro ao executar operação, servidor não responde`,
            icon: "error",
            dangerMode: true,
          });
        }
      })
      .catch((error) => {
        swal({
          text: `Erro ao executar operação:\n${error}`,
          icon: "error",
          dangerMode: true,
        });
      });
  };

  return (
    currentProduct && (
      <Box padding="2rem" fontSize="2.4rem">
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4>{isCreate ? "Novo Produto" : currentProduct.name}</h4>
          {currentProduct.isActive == 0 && (
            <SoldProd currentProduct={currentProduct} />
          )}
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Nome do Produto"
            name="name"
            defaultValue={currentProduct.name || ""}
          />
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            multiline
            label="Descrição do Produto"
            name="description"
            defaultValue={currentProduct.description || ""}
          />
          <Controller
            as={CurrencyTextField}
            control={control}
            variant="outlined"
            label="Preço do Produto"
            name="price"
            currencySymbol="R$"
            minimumValue="0"
            outputFormat="string"
            decimalCharacter=","
            digitGroupSeparator="."
            defaultValue={currentProduct.price || 0}
          />
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Marca"
            name="brand"
            defaultValue={currentProduct.brand || ""}
          />

          <Controller
            as={TextField}
            control={control}
            select
            variant="outlined"
            label="Categoria"
            name="category"
            defaultValue={() => {
              if (currentProduct)
                return currentProduct.category || categories[0].id;
              return categories[0].id;
            }}
          >
            {categories.map((category, index) => (
              <MenuItem key={"category-" + index} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Controller>
          <div className="provider">
            <Controller
              as={TextField}
              control={control}
              select
              variant="outlined"
              label="Fornecedor"
              name="provider"
              defaultValue={() => {
                if (currentProduct)
                  return currentProduct.provider || providers[0].id;
                return providers[0].id;
              }}
            >
              {providers.map((provider, index) => (
                <MenuItem key={"provider-" + index} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
            </Controller>
            {currentProduct.provider && (
              <Link
                to={`/c/provider/${currentProduct.provider}`}
                className="link-provider"
                target="_blank"
              >
                <span>
                  Acessar fornecedor <FiExternalLink />
                </span>
              </Link>
            )}
          </div>
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

              <Controller
                as={TextField}
                control={control}
                label="foto 1"
                variant="outlined"
                name="imgA"
                defaultValue={currentProduct.imgA || ""}
              />
            </Grid>

            <Grid item sm>
              <ProductPhoto imageUrl={currentProduct.imgB} />
              <Controller
                as={TextField}
                control={control}
                label="foto 2"
                variant="outlined"
                name="imgB"
                defaultValue={currentProduct.imgB || ""}
              />
            </Grid>

            <Grid item sm>
              <ProductPhoto imageUrl={currentProduct.imgC} />
              <Controller
                as={TextField}
                control={control}
                label="foto 3"
                variant="outlined"
                name="imgC"
                defaultValue={currentProduct.imgC || ""}
              />
            </Grid>

            <Grid item sm>
              <ProductPhoto imageUrl={currentProduct.imgD} />
              <Controller
                as={TextField}
                control={control}
                label="foto 4"
                variant="outlined"
                name="imgD"
                defaultValue={currentProduct.imgD || ""}
              />
            </Grid>
          </Grid>

          <MuiPickersUtilsProvider locale={ptBrLocale} utils={DateFnsUtils}>
            <Controller
              as={KeyboardDatePicker}
              control={control}
              name="recievedAt"
              variant="inline"
              format="dd/MM/yyyy"
              autoOk
              invalidDateMessage="Informe uma data válida"
              disableFuture
              animateYearScrolling
              label="Data de entrada"
              defaultValue={
                currentProduct.recievedAt
                  ? new Date(currentProduct.recievedAt)
                  : null
              }
              KeyboardButtonProps={{
                "aria-label": "Mudar data de entrada",
              }}
            />
            <Controller
              as={KeyboardDatePicker}
              control={control}
              name="soldAt"
              variant="inline"
              format="dd/MM/yyyy"
              autoOk
              invalidDateMessage="[asd"
              disableFuture
              animateYearScrolling
              label="Data de saída"
              defaultValue={
                currentProduct.soldAt ? new Date(currentProduct.soldAt) : null
              }
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
};

export default ProductForm;
