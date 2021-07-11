import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: props => props.width || '100%',
        
        '& > *': {
          margin: theme.spacing(1.5),
          minWidth: '50%',
        },
    },

}));


const Form = ({children, header = null, onSubmit, ...props}) => {
    const classes = useStyles(props)

    return (
        <form className={classes.form} onSubmit={onSubmit} noValidate autoComplete="off">
            {children}
        </form>
        // <Paper className={classes.paper} elevation={3}>
        //     {header && <Typography variant='h4' component='h2'>
        //         {header}
        //     </Typography>}
        //     <form className={classes.form} onSubmit={onSubmit} noValidate autoComplete="off">
        //         {children}
        //     </form>
        // </Paper>
    )
}

export default Form
