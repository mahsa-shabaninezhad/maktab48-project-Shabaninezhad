import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Table from '../tables/CustomerOrdersTable'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeDeliveryStatus } from '../../store/actions/ordersAction'

const useStyle = makeStyles(theme => ({
    root: {
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        "& > *:not(:last-child)": {
            marginBottom: theme.spacing(2)
        },
        '@media screen and (max-width: 500px)': {
            width: '250px'
        }
    },
    ul: {
        width: '100%',
        listStyle: 'none',
        padding: 0,
        alignSelf: 'flex-start',
        marginTop: 0,
        '& li': {
            margin: '8px 0'
        }
    }
}))

const OrdersModal = ({data}) => {
    const classes = useStyle()
    const dispatch = useDispatch()

    return (
        <div className={classes.root}>
            <ul className={classes.ul}>
                <li>نام مشتری: {data.name}</li>
                <li>آدرس: {data.address}</li>
                <li>تلفن: {data.phone}</li>
                <li>زمان تحویل: {data.deliveryTime}</li>
                <li>زمان سفارش: {data.orderTime}</li>
            </ul>
            <Table orders={data.card}/>
            {data.deliveryStatus === 'delivered' ? <p>زمان تحویل: {data.deliveryTime}</p> : <Button variant='contained' color='primary' onClick={() => dispatch(changeDeliveryStatus(data.id, {...data, deliveryStatus: "delivered"}))}>تحویل شد</Button>}
        </div>
    )
}

export default OrdersModal
