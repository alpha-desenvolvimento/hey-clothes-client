import React from "react";
import { useHistory, Link } from "react-router-dom";

import "./style.scss";

const Mock_PG = (props) => {
  return (
    <>
      <header>
        <h1>Mock page</h1>
        <h3>{props.text}</h3>
      </header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </>
  );
};

export default Mock_PG;
