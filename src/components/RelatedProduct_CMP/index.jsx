import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 250,
    marginTop: "2rem",
  },
});

const RelatedProductsTable = ({ products }) => {
  const classes = useStyles();

  if (products.length > 0) {
    return (
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h6>Produtos relacionados</h6>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && (
              <>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`/p/detail/${product.id}`}
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          fontWeight: "normal",
                        }}
                      >
                        <p>{product.name}</p>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <></>;
};

export default RelatedProductsTable;
