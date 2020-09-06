import React, { useState, useEffect } from "react";
import NavBar, { Main } from "../../components/NavBar_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import { useParams, useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

import HerokuServer from "../../API/HerokuServer";

import UserForm from "../../components/UserForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import UserSearchBar from "../../components/UserSearchBar_CMP";

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
      openDrawer();
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const action = urlParams.get("action");

      console.log(action);

      // if (!actionExecuted)
      switch (action) {
        case "create":
          console.log("is create");
          setIsCreate(true);
          openDrawer();
          break;
        case "search":
          const name = urlParams.get("name");
          //       const params = {
          //         name: name || "",
          break;
        // };
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

  });
  
  const hideAndClearCurrentProduct = () => {
    setUserID(null);
    hideDrawer();
  };

  return (
    <>
      <NavBar />
      <Main>
        <CreateButton dest="/u?action=create" />
        <UserSearchBar />
        <Table>
          <tr>
            <th className="h3-font-size">Nome</th>
            <th className="h3-font-size">E-mail</th>
          </tr>
          {users && (
            <>
              {users.map((user, index) => (
                <tr className="h5-font-size" key={user.id}>
                  <td>
                    <span className="h6-font-size">{`${index}. `}</span>
                    {user.name}
                    <FiEdit
                      className="icon p-font-size"
                      onClick={() => {
                        history.push(`/u/${user.id}`);
                        window.location.reload(false);
                      }}
                    />
                  </td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </>
          )}
        </Table>
      </Main>

      <Drawer isOpen={isOpen} hide={hideAndClearCurrentProduct} closeUrl="/u">
        <UserForm userID={userID} isCreate={isCreate} />
      </Drawer>
    </>
  );
};

export default Users_PG;

// table, th, td {
//   border: 1px solid black;
//   border-collapse: collapse;
// }
