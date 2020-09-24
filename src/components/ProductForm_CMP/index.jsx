import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";

import {
  Form,
  Input,
  Label,
  ErrorText,
  PhotoContainer,
  ProductPhotoWrapper,
  ProductPhoto,
  IdText,
} from "./styles";

const ProductForm = ({ prodId, isCreate, refreshData }) => {
  const { currentUser } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-08-18")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchAndSetData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/products/${prodId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentProduct(resp.data[0]);
      })
      .catch((err) => {
        console.log(err);
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
        <>
          <Form
            styles={{ fontSize: "1.6rem" }}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4>{isCreate ? "Novo Produto" : currentProduct.name}</h4>

            <TextField
              label="Nome do Produto"
              name="prodName"
              defaultValue={currentProduct.name}
              ref={register({ required: true })}
            />

            <TextField
              multiline
              label="Descrição do Produto"
              name="prodDescription"
              defaultValue={currentProduct.description}
              ref={register({ required: true })}
            />

            {/*Eu fiquei das 2:09 am até as 3:27 tentando fazer isso ficar com mask e tal, tentei usando react-input-mask, react-intl-currency-mask e uma caralhada de coisa, to cansado e não consegui */}
            <TextField
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              label="Preço do Produto"
              name="prodPrice"
              defaultValue={currentProduct.price}
              ref={register({ required: true, min: 0.01 })}
            />

            <TextField
              label="Marca"
              name="prodBrand"
              defaultValue={currentProduct.brand}
              ref={register({ required: true })}
            />

            <TextField
              select
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

            <Label htmlFor="productPhoto">Fotos do Produto</Label>
            <PhotoContainer>
              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgA} />
                <TextField
                  name="prodImgA"
                  defaultValue={currentProduct.imgA}
                  ref={register}
                />
              </ProductPhotoWrapper>

              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgB} />
                <TextField
                  name="prodImgB"
                  defaultValue={currentProduct.imgB}
                  ref={register}
                />
              </ProductPhotoWrapper>

              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgC} />
                <TextField
                  name="prodImgC"
                  defaultValue={currentProduct.imgC}
                  ref={register}
                />
              </ProductPhotoWrapper>

              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgD} />
                <TextField
                  name="prodImgD"
                  defaultValue={currentProduct.imgD}
                  ref={register}
                />
              </ProductPhotoWrapper>
            </PhotoContainer>
            <TextField
              select
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

            <MuiPickersUtilsProvider locale={ptBrLocale} utils={DateFnsUtils}>
              {/*TODO, ainda não testei esses inputs de data */}
              <KeyboardDatePicker
                name="prodDataDeEntrada"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                label="Data de entrada"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                ref={register}
              />

              <KeyboardDatePicker
                name="prodDataDeSaida"
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                label="Data de saída"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                ref={register}
              />
            </MuiPickersUtilsProvider>

            <Button color="primary" variant="contained" type="submit">
              Salvar
            </Button>
          </Form>
        </>
      )
    );
  }

  function errorLoad() {
    return <h4>Erro produto não localizado</h4>;
  }

  return <>{currentProduct ? sucessLoad() : errorLoad()}</>;
};

export default ProductForm;
