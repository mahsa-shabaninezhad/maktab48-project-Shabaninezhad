import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import ordersAxios from '../api/ordersAxios'
import { PaymentContext } from '../context/paymentContext/PaymentContext'
import pay from '../assets/images/Mellat1.jpg'
import { BasketContext } from '../context/BasketContext/BasketContext'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent:'center'
    },
    btnsContainer:{
        display: 'flex',
        justifyContent: 'center'
    },
    cancelBtn: {
        color: '#fff',
        backgroundColor: theme.palette.error.main,
        '&:hover':{
            backgroundColor: `theme.palette.error.main !important`,
            
        }
    },
    payBtn: {
        color: '#fff',
        backgroundColor: theme.palette.success.main,
    },
    image: {
        width: '100%',
        height: 'auto',
    }
}))


const PaymentPage = () => {
    const classes = useStyles()
    const history = useHistory()
    const {payInfo} = useContext(PaymentContext)
    const {state, emptyBasket} = useContext(BasketContext)

    const successfulPayment = () => {
        ordersAxios.post('', payInfo)
        .then((res) => {
            history.push(`/payment/successful/${res.data.id}`)
            emptyBasket()
        })
        .catch(err => {
            history.push('/payment/failed')
        })
    }

    //increase inventory because canceling payment
    const failedPayment = () => {
        Promise.all(state.items.map(item => axios.get(`http://localhost:5000/products/${item.productId}`)))
        .then(res =>res.forEach(({data}) => {
            const order = state.items.find(item => item.productId === data.id)
            axios.put(`http://localhost:5000/products/${data.id}`, {...data, inventory: data.inventory + order.number})
        }))
        history.push(`/payment/failed`)
    }

    return (
        <div className={classes.root}>
            <img src={pay} className={classes.image}/>
            <div className={classes.btnsContainer}>
                <Button className={classes.cancelBtn} variant='contained' onClick={failedPayment}>انصراف</Button>
                <Button className={classes.payBtn} variant='contained' onClick={successfulPayment}>پرداخت</Button>

            </div>
        </div>
    )
}

export default PaymentPage
