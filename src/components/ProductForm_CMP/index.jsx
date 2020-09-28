import { Link, ProductPhoto, SoldNote } from "./styles";
import axios from "axios";
import swal from "sweetalert";
import React, { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../AuthContext";
import { FiExternalLink } from "react-icons/fi";
import Loading from "../MaterialLoading_CMP";
import { useParams, useHistory } from "react-router-dom";

import UrlUtils from "../../controller/url";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  makeStyles,
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "1rem",
      width: "100%",
    },
  },
}));

const ProductForm = ({ isCreate, refreshData }) => {
 
};

export default ProductForm;
