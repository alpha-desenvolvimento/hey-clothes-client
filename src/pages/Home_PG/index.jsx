import React, { useState } from "react";

import LoginForm from "../../components/LoginForm_CMP";
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
        <LoginForm />
      </div>
    </>
  );
};

export default Home_PG;
