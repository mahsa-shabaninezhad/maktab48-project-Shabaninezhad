import React, { useEffect } from 'react'
import { Button, makeStyles, Typography  } from '@material-ui/core';
import Table from '../../components/ProductsTable'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/actions/productAtions';
import { openModal } from '../../store/actions/modalActions';
import AddOrEditProductModal from '../../components/modals/AddOrEditProductModal';
import Loading from '../../components/Loading'

const useStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  table: {
    width: '100%',
    height: '400px',
    margin: `${theme.spacing(5)}px auto 0`
  },
  
}))


const AdminPanelProductPage = (props) => {
  const classes = useStyle()
  
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.productsList)

  const isLoading = useSelector(state => state.loading.isLoading)

  useEffect(() => {
    dispatch(getAllProducts())
    
  }, [])


  return (
    <div className={classes.root}>
      <Typography variant="h4" component='h2'>
        مدیریت کالاها
      </Typography>
      <Button variant='contained' color='primary' onClick={() => dispatch(openModal(<AddOrEditProductModal/>,'افزودن/ویرایش کالا'))}>افزودن کالا</Button>
      {
        isLoading?
        <Loading isLoading={isLoading}/>
        :<div className={classes.table}>
          <Table 
            data={products} 
            headers={["تصویر", "نام کالا", "دسته بندی", " "]} 
          />
        </div>
      }
      
    </div>
  )
}

export default AdminPanelProductPage
