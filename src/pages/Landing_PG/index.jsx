import React from "react";
import { FiArrowRight, FiMail, FiPhone, FiMap } from "react-icons/fi";

import { Wrapper, Header, StyledLink as Link, Main } from "./styles";
import LandingSVG from "../../components/LandingSVG_CMP";

const Landing = () => {
  return (
    <Wrapper>
      <Header>
        <Link to="/login">
          Acesso administrativo <FiArrowRight />
        </Link>
      </Header>
      <Main>
        <div>
          <section>
            <h1>HeyClothes!</h1>
            <h3>
              Seu brechó favorito,
              <br /> perto de você
            </h3>
          </section>
          <div>
            <a href="mailto:contato@heyclothes.com">
              <FiMail /> contato@heyclothes.com
            </a>
            <a href="tel:+5511999999999">
              <FiPhone /> (11) 9 9999-9999
            </a>
            <span>
              <FiMap /> Rua gabiru dos santos, 2899 - Vila Cruzeiro, SP
            </span>
          </div>
        </div>

        <div>
          <LandingSVG />
        </div>
      </Main>
    </Wrapper>
  );
};

export default Landing;
