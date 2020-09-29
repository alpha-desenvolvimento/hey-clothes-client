import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";

import { NavBar, Main, ProductForm, Loading } from "../../components";

const ProductDetail_PG = () => {
  const [isCreate, setIsCreate] = useState(false);

  const [prodId, setProdID] = useState(useParams().id);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.location.pathname == "/p/create") {
      setIsCreate(true);
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        Brand: "",
        category: 1,
        imgA: "",
        imgB: "",
        imgC: "",
        imgD: "",
        provider: 1,
      });
      setIsLoading(false);
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const action = urlParams.get("action");
      setIsLoading(true);
      // const { action } = UrlUtils.getUrlParamsValues();

      if (action == "create") {
        setCurrentProduct({
          name: "",
          description: "",
          price: "",
          Brand: "",
          category: 1,
          imgA: "",
          imgB: "",
          imgC: "",
          imgD: "",
          provider: 1,
        });
      } else {
        let url = `${process.env.REACT_APP_API_URL}/api/products/${prodId}`;

        axios
          .get(url)
          .then((resp) => {
            console.log("resp", resp);
            setCurrentProduct(resp.data[0]);
          })
          .then(() => {
            setIsLoading(false);
          });
      }
    }
  }, [prodId]);

  return (
    <>
      <NavBar />
      <Main>
        {isLoading ? (
          <Box height="80vh">
            <Loading />
          </Box>
        ) : (
          <ProductForm
            isCreate={isCreate}
            currentProduct={currentProduct}
            categories={categories}
            providers={providers}
          />
        )}
      </Main>
    </>
  );
};

export default ProductDetail_PG;
