import React, { useState, useEffect } from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";

import { Produtos as data } from "./mockData";
import { Redirect, useParams, useHistory } from "react-router-dom";

const Products_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [products, setProducts] = useState(null);
  const history = useHistory();

  const [prodID, setProdID] = useState(useParams().id);

  useEffect(() => {
    //fetch nos produtos é aqui
    setProducts(data);
  }, []);

  const hideAndClearCurrentProduct = () => {
    setProdID(null);
    hideDrawer();
  };

  useEffect(() => {
    if (!prodID) return;
    openDrawer();
  });

  function handleProduct(prodId) {
    // if (prodID) openDrawer();
    setProdID(prodId)
    history.push(`/p/${prodId}`);
    openDrawer();

  }

  return (
    <>
      <NavBar />
      <Main>
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
        <ProductForm prodId={prodID} />
      </Drawer>
    </>
  );
};

export default Products_PG;
