import React from "react";
import { useHistory, Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

// import HerokuServer from "../../API/HerokuServer";

import { Button } from "./styles";

const CreateButton = ({ dest, onClick, ...rest }) => {
  const history = useHistory();

  function handleClick() {
    if (dest) history.push(dest);
  }

  if (dest)
    return (
      <>
        <Button
          onClick={onClick}
          className="h5-font-size"
          aria-label="Criar novo"
          title="Criar novo"
        >
          <FiPlus />
        </Button>
      </>
    );
  return (
    <>
      <Button
        onClick={onClick}
        className="h5-font-size"
        aria-label="Criar novo"
        title="Criar novo"
      >
        <FiPlus />
      </Button>
    </>
  );
};

export default CreateButton;
