import React, { useState } from "react";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import LoginForm from "../../components/LoginForm_CMP";
import PwdResetForm from "../../components/PwdResetForm_CMP";
import { Img, Main } from "./styles";

import LargeLogo from "../../assets/img/logos/large_heyclothes.png";

const Home_PG = () => {
  const [displayPwdReset, setDisplayPwdReset] = useState(false);

  function hideResetPwdDrawe() {
    setDisplayPwdReset(false);
  }
  return (
    <Main>
      <h1 style={{ textAlign: "center" }}>
        HeyClothes! - Controle de produtos
      </h1>
      <div>
        <LoginForm
          className="form-wrapper"
          displayPwdReset={setDisplayPwdReset}
        />
      </div>
      <Drawer isOpen={displayPwdReset} hide={hideResetPwdDrawe}>
        <PwdResetForm />
      </Drawer>
    </Main>
  );
};

export default Home_PG;
