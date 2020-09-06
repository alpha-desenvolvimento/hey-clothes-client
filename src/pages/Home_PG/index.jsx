import React, { useState } from "react";

import LoginForm from "../../components/LoginForm_CMP";
import { Img, Main } from "./styles";

import LargeLogo from "../../assets/img/logos/large_heyclothes.png";

const Home_PG = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  // function handleInputChange(event) {}

  // async function handleSubmit(event) {
  //   event.preventDefault();
  // }

  return (
    <Main>
      <Img src={LargeLogo} alt="logo" />
      <div>
        <LoginForm className="form-wrapper"/>
      </div>
    </Main>
  );
};

export default Home_PG;
