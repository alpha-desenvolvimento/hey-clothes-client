import React from "react";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const stockImage =
  "https://www.creativefabrica.com/wp-content/uploads/2018/11/Clean-clothes-icon-by-rudezstudio-580x386.jpg";

const ProductCard = ({ product }) => {
  const useStyles = makeStyles({
    root: {
      maxWidth: "24rem",
      boxShadow: "0 2px 6px 0 hsla(0, 0%, 0%, 0.2)",
      transition: "all 200ms ease-in-out",
      "&:hover": {
        cursor: "pointer",
        boxShadow: "0 4px 10px 0 hsla(0, 0%, 0%, 0.4)",
      },
    },
    link: {
      color: "inherit",
      textDecoration: "inherit",
    },
  });

  const classes = useStyles();

  try {
    product.condition = product.productCondition.name || "";
  } catch (error) {
    product.condition = "";
  }

  const Price = () => {
    if (!product.price || product.price <= 0) {
      return (
        <>
          <p>Doação</p>
        </>
      );
    }

    if (product.price != "Doação") {
      var price = product.price.split(".");

      if (!price[1]) price.push("00");
      else if (price[1] < 10) price[1] += "0";

      price = price.join(",");

      return <p>R$ {price}</p>;
    }
    return <></>;
    //  {
    //   product.price = "";
    // } else
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link className={classes.link} to={`/p/detail/${product.id}`}>
          <CardMedia
            component="img"
            alt={product.name}
            height="280"
            image={product.imgA ? product.imgA : stockImage}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Price />
              <p>{product.condition}</p>
              {product.isActive == 0 && <p>Indisponível</p>}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
