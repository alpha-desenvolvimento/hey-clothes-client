import React, { useState } from "react";

import AuthForm_CMP from "../../components/AuthForm_CMP";
import "./style.scss";

const Home_PG = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  function handleInputChange(event) {}

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <header>
        <h1>Hey Clothes System</h1>
      </header>
      <div>
        <AuthForm_CMP />
      </div>
    </>
  );
};

export default Home_PG;
