import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, InputBase,
TableRow, TableFooter, Paper, TablePagination, Typography} from '@material-ui/core';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { addACellToEditList, applyCellEditingMode, cancelEditACell, deleteACellFromEditList, editACell } from '../../store/actions/productAtions';


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

const headers = ['کالا','قیمت (تومان)','موجودی']

const QuantitiesTable = (props) => {
  const classes = useStyles();
  //----------------------------------------------------------------------
  //-------------------------REDUX----------------------------------------
  //----------------------------------------------------------------------

  const dispatch = useDispatch()
  //geting state from redux
  const {productsList:products, editCellsListBuffer: buffer} = useSelector(state => state.products)

  //----------------------------------------------------------------------
  //-------------------------PAGINATION-----------------------------------
  //----------------------------------------------------------------------
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  //----------------------------------------------------------------------
  //-------------------------TABLE-CELL-FUNCTIONALITY---------------------
  //----------------------------------------------------------------------    

  //triger editing mode when user double click on a "price cell" or "inventory cell"
  const handleActiveEditingMode = (e, field, product) => {
    console.log('doble clicked');
    const editablePart = field === 'price'? 'isPriceEditable' : 'isInventoryEditable'
    const newCell = {...buffer[product.id], [editablePart]: true}
    dispatch(applyCellEditingMode(product.id, newCell))

    //prevent adding item when a cell is in a edit mode and user double click on it(it was added before) 
    if(buffer[product.id][editablePart] === false){
      //add cell id to edit list
      dispatch(addACellToEditList(product.id))
    }
                                      

  }

  const handleCanselEditingMode = (e, field, product) => {
    //editing mode will be cancel on "esc" press
    const editedPart = field === 'price'? 'isPriceEditable' : 'isInventoryEditable'
    const prevCell = {...buffer[product.id], [editedPart]: false, [field]: product[field]}
    if(e.keyCode === 27){
      dispatch(cancelEditACell(product.id, prevCell))
      //remove cell id from edit list
      dispatch(deleteACellFromEditList(product.id))
    }
  }

  const handleSaveNewValue = (e, field, id) => {
    //field can be "price" or "inventory" 
    const newValue = e.target.value
    const newCell = {...buffer[id], [field]: newValue }
    //store new value when input lose its focus
    dispatch(editACell(id, newCell))
  }
  
  return (
    <Paper className={classes.root} elevation={2}>
        {<TableContainer>
            <Table  aria-label="sticky table" className={classes.table}>
              <TableHead>
                <TableRow>
                    {
                      headers.map(header => <TableCell>{header}</TableCell>)
                    }
                </TableRow>
              </TableHead>
              <TableBody>
                {buffer && (rowsPerPage > 0 
                  ?products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                  :products
                  ).map((product) => {
                    return (
                  <StyledTableRow className={classes.table__row} key={product.id}>
                    <TableCell>{product.model}</TableCell>
                    <TableCell onDoubleClick={(e) => handleActiveEditingMode(e, 'price', product)}>
                      {!buffer[product.id]?.isPriceEditable
                      ?<Typography>{(product.price)?.toLocaleString() || 0}</Typography>
                      :<InputBase 
                        classes={{input: classes.input}}
                        type='number' 
                        defaultValue={product.price || 0} 
                        onKeyDown={e => handleCanselEditingMode(e, 'price', product)}
                        onBlur={e => handleSaveNewValue(e, 'price', product.id)}
                        autoFocus
                        onFocus={e => e.target.select()}
                        />}
                    </TableCell>
                    <TableCell onDoubleClick={(e) => handleActiveEditingMode(e, 'inventory', product)}>
                      {!buffer[product.id]?.isInventoryEditable
                      ?<Typography>{(product.inventory)?.toLocaleString() || 0}</Typography>
                      :<InputBase 
                        classes={{input: classes.input}}
                        type='number' 
                        defaultValue={product.inventory || 0} 
                        onKeyDown={e => handleCanselEditingMode(e, 'inventory', product)}
                        onBlur={e => handleSaveNewValue(e, 'inventory', product.id)}
                        autoFocus
                        onFocus={e => e.target.select()}
                      />}
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
                  count={products.length}
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
 
export default QuantitiesTable