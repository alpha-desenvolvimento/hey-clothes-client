import React from "react";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Main, PageNumber, Arrow } from "./style";

const Paginator = ({
  hasPreviousPage,
  hasNextPage,
  currentPage,
  pageCount,
  fetchPageData,
  offset,
}) => {
  if (!offset) offset = 3;
  if (!currentPage || !pageCount) {
    currentPage = 0;
    pageCount = 0;
  }

  const PageNumbers = [];

  for (let i = 1; i <= pageCount; i++) {
    if (i >= currentPage - offset && i <= currentPage + offset) {
      let indexItem = (
        <PageNumber
          className={i == currentPage ? "current-page" : ""}
          onClick={() => {
            setPage(i);
          }}
        >
          {i}
        </PageNumber>
      );
      PageNumbers.push(indexItem);
    }
  }

  function changePage(value) {
    const urlParams = new URLSearchParams(window.location.search);

    const nextPage = parseInt(urlParams.get("page") || 1) + value;

    urlParams.set("page", nextPage);

    window.history.pushState(null, null, `?${urlParams.toString()}`);

    fetchPageData();
  }

  function setPage(value) {
    const urlParams = new URLSearchParams(window.location.search);

    // const nextPage = parseInt(urlParams.get("page") || 1) + value;

    urlParams.set("page", value);

    window.history.pushState(null, null, `?${urlParams.toString()}`);

    fetchPageData();
  }

  return (
    <Main>
      {PageNumbers.length > 0 && hasPreviousPage && (
        <Arrow onClick={() => changePage(-1)}>
          <FiChevronLeft />
        </Arrow>
      )}

      {PageNumbers}

      {PageNumbers.length > 0 && hasNextPage && (
        <Arrow onClick={() => changePage(1)}>
          <FiChevronRight />
        </Arrow>
      )}
    </Main>
  );
};

export default Paginator;
