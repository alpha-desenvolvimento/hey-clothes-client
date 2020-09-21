import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  Input,
  Label,
  ErrorText,
  PhotoContainer,
  ProductPhoto,
  IdText,
} from "./styles";

const ProductForm = ({ prodId, isCreate, refreshData }) => {
  const { register, handleSubmit, errors } = useForm();
  const [currentProduct, setCurrentProduct] = useState(null);

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

  useEffect(() => {
    if (isCreate) {
      setCurrentProduct({
        name: "",
        phone: "",
      });
    } else {
      fetchAndSetData();
    }
  }, []);

  const onSubmit = (formData) => {
    //TODO implementar onSubmit direito
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/products/${action}`;

    const id = !isCreate && currentProduct.id;
    const name = formData.providerName;
    const phone = formData.providerPhone;

    axios.post(url, { id, name, phone }).then((resp) => {
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4>{currentProduct.name}</h4>
            {currentProduct.id && <IdText>ID: {currentProduct.id}</IdText>}
            <br />
            <br />
            <br />
            <Label htmlFor="productName">Nome do Produto</Label>
            <Input
              name="productName"
              defaultValue={currentProduct.name}
              ref={register({ required: true })}
            />
            {errors.productName && (
              <ErrorText>Este campo é necessário</ErrorText>
            )}
            <Label htmlFor="productPrice">Preço do Produto</Label>
            <Input
              name="productPrice"
              defaultValue={currentProduct.price}
              ref={register({ required: true, min: 0.01 })}
            />

            <Label htmlFor="productBrand">Marca</Label>
            <Input
              name="productBrand"
              defaultValue={currentProduct.brand}
              ref={register({ required: true })}
            />

            <Label htmlFor="productCategory">Categoria</Label>
            <Input
              name="productCategory"
              defaultValue={currentProduct.category}
              ref={register({ required: true })}
            />

            {errors.productPrice && (
              <ErrorText>Este campo é necessário</ErrorText>
            )}

            <Label htmlFor="productPhoto">Fotos do Produto</Label>
            <PhotoContainer>
              {currentProduct.imgA && (
                <ProductPhoto src={currentProduct.photo} />
              )}
            </PhotoContainer>
            {/* <Input
            name="productPhoto"
            defaultValue={currentProduct.photo}
            ref={register({ required: true })}
          />
          {errors.productPhoto && (
            <ErrorText>Este campo é necessário</ErrorText>
          )} */}
            <button type="submit">Salvar</button>
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
