import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

import "./style.scss";

const Mock_PG = (props) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

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
      <button onClick={() => {console.log(currentUser)}}>Log current User</button>
      <button onClick={() => {setCurrentUser({token: "token ai"})}}>set current User</button>
      <button onClick={() => {setCurrentUser(null)}}>empty current User</button>
    </>
  );
};

export default Mock_PG;
