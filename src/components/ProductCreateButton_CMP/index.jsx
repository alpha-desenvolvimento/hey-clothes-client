import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import HerokuServer from "../../API/HerokuServer";

import { Button } from "./styles";

const ProductCreateButton = () => {
  const history = useHistory();

  function handleClick() {
    history.push("/p?action=create");
  }

  return (
    <>
      <Button onClick={handleClick} className="h5-font-size">
        <FiPlus />
      </Button>
    </>
  );
};

export default ProductCreateButton;
