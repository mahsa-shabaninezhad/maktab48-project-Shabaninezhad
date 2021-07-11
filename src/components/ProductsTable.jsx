import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, 
TableRow, TableFooter, Paper, TablePagination,Avatar} from '@material-ui/core';
import Pagination from './Pagination';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { selectProductToDelete, startEditAProduct } from '../store/actions/productAtions';
import { openModal } from '../store/actions/modalActions';
import AddOrEditProductModal from './modals/AddOrEditProductModal';
import DeleteModal from './modals/DeleteModal';

//Styles
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 650,
    borderColor: "#90E0EF",
    borderColor:  theme.palette.info.light
  },
  table__row: {
    '&:hover': {
      backgroundColor: `${theme.palette.action.selected} !important`,
      
    }
  },
  image: {
    width: '50px',
    objectFit: 'contain'
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



const ProductsTable = ({data, headers}) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const handleEditAProduct = (product) => {
    dispatch(startEditAProduct(product))
    dispatch(openModal(<AddOrEditProductModal/>,'افزودن/ویرایش کالا'))
  }

  const handleDeleteAProduct = (product) => {
    dispatch(selectProductToDelete(product))
    dispatch(openModal(<DeleteModal/>))
  }


  return (
    <Paper className={classes.root} elevation={2}>
        <TableContainer>
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
                  ?data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                  :data
                  ).map((product, index) => {
                    // console.log(product);
                    return (
                  <StyledTableRow className={classes.table__row} key={product.id}>
                    <TableCell><img className={classes.image} src={product.image}/></TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>{[product.category,product.brand].join('/')}</TableCell>
                    <TableCell>
                      <Icon component={EditIcon} color='green' onClick={() => handleEditAProduct(product)}/>
                      <Icon component={DeleteIcon} color='red' onClick={() => handleDeleteAProduct(product)}/>
                    </TableCell>
                  </StyledTableRow>
                )})}
              
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
                  count={data.length}
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
        </TableContainer>
    </Paper>
  );
} 
 
export default ProductsTable