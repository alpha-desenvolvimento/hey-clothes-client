import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import ProductSearchBar from "../../components/SearchBar_CMP";

import { BreadcrumbNav, BreadCrumbItem, BreadCrumbItemText } from "./styles";
import HerokuServer from "../../API/HerokuServer";

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
    page === 0 ? fetchPageData("0") : fetchPageData(page);
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
    axios
      .get(url)
      .then((resp) => {
        console.log("fetchPageData", resp);
        // resp.header. TODO coloda o erro que vem no header
        setProducts(resp.data.products);
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
    setIsCreate(false);
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
        <ProductSearchBar
          page={page}
          setPage={setPage}
          handleFetchData={fetchPageData}
        />
        <div style={{ paddingTop: "10rem" }}></div>
        {isBadRequest ? (
          <h1>{error}</h1>
        ) : !isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <CreateButton
              setIsCreate={setIsCreate}
              openDrawer={openDrawer}
              dest="/p?action=create"
            />
            <BreadCrumbs
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              nextPageExists={nextPageExists}
              page={page}
            />
            <CardContainer>
              {products.map((product, index) => (
                <Card
                  key={product.id + "-" + index}
                  product={product}
                  onClick={() => handleProduct(product.id)}
                />
              ))}
            </CardContainer>
            <BreadCrumbs
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              nextPageExists={nextPageExists}
              page={page}
            />
          </>
        )}
      </Main>

      <Drawer isOpen={isOpen} hide={hideAndClearCurrentProduct} closeUrl="/p">
        <ProductForm
          refreshData={() => {
            fetchAndSetPageData(page);
          }}
          prodId={prodID}
          isCreate={isCreate}
        />
      </Drawer>
    </>
  );
};

export default Products_PG;

const BreadCrumbs = ({
  page,
  handlePreviousPage,
  nextPageExists,
  handleNextPage,
}) => {
  return (
    <BreadcrumbNav>
      {page > 0 && (
        <BreadCrumbItem onClick={handlePreviousPage}>
          <FiChevronLeft />
          <BreadCrumbItemText>página Anterior</BreadCrumbItemText>
        </BreadCrumbItem>
      )}
      <BreadCrumbItem>pg. {page + 1} </BreadCrumbItem>
      {nextPageExists && (
        <BreadCrumbItem onClick={handleNextPage}>
          <BreadCrumbItemText>Proxima página</BreadCrumbItemText>
          <FiChevronRight />
        </BreadCrumbItem>
      )}
    </BreadcrumbNav>
  );
};
