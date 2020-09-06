import React, { useState, useEffect } from "react";

import NavBar, { Main } from "../../components/NavBar_CMP";
// import CardContainer from "../../components/CardContainer_CMP";
// import Card from "../../components/ProductCard_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import UserForm from "../../components/UserForm_CMP";
// import ProductCreateButton from "../../components/ProductCreateButton_CMP";
// import ProductSearchBar from "../../components/ProductSearchBar_CMP";

import { useParams, useHistory } from "react-router-dom";

import HerokuServer from "../../API/HerokuServer";

import { Table } from "./styles";

const Users_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState(useParams().id);
  const [actionExecuted, setActionExecuted] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (userID) {
      //   openDrawer();
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const action = urlParams.get("action");

      switch (action) {
        //     case "create":
        //       setIsCreate(true);
        //       openDrawer();
        //       setActionExecuted(false);
        //       break;
        //     case "search":
        //       const name = urlParams.get("name");
        //       const params = {
        //         name: name || "",
        //       };
        //       HerokuServer.Product.list({ ...params }).then((resp) => {
        //         console.log("resp", resp);
        //         setProducts(resp);
        //       });
        //       break;
        default:
          HerokuServer.User.list().then((resp) => {
            console.log("resp", resp);
            setUsers(resp);
          });
      }
    }

    console.log(users);
  });

  const hideAndClearCurrentProduct = () => {
    setUserID(null);
    hideDrawer();
  };

  function handleUser(userId) {
    setUserID(userId);
    history.push(`/u/${userId}`);
    openDrawer();
  }

  return (
    <>
      <NavBar />
      <Main>
        <Table>
          <tr>
            <th className="h3-font-size">Nome</th>
            <th className="h3-font-size">E-mail</th>
          </tr>
          {users && (
            <>
              {users.map((user) => (
                <tr
                  className="h5-font-size"
                  key={user.id}
                  onClick={handleUser(user.id)}
                >
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </>
          )}
        </Table>
      </Main>

      {/* <Drawer isOpen={isOpen} hide={hideAndClearCurrentProduct} closeUrl="/p">
        <ProductForm prodId={prodID} isCreate={isCreate} />
      </Drawer> */}
    </>
  );
};

export default Users_PG;

// table, th, td {
//   border: 1px solid black;
//   border-collapse: collapse;
// }
