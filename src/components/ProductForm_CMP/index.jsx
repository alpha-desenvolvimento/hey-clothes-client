import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4>{isCreate ? "Novo Produto" : currentProduct.name}</h4>
            {currentProduct.id && <IdText>ID: {currentProduct.id}</IdText>}

            <Label htmlFor="prodName">Nome do Produto</Label>
            <Input
              name="prodName"
              defaultValue={currentProduct.name}
              ref={register({ required: true })}
            />

            <Label htmlFor="prodDescription">Descrição do Produto</Label>
            {/*TODO estilizar textArea */}
            <textarea
              name="prodDescription"
              defaultValue={currentProduct.description}
              ref={register({ required: true })}
            />

            <label htmlFor="">
              Product Quantity: {currentProduct.quantity}
            </label>

            <Label htmlFor="prodPrice">Preço do Produto</Label>
            <Input
              name="prodPrice"
              defaultValue={currentProduct.price}
              ref={register({ required: true, min: 0.01 })}
            />

            <Label htmlFor="prodBrand">Marca</Label>
            <Input
              name="prodBrand"
              defaultValue={currentProduct.brand}
              ref={register({ required: true })}
            />

            <Label htmlFor="prodCategory">Categoria</Label>
            <select
              name="prodCategory"
              defaultValue={currentProduct.category}
              ref={register({ required: true })}
            >
              {categories.map(
                (category, index) =>
                  category.isActive == 1 && (
                    <option key={"cat-" + index} value={category.id}>
                      {category.name}
                    </option>
                  )
              )}
            </select>

            <Label htmlFor="productPhoto">Fotos do Produto</Label>
            <PhotoContainer>
              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgA} />
                <Input
                  name="prodImgA"
                  defaultValue={currentProduct.imgA}
                  ref={register}
                />
              </ProductPhotoWrapper>

              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgB} />
                <Input
                  name="prodImgB"
                  defaultValue={currentProduct.imgB}
                  ref={register}
                />
              </ProductPhotoWrapper>

              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgC} />
                <Input
                  name="prodImgC"
                  defaultValue={currentProduct.imgC}
                  ref={register}
                />
              </ProductPhotoWrapper>

              <ProductPhotoWrapper>
                <ProductPhoto imageUrl={currentProduct.imgD} />
                <Input
                  name="prodImgD"
                  defaultValue={currentProduct.imgD}
                  ref={register}
                />
              </ProductPhotoWrapper>
            </PhotoContainer>
            <Label htmlFor="prodProvider">Fornecedor</Label>
            <select
              name="prodProvider"
              defaultValue={currentProduct.provider}
              ref={register({ required: true })}
            >
              {providers.map((provider, index) => (
                <option key={"prov-" + index} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
            <br />
            <br />
            <br />
            <br />
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
