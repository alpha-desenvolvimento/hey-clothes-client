import React from "react";
import NavBar, { Main } from "../../components/NavBar_CMP";

import { CardsWrapper, Card } from "./styles";

const Config_PG = () => {
  return (
    <>
      <NavBar />
      <Main>
        <CardsWrapper>
          <Card>
            <h1>Providers</h1>
            <h3>Descrição do card seila</h3>
          </Card>
          <Card>
            <h1>Categories</h1>
            <h3>Descrição do card seila</h3>
          </Card>
        </CardsWrapper>
      </Main>
    </>
  );
};

export default Config_PG;
