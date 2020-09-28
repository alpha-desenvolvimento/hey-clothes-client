import { Link, ProductPhoto, SoldNote } from "./styles";
import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../AuthContext";
import { FiExternalLink } from "react-icons/fi";
import Loading from "../../components/MaterialLoading_CMP";
import { NavBar, Main } from "../../components";
import { useParams, useHistory } from "react-router-dom";

import UrlUtils from "../../controller/url";

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

const ProductDetail_PG = () => {
  const history = useHistory();

  const [isCreate, setIsCreate] = useState(false);

  const [prodId, setProdID] = useState(useParams().id);
  const { currentUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    // errors,
    control,
    // clearErrors,
    // setError,
    // getValues,
    reset: resetForm,
  } = useForm();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadinCategories, setIsLoadingCategories] = useState(true);
  const [isLoadinProviders, setIsLoadingProviders] = useState(true);

  const classes = useStyles();

  useEffect(async () => {
    // setIsCreate(prodId == "create");
    loadProduct();
    loadCategories();
    loadProviders();

  }, []);

  const loadProduct = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const action = urlParams.get("action");
    setIsLoadingProduct(true);
    // const { action } = UrlUtils.getUrlParamsValues();

    if (action == "create") {
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
      setIsLoadingProduct(false);
    } else if (prodId) {
      let url = `${process.env.REACT_APP_API_URL}/api/products/${prodId}`;

      axios.get(url).then((resp) => {
        console.log("resp", resp);
        setCurrentProduct(resp.data[0]);
        setIsLoadingProduct(false);
      });
    } else {
      setIsLoadingProduct(false);
    }
  };

  const loadCategories = async () => {
    setIsLoadingCategories(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category/list`)
      .then((resp) => {
        if (resp.data.length <= 0) return;

        const recievedCategories = [];

        for (const category of resp.data) {
          if (category.isActive == 0) continue;

          recievedCategories.push(category);
        }

        recievedCategories[0].selected = true;

        setCategories(recievedCategories);
        setIsLoadingCategories(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadProviders = async () => {
    setIsLoadingProviders(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/provider/list`)
      .then((resp) => {
        if (resp.data.length <= 0) return;

        const recievedProviders = [];

        for (const provider of resp.data) {
          if (provider.isActive == 0) continue;

          if (currentProduct) {
            if (currentProduct.provider == provider.id) provider.select = true;
          }
          recievedProviders.push(provider);
        }

        recievedProviders[0].selected = true;

        setProviders(recievedProviders);
        setIsLoadingProviders(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    return;

    if (formData.price) {
      try {
        formData.price = parseFloat(
          formData.price.split(".").join("").replace(",", ".")
        );
      } catch (error) {}
    } else {
      formData.price = 0;
    }
    if (!(await isValidProduct(formData))) return;

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

    // setIsLoadingProduct(true);
    // setCurrentProduct(null);
    // axios
    //   .post(restEndpoint, productTO)
    //   .then((resp) => {
    //     console.log("product resp", resp.data);
    //     const returnedProduct = resp.data;
    //     if (returnedProduct.id) {
    //       if (isCreate) {
    //         successCreate(returnedProduct.id);
    //       } else {
    //         setCurrentProduct(returnedProduct);
    //       }
    //     } else {
    //       swal({
    //         text: `Erro ao executar operação, servidor não responde`,
    //         icon: "error",
    //         dangerMode: true,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     swal({
    //       text: `Erro ao executar operação:\n${error}`,
    //       icon: "error",
    //       dangerMode: true,
    //     });
    //   })
    //   .finally(() => {
    //     // resetForm();
    //     setIsLoadingProduct(false);
    //   });

    // async function successCreate(newProdId) {
    //   resetForm();
    //   await swal({
    //     text:
    //       "Novo produto cadastrado com sucesso!\nCadastrar um novo produto?",
    //     icon: "success",
    //     buttons: true,
    //   }).then((createNewProduct) => {
    //     if (!createNewProduct) {
    //       history.push(`/p/${newProdId}`);
    //     }
    //   });
    // }
  };

  const SucessLoad = () => {
    const SoldProd = () => {
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

    return (
      <Box padding="2rem" fontSize="2.4rem">
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4>{isCreate ? "Novo Produto" : currentProduct.name}</h4>
          {currentProduct.isActive == 0 && <SoldProd />}
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            label="Nome do Produto"
            name="name"
            defaultValue={currentProduct.name || ""}
            ref={register({ required: true })}
          />
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            multiline
            label="Descrição do Produto"
            name="description"
            defaultValue={currentProduct.description || ""}
            ref={register({ required: true })}
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
            ref={register({ required: true })}
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
            ref={register({ required: true })}
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
              ref={register({ required: true })}
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
                ref={register}
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
                ref={register}
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
                ref={register}
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
                ref={register}
              />
            </Grid>
          </Grid>

          <MuiPickersUtilsProvider
            locale={ptBrLocale}
            utils={DateFnsUtils}
            okLabel
            todayLabel
          >
            <Controller
              as={KeyboardDatePicker}
              control={control}
              name="recievedAt"
              variant="inline"
              format="dd/MM/yyyy"
              autoOk
              todayLabel
              invalidDateMessage="Informe uma data válida"
              showTodayButton={true}
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
              todayLabel
              invalidDateMessage="[asd"
              showTodayButton={true}
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
          <input type="submit" />
        </form>
      </Box>
    );
  };

  const ErrorLoad = () => {
    return (
      <>
        <h5>
          Erro ao carregar a página, isso pode ocorrer devido a uma
          instabilidade do servidor, tente novamente mais tarde
        </h5>
      </>
    );
  };

  const Render = () => {
     
    if (isLoadingProduct || isLoadinProviders || isLoadinCategories) {
      return <Loading />;
    } else if (categories.length <= 0) {
      return (
        <>
          <br />
          <br />
          <h5>Erro ao carregar a página.</h5>
          <p>
            Isso pode ter ocorrido por instabilidade do servidor ou por não
            existirem categorias cadastradas, verifique e tente novamente.
          </p>
          <br />
          <br />

          <p>
            <Link to="/c/category">
              Acessar página de categorias <FiExternalLink />{" "}
            </Link>
          </p>
        </>
      );
    } else if (providers.length <= 0) {
      return (
        <>
          <br />
          <br />
          <h5>Erro ao carregar a página.</h5>
          <p>
            Isso pode ter ocorrido por instabilidade do servidor ou por não
            existirem fornecedores cadastrados, verifique e tente novamente.
          </p>
          <br />
          <br />

          <p>
            <Link to="/c/provider">
              Acessar página de fornecedores <FiExternalLink />{" "}
            </Link>
          </p>
        </>
      );
    } else if (currentProduct) {
      return <SucessLoad />;
    } else {
      return <ErrorLoad />;
    }
  };

  return (
    <>
      <NavBar />
      <Main>
        <Render />
      </Main>
    </>
  );
};

export default ProductDetail_PG;
