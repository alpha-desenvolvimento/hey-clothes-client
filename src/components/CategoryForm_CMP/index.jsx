import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form, Input, Label } from "../ProductForm_CMP/styles";

import HerokuServer from "../../API/HerokuServer";

const CategoryForm = ({ categoryId, isCreate, ...rest }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    console.log("categoryId", categoryId);

    if (isCreate) setCurrentCategory(HerokuServer.Category.mockCategory);
    else
      HerokuServer.Category.get({ id: categoryId }).then((resp) =>
        // console.log(resp)
        setCurrentCategory(resp)
      );

    console.log(currentCategory);
  });

  function sucessLoad() {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>{currentCategory.desc}</h4>
          <br />
          <br />
          <br />

          <Label htmlFor="categoryDesc">Descrição</Label>
          <Input
            name="categoryDesc"
            defaultValue={isCreate ? "" : currentCategory.desc}
            ref={register({ required: true })}
          />
          {/* {errors.productName && <ErrorText>Este campo é necessário</ErrorText>} */}

          <Label htmlFor="categoryActive">Ativo</Label>
          <input
            type="checkbox"
            name="categoryActive"
            defaultValue={currentCategory.active}
            ref={register()}
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
