import React, { useState, useEffect } from "react";
import NavBar, { Main } from "../../components/NavBar_CMP";
import Drawer, { useDrawerUtils } from "../../components/Drawer_CMP";
import { useParams, useHistory } from "react-router-dom";
import { FiEdit, FiTag } from "react-icons/fi";

import HerokuServer from "../../API/HerokuServer";

import CategoryForm from "../../components/CategoryForm_CMP";
import CreateButton from "../../components/CreateButton_CMP";
import SearchBar from "../../components/SearchBar_CMP";

import { Table } from "./styles";

const Providers_PG = () => {
  //TODO REFATORAR ESSE COMPONENTE INTEIRO, ELE AINDA É UMA COPIA DE CATEGORIES_PG
  const [isOpen, hideDrawer, openDrawer] = useDrawerUtils();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(useParams().id);
  const [actionExecuted, setActionExecuted] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (categoryId) {
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
        //       HerokuServer.Category.list({ ...params }).then((resp) => {
        //         console.log("resp", resp);
        //         setCategorys(resp);
        //       });
        //       break;
        default:
          HerokuServer.Category.list().then((resp) => {
            console.log("resp", resp);
            setCategories(resp);
          });
      }
    }
  }, [isOpen]);

  const hideAndClearCurrentCategory = () => {
    setCategoryId(null);
    hideDrawer();
  };

  return (
    <>
      <NavBar />
      <Main>
        <CreateButton dest="/c?action=create" />
        <SearchBar />
        <Table>
          <tr>
            <th className="h3-font-size">Fornecedor</th>
            <th className="h3-font-size">Telefone</th>
          </tr>
          {categories && (
            <>
              {categories.map((category, index) => (
                <tr className="h5-font-size" key={category.id}>
                  <td>
                    <span className="h6-font-size">{`${index} - ${category.id}. `}</span>
                    {category.desc}
                    <FiEdit
                      className="icon p-font-size"
                      onClick={() => {
                        history.push(`/c/${category.id}`);
                        window.location.reload(false);
                      }}
                    />
                  </td>
                  <td>
                    {category.active ? (
                      <>
                        <FiTag style={{ color: "green" }} /> Ativo
                      </>
                    ) : (
                      <>
                        <FiTag style={{ color: "red" }} /> Inativo
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </Table>
      </Main>

      <Drawer isOpen={isOpen} hide={hideAndClearCurrentCategory} closeUrl="/c">
        <CategoryForm categoryId={categoryId} isCreate={isCreate} />
      </Drawer>
    </>
  );
};

export default Providers_PG;
