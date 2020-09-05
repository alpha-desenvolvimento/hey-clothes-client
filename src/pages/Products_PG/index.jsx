import React, { useState, useEffect } from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";
import ProductCreateButton from "../../components/ProductCreateButton_CMP";

import { Produtos as data } from "./mockData";

import { useParams, useHistory } from "react-router-dom";

import HerokuServer from "../../API/HerokuServer";

const Products_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [products, setProducts] = useState(null);

  const [isCreate, setIsCreate] = useState(false);

  const history = useHistory();

  const [prodID, setProdID] = useState(useParams().id);

  useEffect(() => {
    setProducts(data);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const action = urlParams.get("action");

    console.log("action", action);
    if (prodID) {
      openDrawer();
    } else {
      switch (action) {
        case "create":
          console.log("is create!");
          setIsCreate(true);
          openDrawer();
          break;
      }
    }
  });

  const hideAndClearCurrentProduct = () => {
    setProdID(null);
    hideDrawer();
  };

  function handleProduct(openProdId) {
    // if (prodID) openDrawer();
    setProdID(openProdId);
    history.push(`/p/${openProdId}`);
    openDrawer();
  }

  return (
    <>
      <NavBar />
      <Main>
        <ProductCreateButton />
        <div style={{ margin: "4rem auto" }}>
          <h1 style={{ width: "100%", textAlign: "center" }}>PESQUISA</h1>
        </div>
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
