import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Form, Input, Label } from "./styles";

const CategoryForm = ({ providerId, isCreate, refreshData }) => {
  const { register, handleSubmit, errors } = useForm();
  const [currentProvider, setCurrentProvider] = useState(null);

  const fetchAndSetData = () => {
    let url = `${process.env.REACT_APP_API_URL}/api/provider/${providerId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentProvider(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("providerId", providerId);

    if (isCreate) {
      setCurrentProvider({
        name: "",
        phone: "",
      });
    } else {
      fetchAndSetData();
    }

    console.log(currentProvider);
  }, []);

  const onSubmit = (formData) => {
    const action = isCreate ? "create" : "update";
    const url = `${process.env.REACT_APP_API_URL}/api/provider/${action}`;

    const id = !isCreate && currentProvider.id;
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
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>{isCreate ? "Novo fornecedor" : currentProvider.name}</h4>

          <Label htmlFor="providerName">Nome</Label>
          <Input
            type="text"
            defaultValue={currentProvider.name}
            name="providerName"
            ref={register({ required: true, maxLength: 80 })}
          />

          <Label htmlFor="providerPhone">Telefone</Label>
          <Input
            type="text"
            defaultValue={currentProvider.phone}
            name="providerPhone"
            ref={register({ required: true, maxLength: 15 })}
          />

          <button type="submit">Salvar</button>
        </Form>
      </>
    );
  }

  function errorLoad() {
    return <h4>Erro: Fornecedor não localizado</h4>;
  }

  return <>{currentProvider ? sucessLoad() : errorLoad()}</>;
};

export default CategoryForm;
