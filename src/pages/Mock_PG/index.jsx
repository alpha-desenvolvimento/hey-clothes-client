import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";

import NavBar, { Main } from '../../components/NavBar_CMP'

const Mock_PG = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <Main>
        <button onClick={() => {console.log(currentUser)}}>Log current User</button>
        <button onClick={() => {setCurrentUser({token: "token ai"})}}>set current User</button>
        <button onClick={() => {setCurrentUser(null)}}>empty current User</button>
      </Main>
    </>
  );
};

export default Mock_PG;
