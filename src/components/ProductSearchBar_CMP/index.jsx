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

const ProductSearchBar = ({ currentPage, handleFetchData }) => {
  const { register, handleSubmit } = useForm();

  async function doSearch(formValues) {
    handleFetchData(currentPage, formValues.searchValue);
  }

  return (
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
  );
};

export default ProductSearchBar;
