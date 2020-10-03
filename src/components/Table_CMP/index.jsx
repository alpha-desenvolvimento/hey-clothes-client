import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from "axios";
import { getUrlParams } from "../../controller/url";
import { useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const BasicTable = ({categoryId,isCreate}) => {
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentProducts, setCurrentProducts] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);
  const [checked, setChecked] = useState(true);
  const [allowDelete, setAllowDelete] = useState(false);

  const fetchAndSetData = () => {
    setIsLoadingCategory(true);

    let url = `${process.env.REACT_APP_API_URL}/api/category/${categoryId}`;
    axios
      .get(url)
      .then((resp) => {
        console.log("resp", resp);
        // resp.header. TODO coloda o erro que vem no header
        setCurrentCategory(resp.data);
        setCurrentProducts(currentCategory.products);
        console.log(currentCategory)
        setChecked(resp.data.isActive == 1);
        // setAllowDelete(!resp.data.hasProduct);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingCategory(false);
      });
      
    }
      useEffect(() => {
        if (isCreate) {
          setCurrentProducts({
            name: "",
            isActive: 1,
          });
          setChecked(true);
        } else {
            fetchAndSetData();
        }
      }, []);
      
      let products = Array.from(currentProducts)
      console.log(products)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.name}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.name}</TableCell>
              <TableCell >{product.price}</TableCell>
              
            </TableRow>
          ))
          
          }
        </TableBody>
      </Table>
    </TableContainer>
  );


}

export default BasicTable;