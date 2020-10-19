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


let prods = []
const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

function createData(name, price) {
  return { name, price};
}



const BasicTable = ({categoryId,isCreate}) => {
  const classes = useStyles();
  const [currentCategory, setCurrentCategory] = useState(true);
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
        console.log(resp.data.products)
        // resp.header. TODO coloda o erro que vem no header
        setCurrentCategory(resp.data)
        prods = resp.data.products
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
            {prods && (
                <>
          {prods.map(product => (
            <TableRow key={product.name}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              {/* <TableCell align="right">{product.price}</TableCell> */}
              
            </TableRow>
          ))
            }
          </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );


}



export default BasicTable;