import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Form, Input, Label } from "./styles";

const CategoryForm = ({ categoryId, isCreate, refreshData }) => {
  const { register, handleSubmit, errors } = useForm();
  const [currentCategory, setCurrentCategory] = useState(null);

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
      });
  };

  useEffect(() => {
    console.log("categoryId", categoryId);

    if (isCreate) {
    } else {
      fetchAndSetData();
    }

    console.log(currentCategory);
  }, []);

  const onSubmit = (formData) => {
    const url = `${process.env.REACT_APP_API_URL}/api/category/update`;
    const auxId = currentCategory.id;
    var updatedCategory = {
      id: auxId,
      name: formData.categoryName,
      isActive: formData.categoryActive ? 1 : 0,
    };

    axios.post(url, { ...updatedCategory }).then((resp) => {
      console.log("updatedCategory resp", resp);
      refreshData();
      fetchAndSetData();
    });
  };

  function sucessLoad() {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>{currentCategory.name}</h4>

          <Label htmlFor="categoryName">Nome</Label>
          <Input
            name="categoryName"
            defaultValue={isCreate ? "" : currentCategory.name}
            ref={register({ required: true })}
          />
          {/* {errors.productName && <ErrorText>Este campo é necessário</ErrorText>} */}

          <Label htmlFor="categoryActive">Ativo</Label>
          <input
            name="categoryActive"
            type="checkbox"
            defaultChecked={currentCategory.isActive == 1 ? true : false}
            ref={register}
          />

          <button type="submit">Salvar</button>
        </Form>
      </>
    );
  }

  function errorLoad() {
    return <h4>Erro: Categoria não localizada</h4>;
  }

  return <>{currentCategory ? sucessLoad() : errorLoad()}</>;
};

export default CategoryForm;
