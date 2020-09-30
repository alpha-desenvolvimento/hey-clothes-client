import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";

import { getUrlParams, getPage } from "../../controller/url";

import NavBar, { Main } from "../../components/NavBar_CMP";
import {
  ProductCard as Card,
  CardContainer,
  Paginator,
  SearchBar,
  Loading as Spinner,
  CreateButton,
} from "../../components";

const Products_PG = () => {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, sethasPreviousPage] = useState(false);
  const [pageCount, setPageCout] = useState(0);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    async function firstFetch() {
      await getProductList();
    }
    firstFetch();
  }, []);

  async function getProductList() {
    setIsLoading(true);
    let endpoint = `${process.env.REACT_APP_API_URL}/api/products/page/`;
    endpoint += `${getPage() || 0}`;
    endpoint += `${getUrlParams({ paramList: ["name"] })}`;

    axios
      .get(endpoint)
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const GetProductCardList = () => {
    const productCards = [];

    for (const [index, product] of products.entries()) {
      productCards.push(<Card product={product} key={index} />);
    }

    return <CardContainer>{productCards}</CardContainer>;
  };

  const Render = () => {
    const Pagination = () => {
      return (
        <Paginator
          fetchPageData={forceUpdate}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          currentPage={currentPage}
          pageCount={pageCount}
        />
      );
    };
    const NoResults = () => {
      return <p style={{ textAlign: "center" }}>Pesquisa sem resultados :(</p>;
    };

    const Products = () => {
      return (
        <>
          <GetProductCardList />
          <Pagination />
        </>
      );
    };

    if (isLoading) {
      return (
        <Box height="80vh">
          <Spinner />
        </Box>
      );
    } else if (products.length <= 0) return <NoResults />;
    else {
      return <Products />;
    }
  };

  const forceUpdate = () => {
    getProductList();
  };

  return (
    <>
      <SearchBar page={page} setPage={setPage} handleFetchData={forceUpdate} />
      <NavBar />

      <Main>
        <CreateButton
          href="/p/create"
          variant="extended"
          text="Criar novo produto"
        />
        <Render />
      </Main>
    </>
  );
};

export default Products_PG;
