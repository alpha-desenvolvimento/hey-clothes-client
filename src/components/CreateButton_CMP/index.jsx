import React from "react";

import Fab from "@material-ui/core/Fab";
import { FiPlus } from "react-icons/fi";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { mediaQuery } from "../../styles/global";

const CreateButton = ({ href, variant, text }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: "0 2px 6px 0 hsla(0, 0%, 0%, 0.2)",
      transition: "all 200ms ease-in-out",
      cursor: "pointer",
      backgroundColor: theme.palette.success.main,
      color: "white",
      position: "fixed",
      zIndex: 500,
      bottom: "9rem",
      right: "1rem",

      "&:hover": {
        backgroundColor: theme.palette.success.light,
        boxShadow: "0 4px 10px 0 hsla(0, 0%, 0%, 0.4)",
      },
      [mediaQuery[0]]: {
        bottom: "1rem",
        right: "1rem",
      },
    },
    displayText: {
      display: "none",
      [mediaQuery[0]]: {
        display: "unset",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Fab href={href} variant={variant || "extended"} className={classes.root}>
      <FiPlus />
      <span className={classes.displayText}>{text || ""}</span>
    </Fab>
  );
};

export default CreateButton;
