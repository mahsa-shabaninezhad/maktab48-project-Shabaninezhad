import React from 'react'
import { Typography, Button, TextField, Paper, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../store/actions/adminActions';
import useForm from '../hooks/useForm';
import login from '../api/authAxios'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    paper: {
        width: '500px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2), 
        width: '400px',
        
        '& > *:not(:last-child)': {
          margin: theme.spacing(1.5),
          minWidth: '25ch',
        },
    },
    backBtn: {
        alignSelf: 'flex-end',
        textAlign: 'center',
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
                <Typography variant='h4' component='h2'>
                    ورود به پنل مدیریت فروشگاه
                </Typography>
                <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                </form>

            </Paper>
        </div>
    )
}

export default LoginPage
