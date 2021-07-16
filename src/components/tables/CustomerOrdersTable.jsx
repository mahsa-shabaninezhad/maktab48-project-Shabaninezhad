import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, InputBase,
TableRow, TableFooter, Paper, TablePagination, Typography, Link} from '@material-ui/core';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { addACellToEditList, applyCellEditingMode, cancelEditACell, deleteACellFromEditList, editACell } from '../../store/actions/productAtions';
import { openModal } from '../../store/actions/modalActions';
import OrdersModal from '../modals/OrdersModal';


//Styles
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 300,
  },
  table__row: {
    '&:hover': {
      backgroundColor: `${theme.palette.action.selected} !important`,
    }
  },
  input: {
    '&:not(:read-only)': {
      boxShadow: theme.shadows[2],
      height: '100%',
      padding: theme.spacing(1)
    },
    
  }
}));

//Styling odd rows differently
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
  },
})
)(TableRow);

const headers = ["کالا", "قیمت","تعداد"]

const CustomerOrdersTable = ({orders}) => {
  const classes = useStyles();
  //----------------------------------------------------------------------
  //-------------------------PAGINATION-----------------------------------
  //----------------------------------------------------------------------
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <Paper className={classes.root} elevation={2}>
        {orders && <TableContainer>
            <Table  aria-label="sticky table" className={classes.table}>
              <TableHead>
                <TableRow>
                    {
                      headers.map(header => <TableCell>{header}</TableCell>)
                    }
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ?orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                  :orders
                  ).map((order) => <StyledTableRow className={classes.table__row} key={order.id}>
                    <TableCell>{order.productName}</TableCell>
                    <TableCell >{order.price}</TableCell>
                    <TableCell >
                      {order.number}
                    </TableCell>
                  </StyledTableRow>
                )}
              </TableBody>
              <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>}
    </Paper>
  );
} 
 
export default CustomerOrdersTable