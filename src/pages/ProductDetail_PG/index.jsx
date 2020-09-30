import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { useParams, NavLink } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

import { NavBar, Main, ProductForm, Loading } from "../../components";

const CantFind = ({ text, thing, link }) => {
  return (
    <Box>
      <h5>Erro ao carregar a página.</h5>
      <p>
        {text
          ? text
          : `Isso pode ter ocorrido por instabilidade do servidor ou por não
        existirem ${thing} no sistema, verifique e tente novamente.`}
      </p>

      {link && (
        <p>
          <NavLink to={link}>
            Acessar página de {thing} <FiExternalLink />{" "}
          </NavLink>
        </p>
      )}
    </Box>
  );
};

const ProductDetail_PG = () => {
  const [isCreate, setIsCreate] = useState(false);

  const [prodId, setProdID] = useState(useParams().id);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isMissingProduct, setIsMissingProduct] = useState(false);

  const fetchAndSetData = async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category/list`)
      .then((resp) => {
        if (resp.data.length <= 0) return;

        const recievedCategories = [];

        for (const category of resp.data) {
          if (category.isActive == 0) continue;

          recievedCategories.push(category);
        }

        recievedCategories[0].selected = true;

        setCategories(recievedCategories);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/provider/list`)
      .then((resp) => {
        if (resp.data.length <= 0) return;

        const recievedProviders = [];

        for (const provider of resp.data) {
          if (provider.isActive == 0) continue;

          if (currentProduct) {
            if (currentProduct.provider == provider.id) provider.select = true;
          }
          recievedProviders.push(provider);
        }

        recievedProviders[0].selected = true;

        setProviders(recievedProviders);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/conditions/list`)
      .then((resp) => {
        if (resp.data.length <= 0) return;

        console.log(resp);

        const recievedConditions = [];

        for (const condition of resp.data) {
          if (condition.isActive == 0) continue;

          if (currentProduct) {
            if (currentProduct.condition == condition.id)
              condition.select = true;
          }
          recievedConditions.push(condition);
        }

        recievedConditions[0].selected = true;

        setConditions(recievedConditions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAndSetData();

    if (window.location.pathname == "/p/create") {
      setIsCreate(true);
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        Brand: "",
        imgA: "",
        imgB: "",
        imgC: "",
        imgD: "",
        // condition: 1, category: 1, provider: 1,
      });
      setIsLoading(false);
    } else {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const action = urlParams.get("action");
      setIsLoading(true);
      // const { action } = UrlUtils.getUrlParamsValues();

      if (action == "create") {
        setCurrentProduct({
          name: "",
          description: "",
          price: "",
          Brand: "",
          // category: 'asdasdasdasds',
          imgA: "",
          imgB: "",
          imgC: "",
          imgD: "",
          // provider: false,
          // condition: false,
        });
      } else {
        let url = `${process.env.REACT_APP_API_URL}/api/products/${prodId}`;

        axios.get(url).then((resp) => {
          
          if (resp.data) {
            setCurrentProduct(resp.data);
          } else {
            setIsMissingProduct(true);
          }

          setIsLoading(false);
        });
      }
    }
  }, [prodId]);

  return (
    <>
      <NavBar />
      <Main>
        {isLoading ? (
          <Box height="80vh">
            <Loading />
          </Box>
        ) : categories.lenght < 0 ? (
          <CantFind thing="categorias" link="/c/category" />
        ) : providers.lenght < 0 ? (
          <CantFind thing="fornecedores" link="/c/provider" />
        ) : conditions.lenght < 0 ? (
          <CantFind thing="Condições" link="/c/condition" />
        ) : isMissingProduct ? (
          <CantFind text="Produto não localizado" />
        ) : (
          <ProductForm
            isCreate={isCreate}
            currentProduct={currentProduct}
            categories={categories}
            providers={providers}
            conditions={conditions}
            setIsCreate={setIsCreate}
            setCurrentProduct={setCurrentProduct}
          />
        )}
      </Main>
    </>
  );
};

export default ProductDetail_PG;
