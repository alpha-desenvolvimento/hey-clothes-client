import React, { useState, useEffect, useCallback } from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import ProductSearchBar from "../../components/ProductSearchBar_CMP";

// import { Produtos as data } from "./mockData";

import { useParams, useHistory } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import HerokuServer from "../../API/HerokuServer";
import axios from "axios";

const Products_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const history = useHistory();

  const [products, setProducts] = useState([]);

  const [prodID, setProdID] = useState(useParams().id);
  const [actionExecuted, setActionExecuted] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [page, setPage] = useState(1);
  const [nextPageExists, setNextPageExists] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const fetchAndSetPageData = useCallback((page) => {
    fetchPageData(page);
  }, []);

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
        case "search": //TODO axios search
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
          fetchAndSetPageData(page);
      }
    }
  }, [actionExecuted, fetchAndSetPageData, openDrawer, page, prodID]);

  const fetchPageData = (page) => {
    setIsBadRequest(false);
    setIsLoaded(false);
    axios //TODO colocar url em uma variavel de .env ou algo assim pra produção
      .get(`http://localhost:5000/api/products/page/${page}`)
      .then((resp) => {
        console.log("resp", resp);
        setProducts(resp.data.data.result.products.rows);
        setNextPageExists(resp.data.data.result.next);
      })
      .catch((err) => {
        console.log(err);
        setIsBadRequest(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  const hideAndClearCurrentProduct = () => {
    setProdID(null);
    hideDrawer();
  };

  function handleProduct(openProdId) {
    setProdID(openProdId);
    history.push(`/p/${openProdId}`);
    openDrawer();
  }

  //TODO refatorar handleNext e handlePrevious em uma só função
  function handleNextPage() {
    setPage(parseInt(page) + 1, fetchAndSetPageData(page + 1));
    //Segundo argumento do metodo set é um callback
    console.log(page);
  }

  async function handlePreviousPage() {
    setPage(page - 1, fetchAndSetPageData(page - 1));
    //Segundo argumento do metodo set é um callback
    console.log(page);
  }

  return (
    <>
      <NavBar />
      <Main>
        <ProductSearchBar />
        <div style={{ paddingTop: "10rem" }}></div>
        {isBadRequest ? (
          <h1>Erro ao efetuar pesquisa</h1>
        ) : !isLoaded ? (
          <h1>To carregando</h1>
        ) : (
          <>
            <CreateButton dest="/p?action=create" />
            <h1>EU SOU A PAGINA {page} </h1>
            {products ? (
              <>
                {/*TODO add styling to arrows */}
                {page > 1 && (
                  <h1 onClick={handlePreviousPage}>
                    Anterior
                    <FiChevronLeft />
                  </h1>
                )}
                {nextPageExists && (
                  <h1 onClick={handleNextPage}>
                    Proxima
                    <FiChevronRight />
                  </h1>
                )}
                <CardContainer>
                  {products.map((product, index) => (
                    <Card
                      key={product.id + "-" + index}
                      product={product}
                      onClick={() => handleProduct(product.id)}
                    />
                  ))}
                </CardContainer>
                {/*TODO add styling to arrows */}
                {page > 1 && (
                  <h1 onClick={handlePreviousPage}>
                    Anterior
                    <FiChevronLeft />
                  </h1>
                )}
                {nextPageExists && (
                  <h1 onClick={handleNextPage}>
                    Proxima
                    <FiChevronRight />
                  </h1>
                )}
              </>
            ) : (
              <h1>Loading</h1>
            )}
          </>
        )}
      </Main>

      <Drawer isOpen={isOpen} hide={hideAndClearCurrentProduct} closeUrl="/p">
        <ProductForm prodId={prodID} isCreate={isCreate} />
      </Drawer>
    </>
  );
};

export default Products_PG;
