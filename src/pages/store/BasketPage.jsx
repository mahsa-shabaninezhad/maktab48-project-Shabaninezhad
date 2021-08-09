import { makeStyles } from '@material-ui/core'
import { Button, Box, Grid, Typography} from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import BasketCard from '../../components/BasketCard'
import clsx from 'clsx'
import { BasketContext } from '../../context/BasketContext/BasketContext'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'
import productAxios from '../../api/productAxios'
import axios from 'axios'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '2rem 0',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    empty:{
        textAlign: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(5),
        '@media screen and (max-width: 600px)': {
            justifyContent: 'center',
        }
    },
    total: {
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
    },
    btn: {
        marginTop: theme.spacing(2)
    },
}))

const BasketPage = props => {
    const classes = useStyles()
    const {state, isLoading, changeNumberOfOrder, deleteAllProductOfOneTypeFromCart} = useContext(BasketContext)
    const history = useHistory()

    const calculateTotalPrice = () => {
        const totalPrice = state.items.reduce((total, item) => total + item.product.price*item.number, 0)
        return totalPrice.toLocaleString('ar-EG')
    }  

    const handlePayment = () => {
        //check inventory of all the item in basket before redirect to payment 
        Promise.all(
            state.items.map(item => productAxios.get(`/${item.productId}`))
        ).then(res => {
            // for cheking if basket is empty because product not available and do not change the route
            let numberOfItemInBasket = 0

            res.forEach(({data}) => {
                //find each product in basket for comparing wanted number with inventory
                const order = state.items.find(item => item.productId === data.id)
                
                //a) inventory >= wanted number ==> nothing change
                if (data.inventory >= order.number) {
                    axios.put(`http://localhost:5000/products/${data.id}`, {...data, inventory: data.inventory - order.number })
                    numberOfItemInBasket += order.number
                    
                //b) inventory is zero before user pay  ==> product remove form basket and alarm user
                } else if(data.inventory === 0){
                    toast.error(`متاسفانه موجودی ${data.title} به اتمام رسیده است.`)
                    deleteAllProductOfOneTypeFromCart(data.id)

                //c) inventory is less than what user wanted before paying  ==> product decrease to inventory amount and alarm user
                }else {
                    toast.warning(`با عرض پوزش به علت کم بودن موجودی ${data.title}، سفارش شما به ${data.inventory} عدد کاهش یافت.'`)
                    changeNumberOfOrder(data.id, data.inventory, order.number-data.inventory)
                    axios.put(`http://localhost:5000/products/${data.id}`, {...data, inventory: 0 })
                    numberOfItemInBasket += data.inventory
                }
            })
            
            numberOfItemInBasket && history.push('/checkout')

        })
        
    }
    
    return (
        <>
            <Loading isLoading={isLoading}/>
            <Grid container className={clsx(classes.root, {[classes.empty]: !state.items.length})}>
                {
                    state.items.length>0 ?
                    <Grid item md={7} xs={11}>
                        {state.items.map(item =>  <BasketCard product={item.product} number={item.number} inventory={item.inventory}/>)}
                    </Grid>
                    :<p>سبد خرید شما خالی است.</p>
                }
                <Grid item lg={3} md={4} sm={6} xs={11} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '16px', borderRadius: '20px', border:'1px solid #DADAD9'}}>
                    <Typography className={classes.total}>جمع سبد خرید <Box component='span'>{calculateTotalPrice()} تومان</Box></Typography>
                    <Button 
                        className={classes.btn} 
                        variant='contained' 
                        color='secondary' 
                        onClick={handlePayment}
                        disabled={!state.items.length}
                    >
                        نهایی کردن خرید
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default BasketPage
