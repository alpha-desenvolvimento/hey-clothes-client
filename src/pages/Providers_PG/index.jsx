import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import NavBar, { Main } from "../../components/NavBar_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import { useParams } from "react-router-dom";
import { FiPhone } from "react-icons/fi";

import CategoryForm from "../../components/CategoryForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import SearchBar from "../../components/SearchBar_CMP";

import { CardContainer, Card, CardDetails, CardText } from "./styles";

const Providers_PG = () => {
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState(useParams().id);
  const [isCreate, setIsCreate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const fetchPageData = (query) => {
    setIsBadRequest(false);
    setIsLoaded(false);
    let url = `${process.env.REACT_APP_API_URL}/api/provider/list`;
    query && (url += `?provName=${query}`);
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setProviders(resp.data);
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
    fetchAndSetPageData("");
    if (providerId) {
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
          setIsCreate(true, openDrawer());
          break;

        default:
          break;
      }
    }
  }, []);

  const hideAndClearCurrentProvider = () => {
    setProviderId(null);
    hideDrawer();
  };

  return (
    <>
      <NavBar />
      <Main>
        <CreateButton dest="/c/provider?action=create" />
        <SearchBar handleFetchData={fetchPageData} />
        {isBadRequest ? (
          <h1>{error}</h1>
        ) : !isLoaded ? (
          <h1>To carregando</h1>
        ) : (
          <>
            <CardContainer>
              {providers && (
                <>
                  {providers.map((provider, index) => (
                    <Card key={"Card-" + provider.id}>
                      <CardText>Id: {provider.id}</CardText>
                      <CardText primary>{provider.name}</CardText>
                      <CardDetails>
                        <CardText>
                          <FiPhone />
                          {provider.phone}
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

      <Drawer
        isOpen={isOpen}
        hide={hideAndClearCurrentProvider}
        closeUrl="/c/provider"
      >
        <CategoryForm categoryId={providerId} isCreate={isCreate} />
      </Drawer>
    </>
  );
};

export default Providers_PG;
