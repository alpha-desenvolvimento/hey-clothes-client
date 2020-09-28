import React from "react";
import { useForm } from "react-hook-form";

import { FiSearch } from "react-icons/fi";
import {
  MainContainer,
  SearchInputContainer,
  SearchInput,
  FilterContainer,
  Hr,
  SubmitButton,
} from "./styles";

// import { useForm } from "react-hook-form";
// import HerokuServer from "../../API/HerokuServer";

const ProductSearchBar = ({ handleFetchData, ignorePagination }) => {
  const { register, handleSubmit } = useForm();

  async function doSearch(formValues) {
    const urlParams = new URLSearchParams("");
    const { searchValue } = formValues;

    if (!ignorePagination) urlParams.set("page", 1);

    if (searchValue && searchValue != "") urlParams.set("name", searchValue);

    window.history.pushState(null, null, `?${urlParams.toString()}`);

    handleFetchData();
    window.scrollTo(0, 0);
  }

  return (
    <>
      <MainContainer onSubmit={handleSubmit(doSearch)}>
        <SearchInputContainer>
          <SearchInput
            className="h4-font-size"
            name="searchValue"
            placeholder="Pesquisar"
            ref={register()}
          />
          <SubmitButton className="h5-font-size icon" style={{ right: "2rem" }}>
            <FiSearch />
          </SubmitButton>
          <Hr />
        </SearchInputContainer>
        <FilterContainer></FilterContainer>
      </MainContainer>
      <div style={{ paddingTop: "10rem" }}></div>
    </>
  );
};

export default ProductSearchBar;
