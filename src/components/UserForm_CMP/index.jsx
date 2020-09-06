import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "./styles";

import HerokuServer from "../../API/HerokuServer";

const UserForm = ({ userID, isCreate, ...rest }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isCreate) currentUser(HerokuServer.User.mockUser);
    // else
    //   HerokuServer.Product.get(userID).then((resp) => setCurrentProduct(resp));
  });

  function sucessLoad() {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>{currentUser.name}</h4>
          <br />
          <br />
          <br />
          {/* <Label htmlFor="productName">Nome do Produto</Label> */}
          {/* <Input
            name="productName"
            defaultValue={currentProduct.name}
            ref={register({ required: true })}
          /> */}
          {/* {errors.productName && <ErrorText>Este campo é necessário</ErrorText>} */}
          {/* <Label htmlFor="productPrice">Preço do Produto</Label> */}
          {/* <Input
            name="productPrice"
            defaultValue={currentProduct.price}
            ref={register({ required: true, min: 0.01 })}
          /> */}

          {/* {errors.productPrice && (
            <ErrorText>Este campo é necessário</ErrorText>
          )} */}

          {/* <Label htmlFor="productPhoto">Link da Foto do Produto</Label> */}
          {/* <PhotoContainer>
            {currentProduct.length > 0 &&
              currentProduct.pictures.map((picture, index) => (
                <ProductPhoto key={index} src={picture} />
              ))}
          </PhotoContainer> */}
          {/* <button type="submit">Salvar</button> */}
        </Form>
      </>
    );
  }

  function errorLoad() {
    return <h4>Erro: usuário não localizado</h4>;
  }

  return <>{currentUser ? sucessLoad() : errorLoad()}</>;
};

export default UserForm;
