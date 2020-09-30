import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUrlParams } from "../../controller/url";
import { useParams, useHistory } from "react-router-dom";
import { FiTag } from "react-icons/fi";

import NavBar, { Main } from "../../components/NavBar_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import Spinner from "../../components/LoadingSpinner_CMP";

import ConditionForm from "../../components/ConditionForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import SearchBar from "../../components/SearchBar_CMP";

import { CardContainer, Card, CardDetails, CardText } from "./styles";

const Condition_PG = () => {
  const history = useHistory();

  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [conditions, setCondition] = useState([]);
  const [conditionId, setConditionId] = useState(useParams().id);
  const [isCreate, setIsCreate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const fetchPageData = () => {
    setIsBadRequest(false);

    const urlParams = { paramList: [["name", "name"]] };

    let url = `${process.env.REACT_APP_API_URL}/api/conditions/list`;
    url += getUrlParams(urlParams);

    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        setCondition(resp.data);
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
    if (conditionId) {
      openDrawer();
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const action = urlParams.get("action");

      console.log(action);

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

  const handleCondition = (openCatId) => {
    setConditionId(openCatId);
    history.push(`/c/condition/${openCatId}`);
    openDrawer();
  };

  const hideAndClearCurrentCondition = () => {
    setIsCreate(false);
    setConditionId(null);
    hideDrawer();
  };

  return (
    <>
      <NavBar />
      <Main>
        <CreateButton
          text="Criar nova condição de produto"
          href="/c/condition?action=create"
        />
        <SearchBar handleFetchData={fetchPageData} ignorePagination={true} />
        {isBadRequest ? (
          <h1>{error}</h1>
        ) : !isLoaded ? (
          <Spinner />
        ) : (
          <>
            <CardContainer>
              {conditions && (
                <>
                  {conditions.map((condition, index) => (
                    <Card
                      onClick={() => {
                        handleCondition(condition.id);
                      }}
                      active={condition.isActive}
                      key={"Card-" + condition.id}
                    >
                      <CardText primary>{condition.name}</CardText>
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
        hide={hideAndClearCurrentCondition}
        closeUrl="/c/condition"
      >
        <ConditionForm
          hideDrawer={hideAndClearCurrentCondition}
          refreshData={fetchPageData}
          conditionId={conditionId}
          isCreate={isCreate}
        />
      </Drawer>
    </>
  );
};

export default Condition_PG;
