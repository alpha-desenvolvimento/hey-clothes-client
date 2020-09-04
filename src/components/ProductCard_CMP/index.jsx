import React from "react";

import {
  CardWrapper,
  CardImage,
  CardDescription,
  NameText,
  PriceText,
} from "./styles";

const ProductCard = ({ product, openDrawer, ...rest }) => {

  return (
    <CardWrapper {...rest}>
      <CardImage src={product.photo} />
      <CardDescription>
        <NameText>{product.name}</NameText>
        <PriceText>R$ {product.price}</PriceText>
      </CardDescription>
    </CardWrapper>
  );
};

export default ProductCard;
