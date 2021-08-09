import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
        color: theme.palette.success.main
    }
}))

const SuccessfulPayment = () => {
    const classes = useStyles()
    const history = useHistory()
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <CheckCircleIcon className={classes.icon}/>
                <p>باتشکر از پرداخت شما.
                سفارش شما با موفقیت ثبت شد و
                جهت هماهنگی ارسال با شما تماس گرفته خواهد شد.
                </p>
            </div>
            <Button variant='contained' color='secondary' onClick={() => history.push('/')}>بازگشت به سایت</Button>
        </div>
    )
}

export default SuccessfulPayment