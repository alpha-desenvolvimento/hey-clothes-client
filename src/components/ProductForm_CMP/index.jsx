import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  Input,
  Label,
  ErrorText,
  PhotoContainer,
  ProductPhoto,
  IdText,
} from "./styles";

import HerokuServer from "../../API/HerokuServer";

// import { Produtos as produtos } from "../../pages/Products_PG/dbProd";

const ProductForm = ({ prodId, isCreate, ...rest }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (isCreate) setCurrentProduct(HerokuServer.Product.mockProd);
    else
      HerokuServer.Product.get(prodId).then((resp) => setCurrentProduct(resp));
  });

  function sucessLoad() {
    return (
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
          {errors.productName && <ErrorText>Este campo é necessário</ErrorText>}
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
            {currentProduct.photo && (
              <ProductPhoto src={currentProduct.photo} />
            )}
            {currentProduct.pictures.length > 0 &&
              currentProduct.pictures.map((picture, index) => (
                <ProductPhoto key={index} src={picture} />
              ))}
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
    );
  }

  function errorLoad() {
    return <h4>Erro produto não localizado</h4>;
  }

  return <>{currentProduct ? sucessLoad() : errorLoad()}</>;
};

export default ProductForm;
