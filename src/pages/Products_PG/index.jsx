import React, { useState, useEffect } from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";

import { Produtos as data } from "./mockData";

const Products_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [products, setProducts] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    //fetch nos produtos é aqui
    setProducts(data);
  }, []);

  const hideAndClearCurrentProduct = () => {
    hideDrawer();
    setCurrentProduct(null);
  };

  return (
    <>
      <NavBar />
      <Main>
        <button
          onClick={() => {
            console.log(currentProduct);
          }}
        >
          Log current product
        </button>
        <div style={{ margin: "4rem auto" }}>
          <h1 style={{ width: "100%", textAlign: "center" }}>
            PLACEHOLDER DA BARRA DE PESQUISA
          </h1>
        </div>
        {products ? (
          <CardContainer>
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                openDrawer={openDrawer}
                setCurrentProduct={setCurrentProduct}
              />
            ))}
          </CardContainer>
        ) : (
          <h1>Loading</h1>
        )}
      </Main>
      <Drawer isOpen={isOpen} hide={hideAndClearCurrentProduct}>
        <ProductForm currentProduct={currentProduct} />
      </Drawer>
    </>
  );
};

export default Products_PG;
