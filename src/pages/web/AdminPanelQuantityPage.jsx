import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { emptyEditList, getAllProducts, setBufferList } from '../../store/actions/productAtions';
import Table from '../../components//tables/QuantitiesTable';
import { Prompt } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button} from '@material-ui/core';
import productAxios from '../../api/productAxios';

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  TableContainer: {
    width: '100%',
    margin: `${theme.spacing(5)}px auto 0`
  },
  table: {
    width: '100%',
    marginTop: theme.spacing(4)
  },
  
}))


const AdminPanelQuantityPage = () => {
  const classes = useStyle()

  //getting necessary state from redux
  const {productsList: products, editCellsList, editCellsListBuffer: buffer} = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())

    return () => dispatch(emptyEditList())
  }, [])
  
  useEffect(() => {
    if(products.length > 0){
      /*
        make a buffer list from product to store each product's "id", "price", "inventory" 
        and editability state to handle editing mode on price and invetory cells
      */
      const buffer = {}
      products.forEach(product => (buffer[product.id] = {
        id: product.id, 
        isPriceEditable: false, 
        isInventoryEditable: false, 
        price: product.price || 0, 
        inventory: product.inventory || 0
      }))
      dispatch(setBufferList(buffer))
    }
  }, [products])


  const handleSave = () => {
    //make a list from products which one of it's price or inventory field has editable tag
    const changes = []
    products.forEach(product => {
        if( buffer[product.id]['isPriceEditable'] || buffer[product.id]['isInventoryEditable']){
            const {price, inventory} = buffer[product.id]
            console.log(price);
            changes.push({...product, price: Number(price), inventory: Number(inventory)})
        }
    })

    //do api call for updating products
    Promise.all(changes.map(product => productAxios.put(`/${product.id}`, product)
    .catch(err => null)
    )).then(res => {
      console.log(res)
      dispatch(getAllProducts())
      dispatch(emptyEditList())
    })

  }
    return (
        <div className={classes.root}>
            <Prompt
                when={editCellsList.length}
                message='تغییرات شما ذخیره نشده است. مطمئن هستید که صفحه را ترک می کنید؟'
            />
            <Typography variant="h4" component='h2'>
                مدیریت موجودی و قیمت ها
            </Typography>
            <Button variant='contained' color='primary' disabled={!editCellsList.length} onClick={handleSave}>ذخیره</Button>
            <div className={classes.table}>
              <Table />
            </div>
        </div>
    )
}

export default AdminPanelQuantityPage
