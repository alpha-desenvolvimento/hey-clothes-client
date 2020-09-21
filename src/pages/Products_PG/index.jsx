import React, { useState, useEffect, useCallback } from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import ProductSearchBar from "../../components/SearchBar_CMP";

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

  const [page, setPage] = useState(0);
  const [nextPageExists, setNextPageExists] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
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

  const fetchPageData = (page, query) => {
    setIsBadRequest(false);
    setIsLoaded(false);
    let url = `${process.env.REACT_APP_API_URL}/api/products/page/${page}`;
    if (query) url += `?prodName=${query}`;
    axios //TODO colocar url em uma variavel de .env ou algo assim pra produção
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        !resp.data.products.lenght
          ? setProducts(resp.data.products)
          : setError("Não foram encontrados itens");
        setNextPageExists(resp.data.next);
      })
      .catch((err) => {
        console.log(err);
        setIsBadRequest(true);
      })
      .finally(() => {
        setIsLoaded(true);
        setIsBadRequest(false);
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
        <ProductSearchBar page={page} handleFetchData={fetchPageData} />
        <div style={{ paddingTop: "10rem" }}></div>
        {isBadRequest ? (
          <h1>{error}</h1>
        ) : !isLoaded ? (
          <h1>To carregando</h1>
        ) : (
          <>
            <CreateButton
              setIsCreate={setIsCreate}
              openDrawer={openDrawer}
              dest="/p?action=create"
            />
            <h1>EU SOU A PAGINA {page + 1} </h1>
            {products ? (
              <>
                {/*TODO add styling to arrows */}
                {page > 0 && (
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
                {page > 0 && (
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
