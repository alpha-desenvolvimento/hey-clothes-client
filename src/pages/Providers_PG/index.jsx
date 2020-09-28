import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getUrlParams } from "../../controller/url";

import NavBar, { Main } from "../../components/NavBar_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import { useParams, useHistory } from "react-router-dom";
import { FiPhone } from "react-icons/fi";

import ProviderForm from "../../components/ProviderForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import SearchBar from "../../components/SearchBar_CMP";

import { CardContainer, Card, CardDetails, CardText } from "./styles";
import Spinner from "../../components/LoadingSpinner_CMP";

const Providers_PG = () => {
  const history = useHistory();

  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState(useParams().id);
  const [isCreate, setIsCreate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const fetchPageData = () => {
    setIsBadRequest(false);
    setIsLoaded(false);

    const urlParams = { paramList: [["name", "provName"]] };

    let url = `${process.env.REACT_APP_API_URL}/api/provider/list`;
    url += getUrlParams(urlParams);

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

  useEffect(() => {
    fetchPageData();
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

  useEffect(() => {
    providerId && openDrawer();
  });

  const handleProvider = (openProvId) => {
    setProviderId(openProvId);
    history.push(`/c/provider/${openProvId}`);
    openDrawer();
  };

  const hideAndClearCurrentProvider = () => {
    setIsCreate(false);
    setProviderId(null);
    hideDrawer();
  };

  return (
    <>
      <NavBar />
      <Main>
        <CreateButton
          href="/c/provider?action=create"
          text="Criar novo fornecedor"
        />

        <SearchBar handleFetchData={fetchPageData} ignorePagination={true} />

        {isBadRequest ? (
          <h1>{error}</h1>
        ) : !isLoaded ? (
          <Spinner />
        ) : (
          <>
            <CardContainer>
              {providers && (
                <>
                  {providers.map((provider, index) => (
                    <Card
                      key={"Card-" + provider.id}
                      onClick={() => {
                        handleProvider(provider.id);
                      }}
                    >
                      {/* <CardText>Id: {provider.id}</CardText> */}
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
        <ProviderForm
          hideDrawer={hideDrawer}
          refreshData={fetchPageData}
          providerId={providerId}
          isCreate={isCreate}
        />
      </Drawer>
    </>
  );
};

export default Providers_PG;
