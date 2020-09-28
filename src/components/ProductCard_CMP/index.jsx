import React from "react";

// import {
//   CardWrapper,
//   CardImage,
//   CardDescription,
//   NameText,
//   PriceText,
// } from "./styles";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

const stockImage =
  "https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg";

const ProductCard = ({ product, openDrawer, onClick, ...rest }) => {
  function sanitizeString() {
    const limit = 17;
    if (product.name.length <= limit) return product.name;

    var aux = "";

    for (let i = 0; i <= limit - 3; i++) aux += product.name[i];
    aux += "...";

    return aux;
  }

  return (
    <Card onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          height="140"
          image={product.imgA ? product.imgA : stockImage}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span>{product.price == 0 ? "Doação" : `R$ ${product.price}`}</span>
            <span>{(product.isActive == 0) & `Indisponível`}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    // <CardWrapper {...rest}>
    //   <CardImage img/>
    //   <CardDescription>
    //     <NameText>{sanitizeString()}</NameText>
    //     <PriceText>R$ {product.price}</PriceText>
    //   </CardDescription>
    // </CardWrapper>
  );
};

export default ProductCard;
