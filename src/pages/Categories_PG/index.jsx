import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUrlParams } from "../../controller/url";
import { useParams, useHistory } from "react-router-dom";
import { FiTag } from "react-icons/fi";

import NavBar, { Main } from "../../components/NavBar_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import Spinner from "../../components/LoadingSpinner_CMP";

import CategoryForm from "../../components/CategoryForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import SearchBar from "../../components/SearchBar_CMP";

import { CardContainer, Card, CardDetails, CardText } from "./styles";

const Categories_PG = () => {
  const history = useHistory();

  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(useParams().id);
  const [isCreate, setIsCreate] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const fetchPageData = () => {
    setIsBadRequest(false);

    const urlParams = { paramList: [["name", "catName"]] };

    let url = `${process.env.REACT_APP_API_URL}/api/category/list`;
    url += getUrlParams(urlParams);

    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        setCategories(resp.data);
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
    if (categoryId) {
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

  const handleCategory = (openCatId) => {
    setCategoryId(openCatId);
    history.push(`/c/category/${openCatId}`);
    openDrawer();
  };

  const hideAndClearCurrentCategory = () => {
    setIsCreate(false);
    setCategoryId(null);
    hideDrawer();
  };

  return (
    <>
      <NavBar />
      <Main>
        <CreateButton
          text="Criar nova categoria"
          href="/c/category?action=create"
        />
        <SearchBar handleFetchData={fetchPageData} ignorePagination={true} />
        {isBadRequest ? (
          <h1>{error}</h1>
        ) : !isLoaded ? (
          <Spinner />
        ) : (
          <>
            <CardContainer>
              {categories && (
                <>
                  {categories.map((category, index) => (
                    <Card
                      onClick={() => {
                        handleCategory(category.id);
                      }}
                      active={category.isActive}
                      key={"Card-" + category.id}
                    >
                      <CardText primary>{category.name}</CardText>
                      <CardDetails>
                        <CardText>
                          {category.isActive == 0 ? (
                            <span>inativo</span>
                          ) : (
                            <span>ativo</span>
                          )}
                          <FiTag />
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
        hide={hideAndClearCurrentCategory}
        closeUrl="/c/category"
      >
        <CategoryForm
          hideDrawer={hideAndClearCurrentCategory}
          refreshData={fetchPageData}
          categoryId={categoryId}
          isCreate={isCreate}
        />
      </Drawer>
    </>
  );
};

export default Categories_PG;
