import React from "react";

import {
  CardWrapper,
  CardImage,
  CardDescription,
  NameText,
  PriceText,
} from "./styles";

const ProductCard = ({ product, openDrawer, ...rest }) => {
  function sanitizeString() {
    const limit = 17;
    if (product.name.length <= 17) return product.name;

    var aux = "";

    for (let i = 0; i <= 17 - 3; i++) aux += product.name[i];
    aux += "...";

    return aux;
  }

  return (
    <CardWrapper {...rest}>
      <CardImage img={product.photo} />
      <CardDescription>
        <NameText>{sanitizeString()}</NameText>
        <PriceText>R$ {product.price}</PriceText>
      </CardDescription>
    </CardWrapper>
  );
};

export default ProductCard;
