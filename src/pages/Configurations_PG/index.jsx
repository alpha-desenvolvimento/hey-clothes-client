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
            <h3>Providers</h3>
            <h5>Descrição do card seila</h5>
          </NavCard>

          <NavCard to="/c/category">
            <h3>Categories</h3>
            <h5>Descrição do card seila</h5>
          </NavCard>
        </CardsWrapper>
      </Main>
    </>
  );
};

export default Config_PG;
