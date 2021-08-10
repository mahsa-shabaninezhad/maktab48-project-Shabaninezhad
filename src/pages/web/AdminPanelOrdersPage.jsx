import React, { useEffect, useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, Typography  } from '@material-ui/core';
import Table from '../../components/tables/OrdersTable'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, setOrdersStatus } from '../../store/actions/ordersAction';
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
  form: {
    flexDirection: 'row'
  },
  table: {
    width: '100%',
    height: '400px',
    margin: `${theme.spacing(5)}px auto 0`
  },
  
}))

const AdminPanelOrdersPage = () => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const ordersStatus = useSelector(state => state.orders.ordersStatus)
  const isLoading = useSelector(state => state.loading.isLoading)

  console.log(ordersStatus);
  useEffect(() => {
    dispatch(getOrders())
  }, [ordersStatus])

  return (
      <div className={classes.root}>
          <Typography variant="h4" component='h2'>
            مدیریت سفارش ها
          </Typography>
          <FormControl component="fieldset" >
              <RadioGroup 
                  aria-label="gender" 
                  name="gender1" 
                  className={classes.form}
                  value={ordersStatus} 
                  onChange={e => dispatch(setOrdersStatus(e.target.value))}
              >
                <FormControlLabel value="delivered" control={<Radio />} label="سفارش های ارسال شده" />
                <FormControlLabel value="waiting" control={<Radio />} label="سفارش های در انتظار ارسال " />
              </RadioGroup>
          </FormControl>
          {
            isLoading?
            <Loading isLoading={isLoading} />
            :<div className={classes.table}>
              <Table />
            </div>
          }
    
      </div>
  )
}

export default AdminPanelOrdersPage
