import React from "react";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

// import HerokuServer from "../../API/HerokuServer";

import { Button } from "./styles";

const CreateButton = ({ dest, openDrawer, setIsCreate }) => {
  const history = useHistory();

  function handleClick() {
    console.log(dest);
    history.push(dest);
    setIsCreate(true, openDrawer());
  }

  return (
    <>
      <Button onClick={handleClick} className="h5-font-size">
        <FiPlus />
      </Button>
    </>
  );
};

export default CreateButton;
