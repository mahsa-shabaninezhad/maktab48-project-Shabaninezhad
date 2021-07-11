import React from 'react'
import { Typography, Button, TextField, Paper, Link, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../store/actions/adminActions';
import useForm from '../hooks/useForm';
import login from '../api/authAxios'
import Form from '../components/Form';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    paper: {
        width: '500px',
        '@media screen and (max-width: 600px)': {width: '80%'},
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    backBtn: {
        alignSelf: 'flex-end',
        textAlign: 'right',
        width: 'max-content',
        marginTop: theme.spacing(3),
        cursor: 'pointer'
    }

}));

const LoginPage = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const {state} = useLocation()
    const dispatch = useDispatch()
    const tablet = useMediaQuery('(max-width:500px)');
    //form validation hook
    const {data, errors, handleChange, handleSubmit} = useForm({
        initialValues: {
            userName: '', 
            password: ''
        },
        validations:{
            userName: {
                required: {
                    value: true,
                    message: 'نام کاربری الزامی می باشد.'
                }
            }, 
            password: {
                required: {
                    value: true,
                    message: "گذرواژه الزامی می باشد"
                }
            }
        },
        onSubmit: () => {
            handleLogin()
        }
    })


    const handleLogin = () => {
        login.post('/api/login', 
        JSON.stringify({
            email: data['userName'], 
            password: data['password']
        })
        ).then(res => {
            dispatch(adminLogin())
            history.push(state.from.pathname)
        })
    }

    

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} >
                <Typography variant={tablet? 'h5' : 'h4'} component='h2'>
                    ورود به پنل مدیریت فروشگاه
                </Typography>
                <Form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit} width='75%'>
                    <TextField 
                        id="userName" 
                        label="نام کاربری" 
                        type='text'
                        required
                        variant="outlined" 
                        value={data['userName'] || ''}
                        onChange={handleChange('userName')}
                        error={Boolean(errors['userName']) || false} 
                        helperText={errors['userName'] || ''}
                        fullWidth={true} 
                        margin='dense'
                        />
                    <TextField 
                        id="password" 
                        label="رمز عبور" 
                        type='password'
                        required
                        value={data['password'] || ''}
                        onChange={handleChange('password')}
                        variant="outlined" 
                        error={Boolean(errors['password']) || false} 
                        helperText={errors['password'] || ''}
                        fullWidth={true} 
                        margin='dense'
                    />
                    <Button  type="submit" variant="contained" color="secondary">ورود</Button>
                    <Link onClick={() => history.push('/')}  color="primary" className={classes.backBtn}>بازگشت به سایت</Link>
                </Form>

            </Paper>
        </div>
    )
}

export default LoginPage
