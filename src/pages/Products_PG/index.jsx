import React, { useState, useEffect } from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";
import ProductCreateButton from "../../components/ProductCreateButton_CMP";
import ProductSearchBar from "../../components/ProductSearchBar_CMP";

import { Produtos as data } from "./mockData";

import { useParams, useHistory } from "react-router-dom";

import HerokuServer from "../../API/HerokuServer";

const Products_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [products, setProducts] = useState([]);
  const [actionExecuted, setActionExecuted] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const history = useHistory();

  const [prodID, setProdID] = useState(useParams().id);

  useEffect(() => {
    // window.location.reload(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const action = urlParams.get("action");

    if (prodID) {
      openDrawer();
    } else if (!actionExecuted) {
      setActionExecuted(true);

      switch (action) {
        case "create":
          setIsCreate(true);
          openDrawer();
          setActionExecuted(false);

          break;
        case "search":
          const name = urlParams.get("name");

          const params = {
            name: name || "",
          };

          HerokuServer.Product.list({ ...params }).then((resp) => {
            console.log("resp", resp);
            setProducts(resp);
          });

          break;
        default:
          HerokuServer.Product.list().then((resp) => {
            console.log("resp", resp);
            setProducts(resp);
          });
      }
    }
  });

  const hideAndClearCurrentProduct = () => {
    setProdID(null);
    hideDrawer();
  };

  function handleProduct(openProdId) {
    setProdID(openProdId);
    history.push(`/p/${openProdId}`);
    openDrawer();
  }

  return (
    <>
      <NavBar />
      <Main>
        <ProductSearchBar />
        <ProductCreateButton />
        {products ? (
          <CardContainer>
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                onClick={() => handleProduct(product.id)}
              />
            ))}
          </CardContainer>
        ) : (
          <h1>Loading</h1>
        )}
      </Main>

      <Drawer isOpen={isOpen} hide={hideAndClearCurrentProduct} closeUrl="/p">
        <ProductForm prodId={prodID} isCreate={isCreate} />
      </Drawer>
    </>
  );
};

export default Products_PG;
