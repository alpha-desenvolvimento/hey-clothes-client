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
            <h3>Fornecedores</h3>
            <h5>Consulte e gerencie as informações sobre seus fornecedores.</h5>
          </NavCard>

          <NavCard to="/c/category">
            <h3>Categorias</h3>
            <h5>
              Consulte e gerencie as diferentes categorias que seus produtos
              podem receber.
            </h5>
          </NavCard>

          <NavCard to="/c/condition">
            <h3>Condições de produto</h3>
            <h5>
              Consulte e gerencie as diferentes condições de seus produtos.
            </h5>
          </NavCard>
        </CardsWrapper>
      </Main>
    </>
  );
};

export default Config_PG;
