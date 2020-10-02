import React, { useEffect, useState } from "react";

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

const UserSearchBar = () => {
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

    // var uri = "/p?action=search";

    // for (const key in values)
    //   if (values[key] && values[key] != "") uri += `&${key}=${values[key]}`;

    // console.log(uri);

    // history.push(uri);
    // window.location.reload(false);
  }

  return (
    <>
      <div style={{ paddingTop: "5rem" }}></div>
      <MainContainer onSubmit={handleSubmit}>
        <SearchInputContainer>
          <SearchInput
            className="h4-font-size"
            name="name"
            placeholder="Pesquisar - não funcional"
          />
          <SubmitButton className="h5-font-size icon" style={{ right: "2rem" }}>
            <FiSearch />
          </SubmitButton>
          <Hr />
        </SearchInputContainer>
        <FilterContainer></FilterContainer>
      </MainContainer>
    </>
  );
};

export default UserSearchBar;
