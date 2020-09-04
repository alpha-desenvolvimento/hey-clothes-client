import React from "react";
import { useForm } from "react-hook-form";

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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="productName">Nome do Produto</label>
        <input
          name="productName"
          defaultValue={currentProduct.name}
          ref={register({ required: true })}
        />
        {errors.productName && <span>Este campo é necessário</span>}

        <label htmlFor="productPrice">Preço do Produto</label>
        <input
          name="productPrice"
          defaultValue={currentProduct.price}
          ref={register({ required: true })}
        />
        {errors.productPrice && <span>Este campo é necessário</span>}

        <label htmlFor="productPhoto">Link da Foto do Produto</label>
        <input
          name="productPhoto"
          defaultValue={currentProduct.photo}
          ref={register({ required: true })}
        />
        {errors.productPhoto && <span>Este campo é necessário</span>}

        <button type="submit">Salvar</button>
      </form>
    </>
  );
};

export default ProductForm;
