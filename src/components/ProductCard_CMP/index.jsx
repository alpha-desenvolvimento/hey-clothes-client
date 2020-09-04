import React from "react";

import {
  CardWrapper,
  CardImage,
  CardDescription,
  NameText,
  PriceText,
} from "./styles";

const ProductCard = ({ product, openDrawer, setCurrentProduct, ...rest }) => {
  const OpenDrawerWithCurrentProduct = () => {
    setCurrentProduct(product);
    openDrawer();
  };

  return (
    <CardWrapper onClick={OpenDrawerWithCurrentProduct}>
      <CardImage src={product.photo} />
      <CardDescription>
        <NameText>{product.name}</NameText>
        <PriceText>R$ {product.price}</PriceText>
      </CardDescription>
    </CardWrapper>
  );
};

export default ProductCard;
