import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead,
TableRow, TableFooter, Paper, TablePagination, Link} from '@material-ui/core';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/actions/modalActions';
import OrdersModal from '../modals/OrdersModal';


//Styles
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 650,
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

const headers = ["نام کاربر", "مجموع مبلغ (تومان)", "زمان ثبت سفارش", " "]

const OrdersTable = (props) => {
  const classes = useStyles();
  //----------------------------------------------------------------------
  //-------------------------REDUX----------------------------------------
  //----------------------------------------------------------------------

  const dispatch = useDispatch()
  //geting state from redux
  const orders = useSelector(state => state.orders.ordersList)
  //----------------------------------------------------------------------
  //-------------------------PAGINATION-----------------------------------
  //----------------------------------------------------------------------
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPrice = (cart) => {
    const total = cart.map(order => order.price*order.number)?.reduce((sum, price) => sum + price,0)
    return total.toLocaleString()
  }
  
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
                    <TableCell>{`${order.firstName} ${order.lastName}`}</TableCell>
                    <TableCell >{totalPrice(order.cart)}</TableCell>
                    <TableCell >
                      {order.orderTime}
                    </TableCell>
                    <TableCell >
                      <Link style={{cursor: 'pointer'}} color='secondary' onClick={() => dispatch(openModal(<OrdersModal data={order}/>, 'نمایش سفارش'))}>بررسی سفارش</Link>
                    </TableCell>
                  </StyledTableRow>
                )}
              
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, { label: 'همه', value: -1 }]}
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
 
export default OrdersTable