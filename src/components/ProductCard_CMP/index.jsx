import React from "react";

import {
  CardWrapper,
  CardImage,
  CardDescription,
  NameText,
  PriceText,
} from "./styles";

const stockImage =
  "https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg";

const ProductCard = ({ product, openDrawer, ...rest }) => {
  function sanitizeString() {
    const limit = 17;
    if (product.name.length <= limit) return product.name;

    var aux = "";

    for (let i = 0; i <= limit - 3; i++) aux += product.name[i];
    aux += "...";

    return aux;
  }

  return (
    <CardWrapper {...rest}>
      <CardImage img={product.imgA ? product.imgA : stockImage} />
      <CardDescription>
        <NameText>{sanitizeString()}</NameText>
        <PriceText>R$ {product.price}</PriceText>
      </CardDescription>
    </CardWrapper>
  );
};

export default ProductCard;
