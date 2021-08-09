import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 200,
        height: 200,
        color: theme.palette.error.main
    }
}))

const FailedPayment = () => {
    const classes = useStyles()
    const history = useHistory()
    
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <CancelIcon className={classes.icon}/>
                <p>پرداخت موفقیت آمیز نبود. سفارش شما در انتظار پرداخت است.</p>
            </div>
            <Button variant='contained' color='secondary' onClick={() => history.push('/')}>بازگشت به سایت</Button>
        </div>
    )
}

export default FailedPayment
