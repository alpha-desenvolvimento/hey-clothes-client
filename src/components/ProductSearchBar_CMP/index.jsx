import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";

import { FiSearch, FiFilter } from "react-icons/fi";
import {
  MainContainer,
  SearchInputContainer,
  SearchInput,
  FilterContainer,
  Hr,
  SubmitButton,
} from "./styles";
// import { useForm } from "react-hook-form";
import HerokuServer from "../../API/HerokuServer";

const ProductSearchBar = () => {
  const history = useHistory();
  const [values, setValues] = useState({});

  useEffect(() => {});

  function handleInputChange(event) {
    const { name, value } = event.target;
    let nValue = values;
    nValue[name] = value;

    setValues(nValue);
  }

  function handleSubmit(event) {
    event.preventDefault();

    var uri = "/p?action=search";

    for (const key in values)
      if (values[key] && values[key] != "") uri += `&${key}=${values[key]}`;

    console.log(uri);

    history.push(uri);
    window.location.reload(false);
  }

  return (
    <MainContainer onSubmit={handleSubmit}>
      <SearchInputContainer>
        <SearchInput
          className="h4-font-size"
          name="name"
          placeholder="Pesquisar"
          value={values.name}
          onChange={handleInputChange}
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
