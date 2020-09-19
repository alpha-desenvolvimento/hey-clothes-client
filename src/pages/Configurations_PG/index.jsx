import React from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";

import { CardsWrapper, NavCard } from "./styles";

const Config_PG = () => {
  return (
    <>
      <NavBar />
      <Main>
        <CardsWrapper>
          <NavCard to="/c/provider">
            <h1>Providers</h1>
            <h3>Descrição do card seila</h3>
          </NavCard>

          <NavCard to="/c/category">
            <h1>Categories</h1>
            <h3>Descrição do card seila</h3>
          </NavCard>
        </CardsWrapper>
      </Main>
    </>
  );
};

export default Config_PG;
