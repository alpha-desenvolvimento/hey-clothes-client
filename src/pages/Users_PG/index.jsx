import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";

import NavBar, { Main } from "../../components/NavBar_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import { useParams, useHistory } from "react-router-dom";
import { FiMail, FiUser } from "react-icons/fi";
import { AuthContext } from "../../AuthContext";

import UserForm from "../../components/UserForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import SearchBar from "../../components/SearchBar_CMP";

import { CardContainer, Card, CardDetails, CardText } from "./styles";

const Users_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState(useParams().id);
  const { currentUser } = useContext(AuthContext);

  const [isCreate, setIsCreate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const history = useHistory();

  const fetchPageData = (query) => {
    setIsBadRequest(false);
    setIsLoaded(false);
    let url = `${process.env.REACT_APP_API_URL}/api/users/list`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setUsers(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setIsBadRequest(true);
      })
      .finally(() => {
        setIsLoaded(true);
        setIsBadRequest(false);
      });
  };

  const fetchAndSetPageData = useCallback((query) => {
    fetchPageData(query);
  }, []);

  useEffect(() => {
    fetchAndSetPageData(currentUser.id);
    if (userID) {
      openDrawer();
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const action = urlParams.get("action");

      // if (!actionExecuted)
      switch (action) {
        case "create":
          console.log("is create");
          setIsCreate(true, openDrawer());
          break;

        default:
          break;
      }
    }
  }, []);

  const hideAndClearCurrentUser = () => {
    setUserID(null);
    hideDrawer();
  };

  const handleUser = (openUserId) => {
    setUserID(openUserId);
    history.push(`/u/${openUserId}`);
    openDrawer();
  };

  return (
    <>
      <NavBar />
      <Main>
        <CreateButton dest="/u?action=create" />
        <SearchBar />
        {isBadRequest ? (
          <h1>{error}</h1>
        ) : !isLoaded ? (
          <h1>To carregando</h1>
        ) : (
          <>
            <CardContainer>
              {users && (
                <>
                  {users.map((user, index) => (
                    <Card
                      onClick={() => {
                        handleUser(user.id);
                      }}
                      active={user.isActive}
                      key={"Card-" + user.id}
                    >
                      <CardDetails>
                        <CardText>Id: {user.id}</CardText>
                        <CardText active={user.isActive} svg="right">
                          {user.isActive == 0 ? (
                            <span>inativo</span>
                          ) : (
                            <span>ativo</span>
                          )}
                          <FiUser />
                        </CardText>
                      </CardDetails>
                      <CardText primary>{user.name}</CardText>
                      <CardDetails>
                        <CardText greyscale active={user.isActive} svg="left">
                          <FiMail />
                          {user.email}
                        </CardText>
                      </CardDetails>
                    </Card>
                  ))}
                </>
              )}
            </CardContainer>
          </>
        )}
      </Main>

      <Drawer isOpen={isOpen} hide={hideAndClearCurrentUser} closeUrl="/u">
        <UserForm
          refreshData={fetchAndSetPageData}
          userID={userID}
          isCreate={isCreate}
        />
      </Drawer>
    </>
  );
};

export default Users_PG;

// table, th, td {
//   border: 1px solid black;
//   border-collapse: collapse;
// }
