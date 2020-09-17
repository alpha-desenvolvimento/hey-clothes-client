import React from "react";

import LoginForm from "../../components/LoginForm_CMP";
import { Img, Main } from "./styles";

import LargeLogo from "../../assets/img/logos/large_heyclothes.png";

const Home_PG = () => {
  return (
    <Main>
      <Img src={LargeLogo} alt="logo" />
      <div>
        <LoginForm className="form-wrapper" />
      </div>
    </Main>
  );
};

export default Home_PG;
