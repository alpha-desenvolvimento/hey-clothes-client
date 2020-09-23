import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

import { getUrlParams, getPage } from "../../controller/url";

import NavBar, { Main } from "../../components/NavBar_CMP";
import CardContainer from "../../components/CardContainer_CMP";
import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import ProductForm from "../../components/ProductForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import ProductSearchBar from "../../components/SearchBar_CMP";
import Paginator from "../../components/Paginator_CMP";

import { BreadcrumbNav, BreadCrumbItem, BreadCrumbItemText } from "./styles";
import HerokuServer from "../../API/HerokuServer";
import Spinner from "../../components/LoadingSpinner_CMP";

const Products_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const history = useHistory();

  const [products, setProducts] = useState([]);

  const [prodID, setProdID] = useState(useParams().id);
  const [actionExecuted, setActionExecuted] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, sethasPreviousPage] = useState(false);
  const [pageCount, setPageCout] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // window.location.reload(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const action = urlParams.get("action");

    setPage(parseInt(urlParams.get("page") || 1));

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
          fetchPageData();
      }
    }
  }, [actionExecuted, openDrawer, page, prodID]);

  const fetchPageData = () => {
    setIsBadRequest(false);
    setIsLoaded(false);

    const urlParams = { paramList: [["name", "prodName"]] };

    let url = `${
      process.env.REACT_APP_API_URL
    }/api/products/page/${getPage()}${getUrlParams(urlParams)}`;

    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data.products);
        setHasNextPage(resp.data.next);
        sethasPreviousPage(resp.data.previous);
        setPageCout(resp.data.pageCount + 1);
        setCurrentPage(resp.data.page + 1);
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
          <Spinner />
        ) : (
          <>
            <CreateButton
              setIsCreate={setIsCreate}
              openDrawer={openDrawer}
              dest="/p?action=create"
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
            <Paginator
              fetchPageData={fetchPageData}
              hasPreviousPage={hasPreviousPage}
              hasNextPage={hasNextPage}
              currentPage={currentPage}
              pageCount={pageCount}
            />
          </>
        )}
      </Main>

      <Drawer isOpen={isOpen} hide={hideAndClearCurrentProduct} closeUrl="/p">
        <ProductForm
          refreshData={() => {
            fetchPageData();
          }}
          prodId={prodID}
          isCreate={isCreate}
        />
      </Drawer>
    </>
  );
};

export default Products_PG;
