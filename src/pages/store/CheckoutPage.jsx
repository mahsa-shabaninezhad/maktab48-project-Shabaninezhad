import React, { useContext, useState, useRef } from 'react'
import Form from '../../components/Form'
import { Typography, Button, TextField, Paper } from '@material-ui/core';
import useForm from '../../hooks/useForm';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory} from 'react-router-dom';
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { PaymentContext } from '../../context/paymentContext/PaymentContext';
import { BasketContext } from '../../context/BasketContext/BasketContext';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%', 
        padding: theme.spacing(2)
    },
    formContainer: {
        maxWidth: '500px',
        display: 'flex',
        height: 'min-content',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2rem auto',
        padding: '2rem',
    },
    datePicker:{
        '& $textPrimary':{
            color: `${theme.palette.secondary.light} !important`
        }
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });



const CheckoutPage = () => {
    const classes = useStyles()
    const history = useHistory()
    const [selectedDate, handleDateChange] = useState(moment());
    const {setPayInfo} = useContext(PaymentContext)
    const {state} = useContext(BasketContext)
    
    const initialValues = {
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
    }
    const validations = {
        firstName: {
            required: {
                value: true,
                message: 'نام الزامی می باشد.'
            }
        },
        lastName: {
            required: {
                value: true,
                message: 'نام خانوادگی الزامی می باشد.'
            }
        },
        address:{
            required: {
                value: true,
                message: 'آدرس الزامی می باشد.'
            }
        },
        phone:{
            required: {
                value: true,
                message: 'تلفن جهت هماهنگی ارسال الزامی می باشد.'
            },
            pattern:  {
                value:  /^(09)+\d{9}$/,
                message: 'لطفا تلفن را صحیح وارد نمایید.'
            }
        },
        
    }

    const addBasketInformationToPayInfo = () => {
        return state.items.map(item =>{ 
            return({
                productId: item.productId, 
                number: item.number,
                productName: item.product.model,
                price: item.product.price,
            })
        })
    }

    const onSubmit = () => {
        const order = {
            ...data,
            cart:addBasketInformationToPayInfo(),
            orderTime: new Date().toLocaleDateString('fa-IR'),
            deliveryTime: selectedDate._d.toLocaleDateString('fa-IR'),
            deliveryStatus: 'waiting',
        }
        setPayInfo(order)
        history.push('/payment')
    }

    //form validaion
    const {data, errors, handleChange, handleSubmit} = useForm({initialValues, validations, onSubmit})

    return (
        <div className={classes.root}>
            <Typography variant='h1'>
                نهایی کردن خرید
            </Typography>
            <Paper className={classes.formContainer}>
                <Form onSubmit={handleSubmit} width='90%'>
                    <TextField 
                        id="userName" 
                        label="نام" 
                        type='text'
                        required
                        variant="outlined" 
                        value={data['firstName'] || ''}
                        onChange={handleChange('firstName')}
                        error={Boolean(errors['firstName']) || false} 
                        helperText={errors['firstName'] || ''}
                        fullWidth={true} 
                        margin='dense'
                        color='secondary'
                    />
                    <TextField 
                        id="userName" 
                        label="نام خانوادگی" 
                        type='text'
                        required
                        variant="outlined" 
                        value={data['lastName'] || ''}
                        onChange={handleChange('lastName')}
                        error={Boolean(errors['lastName']) || false} 
                        helperText={errors['lastName'] || ''}
                        fullWidth={true} 
                        margin='dense'
                        color='secondary'
                    />
                    <TextField 
                        id="userName" 
                        label="آدرس" 
                        type='text'
                        required
                        multiline
                        rows={4}
                        variant="outlined" 
                        value={data['address'] || ''}
                        onChange={handleChange('address')}
                        error={Boolean(errors['address']) || false} 
                        helperText={errors['address'] || ''}
                        fullWidth={true} 
                        margin='dense'
                        color='secondary'
                    />
                    <TextField 
                        id="userName" 
                        label="تلفن" 
                        type='text'
                        required
                        variant="outlined" 
                        value={data['phone'] || ''}
                        onChange={handleChange('phone')}
                        error={Boolean(errors['phone']) || false} 
                        helperText={errors['phone'] || ''}
                        fullWidth={true} 
                        margin='dense'
                        color='secondary'
                    />
                    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa" className={classes.datePicker}>
                        <DatePicker
                          clearable
                          okLabel="تأیید"
                          cancelLabel="لغو"
                          clearLabel="پاک کردن"
                          labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>

                    <Button  type="submit" variant="contained" color="secondary">پرداخت</Button>
                </Form>
            </Paper>
        </div>
    )
}

export default CheckoutPage
