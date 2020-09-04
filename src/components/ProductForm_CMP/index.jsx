import React from "react";
import { useForm } from "react-hook-form";

import { Form, Input, Label, ErrorText } from "./styles";

const ProductForm = ({ currentProduct, ...rest }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <button
        onClick={() => {
          console.log(currentProduct);
        }}
      >
        Log currentProduct
      </button>
      <h1>Item {currentProduct.id}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          ref={register({ required: true })}
        />
        {errors.productPrice && <ErrorText>Este campo é necessário</ErrorText>}

        <Label htmlFor="productPhoto">Link da Foto do Produto</Label>
        <Input
          name="productPhoto"
          defaultValue={currentProduct.photo}
          ref={register({ required: true })}
        />
        {errors.productPhoto && <ErrorText>Este campo é necessário</ErrorText>}

        <button type="submit">Salvar</button>
      </Form>
    </>
  );
};

export default ProductForm;
